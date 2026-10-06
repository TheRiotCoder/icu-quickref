# CHANGELOG — clinical content (data.js) v1 → v2.0.0

**Date:** 2026-10-04 · **Status:** NOT YET CLINICALLY REVIEWED. This is a draft for educator and medical director review. **Content expires:** 2027-04-04 (`meta.expires`)
**Scope of this change:** only `data.js` (plus this file). App code (app.js, index.html, sw.js…) is owned by the app developer.
**Sources of findings:**
- `/workspace/reviews/00-SUMMARY.md`
- `01-icu-nurse.md` (prefix **N**)
- `02-intensivist.md` (prefix **I**)
- `03-pharmacist.md` (prefix **P**)
- the clinical parts of `05-ux-accessibility.md` (prefix **U**)

Finding ids are the reviewers' own ids.

## 1. Content policy applied

1. **Doses.**
   - **No numeric doses or rates for infusions or high-alert drugs.** This covers vasopressors and inotropes, insulin infusions, heparin, KCl/phosphate, sedative/analgesic/paralytic infusions, alteplase/tenecteplase, hypertonic saline 3%/23.4%, PHENobarbital, nitroprusside/niCARdipine/clevidipine/esmolol, octreotide/PPI infusions, and NAC. For these the text gives the drug or class plus "per order / facility protocol / pump library".
   - **Bolus reference doses kept.** All reviewers verified them. Each one states concentration, route and units, and says "if ordered / per protocol / on code-leader order":
     - ACLS epinephrine 1 mg IV/IO (0.1 mg/mL)
     - ACLS amiodarone 300/150 mg or lidocaine (arrest only)
     - adenosine 6/12 mg
     - atropine 1 mg q3–5 min, max 3 mg
     - IM epinephrine 0.3–0.5 mg of 1 mg/mL
     - D50 25 g / D10, and glucagon
     - aspirin 162–325 mg; SL nitroglycerin 0.4 mg
     - status-epilepticus benzodiazepine boluses
     - calcium gluconate 10%
     - nimodipine 60 mg ENTERAL
     - inhaled albuterol
   - **Defibrillation energy** is per the device's labeled energy, or as the provider orders.
2. **Scope tags on every action and monitor item (G-3, P X-01).**
   - **RN**: the nurse can do it independently or under a standard nursing protocol.
   - **ORDER**: needs an order or standing protocol.
   - **PROV**: a provider performs it. The text always starts "Anticipate/assist: …".
   - A leading **"!"** in `t` marks a CALL/escalate step (app.js shows it as a CALL pill).
3. **Every meds[] starts with a "VERIFY PER FACILITY PROTOCOL / ORDER…" line.** `meta.medNotice` says medication steps are preparation prompts, not orders (P X-01, X-03, X-05, X-06).
4. **High-alert callouts** sit in the per-condition `warnings[]` (G-4, P X-03). Tall Man lettering is used for ISMP pairs (P X-07): DOPamine/DOBUTamine, PHENobarbital/PENTobarbital, niCARdipine, cefTRIAXone, levETIRAcetam, methylPREDNISolone, hydrALAZINE. Abbreviations like "IN" and "NE" are spelled out.
5. **Uncertain numbers** were replaced with "per order / facility protocol". No numbers or citations were invented. Sources that reviewers flagged "[from knowledge – verify]" are marked "reviewer to confirm" in `sources`.

## 2. Schema v2 (for the app developer)

**Top level:**
- `meta: {version:"2.0.0", date:"2026-10-04", status:"NOT YET CLINICALLY REVIEWED — draft for educator/medical director review", expires:"2027-04-04", schema:2, scope, scopeTags, medNotice, disclaimer}`
- Legacy `version`, `date`, `reviewStatus`, `reviewedBy`, `facilityNote`, `sources`, `categories`, `tools` are kept.

