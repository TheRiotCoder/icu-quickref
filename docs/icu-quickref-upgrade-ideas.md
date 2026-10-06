# ICU QuickRef — upgrade ideas for clinical review

For: nurse educator / clinical reviewer  
App: https://icu-quickref.pages.dev (v2.0 draft — not yet clinically reviewed)  
Date: Oct 5, 2026

Please mark each item **Want / Later / Skip** and add notes. Nothing below is built yet unless noted.

---

## A. Content (what nurses look up)

1. **Facility protocol layer** — blank fields for your ICU’s standing orders, code cart concentrations, vasopressor pump library, and who to call (rapid response, code, stroke, STEMI).
2. **Drug card mode** — optional “anticipate only” vs “reference dose” toggle controlled by pharmacist + educator (no free-text dose editing by staff).
3. **Weight-based helpers** — predicted body weight, drip rate calculator that still says “verify per order/pump.”
4. **More conditions (tier 2)** — malignant hyperthermia / NMS, adrenal crisis, thyroid storm / myxedema, GBS / myasthenia crisis, DIC / HIT, line–device emergencies (chest tube, EVD, IABP basics), postpartum / obstetric ICU emergencies.
5. **Pediatric / mixed ICU mode** — separate adult vs peds content (or hide peds entirely).
6. **Post-op specialty packs** — neuro ICU, CTICU/CALS deep dive, transplant, burn.
7. **Local “pearls” notes** — short educator-approved tips per condition (e.g., “our code cart epi is ___”).
8. **Printable / shareable one-pagers** — PDF of a single condition for badge buddies or orientation binders.
9. **Guideline citation chips** — tap a line to see which guideline edition it came from (AHA 2025, SSC 2026, etc.).
10. **Review workflow** — “Reviewed by ___ on ___” per condition, with a changelog of clinical edits.

## B. On-shift usability

11. **One-tap “I’m with a patient” clear** — bigger New patient control; auto-clear ticks when leaving the unit (time-based already exists).
12. **Glove / wet-hand mode** — even larger buttons, higher contrast, fewer small targets.
13. **Code mode layout** — arrest card + timer + epi/shock log on one screen, always on.
14. **Voice search** — “open hyperkalemia” hands-free during a rush (privacy: on-device only).
15. **Homescreen widgets / shortcuts** — Arrest, Anaphylaxis, Stroke, Timer as separate icons.
16. **Night / bright ICU presets** — one-tap max contrast for bright lights vs true dark for night.
17. **Haptic-only rhythm check** — for silent codes / night shift (vibration pattern without beep).
18. **Pinned “unit favorites”** — charge nurse sets the top 8 conditions for this ICU.

## C. Training & orientation (still quick-ref, not a course)

19. **Simulation checklists** — same cards with a “sim mode” that scores completed steps for skills day.
20. **New-grad “why” blurbs** — optional one-sentence rationale under each action (hidden by default so emergencies stay fast).
21. **Quiz / flash cards from content** — optional, off-shift only, clearly separated from bedside mode.
22. **Preceptor sign-off list** — track which emergencies the orientee has reviewed.

## D. Safety & governance

23. **Clinical owner dashboard** — who can edit content, required dual sign-off (RN educator + MD/pharm).
24. **Forced update / withdraw** — remote “this card is withdrawn” banner if a dose or drug changes.
25. **Expiry reminders** — email/Slack to educator 30 days before content expiry.
26. **Audit log** — what changed, when, by whom (no patient data).
27. **Scope badges audit** — report of any step missing RN / Per order / Provider tags.
28. **Offline freshness SLA** — refuse to open if not verified online in X days (configurable).

## E. Technical / platform

29. **Native phone packaging** — Capacitor/TWA so it installs from Play Store / TestFlight if IT requires store apps.
30. **Single sign-on / staff-only access** — if the hospital doesn’t want a public link.
31. **Multi-unit tenants** — same app, different protocol packs per hospital or ICU.
32. **Shared iPad kiosk mode** — always-on at the nurses’ station with auto New patient.
33. **Better offline media** — tiny diagrams (e.g., needle decompression landmarks) cached on device.
34. **Accessibility pack** — full screen-reader pass, dyslexia-friendly font option, 200% text QA on real devices.

## F. Integrations (only if IT allows)

35. **Link out to hospital policy library** (read-only URLs).
36. **No EHR write-back** recommended — keep this as reference-only to avoid order/documentation risk.
37. **Push “protocol updated” to staff** — opt-in notifications when educator publishes.

---

## Suggested first picks (if time is limited)

| Priority | Item | Why |
|----------|------|-----|
| 1 | Facility protocol layer (#1) | Makes it *your* ICU’s app |
| 2 | Clinical review workflow (#10, #23) | Needed before real bedside use |
| 3 | Code mode layout (#13) | Highest stress use case |
| 4 | Forced update / withdraw (#24) | Safety when guidelines change |
| 5 | Tier-2 conditions you actually see (#4) | Fill real gaps from your unit |

---

## Questions for her

1. Bedside only, orientation only, or both (with a hard “bedside mode” switch)?  
2. Should **any** numeric doses appear, or class-only forever?  
3. Which ICU(s): med-surg ICU, CVICU, neuro, mixed?  
4. Must it stay a public link, or staff login only?  
5. Top 5 conditions her unit mishandles or looks up most?

---

*Draft helper list from app build peer review + common ICU quick-ref needs. Final priorities should come from your clinical reviewers.*
