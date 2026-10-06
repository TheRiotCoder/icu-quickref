# ICU QuickRef — Peer Code Review (Senior Software Engineer)

**Reviewer role:** senior SWE (web / PWA / mobile web / security / healthcare-adjacent)
**Scope:** `/workspace/icu-quickref/` — index.html, styles.css, app.js (385 lines), data.js (1353 lines, 99 KB), sw.js, manifest.json, _headers, make_icons.py, README.md, icons/
**Live site:** https://icu-quickref.pages.dev — I diffed every file against the local copy by hash: the deployed JS/CSS/manifest are byte-identical to the local copy. I did NOT modify anything under `icu-quickref/`.
**Date:** 2026-10-04

## How I tested (not just read)
- Served locally (python http.server, plus a Node server that mimics Cloudflare Pages' `max-age=0, must-revalidate` and SPA-fallback), drove it with **Chrome 151 + puppeteer-core** at 320×568, 390×844 (iPhone-class, touch + mobile emulation), 844×390 landscape and 768×1024.
- Exercised: hash routing / unknown routes / Back, search (30 queries), checklists, timer (start/stop/restart/reset/reload/3 h-stale), GCS, theme, localStorage **denied**, **quota exceeded**, and **13 corrupted-state variants**.
- Service worker lifecycle with a mutable copy: edit-without-bump, edit+bump, "Check for update" button, offline reload, offline deep link.
- axe-core on 5 routes × 2 themes; strict CSP trial (`default-src 'none'; script-src 'self'; style-src 'self' …`); third-party request audit (**zero** non-origin requests — confirmed).
- Wrote and ran a data validator (`/workspace/reviews/validate-data.js`) against data.js: **0 errors, 6 warnings** (details in §9). Structure of data.js is sound.
- Not done: real iOS Safari / real Android device (iOS items below are from known platform behavior and are marked as such), Lighthouse score, and **no clinical-accuracy review** (out of scope for this role).
- Test scripts are in `/workspace/reviews/_t/t1.js … t8.js` if you want to re-run them.

Severity key: **CRITICAL** = fix before any real clinical use; **MAJOR** = fix before wider rollout; **MINOR** = should fix; **SUGGESTION** = improvement.

---

## Overall verdict

**Not ready for clinical use as-is; solid prototype.** The fundamentals are good: zero third-party requests, no analytics, consistent output escaping (no XSS path found), big tap targets, offline works, sensible disclaimers, clean separation of data from code, and data.js passes structural validation. The problems are concentrated in **state-handling robustness** and **content-freshness/recall**, which matter far more here than in a normal app because stale or silently-wrong checklist state in an ICU tool is a patient-safety issue, and the failure modes are *silent*. Three CRITICAL items (C1–C3) are each a small amount of work.

---

## CRITICAL

### C1 — Checklist ticks persist forever, are keyed by array index, and are never tied to a patient/session
`app.js:140, 323-326` (read/write `icuqr.chk.<id>` = `{a:[idx], m:[idx]}`); `app.js:342` (only reset is manual per-condition); `data.js` (step order).
- **Stale ticks across patients:** I ticked a step, reloaded: still ticked (verified). The next nurse/next patient who opens "Sepsis" sees green "done" steps they never did. In a tool whose whole purpose is "what have I done / what's left", false-done is the worst failure mode. There is no TTL, no "new patient" boundary, no timestamp.
- **Index keys break on content edits:** README tells editors to freely edit/reorder `actions`. Insert one step at position 2 and every device's saved tick for old step 5 now marks the *new* step 5 done. Silent. (Out-of-range indices are also counted — I stored `[0,1,99,-1]` and progress showed 4/11.)
- **Fix:** store `{ts, ver, ticks:[stepHash]}`; discard when `Date.now()-ts > N hours` (suggest 4–12 h, configurable) or `ver` ≠ current `D.version`; key ticks by a stable step id/hash (`hash(text)`) rather than index; show "Ticked 3 h ago — clear?" if kept; clamp indices to `< steps.length`.
```js
var TTL = 6*3600e3;
function loadChk(id, c){ var v = store.get('chk.'+id, null);
  if (!v || v.ver !== D.version || Date.now()-v.ts > TTL) return {a:[],m:[],ts:Date.now(),ver:D.version};
  return {a:(v.a||[]).filter(i=>i>=0&&i<c.actions.length), m:(v.m||[]).filter(i=>i>=0&&i<c.monitor.length), ts:v.ts, ver:v.ver}; }
```

### C2 — Corrupt/unexpected localStorage values either brick the app or make a condition page silently not open
`app.js:11` (`store.get` returns whatever `JSON.parse` yields, no shape check), `:62`, `:116`, `:118`, `:140-143`, `:192`, `:382`.
`store.get` only guards parse errors, not shape. Verified by injecting values:

| Stored value | Result |
|---|---|
| `icuqr.chk.sepsis` = `{}` / `null` / `"x"` | Tapping Sepsis changes the URL to `#/c/sepsis` but **the screen stays on Home** (exception thrown mid-template, `innerHTML` never assigned), action bar hidden, no error shown. Condition is unreachable until site data is cleared. |
| `icuqr.favs` = `{"a":1}` or `"abc"` | **Home renders zero cards** (exception in `renderHomeBody`). |
| `icuqr.recent` = `5` | Home blank. |
| `icuqr.timer` = `null` | **Total app crash at load** (`app.js:382` `timer.run`) — nothing renders, not even About (where "Clear" lives). |
| `icuqr.timer` = `{}` or missing arrays | Timer page/log throws. |

Likelihood is low (needs corruption: partial write on a crashed tab, an old version's different shape, a future schema change), but the failure is total and there is no recovery path in the UI, in a tool people open in emergencies. Version-to-version schema drift (e.g. you later change `chk` shape) makes this *likely*, not hypothetical.
- **Fix:** validate on read, and wrap each render in a boundary that falls back to a visible error + "Reset app data" button.
```js
get: function(k, d, ok){ try{ var v=localStorage.getItem('icuqr.'+k); if(v==null) return d; v=JSON.parse(v); return (!ok||ok(v))?v:d; }catch(e){ return d; } }
// usage
store.get('favs', [], Array.isArray); store.get('timer', T0, isTimer);
// router
function safe(fn){ try{ fn(); }catch(e){ app.innerHTML='<div class="empty"><b>Something went wrong.</b><br><button class="abtn" data-act="clearlocal">Reset app data</button><p>Reference content is unaffected.</p></div>'; console.error(e);} }
```

### C3 — Medical-content freshness: user cannot tell the content is current, and there is no recall/kill mechanism
`sw.js:35-52` (cache-first, stale-while-revalidate), `app.js:374-380`, README "After ANY edit".
- Strategy is **cache-first**; a changed file is served from the *old* cache on the current launch and only appears on the **next** launch (verified: after editing data.js, reload #1 still showed old version, reload #2 showed new). Combined with `skipWaiting`+`clients.claim`, the page in memory stays on old JS/data while the cache underneath silently changes.
- The only signals: tiny footer "v1.0.0-draft · 2026-10-04" (that is the *loaded* version, not "latest available"), and a toast "App updated — reopen for latest content" that auto-hides after **1.8 s** (`app.js:65`) and is easy to miss under glove/in a code.
- **A device that is offline for weeks shows no staleness warning at all.** Nothing says "last verified against server: <date>". If an error is found in a dose, you have no way to tell deployed devices "stop using this / content withdrawn" — they keep serving the cached copy indefinitely.
- Two manually-synced version numbers (`data.js` `version`, `sw.js` `CACHE_VERSION`); nothing enforces they match (my validator does). README states the bump is *required* for phones to update; in fact this SWR design updates without it (see M6) — the docs and behavior disagree.
- **Fix (minimum viable):**
  1. Ship `version.json` (`{"version":"1.0.1","date":"…","minSafe":"1.0.0","withdrawn":false,"message":""}`) served `no-store`; on launch and `visibilitychange`, fetch it (`cache:'no-store'`); if reachable, store `lastVerifiedAt`. If `version !== D.version` show a **persistent** banner "Newer content available — Reload" (tap → `skipWaiting` + reload). If `withdrawn` or `D.version < minSafe`, show a blocking red banner with `message`.
  2. Footer/About always show: "Content v1.0.0 · reviewed <date> · **last checked online <date/time>**"; if `lastVerifiedAt` > 30 days (configurable) or `D.reviewDue` passed, show an amber "may be out of date" banner.
  3. Generate `CACHE_VERSION` from a content hash at deploy so version skew is impossible (see S1).

---

## MAJOR

### M1 — Code-timer rhythm-check beep is silent after any app relaunch (verified) and wake-lock is not re-acquired
`app.js:194-202, 368, 382, 236-241`.
- `AudioContext` is only unlocked in `beep0()` on the Start tap. If the page reloads/relaunches with the timer already running (iOS routinely kills a backgrounded PWA; Android may too), `beep()` creates a *new* context with no user gesture → `suspended` (I reproduced: ctx.state = `suspended` at the 2:00 mark; only the visual toast fired). iOS also lacks `navigator.vibrate`, so on iPhone the 2-minute alert is then **completely silent**.
- iOS suspends JS when the screen locks; timers/beeps don't fire. `navigator.wakeLock` is requested once at start; the lock is auto-released when the page is hidden and **never re-requested** on `visibilitychange`. (Wake Lock in iOS home-screen apps has historically been unreliable — verify on target iOS version.)
- **Fix:** re-unlock audio on first `touchstart/click` after load (`document.addEventListener('pointerdown', beep0, {once:true})`), re-request wake lock in a `visibilitychange` handler, show an unmissable on-screen flashing state (already partially there) and document "keep the app in the foreground". Consider never claiming a timing guarantee.

### M2 — Code-timer UX is unsafe under stress
`app.js:269, 344-349, 192, 382, 226-228`.
- Start and Stop are the **same button in the same spot**; a double-tap (extremely common with gloves) starts then immediately stops the code clock (verified: "Stop" → "Restart"). "Restart" then **wipes the log and counters** with no confirm. "Reset" also has no confirm and clears the epinephrine/shock log.
- Running state persists in localStorage with no staleness limit: after a simulated 3 h gap it resumed as **"180:01 … Epinephrine last 180:00 ago — DUE"** with the beep armed. A forgotten timer from a previous shift displays as an active code.
- After Stop, the epi "last N ago / DUE" line keeps counting up (verified), and the chip/hint still treats it as live.
- **Fix:** separate Start and Stop controls (or press-and-hold / confirm on Stop), confirm Reset/Restart ("Clear code log?"), auto-expire a running timer older than e.g. 4 h on load ("Timer from 3 h ago — discard / resume"), and freeze the epi counter at stop time.

### M3 — "Unreviewed" status is not surfaced where decisions are made; text is hard-coded; app is public and indexable
`app.js:164` (hard-coded "Content pending clinical review"), `app.js:162` (meds banner), `data.js:16-17`, `index.html` (no robots meta).
- On condition pages the only review-status text is a small footer *below* the Escalate section. The review status in `data.js` (`reviewStatus`, `reviewedBy`) is only shown on About. On a public URL anyone can open, doses are one tap away with no above-the-fold "DRAFT — not clinically reviewed" marker.
- The footer string is a literal; when `reviewedBy` is filled in and `reviewStatus` changed, condition pages will **still say "pending clinical review"** (and a never-updated string is a different kind of wrong).
- Public `pages.dev` site is crawlable.
- **Fix:** render a slim top banner on every condition page driven by `D.reviewStatus` (red while draft, neutral "Reviewed by X · date" when approved); add `<meta name="robots" content="noindex">` + `X-Robots-Tag: noindex` until reviewed; put per-condition `reviewed: "YYYY-MM-DD"` + `reviewer` in data and show it.

### M4 — No CSP / hardening headers, and the app can't currently run under a strict CSP
`_headers` (only `/sw.js`), `index.html:21-24` (inline `<script>`), `index.html:46` and `app.js:252, 267, 295` (inline `style=""` attributes).
Live response has only Cloudflare defaults (`nosniff`, `referrer-policy`); no CSP, no `X-Frame-Options`/`frame-ancestors`, no `Permissions-Policy`. There's no XSS sink today (see §5), but CSP is the cheap defense-in-depth for the day someone adds content with markup. I trialled a strict CSP: it blocks the inline theme script and 3 inline-style sites (confirmed violations in Chrome console). 
- **Fix:** move the pre-paint theme script to `theme-init.js` (loaded sync in `<head>`), replace inline `style=` with classes, then deploy:
```
/*
  Content-Security-Policy: default-src 'none'; script-src 'self'; style-src 'self'; img-src 'self'; manifest-src 'self'; connect-src 'self'; worker-src 'self'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'
  X-Frame-Options: DENY
  Referrer-Policy: no-referrer
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=(), usb=(), interest-cohort=()
  Cross-Origin-Opener-Policy: same-origin
  X-Content-Type-Options: nosniff
/sw.js
  Cache-Control: no-cache
```
(`el.style.width=…` from JS is allowed under this policy; only *attribute* styles in HTML strings are not.)

### M5 — Search is substring-on-everything with no synonyms; critical queries rank wrong or return nothing
`app.js:36-59`.
Verified results: `pea` → **Hyperkalemia first** (matches "peaked"), Cardiac arrest third; `heart attack` → **0 results**; `hyperkalaemia` / `hypoglycaemia` (UK spelling) → **0**; `k+` → DKA only (not Hyperkalemia); `mi` → 25/25 results; `rsi` → AFib first (substring of "...rsion"/"…"); `code` ranks Stroke above Anaphylaxis. A nurse who gets "No matches" in an emergency loses time.
- **Fix:** tokenise on word boundaries (match at word *start*), weight `keywords`/`name` far above body text, strip `+`/punctuation, add synonym/alias list in data (`heart attack`, `MI`, `afib`, `K+`, UK spellings, drug brand names), consider min-length-2 gating, and highlight the matched field. Add a regression test with a table of `query → expected top-1` (see §8).

### M6 — Service-worker update mechanics are racy and non-atomic
`sw.js:12-52`, `app.js:357-359, 374-380`.
- `fetch` handler does `cache.put(req, …)` **per file, per request, into the live cache**. A flaky connection can update `data.js` but not `app.js` (or vice-versa) → version skew between logic and schema until the next successful load. The versioned cache name gives atomicity only for the *install* path, which the SWR path bypasses.
- `install` uses `cache.addAll(ASSETS)` which goes through the HTTP cache; on hosts that send heuristic `Cache-Control`, a new SW can precache *old* files. (Pages' `max-age=0, must-revalidate` hides this today; GitHub Pages `max-age=600` doesn't — and README advertises GH Pages/Netlify.) Use `new Request(u,{cache:'reload'})`.
- "Check for update" button: `r.update()` then a fixed `setTimeout(reload, 600)` — it doesn't wait for the new worker to reach `activated`. It worked in my run, but only because install was fast; on a slow link it reloads still on the old version and *says nothing*.
- No periodic/visibility update check: an installed PWA left resident for days (common on Android) does no navigations, so no update check beyond the browser's ≤24 h SW-fetch heuristic.
- Install is all-or-nothing: if any ASSET fails, the SW never installs and the user is silently **never offline-capable** (only `console.warn`). And with Cloudflare Pages SPA fallback a *missing* asset returns `200 text/html`, so `addAll` "succeeds" with HTML cached as e.g. `icons/foo.png` (see m9).
- **Fix (sketch):**
```js
// sw.js — install: precache with cache:'reload', verify content-type
const reqs = ASSETS.map(u => new Request(u, {cache:'reload'}));
// fetch: navigation = network-first w/ 3 s timeout -> cache; static assets = cache-first from the *versioned* cache ONLY (no per-file put)
// message handler: self.addEventListener('message', e => e.data === 'SKIP_WAITING' && self.skipWaiting());
// page: reg.addEventListener('updatefound', …) -> persistent "Update ready — Reload" banner; reload only after state==='activated'
// page: document.addEventListener('visibilitychange', () => !document.hidden && reg.update());
```
  Drop `skipWaiting()` from install; trigger it from the banner so JS/data never change under a user mid-task.

### M7 — iOS storage eviction / install fragility (platform behavior; not verified on device)
`README.md:96-ish`, `app.js:297`.
- README says iOS "may evict … if unused for weeks". The actual WebKit rule (ITP): script-writable storage **incl. Cache API and SW registrations is purged after 7 days of no interaction for sites used in a Safari *tab***; Home-Screen web apps are exempt from the 7-day cap but can still be evicted under storage pressure. A nurse who bookmarks it and doesn't "Add to Home Screen" will lose offline capability after a week off — silently.
- After eviction while offline: the SW's navigate fallback `cache.match('index.html')` returns `undefined` → `respondWith(undefined)` → browser error page (`sw.js:48-49`).
- About's "Offline: Ready (icuqr-…)" only checks that *a cache name exists* (`app.js:297`), not that all ASSETS are actually present.
- iOS Home-Screen app gets its own localStorage (favorites/ticks don't carry over from the Safari tab) — document it.
- **Fix:** on iOS non-standalone show a persistent "Install to keep offline" prompt; call `navigator.storage.persist()` and `estimate()`; make "Offline ready" verify every ASSET via `cache.match`; return a minimal inline offline HTML if cache is empty; correct the README wording.

### M8 — Accessibility: contrast failure in the default (dark) theme, invalid ARIA, no h1
axe-core, dark theme: `color-contrast` (serious) — white text on `--red:#ff5964` = **3.05:1** (needs 4.5:1 for these 12–16 px items): `.badge.em` ("Emergency", `styles.css:~100`), `.callpill` ("CALL" pills, `styles.css:~150`) on Home/condition; `.timerchip` same colors. Light theme is clean. Also `aria-required-children` (critical): `#chips` has `role="tablist"` (`app.js:88`) but children are plain buttons → remove `role` or implement tabs (`role=tab`, `aria-selected`, arrow keys). `page-has-heading-one` on Home/Tools: no `<h1>` (brand is a link). 
- **Fix:** use a darker red for filled badges in dark mode (`#d7263d` w/ white ≈ 4.9:1) or dark text on `#ff5964`; chips → `aria-pressed` toggle buttons; make the brand `<h1>` or add a visually-hidden one per route.

---

## MINOR

| # | File:line | Issue | Fix |
|---|---|---|---|
| m1 | `manifest.json:9` | `"orientation":"portrait"` locks Android PWA; fails WCAG 1.3.4 and is hostile to tablets/WOW carts. Landscape phone also leaves only ~260 px of content between sticky bars (measured at 844×390). | Remove it (or `"any"`); consider hiding the sticky section nav in landscape. |
| m2 | `index.html:34`, `styles.css` (`main{outline:none}` vs `:focus-visible{…}`) | `app.focus()` on route change gives `main` a visible 3 px accent outline (specificity: `:focus-visible` beats `main`) — seen as blue side bars at 844 px wide. | `main:focus{outline:none}` (it's a programmatic focus target only). |
| m3 | `app.js:303-314` | Route changes don't update `document.title` or announce navigation; focus only moves on condition pages. History entries are all titled "ICU QuickRef"; screen readers get no route change. | Set `document.title = c.name + ' · ICU QuickRef'`; focus `main`/h1 on every route; `scroll-restoration` handling. |
| m4 | `app.js:302-306, 339` | Back button logic uses an in-memory `navCount`; after a reload on a condition page it resets to 0 and "Back" *pushes* `#/` (so hardware Back then returns to the condition — a loop). Home scroll position is only saved when leaving to `#/c/…`, not Tools/About. (By code reading; scroll restore on Back to Home worked in test.) | Use `history.state` / `document.referrer` check, or always `location.hash='#/'` with `replace`. |
| m5 | `styles.css` print block | Print keeps dark-theme text color (#f4f7fb) → near-white on white paper. | In `@media print` force light variables. |
| m6 | `index.html:28,30` | `aria-label="Home"` on the brand overrides visible text "ICU QuickRef" (WCAG 2.5.3 label-in-name; voice control "tap ICU QuickRef" fails). `netdot` conveys online/offline by color + `title` only (not touch/SR accessible). | Drop the aria-label; add visually-hidden text / `aria-live` status. |
| m7 | `app.js:79`, `index.html:23` | Unknown theme string (`"purple"`) is set on `data-theme`; button icon wrong. First launch ignores `prefers-color-scheme` (`color-scheme` meta says "dark light" but CSS never uses the media query). | Whitelist `dark|light`; optionally honor OS preference on first run. |
| m8 | `app.js:152` | `meds.filter(s => !/^VERIFY/i.test(s))` silently drops any med line a clinician later writes starting with "Verify…". Implicit magic-string contract. | Put the verify text in a dedicated field or use an explicit sentinel; lint it. |
| m9 | Deployment | Cloudflare Pages is in **SPA-fallback mode** (no 404.html): `/anything`, `/_headers`, `/missing.png` all return `200 text/html`. SW then caches arbitrary junk URLs on each request (`sw.js:43`, same-origin `basic` 200) and precache of a typo'd asset "succeeds". | Add a real `404.html`; in SW only `put` when `content-type` matches the request destination; limit cache to ASSETS. |
| m10 | `app.js:231`, `:234` | `setInterval(tick,250)` runs forever (even with the timer idle, on every page) and rewrites `#t-log.innerHTML` 4×/s while the log is visible (measured 4 DOM mutations/s) — breaks text selection/scroll momentum in the log, wastes battery. | Run the interval only when `timer.run`; update log only when it changes. |
| m11 | `app.js:78, 250` | `c.id` and `it[0]` are concatenated into HTML unescaped. Safe today (first-party data, route regex is `[\w-]+`), but a trap if content ever comes from elsewhere. | `esc()` them; lint ids to `^[a-z0-9-]+$` (validator does). |
| m12 | `app.js:192, 204-205` | Timer log persists exact timestamps of a code event ("Epinephrine #1", "Shock #1", time-since-start; `start` is epoch ms) in unencrypted localStorage indefinitely. No identifiers, so not PHI by itself, but event-time + unit = re-identifiable in context; README says "not a medical record". | Auto-expire (see M2), purge on "Reset", and state retention explicitly on About. |
| m13 | `index.html:16` | `format-detection telephone=no` prevents iOS auto-linking of `facilityNote` numbers (rapid response, poison control) that the README encourages entering. | Render phone numbers as `tel:` links explicitly. |
| m14 | `manifest.json` | Valid and installable (192/512/maskable present, opaque, safe zone OK — I viewed the maskable PNG; `id`/`scope`/`start_url`/`display` fine, shortcuts resolve to real condition ids). Missing nice-to-haves: `lang`, `dir`, `screenshots` (Chrome rich install UI), `display_override`, and iOS `apple-touch-startup-image` (iOS launch shows a white/black flash). `theme_color` is static (JS only updates the meta for light mode). | Add fields; use `media`-qualified theme-color metas. |
| m15 | `app.js:411-415` | "Clear my favorites & ticks" resets the in-memory `timer` object but not the running `tick`/wake lock/`lastCycle`, doesn't re-render, and doesn't clear in-memory `gcs`. | Call the same reset path as `treset`; re-render. |
| m16 | `README.md` | Out of date / inaccurate: doesn't mention `_headers` or Cloudflare Pages (the actual host), "bump CACHE_VERSION or phones keep the old copy" (not how this SWR works), "weeks" for iOS eviction (see M7), and `make_icons.py` is fine but `_headers` missing from the file table. "No network calls" (About) is true of the app; note the CDN edge still sees IPs and Cloudflare adds `NEL/Report-To` headers (failure reports to cloudflare, `success_fraction:0`). | Update docs; soften the privacy wording to "the app makes no third-party requests and sends no data". |
| m17 | `app.js:306` | Dead/odd condition `app.querySelector &&` (always truthy). Repeated literal `{run:false,start:0,last:0,epi:[],shock:[],log:[]}` ×3; magic numbers (120, 180, 300, 10) inline. | Constants + `newTimer()` factory. |

## SUGGESTION

- **S1 Build/stamp step:** a ~30-line Node script that (a) runs the validator, (b) stamps `CACHE_VERSION = 'icuqr-' + sha256(all assets).slice(0,10)` into `sw.js`, (c) writes `version.json`, (d) fails on mismatch. Removes the "remember to bump" human step entirely.
- **S2 Data/code separation is good**; strengthen it: JSON Schema or the validator below in CI; per-condition `reviewed`/`reviewer`/`source` fields; make `data.js` a `data.json` fetched+precached so non-JS editors can't break the app with a stray comma (a `data.js` syntax error = blank app; today only `node --check` protects you).
- **S3 Error telemetry without telemetry:** an on-device "Last error" panel on About (stored locally) so a clinician can screenshot a bug without any network reporting.
- **S4 Performance** (measured, not Lighthouse): total payload ≈165 KB raw / ≈48 KB gzip for html+css+js (data.js 99 KB → 35 KB gz) + 13 KB icons. First render is not an issue; scripts are blocking at end of `<body>` which is fine at this size. No action needed; add `defer` for hygiene and avoid per-keystroke full re-render only if conditions grow past ~200.
- **S5 Code quality:** ES5 + string-concatenated HTML is internally consistent but fragile (see C2/m11). Consider tiny helper `h()` or `<template>`s, split the 80-line click-handler `else-if` chain into a `{action: fn}` table, add ESLint (`no-unsanitized`, `no-undef`) and Prettier.
- **S6 Remove `skipWaiting` from install** and use an explicit "Update ready" flow (see M6).

---

## 5. Security & privacy summary (requested checklist)
- **XSS:** Reviewed all 8 `innerHTML` sites. All dynamic text goes through `esc()` (escapes `& < > " '`); attribute contexts are quoted. Route params are regex-restricted and never reflected (unknown id shows static "Condition not found"). Search text is reflected into `value="…"` via `esc` (tried `<img src=x onerror=…>`, `a"b` — inert). localStorage-sourced strings (timer log) pass through `esc`; tampered storage can only crash the app (C2), not execute script. Unescaped: `c.id`, `it[0]` (m11) — not exploitable today. **No XSS found.**
- **Third-party requests:** none (instrumented all requests; only same-origin). No fonts/CDNs/analytics. Confirm Cloudflare **Web Analytics auto-injection is OFF** in the Pages dashboard (the served HTML currently has no beacon).
- **PHI:** keys stored are `icuqr.theme|favs|recent|chk.*|timer|tipHidden`. No free-text input exists besides search (not persisted). No patient identifiers are collected. Only caveat is timer timestamps (m12).
- **CSP/headers:** see M4.
- **SW scope:** `sw.js` at root → whole origin; only same-origin GETs are handled (`sw.js:36-38`) — good.

## 6. PWA install (Android/iOS)
Chrome installability criteria are met (manifest with name, icons 192/512, `start_url`, `display:standalone`, SW with fetch handler). Maskable icon art sits well inside the 80 % safe zone and is opaque (RGB, no alpha). iOS: `apple-touch-icon` 180×180 present, `apple-mobile-web-app-capable`, title, status-bar style set; `viewport-fit=cover` + `env(safe-area-*)` handled correctly. Gaps: m1, m14, M7 (iOS eviction and separate storage), no `beforeinstallprompt` re-offer/`appinstalled` handling (`app.js:128`; "Install app" does nothing useful on iOS beyond a toast).

## 7. Deployment config
- `_headers`: syntax valid; `/sw.js → Cache-Control: no-cache` is correct and important but is also what Pages does by default (`max-age=0, must-revalidate` on everything, confirmed on live). Real gaps: no security headers (M4), no `X-Robots-Tag` (M3), no `404.html` (m9). Do **not** add long `max-age` to non-hashed assets later — with this SW that would defeat updates.
- Live assets all return correct MIME types; icons 200 `image/png`.

## 8. Testing gaps & suggested automated tests
There are no tests, no lint, no CI. Suggested minimum (Playwright, ~1 day):
1. **Data lint** (`validate-data.js`, below) in CI + pre-deploy — blocks bad content.
2. **Smoke (mobile viewport 390×844):** every condition id opens, has h1 + 5 sections, no console errors; deep link `#/c/<id>` and Back; unknown route.
3. **State robustness (regression for C1/C2):** table-driven injection of corrupt `favs/recent/chk/timer/theme` → app renders and offers recovery; `localStorage` throwing on get/set/quota (already behaves — add tests so it stays that way).
4. **Checklist expiry/index-drift:** tick, change data version, assert ticks dropped.
5. **Search ranking table:** `pea→cardiac-arrest`, `heart attack→acs-mi`, `hyperkalaemia→hyperkalemia`, `narcan→overdose`, `k→…` etc.
6. **Timer:** with `page.clock` (Playwright fake timers): start, advance 120 s → beep/toast fired; reload mid-run; stop freezes epi counter; double-tap start doesn't stop.
7. **SW/offline:** install, `context.setOffline(true)`, reload each route; bump version → assert update banner; assert cache contains exactly ASSETS; assert `version.json` withdrawn → blocking banner.
8. **a11y:** `@axe-core/playwright` on all routes × both themes (currently fails — M8).
9. **Security:** run the above under the proposed CSP and assert zero CSP violations; assert zero cross-origin requests.
10. Lighthouse CI (PWA + a11y budgets).

## 9. Data validator (delivered, run against current data.js)
File: `/workspace/reviews/validate-data.js` — usage `node validate-data.js /workspace/icu-quickref` (exit 1 on error). Checks: required top-level fields and date format; unique kebab-case ids and names; category ∈ `categories`; all six sections present, non-empty, non-blank strings, no dup lines; emergency conditions have a `!` CALL step; every condition has a `VERIFY` meds line and escalation criteria; doc/number-without-unit heuristics; GCS groups are E4/V5/M6 with unique scores; RASS has 10 rows; vitals/labs rows well-formed; **cross-file:** `sw.js` CACHE_VERSION contains data version, every precache asset exists, every file is precached, manifest icons exist, manifest shortcuts point at real condition ids. `--report-doses` lists every dose-like token outside `meds[]` for the clinical reviewer (it flags ~80 lines, e.g. doses inside `actions[]` — those need reviewer sign-off because the "Verify per protocol" banner only sits on the Meds section).
**Current result: 25 conditions, 0 errors, 6 warnings:** `reviewedBy` empty (expected for draft); 4 action lines >220 chars (`unstable-brady.actions[4]`, `vent-alarms.actions[7]`, `ischemic-stroke.actions[7]`, `alcohol-withdrawal.actions[6]` — big tap targets on a phone); a double space in `hyperkalemia.glance[1]`. Good: every condition has all six sections, ids/categories valid, only 4 of 25 are `emergency`.
Note the dose-in-`actions[]` finding is also a design point: the amber "Verify per facility protocol / order" banner (`app.js:162`) appears only in Meds, but many doses live in the Actions checklist (e.g. cardiac-arrest epinephrine/amiodarone) — consider a one-line verify note at the top of each Actions section too.

## What is done well
No third-party anything; robust `try/catch` around every localStorage access (denied and quota both tested — app works, just doesn't persist); consistent `esc()`; `aria-pressed` on toggles and non-color "done" indicator (✓ + strikethrough); 56 px tap targets, safe-area handling, `prefers-reduced-motion`; deterministic offline (verified: offline reload and offline deep-link both work); SW only handles same-origin GET; `sw.js` served `no-cache`; version/date shown on every page footer; clear disclaimers.

---

## TOP-10 FIXES (in order)
1. **C1** — Expire checklist ticks (TTL + version) and key them by step hash, not index.
2. **C2** — Validate every localStorage read; add a render error boundary with a visible "Reset app data" recovery.
3. **C3** — Add `version.json` freshness/recall check, persistent "update available / content withdrawn" banner, and a visible "last verified online" timestamp + staleness warning.
4. **M2/M1** — Code timer: separate Start/Stop, confirm Reset/Restart, expire stale running timers, re-unlock audio and re-request wake lock after relaunch.
5. **M3** — Show review status (draft/reviewed + date) at the top of every condition page, driven by data; add `noindex`.
6. **M6/S1** — Make SW updates atomic and explicit: hash-stamped `CACHE_VERSION` at build, no per-file `cache.put`, no `skipWaiting` on install, user-triggered "Reload to update", `cache:'reload'` on precache, update check on `visibilitychange`.
7. **M4** — Remove inline script/style and ship the CSP + security headers in `_headers`.
8. **M5** — Fix search (word-start matching, weighted keywords, synonym list incl. "heart attack", "PEA", UK spellings) with a ranking regression test.
9. **M8** — Fix dark-theme red/white contrast (3.05:1), invalid `tablist`, add h1.
10. **Testing/CI** — adopt `validate-data.js` + Playwright smoke/state/SW/a11y tests as a pre-deploy gate (§8); fix M7 (iOS install/eviction guidance, `storage.persist`, verify-offline-ready).
