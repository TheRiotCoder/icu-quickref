# Pharmacist Peer Review — ICU QuickRef (medication / intervention content)

**Reviewer role:** BCCCP critical care pharmacist / medication safety officer perspective
**App reviewed:** `/workspace/icu-quickref/` v1.0.0-draft (content date 2026-10-04) — `data.js` (content), `app.js` (rendering), `README.md`
**Review date:** 2026-10-04 (America/Chicago)
**Files modified in the app:** none (read-only review)

---

## 0. Scope, method, and honest limits

* Read all of `data.js` (25 conditions + Quick Tools: vitals, labs, GCS, RASS, reminders) and the rendering code in `app.js` that determines *how* drug text is displayed (disclaimers, filtering, tick-boxes).
* Every drug / dose / concentration / rate / route / drug-related instruction is extracted in Section 4 (one table per condition) and graded.
* Where a recent guideline or regulatory event bears on a statement, I checked it online (2025 AHA ECC/ACLS algorithm page, SSC 2026, AHA/ASA AIS 2026, ADA/EASD 2024 hyperglycemic crises consensus, FDA Andexxa communication). Those are cited by name/URL below. **All other statements come from my working knowledge of product labeling, ISMP/Joint Commission-type medication-safety principles, and standard ICU references; I did not re-open each primary source and I mark items where I am unsure.** I do not cite page numbers or recommendation grades I did not see.
* Dose "✔" means: consistent with commonly published adult ranges as I know them. It does **not** mean it is safe to publish without context. "Verified online" is stated explicitly where applicable.
* I am not reviewing non-drug clinical accuracy (e.g., needle-decompression landmarks, vent strategy) except where it touches oxygen/sedation/paralytic use.
* Legend — Severity: **CRITICAL** = could plausibly cause serious harm/death if followed literally or misread; **MAJOR** = significant safety gap, wrong/stale/ambiguous content, or missing high-alert safeguard; **MINOR** = accuracy/clarity/completeness issue with lower harm potential; **SUGGESTION** = improvement.

---

## 1. Executive summary and verdict

**Verdict: NOT APPROVED for clinical use as written. Acceptable as an educational draft only. Conditional approval is possible after the CRITICAL and MAJOR items below are fixed and the dose-display policy in Section 2 is adopted.**

What is good (credit where due):
* Most *numeric ranges* are within commonly published adult ranges (ACLS drug doses, adenosine, status-epilepticus first/second line doses and caps, nicardipine titration, alteplase/tenecteplase stroke dosing, TXA CRASH-2 regimen, ceftriaxone/octreotide for varices, calcium chloride↔gluconate equivalence, hypertonic/mannitol ranges).
* Several smart design choices: no antibiotic doses; no NAC, PCC, protamine, idarucizumab, or HIE doses; "PE" is written for fosphenytoin; "units" (never "U"); "avoid routine flumazenil"; "adenosine regular rhythms only"; "thiamine with/before dextrose"; "check K before insulin"; "hypertonic saline Na limits"; salicylate intubation warning; charcoal exclusions; succinylcholine contraindications; "VERIFY PER FACILITY PROTOCOL" in every Meds list.
* Disclaimers exist on the About page, in each condition footer, and above each Meds list.

What stops approval:
1. **Doses are embedded in imperative, tick-to-complete "Immediate actions" steps and "First things first" cards, where no order/verify language appears** (only the Meds sub-section carries the banner, and `app.js` line 152 actually *strips* the per-condition "VERIFY…" line and replaces it with one generic sentence). See X-01.
2. **Unit/format collisions for the same drug** (epinephrine as mg, mg/mL, mcg, mcg/min, mcg/kg/min; dopamine in mcg/kg/min next to epinephrine in mcg/min; vasopressin units/min; glucagon mg then mcg/min). See X-02.
3. **DKA potassium/insulin-hold thresholds and K⁺ replacement rate are outdated and contradict the app's own cited 2024 consensus** and omit line/monitoring requirements for high-rate K⁺. See DKA-1.
4. **No high-alert-medication handling anywhere**: zero mentions of independent double check, smart-pump/drug library, standardized concentrations, weight verification, or extravasation rescue. See X-03/X-04.
5. **No obesity/dosing-weight, renal, or hepatic guidance** for most drugs. See X-05/X-06.
6. **Stale or withdrawn content**: ACLS cited as 2020/2023 (2025 AHA guidelines exist), SSC 2021 (SSC 2026 published 03/23/2026), AIS 2019 (AHA/ASA 2026 exists), and **andexanet alfa was withdrawn from the US market Dec 22, 2025** but is listed as a reversal agent in three conditions. See X-08/HS-1/ICH-2.
7. **Specific wrong/ambiguous items**: COPD SpO₂ target "92–96%" (TOOL-1), atropine 0.5–1 mg vs 1 mg conflict (UB-1), digoxin load without renal/K⁺ safeguards (AF-2), nimodipine without the never-IV warning (ICH-3), IV vitamin K without rate/hypersensitivity warning (ICH-2), 23.4% NaCl without high-alert handling (ICH-1), default 10 units insulin for hyperkalemia (HK-1).

Finding counts: 102 findings (3 CRITICAL, 34 MAJOR, 52 MINOR, 13 SUGGESTION) — see Section 6.

---

## 2. Should the app include doses at all? Recommended safe policy

**My recommendation: default to "anticipate drug class / usual agent / what to have ready / what to monitor / what the big hazard is" — with NO numeric doses by default — and allow a limited, facility-governed "reference dose" layer only for a short whitelist of nurse-initiated emergency interventions.** Reasons: (a) a nurse-facing offline PWA cannot know weight, renal/hepatic function, allergies, concentration stocked, pump library, or the facility's standing orders; (b) the app is offline-cached and will silently persist stale doses on phones for weeks/months; (c) content is explicitly "NOT YET CLINICALLY REVIEWED"; (d) many errors above are format/unit errors that vanish if doses are not shown.

Proposed tiers:

| Tier | What | Policy |
|---|---|---|
| **A — Show reference dose only if it is a recognized nurse-initiated standing order/protocol at the site** (site-configurable, default OFF) | ACLS epinephrine 1 mg & defibrillation (per code team), anaphylaxis IM epinephrine, hypoglycemia dextrose/glucagon, naloxone titration for respiratory depression, aspirin chewable for suspected ACS, SL nitroglycerin (with hold parameters), albuterol neb | Display with: drug, **concentration and route**, units spelled out, "typical adult published dose — not an order; use your standing order/protocol", and a **facility override string** (so the site replaces numbers with its own approved text). |
| **B — Never show numbers (class wording only)** | Insulin infusions; heparin/enoxaparin; IV potassium/phosphate/magnesium; all vasoactive/inotrope/vasopressor infusions; neuromuscular blockers; sedative/analgesic infusions; propofol; phenobarbital loading; hypertonic saline/23.4%; mannitol; thrombolytics (alteplase/tenecteplase); amiodarone/procainamide/digoxin/diltiazem/esmolol; reversal agents (PCC, vitamin K, protamine, idarucizumab); NAC; antidotes; antibiotics | Wording: "Anticipate **[class]** — e.g., norepinephrine first-line. Dose, concentration, line, and pump settings come from the order and pharmacy-standard concentration. **High-alert: independent double check; use smart-pump drug library.**" |
| **C — If a sponsor insists on keeping numbers** | Any retained dose | Require: pharmacy/P&T + medication safety officer sign-off per drug; **one unit format per drug app-wide**; concentration and route on every line; hard caps stated (max dose/rate); renal/hepatic/obesity flag; "ORDER REQUIRED" on every line (not only in the Meds section); content-expiry/review date shown on every card; change-control log in `reviewedBy`. |

Additional app-level safeguards to recommend (non-clinical, but they change medication-safety risk):
1. Put the order/verify line **inside the same section as each dose** (Actions, Glance, Escalate, Monitor) or reword imperatives to "**Anticipate / prepare / if ordered**".
2. Do **not** show tick-boxes next to drug administration steps (or label them "preparation checklist — not a MAR"); a ticked "Epinephrine 1 mg IV/IO" looks like documentation.
3. Stop stripping the condition-specific VERIFY line in `app.js` (line 152) or at minimum keep the per-condition text visible.
4. Add a **content expiry** banner (e.g., content > 12 months old or past `reviewBy` date → red "Doses hidden — content out of date") and make the service worker prefer fresh content when online. Offline cache-first behavior means stale doses persist.
5. Add the universal reminders: confirm allergy, weight (measured vs estimated), pregnancy, renal/hepatic function; **read back** verbal orders; independent double check for high-alert drugs.
6. Show the app's `reviewStatus` prominently on every condition screen until reviewed (currently only in footer link/About).

---

## 3. Cross-cutting findings

### X-01 — All — **CRITICAL**
* **Quoted:** Glance: `"EPINEPHRINE IM 0.3–0.5 mg (1 mg/mL) lateral thigh NOW — repeat q5–15 min"`; Actions: `"Epinephrine 1 mg IV/IO every 3–5 min."`, `"INSULIN (once K ≥3.3): regular insulin IV infusion 0.1 unit/kg/h…"`, `"STABILIZE HEART: calcium gluconate 10% 1–3 g…"`; `app.js` L152: `c.meds.filter(s => !/^VERIFY/i.test(s))` and L162: `'<div class="verify">Verify per facility protocol / order. Doses shown are standard published adult ranges, not patient-specific.</div>'` (only inside the Meds section).
* **Issue:** The vast majority of doses (≈70–80%) live in the **Glance, Immediate actions, Monitor, and Escalate** sections as imperative sentences with *no* "if ordered / per protocol" language; the banner appears only in the Meds section. The tap-to-tick UI makes a dose step look like an administered/documented item. The per-condition "VERIFY PER FACILITY PROTOCOL / ORDER" text written in `data.js` is deliberately removed by the renderer. A nurse using the Actions list alone never sees an order requirement.
* **Corrected wording (pattern):** Replace drug imperatives with e.g. `"Anticipate epinephrine IM per anaphylaxis standing order/protocol (typical adult published dose 0.3–0.5 mg of the 1 mg/mL vial, IM ONLY)"`; add a persistent line at top of Actions and Monitor: `"Medication steps are PREPARATION prompts. Give only per order/protocol. Not a MAR."` Remove tick-boxes from drug steps or relabel.

### X-02 — All (esp. Anaphylaxis, Symptomatic bradycardia, Sepsis, Intubation) — **CRITICAL**
* **Quoted examples:**
  * Epinephrine appears as `"1 mg IV/IO"` (arrest), `"0.3–0.5 mg (1 mg/mL)"` IM (anaphylaxis), `"0.05–0.1 mcg/kg/min titrated (e.g., 1–10 mcg/min)"` (anaphylaxis), `"epinephrine 2–10 mcg/min"` (bradycardia), `"epinephrine 5–20 mcg IV"` (push-dose), `"Epinephrine low dose"` (cardiogenic shock).
  * Bradycardia: `"Dopamine 5–20 mcg/kg/min · Epinephrine 2–10 mcg/min"` — **adjacent drugs, adjacent lines, different units (mcg/kg/min vs mcg/min).**
  * Sepsis: `"Vasopressin 0.03 units/min fixed"`; norepinephrine `"0.05–0.5+ mcg/kg/min"`; cardiogenic shock norepinephrine `"0.01–3 mcg/kg/min"`.
  * Anaphylaxis: `"Glucagon 1–5 mg IV over 5 min, then 5–15 mcg/min"` (mg then mcg/min in one line).
  * Post-intubation: `"fentanyl 25–100 mcg/h, propofol 5–50 mcg/kg/min, dexmedetomidine 0.2–1.5 mcg/kg/h"` (three different unit systems in one line).
* **Issue:** Same drug in up to six unit/concentration formats; no concentration or pump-unit guidance. Programming epinephrine "2–10 mcg/min" as mcg/kg/min is a 70× overdose (≈140–700 mcg/min in a 70 kg adult); vasopressin read as units/h instead of units/min is a 60× error; mg vs mcg glucagon is a 1000× unit trap; "1 mg/mL" vs "0.1 mg/mL" epinephrine is a known 10× confusion.
* **Corrected wording:** (1) one canonical unit per drug app-wide, matching the **facility's smart-pump library** (many sites use norepinephrine/epinephrine in mcg/min, others mcg/kg/min — the app cannot know); (2) never print two units for one drug in a line; (3) always print concentration with route for bolus epinephrine; (4) for infusions, prefer: `"Epinephrine infusion: dose, concentration and units per order/pump library (check mcg/min vs mcg/kg/min). High-alert: independent double check."`

### X-03 — All infusions/high-alert drugs — **MAJOR**
* **Quoted:** (absence) — searched `data.js`: 0 occurrences of "double check/double-check", "smart pump", "drug library", "standard concentration", "boxed".
* **Issue:** ISMP high-alert drugs appear throughout: IV insulin, heparin, IV potassium, concentrated NaCl (23.4%), neuromuscular blockers, opioid/propofol/dexmedetomidine infusions, epinephrine/norepinephrine/vasopressin/dopamine/dobutamine/milrinone, amiodarone, magnesium, alteplase/tenecteplase, phenobarbital, nitroglycerin/nicardipine/clevidipine infusions, hypertonic saline, digoxin, concentrated dextrose. None carries a handling reminder.
* **Corrected wording (add once per Meds section where relevant):** `"HIGH-ALERT: verify drug, concentration, weight, dose and pump programming with a second qualified clinician (independent double check) per facility policy; use the smart-pump drug library; do not override limits without a documented order."`

### X-04 — Pressors, calcium, K⁺, 23.4% NaCl, amiodarone, D50, nicardipine, phenytoin — **MAJOR** (peripheral vs central, extravasation)
* **Quoted:** Sepsis: `"(peripheral OK short-term, then central)"`; Cardiogenic: `"extravasation (central line preferred)"`; Hemorrhagic: `"Calcium chloride 1 g IV (central)"`; ICH: `"23.4% saline 30 mL via central line"`; Hyperkalemia: `"calcium chloride 1 g via central/good IV"`; Sepsis monitor: `"Pressor doses, extravasation"`. Search: 0 hits for phentolamine, antidote for extravasation, site-check frequency, or vein/gauge/concentration limits.
* **Issue:** Guidance is inconsistent between conditions and incomplete. SSC 2026 (verified online, SCCM page) *suggests* starting vasopressors peripherally rather than delaying, but notes (verbatim intent) that data are insufficient to define duration, dose, or access site. Nothing states **site/gauge/proximal vein, hourly site checks, lowest practicable concentration, or the facility extravasation protocol**. Catecholamine extravasation commonly triggers a phentolamine order per facility policy (dose not given here, appropriately) — the app doesn't even prompt to call for it. Same gap for IV potassium rate limits, D50, amiodarone, phenytoin, nicardipine, CaCl, 3%/23.4% NaCl.
* **Corrected wording:** `"Vasopressors may be started peripherally per facility policy: large proximal vein (e.g., antecubital or above) with good blood return; check site at least hourly (frequency per policy); move to central access as soon as available. If infiltration/extravasation: STOP infusion, leave catheter in, aspirate, notify provider/pharmacy and follow the facility extravasation protocol (antidote e.g., phentolamine only per order)."`

