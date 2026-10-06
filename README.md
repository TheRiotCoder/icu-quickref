# ICU QuickRef

**Live app: [icu-quickref.pages.dev](https://icu-quickref.pages.dev)**

Install it on a phone from the browser: on iPhone, open the link in Safari and tap Share, then Add to Home Screen. On Android, open it in Chrome and tap Install app.

Offline-capable quick-reference web app (PWA) for ICU nurses: disease processes and the steps to follow, built for fast use on the job. Installs on iPhone and Android from the browser.

**Status: NOT YET CLINICALLY REVIEWED.** Reference aid only, not a substitute for provider orders, facility protocol, or clinical judgment.


## Layout
- `app/` — the deployable site (static files; see `app/README.md` and `app/CHANGELOG-content.md`)
- `docs/reviews/` — v1 peer reviews (ICU RN educator, intensivist, critical care pharmacist, software engineer, UX/accessibility) and combined summary
- `docs/icu-quickref-upgrade-ideas.md` — feature ideas for clinical review
- `tools/content-build/` — scripts that generate `app/data.js` (`node build.js`)
- `tools/app-build/` — sources and headless-Chrome tests for `app/app.js`
- `tools/validate-data-v2.js` — content validator: `node tools/validate-data-v2.js app`

## Deploy (Cloudflare Pages)
`npx wrangler pages deploy app --project-name icu-quickref --branch main`

Before each release, bump `meta.version` in data.js, `version.json`, and `CACHE_VERSION` in `sw.js`, then run `node app/scripts/check-release.js`.
