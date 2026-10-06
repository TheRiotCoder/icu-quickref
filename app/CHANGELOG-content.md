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
4. **High-alert callouts** sit in the per-condition `warnings[]` (G-4, P X-03). Tall Man lettering is used for ISMP pairs (P X-07): DOPamine/DOBUTamine, PHENobarbital/PENTobarbital, niCARdipine, cefTRIAXone, levETIRAcetam, methylPREDNISolone. Abbreviations like "IN" and "NE" are spelled out.
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

### cardiac-arrest
| Finding | Severity | Fix |
|---|---|---|
| N CA-1 / I CA-2 | MAJOR / MINOR | Temperature control 32–37.5 °C for ≥36 h per provider/protocol; prevent fever (≥72 h per protocol) |
| N CA-2 / I CA-4 | MAJOR / MINOR | ETCO₂ ≥10, ideally ≥20; abrupt sustained rise >10 mmHg or pulsatile art line → pulse check; never stop CPR on ETCO₂ alone |
| N CA-3 | MAJOR | Code-status step moved to glance + action 2 ("No valid DNR order = start CPR; verify in parallel"); removed from Escalate |
| N CA-4 / P CA-1 | MAJOR | Epinephrine/antiarrhythmics tagged ORDER, "on code-leader order", 0.1 mg/mL syringe concentration + warning against 1 mg/mL IV push with pulse; "after initial shocks fail" |
| N CA-7 / I CA-5 | MAJOR | CALS warning + escalate line; new `post-cardiac-surgery` condition |
| N CA-5, CA-6, CA-8, CA-9, CA-10, CA-11; I CA-1, CA-3, CA-6, CA-8; P CA-3, CA-4 | MINOR/SUGG | Re-sequenced (compressions → pads → shock → ventilate → access); device-labeled energy (max if unknown); CLEAR/pads away from devices; Ca/bicarb/Mg not routine; MAP ≥65, SpO₂ 90–98, glucose 70–180; ventilated-patient bagging; one antiarrhythmic only; lidocaine cumulative limit; Mg diluted per order; pregnancy LUD |

### anaphylaxis
| Finding | Severity | Fix |
|---|---|---|
| N AN-1 / I AN-1 / P ANA-1 | CRITICAL / MAJOR | Concentration warning (1 mg/mL IM only; 0.3–0.5 mg = 0.3–0.5 mL; never IV push; 0.1 mg/mL for IV arrest) in warnings, glance, action, meds |
| N AN-2 | MAJOR | IM epinephrine tagged ORDER "per anaphylaxis standing order; else verbal order immediately" |
| P ANA-2 | MAJOR | Infusion numbers removed (per order/pump library, HIGH-ALERT); glucagon mg/mcg-per-min line replaced with "slowly, per order; airway" |
| N AN-3..7, I AN-2..6, P ANA-3..5 | MINOR/SUGG | Adjuncts optional/after epi/per order; repeat trigger harmonised (2 IM doses); fluids per order with HF/ESRD aliquots; tubing replacement; ICU triggers + ACE-i/HAE mimic; nebulized epi not a substitute; transfusion → new card |

### tension-pneumothorax
| Finding | Severity | Fix |
|---|---|---|
| N TP-1 | MAJOR | Needle/finger thoracostomy/chest tube tagged PROV ("Anticipate/assist"); warning added |
| N TP-4 | MAJOR | Never clamp with air leak; below chest; disconnection/dislodgement steps |
| N TP-2/3/5, I TP-1..5, P TP-1 | MINOR/SUGG | No imaging when unstable; nitrous oxide removed; 2–4 h hemothorax window + instability; obesity needle length; air rush may be absent; ultrasound caveat; gentle bagging after disconnect; track local anesthetic |