### X-05 — Weight-based drugs / obesity — **MAJOR**
* **Quoted:** `"Fluids 30 mL/kg"`, `"UFH 80 units/kg… 18 units/kg/h"`, `"Enoxaparin 1 mg/kg q12h"`, `"rocuronium 1–1.2 mg/kg · succinylcholine 1–1.5 mg/kg"`, `"propofol 1–2 mg/kg"`, `"ketamine 1–2 mg/kg"`, `"lorazepam 0.1 mg/kg"`, `"mannitol 0.25–1 g/kg"`, `"TXA"`, `"insulin 0.1 unit/kg/h"`, `"alteplase 0.9 mg/kg"`.
* **Issue:** No dosing-weight guidance (actual vs ideal vs adjusted; measured vs stated vs estimated). Only phenobarbital mentions IBW. SSC 2026 explicitly says weight-based crystalloid volume uses actual weight, or adjusted/ideal weight if BMI > 30 (verified online). Neuromuscular blockers/induction agents commonly use different weights (practice varies — verify with local policy; I am not asserting a single universal rule). Estimated weight is a known lysis-dosing error source.
* **Corrected wording:** `"Weight-based doses: use a MEASURED weight when possible; the dosing weight (actual / ideal / adjusted) is set by the order or pharmacy protocol — confirm for obese patients."` Add to Glance of conditions with weight-based high-alert drugs.

### X-06 — Renal / hepatic / extremes — **MAJOR**
* **Quoted:** Only isolated mentions: `"(renal adjustments)"` enoxaparin, `"(renal dosing)"` milrinone, `"renally dose all meds (pharmacy)"` AKI, `"Valproate: avoid in liver disease/pregnancy"`, `"Use 5 units… if renal failure"`.
* **Issue:** Missing for: digoxin, magnesium, enoxaparin specifics, TXA, famotidine, lorazepam/diazepam (hepatic), phenobarbital, procainamide (renal; NAPA), levetiracetam maintenance, amiodarone (hepatic/interactions), antibiotics' *first-dose* rule, hyperkalemia insulin, SZC/SPS, fentanyl/morphine (renal), dexmedetomidine (hepatic), propofol, mannitol (renal), nimodipine (cirrhosis), ceftriaxone N/A. Also eGFR/CrCl from creatinine is unreliable in unstable AKI.
* **Corrected wording:** a standing line `"Renal/hepatic impairment, age and weight change doses for many drugs here — dose per order/pharmacy; creatinine-based eGFR is unreliable when kidney function is changing."`

### X-07 — Look-alike / sound-alike, abbreviations — **MAJOR**
* **Quoted:** `"dobutamine"`, `"dopamine"` (same card, lower case), `"phenobarbital"` and `"pentobarbital"` (Alcohol withdrawal / Status epilepticus), `"lorazepam/diazepam/midazolam"`, `"nicardipine"` vs nifedipine (not used), `"TXA"` (also abbreviation for tPA in many hospitals), `"NE"`, `"IN"` (intranasal), `"IM/IN"`, `"SL"`, `"D50/D10"`, `"Epinephrine 1 mg/mL vs 0.1 mg/mL"`, `"fosphenytoin/phenytoin"`, `"ceftriaxone"`, `"HIE"`.
* **Issue:** ISMP-style Tall Man lettering is not used; error-prone abbreviations ("IN" can be misread as IM/IV; "NE"; "TXA" vs "tPA"/"TPA") are used; products with multiple vial strengths (midazolam 1 vs 5 mg/mL, heparin 1,000–10,000 units/mL, epinephrine 1 vs 0.1 mg/mL, insulin) are not flagged. Positive: "units" is always spelled out; leading zeros are used; "mcg" is used.
* **Corrected wording:** Tall Man where ISMP recommends (DOBUTamine/DOPamine, PHENobarbital/PENTobarbital, LORazepam/ALPRAZolam if listed, niCARdipine/NIFEdipine if listed, fentaNYL/SUFentanil if listed, cefTRIAXone, hydrALAZINE/hydrOXYzine if added); spell out "intranasal", "norepinephrine", "tranexamic acid"; add concentration where >1 vial strength exists. (I am confident of DOBUTamine/DOPamine, PHENobarbital/PENTobarbital, and cefTRIAXone being on commonly circulated Tall Man lists; confirm the others against the current ISMP/FDA list.)

### X-08 — Sources / currency — **MAJOR**
* **Quoted:** `sources: ["AHA ACLS Guidelines & 2023 focused update…", "Surviving Sepsis Campaign… 2021…", "AHA/ASA… Acute Ischemic Stroke (2019 + updates)…", "ADA/EASD/JBDS/AACE/DTS… 2024"]`; Sepsis meds `"Vasopressin… when NE ~0.25–0.5"`; Hemorrhage/ICH `"andexanet"`.
* **Issue (verified online):**
  * **2025 AHA Guidelines for CPR & ECC** (Part 9 Adult ALS) exist; the algorithm page lists epinephrine 1 mg q3–5 min, amiodarone 300 mg then 150 mg, lidocaine 1–1.5 mg/kg then 0.5–0.75 mg/kg, biphasic energy "manufacturer recommendation (e.g., 120–200 J)" — the app's numbers still match, but the cited edition is outdated.
  * **SSC 2026** published 03/23/2026 (SCCM site). It: recommends norepinephrine first-line; suggests adding vasopressin on escalating norepinephrine (no fixed NE threshold in the text I saw); suggests IV corticosteroids in septic shock; suggests prolonged β-lactam infusion after a loading dose (**strong**); recommends insulin at glucose ≥180 mg/dL; recommends LMWH over UFH for VTE prophylaxis; suggests intermittent NMBA boluses over infusion in ARDS; recommends NEWS/MEWS/SIRS over qSOFA as a single screening tool (the app uses qSOFA).
  * **AHA/ASA AIS 2026** (Jan 2026) lists tenecteplase 0.25 mg/kg (max 25 mg) or alteplase 0.9 mg/kg (max 90 mg) within 4.5 h; BP <185/110 before and <180/105 for ≥24 h after IVT — matches the app; also adds "no benefit" for intensive SBP <140 after IVT.
  * **Andexxa (andexanet alfa)** — FDA safety communication and AstraZeneca: US commercial sales ended **Dec 22, 2025** (FDA concluded thromboembolic risks outweigh benefit; BLA withdrawal requested).
  * **ADA/EASD 2024 consensus** (cited by the app) differs from the DKA card (see DKA-1/DKA-2).
* **Corrected wording:** Update `sources` to current editions; add `"Last verified against guideline: [date]"` per condition; remove or footnote andexanet.

### X-09 — Reversal agents/antidotes — **MINOR**
* **Quoted:** `"warfarin → 4-factor PCC + vitamin K; dabigatran → idarucizumab; Xa inhibitors → andexanet/PCC; heparin → protamine"` (Hemorrhagic shock, GI bleed, ICH, Tamponade). Also `"naloxone"`, `"glucagon"`, `"calcium"`, `"hydroxocobalamin"`, `"atropine (cholinergic)"`, `"flumazenil: avoid"`, `"pyridoxine in INH toxicity"`.
* **Issue:** Reversal text is accurate in direction (warfarin/PCC+K, dabigatran/idarucizumab, heparin/protamine) but incomplete: no sugammadex/neostigmine (relevant after rocuronium), no fomepizole, digoxin Fab, pralidoxime, lipid emulsion/vasopressor cautions, no protamine reaction/rate warning, no "don't re-dose reversal without order". Absence of dosing here is appropriate.
* **Corrected wording:** Keep dose-free; add one line per agent: hazard flag (e.g., `"protamine: slow infusion; hypotension/anaphylaxis risk (boxed)"`; `"vitamin K IV: slow infusion, hypersensitivity risk"`; `"idarucizumab/PCC: thrombosis risk; pharmacy-prepared"`).

### X-10 — Universal safety reminders — **SUGGESTION**
* **Issue:** The `reminders` Quick Tools contain SBAR, ABCDE, handoff but no **medication safety** tool. Suggest a card: allergies, weight, pregnancy, renal/hepatic, high-alert double check, read-back, label syringes, concentration, pump library, document, and "when unsure, call pharmacy".


---

## 4. Full extraction and verification tables

Grading: ✔ = in line with commonly published adult ranges as I know them (no concern beyond cross-cutting X-items); ⚠ = correct-ish but needs caveat/context (see finding ID); ✖ = wrong, stale, ambiguous or unsafe as worded (see finding ID). "Verified online" noted where I did so. Items marked "(no dose)" are drugs/interventions named without numbers (appropriate under the recommended policy, but still need hazard flags).

### 4.1 Cardiac arrest (ACLS overview)
| # | Item as written | Route/units | Check |
|---|---|---|---|
| 1 | Epinephrine 1 mg q3–5 min; shockable "after 2nd shock"; nonshockable ASAP | IV/IO | ✔ dose/interval (2025 AHA algorithm verified online: 1 mg q3–5 min; shockable: after initial defibrillation attempts fail). ⚠ concentration/flush not stated → CA-1 |
| 2 | Amiodarone 300 mg then 150 mg (refractory VF/pVT after 3rd shock) | IV/IO | ✔ (verified online) ⚠ "may be considered", central/peripheral, polysorbate hypotension → CA-3 |
| 3 | Lidocaine 1–1.5 mg/kg then 0.5–0.75 mg/kg | IV/IO | ✔ (verified online) ⚠ cumulative 3 mg/kg cap not stated → CA-3 |
| 4 | Magnesium 1–2 g only for torsades | IV | ✔ ⚠ dilution/rate → CA-3 |
| 5 | Defib: biphasic 120–200 J "device-recommended" | — | ✔ (matches 2025 algorithm) |
| 6 | Reversible-cause meds: calcium/bicarb/insulin-dextrose (hyperK), fluids/blood, thrombolytic (PE), naloxone | (no dose) | ⚠ "per team leader/order" → CA-4 |
| 7 | Post-ROSC: norepinephrine, sedation, TTM 32–37.5 °C ≥24 h, SpO₂ 92–98%, PaCO₂ 35–45, glucose | — | ✔ oxygen-as-drug targets reasonable |
| 8 | BVM 100% O₂ | — | ✔ |

### 4.2 Anaphylaxis
| # | Item | Route/units | Check |
|---|---|---|---|
| 1 | Epinephrine 0.3–0.5 mg (0.01 mg/kg, max 0.5 mg) of 1 mg/mL (1:1000), anterolateral thigh, q5–15 min | IM | ✔ dose/range/site/interval; ⚠ mg↔mL conversion, IM-only, autoinjector strength → X-02, ANA-1 |
| 2 | Epinephrine IV infusion "0.05–0.1 mcg/kg/min (e.g., 1–10 mcg/min)" | IV | ⚠ two unit systems; no concentration/line → X-02, ANA-2 |
| 3 | Crystalloid 1–2 L bolus, reassess each liter | IV | ⚠ HF/ESRD caution, weight → ANA-4 |
| 4 | Albuterol 2.5–5 mg neb | inh | ✔ |
| 5 | Nebulized epinephrine adjunct (stridor) | inh | ⚠ (no dose; appropriate) |
| 6 | Diphenhydramine 25–50 mg IV | IV | ✔ ⚠ rate/sedation/hypotension → ANA-3 |
| 7 | Famotidine 20 mg IV | IV | ✔ ⚠ renal → ANA-3 |
| 8 | Methylprednisolone 1–2 mg/kg | IV | ⚠ no cap → ANA-3 |
| 9 | Glucagon 1–5 mg IV over 5 min then 5–15 mcg/min (β-blocked pts) | IV | ✔ range; ⚠ mg→mcg/min, vomiting/aspiration → ANA-2 |
| 10 | Vasopressin / norepinephrine refractory | IV | (no dose) ✔ |
| 11 | Epinephrine 1 mg IV in arrest (Escalate) | IV | ✔ ⚠ CA-1 |
| 12 | "do not flush the trigger drug through the line" | — | ⚠ ANA-5 |
| 13 | High-flow O₂ NRB 10–15 L/min | inh | ✔ |
| 14 | Tryptase 1–3 h | lab | ✔ |

### 4.3 Tension pneumothorax
| # | Item | Check |
|---|---|---|
| 1 | O₂ 100% | ✔ |
| 2 | Analgesia for chest tube; local anesthetic (no dose) | ⚠ lidocaine max-dose awareness → TP-1 |
| 3 | "Hold nitrous oxide" | ✔ |
| 4 | Fluids / vasopressor temporizing | ✔ (no dose) |
| 5 | Needle decompression 14 G ≥8 cm (device, not drug) | (out of scope; consistent with ATLS-style guidance) |

### 4.4 Status epilepticus / seizure
| # | Item | Route/units | Check |
|---|---|---|---|
| 1 | Lorazepam 0.1 mg/kg, max 4 mg/dose, may repeat once at 5 min | IV | ✔ (AES-type regimen); ⚠ rate, storage, prior benzo doses → SE-1 |
| 2 | Midazolam 10 mg (>40 kg), 5 mg (13–40 kg) | IM | ✔; ⚠ Meds line omits 5 mg tier; vial strength → SE-3 |
| 3 | Diazepam 0.15–0.2 mg/kg, max 10 mg/dose | IV | ✔ ⚠ hepatic/accumulation → SE-1 |
| 4 | Levetiracetam 60 mg/kg, max 4,500 mg, ~10 min | IV | ✔ |
| 5 | Fosphenytoin 20 mg **PE**/kg, max 1,500 mg PE, ≤150 mg PE/min | IV | ✔ ⚠ cardiac/hypotension, phenytoin differences → SE-2 |
| 6 | Valproate 40 mg/kg, max 3,000 mg, 10 min | IV | ✔ ⚠ more contraindications → SE-2 |
| 7 | Thiamine 100 mg IV (alcohol/malnutrition) | IV | ✔ |
| 8 | Dextrose for hypoglycemia (<70 mg/dL or unknown & seizing) — no dose | IV | ⚠ SE-4 |
| 9 | Refractory: midazolam/propofol/ketamine infusions, barbiturate, pentobarbital (no dose) | IV | ✔ no dose; ⚠ PENTobarbital/PHENobarbital LASA → X-07 |
| 10 | Pyridoxine in INH toxicity (no dose) | IV | ✔ |

### 4.5 Acute MI / ACS
| # | Item | Route/units | Check |
|---|---|---|---|
| 1 | Aspirin 162–325 mg chewed non-enteric; then 81 mg daily | PO | ✔ |
| 2 | Nitroglycerin 0.4 mg q5 min ×3 if SBP ≥90–100, no RV infarct, no PDE-5i (sildenafil 24 h, tadalafil 48 h) | SL | ✔ ⚠ ambiguous threshold; riociguat etc. → ACS-1 |
| 3 | NTG IV infusion (no dose) | IV | ✔ ⚠ high-alert, tubing → X-03 |
| 4 | Fentanyl/morphine small IV doses | IV | ⚠ ACS-2 |
| 5 | Heparin UFH/enoxaparin; P2Y12 inhibitor (no dose) | IV/PO | ✔ ⚠ ACS-3 |
| 6 | β-blocker PO within 24 h; avoid IV β-blocker if HF/low output/shock/brady/block | PO | ✔ ⚠ ACS-3 |
| 7 | Atorvastatin 40–80 mg | PO | ✔ |
| 8 | Fibrinolytic if PCI not within ~120 min (no dose) | IV | ✔ |
| 9 | O₂ only if SpO₂ <90% | inh | ✔ |
| 10 | Hold NSAIDs | — | ✔ |

### 4.6 Cardiogenic shock
| # | Item | Route/units | Check |
|---|---|---|---|
| 1 | Norepinephrine 0.01–3 mcg/kg/min | IV | ⚠ upper bound, unit system, inconsistent with sepsis card → CS-1, X-02 |
| 2 | Dobutamine 2–20 mcg/kg/min | IV | ✔ ⚠ DOBUTamine/DOPamine LASA → X-07 |
| 3 | Milrinone 0.125–0.75 mcg/kg/min "(renal dosing)" | IV | ✔ ⚠ no bolus/renal table → CS-2 |
| 4 | Epinephrine low dose (no number) | IV | ✔ |
| 5 | Furosemide IV once perfusion adequate (no dose) | IV | ✔ |
| 6 | Fluid challenge e.g., 250 mL only if dry | IV | ✔ |
| 7 | Avoid vasodilators/nitrates when hypotensive; hold antihypertensives/β-blockers/ACE-i/ARB/nephrotoxins | — | ✔ |
| 8 | "extravasation (central line preferred)" | — | ⚠ X-04 |

