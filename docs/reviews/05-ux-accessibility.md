# Peer Review 05 — Mobile UX / Human Factors / Accessibility
**App:** ICU QuickRef (`/workspace/icu-quickref/`, live https://icu-quickref.pages.dev — live `app.js`, `styles.css`, `data.js` are byte-identical to the local copy, checked by hash)
**Reviewer lens:** mobile UX, human factors for clinical decision support (IEC 62366-1 mindset), WCAG 2.2 AA
**Date:** 2026-10-04 · **App files modified:** none

## 0. How this was reviewed (and its limits)

* Served the local copy and drove it with headless Chrome (puppeteer-core) in mobile emulation with touch: 360×640 (small Android), 390×844 (iPhone), 320×568 (small), plus landscape 844×390 and 640×360, dark and light themes.
* **Measured, not eyeballed:** computed WCAG contrast for every text node (alpha and opacity composited), tap-target bounding boxes on 4 views × 2 themes, the Chrome accessibility tree, focus order, and a 250-query search test. It also covered timer and checklist behaviors (double-tap, restart, stale state), reduced-motion behavior, and text scaling.
* Text scaling at 150% and 200% was **emulated** by multiplying every `font-size` in `styles.css` in flight. This is similar to Android Chrome font scale. It is not the same as OS Dynamic Type.
* **Not done:** physical devices, real gloved or wet touch, real TalkBack or VoiceOver sessions, bright-sunlight glare, and real iOS Safari install and standalone behavior. Where I infer rather than measure, I say "inferred".
* Screenshots are in `/workspace/reviews/screens/` (83 PNGs). Naming: `{a360x640|i390x844|s320x568|land…}-{dark|light}-NN-view.png`, plus `*-textx2-*` (200% text), `*-textx1.5-*` and `…rhythm-alert-frame*`. Throwaway scripts are in `/workspace/reviews/_tmp/`.
* Caveat: several screenshots in one run share one browser profile, so a timer started in the dark pass is still running in the light pass. For example, `a360x640-light-08-timer-running.png` shows "Stopped / Restart". That artifact is itself evidence for findings C1 and C3.

---

## 1. Executive summary

The app gets the big layout decisions right for a stressed one-handed user. The four emergencies are one tap from launch. The nav is at the thumb. Targets are mostly ≥48 px. It is dark by default, has a "First things first" card, uses CALL pills that are not colour-only, and has checklists.

The weakest part is the **code timer and the stateful controls around it**, which is exactly where error cost is highest:

* A double-tap on **Start code** starts and then stops the code.
* **Restart** and **Reset** silently erase the epinephrine and shock log with no confirmation or undo.
* Checklist ticks and a running timer **persist indefinitely** (I measured a stale timer chip reading `1800:01`).

Search is the second weak point. It is substring matching over the entire clinical text. "PE" ranks Pulmonary embolism 7th of 25, behind Hyperkalemia. "GIB" returns *Acute ischemic stroke*. "vtach", "vfib", "heart attack", "sz", "levophed" and a one-letter typo of "anaphylaxis" return nothing.

Accessibility has real gaps. These include white-on-coral text at **3.06:1**, missing landmarks and headings, a no-op chip/tab semantic, header clipping at large text, smooth-scroll ignoring reduced motion, and a manifest orientation lock.

| Severity | Count |
|---|---|
| CRITICAL | 3 |
| MAJOR | 10 |
| MINOR | 10 |
| SUGGESTION | 7 |

**Overall verdict: NOT READY for clinical/ward use as-is (conditional pass for a pilot after the CRITICAL and top MAJOR items are fixed).** See §9.

---

## 2. Quantified results

### 2.1 Taps / gestures from cold launch to a critical condition (390×844)

| Goal | Gestures | Notes |
|---|---|---|
| Cardiac arrest, Anaphylaxis, Tension PTX, Status epilepticus | **1 tap** | Emergency grid is above the fold. Good. |
| Any other condition via search | **2 taps + 3–6 keystrokes** | Focus search (no autofocus) → type → tap result. Keyboard covers about half the screen. |
| Any other condition via "All" list | 1–4 swipes + 1 tap | 25 rows × ~83 px. DKA row at y≈1586 px (about 2 screens), Ventilator alarms at y≈2662 px (3+ screens). |
| Via category chip, e.g. DKA | 1 swipe + 2 taps | "Metabolic/Renal" chip sits at x 479–633 on a 390 px screen, so it is off-screen with no scroll affordance. |
| Reach the numbered *Immediate actions* on Cardiac arrest | 1 extra scroll or tap "Actions" | The first screen is the 3-line glance card. Actions start at **y≈956 px** (≈1.1 screens). Page is 4,900 px tall. |
| Start code timer from launch | **2 taps** | Quick tools → Start code. |
| Start code timer from the Cardiac arrest page | **3 taps** | Back → Quick tools → Start code. The tab bar is hidden on condition pages. |
| Log epinephrine while reading the checklist | 3–4 taps and a context switch each time | Timer and checklist are on different screens (see M-2). |

### 2.2 Contrast (computed; WCAG AA = 4.5:1 text, 3:1 large text and UI)

| Pair | Ratio | Verdict |
|---|---|---|
| White on dark-theme red `#ff5964` (Emergency badge 12 px, CALL pill 12 px, timer chip 18 px bold, logo "+") | **3.06** | FAIL for text. 18 px bold is not "large text" (needs ≥18.66 px bold). |
| Same, CALL pill in a *done* step (opacity .72) | **2.22** | FAIL |
| White on red during the rhythm-check **blink** frame (opacity .45) | **2.16** | FAIL, and the text is grey-on-grey for half of every second |
| Dark: muted text `#aab6c8` on bg / surface | 9.43 / 8.44 | Pass |
| Dark: red text `#ff5964` on bg / on red-bg | 6.32 / 5.36 | Pass |
| Dark: amber on amber-bg, accent on bg | 8.46, 9.64 | Pass |
| Light: all text pairs measured (white on `#c4001a` 6.25, accent 6.8, muted 8.23, amber 5.6, red on red-bg 5.17) | ≥5.17 | **Pass.** Light theme is the better-contrast theme. |
| Card/button **borders** vs page (dark: `#2e3b4e` on `#0a0e14`; light `#b9c4d3` on white) | 1.71 / 1.76 | Below 3:1 (WCAG 1.4.11). Mitigated because every control has a text label. |
| Input placeholder (browser default grey on dark surface) | ≈3.76 | Below 4.5:1 (inferred from the default colour; not set in CSS) |

### 2.3 Tap targets (≥48 px goal)

Most controls pass: tab bar 64 px, action bar 56 px, timer buttons 64 px, search 60 px, chips 48 px, step rows ≥56 px, GCS options ≥48 px.

Below 48 px:

* **Section-jump buttons (Recognize/Actions/Monitor/Meds/Escalate): 44 px high.**
* Brand/home link: **162×32**.
* Home footer "About / disclaimer" link: **360×33**.
* Condition footer "About" link: **35×15**.
* Timer chip: **98×45**.

Gaps between neighbouring buttons are only **8 px** (action bar, timer 2×2 grid).

### 2.4 Text size

* Body is 18 px and steps are 18–19 px. This is good and above typical mobile references.
* Smallest text found: **12 px** (badges, CALL pill), **13 px** (footers, inline `<b>`), **14 px** (section headings, card categories, tab labels, notes, "x/13" progress counters), **15 px** (tips, verify box, subheads).
* Everything is in `px`, so iOS Dynamic Type has no effect. Android Chrome font scaling and browser zoom do work, because pinch zoom is not disabled.

### 2.5 Text scaling / reflow

* No horizontal scrolling at 320 CSS px, even at 200% emulated text (`scrollWidth == innerWidth`). Good.
* The fixed **56 px header** breaks (see M-7). The fixed bottom bar grows to 110–129 px.

### 2.6 Landscape

* Content viewport is 261 of 390 px (844×390) and **231 of 360 px** (640×360), after the fixed header (56 px) and action bar (~72 px). That is about 2 steps visible at a time.
* Manifest locks `portrait` (installed Android).
* Left and right safe-area insets are not applied.

---

## 3. CRITICAL findings

### C-1 · Code timer: Start and Stop are one toggle button; a double-tap starts then stops the code
* **Location:** Quick tools → Code timer, `data-act="tstart"` (`app.js` ~L344–348, ~L269).
* **Evidence:** a real 2-tap sequence 120 ms apart (touch events) left the timer at *"Stopped"* with log `Code started / Stopped`, and the button read **Restart**. The button is re-rendered in place and flips label to "Stop" immediately. There is no debounce, no confirmation, and `touch-action` is `auto`.
* **Why it matters:** Double-tapping is the commonest panic or glove behaviour. It silently kills the one feature whose only job is to keep time during a code. The nurse may not look back at the label before moving on.
* **Fix:**
  1. Split into two distinct controls. **Start code** is a big green button shown only when stopped. **End code** is a different, smaller control shown only while running and needs a deliberate action (press-and-hold ≈1 s, or a confirm sheet "End code? Total 12:40 · Cancel / End").
  2. Ignore a second "start" within 1–2 s; add `touch-action: manipulation`.
  3. Never place the same-position button in both start and stop states.

### C-2 · Destructive timer actions have no confirmation or undo; "Restart" wipes the epi/shock record; duplicate taps double-log drugs
* **Location:** timer buttons Reset / Restart / Epi given / Shock given (`app.js` ~L346, 349–351).
* **Evidence:**
  1. After Stop, the primary button says **Restart**. Tapping it replaces the whole timer object (`epi: [], shock: [], log: []`). Measured: log went from 5 lines to 1 and epi to "none logged".
  2. **Reset** sits in the 2×2 grid directly beside Stop/Start (8 px gap) and clears everything instantly (no dialog).
  3. Two taps 50 ms apart on **Epi given** produced "Epinephrine ×2 · last 00:00 ago". There is no undo or "remove last".
* **Why it matters:** The "last epi" time and count drive the "DUE" prompt. A wrongly logged or erased dose is a direct medication-timing hazard. A nurse cannot recover the log mid-code.
* **Fix:**
  * "Restart" must not exist. After Stop, offer *Resume* (keep log) and a separate *New code* behind a confirm.
  * Make Reset a long-press or confirm action and move it away from Start/Stop (for example into an overflow menu).
  * Debounce Epi and Shock (ignore within about 3 s), then show a **snackbar with Undo** ("Epinephrine #2 logged 06:12 · UNDO", 6–8 s). Show the log *newest first with timestamps* in larger type.

### C-3 · Persistent state leaks across patients/events: pre-ticked safety steps and a timer that never expires
* **Location:** checklist ticks (`localStorage icuqr.chk.<id>`, `app.js` ~L140, 320–330) and timer (`icuqr.timer`, ~L192, L382).
* **Evidence:**
  * Ticks survive reload (measured: 2 ticks after reload, "2/11"). They have no timestamp, patient or encounter scope and never expire. The next time anyone opens "Anaphylaxis", step 1 may already show a green ✓ with strikethrough text.
  * A running timer is restored forever. I set `start` to 30 h ago, reloaded, and the chip showed **`⏱ 1800:01` and still running**. The wake lock is also re-acquired (`if (timer.run) … setWake(true)`), so the screen is held awake indefinitely after the app is reopened.
* **Why it matters:** A pre-ticked "Call a CODE" or "Give epinephrine" row looks like confirmation that something was done. Stale ticks create false-positive reassurance, and stale timers erode trust in the timer.
* **Fix:**
  * Auto-clear ticks after N hours (e.g. 4 h) or on app launch, and show a banner on any condition with ticks: "Ticks from 3 days ago · Clear".
  * Treat ticks as session scratch (`sessionStorage`) or require an explicit "Start checklist".
  * Auto-stop or prompt for timers older than about 2 h ("A code started 5 h ago is still running — End it?"). Release the wake lock on stop.

---

## 4. MAJOR findings

### M-1 · Search is whole-text substring matching: wrong order, noisy short queries, and abbreviation/typo/synonym gaps
* **Location:** `search()` in `app.js` L40–59, `index` L36–39; keywords in `data.js`.
* **Evidence (250-query run):**

| Query | Result |
|---|---|
| `PE` | 25/25 hits. **Hyperkalemia #1, Pulmonary embolism #7** (the name "Hyperkalemia" contains "pe"). The user explicitly cares about PE. |
| `GIB` | 1 hit: **Acute ischemic stroke** (wrong condition) |
| `MI` / `K` / `OD` / `af` | 25 / 25 / 23 / 22 hits; essentially no ranking signal |
| `TIA` | AF-RVR #1, Stroke #4 (substring in "potential" etc.) |
| `epi` | Status **epi**lepticus #1 |
| `PTX` | Ventilator alarms #1 (Tension pneumothorax isn't hit) |
| `VT` | Cardiac arrest #1; Unstable tachycardia #3 (should be #1) |
| `vtach`, `v-tach`, `vfib`, `heart attack`, `sz`, `levophed`, `epipen`, `pulmonary embolus`, `hypoglycaemia`, `hyperkalaemia`, `anaphlaxis` (typo) | **0 results** and a generic "No matches" |
| `afib`, `a-fib`, `DKA`, `HHS`, `code`, `code blue`, `CVA`, `STEMI`, `DTs`, `CIWA`, `narcan`, `SVT`, `ROSC`, `RVR` | Correct top hit. Good. |
| `timer`, `sbar`, `handoff`, `GCS` (→ Status epilepticus) | Tools are not searchable |
| `PE `, `dka ` (trailing space) | Handled correctly (trimmed). |

* **Why it matters:** A stressed nurse reads the first row and taps it. "PE" and "GIB" put an unrelated condition on top. A total miss on "vtach" or a one-letter typo forces a re-type.
* **Fix:**
  1. Rank *exact token / alias matches* (name tokens + `keywords` tokens) above substring hits in clinical body text. Do not search body text at all for queries shorter than 3 characters, or at least rank it last.
  2. Add an alias table: `vtach|v-tach|vt → unstable-tachy + cardiac-arrest`; `vfib|v-fib|vf`; `heart attack|MI|ami → acs-mi`; `gib|ugib|lgib → gi-bleed`; `sz|convulsion → status-epilepticus`; `levophed|norepi`; `epipen`; `ptx|pneumo`; `hypoglycaemia`/`hyperkalaemia` UK spellings; `PE|pulmonary embolus|clot|VTE`.
  3. Add cheap fuzzy matching (Damerau-Levenshtein ≤1 for tokens ≥5 chars) so "anaphlaxis" works. Also add "Did you mean …?" for 0 results and a `<mark>` on why a row matched.
  4. Index Quick tools and reminders in the same list (type badge "Tool").
  5. **Enter should open the top result.**
  6. Autofocus search from the Home tab if desired, or add a prominent bottom "Search" shortcut.

### M-2 · The timer lives on a different screen from the checklist; no timer control inside the cardiac-arrest page
* **Location:** `renderActionBar()` (condition pages replace the tab bar); the timer chip is a link to `#/tools` (`index.html` L36).
* **Evidence:** From Cardiac arrest the nurse must Back → Quick tools → Start (3 taps) and then leave the checklist to log epi/shock. The only in-page cue is a status chip that is not interactive (it navigates away). Step 1 says "Note TIME" and step 8 says "Record each dose time", but the page has no buttons for either.
* **Why it matters:** In a code the nurse needs the timer, the next-check countdown, epi/shock logging and the checklist *simultaneously*. Today they are two screens joined by back-navigation (and your place in the checklist is lost, because the scroll position is not restored for condition pages).
* **Fix:** Add a **Code mode**. A sticky mini-dock on the Cardiac-arrest page contains: `[⏱ 04:12 · check in 0:48]  [EPI]  [SHOCK]`. A 64 px two-row bar can sit above the action bar. Include a "Start code timer" button right under the glance card. The chip should show the next-rhythm-check countdown and "Epi 3:10 ago", not just elapsed time. Restore scroll when returning from Tools.

### M-3 · Rhythm-check alert is weak and is easily missed
* **Location:** `beep()` (`app.js` L194–202); `tick()`; CSS `.timer-sub.alert`/`@keyframes blink`.
* **Evidence:**
  * Audio is a **single 350 ms, 880 Hz tone at gain 0.25** per cycle. Plus a vibration (Android only; iOS Safari has no `navigator.vibrate`).
  * No repeat until acknowledged.
  * The visual cue exists only on the Tools tab. Elsewhere the only cue is the chip and a 1.8 s toast "2 min — rhythm / pulse check, switch compressor".
  * No `visibilitychange` handler: when the page is hidden (nurse checks EHR, screen auto-locks), the wake lock is released and never re-acquired, timers throttle, and no notification is raised.
  * The blink frame drops white-on-red to 2.2:1. The blink (1.7 Hz) lasts about 10 s every cycle, which is longer than the 5 s allowed by WCAG 2.2.2 without a pause control.
  * Web Audio is silenced on iOS by the ring/silent switch.
* **Why it matters:** The 2-minute pulse/rhythm check is the central timer function; a single quiet beep in a noisy room is easy to miss.
* **Fix:** Make the alert a **full-width banner pinned above the nav on every screen**: "RHYTHM CHECK NOW — tap to acknowledge". It stays until acknowledged. Use a 3-beep pattern repeating every 10 s until acknowledged at higher gain (≥0.6, with a lower first tone for hearing-loss users). Add a non-blinking colour or position change (solid red + icon). Re-request the wake lock on `visibilitychange`. Add a "silent switch" warning on start ("Turn ring switch ON"). Consider the Notifications API for Android installed use.

### M-4 · Information hierarchy: actions are buried under "Recognize", and the section jump bar hides "Escalate"
* **Location:** `renderCondition()` ordering; `.secnav`.
* **Evidence:** Order is *Glance → section buttons → Recognize (open) → Actions → Monitor → Meds → Escalate*. On Cardiac arrest the Actions start at y≈956 px; Escalate at y≈4,271 px of a 4,901 px page. The sticky jump bar is a horizontally scrolling row: at 390 px only 4 of 5 chips show (**"Escalate" is cut off**) and at 360 px "Meds" is cut mid-word, with no scroll hint (see `i390x844-dark-04…`, `a360x640-dark-09…`). The glance card (3 bold 19 px lines) and the Actions list (13 steps of up to four 18 px lines) repeat each other.
* **Why it matters:** For emergencies, "what do I do now" should beat "how do I recognise it". The nurse in a code already knows what a code is.
* **Fix:**
  * For `emergency: true` conditions, order Glance → **Actions** (open) → Escalate → Meds → Monitor → Recognize (collapsed).
  * Make the jump bar a fixed 5-up grid, or show only icons+short labels ("Do", "Meds", "Call", …) so all items are visible.
  * Shorten Actions to a verb-first line with the dose/number in bold (e.g. "**Epinephrine 1 mg IV/IO** q3–5 min · note time"). Keep details one tap away ("More").
  * Have the glance card link/anchor to the matching step.

### M-5 · Contrast failures on the primary alert colour (dark theme)
* **Location:** `--red: #ff5964` used as a background under white text: `.badge.em`, `.callpill`, `.timerchip`, `.timer-sub.alert`, `.logo`.
* **Evidence:** 3.06:1 (see §2.2). The CALL pill inside a ticked step falls to 2.22:1 because the whole row has `opacity: .72`.
* **Fix:** Use dark ink on the coral (`#0a0e14` on `#ff5964` = **6.32:1**), or use a deeper red with white text (`#d32f3f` = 4.94:1, `#c62a38` = 5.54:1). Do not apply `opacity` to rows containing badges; dim colours instead. Keep the light theme red (`#c4001a` already 6.25:1). Raise border colours to ≥3:1 where a border alone defines the control (e.g. `#6b7f99` on dark = 4.7:1).

### M-6 · Review status is invisible in normal use (human-factors / labelling)
* **Location:** `renderCondition()` footer; Home footer; About.
* **Evidence:** "NOT YET CLINICALLY REVIEWED" and "Reviewed by: — (not yet reviewed)" exist only on the About tab. Condition pages carry a 13 px grey footer at the very end of a ~4,500 px page. The `facilityNote` ("Facility contacts") is empty, so the About page shows no rapid-response number. The doses (e.g. epi 1 mg/mL IM in anaphylaxis, 1 mg IV in arrest) sit under a "VERIFY" box but with no visible draft marker.
* **Why it matters:** IEC 62366 / ISO 14971 expect the intended-use limits and known residual risk to reach the point of use. If someone installs this before review, nothing on a clinical screen says it is a draft.
* **Fix:** Show a persistent but compact "DRAFT — not clinically reviewed" strip under the header (amber, ≥14 px) until `reviewedBy` is filled. Move the reviewed-by and date into every condition's header ("Reviewed 2026-11-01 · v1.0"). Make a facility's rapid-response number a tappable `tel:` link in the action bar (note: `format-detection: telephone=no` stops iOS auto-linking, so the app must supply the link itself).

### M-7 · Large text (200%): header and bottom bars break, emergency cards break words
* **Location:** `.topbar{height:calc(56px + var(--safe-t))}`, `.brand`, `.card .txt{overflow-wrap:anywhere}`, `.tabbar`, `.actionbar`.
* **Evidence:** (`*-textx2-*`, `*-textx1.5-*` screenshots)
  * At 200% on 360 and 320 px the brand text wraps into two lines (112 px tall) inside the **fixed 56 px** header, so "ICU" is clipped above the viewport.
  * At 150% on 320 px the brand is already 84 px tall.
  * The action bar grows to 110–129 px (20% of a 640 px screen).
  * "Quick tools" wraps in the tab bar.
  * Emergency cards break mid-word ("Cardia/c arrest", "Anaph/ylaxis"), because of `overflow-wrap:anywhere`. At **100% on 320 px** it is already "Tension pneumothora/x" (`s320x568-light-01-home.png`).
  * The search placeholder is truncated ("Search: cond…").
* **Fix:** Make the header `min-height` instead of `height` and measure it for `body{padding-top}` (a ResizeObserver or CSS grid layout). Use `overflow-wrap: break-word; hyphens: auto` instead of `anywhere`. At ≥150% hide the brand text and keep the logo. Shorten the placeholder to "Search (PE, DKA, …)". Use rem/em units so OS font scale behaves consistently. On very large text collapse the action bar to icons with aria-labels.

### M-8 · Screen reader and focus-order gaps (WCAG 1.3.1, 2.4.2, 2.4.3, 4.1.2)
* **Location:** `index.html`, `renderHome()`, `route()`.
* **Evidence (Chrome a11y tree + focus walk):**
  * **No `<h1>` on Home, Tools or About.** `document.title` is always "ICU QuickRef" on all routes. No route-change announcement. Focus moves to `<main>` only on condition pages, not when switching tabs or returning home.
  * Chips use `role="tablist"` but the buttons are not `role="tab"`, and neither the active chip nor the active tab-bar item exposes state (`aria-pressed`/`aria-selected`/`aria-current`). The state is shown only by fill colour.
  * Tab-bar icons (`⌂ ☰ ⓘ`) are read aloud as glyph names. The `+` logo and netdot are not hidden or labelled. The status dot (green/amber) is colour-only and unannounced.
  * Focus order: on Home the bottom tab bar is at position **44 of 46**. On Cardiac arrest the **Back/Save/Reset bar is position 33 of 36**, after about 30 step buttons. No skip link or landmark for the action bar.
  * Details summaries expose "Recognize ▾" because the arrow is CSS `::after` text. When a step is done the number span is `display:none`, so the accessible name loses its step number.
  * `main` gets a visible 3 px blue frame when focused programmatically (see m-9).
* **Fix:** Add one `<h1>` per view (visually hidden is fine), set `document.title` per route ("Hyperkalemia · ICU QuickRef"), and move focus to the h1. Fix chip semantics (`aria-pressed` on buttons, drop `tablist`). Add `aria-current="page"` to the tab bar. Mark icons `aria-hidden="true"`. Give the netdot `role="img" aria-label="Online"/"Offline"`. Put the action bar early in the DOM (visually fixed at the bottom via CSS), or give it `role="toolbar"` and a "Skip to actions" link. Use `aria-live` text for rhythm checks and epi due.

### M-9 · Checklist and action-bar accidental-activation risk
* **Location:** `.step` rows, `.actionbar`, `data-act="reset"`.
* **Evidence:** Each step row is a full-width, 56 px+ toggle with no undo. **Reset** (checklist) is one of four equal-weight buttons, 8 px from Save and Back, and clears all ticks with no confirm (measured: 2 ticks → 0, no dialog). The save button is labelled "Save" (it means favourite); the label "Reset" does not say it clears ticks. "Clear my favorites & ticks" (About) uses a native `confirm()` but also silently resets the timer.
* **Fix:** Replace Reset with "Clear ticks" behind a confirm, or provide an Undo toast ("12 ticks cleared · UNDO"). Move it to the section header as a small text action. Rename Save → "★ Pin". Give ticked steps a tiny timestamp ("✓ 14:32") for auditability. Allow un-ticking only by tap again with a toast. Do not clear the timer from "Clear favorites & ticks".

### M-10 · The 2-min cycle depends on the page being foregrounded; no resume handling
* **Location:** `startTick`, `setWake`.
* **Evidence:** `setInterval(250 ms)` drives both display and the beep; there is no `visibilitychange`/`pageshow` listener (grep: none). If the nurse switches apps or the OS dims and locks the screen, the wake lock (`release` on hidden) is not re-requested and a missed cycle fires one late beep at most (`cyc > lastCycle`), not one per missed cycle.
* **Fix:** Re-acquire the wake lock on `visibilitychange`. On resume, show "Missed rhythm check at 06:00 (1:12 ago)". Keep a time-stamped event list so nothing is lost.

*(M-10 is listed MAJOR because a missed cycle in a code is a patient-safety event. If the team treats this as acceptable by scope, downgrade to MINOR.)*

---

## 5. MINOR findings

* **m-1 · Pre-paint theme script is broken for light-mode users.** `index.html` L23 compares `localStorage.getItem('icuqr.theme') === 'light'`, but `app.js` stores `JSON.stringify` values (`"light"` with quotes). The head script therefore never fires. Verified by blocking `app.js`/`data.js`: theme stayed `dark`. A light-theme user gets a dark flash before JS runs, which is a glare event in a bright room or a dim room. Fix: `JSON.parse` or store the raw string. Also set `theme-color` there.
* **m-2 · The default theme ignores `prefers-color-scheme` and there is no "Auto".** Dark first is a reasonable ICU choice. Add Auto/Dark/Light and a "night" mode that drops pure white (`#f4f7fb` text is fine; red `#ff5964` and the white clock are bright at night).
* **m-3 · Several sub-48 px targets** (see §2.3). Enlarge the section jump buttons to 48, the brand to 48 high, and the footer links (`About` 35×15) to full-width rows. Increase gaps in Reset/Start grids to ≥12–16 px. For gloved use, target 56–64 px for risk-bearing actions (the timer buttons at 64 px are the right model).
* **m-4 · Done-step styling hurts re-reading.** Done rows are dimmed (opacity .72) *and* struck through. A drug dose or step wording can't be re-read after ticking (contrast is OK at 7.4:1, legibility is not). Use a green left rail + ✓ + no strikethrough, or collapse done rows beneath a "Done (3)" chip.
* **m-5 · Small text for meaningful content:** CALL pill, Emergency badge (12 px), progress "0/13" (14 px), category labels (14 px), footers and notes (13–14 px), tab labels (14 px). Raise to ≥14 px minimum (16 px for anything the user must read in a code), and use `rem`.
* **m-6 · Toast timing:** 1.8 s `role=status` toasts carry meaningful information ("Start the code timer first", "2 min — rhythm check") and can be missed, and they sit on top of the timer log. Let important toasts persist until dismissed, and put them at a fixed location that doesn't cover controls.
* **m-7 · Reduced-motion is only partly honoured.** The CSS rule removes transitions/animations (good), but JS `scrollIntoView({behavior:'smooth'})` and `scrollTo({behavior:'smooth'})` still animate (measured: scroll position kept moving 900 ms after the jump under `prefers-reduced-motion: reduce`). Read `matchMedia('(prefers-reduced-motion: reduce)')` and use `behavior:'auto'`. Also, with reduced motion the blinking alert is removed, so give it a non-motion substitute (solid fill + icon).
* **m-8 · Orientation and safe areas.** Manifest `"orientation": "portrait"` prevents landscape on installed Android (WCAG 1.3.4 requires support unless essential; a tablet on an IV pole or cart may be landscape). Landscape layout also leaves ~230–260 px of content height. `env(safe-area-inset-left/right)` are not applied, so a notch in landscape would overlap header/content (inferred; not testable in emulation). Remove the orientation lock, hide the action-bar labels in landscape, and pad with `max(14px, env(safe-area-inset-left))`.
* **m-9 · Focus outline bug.** `:focus-visible` (specificity 0,1,0) beats `main{outline:none}`, so after `app.focus()` on a condition page a **3 px accent frame** appears around the entire `main` box (visible on landscape and tablet widths as vertical blue rules: `land844x390-dark-02-cardiac-arrest.png`). Use `main:focus{outline:none}` or `:focus:not(:focus-visible)`.
* **m-10 · Duplicate "Cl" row in the Common lab ranges table** (`data.js` tools.labs). Two identical rows, one a copy-paste slip; this will erode trust in the rest of the numbers.

---

## 6. SUGGESTIONS

* **s-1 · Bottom-reachable search.** The 60 px search field is at the top (y≈85–145). On 6.1–6.7" phones the top ~25% is outside one-handed thumb reach. Offer a floating "🔍 Search" bar above the tab bar, or let the Home tab double-tap focus the field.
* **s-2 · "Code mode" screen** (wireframe below).
* **s-3 · Epinephrine concentration clarity (for the clinical reviewer).** Cardiac arrest says "Epinephrine 1 mg IV/IO"; Anaphylaxis says "IM 0.3–0.5 mg (1 mg/mL)". Add a visible route-and-concentration chip to each (e.g. "IM = 1 mg/mL · IV push (arrest) = 0.1 mg/mL, 10 mL"). This prevents tenfold confusion between routes. Doses are otherwise written with units and without trailing zeros, which is good.
* **s-4 · Linkify cross-references.** "H's & T's (see Quick tools)", "go to post-arrest care — see Monitor" and "Call rapid response" should be buttons that jump or dial. H's & T's is in a collapsed Quick tools card; put it one tap from Cardiac arrest.
* **s-5 · Haptics/audio feedback for ticks and logs** is Android-only. Add a non-vibrational cue (brief flash and checkmark) so the effect is clear on iOS.
* **s-6 · iOS install polish.** `apple-mobile-web-app-status-bar-style: black` is fine. There is no `apple-touch-startup-image`, so standalone launch likely flashes white before the dark UI paints (inferred; a bright flash in a dark room). Add a dark launch image set or at least a solid-colour body before JS. Detect iPadOS (UA says "Macintosh") for the Add to Home Screen tip. State "Safari only" in the Home tip, not just About.
* **s-7 · Usability evaluation plan.** Before any pilot, run formative think-aloud sessions (n≈8–10 ICU nurses, simulation lab, gloves on, one-handed) on these use scenarios: cardiac arrest; hyperkalemia ECG changes; start timer and log epi; look up "PE" and "vtach". Record use errors, close calls and time-on-task, and feed them into a use-related risk analysis per IEC 62366-1 (hazard-related use scenarios, risk controls). This review is an expert heuristic evaluation, not a validation.

---

## 7. Evaluation against the requested criteria (summary table)

| Criterion | Assessment |
|---|---|
| Time to critical condition | **Good** for the 4 pinned emergencies (1 tap). **Fair** for others (2 taps + typing, or 3+ swipes). Timer is 2–3 taps. |
| Search (abbreviations, typos, synonyms) | **Poor–Fair** (M-1). Exact acronyms with keywords work (afib, DKA, code, CVA). PE/GIB/MI/K misrank; vtach/vfib/typos fail. |
| Information hierarchy | **Good glance card, wrong section order for emergencies** (M-4). |
| Text size / density | 18 px body, good. Many 12–14 px labels. Long action lines (up to 4 lines each) (m-5). |
| Tap targets | Mostly ≥48; exceptions in §2.3. Gaps 8 px (m-3). |
| Contrast | Light theme passes. Dark theme red-bg-white-text fails (M-5). Borders <3:1. |
| Colour not sole signal | **Mostly OK**: CALL pill + number ring + "Emergency" text; done = ✓ + strikethrough; epi due = text + colour. **Exceptions:** active chip/tab (fill only, no ARIA state), netdot (green/amber only), "RHYTHM CHECK" blink (motion/opacity only). |
| Dark/light mode | Dark default is apt; light is the better-contrast theme. Flash bug m-1; no Auto m-2. |
| Scrolling vs sticky info | Sticky header, sticky jump bar and fixed action bar are good. The page is 4,200–4,900 px tall, but the key content (glance) is above the fold. Timer is not sticky on condition pages (M-2). |
| Accidental taps | See C-1, C-2, M-9. |
| Code timer UX | See C-1, C-2, M-2, M-3, M-10. Strong points: large 56 px digits, `tabular-nums`, next-check countdown, epi "due" cue, wake-lock. |
| Error prevention | Weakest area. No confirm, undo, debounce or expiry (C-1–C-3). |
| Screen reader labels | Buttons and controls mostly named (steps use `aria-pressed`); gaps in headings, titles, chip/tab state, glyphs (M-8). |
| Focus order | Action bar and tab bar last in DOM (M-8). |
| Reduced motion | CSS yes; JS smooth scroll no (m-7). |
| 200% text | No horizontal scroll (good). Header clipping, word-breaking (M-7). |
| Landscape | Usable but cramped; installed Android is locked to portrait (m-8). |
| Notch / safe areas | Top and bottom insets handled (`viewport-fit=cover`, `env()`). Left and right not handled (m-8). |
| iOS/Android install | Manifest valid (maskable icon has a safe zone; shortcuts for Cardiac arrest, Anaphylaxis, Code timer on Android). Install guidance exists, but only on Home tip and About. No iOS splash; orientation lock; no screenshots in the manifest (s-6). |

---

## 8. Concrete layout and wording improvements

### 8.1 Code timer ("Code mode") — proposed layout (portrait, thumb-first)

```
┌──────────────────────────────┐
│ ● CODE  12:40      [End ▾]   │  ← sticky; End = hold 1 s / confirm
│ Rhythm check in 0:48  ━━━━━░ │  ← ring/progress, solid colour at ≤10 s
│ Epi ×2 · last 3:10 ago  (due 1:50) │
│ Shocks ×1 · last 4:30 ago    │
├──────────────────────────────┤
│  [   EPI GIVEN   ] [ SHOCK ] │  ← 72 px high, 12+ px gap
│  Undo last: Epi 06:12  ↩     │  ← 6–8 s snackbar, persistent "undo last"
├──────────────────────────────┤
│ ACLS checklist (this screen) │
└──────────────────────────────┘
```

* Start button: **Start code** (green) → becomes a pill in the header; End code is a different, guarded control.
* Log: newest first, time-of-day plus elapsed. Export or copy-to-clipboard ("Copy summary for chart") would aid documentation, which the app already says must be done per policy.

### 8.2 Wording

| Current | Proposed | Why |
|---|---|---|
| `Start code` / `Stop` / `Restart` | `Start code` / `End code…` / `Resume` / `New code…` | "Restart" erases data; "Stop" is too easy. |
| `Reset` (timer) | `Clear log…` (confirm) | Says what is lost. |
| `Epi given` | `Epinephrine given` (+ route if relevant) | Abbreviation under stress; ties to dose logging. |
| `Reset` (checklist) / `Save` | `Clear ticks…` / `★ Pin` | "Save" suggests saving state. |
| `First things first` | `Do now` | Shorter, imperative. |
| `Immediate actions` / `Monitor / ongoing care` / `Meds / interventions to anticipate` | `Do` / `Monitor` / `Meds (verify)` | Cut 30–40% of header text. |
| `Escalate if` | `Call help if` | Plain language; matches CALL pill. |
| `Search: condition, sign, drug…` | `Search: PE, DKA, afib, K…` | Teaches that abbreviations work. |
| `No matches. Try a shorter word…` | `No match for "vtach". Try: VT, tachycardia, shock` | Recovery help. |
| Toast `2 min — rhythm / pulse check, switch compressor` | Banner `RHYTHM CHECK — switch compressor` | Shorter and persistent. |

---

## 9. QUICK WINS (≤1 hour each, no redesign)

1. `index.html` L23: fix theme read (`JSON.parse`), removing the light-mode flash.
2. Add `touch-action: manipulation` to `html`/buttons; add a 1.5 s lockout on `tstart`; swap "Restart" → "Resume".
3. Replace `.timer-sub.alert` blink with a solid red block; use `#0a0e14` text on coral, or a deeper red (`#d32f3f`/`#c62a38`) for white-text badges.
4. Confirm or undo-toast for **Reset** (checklist) and timer **Reset**; debounce Epi and Shock.
5. Add a visible `aria-live` text and keep the toast until dismissed for the rhythm check.
6. Add an `<h1>` and `document.title` per route; `aria-current` on tab bar; `aria-hidden` on icon glyphs; remove `role="tablist"` from chips and add `aria-pressed`.
7. Set `.secnav button{min-height:48px}` and show all five labels (shorter wording or `flex:1` grid).
8. `overflow-wrap: break-word; hyphens: auto` on cards (not `anywhere`); header `min-height`.
9. Respect `prefers-reduced-motion` for JS smooth scrolling.
10. Add keywords/aliases (`vtach`, `vfib`, `heart attack`, `gib`, `sz`, `levophed`, `epipen`, `ptx`, `hypoglycaemia`, `hyperkalaemia`, `VTE`, `clot`) and rank exact token matches over body text. Skip body-text matching for queries under 3 characters.
11. Expire ticks and stale timers (4 h / 2 h).
12. `main:focus{outline:none}`; remove the duplicate "Cl" lab row.

---

## 10. Overall verdict

**Verdict: Not ready for clinical use as shipped. Promising design, high-risk controls.**

* Layout, theming, offline model and emergency-first Home are well-conceived and in several places better than typical reference apps.
* However, the code timer (the highest-stakes interaction) can be broken by a double-tap, can lose its drug log with one tap, and can persist stale state; checklists can show stale ticks; and search can put an unrelated condition first for the very abbreviations nurses use under stress.
* After fixing C-1 to C-3 and M-1 to M-5, I would rate it suitable for a **supervised simulation-lab pilot** (not bedside use) pending the clinical content review that the app itself says is outstanding.

### Top-10 fixes (priority order)

1. **Separate Start from End and debounce** (C-1): no start/stop toggle at one position; lockout for 1.5 s; End needs a hold or confirm.
2. **Remove "Restart" data-wipe; confirm Reset; add Undo and debounce for Epi/Shock** (C-2).
3. **Expire checklist ticks and stale timers; show age of ticks** (C-3).
4. **Rebuild search ranking**: exact token and alias first, no body-text matching for 1–2 character queries, fuzzy for typos, add aliases (PE, GIB, vtach, vfib, heart attack, sz, …), index tools, Enter opens top hit (M-1).
5. **Put timer/epi/shock controls and a start button on the Cardiac-arrest (and any emergency) page** — a sticky Code-mode dock (M-2).
6. **Make the rhythm-check alert unmissable and persistent** with a repeating louder pattern, a global banner and acknowledge, wake-lock re-acquire on visibility, and a missed-check message (M-3, M-10).
7. **Reorder emergency pages**: Glance → Actions → Escalate → Meds → Monitor → Recognize (collapsed); fix the jump bar so Escalate is visible; condense action wording (M-4).
8. **Fix dark-theme contrast** of white on coral (3.06:1) and the opacity-based dimming (2.2:1); raise control borders (M-5).
9. **Make draft/review status and facility contacts visible at the point of use** (persistent "DRAFT" strip, tappable rapid-response number) (M-6).
10. **Accessibility pass**: per-route `<h1>` and `document.title`, correct chip/tab ARIA, `aria-hidden` glyphs, DOM/focus order for the action bar, header `min-height` and break-word at large text, JS reduced-motion, orientation lock removal, safe-area L/R (M-7, M-8, m-7, m-8).

*What's working well (keep):* 1-tap emergency grid; 56–64 px bottom-bar buttons; bold 18–19 px glance card; CALL pill plus ring (not colour-only); `aria-pressed` steps; no pinch-zoom lock and no horizontal overflow at 320/200%; `overscroll-behavior-y: none` (prevents accidental pull-to-refresh); wake lock during a code; offline-first service worker; light theme that passes AA; and clear version/date in every footer.