### status-epilepticus
| Finding | Severity | Fix |
|---|---|---|
| N SE-1 / I SE-1 | MAJOR | "~20 min" removed: second-line requested as soon as benzo fails (~5 min after full dose), prepared in parallel; goal infusing by ~20 min; refractory definition |
| N SE-2 | MAJOR | Benzodiazepine step tagged ORDER "per seizure order set; ask for verbal order at 5-min call" |
| N SE-3 | MAJOR | Eclampsia added (recognize, action, meds, escalate) — magnesium per OB protocol, no numbers |
| Others (N SE-4..6, I SE-2..6, P SE-1..4) | MINOR/SUGG | Pediatric midazolam tier removed (adult scope); vial-strength + PE warnings; do not delay dextrose for thiamine; phenytoin extravasation; valproate contraindications; pre-arrival benzo check; NCSE/cEEG; second-line load numbers removed per dose policy (infusions) |

### acs-mi
| Finding | Severity | Fix |
|---|---|---|
| N AC-1 | MAJOR | "New LBBB" replaced with LBBB/paced + symptoms → provider/Sgarbossa; age/sex STE thresholds |
| N AC-2 | MAJOR | Aspirin/SL nitro tagged ORDER (protocol) with contraindication screens (single SBP threshold, PDE-5/riociguat, patch) |
| N AC-3 | MAJOR | Aortic dissection warning before antithrombotics/lytics |
| I ACS-4 | MAJOR | Fibrinolytic absolute/relative contraindication checklist (intensivist's list, flagged "verify against current ACC/AHA/facility checklist") |
| Others (N AC-4..6, I ACS-1..3,5..7, P ACS-1..3) | MINOR/SUGG | Type 2 MI; β-blocker/statin per cardiology; ECG-to-device wording; opioids delay P2Y12; prasugrel caution; duplication check; retroperitoneal bleed; K/Mg labelled "common target per protocol"; statin dose removed |

### cardiogenic-shock
| Finding | Severity | Fix |
|---|---|---|
| N CS-1 / P CS-1 | MAJOR | Norepinephrine range removed → "per order/pump library; mcg/min vs mcg/kg/min; rising requirement → call" |
| P CS-2 | MAJOR | Milrinone: renal adjustment per pharmacy, bolus only if explicitly ordered, no numbers |
| Others (N CS-2..4, I CS-1..5, P CS-3) | MINOR/SUGG | Tags ORDER/PROV; fluid challenge per order; epinephrine third-line; MCS team decision/SCAI; NIV wording; DOBUTamine/DOPamine; MCS nursing rules; peripheral pressor/extravasation warning (P X-04) |

### afib-rvr
| Finding | Severity | Fix |
|---|---|---|
| N AF-2 / I AF-1 / P AF-3 | CRITICAL / MAJOR | Pre-excited AF: no diltiazem, verapamil, β-blocker, digoxin, adenosine OR amiodarone — in warnings, glance, recognize, actions (stop step), meds, escalate |
| N AF-1 / I AF-2 | MAJOR / MINOR | Cardioversion ≥200 J biphasic (or device max) per device/provider; tagged PROV |
| N AF-3 / I AF-3 | MAJOR / MINOR | Compensatory-tachycardia check before cardioversion or rate control; hold parameters |
| P AF-2 | MAJOR | Digoxin load numbers removed; prescriber/pharmacy only; K/Mg/renal/vial-strength warning |
| Others (N AF-4..6, I AF-4..6, P AF-1,4..6) | MINOR/SUGG | All diltiazem/metoprolol/amiodarone numeric doses removed (policy); no stacking; amiodarone chemical cardioversion/embolic risk; flutter 2:1; electrolyte replacement per protocol |

### unstable-tachy
| Finding | Severity | Fix |
|---|---|---|
| N UT-1 / I UT-1 | MAJOR | AF/flutter ≥200 J; other energies "per device/protocol"; wide-irregular split: pulse present → synchronized; pulseless/polymorphic → unsynchronized |
| N UT-2 | MAJOR | Re-arm SYNC before every shock (warning + action) |
| N UT-3 | MAJOR | Sedation tagged ORDER "provider-directed" |
| N UT-4 | MAJOR | Sustained polymorphic VT/torsades = defibrillate now; Mg after, per order |
| N UT-5 | MAJOR | No diltiazem/verapamil in wide/unsure |
| N UT-6 | MAJOR | Adenosine: avoid in asthma/bronchospasm, flush, interactions, reduced dose per pharmacy |
| Others (N UT-7/8, I UT-2..5, P UT-1/2) | MINOR/SUGG | HR <150 rarely cause; no carotid massage; not amiodarone + procainamide together; procainamide stop criteria; record strip; amiodarone/procainamide/Mg numbers removed (policy) |

### unstable-brady
| Finding | Severity | Fix |
|---|---|---|
| N BR-1 / I BR-1 / P UB-1 | MAJOR | Atropine 1 mg q3–5 min, max 3 mg, identical in glance/actions/meds/warnings; 0.5 mg line removed |
| N BR-2 | MAJOR | TCP tagged ORDER "per ACLS protocol if RN-competent, otherwise provider" |
| P UB-2 | MAJOR | Dopamine/epinephrine infusion numbers removed; units warning; LASA |
| Others (N BR-3/4, I BR-2..4, P UB-3) | MINOR/SUGG | Mechanical capture via femoral/art line; "HIE" spelled out; BRASH/digoxin; glucagon numbers removed (tox per Poison Control) |

### resp-failure-intubation
| Finding | Severity | Fix |
|---|---|---|
| N RF-1 / P RF-2 | CRITICAL / MAJOR | Full succinylcholine contraindication list (incl. ICU immobility, SCI/stroke >48–72 h, neuromyopathy, GBS, rhabdo, pseudocholinesterase) in warnings |
| N RF-2 / I RF-2 / P RF-2 | MAJOR | "Paralyzed ≠ sedated": sedation/analgesia step moved directly after tube confirmation (before CXR/OG); request orders before induction |
| N RF-3 | MAJOR | Vent settings tagged ORDER (provider/RT sets; RN verifies PBW/alarms) |
| I RF-1 | MAJOR | Obstructive-lung exception (RR 8–12, long expiration) + link to new asthma/COPD card |
| P RF-1 / RF-3 | MAJOR | RSI and push-dose pressor numeric doses removed; provider-dosed; pharmacy-prepared syringe |
| Others (N RF-4..7, I RF-3..8, P RF-4) | MINOR/SUGG | Flat ETCO₂ after 6 breaths = esophageal; HFNC vs NIV + contraindications; code status/DNI; GCS ≤8 caveat; apneic O₂; sedation numbers removed; unplanned extubation wording |

### vent-alarms
| Finding | Severity | Fix |
|---|---|---|
| (no CRITICAL/MAJOR) N VA-1..6, I VA-1..6, P VA-1 | MINOR/SUGG | emergency:true (G-5); DOPES unified; cuff manometer 20–30 (minimal-leak removed); catheter won't pass = blocked tube; naloxone restricted; PEEP valve/clamp; plateau measurement conditions; driving pressure; auto-PEEP in differential; acute peak + hypotension; trach → new airway card |

### ards
| Finding | Severity | Fix |
|---|---|---|
| N AR-1 / I AR-1 | MAJOR | NMB not routine; intensivist order; boluses preferred; short course; analgesia + deep sedation while paralyzed; "deep sedation initially" replaced by lightest effective sedation; "P/F <150" NMB trigger removed |
| I AR-2 | MAJOR | Recruitment removed from rescue; warning against sustained high-pressure inflation; lower- vs higher-PEEP table per protocol; PEEP numbers deferred to protocol |
| Others (N AR-2..5, I AR-3..7, P ARDS-1..3) | MINOR/SUGG | Vent steps tagged ORDER/RN-verify; pH thresholds; steroids "suggested", dose per order (DEXA shorthand removed); proning safety; ECMO criteria wording; Global definition note; inhaled vasodilator interruption warning |

### pe
| Finding | Severity | Fix |
|---|---|---|
| I PE-1 | MAJOR | Absolute/relative thrombolysis contraindication checklist (ESC 2019 list per intensivist, "verify against facility checklist"); arrest → relative, provider decides |
| P PE-1 | MAJOR | Heparin numbers removed; facility nomogram; HIGH-ALERT double check / vial strength |
| P PE-2 | MAJOR | Alteplase numbers removed; indication-specific dose warning |
| Others (N PE-1..5, I PE-2..6, P PE-3) | MINOR/SUGG | emergency:true; stop infusion per protocol; ventilated ETCO₂ clue; pre-lysis puncture limits; normotensive shock/PERT; LMWH renal; IVC filter wording; intubation hazards |

### sepsis
| Finding | Severity | Fix |
|---|---|---|
| N SP-1 / I SP-1 (qSOFA) / P SEP-6 | MAJOR | qSOFA removed as screen; NEWS2/MEWS/SIRS + judgment; warning; Quick Tools RR row fixed |
| N SP-2 | MAJOR | Allergy: call NOW, don't give listed drug until cleared |
| N SP-3 | MAJOR | All bundle steps tagged RN/ORDER/PROV |
| P SEP-1 | MAJOR | Vasopressin numbers removed; units/min vs units/h warning |
| P SEP-2 | MAJOR | Peripheral pressor policy + extravasation steps (warning) |
| Others (N SP-4..9, I SP-1..6, P SEP-3..5) | MINOR/SUGG | 30 mL/kg individualized (ideal/adjusted weight BMI >30; HF/ESRD); 3-h pathway for possible sepsis; source control ≤6 h; MAP 60–65 ≥65 y per order; full first antibiotic dose; prolonged β-lactam; hydrocortisone per order (inconsistency removed); bicarbonate pH ≤7.2 + AKI; saline/no albumin in TBI; emergency:true (septic shock, N G-5) |

### hemorrhagic-shock
| Finding | Severity | Fix |
|---|---|---|
| N HS-1 / I HS-3 / P HS-1 | MAJOR | Andexanet removed → 4F-PCC per protocol; US withdrawal warning |
| N HS-2 | MAJOR | BP target = provider order; permissive hypotension selected trauma only, per surgeon |
| N HS-3 / I HS-1 / P HS-2 | MAJOR | TXA restricted to trauma ≤3 h / PPH; not GI bleed; IV only; name spelled out; numbers removed (infusion) |
| Others (N HS-4..6, I HS-2,4..7, P HS-3/4) | MINOR/SUGG | MTP per policy, 2-person verification; post-cath/chest-tube bleeds; no tachycardia caveat; calcium salt non-equivalence; vitamin K slow/anaphylaxis; protamine caution; crystalloid only for non-hemorrhagic |

### ischemic-stroke
| Finding | Severity | Fix |
|---|---|---|
| N IS-1 | MAJOR | Sources → AHA/ASA 2026; disabling deficit regardless of NIHSS; extended window wording |
| N IS-2 | MAJOR | Angioedema → stop infusion, call airway/RRT (warning, action, meds) |
| I IS-1 | MAJOR | Lysis eligibility/contraindication screen (intensivist list, "verify vs AHA/ASA 2026 + facility checklist") + nurse data-gathering step |
| P IS-1 | MAJOR | Thrombolytic numbers removed; measured weight; pharmacy/double check; indication-specific dosing warning |
| Others (N IS-3..6, I IS-2..9, P IS-2..4) | MINOR/SUGG | emergency:true; glucose threshold labelled (stroke <60 per guideline, else facility protocol); LKW definition; BP ORDER + call after 2 checks; post-EVT BP; sICH reversal per protocol; door-to-CT ≤20–25; mimics; labetalol holds; clevidipine/niCARdipine; aspirin after swallow screen; nicardipine/labetalol numbers removed |

### ich-icp
| Finding | Severity | Fix |
|---|---|---|
| N IC-1 / I IC-2 / P ICH-3 | CRITICAL / MAJOR | Nimodipine ORAL/ENTERAL ONLY — NEVER IV in warnings, action, meds; enteral syringe/label; hold/split per prescriber |
| N IC-2 / I IC-3 / P ICH-2 | MAJOR | Andexanet removed → 4F-PCC; vitamin K slow IV/anaphylaxis; protamine slow |
| N IC-3 / P ICH-1 | MAJOR | Hyperosmolar therapy "per order", numbers removed; 23.4% NaCl HIGH-ALERT central-only/pharmacy/double check |
| I IC-1 | MAJOR | ICH vs SAH vs TBI BP/CPP targets separated (warning + action); TBI moved to new `severe-tbi` card |
| Others (N IC-4..7, I IC-4..10, P ICH-4) | MINOR/SUGG | emergency:true; platelets not for antiplatelet ICH (PATCH); Na ceiling harmonised "per order (commonly >155)"; isotonic only; no routine seizure prophylaxis in ICH; EVD clamp/re-level/never flush; collar per provider; cerebellar/hydrocephalus escalation; CSW; mannitol line/UOP |

### dka
| Finding | Severity | Fix |
|---|---|---|
| N DK-2 / P DKA-1 | CRITICAL | KCl "20–30 mEq/h" removed; K⁺ per order set with line/ECG/pump/double-check safeguards; never IV push |
| N DK-1 / I DK-1 | MAJOR | Hold insulin if K⁺ <3.5 (2024); upper threshold unified at 5.0 across card |
| P DKA-2 | MAJOR | Insulin numeric rates removed; order set, standard concentration, pump library, double check |
| I DK-7 | MAJOR | New `hhs` condition |
| Others (N DK-3..7, I DK-2..6, P DKA-3..5) | MINOR | Bicarbonate only pH <7.0; 2024 diagnostic + resolution criteria (BHB <0.6 AND pH ≥7.3 or HCO₃ ≥18; glucose criterion removed); fluids 500–1,000 mL/h first 2–4 h (consensus, per order, slower HF/CKD); dextrose <250 + rate reduction per protocol; phosphate units flagged; K⁺ check 2 h after insulin |

### hypoglycemia
| Finding | Severity | Fix |
|---|---|---|
| N HY-1 | MAJOR | "or has IV access" → "cannot safely take PO AND has IV/IO"; tagged ORDER (protocol) |
| Others (N HY-2..4, I HG-1..6, P HYPO-1..3) | MINOR/SUGG | emergency:true (N G-5); levels 1–3; D10 preferred/D50 large vein/concentration check; do not delay dextrose for thiamine; DKA insulin pause nuance; octreotide immediate-release, interval conflict removed (per order); D10 mL/h infusion rate removed (policy) |

### hyperkalemia
| Finding | Severity | Fix |
|---|---|---|
| N HK-1 | MAJOR | Calcium gluconate preferred peripherally, chloride central; flush/separate line from bicarbonate; equivalence |
| N HK-2 | MAJOR | SPS avoided with ileus/obstruction/post-GI surgery |
| P HK-1 | MAJOR | Insulin numeric dose removed → order set with dextrose; reduced dose/extra dextrose in renal failure; glucose before + hourly ≥4–6 h (warning) |
| Others (N HK-3..5, I HK-1..7, P HK-2..5) | MINOR/SUGG | emergency:true; omit dextrose if ≥250 per provider; RN holds K sources; digoxin; bicarbonate/albuterol/binder/furosemide numbers removed; arrest calcium only if hyperK suspected (AHA 2025); rapid-rise triggers |

### aki
| Finding | Severity | Fix |
|---|---|---|
| P AKI-2 | MAJOR | Warning: daily pharmacy re-dosing, eGFR unreliable, full first antibiotic dose, CRRT clearance |
| Others (N AK-1..4, I AK-1..6, P AKI-1) | MINOR/SUGG | Don't delay emergent contrast; vancomycin AUC; tags; rhabdo/abdominal compartment; full KDIGO staging incl. UOP; no early RRT without indication; diuretic wording |

### gi-bleed
| Finding | Severity | Fix |
|---|---|---|
| (no CRITICAL/MAJOR) N GB-1..4, I GI-1..7, P GI-1..4 | MINOR/SUGG | TXA "not recommended" kept and harmonised with hemorrhagic shock (HALT-IT warning); Blakemore PROV + intubate first + scissors + time limit; no routine FFP for INR in cirrhosis; HE sedative avoidance; transfusion thresholds aligned (7/8; variceal 7–8); PPI/octreotide infusion numbers removed (policy); vasopressin specialist-only; cefTRIAXone Tall Man/calcium flush; erythromycin QTc; unstable LGIB → CTA; early TIPS; aspirin/stent caution; andexanet note |

### tamponade
| Finding | Severity | Fix |
|---|---|---|
| I TM-1 | MAJOR | Warning + actions: pericardiocentesis usually NOT the treatment after cardiac surgery / aortic dissection / free-wall rupture → surgical; localized post-op tamponade |
| N TM-1 | MAJOR | Milk/strip removed → "clear tubes only per unit policy; call surgeon now" |
| Others (N TM-2..5, I TM-2..4, P TAMP-1) | MINOR/SUGG | emergency:true; emergency consent / don't wait for coags; procedures PROV; pulsus caveats; avoid PEEP; protamine slow; fluid bolus numbers → per order |

### alcohol-withdrawal
| Finding | Severity | Fix |
|---|---|---|
| N AW-1 | MAJOR | CIWA-Ar only if communicative; RASS/CAM-ICU otherwise (warning + action) |
| N AW-2 | MAJOR | Wernicke warning: high-dose IV thiamine per provider, before/with glucose |
| P AW-1 | MAJOR | Benzo doses removed → per order set; lorazepam in liver disease/elderly; cumulative dose tracking and hold criteria |
| P AW-2 | MAJOR | PHENobarbital numbers removed; high-alert, double check, Tall Man vs PENTobarbital |
| Others (N AW-3..6, I AW-1..6, P AW-3,4) | MINOR/SUGG | seizure 6–48 h; restraints per policy; front-loading as request; ammonia removed; haloperidol QTc/K/Mg; refeeding; no phenytoin. Numeric "resistant" thresholds (ASAM >50 mg diazepam-eq/1 h) deferred to protocol — reviewers asked to confirm |

### overdose
| Finding | Severity | Fix |
|---|---|---|
| N OD-1 | MAJOR | Naloxone ORDER/standing protocol; BVM first; titrate to breathing; re-sedation ≥2 h monitoring |
| Others (N OD-2..4, I OD-1..8, P OD-1..6) | MINOR/SUGG | Charcoal window harmonised (provider/poison center order only; exclusions); NAC timing + anaphylactoid; salicylate warning; TCA bicarb vs salicylate separated (numbers removed → per toxicology); HIE toxicology-only warning; organophosphate atropine no 3 mg cap; naloxone dilution; QTc >500; toxic alcohols/fomepizole. Numeric toxicology doses (glucagon, HIE, CaCl) not added — per toxicology/policy |

## 5. Emergency flags (G-5)

**`emergency:true` (21):**
- cardiac-arrest, post-cardiac-surgery, anaphylaxis, airway-emergency
- tension-pneumothorax, vent-alarms, status-epilepticus
- unstable-tachy, unstable-brady, hyperkalemia
- ich-icp, severe-tbi, ischemic-stroke
- hemorrhagic-shock, tamponade, pe, aortic-dissection
- resp-failure-intubation, asthma-copd, sepsis, hypoglycemia

**`false` (17):**
- acs-mi, cardiogenic-shock, afib-rvr, pulm-edema-adhf, hypertensive-emergency
- ards, spinal-cord-injury, dka, hhs, sodium-emergencies
- aki, gi-bleed, transfusion-reaction, acute-liver-failure
- alcohol-withdrawal, delirium-agitation, overdose

The nurse reviewer (G-5) and the required list were followed. Sepsis (septic shock) and hypoglycemia were added per nurse §8. acs-mi was kept false because STEMI is reached by keyword search and its time-critical path is the cath lab; the clinical reviewers can change this flag.

## 6. New conditions (13)

All new conditions follow the same schema and dose policy. Each has 3 glance lines, 4 recognize items, 9–12 actions, 5 monitor items, meds, escalate, keywords and warnings.

| id | Key content (sources: reviewer §8/§9 notes; guideline named in text) |
|---|---|
| hhs | ADA/EASD 2024 criteria; fluids first; hold insulin if K <3.5; no insulin/K rates; slow osmolality/Na change; VTE prophylaxis; mixed DKA/HHS |
| asthma-copd | Auto-PEEP: disconnect and decompress, low RR/long expiration, permissive hypercapnia; COPD SpO₂ 88–92%; NIV for hypercapnic COPD; Mg (asthma); epinephrine concentration note; avoid paralysis if possible (emergency:true) |
| pulm-edema-adhf | Sit up, CPAP/BiPAP; SL nitroglycerin 0.4 mg then IV nitrate per order; nitrate contraindications (PDE-5i, RV infarct, AS); IV loop diuretic per order; shock → cardiogenic-shock card |
| hypertensive-emergency | Organ damage defines it; ≤25% reduction in the first hour unless condition-specific (dissection, stroke, ICH, eclampsia); titratable agents per order with no rates; urgency ≠ emergency |
| aortic-dissection | No anticoagulants/antiplatelets/lytics; β-blocker BEFORE vasodilator; targets per order; pericardiocentesis hazard in type A; malperfusion checks (emergency:true) |
| sodium-emergencies | 3% saline HIGH-ALERT per order/protocol only; ≤8–10 mmol/L per 24 h; watch for water diuresis (overcorrection); rescue per provider; hypernatremia free water per order |
| transfusion-reaction | STOP; new tubing + NS; bedside ID recheck; blood bank; return bag/tubing; labs; hemolytic, TACO, TRALI, septic, allergic, anaphylaxis |
| post-cardiac-surgery | CALS: 3 sequential shocks before CPR, pace at maximum output via wires, epinephrine only on senior direction, resternotomy within ~5 min; bleeding/tamponade/low output; pacing-wire care (emergency:true). **Reviewers to confirm STS CALS edition and local protocol** |
| airway-emergency | Trach vs laryngectomy; fresh vs mature tract; inner cannula → suction → cuff deflate → remove/oxygenate; ETT displacement; unplanned extubation; CICO → front-of-neck access (PROV) (emergency:true) |
| severe-tbi | BTF 4th ed: SBP ≥100/≥110 by age, ICP >22, CPP 60–70 (all "per order"); no steroids; no prophylactic hyperventilation; isotonic fluids, no albumin; hyperosmolar therapy per order (emergency:true) |
| spinal-cord-injury | Neurogenic shock (exclude hemorrhage); MAP goal per order; avoid succinylcholine after ~48–72 h; autonomic dysreflexia algorithm; VC/NIF; steroids not routine |
| acute-liver-failure | Early transplant-center referral; glucose q1–2h; NAC per protocol; HE grades/airway; ICP precautions; lactulose; no INR correction just to treat the number |
| delirium-agitation | PADIS 2018: rule out causes; RASS/CAM-ICU; analgesia first; light sedation; non-drug bundle; antipsychotics not routine (QTc); restraints per policy; CIWA only for communicative patients |

## 7. Deferred / not done (with reasons)

- **App behavior** is out of scope for the content worker. This covers:
  - tick and timer persistence (G-1/X-2/C-1..3)
  - search ranking (U M-1; data now provides keyword arrays)
  - the expiry banner (data provides `meta.expires`)
  - the scope legend (data provides `meta.scopeTags`)
  - the CALL rendering of "!" items
  - contrast and screen-reader issues
- **Facility-configurable reference-dose layer** (pharmacist policy) needs app support plus facility pharmacy sign-off. No infusion numbers were added in its place.
- **Numbers reviewers suggested but marked "[from knowledge – verify]"** were not added because they are high-alert or infusion doses, or the reviewers had not verified them:
  - 4F-PCC units/kg
  - PCC fixed dose
  - HIE insulin, glucagon infusion
  - Wernicke thiamine regimen
  - ASAM "resistant withdrawal" diazepam-equivalent thresholds
  - salicylate EXTRIP criteria
  - phenobarbital loading
  - the vasopressin threshold
  These are written as "per order / toxicology / pharmacy protocol".
- **TBI-specific targets** live on the new `severe-tbi` card using BTF 4th ed numbers, with "per order". ICH and SAH targets stay on `ich-icp`, deferring to the order where the reviewers disagreed.
- **STS CALS edition** is marked "reviewer to confirm". The CALS steps follow the reviewers' description (nurse CA-7, intensivist CA-5) and must be checked against local CT-ICU protocol.
- **Tier-2 conditions** the reviewers listed were not added because they were outside the requested 13:
  - MH/NMS/serotonin syndrome
  - adrenal crisis/thyroid storm
  - GBS/myasthenia
  - line/device emergencies
  - hemoptysis
  - obstetric emergencies
  - pancreatitis, DIC/HIT
  - burns
  - end-of-life care
- **acs-mi `emergency` flag** was left false (see §5) and needs a clinical decision.
- **Cross-file validator warning**: `404.html` is not in the sw.js ASSETS list. That file is owned by the app developer.

## 8. Validation

- `node --check /workspace/icu-quickref/data.js` passes.
- `node /workspace/reviews/validate-data-v2.js /workspace/icu-quickref` gives **0 errors, 7 warnings**. There are 38 conditions (21 emergency) and 601 action/monitor items.

**What the validator checks:**
- unique condition ids and item ids
- id pattern `<cid>-a<n>` / `<cid>-m<n>`
- non-empty `t`; `s` ∈ {RN, ORDER, PROV}
- PROV text starts "Anticipate/assist"
- required sections present
- keywords is an array with at least 3 entries
- `emergency` is a boolean; `warnings` is an array
- `meta` fields present and not expired
- every emergency card has a "!" step
- every meds[] has a VERIFY line
- no `_unrevised` flags
- no duplicate lab rows
- the GCS structure
- COPD target is 88–92% everywhere
- atropine maximum is 3 mg everywhere
- the sw.js CACHE_VERSION contains the version (it currently does: `icuqr-v2.0.0-r1`)

**Banned patterns:**
- `andexanet` anywhere except `sources[]`, where it appears only as the citation of the FDA withdrawal notice
- numeric infusion-rate units (mcg/min, mcg/kg/min, units/h, units/min, mEq/h, mmol/h, mL/h, mg/h…) in actions or meds
- a number next to a high-alert drug name in actions or meds

**Remaining warnings, justified:**
- `reviewedBy` is empty. Expected: this is a draft.
- tension-pneumothorax escalate "200 mL/h" and hemorrhagic-shock escalate "≥200 mL/h". These are chest-tube **output thresholds** that trigger a call, not doses.
- unstable-tachy meds[1] is 275 characters (adenosine line with its safety caveats).
- dka meds[2] ("K⁺ ≥3.5") and sodium-emergencies meds[2] ("D5W") are false "number without unit" warnings.
- 404.html is not in the sw.js ASSETS list (app developer).

Urine-output thresholds written as "mL/kg/h" are monitoring criteria and are explicitly allowed.