### 4.7 Atrial fibrillation with RVR
| # | Item | Route/units | Check |
|---|---|---|---|
| 1 | Diltiazem 0.25 mg/kg over 2 min (≈15–20 mg); repeat 0.35 mg/kg in 15 min; infusion 5–15 mg/h | IV | ✔ ⚠ EF unknown to RN, hypotension, concomitant β-blocker, obesity cap → AF-1 |
| 2 | Metoprolol 2.5–5 mg over 2 min q5 min up to ~15 mg | IV | ✔ ⚠ asthma/HF/brady → AF-5 |
| 3 | Esmolol infusion (no dose) | IV | ✔ |
| 4 | Amiodarone 150 mg over 10 min then 1 mg/min ×6 h then 0.5 mg/min ×18 h | IV | ✔ ⚠ concentration/central, cardioversion embolic risk → AF-4 |
| 5 | Digoxin 0.25 mg IV q2 h (max ~1–1.5 mg load) in HF | IV | ⚠/✖ renal, K/Mg/Ca, lean weight → AF-2 |
| 6 | Magnesium 2 g IV; K⁺ to ≥4.0 | IV | ✔ ⚠ rate, K⁺ rate limits → AF-6, X-04 |
| 7 | Heparin/DOAC for stroke prevention (no dose) | — | ✔ |
| 8 | Cardioversion biphasic 120–200 J | — | ✔ |
| 9 | "Do NOT give AV-nodal blockers (diltiazem, β-blocker, digoxin, adenosine) in WPW AF; procainamide or cardioversion" | — | ⚠ omits amiodarone caution; procainamide undosed → AF-3 |

### 4.8 Unstable tachycardia
| # | Item | Route/units | Check |
|---|---|---|---|
| 1 | Synchronized cardioversion: narrow regular 50–100 J; narrow irregular 120–200 J; wide regular 100 J | — | ✔ |
| 2 | Adenosine 6 mg rapid push + flush, then 12 mg ×1–2; 3 mg via central line/transplant | IV | ✔ ⚠ technique/interactions → UT-1 |
| 3 | Amiodarone 150 mg over 10 min (repeat), then infusion | IV | ✔ |
| 4 | Procainamide 20–50 mg/min (max 17 mg/kg) | IV | ✔ in Actions; ⚠ Meds line omits max/stop rules → UT-2 |
| 5 | Lidocaine 1–1.5 mg/kg | IV | ✔ |
| 6 | Magnesium 1–2 g for torsades | IV | ✔ |
| 7 | Sedation for cardioversion (etomidate/midazolam/ketamine) no dose | IV | ✔ |

### 4.9 Symptomatic bradycardia
| # | Item | Route/units | Check |
|---|---|---|---|
| 1 | Atropine 1 mg q3–5 min, max 3 mg (glance, meds) vs "0.5–1 mg IV rapid push (ACLS: 1 mg)… <0.5 mg can worsen bradycardia" (actions) | IV | ⚠/✖ internal conflict → UB-1 |
| 2 | Dopamine 5–20 mcg/kg/min | IV | ✔ ⚠ X-02, X-07, X-04 |
| 3 | Epinephrine 2–10 mcg/min | IV | ✔ ⚠ unit collision with dopamine → UB-2, X-02 |
| 4 | Glucagon 3–10 mg IV (β-blocker/CCB tox) | IV | ✔ ⚠ vs 1–5 mg elsewhere; no infusion; emesis → UB-3 |
| 5 | Calcium (CCB, hyperK) no dose | IV | ✔ |
| 6 | High-dose insulin euglycemia "see Overdose" | IV | ⚠ OD-2 |
| 7 | Sedation/analgesia for pacing (no dose) | IV | ✔ |

### 4.10 Acute respiratory failure: intubation & vent basics
| # | Item | Route/units | Check |
|---|---|---|---|
| 1 | Ketamine 1–2 mg/kg | IV | ✔ ⚠ shock/weight → RF-1 |
| 2 | Etomidate 0.3 mg/kg | IV | ✔ ⚠ RF-1 |
| 3 | Propofol 1–2 mg/kg (avoid in shock) | IV | ✔ ⚠ RF-1 |
| 4 | Rocuronium 1–1.2 mg/kg | IV | ✔ ⚠ duration/sedation gap/reversal → RF-2 |
| 5 | Succinylcholine 1–1.5 mg/kg; avoid hyperK, burns/crush >24–72 h, NM disease, MH hx | IV | ✔ ⚠ more contraindications → RF-2 |
| 6 | Phenylephrine 50–100 mcg; epinephrine 5–20 mcg push-dose | IV | ✔ range; ⚠ concentration/prep → RF-3, X-02 |
| 7 | Fentanyl 25–100 mcg/h | IV | ✔ ⚠ RF-4 |
| 8 | Propofol 5–50 mcg/kg/min | IV | ✔ ⚠ RF-4 |
| 9 | Dexmedetomidine 0.2–1.5 mcg/kg/h | IV | ✔ ⚠ RF-4 |
| 10 | Albuterol/ipratropium; steroids (no dose) | inh/IV | ✔ |
| 11 | NRB + NC 15 L/min preoxygenation; initial FiO₂ 100% then SpO₂ 92–96% (88–95% ARDS) | inh | ✔ |
| 12 | Naloxone (opioid) in reversible-causes list (no dose) | IV | ⚠ VA-1 |
| 13 | "resuscitate before intubating: fluids/pressor ready" | — | ✔ |

### 4.11 Ventilator alarms
| # | Item | Check |
|---|---|---|
| 1 | Albuterol/ipratropium inline neb (no dose) | ✔ |
| 2 | Analgesia (fentanyl) ± sedation per order for dyssynchrony; avoid routine paralytics | ✔ |
| 3 | Naloxone for opioid-induced apnea (low dose, titrate) | ⚠ VA-1 |
| 4 | "Sodium chloride lavage not routine"; mucolytics per RT/provider | ✔ |

### 4.12 ARDS
| # | Item | Check |
|---|---|---|
| 1 | Fentanyl, propofol, dexmedetomidine (avoid benzos) (no dose) | ✔ (PADIS-consistent) |
| 2 | Cisatracurium short course (no dose) | ⚠ ARDS-2 |
| 3 | Dexamethasone "20 mg/day→10" | ⚠ ARDS-1 |
| 4 | Inhaled nitric oxide / epoprostenol (rescue) | ⚠ ARDS-3 |
| 5 | Antibiotics for cause; diuretic once stable; stress ulcer & VTE prophylaxis (no dose) | ✔ |
| 6 | VT 6 mL/kg PBW; plateau ≤30; FiO₂/PEEP table; SpO₂ 88–95% | ✔ (oxygen targets reasonable; SSC 2026 verified: low-VT 6 mL/kg and plateau ≤30 recommended) |

### 4.13 Pulmonary embolism
| # | Item | Route/units | Check |
|---|---|---|---|
| 1 | UFH 80 units/kg bolus then 18 units/kg/h per nomogram | IV | ✔ nomogram values; ✖ no caps/concentration/double check → PE-1 |
| 2 | Enoxaparin 1 mg/kg q12h "(renal adjustments)" | SC | ✔ ⚠ PE-3 |
| 3 | DOACs after stabilization | PO | ✔ (no dose) |
| 4 | Alteplase 100 mg over 2 h; 50 mg bolus in arrest per protocol | IV | ✔ for PE ⚠ different regimen than stroke → PE-2 |
| 5 | Norepinephrine, dobutamine for RV failure | IV | ✔ |
| 6 | Fluids ≤500 mL | IV | ✔ |
| 7 | aPTT/anti-Xa q6h; platelets (HIT) | lab | ✔ |

### 4.14 Sepsis / septic shock
| # | Item | Route/units | Check |
|---|---|---|---|
| 1 | Broad-spectrum antibiotics within 1 h (no dose) | IV | ✔ (SSC 2026 verified: immediately, ideally within 1 h for shock/probable sepsis) ⚠ SEP-4 |
| 2 | Balanced crystalloid 30 mL/kg in first 3 h (hypotension or lactate ≥4) | IV | ✔ (SSC 2026 verified) ⚠ SEP-3 |
| 3 | Norepinephrine 0.05–0.5+ mcg/kg/min | IV | ✔ ⚠ X-02, CS-1 |
| 4 | Vasopressin 0.03 units/min fixed (when NE ~0.25–0.5 mcg/kg/min) | IV | ✔ ⚠ unit trap; SSC 2026 no fixed NE threshold seen → SEP-1 |
| 5 | Epinephrine second-line; dobutamine if cardiac dysfunction | IV | ✔ (SSC 2026: add epinephrine after NE+vasopressin) |
| 6 | Hydrocortisone 50 mg q6h (200 mg/day) if ongoing pressors (≥4 h) | IV | ✔ ⚠ SEP-5 |
| 7 | Albumin if large crystalloid volumes | IV | ✔ (SSC 2026 verified: may be appropriate after large volumes/cirrhosis) |
| 8 | Peripheral pressor OK short-term then central | IV | ⚠ SEP-2, X-04 |
| 9 | Glucose 140–180; VTE prophylaxis; stress ulcer prophylaxis | — | ✔ |

### 4.15 Hypovolemic / hemorrhagic shock
| # | Item | Route/units | Check |
|---|---|---|---|
| 1 | pRBC:plasma:platelets 1:1:1; cryo/fibrinogen concentrate for fibrinogen <150–200 mg/dL | IV | ✔ (blood product verification not mentioned → HS-4) |
| 2 | TXA 1 g over 10 min then 1 g over 8 h within 3 h of injury / major bleed | IV | ✔ CRASH-2-style; ⚠ scope, route, renal, abbreviation → HS-2 |
| 3 | Calcium chloride 1 g (central) or gluconate 3 g | IV | ✔ equivalence ⚠ HS-3 |
| 4 | Warmed crystalloid 250–500 mL (non-hemorrhagic) | IV | ✔ |
| 5 | Vasopressor (norepi/vasopressin) as bridge | IV | ✔ |
| 6 | Reversal: 4F-PCC + vitamin K; idarucizumab; andexanet/PCC; protamine | IV | ✖ andexanet withdrawn US → HS-1 |

### 4.16 Acute ischemic stroke
| # | Item | Route/units | Check |
|---|---|---|---|
| 1 | Alteplase 0.9 mg/kg (max 90 mg; 10% bolus, rest over 60 min) | IV | ✔ (AHA/ASA 2026 verified online) ⚠ IS-1 |
| 2 | Tenecteplase 0.25 mg/kg (max 25 mg) single bolus | IV | ✔ (AHA/ASA 2026 verified online) ⚠ IS-1 |
| 3 | BP: <185/110 pre-lysis; <180/105 for 24 h after; permissive >220/120 if no lysis (lower ≈15%) | — | ✔ (2026 guideline verified) |
| 4 | Labetalol 10–20 mg IV | IV | ✔ ⚠ IS-2 |
| 5 | Nicardipine 5 mg/h, titrate 2.5 mg/h q5–15 min, max 15 mg/h | IV | ✔ ⚠ IS-2 |
| 6 | Clevidipine (no rate) | IV | ✔ ⚠ IS-2 |
| 7 | Aspirin 160–325 mg within 24–48 h (24 h post lysis) | PO/PR | ✔ ⚠ IS-3 |
| 8 | Statin; DVT prophylaxis (IPC); antiepileptics only if seizure | — | ✔ |
| 9 | Glucose treat if <60 mg/dL | — | ⚠ IS-4 |
| 10 | O₂ only if SpO₂ <94% | inh | ✔ |
| 11 | No arterial punctures/NG/Foley/IM 24 h post-lysis; stop infusion & CT if headache/N/V/decline | — | ✔ |

### 4.17 ICH / increased ICP
| # | Item | Route/units | Check |
|---|---|---|---|
| 1 | 23.4% saline 30 mL via central line over 10–20 min | IV | ✔ range ✖ high-alert handling → ICH-1 |
| 2 | 3% saline 250 mL bolus | IV | ✔ ⚠ rate unspecified → ICH-4 |
| 3 | Mannitol 0.25–1 g/kg over 15–20 min; hold if osm >320 or renal failure | IV | ✔ ⚠ ICH-4 |
| 4 | Nicardipine 5–15 mg/h; clevidipine 1–21 mg/h; labetalol 10–20 mg IV/infusion | IV | ✔ (ICH SBP target ~140, 130–150) |
| 5 | 4F-PCC + vitamin K 10 mg IV; idarucizumab 5 g; andexanet; protamine | IV | ✔ ⚠ vitamin K rate/hypersensitivity; ✖ andexanet → ICH-2 |
| 6 | Nimodipine 60 mg q4h PO/NG | PO/NG | ✔ dose ✖ missing never-IV warning → ICH-3 |
| 7 | Levetiracetam if seizure; propofol, fentanyl (no dose) | IV | ✔ |
| 8 | Na goal 140–155; stop HTS if >155–160 | lab | ✔ |
| 9 | Brief hyperventilation PaCO₂ ~30–35 only for impending herniation | vent | ✔ |
| 10 | Stool softeners | PO | ✔ |

### 4.18 DKA
| # | Item | Route/units | Check |
|---|---|---|---|
| 1 | Isotonic crystalloid 15–20 mL/kg (≈1–1.5 L) hour 1; then 250–500 mL/h | IV | ✔ ⚠ DKA-3 |
| 2 | K <3.3 → hold insulin, KCl 20–30 mEq/h; K 3.3–5.0 (5.2): 20–30 mEq per L | IV | ✖ DKA-1 (2024 consensus: <3.5 hold insulin; 10 mmol/h; start K when <5.0) |
| 3 | Regular insulin 0.1 unit/kg/h (± 0.1 unit/kg bolus) or 0.14 unit/kg/h | IV | ⚠ DKA-2 |
| 4 | Goal glucose fall 50–75 mg/dL/h | — | ✔ |
| 5 | D5/D10 added when glucose <250 (or 200); reduce insulin to 0.02–0.05 units/kg/h per protocol | IV | ⚠ DKA-4 |
| 6 | Bicarbonate only if pH <6.9 | IV | ⚠ DKA-5 |
| 7 | Phosphate if <1.0 mg/dL or cardiac dysfunction/hypoxia | IV | ⚠ units → DKA-5 |
| 8 | SC basal insulin overlap 1–2 h before stopping infusion | SC | ✔ (2024 consensus text verified: overlap 1–2 h) |
| 9 | Resolution criteria glucose <200 AND ≥2 of HCO₃ ≥15–18, pH >7.3, AG ≤12 | lab | ✔ (clinical) |
| 10 | Escalate "K <3.3 or >5.5" | — | ⚠ DKA-1 |

### 4.19 Severe hypoglycemia
| # | Item | Route/units | Check |
|---|---|---|---|
| 1 | 15–20 g fast carbs (4 oz juice or 3–4 glucose tabs) | PO | ✔ |
| 2 | Dextrose 50% 25 g (50 mL) IV push | IV | ✔ ⚠ HYPO-1 |
| 3 | Dextrose 10% 125–250 mL (12.5–25 g) | IV | ✔ |
| 4 | Glucagon 1 mg IM/SC (IV in Meds); intranasal 3 mg | IM/SC/IV/IN | ✔ ⚠ HYPO-2, X-07 ("IN") |
| 5 | D10 at 50–100 mL/h maintenance if prolonged risk | IV | ✔ |
| 6 | Thiamine 100 mg IV with/before dextrose | IV | ✔ ⚠ HYPO-2 |
| 7 | Octreotide 50 mcg SC/IV q6h (actions) vs q6–12h (meds) | SC/IV | ✔ ⚠ HYPO-3 |
| 8 | Hydrocortisone if adrenal insufficiency (no dose) | IV | ✔ |