**Per condition:**
- `id`, `name`, `category`
- `emergency` (boolean, always present)
- `keywords` (array of strings, synonyms and abbreviations)
- `warnings` (array of strings)
- `glance`, `recognize`, `meds`, `escalate` (arrays of strings)
- `actions` / `monitor`: arrays of `{id:"<cid>-a<n>" | "<cid>-m<n>", t, s:"RN"|"ORDER"|"PROV"}`

Conditions are ordered by time-criticality (emergencies first).

## 3. Cross-cutting findings

| Finding | Severity | Disposition |
|---|---|---|
| N G-1, I X-2, U C-3 (tick/timer persistence) | CRITICAL/MAJOR | **Deferred to the app developer** (app.js). data.js now supplies stable item ids (`<cid>-a1`…) so ticks can be keyed by id instead of by index |
| N G-2, I X-1, P X-08 (sources out of date) | MAJOR | `sources` updated: AHA 2025 CPR/ECC, SSC 2026, ATS 2024 ARDS, AHA/ASA 2026 AIS, AHA/ASA 2022 ICH, AHA/ASA 2023 aSAH, BTF 4th ed, ADA/EASD 2024 hyperglycemic crises, ACC/AHA 2025 ACS, AHA/ACC 2026 PE (as cited by reviewers), HALT-IT, the FDA andexanet notice, ISMP high-alert list, STS CALS consensus (edition to be confirmed) |
| N G-3, P X-01 (scope tagging, dose imperatives) | MAJOR/CRITICAL | RN/ORDER/PROV on every item; "if ordered/per protocol" wording; `meta.medNotice` |
| P X-02 (unit collisions) | CRITICAL | All infusion numbers removed. Where units matter, warnings say "check mcg/min vs mcg/kg/min; vasopressin units/min vs units/h"; no line prints two units for one drug |
| N G-4, P X-03, I X-3 (high-alert layer) | MAJOR | HIGH-ALERT warnings plus "independent double check, smart-pump library" on insulin, heparin, K, vasopressors, sedatives/NMB, lytics, 3%/23.4% NaCl, PHENobarbital, magnesium (eclampsia) |
| P X-04 (peripheral vs central, extravasation) | MAJOR | Sepsis and cardiogenic shock: peripheral pressor only per policy, with hourly site check and an extravasation algorithm. Central-only for 23.4% NaCl and calcium chloride. D50 needs a large vein |
| P X-05 (weight basis) | MAJOR | `meta.medNotice`: measured weight; dosing weight per order/pharmacy. Weight-based infusion numbers removed |
| P X-06 (renal/hepatic) | MAJOR | `meta.medNotice` adds renal/hepatic per pharmacy. Card-specific notes: AKI, hyperkalemia insulin in renal failure, lorazepam in liver disease, ALF |
| P X-07 (LASA/Tall Man) | MAJOR | Tall Man applied; "IN" spelled "intranasal"; TXA spelled out as tranexamic acid where ambiguous |
| N G-5 (emergency flags) | MAJOR | 21 conditions flagged `emergency:true` (see §5) |
| I QT-1 (COPD SpO₂) | MAJOR | 88–92% in Quick Tools vitals, the O₂-targets reminder, the asthma/COPD card and resp-failure. The validator enforces this |
| I QT-2, N (qSOFA) | MINOR | Quick Tools and sepsis: "do not rely on qSOFA alone" (SSC 2026) |
| U / summary (duplicate 'Cl' lab row) | MINOR | **There is no duplicate in data.js** (labs has one Cl row). If it still shows up, it is an app.js rendering issue. The validator checks for duplicate lab labels |
| N G-6..12, I X-4..6, P X-09, X-10 | MINOR/SUGG | Adult-only scope in `meta.scope`; a medication-safety reminder card; reversal-agent hazard flags (protamine slow, vitamin K slow IV); "rapid response/ICU provider" wording; facility numbers left blank for local entry (`facilityNote`) |

## 4. Per-condition dispositions (original 25)

Each table lists the CRITICAL and MAJOR findings and how they were fixed. MINOR and SUGGESTION findings are grouped.
