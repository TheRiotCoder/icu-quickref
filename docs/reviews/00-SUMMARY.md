# ICU QuickRef peer review: combined summary (Oct 4, 2026)

Verdict from all five reviewers: NOT ready for clinical use. Fine as a supervised simulation-lab / educational pilot after fixes. Keep "NOT YET CLINICALLY REVIEWED" status.

Reviews: 01-icu-nurse.md (178 findings), 02-intensivist.md (178), 03-pharmacist.md (102), 04-software-engineer.md, 05-ux-accessibility.md (30)

## Safety-critical (fix first)
1. Amiodarone in AF with RVR: no exclusion for pre-excited AF (WPW); AHA 2025 = Harm. (nurse AF-2, intensivist AF-1)
2. Checklist ticks and code timer persist across patients (stale state); keyed by index; no expiry. (all reviewers)
3. Doses written as direct imperative steps with no "if ordered" wording; disclaimer only in Meds section. Mixed units (mcg/kg/min vs mcg/min; units/min). (pharmacist)
4. Epinephrine: 1 mg/mL IM vs 0.1 mg/mL IV code-cart syringe, no concentration warning. (nurse, pharm, intensivist, UX)
5. Nimodipine: no "oral/enteral only, NEVER IV" warning. (nurse, pharm, intensivist)
6. DKA potassium: hold insulin threshold (3.3 vs 3.5) and KCl 20-30 mEq/h with no safeguards; ADA 2024 consensus differs; bicarb cutoff 6.9 vs 7.0; HHS missing.
7. Succinylcholine without contraindications; sedation after paralysis too late in intubation list ("paralyzed is not sedated").
8. Code timer: Start/Stop single toggle (double-tap cancels), Reset/Restart wipe epi/shock log with no confirm, timer survives for hours/days.
9. Corrupt localStorage can freeze the app; no reset fallback.
10. No content freshness/recall: cache-first service worker, update toast 1.8s, no staleness warning offline.

## Clinical content out of date / wrong
- Andexanet listed as reversal agent but withdrawn from US market Dec 2025.
- Post-ROSC temperature control (>=36 h per AHA 2025); ETCO2 wording; AF cardioversion energy; qSOFA reliance (SSC 2026).
- COPD SpO2 target should be 88-92%, app says 92-96%.
- ARDS: NMB threshold, deep sedation, higher PEEP rescue conflict with current evidence.
- ICH/SAH/TBI BP and CPP targets merged; platelets caveat; no lysis contraindication lists for stroke/PE/STEMI.
- Atropine dose inconsistent; tamponade/pericardiocentesis warning for dissection and post-cardiac-surgery.
- Scope of practice: provider-only procedures mixed with nurse tasks; no RN / per-order / provider tagging.
- Only 4 of 25 conditions tagged Emergency.

## Missing conditions (ranked)
HHS, severe asthma/COPD (auto-PEEP), acute pulmonary edema/ADHF, hypertensive emergency/aortic dissection, sodium emergencies, transfusion reaction, post-cardiac-surgery emergencies/arrest, tracheostomy/difficult airway/cric, severe TBI/spinal cord injury, acute liver failure, delirium/agitation.

## Software / UX majors
- Search misses common terms (vtach, vfib, heart attack, levophed, sz); "PE" ranks 7th; "MI" matches all.
- Timer is on a different screen from arrest checklist (3 taps).
- Rhythm-check beep: single beep, silent after relaunch.
- No CSP; inline script/styles; public, indexable site with review status only in About.
- Dark theme red contrast 3.06:1; large text clipping; no headings/page title for screen readers; Reset 8px from Save without confirm.
- Light theme flash bug (quoted "light" string), duplicate Cl row in labs, portrait lock.

## Recommended policy (pharmacist)
Default to "anticipate drug class" with no numbers. Optional facility-configurable reference-dose layer only for nurse-initiated standing orders. Never show numeric doses for infusions or high-alert drugs. Add content-expiry banner.