### 4.20 Hyperkalemia
| # | Item | Route/units | Check |
|---|---|---|---|
| 1 | Calcium gluconate 10% 1–3 g (10–30 mL) over 5–10 min, repeat in 5 min; or CaCl 1 g | IV | ✔ ⚠ HK-2 |
| 2 | Regular insulin 10 units + dextrose 25 g (D50 50 mL); 5 units if renal failure/low baseline glucose; glucose q30–60 min ×4–6 h | IV | ⚠ HK-1 |
| 3 | Albuterol 10–20 mg nebulized over 10 min | inh | ✔ ⚠ HK-5 |
| 4 | Sodium bicarbonate 50–150 mEq if acidotic | IV | ⚠ HK-3 |
| 5 | Furosemide 40–80 mg IV | IV | ✔ |
| 6 | SZC 10 g PO; patiromer; sodium polystyrene | PO | ✔ ⚠ SPS safety → HK-4 |
| 7 | D10 infusion if glucose falling | IV | ✔ |
| 8 | Stop K-containing/K-raising meds (K-sparing diuretics, ACE-i/ARB, NSAIDs, TMP-SMX, heparin) | — | ✔ |

### 4.21 AKI
| # | Item | Check |
|---|---|---|
| 1 | Balanced crystalloid 250–500 mL if hypovolemic | ✔ |
| 2 | Norepinephrine to MAP ≥65 | ✔ (no dose) |
| 3 | Loop diuretic for overload (no dose) | ✔ ⚠ AKI-1 (conflict with "hold… diuretics") |
| 4 | Hold NSAIDs, contrast, aminoglycosides, "vanco trough", ACE-i/ARB | ⚠ AKI-1 |
| 5 | Renally dose all meds (pharmacy); drug levels; CRRT citrate/iCa | ⚠ AKI-2 |
| 6 | Phosphate binders per nephrology | ✔ |

### 4.22 GI bleed
| # | Item | Route/units | Check |
|---|---|---|---|
| 1 | Pantoprazole 80 mg bolus then 8 mg/h, or 40 mg q12h | IV | ✔ ⚠ GI-1 |
| 2 | Octreotide 50 mcg bolus then 50 mcg/h (variceal) | IV | ✔ ⚠ GI-2 |
| 3 | Vasopressin alternative (no dose) | IV | ⚠ GI-2 |
| 4 | Ceftriaxone 1 g IV q24h (cirrhosis + GI bleed) | IV | ✔ ⚠ GI-3 |
| 5 | Erythromycin 250 mg IV 30–120 min pre-endoscopy | IV | ✔ ⚠ QTc → GI-4 |
| 6 | Transfusion thresholds Hgb <7 (7–9; ~8 CAD) | — | ✔ |
| 7 | PCC/vitamin K/FFP; TXA not routinely recommended | IV | ✔ (consistent with HALT-IT-type evidence as I recall) ⚠ HS-2 |
| 8 | Lactulose (no dose) | PO | ✔ |

### 4.23 Cardiac tamponade
| # | Item | Check |
|---|---|---|
| 1 | Crystalloid 250–500 mL (repeat once) | ✔ |
| 2 | Norepinephrine/dobutamine as bridge (no dose) | ✔ |
| 3 | Local anesthetic ± minimal sedation (ketamine) (no dose) | ⚠ TAMP-1 |
| 4 | Protamine / PCC / vit K for anticoagulant reversal (no dose) | ✔ ⚠ X-09 |

### 4.24 Alcohol withdrawal / DTs
| # | Item | Route/units | Check |
|---|---|---|---|
| 1 | Thiamine 100 mg IV/IM (higher doses if Wernicke) | IV/IM | ✔ ⚠ AW-4 |
| 2 | Folate 1 mg; multivitamin; Mg/K/Phos repletion | PO/IV | ✔ ⚠ X-04 for K/Phos rates |
| 3 | Lorazepam 1–4 mg IV q5–15 min (symptom-triggered) | IV | ✔ ⚠ AW-1 |
| 4 | Diazepam 5–20 mg IV | IV | ✔ ⚠ AW-1 |
| 5 | Phenobarbital 130–260 mg IV steps, or 10 mg/kg IBW load | IV | ✔ range ⚠ AW-2 |
| 6 | Dexmedetomidine adjunct (NOT alone) | IV | ✔ |
| 7 | Haloperidol 2–5 mg IV adjunct | IV | ⚠ AW-3 |
| 8 | Propofol with intubation (no dose) | IV | ✔ |

### 4.25 Overdose / poisoning
| # | Item | Route/units | Check |
|---|---|---|---|
| 1 | Naloxone 0.04–0.4 mg IV, titrate q2–3 min, up to 2 mg total; IM/IN 2–4 mg (actions) vs IN 4 mg (meds) | IV/IM/IN | ✔ range ⚠ inconsistency, dilution → OD-1 |
| 2 | Naloxone infusion ~2/3 of effective dose per hour | IV | ✔ |
| 3 | N-acetylcysteine IV per nomogram (no dose) | IV | ✔ ⚠ OD-6 |
| 4 | Activated charcoal 1 g/kg (max 50 g) within 1–2 h (glance "~1 h") | PO/NG | ✔ ⚠ OD-5 |
| 5 | Sodium bicarbonate 1–2 mEq/kg bolus for QRS >100; pH 7.45–7.55 | IV | ✔ TCA ⚠ salicylate conflated → OD-3 |
| 6 | Calcium, glucagon, high-dose insulin euglycemia, vasopressors (β-blocker/CCB) (no dose) | IV | ✔ ⚠ OD-2 |
| 7 | Atropine (cholinergic) (no dose) | IV | ⚠ OD-4 |
| 8 | Hydroxocobalamin (cyanide); 100% O₂ (CO) (no dose) | IV/inh | ✔ |
| 9 | Flumazenil: avoid routine | IV | ✔ |
| 10 | Lipid emulsion / dialysis per toxicology | IV | ✔ |

### 4.26 Quick Tools (drug-related items only)
| # | Item | Check |
|---|---|---|
| 1 | SpO₂ "≥94% (92–96% typical COPD; 88–95% ARDS)" | ✖ COPD → TOOL-1 |
| 2 | RASS goal 0 to −2 unless ordered | ✔ (PADIS-style light sedation) |
| 3 | PBW formulas; VT 6 mL/kg PBW (4–8) | ✔ |
| 4 | Glucose ICU goal ~140–180 | ✔ (SSC 2026: start insulin at ≥180) |
| 5 | Lab ranges (K 3.5–5.0, Mg, Phos, Ca, INR/aPTT, etc.) | ✔ (labeled approximate) |
| 6 | Rapid response triggers; SBAR ("Read back orders") | ✔ |
| 7 | H's & T's | ✔ |


---

## 5. Condition-specific findings

Format per finding: **ID — Condition — SEVERITY**, then Quoted text, Issue, Corrected wording. Cross-cutting items (X-xx) apply in addition.

### Cardiac arrest

#### CA-1 — Cardiac arrest — MAJOR
* **Quoted:** `"Epinephrine 1 mg IV/IO every 3–5 min. (Shockable: after 2nd shock.) Record each dose time."`
* **Issue:** Dose/interval are correct (verified against the 2025 AHA algorithm page). But "1 mg" with no concentration invites mix-ups: the code-cart syringe is typically 1 mg/10 mL (0.1 mg/mL) whereas the anaphylaxis card tells the nurse to use the 1 mg/mL vial IM. Pushing undiluted 1 mg/mL IV outside arrest (e.g., post-ROSC, or anaphylaxis with a pulse) is a recognized fatal-error pathway. Peripheral IV doses need a saline flush. "After 2nd shock" is a practice convention; the 2025 text says "after initial defibrillation attempts have failed" (verified).
* **Corrected:** `"Epinephrine 1 mg IV/IO every 3–5 min per code team/ACLS order (code-cart syringe is 1 mg in 10 mL = 0.1 mg/mL; verify concentration before giving; flush after peripheral IV dose). Shockable rhythm: after initial defibrillation attempts have not worked, per team leader. NEVER give 1 mg/mL vial contents IV push to a patient with a pulse."`

#### CA-2 — Cardiac arrest — SUGGESTION
* **Quoted:** `"AHA Advanced Cardiovascular Life Support (ACLS) Guidelines & 2023 focused update…"` (sources).
* **Issue:** 2025 AHA ECC Guidelines exist (algorithm page verified). Doses for items in this card are unchanged, but the edition is stale, and the 2025 amiodarone/lidocaine wording is "may be considered" (COR 2b, verified).
* **Corrected:** Cite `2025 AHA Guidelines for CPR & ECC — Part 9 Adult ALS`; "amiodarone or lidocaine may be considered for VF/pVT unresponsive to defibrillation."

#### CA-3 — Cardiac arrest — MINOR
* **Quoted:** `"amiodarone 300 mg IV/IO, then 150 mg once (or lidocaine 1–1.5 mg/kg, then 0.5–0.75 mg/kg)"`; `"Magnesium 1–2 g IV only for torsades de pointes"`.
* **Issue:** Doses correct (verified for amiodarone/lidocaine). Missing: use one antiarrhythmic, not both, unless directed; lidocaine cumulative limit (commonly 3 mg/kg — confirm local protocol); magnesium is given diluted, not as undiluted push.
* **Corrected:** `"Amiodarone OR lidocaine per team leader (observe lidocaine cumulative limit per protocol). Magnesium 1–2 g IV, diluted, for torsades per team leader (confirm facility method/rate)."`

#### CA-4 — Cardiac arrest — MINOR
* **Quoted:** `"Reversible-cause therapy: calcium/bicarb/insulin-dextrose (hyperK), fluids/blood, needle decompression, thrombolytic (PE), naloxone (opioid), etc."`
* **Issue:** Lists calcium/bicarbonate/naloxone as reflex reversible-cause therapy without "per team leader/order". Routine calcium/bicarbonate in arrest is not recommended outside specific scenarios; naloxone does not replace CPR.
* **Corrected:** `"Reversible-cause therapy ONLY as directed by the team leader/order (e.g., calcium/bicarbonate/insulin-dextrose for known or strongly suspected hyperkalemia); naloxone does not replace CPR."`

### Anaphylaxis

#### ANA-1 — Anaphylaxis — MAJOR
* **Quoted:** `"EPINEPHRINE IM 0.3–0.5 mg (0.01 mg/kg, max 0.5 mg) of 1 mg/mL (1:1000) into anterolateral mid-thigh. Do not delay for IV access."`
* **Issue:** Dose, site, and 5–15 min repeat are consistent with published guidance; this is the most defensible nurse-initiated dose in the app. Risks: mg↔mL conversion (0.5 mg = 0.5 mL of the 1 mg/mL vial) is a classic 10× error source; autoinjector strengths (0.15/0.3 mg) not mentioned; "0.3–0.5" leaves the choice to the nurse; no "IM ONLY — never IV push".
* **Corrected:** `"Epinephrine IM per anaphylaxis standing order/protocol: typical adult published dose 0.3–0.5 mg (= 0.3–0.5 mL of the 1 mg/mL [1:1000] vial), anterolateral thigh. IM ONLY — do not give 1 mg/mL IV. Confirm concentration on the vial."`

#### ANA-2 — Anaphylaxis — MAJOR (units; see X-02)
* **Quoted:** `"Epinephrine infusion (refractory): typically 0.05–0.1 mcg/kg/min titrated (e.g., 1–10 mcg/min)"`; `"Glucagon 1–5 mg IV over 5 min, then 5–15 mcg/min if on β-blocker and not responding"`.
* **Issue:** Two unit systems in one line; the "e.g." conversion does not map consistently (70 kg × 0.05–0.1 = 3.5–7 mcg/min). Infusion requires pump, concentration, and a dedicated/secure line. Glucagon: mg then mcg/min in one line (1000× unit trap); rapid push causes vomiting and aspiration risk in a patient with airway compromise.
* **Corrected:** `"Epinephrine IV infusion (refractory): ICU-level care; dose, concentration, units (mcg/min vs mcg/kg/min) and line per order/pump library; independent double check. Glucagon (β-blocked patients, per order): give slowly, anticipate vomiting—protect airway; infusion per order/pharmacy."`

#### ANA-3 — Anaphylaxis — MINOR
* **Quoted:** `"H1 blocker (diphenhydramine 25–50 mg IV), H2 blocker (famotidine 20 mg IV), corticosteroid (e.g., methylprednisolone 1–2 mg/kg)"`.
* **Issue:** Doses are in published ranges, but no cap for methylprednisolone (a fixed upper dose is commonly used — confirm locally); diphenhydramine causes sedation/hypotension if pushed fast and is poorly tolerated in the elderly; famotidine needs renal adjustment. The app correctly says adjuncts do not replace epinephrine.
* **Corrected:** `"Adjuncts only after epinephrine and only if ordered: H1 blocker, H2 blocker, corticosteroid — dose, cap and rate per order/pharmacy (renal adjustment for famotidine; infuse diphenhydramine slowly)."`

#### ANA-4 — Anaphylaxis — MINOR
* **Quoted:** `"Rapid crystalloid bolus 1–2 L (adult) for hypotension; reassess after each liter."`
* **Issue:** HF/ESRD patients (common in ICU) can be harmed by 1–2 L; use smaller aliquots with reassessment.
* **Corrected:** `"Rapid crystalloid boluses per order (smaller aliquots in HF/ESRD), reassess after each."`

#### ANA-5 — Anaphylaxis — MINOR
* **Quoted:** `"Keep IV access; do not flush the trigger drug through the line."`
* **Issue:** Ambiguous. Safer action: stop the infusion, disconnect and replace tubing/bag, and keep the old bag/tubing for investigation (blood bank for transfusion).
* **Corrected:** `"Stop the infusion; replace the tubing so residual drug is not flushed in; keep the bag/tubing for pharmacy/blood bank."`

### Tension pneumothorax

#### TP-1 — Tension pneumothorax — SUGGESTION
* **Quoted:** `"Analgesia for chest tube (per order); local anesthetic"`.
* **Issue:** Undosed (appropriate). Add: track total local-anesthetic dose.
* **Corrected:** `"Local anesthetic per provider (track total dose given)."`

### Status epilepticus

#### SE-1 — Status epilepticus — MINOR
* **Quoted:** `"IV lorazepam 0.1 mg/kg (max 4 mg/dose, may repeat once at 5 min); … IV diazepam 0.15–0.2 mg/kg (max 10 mg/dose)."`
* **Issue:** Doses/caps match widely used AES/NCS-type regimens. Gaps: lorazepam IV rate (verify label/protocol), refrigerated storage, propylene-glycol content with repeated dosing; diazepam accumulates in hepatic impairment/elderly; prehospital benzodiazepine already given (under- and over-dosing both documented); respiratory depression readiness is already stated (good).
* **Corrected:** `"First-line benzodiazepine per order/protocol (typical published: lorazepam 0.1 mg/kg IV up to 4 mg, may repeat once). Check what was already given pre-arrival; give at the labeled rate; airway equipment at bedside."`

#### SE-2 — Status epilepticus — MINOR
* **Quoted:** `"fosphenytoin 20 mg PE/kg (max 1,500 mg PE) at ≤150 mg PE/min; or valproate 40 mg/kg (max 3,000 mg) over 10 min"`; `"Valproate: avoid in liver disease/pregnancy."`
* **Issue:** Good use of "PE" and the rate cap. Missing: fosphenytoin hypotension/arrhythmia and contraindications (bradycardia, heart block); phenytoin (not fosphenytoin) differs (≤50 mg/min, extravasation "purple glove") and is mentioned but undosed; valproate also avoided in thrombocytopenia, hyperammonemia, urea-cycle/mitochondrial disorders.
* **Corrected:** `"Second-line agent per order; fosphenytoin is dosed in PE (phenytoin equivalents) — do not confuse with phenytoin; continuous ECG/BP. Avoid valproate in liver disease, pregnancy, thrombocytopenia, or suspected metabolic/mitochondrial disease."`

#### SE-3 — Status epilepticus — MINOR
* **Quoted:** Meds `"Midazolam IM 10 mg (>40 kg) · Diazepam 0.15–0.2 mg/kg IV (max 10 mg)"` vs Actions `"IM midazolam 10 mg (>40 kg), 5 mg (13–40 kg)"`.
* **Issue:** Meds line drops the lower-weight tier. Midazolam is stocked as 1 mg/mL and 5 mg/mL; 10 mg IM = 2 mL of 5 mg/mL but 10 mL of 1 mg/mL (not feasible IM) — concentration trap.
* **Corrected:** `"Midazolam IM: 10 mg if >40 kg, 5 mg if 13–40 kg — check vial strength (1 vs 5 mg/mL)."`

#### SE-4 — Status epilepticus — SUGGESTION
* **Quoted:** `"If <70 mg/dL (or unknown & seizing): dextrose per order; give thiamine first/with it if alcohol use or malnutrition."`
* **Issue:** Good. Add "do not delay dextrose for thiamine". Threshold (<70) differs from the stroke card (<60) — harmonize or explain (X-08).
* **Corrected:** `"Dextrose per order (thiamine with or just before it if at risk — do not delay treatment of confirmed hypoglycemia)."`

### Acute MI / ACS

#### ACS-1 — ACS — MINOR
* **Quoted:** `"Nitroglycerin 0.4 mg SL q5 min ×3 for ongoing pain IF SBP ≥90–100 and no RV infarct, no PDE-5 inhibitor (sildenafil 24 h / tadalafil 48 h), not severe bradycardia/tachycardia."`
* **Issue:** "SBP ≥90–100" is two thresholds; use one (commonly SBP <90 or ≥30 mmHg below baseline = hold). Also hold for riociguat and severe aortic stenosis (verify). IV nitroglycerin is a high-alert infusion. Check for existing nitroglycerin patch/paste (duplicate therapy).
* **Corrected:** `"Nitroglycerin SL per order/protocol if SBP ≥90 mmHg (and not >30 mmHg below baseline), no RV infarct, no recent PDE-5 inhibitor (sildenafil 24 h / tadalafil 48 h) or riociguat; check for existing nitro patch/paste."`

#### ACS-2 — ACS — SUGGESTION
* **Quoted:** `"opioid (e.g., fentanyl/morphine small IV doses) per provider — may mask/worsen hypotension."`
* **Issue:** Fine. Add renal consideration (morphine metabolites accumulate).
* **Corrected:** `"Opioid analgesia only if ordered; smallest effective dose; renal impairment favors fentanyl over morphine (per provider)."`

#### ACS-3 — ACS — SUGGESTION
* **Quoted:** `"Anticoagulant (heparin/enoxaparin) and P2Y12 inhibitor per cardiology orders. Check bleeding risks first."`; `"β-blocker PO within 24 h if stable"`.
* **Issue:** No doses (appropriate). Add: do not give UFH and enoxaparin together; enoxaparin adjusts for renal function/age; prasugrel contraindicated with prior stroke/TIA (verify); routine early β-blocker evidence has been evolving (verify current guideline).
* **Corrected:** `"Antithrombotics per cardiology order: confirm what the patient already received (heparin, enoxaparin, P2Y12 inhibitor) to avoid duplication; high-alert: independent double check."`

### Cardiogenic shock

#### CS-1 — Cardiogenic shock — MAJOR
* **Quoted:** `"Norepinephrine 0.01–3 mcg/kg/min (titrate to MAP) — often first-line"` vs Sepsis `"Norepinephrine 0.05–0.5+ mcg/kg/min"`.
* **Issue:** Labeled/published ranges extend to 3 mcg/kg/min, but presenting 3 mcg/kg/min (≈210 mcg/min at 70 kg) as the top of a "usual" range is hazardous and conflicts with the sepsis card. Many facilities program norepinephrine in mcg/min, not mcg/kg/min, and the app cannot know (X-02). Requirements well above ~1 mcg/kg/min are uncommon and merit provider/pharmacy review (my practice-based suggestion, not a labeled threshold).
* **Corrected:** `"Norepinephrine: titrate to the ordered MAP goal; dose, concentration and units (mcg/min vs mcg/kg/min) per order and pump library. Rapidly rising requirement → call provider."`

#### CS-2 — Cardiogenic shock — MAJOR
* **Quoted:** `"Milrinone 0.125–0.75 mcg/kg/min (renal dosing)"`.
* **Issue:** Range is the labeled maintenance range; "renal dosing" is unexplained and milrinone is renally cleared (accumulation → prolonged hypotension, ventricular arrhythmias). A loading bolus can cause profound hypotension in shock — not mentioned. Labeling gives renal rate adjustments (pharmacy).
* **Corrected:** `"Milrinone per order: reduce rate in renal dysfunction per pharmacy; loading bolus only if explicitly ordered (hypotension risk); monitor BP and ventricular arrhythmias."`

#### CS-3 — Cardiogenic shock — MINOR
* **Quoted:** `"Dobutamine 2–20 mcg/kg/min"`.
* **Issue:** Correct range; add tachyarrhythmia/hypotension warning and DOBUTamine vs DOPamine LASA (X-07).
* **Corrected:** `"DOBUTamine (inotrope) per order; watch for tachyarrhythmias and hypotension; do not confuse with DOPamine."`

### Atrial fibrillation with RVR

#### AF-1 — AF with RVR — MINOR
* **Quoted:** `"STABLE, preserved EF: rate control per order — diltiazem 0.25 mg/kg IV over 2 min (≈15–20 mg), repeat 0.35 mg/kg in 15 min if needed, then infusion 5–15 mg/h"`.
* **Issue:** Doses match standard ACLS-type regimens. The bedside nurse often does not know the EF; hypotension/shock, HFrEF, and concomitant IV β-blocker are the real stop signs. Many facilities cap the first dose and use less in the elderly (local policy). Infusion needs a standard concentration and pump.
* **Corrected:** `"Rate control per order. Diltiazem: do NOT give if hypotensive, in shock, known/suspected reduced EF, or just after IV β-blocker; weight-based dose and facility cap per order; infusion per pump library."`

#### AF-2 — AF with RVR — MAJOR
* **Quoted:** `"Digoxin 0.25 mg IV q2 h (max ~1–1.5 mg total loading) in HF"`.
* **Issue:** Narrow therapeutic index; loading must account for renal function, age, lean body weight, current digoxin, and K⁺/Mg²⁺ (hypokalemia/hypomagnesemia raise toxicity). Repeating 0.25 mg q2h with a vague "max ~1–1.5 mg" is not safe as a nurse reference. mg vs mcg (0.25 mg = 250 mcg) and adult vs pediatric product strengths are a recognized ISMP concern (verify vial strengths on the current label).
* **Corrected:** `"Digoxin: load only per prescriber/pharmacy order (dose depends on renal function, lean weight, prior digoxin, K/Mg). Check K⁺ and Mg²⁺ first. Verify vial strength (adult vs pediatric)."`

#### AF-3 — AF with RVR — MAJOR
* **Quoted:** `"Do NOT give AV-nodal blockers (diltiazem, β-blocker, digoxin, adenosine) in suspected pre-excited AF (WPW) — call provider; procainamide or cardioversion."`
* **Issue:** Correct and valuable. Omits IV amiodarone, which many references also advise avoiding in pre-excited AF (I am not certain of the exact class designation in the current ACC/AHA/HRS guideline — verify). The Unstable-tachy escalate line repeats "no AV-nodal blockers" with the same omission. Procainamide has no limits here (see UT-2).
* **Corrected:** `"Suspected pre-excited AF (wide, irregular, fast): AVOID AV-nodal blockers (diltiazem, verapamil, β-blocker, digoxin, adenosine) and ask the prescriber before ANY IV amiodarone; expert guidance; cardioversion if unstable."`

#### AF-4 — AF with RVR — MINOR
* **Quoted:** `"Hypotension, decompensated HF or reduced EF: avoid diltiazem/β-blocker; amiodarone 150 mg IV over 10 min then 1 mg/min ×6 h, 0.5 mg/min ×18 h (or digoxin)."`
* **Issue:** Regimen is standard. Missing: the bolus itself can cause hypotension and bradycardia; central line preferred for infusion/higher concentrations; cardioversion embolic risk with AF >48 h/unknown (anticoagulation is mentioned elsewhere); interacts with warfarin, digoxin, other QT drugs; hepatic effects.
* **Corrected:** `"Amiodarone per order (standard concentration; central line preferred for infusion; monitor BP, HR, QTc). AF >48 h or unknown duration: conversion may cause stroke — provider decision."`

#### AF-5 — AF with RVR — MINOR
* **Quoted:** `"metoprolol 2.5–5 mg IV over 2 min q5 min up to ~15 mg"`.
* **Issue:** Matches common ACLS-type instructions. Add hold for asthma/bronchospasm, HF, bradycardia, AV block, shock.
* **Corrected:** `"Metoprolol IV per order; hold for hypotension, bradycardia, AV block, decompensated HF, or bronchospasm."`

#### AF-6 — AF with RVR — MINOR
* **Quoted:** `"Replace K and Mg per protocol (e.g., Mg 2 g IV)."`; Meds `"Magnesium 2 g IV · Potassium to ≥4.0"`.
* **Issue:** Magnesium rate not given (typically over 15–60 min; faster only for torsades/arrest) and accumulates in renal impairment. K⁺ repletion rate/line limits absent (X-04).
* **Corrected:** `"Electrolyte replacement per protocol/order (rates and lines per policy; reduce in renal impairment; recheck levels)."`

### Unstable tachycardia

#### UT-1 — Unstable tachycardia — MINOR
* **Quoted:** `"adenosine 6 mg rapid IV push with flush (large proximal vein); if no conversion 12 mg ×1–2."`; Meds `"(↓ to 3 mg via central line/heart transplant; caution asthma)"`.
* **Issue:** Dose sequence correct. Add: continuous rhythm-strip recording; two-syringe/stopcock rapid technique; interactions (dipyridamole and carbamazepine potentiate; theophylline/caffeine antagonize — verify); contraindicated in 2nd/3rd-degree block and sick sinus without pacemaker; avoid in severe active bronchospasm.
* **Corrected:** `"Adenosine per order/ACLS: rapid IV push followed immediately by rapid saline flush via a proximal vein (or two-syringe technique) with ECG recording; reduced dose if central line, transplant, or dipyridamole/carbamazepine; avoid in high-grade block or active bronchospasm."`

#### UT-2 — Unstable tachycardia — MINOR
* **Quoted:** Meds `"Procainamide 20–50 mg/min (not with long QT) · Lidocaine 1–1.5 mg/kg"`; Actions `"procainamide 20–50 mg/min (max 17 mg/kg) per expert"`.
* **Issue:** The Meds line drops the max (17 mg/kg) and the stop criteria (hypotension, QRS widening >50%, arrhythmia suppression); renal dosing (NAPA accumulation) and weight basis in obesity not stated.
* **Corrected:** `"Procainamide only per expert/order: continuous BP and ECG; stop for hypotension, QRS widening >50%, arrhythmia termination, or the ordered cumulative maximum; reduce in renal impairment."`

### Symptomatic bradycardia

#### UB-1 — Bradycardia — MAJOR
* **Quoted:** Actions `"Atropine 0.5–1 mg IV rapid push (ACLS: 1 mg), repeat q3–5 min, max total 3 mg. Doses <0.5 mg can worsen bradycardia."` vs Glance `"Atropine 1 mg IV q3–5 min (max 3 mg)"` and Meds `"Atropine 1 mg IV q3–5 min, max 3 mg"`.
* **Issue:** Contradictory first dose within one card. The current AHA adult bradycardia algorithm uses 1 mg (older versions used 0.5 mg). Atropine is also ineffective for infranodal block/transplant (the app says so — good).
* **Corrected:** `"Atropine 1 mg IV per ACLS order, repeat every 3–5 min to a total of 3 mg; ineffective in high-grade block and after heart transplant — go to pacing."` (Make Actions and Meds identical.)

#### UB-2 — Bradycardia — MAJOR (units, see X-02)
* **Quoted:** `"Infusion alternative: dopamine 5–20 mcg/kg/min or epinephrine 2–10 mcg/min, titrated."`; Meds `"Dopamine 5–20 mcg/kg/min · Epinephrine 2–10 mcg/min"`.
* **Issue:** Both ranges match ACLS. But they sit side by side in different unit systems; the same epinephrine appears elsewhere in mcg/kg/min. Dopamine carries extravasation necrosis risk (X-04); DOPamine/DOBUTamine LASA.
* **Corrected:** `"Chronotropic infusion (DOPamine OR epinephrine) per order: dose, units (mcg/kg/min vs mcg/min), concentration and line per order/pump library; independent double check; high-alert."`

#### UB-3 — Bradycardia — MINOR
* **Quoted:** `"Glucagon 3–10 mg IV (β-blocker/CCB toxicity)"`.
* **Issue:** Published toxicology regimens use a 3–5 mg bolus (up to 10 mg) then an infusion; the anaphylaxis card says 1–5 mg. Different indications but nothing explains it; nausea/vomiting; no infusion rate.
* **Corrected:** `"β-blocker/CCB toxicity: glucagon, calcium and other antidotes per toxicology/poison center and order; doses differ from anaphylaxis dosing."`

### Acute respiratory failure / intubation

#### RF-1 — Intubation — MAJOR
* **Quoted:** `"Induction: ketamine 1–2 mg/kg · etomidate 0.3 mg/kg · propofol 1–2 mg/kg (avoid in shock) — reduce in shock"`.
* **Issue:** Doses are the usual RSI doses. But (a) "reduce in shock" gives no amount (practice commonly uses roughly half-dose or less — e.g., ketamine ~0.5–1 mg/kg, etomidate ~0.15–0.2 mg/kg; practice varies, confirm locally); (b) no dosing-weight guidance in obesity (X-05); (c) induction agents are chosen and drawn up by the intubator/pharmacist.
* **Corrected:** `"RSI medications are chosen, dosed and ordered by the intubating provider (reduced induction dose in shock; weight basis per provider/pharmacy). Nurse role: have ordered drugs drawn up, labeled and double-checked; confirm allergies and weight."`

#### RF-2 — Intubation — MAJOR
* **Quoted:** `"Paralytic: rocuronium 1–1.2 mg/kg · succinylcholine 1–1.5 mg/kg (avoid: hyperK, burns/crush >24–72 h, neuromuscular disease, malignant hyperthermia history)"`.
* **Issue:** Doses and key contraindications are correct. Gaps: (a) paralysis outlasts induction agents — rocuronium at RSI doses typically lasts about an hour or more, so the patient may be awake and paralyzed unless sedation/analgesia starts promptly (the app lists sedation as step 10 of 12 — late); (b) no "paralyzing agent" labeling/storage; (c) succinylcholine also avoided in prolonged immobilization, rhabdomyolysis, severe hyperkalemia, pseudocholinesterase deficiency (as I recall); (d) reversal (sugammadex) availability not mentioned.
* **Corrected:** `"Neuromuscular blocker per intubating provider/order — HIGH-ALERT: label 'paralyzing agent'; start analgesia/sedation immediately after tube confirmation (patient cannot show distress); succinylcholine contraindicated in hyperkalemia, prolonged immobilization, burns/crush >24–72 h, neuromuscular disease, malignant hyperthermia history; know where the reversal drug is stocked."`

#### RF-3 — Intubation — MAJOR (units, see X-02)
* **Quoted:** `"Push-dose pressor: phenylephrine 50–100 mcg or epinephrine 5–20 mcg IV"`.
* **Issue:** Ranges are within commonly used push-dose ranges, but concentration/preparation is the hazard: epinephrine 5–20 mcg is typically made by diluting epinephrine 0.1 mg/mL (to e.g. 10 mcg/mL); 10-fold dilution errors are described in the literature. Phenylephrine vial (10 mg/mL) vs prepared syringes (e.g., 100 mcg/mL). Pharmacy-prepared syringes preferred.
* **Corrected:** `"Push-dose vasopressor ONLY per order, using a pharmacy-prepared or facility-standard syringe (concentration on the syringe label); do not self-dilute from vials without a second check."`

#### RF-4 — Intubation — MINOR
* **Quoted:** `"Post-intubation sedation: fentanyl 25–100 mcg/h, propofol 5–50 mcg/kg/min, dexmedetomidine 0.2–1.5 mcg/kg/h"`.
* **Issue:** Broad ranges consistent with PADIS-type practice. Missing: propofol limits (triglycerides/pancreatitis, lipid calories, hypotension, propofol infusion syndrome with prolonged high dose, tubing/vial change interval); dexmedetomidine bradycardia/hypotension (avoid loading bolus when unstable); fentanyl "mcg/h" vs bolus "mcg" confusion. Three unit bases in one line (X-02).
* **Corrected:** `"Analgesia-first sedation per order (fentanyl, then propofol or dexmedetomidine as ordered); rates/units per pump library; monitor BP, HR, RASS, and triglycerides with propofol."`

### Ventilator alarms

#### VA-1 — Vent alarms / Intubation — MINOR
* **Quoted:** `"Naloxone for opioid-induced apnea (low dose, titrate)"` (Vent alarms Meds); `"opioid (naloxone)"` (Intubation reversible causes).
* **Issue:** An apnea alarm on a ventilated patient needs ventilation and assessment, not reflex naloxone: reversal causes pain, sympathetic surge, agitation, rarely pulmonary edema, and can prompt self-extubation.
* **Corrected:** `"Naloxone only if ordered and the patient is not ventilator-supported (it does not fix an apnea alarm on a ventilated patient)."`

### ARDS

#### ARDS-1 — ARDS — MINOR
* **Quoted:** `"Corticosteroids (e.g., dexamethasone 20 mg/day→10) may be considered per provider/protocol"`.
* **Issue:** Ambiguous shorthand (days? route?). The trial regimen I recall was dexamethasone 20 mg daily ×5 days then 10 mg daily ×5 days (verify). Arrows and "mg/day→10" can be misread.
* **Corrected:** `"Corticosteroids for ARDS — only per provider/protocol (drug, dose, route, duration per order)."`

#### ARDS-2 — ARDS — MINOR
* **Quoted:** `"consider neuromuscular blocker (e.g., cisatracurium) for severe/ persistent dyssynchrony or P/F <150 — per intensivist."`
* **Issue:** Fine as an anticipate item. Add: never paralyze without analgesia + sedation, eye care, TOF (mentioned in Monitor), "paralyzing agent" labeling. SSC 2026 (verified) suggests intermittent NMBA boluses over continuous infusion in ARDS; the overall benefit of routine NMBA remains debated (RCTs conflicted — verify).
* **Corrected:** `"Neuromuscular blockade only per intensivist order; paired with analgesia/sedation; monitor depth (TOF), protect eyes/skin; HIGH-ALERT."`

#### ARDS-3 — ARDS — SUGGESTION
* **Quoted:** `"Inhaled nitric oxide/epoprostenol (rescue)"`.
* **Issue:** Specialist therapies with rebound pulmonary hypertension on abrupt discontinuation; epoprostenol is high-alert.
* **Corrected:** `"Inhaled pulmonary vasodilators per ICU/pharmacy order; do not interrupt abruptly; ensure backup supply."`

### Pulmonary embolism

#### PE-1 — PE — MAJOR
* **Quoted:** `"UFH IV (80 units/kg bolus then 18 units/kg/h, per nomogram)"`; `"UFH 80 units/kg IV bolus → 18 units/kg/h (adjust per aPTT/anti-Xa nomogram)"`.
* **Issue:** Dose is the standard VTE nomogram initial dose. Not addressed: heparin is a top high-alert drug (10-fold errors from vial strengths 1,000–10,000 units/mL; weight errors; bolus vs infusion confusion); many facilities cap the bolus and initial rate; obesity; pump programmed in units/h vs mL/h; concurrent LMWH; HIT.
* **Corrected:** `"Unfractionated heparin per facility VTE/PE nomogram and order (weight-based bolus + infusion, facility caps). HIGH-ALERT: independent double check of weight, concentration, dose and pump; verify vial strength; aPTT/anti-Xa per protocol."`

#### PE-2 — PE / Stroke — MAJOR
* **Quoted:** PE: `"alteplase 100 mg over 2 h; 50 mg IV bolus in arrest per protocol"`; Stroke: `"alteplase 0.9 mg/kg (max 90 mg; 10% bolus, remainder over 60 min)"`.
* **Issue:** Same drug, two different regimens in one app. Each matches its indication, but a reader searching "alteplase" can pull the wrong one. A third product (catheter-clearance alteplase 2 mg) and tenecteplase (stroke weight-based vs STEMI tiered dosing) add confusion.
* **Corrected:** `"ALTEPLASE dose depends on indication (PE ≠ stroke ≠ line clearance). Thrombolytic dose is set by the ordering provider and verified by pharmacy plus a second clinician. Never use a dose from another indication."`

#### PE-3 — PE — MINOR
* **Quoted:** `"Enoxaparin 1 mg/kg q12h (renal adjustments) · DOACs after stabilization"`.
* **Issue:** "Renal adjustments" unspecified; ICU patients with CrCl <30 mL/min are commonly given UFH or a once-daily regimen per label; obesity/extremes may need anti-Xa monitoring.
* **Corrected:** `"LMWH per order; reduce/avoid in severe renal impairment (UFH often preferred in ICU); obese or renal-impaired patients may need anti-Xa monitoring."`

### Sepsis / septic shock

#### SEP-1 — Sepsis — MAJOR
* **Quoted:** `"Persistent hypotension: add vasopressin 0.03 units/min (when NE ~0.25–0.5 mcg/kg/min)"`; Meds `"Vasopressin 0.03 units/min fixed"`.
* **Issue:** 0.03 units/min is the well-known fixed septic-shock dose (some sites use 0.04). The hazard is units/min vs units/h (60×), and that other indications use much higher rates (e.g., variceal bleeding) while the GI bleed card lists "Vasopressin alternative" undosed. "NE" abbreviation (X-07). SSC 2026 (verified) suggests adding vasopressin for escalating norepinephrine; I did not see a fixed NE threshold in the text I read, so "0.25–0.5" should be presented as an example only.
* **Corrected:** `"Vasopressin add-on for escalating norepinephrine, per order: fixed septic-shock rate and units (units/min vs units/h) per pump library; dosing differs by indication; central access preferred (tissue ischemia/extravasation risk)."`

#### SEP-2 — Sepsis — MAJOR
* **Quoted:** `"peripheral OK short-term, then central"`.
* **Issue:** Consistent with SSC 2026 (suggestion, very low certainty; verified), but incomplete without site/frequency/extravasation response (X-04); "short-term" undefined.
* **Corrected:** `"Peripheral norepinephrine allowed per facility policy: large proximal vein, hourly site checks, move to central access as soon as possible; know the extravasation response."`

#### SEP-3 — Sepsis — MINOR
* **Quoted:** `"balanced crystalloid (LR/Plasma-Lyte) 30 mL/kg IV within first 3 h"`.
* **Issue:** SSC 2026 (verified): weight-based volume uses actual weight, or adjusted/ideal weight if BMI >30; individualize with heart failure/ESRD. 30 mL/kg on a 150 kg patient = 4.5 L.
* **Corrected:** `"Initial crystalloid volume per order (commonly 30 mL/kg; ideal/adjusted weight if BMI >30); reassess often; caution in HF/ESRD."`

#### SEP-4 — Sepsis — MINOR
* **Quoted:** `"Broad-spectrum IV antibiotics within 1 h … Check allergies."`
* **Issue:** Appropriately undosed. Add pharmacist-relevant points: first dose is a full loading dose regardless of renal function (renal adjustment applies to later doses); SSC 2026 (verified, strong recommendation) favors prolonged β-lactam infusion after the initial loading dose; clarify allergy type rather than reflexively withholding (the app already says not to withhold without guidance — good).
* **Corrected:** `"Antibiotic choice/dose per order and pharmacy. First dose: give the full dose without renal reduction unless pharmacy/provider says otherwise; clarify allergy type before withholding."`

#### SEP-5 — Sepsis — MINOR
* **Quoted:** Actions `"consider hydrocortisone 200 mg/day (50 mg q6h) if ongoing pressors"` vs Meds `"Hydrocortisone 50 mg IV q6h (200 mg/day) if ongoing high vasopressor need (≥4 h)"`.
* **Issue:** Wording differs (any pressor vs high-dose ≥4 h). SSC 2026 (verified) "suggests IV corticosteroids" in septic shock; I did not confirm the exact threshold wording. Add hyperglycemia monitoring.
* **Corrected:** `"Hydrocortisone per order for ongoing vasopressor requirement; monitor glucose."`

#### SEP-6 — Sepsis / Tools — SUGGESTION (non-dosing)
* **Quoted:** `"RR ≥22, SBP ≤100 (qSOFA)"`; `"(>22 = concern; qSOFA)"`.
* **Issue:** SSC 2026 (verified) recommends NEWS/NEWS2/MEWS/SIRS over qSOFA as a single screening tool.
* **Corrected:** `"Screen with your facility's sepsis tool (NEWS/MEWS/SIRS); qSOFA is not a stand-alone screen."`

### Hemorrhagic shock

#### HS-1 — Hemorrhagic shock / GI bleed / ICH — MAJOR
* **Quoted:** `"Xa inhibitors → andexanet/PCC"` (Hemorrhagic, ICH); `"Reversal agents (PCC, vitamin K, protamine, idarucizumab, andexanet)"`.
* **Issue:** FDA safety communication (verified): thromboembolic risk judged to outweigh benefit; AstraZeneca ended US sales Dec 22, 2025. Listing it as an option is stale for US users; the app does not state geography.
* **Corrected:** `"Factor Xa inhibitor (apixaban/rivaroxaban) bleeding: 4-factor PCC per facility protocol (andexanet alfa is no longer marketed in the US as of Dec 2025 — follow local formulary/protocol)."`

#### HS-2 — Hemorrhagic shock — MAJOR
* **Quoted:** `"Tranexamic acid (TXA) 1 g IV over 10 min, then 1 g over 8 h if within 3 h of injury / major bleed (per provider)."`; GI bleed: `"TXA is NOT routinely recommended"`.
* **Issue:** The CRASH-2-style regimen is correct for trauma. Problems: (a) "or major bleed" widens it to non-trauma bleeding while the GI bleed card says not routinely recommended; (b) rapid IV push causes hypotension; (c) renal accumulation and seizure risk at high exposure; (d) thrombosis caution; (e) wrong-route errors: TXA has been mistakenly given intrathecally (I recall FDA/ISMP alerts — verify), so state IV only and verify the vial; (f) "TXA" is also used as an abbreviation for tPA/alteplase in some systems.
* **Corrected:** `"Tranexamic acid IV only (never intrathecal) per trauma-hemorrhage protocol/order; infuse as ordered (not rapid push); spell out the drug name; renal impairment and thrombosis risk → provider/pharmacy."`

#### HS-3 — Hemorrhagic shock — MINOR
* **Quoted:** `"Replace calcium (calcium chloride 1 g or gluconate 3 g) with ongoing transfusion; keep iCa >1.1 mmol/L."`
* **Issue:** The equivalence (1 g CaCl ≈ 3 g gluconate) is correct and good. Risks: giving "1 g" of the wrong salt (3× difference); CaCl extravasation; do not run with bicarbonate/phosphate in the same line; give slowly when not in arrest (hypotension/bradycardia).
* **Corrected:** `"Calcium per order: chloride and gluconate are NOT dose-equivalent gram-for-gram (1 g chloride ≈ 3 g gluconate); chloride via central/secure large vein; give over the ordered time; separate from bicarbonate/phosphate; monitor ECG."`

#### HS-4 — Hemorrhagic shock — SUGGESTION
* **Quoted:** `"Resuscitate with blood products: balanced 1:1:1"`.
* **Issue:** Blood products need two-person patient/product verification and compatible fluids in the line. Not mentioned.
* **Corrected:** `"Transfusion: two-person verification at the bedside per policy; compatible fluids only in the line."`

### Acute ischemic stroke

#### IS-1 — Ischemic stroke — MAJOR
* **Quoted:** `"alteplase 0.9 mg/kg (max 90 mg; 10% bolus, remainder over 60 min) or tenecteplase 0.25 mg/kg (max 25 mg) single bolus per facility protocol."`
* **Issue:** Doses agree with AHA/ASA 2026 (verified online). Hazards: measured vs estimated weight, dose rounding/reconstitution, bolus-then-infusion programming, TNK (stroke) vs TNK (STEMI) dosing, alteplase vs catheter-clearance product. High-alert plus time pressure.
* **Corrected:** `"Thrombolytic (alteplase or tenecteplase) is ordered by the stroke provider; weight preferably measured; dose prepared/verified by pharmacy or per stroke-team protocol with independent double check at the bedside."`

#### IS-2 — Ischemic stroke — MINOR
* **Quoted:** `"labetalol 10–20 mg IV, nicardipine 5 mg/h titrate (2.5 mg/h q5–15 min, max 15 mg/h), clevidipine"`.
* **Issue:** Matches the common AHA-style titration. Missing: labetalol hold for bradycardia/heart block/asthma/decompensated HF, push rate, repeat limits; nicardipine peripheral-site change per product/policy; clevidipine is a lipid emulsion (egg/soy, lipid disorders — as I recall). niCARdipine vs NIFEdipine LASA.
* **Corrected:** `"Antihypertensive per order to the ordered BP target: labetalol (hold for bradycardia/block/asthma/acute HF), niCARdipine or clevidipine infusion titrated per order; follow facility site-change/line rules."`

#### IS-3 — Ischemic stroke — MINOR
* **Quoted:** `"Aspirin 160–325 mg within 24–48 h (after lysis exclusion/24 h post lysis)"`; `"Do NOT give food/drink/oral meds."`
* **Issue:** Logic consistent but should state the swallow-screen dependency and alternate route as per order; "160–325 mg" is a wide range (pharmacy/prescriber to select).
* **Corrected:** `"Aspirin only after swallow screen or by alternate route, only per order, timing per lysis status."`

#### IS-4 — Ischemic stroke — SUGGESTION
* **Quoted:** `"POINT-OF-CARE GLUCOSE (treat if <60 mg/dL)."`
* **Issue:** Other cards use <70 (<54 clinically significant). Unexplained inconsistency may confuse.
* **Corrected:** `"Treat hypoglycemia per your facility hypoglycemia protocol (stroke guidance threshold: <60 mg/dL)."`

### ICH / increased ICP

#### ICH-1 — ICH/ICP — MAJOR
* **Quoted:** `"23.4% saline 30 mL via central line over 10–20 min (or 3% saline 250 mL bolus)"`; Meds `"Hypertonic saline 3% 250 mL bolus (or 23.4% 30 mL central)"`.
* **Issue:** Range is in commonly used practice. But 23.4% NaCl (4 mEq/mL) is a concentrated electrolyte: fatal errors have occurred from mistaken or too-rapid administration; most safety programs restrict storage, require pharmacy dispensing, central line and independent double checks. "3% 250 mL bolus" rate undefined. Sodium monitoring is listed (good).
* **Corrected:** `"Hyperosmolar therapy per neurosurgery/ICU order. 23.4% sodium chloride is HIGH-ALERT: pharmacy-dispensed, central access only, give over the ordered time via pump, independent double check; 3% NaCl rate/line per policy; check serum sodium as ordered."`

#### ICH-2 — ICH/ICP — MAJOR
* **Quoted:** `"Reversal: 4F-PCC, vitamin K 10 mg IV, idarucizumab 5 g, andexanet alfa, protamine"`.
* **Issue:** IV vitamin K carries a boxed warning for severe hypersensitivity/anaphylaxis (as I recall — verify) and should be given as a slow, diluted infusion; protamine is also boxed (hypotension/anaphylaxis; give slowly). Idarucizumab 5 g is correct (two 2.5 g vials). PCC dosing is protocol/INR/weight-based (not given — good). Andexanet withdrawn (HS-1).
* **Corrected:** `"Reversal per order: 4-factor PCC (pharmacy-prepared, protocol dosing) + vitamin K by slow IV infusion (hypersensitivity risk); idarucizumab for dabigatran; protamine slowly for heparin (hypotension/anaphylaxis risk). Factor Xa inhibitor: PCC per protocol (see HS-1)."`

#### ICH-3 — ICH/SAH — MAJOR
* **Quoted:** `"SAH: secure aneurysm; nimodipine 60 mg q4h PO/NG (hold/split if hypotension)"`.
* **Issue:** Dose/route correct, but nimodipine has a boxed warning: never give IV (fatal cardiovascular collapse after capsule contents were drawn into IV syringes — documented). Use an enteral-only syringe, labeled. Cirrhosis dose reduction; CYP3A4 interactions (e.g., grapefruit, azoles, some antiepileptics).
* **Corrected:** `"Nimodipine for SAH per order, ORAL/ENTERAL ONLY — NEVER IV. Use an enteral-only syringe (not an IV luer-slip syringe); label 'oral'. Hold/split dosing for hypotension only per prescriber."`

#### ICH-4 — ICH/ICP — MINOR
* **Quoted:** `"mannitol 0.25–1 g/kg IV over 15–20 min"`; `"(hold if osm >320 or renal failure)"`.
* **Issue:** Standard published range. Missing: in-line filter practice for crystallizing concentrations, avoid in hypovolemia/hypotension (osmotic diuresis), urine-output replacement.
* **Corrected:** `"Mannitol per order via the specified filter/line; watch BP, urine output, sodium and serum osmolality; hold parameters per order."`

### DKA

#### DKA-1 — DKA — CRITICAL
* **Quoted:** `"Check K+ BEFORE insulin: K <3.3 → hold insulin and replace K first"`; `"K <3.3 → HOLD insulin; give 20–30 mEq/h KCl until K ≥3.3. K 3.3–5.0 (5.2) → add 20–30 mEq to each liter IV fluid (goal 4–5). K >5.0–5.2 → no K; recheck q2h."`; Escalate `"K <3.3 or >5.5"`.
* **Issue (verified online against the 2024 ADA/EASD/JBDS/AACE/DTS consensus that the app itself cites):** the 2024 report says if K⁺ is <3.5 mmol/L, start potassium at 10 mmol/h and delay insulin until K⁺ >3.5; for most patients 20–30 mmol per litre of IV fluid; start replacement once K⁺ falls below 5.0; check K⁺ 2 h after insulin starts, then every 4 h. The app's thresholds (3.3/5.2) and 20–30 mEq/h are the older convention and 2–3× the 2024 replacement rate. A nurse reading "20–30 mEq/h" gets no instruction on central line, cardiac monitoring, concentration limits, pump use, or independent double check — IV potassium at that rate via a peripheral line risks phlebitis/infiltration, and with a programming error, fatal arrhythmia. Thresholds are also inconsistent within the card (3.3 vs 5.5).
* **Corrected:** `"POTASSIUM (per DKA order set): check K⁺ before insulin. If K⁺ is below your protocol's threshold (2024 consensus: <3.5 mmol/L), insulin is held and K⁺ replacement is started first at the ORDERED rate — high-rate potassium needs a central or secure large vein, continuous ECG, pump, and independent double check per facility policy. K⁺ at/above the upper threshold (2024 consensus: ≥5.0): no K⁺ yet; recheck. Otherwise add K⁺ to IV fluids as ordered."`

#### DKA-2 — DKA — MAJOR
* **Quoted:** `"INSULIN (once K ≥3.3): regular insulin IV infusion 0.1 unit/kg/h (± 0.1 unit/kg bolus) or 0.14 unit/kg/h without bolus. Goal glucose fall 50–75 mg/dL/h."`
* **Issue:** Insulin is the leading ISMP high-alert drug for IV use. 0.1 unit/kg/h is consistent with the 2024 consensus (verified); that report positions a 0.1 unit/kg bolus for delayed IV access, followed by fixed-rate infusion; "0.14 unit/kg/h" and "(± bolus)" are older convention. Concentration (typically 1 unit/mL), tubing priming/adsorption, dosing weight in obesity, double check, and the K⁺ prerequisite are not covered. The 2024 report reduces to 0.05 units/kg/h when glucose <250 mg/dL; the app says "0.02–0.05 … only per protocol."
* **Corrected:** `"Regular insulin IV infusion per DKA order set (weight-based; standard concentration; pump library; independent double check); do not start until K⁺ is above the protocol threshold; hourly glucose; rate reduction when glucose falls per protocol."`

#### DKA-3 — DKA — MINOR
* **Quoted:** `"isotonic crystalloid (balanced or 0.9% NaCl) 15–20 mL/kg (≈1–1.5 L) in first hour; then 250–500 mL/h"`.
* **Issue:** The 2024 report (verified) suggests 500–1,000 mL/h for the first 2–4 h without renal/cardiac compromise, slower in HF/renal disease. The app's figure is conservative and acceptable; add comorbidity qualification.
* **Corrected:** `"IV fluids per order (rate individualized: slower in HF/CKD/elderly)."`

#### DKA-4 — DKA — MINOR
* **Quoted:** `"add dextrose when glucose <250 (200–250)"`; `"If glucose falls <250 mg/dL (or 200 per protocol) add D5 (or D10) to fluids and keep insulin running (↓ rate to 0.02–0.05 units/kg/h only per protocol)"`.
* **Issue:** 2024 report: add 5–10% dextrose when glucose <250 mg/dL and reduce to 0.05 units/kg/h. The "(or 200 per protocol)" and "0.02–0.05" ranges are muddy.
* **Corrected:** `"When glucose falls below the protocol threshold (2024 consensus: <250 mg/dL), dextrose-containing fluid is added per order and the insulin rate is reduced per protocol — insulin is not stopped until ketoacidosis resolves."`

#### DKA-5 — DKA — MINOR
* **Quoted:** `"Bicarbonate only if pH <6.9 (per provider). Phosphate if <1.0 mg/dL or cardiac dysfunction/hypoxia."`
* **Issue:** The 2024 report says bicarbonate if severe acidosis (pH <7.0) using a dilute-bicarbonate regimen (verified). For phosphate, the 2024 text I extracted reads "<1.0 mmol/L" (my text capture may be imperfect) whereas the app uses mg/dL — a ~3× difference in meaning (1.0 mg/dL ≈ 0.32 mmol/L). The reviewer must reconcile. IV phosphate products (sodium vs potassium salt; mmol vs mEq vs mg) are themselves error-prone.
* **Corrected:** `"Bicarbonate and phosphate only per provider order (thresholds per your DKA protocol; state units explicitly)."`

### Severe hypoglycemia

#### HYPO-1 — Hypoglycemia — MINOR
* **Quoted:** `"NOT able to take PO or has IV access: dextrose 50% 25 g (50 mL) IV push — or dextrose 10% 125–250 mL IV bolus (12.5–25 g) per protocol."`
* **Issue:** "NOT able to take PO or has IV access" is ambiguous (reads as "OR has IV access", which would include an alert patient with IV). D50 is hyperosmolar and extravasates (X-04); many facilities prefer D10 (facility choice). Push rate not given.
* **Corrected:** `"Unable to take oral carbohydrate AND has IV access: IV dextrose per hypoglycemia order/protocol (D10 or D50 — confirm concentration on the bag/syringe; D50 only into a patent large vein; give at the ordered rate)."`

#### HYPO-2 — Hypoglycemia — SUGGESTION
* **Quoted:** `"Alcohol/malnutrition: give thiamine 100 mg IV with/before dextrose."`
* **Issue:** Correct; add "do not delay dextrose for thiamine in symptomatic hypoglycemia" (same as SE-4). Glucagon route is "IM/SC" in Actions vs "IM/SC/IV" in Meds — inconsistent.
* **Corrected:** `"Thiamine given with or immediately before dextrose in at-risk patients; do not hold dextrose waiting for thiamine."`

#### HYPO-3 — Hypoglycemia — MINOR
* **Quoted:** `"octreotide 50 mcg SC/IV q6h per provider"` (Actions) vs `"Octreotide 50 mcg SC/IV q6–12h (sulfonylurea)"` (Meds).
* **Issue:** Interval differs between lines; depot (LAR) forms are labeled in mg — wrong-formulation risk.
* **Corrected:** `"Octreotide (immediate-release injection, NOT depot/LAR) for sulfonylurea-induced hypoglycemia per order."`

### Hyperkalemia

#### HK-1 — Hyperkalemia — MAJOR
* **Quoted:** `"SHIFT K: regular insulin 10 units IV + dextrose 25 g (D50 50 mL). Use 5 units (or more dextrose) if renal failure/low baseline glucose. Glucose checks q30–60 min × 4–6 h."`
* **Issue:** 10 units + 25 g is a long-standing standard, but hyperkalemic ICU patients are disproportionately renal-impaired, where hypoglycemia risk is high (observational reports show substantial rates; several protocols use 5 units, 0.1 unit/kg capped at 10, or more dextrose — practice varies; verify locally). The safer choice is presented as the exception rather than the default for the typical ICU patient with AKI. Insulin push is a high-alert event.
* **Corrected:** `"Regular insulin IV with dextrose per hyperkalemia order set (dose reduced and/or extra dextrose for renal failure, low baseline glucose, or low weight). Check glucose before and hourly for ≥4–6 h; hypoglycemia can be delayed. High-alert: independent double check."`

#### HK-2 — Hyperkalemia — MINOR
* **Quoted:** `"calcium gluconate 10% 1–3 g (10–30 mL) IV over 5–10 min (or calcium chloride 1 g via central/good IV). Repeat in 5 min if ECG still abnormal."`
* **Issue:** Standard doses. Add caution with digoxin toxicity, precipitation with bicarbonate/phosphate in the same line, CaCl extravasation.
* **Corrected:** `"Calcium per order with continuous ECG; separate line from bicarbonate/phosphate; extra caution if on digoxin; CaCl only into a secure large vein/central line."`

#### HK-3 — Hyperkalemia — MINOR
* **Quoted:** `"Sodium bicarbonate 50–150 mEq IV if acidotic (pH <7.2 / HCO₃ low); less effective alone."`
* **Issue:** Wide range (1 vs 3 ampules of 8.4%); sodium/volume load; hypocalcemia; hypertonic push.
* **Corrected:** `"Sodium bicarbonate only per order (concentration and rate per order; sodium/volume load; keep separate from calcium)."`

#### HK-4 — Hyperkalemia — MINOR
* **Quoted:** `"sodium zirconium cyclosilicate 10 g PO or patiromer; sodium polystyrene as alternative."`
* **Issue:** SPS (Kayexalate) carries a gastrointestinal necrosis risk (avoid with ileus, obstruction, post-operative bowel, hypomotility — as I recall; verify) and slow onset; SZC causes sodium load/edema and has oral drug-interaction spacing (pharmacy). None are acute-lowering therapy.
* **Corrected:** `"Potassium binders per order; not for rapid correction; SPS avoided with ileus/obstruction/bowel surgery; check interactions with other oral drugs."`

#### HK-5 — Hyperkalemia — MINOR
* **Quoted:** `"Albuterol 10–20 mg nebulized over 10 min (additive; avoid if active ischemia/tachyarrhythmia)."`
* **Issue:** 10–20 mg is 4–8× a routine 2.5 mg neb. A clinician accustomed to routine nebs may under-dose or question it; others may confuse with routine dosing.
* **Corrected:** `"High-dose albuterol (far above a routine neb) per order only; monitor HR and rhythm."`

### AKI

#### AKI-1 — AKI — MINOR
* **Quoted:** `"Hold/avoid nephrotoxins: NSAIDs, IV contrast, aminoglycosides, vanco trough, ACE-i/ARB, diuretics; renally dose all meds (pharmacy)."` vs Meds `"Loop diuretic (furosemide) for overload — not to 'treat' AKI"`.
* **Issue:** "vanco trough" is ambiguous, and current vancomycin monitoring guidance favors AUC-guided dosing (ASHP/IDSA 2020, as I recall); diuretics appear under "hold" then "for overload". Reword.
* **Corrected:** `"Review nephrotoxins with provider/pharmacy: NSAIDs, IV contrast, aminoglycosides, vancomycin (levels/AUC per pharmacy), ACE-i/ARB; diuretics only for volume overload per provider."`

#### AKI-2 — AKI — MAJOR
* **Quoted:** `"renally dose all meds (pharmacy)"`; `"Drug levels (vancomycin, aminoglycosides), drug dosing review"`.
* **Issue:** Good prompt but no caution that (a) creatinine-based estimates are unreliable when kidney function is changing, (b) over-reduction of antimicrobial first doses in septic AKI causes underdosing, (c) CRRT changes drug clearance.
* **Corrected:** `"Ask pharmacy to re-dose renally cleared drugs daily; do not reduce a first antibiotic dose without pharmacy advice; CRRT requires drug re-dosing."`

### GI bleed

#### GI-1 — GI bleed — MINOR
* **Quoted:** `"IV PPI (e.g., pantoprazole 80 mg IV bolus then infusion 8 mg/h or 40 mg IV q12h per protocol)"`.
* **Issue:** Pattern matches common regimens. ACG guidance (as I recall) places high-dose PPI mainly after endoscopic therapy; pre-endoscopy PPI is permitted but not outcome-proven. Infusions need pump/concentration; Y-site compatibility.
* **Corrected:** `"IV PPI per order/protocol (bolus/continuous vs intermittent per GI)."`

#### GI-2 — GI bleed — MINOR
* **Quoted:** `"octreotide 50 mcg IV bolus then 50 mcg/h"`; `"Vasopressin alternative"`.
* **Issue:** Octreotide regimen is standard for variceal bleeding. "Vasopressin alternative" is an outdated first alternative, undosed in a nurse tool that prints a different vasopressin rate (0.03 units/min) in the sepsis card.
* **Corrected:** `"Octreotide infusion per order. Vasopressin/terlipressin only by specialist order (indication-specific dosing; do NOT use the septic-shock rate)."`

#### GI-3 — GI bleed — MINOR
* **Quoted:** `"ceftriaxone 1 g IV daily (antibiotic prophylaxis)"`.
* **Issue:** Dose consistent with cirrhosis-bleed prophylaxis. Allergy check; avoid administering simultaneously through the same line as calcium-containing infusions (relevant when transfusion calcium is running).
* **Corrected:** `"Antibiotic prophylaxis per order (cefTRIAXone); check allergy; flush between calcium-containing infusions."`

#### GI-4 — GI bleed — MINOR
* **Quoted:** `"Consider erythromycin 250 mg IV 30–120 min before endoscopy (per provider)"`.
* **Issue:** Add QT-prolongation caution and interacting drugs (amiodarone, haloperidol appear in other cards) and CYP3A4 interactions.
* **Corrected:** `"Erythromycin pre-endoscopy per order; check QTc and interacting drugs."`

### Cardiac tamponade

#### TAMP-1 — Tamponade — SUGGESTION
* **Quoted:** `"Local anesthetic ± minimal sedation for pericardiocentesis (ketamine)"`; `"Protamine / PCC / vit K for anticoagulation reversal"`.
* **Issue:** Undosed (good). Add protamine reaction caution.
* **Corrected:** `"Reversal and sedation only by provider order; protamine slowly (hypotension/anaphylaxis risk)."`

### Alcohol withdrawal

#### AW-1 — Alcohol withdrawal — MAJOR
* **Quoted:** `"Symptom-triggered benzodiazepine: lorazepam 1–4 mg IV (or diazepam 5–20 mg IV) q5–15 min"`; `"Severe/DTs: front-load benzodiazepines; escalate promptly rather than low repeated doses."`
* **Issue:** Doses are typical ICU symptom-triggered ranges. Dangers: no cumulative-dose trigger other than "~3 doses with poor control"; diazepam (active metabolites) accumulates in hepatic impairment/elderly; the app does not say lorazepam/oxazepam is generally preferred in advanced liver disease/elderly; additive respiratory depression with opioids/phenobarbital; "front-load" is a prescriber-level strategy.
* **Corrected:** `"Benzodiazepine per CIWA-Ar/order set (drug, dose, interval per order). In liver disease or older adults, prescribers often prefer lorazepam to diazepam. Hold and call for RASS ≤ −2, slow RR, or SpO₂/ETCO₂ change; track cumulative dose and call the provider per protocol."`

#### AW-2 — Alcohol withdrawal — MAJOR
* **Quoted:** `"phenobarbital (e.g., 130–260 mg IV loading step or weight-based per protocol)"`; Meds `"Phenobarbital 130–260 mg IV bolus steps (or 10 mg/kg IBW load per protocol)"`.
* **Issue:** Both approaches appear in the literature. Hazards: very long half-life (days), additive respiratory depression with benzodiazepines, IV rate limit, cumulative caps in protocols, hepatic impairment, PHENobarbital vs PENTobarbital (the latter is in the status epilepticus card), IBW calculation errors (the app gives a PBW formula for ventilation but no IBW for drugs). The two options differ greatly (130–260 mg vs ≈700 mg at 70 kg × 10 mg/kg).
* **Corrected:** `"PHENobarbital per ICU/pharmacy alcohol-withdrawal protocol only (loading dose, rate, cumulative cap, ideal body weight all per order). HIGH-ALERT: independent double check; very long effect — monitor airway/ETCO₂; do not confuse with PENTobarbital."`

#### AW-3 — Alcohol withdrawal — MINOR
* **Quoted:** `"Haloperidol 2–5 mg IV adjunct (monitor QTc)"`.
* **Issue:** IV route is off-label in the US (as I recall); dose range common in ICU. Baseline QTc and electrolytes before dosing; hold thresholds are facility-specific.
* **Corrected:** `"Haloperidol only per order after adequate benzodiazepine; check baseline QTc and K⁺/Mg²⁺; hold/call if QTc prolonged per protocol."`

#### AW-4 — Alcohol withdrawal — MINOR
* **Quoted:** `"THIAMINE 100 mg IV/IM (or higher per provider) BEFORE or with dextrose"`; Meds `"Thiamine 100 mg IV (higher doses if Wernicke)"`.
* **Issue:** 100 mg is a prophylactic-level dose; suspected Wernicke typically needs substantially higher IV doses several times daily (published UK guidance uses hundreds of mg per dose — verify). The app flags "higher" without a number, acceptable under a class-only policy, but should stress not under-treating Wernicke.
* **Corrected:** `"Thiamine IV per order — suspected Wernicke (confusion, ataxia, ophthalmoplegia) needs high-dose IV thiamine per provider; give before or with glucose."`

### Overdose

#### OD-1 — Overdose — MINOR
* **Quoted:** `"naloxone 0.04–0.4 mg IV (titrate q2–3 min to adequate breathing; up to 2 mg total, IM/IN 2–4 mg)"`; Meds `"Naloxone 0.04–0.4 mg IV titrated; IN 4 mg; infusion ~2/3 of effective dose per hour"`.
* **Issue:** Inconsistent (IM/IN 2–4 mg vs IN 4 mg); 0.04 mg requires dilution of the 0.4 mg/mL vial (not stated); with synthetic opioids, larger cumulative doses are sometimes needed at provider judgment and the app says "up to 2 mg" without saying what to do next; precipitated withdrawal/agitation and re-sedation (short half-life — stated).
* **Corrected:** `"Naloxone titrated to adequate breathing (not full arousal), per standing order/protocol: IV in small increments (dilute the 0.4 mg/mL vial for small doses), or IM/intranasal fixed dose. No response at the protocol maximum → call the provider; keep ventilating."`

#### OD-2 — Overdose / Bradycardia — MINOR
* **Quoted:** `"β-blocker/CCB: calcium IV, glucagon (β-blocker), high-dose insulin euglycemia, vasopressors — toxicology guidance."`
* **Issue:** Appropriately undosed. Add that high-dose insulin therapy doses are many multiples of DKA/hyperkalemia insulin doses and need dextrose, glucose and K⁺ monitoring; the app contains other insulin dose sets (0.1 unit/kg/h DKA; 5–10 units hyperkalemia) that could be conflated.
* **Corrected:** `"High-dose insulin therapy for β-blocker/CCB toxicity is toxicology-directed ONLY; its dosing differs sharply from DKA/hyperkalemia insulin — do not use those doses."`

#### OD-3 — Overdose — MINOR
* **Quoted:** Meds `"Sodium bicarbonate 1–2 mEq/kg IV (TCA/salicylate)"`; Actions `"TCA/sodium channel blocker with QRS >100 or arrhythmia: sodium bicarbonate 1–2 mEq/kg IV bolus"`.
* **Issue:** The bolus is TCA-specific. Salicylate alkalinization uses an infusion with potassium repletion and urine-pH targets; conflating the two in one Meds line invites mis-application.
* **Corrected:** `"TCA/sodium-channel blocker with wide QRS: bicarbonate bolus per toxicology/order. Salicylate: alkalinization/dialysis per toxicology (different regimen)."`

#### OD-4 — Overdose / Bradycardia — MINOR
* **Quoted:** Meds `"Atropine (cholinergic)"` vs Bradycardia `"Atropine… max total 3 mg"`.
* **Issue:** Organophosphate/cholinesterase-inhibitor poisoning is titrated to drying of bronchial secretions and may need far more than the 3 mg ACLS ceiling. No mention of pralidoxime. The conflicting caps could mislead.
* **Corrected:** `"Organophosphate/carbamate toxicity: atropine titrated to clinical endpoint (bronchial secretions) per toxicology — the ACLS 3 mg limit for bradycardia does NOT apply; additional antidotes per toxicology."`

#### OD-5 — Overdose — MINOR
* **Quoted:** Glance `"Charcoal only if airway protected and within ~1 h"` vs Actions `"within 1–2 h"`.
* **Issue:** Time window inconsistent; additional exclusions: ileus/bowel obstruction, impending intubation without airway protection, endoscopy planned.
* **Corrected:** `"Activated charcoal only if ordered by provider/poison center: alert or protected airway, within the ordered window, substance adsorbs, no ileus/obstruction."`

#### OD-6 — Overdose — MINOR
* **Quoted:** `"N-acetylcysteine IV (acetaminophen) per protocol"`.
* **Issue:** Undosed (appropriate). NAC IV is weight-based and volume-sensitive; dosing/dilution errors are well known; anaphylactoid reactions occur, particularly with the loading dose; pharmacy-prepared with a second check.
* **Corrected:** `"NAC per poison center/pharmacy protocol: weight-based, pharmacy-prepared, infuse as ordered; watch for anaphylactoid reaction in the first hour."`

### Quick Tools

#### TOOL-1 — Quick tools / Vitals — MAJOR
* **Quoted:** `["SpO₂", "≥94% (92–96% typical COPD; 88–95% ARDS)"]`.
* **Issue:** Oxygen is a drug. Widely used targets for patients at risk of hypercapnic respiratory failure (COPD) are 88–92% (e.g., BTS, GOLD — as I recall; verify). "92–96% typical COPD" can drive excess oxygen and worsen hypercapnia. The ARDS 88–95% reflects ARDSNet.
* **Corrected:** `"SpO₂: ≥94% typical; 88–92% for patients at risk of hypercapnic respiratory failure (e.g., COPD) unless ordered otherwise; 88–95% in ARDS per ARDSNet."`

#### TOOL-2 — Quick tools / Reminders — SUGGESTION
* **Quoted:** `"Typical ICU goal: RASS 0 to −2 (light sedation) unless ordered otherwise."`
* **Issue:** Consistent with PADIS-style practice. Add that sedation depth is an order, and that paralyzed patients cannot be assessed by RASS.
* **Corrected:** `"Sedation target per order; paralyzed patients cannot be assessed by RASS — use TOF/processed EEG per protocol."`


---

## 6. Finding tally, verdict, and top-10 fixes

### 6.1 Tally (cross-cutting + condition-specific = 102 findings)
| Severity | Count | Where |
|---|---|---|
| CRITICAL | 3 | X-01 (dose imperatives without order language / VERIFY stripped), X-02 (unit/format collisions), DKA-1 (potassium thresholds/rate) |
| MAJOR | 34 | X-03–X-08; CA-1, ANA-1, ANA-2, CS-1, CS-2, AF-2, AF-3, UB-1, UB-2, RF-1–RF-3, PE-1, PE-2, SEP-1, SEP-2, HS-1, HS-2, IS-1, ICH-1–ICH-3, DKA-2, HK-1, AKI-2, AW-1, AW-2, TOOL-1 |
| MINOR | 52 | per-condition (dose-context gaps, inconsistencies, caution omissions) |
| SUGGESTION | 13 | — |

### 6.2 Verdict
**Do not release for clinical use in its current form.** The numeric content is mostly in line with published adult ranges (a good sign for the author's source work), but the *way* it is presented is unsafe for a nurse-facing tool: imperative dosing outside the disclaimer banner, mixed units for the same drug, absent high-alert safeguards, absent weight/renal/hepatic context, and several stale or contradicted items (DKA potassium, andexanet, guideline editions, COPD oxygen target, atropine, nimodipine/vitamin K/23.4% NaCl hazard omissions).

Recommended path:
1. Adopt the Section 2 policy (class-wording default; limited site-configurable reference-dose layer).
2. Fix the CRITICAL and MAJOR items.
3. Have the facility pharmacy / P&T / medication safety officer and a critical care physician sign off before `reviewStatus` changes; record reviewer names and date; set a content expiry.
4. Re-review after update because the PWA caches content offline.

### 6.3 Top-10 fixes (ordered by risk reduction per effort)
1. **Put an order/verify statement with every dose and stop stripping the per-condition VERIFY line** (X-01): reword drug imperatives to "anticipate / per order", add banner to Actions/Monitor/Escalate/Glance, remove tick-boxes from drug steps (or label "not a MAR").
2. **Remove doses for infusions and other high-alert drugs, or standardize units app-wide** (X-02): one unit system per drug, always with concentration and route; never mcg/kg/min and mcg/min in one line; spell out units/min vs units/h; fix Bradycardia (dopamine/epinephrine), Anaphylaxis (epinephrine and glucagon), Sepsis (vasopressin), Intubation (push-dose, sedation).
3. **Correct DKA potassium/insulin-hold logic and remove "20–30 mEq/h" without line/monitoring/double-check** (DKA-1, DKA-2) — align with the 2024 consensus the app cites, or hand off to the facility DKA order set.
4. **Add high-alert handling to every Meds section that includes one** (X-03): independent double check, smart-pump library, standard concentrations, weight verification — for insulin, heparin, IV K⁺, 23.4% NaCl, NMBs, vasoactive and sedative infusions, thrombolytics, phenobarbital, amiodarone.
5. **Add peripheral/central line and extravasation guidance** (X-04, SEP-2): site, hourly checks, escalate to central, follow facility extravasation protocol (antidote per order); apply to pressors, CaCl, 23.4%/3% NaCl, amiodarone, D50, nicardipine, KCl.
6. **Fix the specific drug-safety omissions**: nimodipine "ORAL/ENTERAL ONLY — NEVER IV" (ICH-3); IV vitamin K slow infusion/protamine slow infusion (ICH-2); NMB sedation gap and labeling (RF-2, ARDS-2); epinephrine concentration/IM-only wording (CA-1, ANA-1); heparin nomogram/caps/double check (PE-1).
7. **Update stale/withdrawn content** (X-08, HS-1): andexanet alfa (withdrawn from US market Dec 22, 2025), 2025 AHA ECC, SSC 2026 (qSOFA, vasopressin, β-lactam infusion), AHA/ASA AIS 2026; add "last verified" dates and an expiry mechanism.
8. **Resolve internal inconsistencies** that cause wrong-dose risk: atropine 0.5–1 mg vs 1 mg (UB-1); norepinephrine 0.01–3 vs 0.05–0.5+ (CS-1); naloxone IN dose (OD-1); octreotide intervals (HYPO-3); charcoal time window (OD-5); glucose thresholds; alteplase PE vs stroke regimens (PE-2).
9. **Add renal/hepatic/obesity prompts** (X-05, X-06) where they change dosing or safety: digoxin (AF-2), milrinone (CS-2), enoxaparin (PE-3), hyperkalemia insulin (HK-1), lorazepam vs diazepam in liver disease (AW-1), phenobarbital (AW-2), sepsis fluids (SEP-3), first-dose antibiotics in AKI (SEP-4, AKI-2).
10. **Fix oxygen/COPD target and adopt Tall Man/spelled-out names** (TOOL-1, X-07): COPD/hypercapnic risk target 88–92%; DOBUTamine/DOPamine, PHENobarbital/PENTobarbital, cefTRIAXone; spell out "intranasal", "norepinephrine", "tranexamic acid"; add concentrations where multiple vial strengths exist.

### 6.4 Uncertainty / what I did not verify
* I verified online: 2025 AHA ACLS algorithm doses; SSC 2026 statements; AHA/ASA AIS 2026 thrombolytic dosing and BP thresholds; ADA/EASD 2024 consensus potassium, insulin, dextrose and overlap statements; FDA/AstraZeneca andexanet withdrawal.
* Not re-verified against primary sources (stated from working knowledge and flagged "as I recall/verify" in text): ICH 2022 BP targets, nimodipine/vitamin K/protamine boxed warnings, Tall Man lists, TXA wrong-route alert, hypoglycemia incidence with hyperkalemia insulin, COPD 88–92% targets, ACG PPI timing, phenobarbital protocols, thiamine Wernicke regimens, pre-excited AF/amiodarone guideline class, product vial strengths.
* Facility-specific standing orders, formulary, pump library, and concentrations were not available to me; any "typical" numbers I offered in corrected wording are illustrative and must be replaced by the facility's approved values.
* This review does not substitute for the formal clinical review the app itself states is pending (`reviewStatus: "NOT YET CLINICALLY REVIEWED"`).
