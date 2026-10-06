# Peer review 02 — Intensivist (critical care / pulmonary; medical, cardiac & neuro ICU)

**Subject:** `/workspace/icu-quickref/` — ICU nurse quick-reference PWA (`data.js` content v1.0.0-draft, 2026-10-04; `app.js` reviewed for safety-relevant rendering behaviour only)
**Reviewer role:** Board-certified intensivist / academic MICU director
**Review date:** Sunday 2026-10-04 (America/Chicago)
**Files modified in the app:** none (read-only review)
**Scope:** all 25 conditions + all Quick Tools (vitals, labs, GCS, RASS, ABCDE, SBAR, RRT triggers, H's & T's, handoff, PBW).

---

## 0. How to read this review

* **Severity:** CRITICAL = could plausibly cause serious harm/death if followed literally; MAJOR = clinically significant error, outdated practice, or high-risk omission; MINOR = imprecision/inconsistency/contested practice; SUGGESTION = improvement.
* **Evidence provenance.** Where I confirmed a recent guideline change online on 2026-10-04 I mark **[checked]** (in several cases this was a primary-society page or a secondary summary, not every line of the full text). Where I rely on my own knowledge of an older guideline and did not re-fetch it, I mark **[from knowledge – verify]**. Where I am unsure I say so. Guidelines are cited by name/edition only; no page numbers, DOIs or recommendation numbers are given.
* **Numeric audit.** Every numeric value in `data.js` was read. Values I found correct are inventoried in §10 so the authors know what *not* to change.
* Quotes are verbatim from `data.js` (ASCII-normalised).

### Guideline editions compared (and what is current as of 2026-10-04)

| Domain | Edition the app cites | Current edition I compared to | Status |
|---|---|---|---|
| Resuscitation / ACLS | "AHA ACLS Guidelines & 2023 focused update" | **2025 AHA Guidelines for CPR & ECC (Oct 2025): Part 9 Adult ALS, Part 11 Post-Cardiac Arrest Care** | [checked] — app is one edition behind |
| Sepsis | SSC 2021 | **SSC International Guidelines 2026 (published 2026-03-23; 129 statements)** | [checked] — one edition behind |
| ARDS | ATS/ESICM/SCCM 2017; ARDSNet; PROSEVA | **ATS 2024 update (Qadir et al.)**; ESICM 2023; SSC 2026 respiratory statements | [checked] |
| Ischemic stroke | AHA/ASA 2019 + updates | **2026 AHA/ASA Early Management of AIS (Jan 2026)** | [checked] |
| ICH / SAH | AHA/ASA ICH 2022 | AHA/ASA ICH 2022; aSAH 2023; BTF TBI 4th ed. | [from knowledge – verify] |
| PE | ESC 2019 / AHA statement | **2026 AHA/ACC multisociety Acute PE Guideline (categories A–E)**; ESC 2019 (I did not check for an ESC successor) | [checked, summary level] |
| ACS | ACC/AHA Chest Pain 2021; STEMI/NSTE-ACS | **2025 ACC/AHA/ACEP/NAEMSP/SCAI ACS Guideline** | [checked, summary level] |
| DKA/HHS | ADA/EASD/JBDS/AACE/DTS 2024 consensus | Same (correctly cited) — but several card numbers still follow ADA 2009 | [checked, summary level] |
| AKI | KDIGO AKI (2012) | KDIGO 2012 (no replacement known to me; unverified) | [from knowledge – verify] |
| Trauma / hemorrhage | ATLS 10th ed. | ATLS 11th ed. was, to my knowledge, released in 2025 — **its changes were not reviewed**; PROPPR, CRASH-2, WOMAN, HALT-IT | uncertain |
| AF | (implicit ACLS) | 2023 ACC/AHA/ACCP/HRS AF guideline + 2025 AHA ALS Part 9 | [checked, ALS part] |
| Status epilepticus | NCS 2012 / AES 2016 | AES 2016 dose table; ENLS | [from knowledge – verify] |
| Alcohol withdrawal | ASAM 2020 | ASAM 2020 | [from knowledge] |
| Anaphylaxis | WAO / AAAAI-ACAAI | WAO 2020, AAAAI/ACAAI 2020, EAACI 2021 | [from knowledge – verify] |

---

## 1. Executive summary

**Overall impression.** A well-structured, nurse-friendly document. The great majority of doses and thresholds I checked are correct and consistent with the guideline families named in `sources`. The CALL/escalate framing, repeated "verify per facility protocol", and several explicit pitfalls (adenosine never for irregular rhythms; check K before insulin; salicylate intubation hazard; TXA not routine in GI bleed) show clinical maturity.

**It is not ready to be labelled "clinically reviewed" and released to bedside nurses as-is.** Problems cluster in five areas:

1. **Out-of-date editions.** AHA ALS 2025, SSC 2026, AHA/ASA AIS 2026 and AHA/ACC PE 2026 post-date the app's `sources`. Specific recommendations changed (cardioversion energy, calcium/bicarbonate in arrest, TTM duration, albumin, source-control timing, BP after thrombectomy, PE categories, ARDS NMB/PEEP/recruitment). **Andexanet alfa was withdrawn from the US market in Dec 2025** [checked] yet is listed as a reversal agent in two cards.
2. **A small number of hazardous statements/omissions** (§2): IV amiodarone is not on the "do not give" list for pre-excited AF (AHA 2025 Class 3: Harm); no thrombolysis contraindication screen for stroke/PE; default ventilator RR 14–20 with no obstructive-lung exception; no emphasis on starting sedation immediately after paralysis; DKA potassium rules follow ADA 2009; no "nimodipine is oral only" warning; no epinephrine-concentration warning; no caution about pericardiocentesis in aortic-dissection hemopericardium.
3. **Contested practices presented as settled** (NMB "P/F <150", "recruitment/higher PEEP" as rescue, 20-minute second-line timing in status epilepticus, bicarbonate thresholds, albumin).
4. **Internal inconsistencies** (SpO₂ targets, atropine dose, norepinephrine ranges, charcoal window, Hgb thresholds, glucose thresholds).
5. **Missing high-yield ICU conditions** (HHS, severe asthma/COPD ventilation, ADHF/pulmonary edema, aortic dissection/hypertensive emergency, Na disorders, transfusion reactions, hyperthermia syndromes/toxic alcohols, post-cardiac-surgery arrest, acute liver failure, adrenal crisis, GBS/myasthenic crisis…) — §9.

**Finding counts:** **1 CRITICAL, 22 MAJOR, 112 MINOR, 43 SUGGESTION** (178 individually numbered findings across the Quick Tools, cross-cutting items and all 25 conditions; the andexanet withdrawal is counted twice, HS-3 and IC-3, because it appears on two cards).

**Verdict:** *Conditionally acceptable as a reference aid after the Top-10 fixes (§12) are made and the content is re-dated to current editions. Not acceptable to mark "reviewed" in its present form.*

---

## 2. Findings that could cause patient harm if followed literally (read first)

| ID | Card | Issue (one line) | Sev |
|---|---|---|---|
| AF-1 | AF with RVR | Pre-excited-AF "do not give" list omits **IV amiodarone** (AHA 2025 Class 3: Harm) while amiodarone is offered two bullets earlier as the go-to | **CRITICAL** |
| IS-1 / PE-1 | Stroke, PE | No thrombolysis eligibility/contraindication screen, yet lysis doses and BP thresholds are given | MAJOR |
| RF-1 | Intubation & vent | Default "RR 14–20" with no asthma/COPD exception → breath stacking, auto-PEEP, arrest | MAJOR |
| RF-2 | Intubation | Sedation is step 10 of 12; no warning that rocuronium paralysis outlasts induction agents (awareness under paralysis) | MAJOR |
| QT-1 | Quick Tools: Vitals | "92–96% typical COPD" — hypercapnic COPD target is 88–92% | MAJOR |
| DK-1 | DKA | K 3.3 threshold and "20–30 mEq/h KCl" follow ADA 2009; 2024 consensus: hold insulin if K <3.5, replace ≈10 mmol/h | MAJOR |
| IC-2 | ICH/ICP (SAH) | Nimodipine: no "ORAL/ENTERAL ONLY — NEVER IV" warning | MAJOR |
| AN-1 | Anaphylaxis | No warning on epinephrine concentrations (1 mg/mL IM vs 0.1 mg/mL IV) | MAJOR |
| TM-1 | Tamponade | Aortic dissection listed as a cause; no warning that routine pericardiocentesis can be fatal | MAJOR |
| HS-1 | Hemorrhagic shock | TXA "within 3 h of injury / major bleed": harmful >3 h post-injury and in GI bleed (HALT-IT) | MAJOR |
| IC-3 / HS-3 | ICH, Hemorrhagic | Andexanet listed; withdrawn from US market Dec 2025 [checked] | MAJOR |
| SE-1 | Status epilepticus | Second-line "at ~20 min" invites waiting instead of treating as soon as first-line fails | MAJOR |
| UT-1 | Unstable tachycardia | "Wide irregular / polymorphic VT: defibrillate (unsynchronized)" can lead to an unsynchronized shock on a perfusing pre-excited-AF patient | MAJOR |
| ACS-4 | ACS | Fibrinolytic offered with no contraindication list | MAJOR |
| CA-5 | Cardiac arrest | No post-cardiac-surgery (CALS) arrest guidance; routine epinephrine/single-shock sequence may be wrong | MAJOR |
| X-2 | App (app.js) | Tick-state and code timer persist in localStorage across patients | MAJOR |

---

## 3. Cross-cutting findings

### X-1 — `sources` list is one edition behind in multiple domains (MAJOR)
**Text:** "AHA Advanced Cardiovascular Life Support (ACLS) Guidelines & 2023 focused update…"; "Surviving Sepsis Campaign International Guidelines 2021 (and Hour-1 bundle)"; "AHA/ASA Guidelines for Early Management of Acute Ischemic Stroke (2019 + updates)"; "ESC 2019 Acute Pulmonary Embolism Guidelines / AHA PE statement"; "ATS/ESICM/SCCM ARDS guideline 2017".
**Issue:** Current editions are AHA 2025 CPR/ECC, SSC 2026, AHA/ASA AIS 2026, AHA/ACC PE 2026, ACC/AHA ACS 2025, ATS ARDS 2024 update [checked]. Content consequences are itemised per card. The SSC retains the "antibiotics within 1 h for septic shock/probable sepsis" target [checked], but the "Hour-1 bundle" branding is 2018-era.
**Fix:** Replace the `sources` array with the editions in the §0 table and re-date; add a `lastGuidelineReview` field and an annual review reminder.

### X-2 — Persistent tick-state and code timer across patients (app.js) (MAJOR)
**Observed:** checklist ticks are stored per *condition* in `localStorage` (`chk.<id>`), not per patient, with no expiry; the code timer is persisted and resumes after reload (`if (timer.run) {…}`), so "Epinephrine ×N · last mm:ss ago — DUE" could display for a stale arrest.
**Why it matters:** A nurse opening *Anaphylaxis* or *Cardiac arrest* for patient B can see steps pre-ticked from patient A and believe they are done; a stale epinephrine counter can mislead during the next code.
**Fix:** (a) auto-clear ticks after ~4–6 h or whenever an Emergency card is freshly opened (with undo); (b) on "Start code" ask "New patient?" and discard timers older than ~6 h on load; (c) show a persistent "Ticks are NOT patient-specific" banner when any tick exists.

### X-3 — High-alert medication safety layer is missing (MINOR)
No card carries ISMP-style high-alert warnings. Add a one-line banner under Meds for: IV vs IM epinephrine concentrations, 23.4% NaCl (central only, double-check), KCl (max rate/route), insulin infusions (units/mL), heparin (units/kg + nomogram), nimodipine (oral only), calcium chloride (vesicant), milrinone (renal), phenytoin/fosphenytoin (PE vs mg).

### X-4 — Adult-only scope not stated; some pediatric dosing leaks in (MINOR)
Status epilepticus lists "IM midazolam … 5 mg (13–40 kg)". Remove or label, and add a visible scope line: "Adult patients only. Pregnancy and pediatrics not covered."

### X-5 — Internal inconsistencies to harmonise (MINOR)
| Topic | Where | Inconsistent values |
|---|---|---|
| SpO₂ target | Quick Tools; Resp failure; ARDS; Arrest; ICH | ≥94%; 92–96%; 88–95%; 92–98%; ≥94% — publish one context table (default 92–96 or SSC-panel 90–96; hypercapnic COPD 88–92; ARDS 88–95; post-arrest 90–98 [checked]; stroke O₂ only if <94) |
| Atropine | Brady glance/meds vs actions | "1 mg" vs "0.5–1 mg IV rapid push (ACLS: 1 mg)" |
| Norepinephrine range | Cardiogenic shock vs Sepsis | "0.01–3 mcg/kg/min" vs "0.05–0.5+ mcg/kg/min" |
| Charcoal window | Overdose glance vs actions | "~1 h" vs "within 1–2 h" |
| Hgb threshold | GI bleed | "target 7–9; threshold ~8 if CAD" vs variceal "Hgb ~7" (Baveno VII: threshold 7, target 7–8) |
| Hypoglycemia threshold | Stroke "<60"; Hypoglycemia "<70"; Seizure "<70" | harmonise or explain context |
| Hyperosmolar Na | ICH: "Maintain Na 140–155" vs "stop if >155–160" | pick one |
| Potassium cut-off | DKA "5.0 (5.2)" | pick one |
| qSOFA RR | Vitals ">22" vs Sepsis "RR ≥22" | use ≥22 |

### X-6 — Weight basis, renal/hepatic dosing, pregnancy (SUGGESTION)
SSC 2026 specifies adjusted/ideal weight for 30 mL/kg when BMI >30 [checked]. Add a one-line "weight basis" rule per weight-based drug (actual vs ideal vs adjusted) and renal caveats for milrinone, enoxaparin, digoxin, midazolam infusions.

---

## 4. Quick Tools

### QT-1 — SpO₂ in COPD (MAJOR)
**Text:** `["SpO₂", "≥94% (92–96% typical COPD; 88–95% ARDS)"]`
**Issue:** Target for patients at risk of hypercapnic failure is **88–92%** (BTS/GOLD-type guidance). "92–96% typical COPD" will lead nurses to titrate O₂ up in CO₂ retainers; it also contradicts other cards.
**Corrected:** `"≥94% general acute illness (92–96% acceptable; SSC 2026 panel practice 90–96%). Hypercapnic COPD/at-risk: 88–92%. ARDS: 88–95% (PaO₂ 55–80)."`

### QT-2 — RR threshold and qSOFA (MINOR)
**Text:** `"12–20 /min (>22 = concern; qSOFA)"`
**Issue:** qSOFA criterion is RR **≥22**. SSC 2026 gives a *strong* recommendation against using qSOFA as a single sepsis screening tool (use NEWS/NEWS2/MEWS/SIRS) [checked].
**Corrected:** `"12–20 /min (≥22 abnormal — part of qSOFA/NEWS; do not rely on qSOFA alone to screen for sepsis)"`.

### QT-3 — Temperature "normal" range (MINOR)
**Text:** `"36.0–38.0 °C (96.8–100.4 °F)"`
**Issue:** Conversion is correct, but 38.0 °C is conventionally *fever* (SIRS ≥38.0; SCCM/IDSA critically-ill fever ≥38.3 °C).
**Corrected:** `"36.0–37.5 °C (96.8–99.5 °F); fever ≥38.3 °C (101 °F) in ICU patients (many protocols alert at ≥38.0); <36.0 °C hypothermia"`.

### QT-4 — BP row (SUGGESTION)
Acceptable; add "or SBP >40 mmHg below the patient's baseline (relative hypotension)", which SSC 2026 recognises as sepsis-induced hypoperfusion [checked].

### QT-5 — Lab table (MINOR)
* **Anion gap** `"Na − (Cl + HCO₃): ~8–12"` — add albumin correction (AG + 2.5 × [4 − albumin g/dL]); hypoalbuminemia hides a gap in ICU patients.
* **Troponin** — assay-specific; add "hs-cTn: use 0/1 h or 0/2 h pathway per lab".
* **Lactate** `"<2 mmol/L (≥4 severe)"` — fine; add ">2 abnormal; 2–4 may merit fluids if hypoperfused (SSC 2026) [checked]".
* **P/F** `"≤300 impaired; ≤100 severe"` — Berlin: ≤300 mild, ≤200 moderate, ≤100 severe with PEEP ≥5; the 2023 Global ARDS definition (HFNC ≥30 L/min, SpO₂/FiO₂ ≤315, no PEEP requirement) is not mentioned [from knowledge – verify].
* **Glucose** `"ICU goal ~140–180"` — consistent with SSC 2026 (start insulin at ≥180) [checked].
* Remaining electrolyte/heme/ABG reference ranges are reasonable "approximate" ranges.

### QT-6 — GCS (MINOR)
**Text:** `[3, "Flexion (decorticate)"], [2, "Extension (decerebrate)"]`; eye `[2, "To pain"]`; note `"≤8 = severe; consider airway protection"`.
**Issues:** (a) modern wording is "abnormal flexion / extension" and "to pressure" (decorticate/decerebrate are posture terms discouraged in the revised GCS); (b) "GCS ≤8 = intubate" is dogma, not an absolute — airway protection depends on gag/cough/secretions/trajectory; (c) GCS-Pupils increasingly used. (The calculator's 3–15 arithmetic and severe ≤8 / moderate 9–12 / mild 13–15 labels are right.)
**Corrected note:** `"≤8 = severe: reassess airway protection now (gag/cough, secretions, trajectory) — not an automatic intubation order. Intubated: Verbal = 'T' (record e.g. E3 VT M5 = 8T)."`
Also in `app.js`: there is no way to select "T" in the calculator (see §6).

### QT-7 — RASS note (MINOR)
**Text:** `"Typical ICU goal: RASS 0 to −2 (light sedation) unless ordered otherwise."`
**Issue:** RASS 0 is "alert and calm", not sedation. PADIS 2018 recommends light sedation. Deeper targets are intentionally ordered for raised ICP, refractory status epilepticus infusions, severe ARDS dyssynchrony/proning, paralysis, ECMO, targeted temperature control.
**Corrected:** `"Typical goal: RASS −2 to 0 unless a deeper target is ordered (e.g., raised ICP, refractory seizures, severe dyssynchrony/proning, paralysis). Pair with CAM-ICU."` The RASS descriptors themselves (+4…−5, 10-second rule) match the published scale — verified.

### QT-8 — Rapid-response triggers (SUGGESTION)
`HR <40 or >130 · SBP <90 · RR <8 or >28 · SpO₂ <90%` are conventional MET criteria. Add "new GCS drop ≥2" and "lactate ≥4".

### QT-9 — PBW: formulas verified; add metric formula (MINOR)
Male 50 + 2.3 × (in − 60); female 45.5 + 2.3 × (in − 60) — **correct** (ARDSNet). "Tidal volume 6 mL/kg PBW (range 4–8)" is correct for ARDS; for ventilated non-ARDS sepsis patients SSC 2026 suggests 6–8 mL/kg IBW [checked]. Add the metric formula (male 50 + 0.91 × [cm − 152.4]; female 45.5 + 0.91 × [cm − 152.4]) and a height→PBW→6/8 mL/kg lookup table (inches vs cm mix-ups are a realistic error); add "measure supine, never estimate height".

### QT-10 — H's & T's (SUGGESTION)
Matches the AHA list. Suggest inline "what to do" for each.

### QT-11 — Missing Quick Tools (SUGGESTION)
CPOT/BPS pain scales, CAM-ICU steps, CIWA-Ar, NIHSS, vasopressor weight-based drip calculator/standard concentrations, corrected Na/Ca, SOFA table, Sgarbossa, vent quick-reference by diagnosis (ARDS vs obstructive vs neuro).

---

## 5. Condition-by-condition findings

Format per finding: **ID — title (SEVERITY)**, then *Quoted text*, *Issue*, *Corrected wording*. Items I checked and found correct are summarised under "Verified" for each card (full inventory in §10).

### 5.1 Cardiac arrest (ACLS overview)
Compared to: AHA 2025 CPR/ECC Part 9 (ALS) and Part 11 (post-arrest) [checked]; AHA 2020 where noted.

#### CA-1 — Routine calcium/bicarbonate wording in the reversible-cause bullet (MINOR)
*Quoted:* `"Reversible-cause therapy: calcium/bicarb/insulin-dextrose (hyperK), fluids/blood, needle decompression, thrombolytic (PE), naloxone (opioid), etc."` and, in Hyperkalemia, `"Cardiac arrest: calcium + bicarbonate + insulin/dextrose per ACLS (H's & T's)"`.
*Issue:* AHA 2025 gives routine calcium, bicarbonate and magnesium in arrest a Class 3 (No Benefit) recommendation [checked]; they remain reasonable for *specific* suspected causes (known/suspected hyperkalemia, calcium-channel-blocker/Na-channel toxicity, dialysis patient). A nurse could read this as "give these in every arrest".
*Corrected:* `"Do NOT give calcium/bicarbonate/magnesium routinely. Only for a specific cause: suspected hyperkalemia or Ca-channel/Na-channel blocker toxicity (calcium; bicarbonate), torsades with long QT (magnesium)."`

#### CA-2 — Post-ROSC temperature management duration (MINOR)
*Quoted:* `"targeted temperature management 32–37.5 °C ≥24 h; prevent fever"`.
*Issue:* AHA 2025 Part 11: temperature control 32–37.5 °C for ≥**36** h (2020 said ≥24 h) [checked]. The specific target temperature within the range is a provider decision; and "prevent fever" should extend for ≥72 h in practice.
*Corrected:* `"Comatose after ROSC: temperature control, constant target between 32–37.5 °C, maintained ≥36 h (per provider); actively prevent fever for ≥72 h."`

#### CA-3 — Oxygen / BP / glucose post-ROSC targets (MINOR)
*Quoted:* `"Target SBP ≥90 and MAP ≥65; SpO₂ 92–98%"`; `"Glucose (avoid hypo/hyperglycemia)"`.
*Issue:* AHA 2025: MAP ≥65 is the stated target; SpO₂ 90–98% after an initial 100% O₂ until a reliable reading; PaO₂ roughly 60–105; avoid glucose <70 and >180 mg/dL; **no** routine prophylactic antibiotics [checked]. SBP ≥90 is not wrong but adds nothing.
*Corrected:* `"MAP ≥65; SpO₂ 90–98% (wean FiO₂ once a reliable reading; avoid hyperoxia); PaCO₂ 35–45; glucose 70–180 mg/dL."`

#### CA-4 — ETCO₂ wording (MINOR)
*Quoted:* `"Check ETCO₂ (goal ideally >10–20 mmHg; sudden rise ≥40 may signal ROSC)"`; `"ROSC (pulse + BP + ETCO₂ rise)"`.
*Issue:* AHA 2025: ETCO₂ ≥10 (ideally ≥20) as a CPR-quality indicator; an abrupt rise (>10 mmHg) may indicate ROSC; no absolute ETCO₂ cutoff should be used alone for termination [checked]. "Rise ≥40" is the older (2015/2020) sustained-value phrasing. Also, for a patient with an arterial line: a pulsatile waveform with a pressure is ROSC — diastolic pressure is a CPR-quality target.
*Corrected:* `"ETCO₂ goal ≥10, ideally ≥20 mmHg. A sudden sustained jump (>10 mmHg, often to normal range) or pulsatile arterial waveform → check pulse for ROSC. Never use ETCO₂ alone to stop CPR."`

#### CA-5 — No post-cardiac-surgery (CALS) arrest guidance in this card (MAJOR)
*Quoted (in Tamponade card only):* `"Cardiac arrest/PEA post-cardiac surgery → follow CALS (emergency resternotomy) per facility"`; the Cardiac arrest card says `"SHOCKABLE (VF / pulseless VT): shock once … Epinephrine 1 mg IV/IO every 3–5 min"` with no cardiac-surgery exception.
*Issue:* In the first ~10 days after sternotomy the standard sequence differs (CALS/STS/EACTS; AHA 2025 notes single vs stacked shocks are unknown in monitored post-cardiac-surgery arrest [checked]): up to 3 stacked shocks for VF/pVT, pacing for asystole/brady PEA if wires, **avoid routine epinephrine** (can cause severe hypertension on ROSC; at most 1 mg after provider decision), emergency resternotomy within 5 min, external compressions may damage grafts but are not withheld. A cardiac-surgery ICU nurse is the exact audience that needs this.
*Corrected:* add to the Arrest card escalate section: `"!Within ~10 days of cardiac surgery? Use CALS: for VF/pVT give up to 3 stacked shocks BEFORE compressions; for asystole/brady with epicardial wires pace (VVI 90, max output); epinephrine only on surgeon/provider order (not 1 mg routinely); prepare for emergency resternotomy by 5 min."* [from knowledge – verify against local CALS/STS protocol].

#### CA-6 — Ventilation instructions in an already-ventilated patient (MINOR)
*Quoted:* `"Ventilate: 30:2 with BVM and 100% O₂ (or 1 breath every 6 s once advanced airway, continuous compressions)"`.
*Issue:* In the ICU most arrests occur in intubated patients; add "if already intubated: disconnect vent, bag with PEEP valve at 1 breath/6 s (10/min), avoid hyperventilation; check ETT/DOPE first (see Vent alarms)". 1 breath per 6 s is a 2b recommendation in 2025 [checked].

#### CA-7 — Shock energy and DSD (SUGGESTION)
*Quoted:* `"shock once at device-recommended energy (biphasic 120–200 J)"`. Reasonable. AHA 2025 states escalating energy is reasonable if the first shock fails and that double sequential defibrillation/vector change is not established [checked]; consider adding "Do not perform DSD/vector change unless in protocol/research".

#### CA-8 — Epinephrine in shockable rhythm and timing of amiodarone (SUGGESTION)
*Quoted:* `"Epinephrine 1 mg IV/IO every 3–5 min. (Shockable: after 2nd shock.)"`, `"Refractory VF/pVT (after 3rd shock): amiodarone 300 mg IV/IO, then 150 mg once (or lidocaine 1–1.5 mg/kg, then 0.5–0.75 mg/kg)"`.
These match the traditional sequence and AHA 2025 permits it (epinephrine after initial defibrillation attempts fail; amiodarone/lidocaine now 2b) [checked]. Suggest explicitly "Amiodarone and lidocaine: pick one — not both" and note the app's timer does not prompt for the 3rd-shock antiarrhythmic.

**Verified correct:** compression rate 100–120, depth 5–6 cm, switch q2 min; pulse check ≤10 s; epinephrine 1 mg q3–5 min; amiodarone 300/150; lidocaine 1–1.5 then 0.5–0.75 mg/kg; magnesium only for torsades; waveform capnography for tube confirmation; neuroprognostication ≥72 h; H's & T's list.

### 5.2 Anaphylaxis
Compared to: WAO 2020, AAAAI/ACAAI 2020, EAACI 2021 [from knowledge – verify]; ICU practice.

#### AN-1 — No concentration warning for epinephrine (MAJOR)
*Quoted:* `"EPINEPHRINE IM 0.3–0.5 mg (0.01 mg/kg, max 0.5 mg) of 1 mg/mL (1:1000)"`; Escalate: `"Cardiac arrest: ACLS + epinephrine 1 mg IV as per ACLS"`; infusion `"typically 0.05–0.1 mcg/kg/min titrated (e.g., 1–10 mcg/min)"`.
*Issue:* The classic fatal error is giving the 1 mg/mL (1:1000) ampule IV (10-fold overdose of a 0.1 mg/mL IV syringe) or confusing "mg" and "mL". The IM dose is 0.3–0.5 **mL** of 1 mg/mL. The card never mentions the 0.1 mg/mL (1:10,000) IV concentration, nor that IV boluses in non-arrest anaphylaxis (e.g., 5–20 mcg/dose, or 0.05–0.1 mcg/kg/min infusion) are for monitored, ordered use only. The two infusion ranges (0.05–0.1 mcg/kg/min ≈ 3.5–7 mcg/min in a 70 kg adult) are not "1–10 mcg/min"; harmonise.
*Corrected:* `"HIGH ALERT: IM = 1 mg/mL (1:1000), 0.3–0.5 mg = 0.3–0.5 mL, thigh. NEVER give 1 mg/mL IV. IV bolus/infusion only with 0.1 mg/mL (1:10,000) or pharmacy-prepared infusion, on order, on a monitor. Refractory: infusion 0.02–0.1 mcg/kg/min (about 1–10 mcg/min), titrate."*

#### AN-2 — Steroid/antihistamine step language and dose (MINOR)
*Quoted:* `"Adjuncts AFTER epinephrine: H1 blocker (diphenhydramine 25–50 mg IV), H2 blocker (famotidine 20 mg IV), corticosteroid (e.g., methylprednisolone 1–2 mg/kg)"`.
*Issue:* Evidence for steroids preventing biphasic reactions is weak; antihistamines treat itch/urticaria only and can worsen hypotension/sedation (IV diphenhydramine). The card does say "do not replace epinephrine"; stronger: "optional, low priority; do not delay or substitute".

#### AN-3 — Inconsistent repeat-dose triggers (MINOR)
Refractory is "≥2 IM doses or shock" (actions), "2–3 IM epinephrine doses" (escalate) and "q5–15 min" repeats. Harmonise to: "no improvement after 2 IM doses (≈10 min) → start IV infusion and call ICU".

#### AN-4 — Fluid dose (MINOR)
*Quoted:* `"Rapid crystalloid bolus 1–2 L (adult) for hypotension; reassess after each liter."` Acceptable (WAO: 1–2 L, 5–10 mL/kg in first 5–10 min); add "(or 20 mL/kg)", and a caution in HF/renal failure.

#### AN-5 — Transfusion reaction conflated into the anaphylaxis card (MINOR)
The keywords and an escalate line cover transfusion reactions (stop transfusion, keep line open with saline, notify blood bank) — correct, but the general transfusion-reaction workup (clerical check, hemolysis vs TRALI vs TACO vs septic, return bag/tubing) should be its own card (§9).

#### AN-6 — Glucagon and other omissions (SUGGESTION)
Glucagon 1–5 mg over 5 min then 5–15 mcg/min is the right range for β-blockade. Add: nebulised epinephrine is not a substitute for IM; patients on beta-blockers may be refractory and bradycardic; **consider HAE/ACE-i angioedema** (no hives, no response to epinephrine; icatibant/C1-INH/ FFP) which is a recurring ICU mimic; methylene blue for refractory vasoplegia is niche. Tryptase timing (1–3 h) ✔.

**Verified correct:** IM dose 0.01 mg/kg, max 0.5 mg adult; anterolateral thigh; repeat q5–15 min; supine/legs elevated (not sitting up abruptly); biphasic reaction counselling; albuterol 2.5–5 mg; observation 4–6 h minimum (many protocols 6–12 h if severe).

### 5.3 Tension pneumothorax
Compared to: ATLS 10th/11th [from knowledge – 11th not reviewed], AHA 2025 H's/T's.

#### TP-1 — Needle site/length (MINOR)
*Quoted:* `"14 G, ≥8 cm / 3.25 in"`; `"5th intercostal space anterior-to-mid axillary line (alt: 2nd ICS midclavicular line)"`.
*Issue:* The 5th ICS (AAL–MAL) site is the ATLS 10th ed. preference; 8 cm × 14 G is as recommended for adults. In a ventilated ICU patient with obesity the chest wall may exceed 5 cm — failure of needle decompression is common. The card correctly states "temporary", gives finger thoracostomy as an alternative, and says do not wait for CXR. Add: `"If needle decompression fails and patient is arresting/peri-arrest, proceed to finger thoracostomy; an 'air rush' may be absent — reassess for response."` [from knowledge – verify].

#### TP-2 — "Absent lung sliding" is not diagnostic (MINOR)
*Quoted:* `"Ultrasound: absent lung sliding (if available)"` → add "lung point confirms; absent sliding also occurs in mainstem intubation, pleurodesis, bullae, apnea. Do not delay decompression for ultrasound in a crashing patient."

#### TP-3 — Ventilator management: "disconnect and hand-bag" (MINOR)
*Quoted:* `"If ventilated, disconnect and hand-bag to feel compliance"`. Hand-bagging a patient with tension physiology with high pressure can worsen tension; the first step is disconnecting from the vent to *relieve* auto-PEEP/tension physiology — the card should say "briefly disconnect to allow exhalation; bag gently (low rate) while decompression is prepared".

#### TP-4 — Chest tube/drainage escalation numbers (MINOR)
*Quoted:* `"hemothorax output >1,500 mL initial or >200 mL/h → surgery"`. ATLS: 1,500 mL initial or ≥200 mL/h for 2–4 h [from knowledge]. Add the duration and 'or hemodynamic instability'. Add "Never clamp a chest tube in a patient with an air leak (especially ventilated) — tension recurs; do not clamp for transport".

#### TP-5 — Medications row (SUGGESTION)
*Quoted:* `"Hold nitrous oxide; minimize PEEP/pressures as directed by provider"`. Fine; add 'avoid PEEP changes without provider; use lowest effective pressure; consider that permissive hypercapnia may be needed'.

**Verified correct:** clinical diagnosis; tracheal deviation late; hemothorax criteria; re-expansion pulmonary edema warning; repeated reassessment.

### 5.4 Status epilepticus
Compared to: AES 2016 guideline; NCS 2012; ESETT trial (levetiracetam 60 mg/kg, max 4500 mg) [from knowledge – verify].

#### SE-1 — "At ~20 min" invites waiting; benzodiazepine adequacy not emphasised (MAJOR)
*Quoted:* `"!At ~20 min if still seizing — SECOND-LINE (one): levetiracetam 60 mg/kg…"`.
*Issue:* AES 2016 gives the second phase (urgent control) as 5–20 min and tells clinicians to start it as soon as the first-line therapy has been given and has failed; "~20 min" will be read as a rule to wait. The most common reasons for treatment failure are under-dosed/late benzodiazepines (e.g., 1–2 mg lorazepam) — the card should emphasise full weight-based dosing and that repeating benzodiazepine once is acceptable but must not delay second-line.
*Corrected:* `"!Seizure continues ~5 min after a full-dose benzodiazepine → give second-line NOW (do not wait for 20 min); have it drawn up while the benzodiazepine is given. Refractory = failure of benzodiazepine + one second-line agent → call ICU/neurology immediately (anesthetic infusion typically by ~40 min)."*

#### SE-2 — Pediatric dose in an adult ICU card (MINOR)
*Quoted:* `"IM midazolam 10 mg (>40 kg), 5 mg (13–40 kg)"` → delete the 13–40 kg dose or label as pediatric (X-4).

#### SE-3 — Glucose and thiamine thresholds (MINOR)
*Quoted:* `"If <70 mg/dL (or unknown & seizing): dextrose per order; give thiamine first/with it…"`. Thiamine must not delay dextrose in a seizing hypoglycemic patient: `"give dextrose immediately; give thiamine at the same time or right after (do not delay dextrose)"`. Hypoglycemia threshold varies (Stroke <60, Seizure <70) (X-5).

#### SE-4 — Second-line dosing details (MINOR)
Levetiracetam 60 mg/kg (max 4,500 mg) over ~10 min ✔ (ESETT); fosphenytoin 20 mg PE/kg max 1,500 mg PE at ≤150 mg PE/min ✔; valproate 40 mg/kg max 3,000 mg over 10 min ✔. Add: phenytoin (non-fos) 20 mg/kg at ≤50 mg/min only via large vein (purple-glove syndrome); valproate contraindications also include hyperammonemia/mitochondrial disease/thrombocytopenia; fosphenytoin hypotension/arrhythmia; ESETT showed equivalence of all three so choose per patient (levetiracetam first-line for the nurse protocol).

#### SE-5 — Refractory-status specifics (MINOR)
Add: after intubation the patient may have *no visible seizures* yet still be in nonconvulsive status — keep continuous EEG; propofol infusion risk (PRIS; avoid >4 mg/kg/h for >48 h); midazolam bolus 0.2 mg/kg then 0.1–2 mg/kg/h; ketamine, pentobarbital need pharmacy/ICU. Not necessary for a nurse card but the label "VERIFY" is not enough for infusions in a nurse-facing app.

#### SE-6 — Benzodiazepine IV lorazepam repeat (SUGGESTION)
*Quoted:* `"IV lorazepam 0.1 mg/kg (max 4 mg/dose, may repeat once at 5 min)"` ✔ (AES). Add "IV diazepam 0.15–0.2 mg/kg max 10 mg may repeat once" ✔ and "if no IV and no IM midazolam: rectal diazepam 0.2–0.5 mg/kg max 20 mg" [from knowledge].

**Verified correct:** definition ≥5 min or recurrent without recovery; glucose first; lorazepam/diazepam/midazolam IM doses; second-line doses; pyridoxine for INH; nonconvulsive status needs EEG.

### 5.5 Acute MI / ACS
Compared to: 2025 ACC/AHA/ACEP/NAEMSP/SCAI ACS guideline [checked, summary level]; 2021 Chest Pain guideline; 4th Universal Definition.

#### ACS-1 — "New LBBB with symptoms" (MINOR)
*Quoted:* `"ECG: ST elevation ≥1 mm in ≥2 contiguous leads (V2–V3: ≥2 mm men / 1.5 mm women), new LBBB with symptoms"`.
*Issue:* 2025 ACS guideline: new/presumed-new LBBB is not a STEMI equivalent by itself; reasonable to treat as STEMI only when correlated with ischemic symptoms/hemodynamic compromise or Sgarbossa criteria [checked, summary level]. Sgarbossa/modified Sgarbossa and "occlusion MI" patterns (posterior MI, de Winter T, hyperacute T, aVR elevation with diffuse ST depression) are missing; the threshold "≥2 mm men" applies to men ≥40 y (≥2.5 mm if <40 y).
*Corrected:* `"…V2–V3: ≥2 mm men ≥40 y (2.5 mm if <40), ≥1.5 mm women. LBBB/paced rhythm: use Sgarbossa and call cardiology — do not rely on 'new LBBB' alone. Posterior (V1–V3 ST↓, tall R) → V7–V9. Normal troponin does NOT exclude STEMI."*

#### ACS-2 — Anticoagulation and P2Y12 timing/bleeding (MINOR)
*Quoted:* `"Anticoagulant (heparin/enoxaparin) and P2Y12 inhibitor per cardiology orders"`. Acceptable for nurse scope; add that opioids (morphine/fentanyl) delay oral P2Y12 absorption (crush or IV cangrelor per cardiology), that ticagrelor/prasugrel are preferred over clopidogrel in ACS (2025) [checked], and that prasugrel is contraindicated after stroke/TIA.

#### ACS-3 — Nitroglycerin conditions (MINOR)
*Quoted:* `"Nitroglycerin 0.4 mg SL q5 min ×3 … IF SBP ≥90–100 and no RV infarct, no PDE-5 inhibitor (sildenafil 24 h / tadalafil 48 h)"` ✔. Add: inferior MI/right-sided ECG before nitrate; severe aortic stenosis; and that SBP should be >30 mmHg below baseline cut-off (ACC: avoid if SBP <90 or ≥30 below baseline) [from knowledge].

#### ACS-4 — No fibrinolytic contraindication list (MAJOR)
*Quoted:* `"Fibrinolytic if PCI not available within ~120 min of first contact (per protocol/contraindications)"`.
*Issue:* A lytic checklist is referenced but not given; a nurse in a non-PCI hospital may be asked to verify eligibility. The timing (120 min FMC-to-device) is correct; fibrinolysis within 30 min of arrival, ≤12 h from onset (up to 24 h if ongoing ischemia).
*Corrected:* add `"Absolute contraindications: any prior ICH; ischemic stroke <3 mo; known intracranial neoplasm/AVM; active bleeding (not menses); suspected aortic dissection; significant head/facial trauma <3 mo; intracranial/spinal surgery <2 mo; severe uncontrolled HTN (>180/110) unresponsive to treatment. Relative: anticoagulant use, traumatic CPR >10 min, major surgery <3 wk, internal bleed <4 wk, pregnancy, active peptic ulcer, prior streptokinase."* [ACC/AHA STEMI 2013 list; from knowledge – verify against 2025 text].

#### ACS-5 — Aspirin repeat dose and allergy (MINOR)
*Quoted:* `"Aspirin 162–325 mg chewed (then 81 mg daily)"`. 2025 ACS guideline: load 162–325 mg then 75–100 mg daily [checked]. ✔. Add that already-on-aspirin patients should still receive the chewable load; ASA allergy (esp. AERD with asthma) → clopidogrel load.

#### ACS-6 — Beta-blocker, K/Mg targets (MINOR)
*Quoted:* `"Serial troponin, K ≥4.0, Mg ≥2.0"`. The K/Mg targets originate from older guidelines (no outcome evidence); acceptable as nursing targets but label "common target, per protocol". β-blocker "PO within 24 h if stable" ✔ (HF/shock/low output exclusions are in the card).

#### ACS-7 — Complications under-covered (SUGGESTION)
Add: post-cath retroperitoneal bleed (back/flank pain, hypotension, falling Hgb with femoral access), contrast nephropathy hydration, heparin-induced thrombocytopenia, RV infarct fluids (cautious bolus 250–500 mL for hypotension with RV infarct), VT storm.

**Verified correct:** ECG ≤10 min; D2B ≤90 min; O₂ only if SpO₂ <90%; troponin 0/1–3 h algorithms; V4R for inferior MI; PDE-5 intervals; high-intensity statin.

### 5.6 Cardiogenic shock
Compared to: SCAI shock stages (2019/2022 update); ESC HF 2021/2023 focused update; AHA/ACC HF 2022; AHA scientific statement on CS 2017 [from knowledge – verify]; DanGer Shock (Impella CP in STEMI-CS, 2024) and ECLS-SHOCK (VA-ECMO neutral, 2023); IABP-SHOCK II.

#### CS-1 — Norepinephrine dose range implausible/inconsistent (MINOR)
*Quoted:* `"Norepinephrine 0.01–3 mcg/kg/min (titrate to MAP) — often first-line"` vs Sepsis `"0.05–0.5+ mcg/kg/min"`.
*Issue:* 3 mcg/kg/min is far beyond any practice norm (typical max 1–2); an upper limit of 3 invites miscalculated pump rates. Use one range across the app and "concentration-dependent — check pump library".
*Corrected:* `"Norepinephrine 0.02–1 mcg/kg/min typical (higher doses per provider); first-line vasopressor"`.

#### CS-2 — Fluid challenge, inotrope, and epinephrine caveats (MINOR)
*Quoted:* `"Judicious fluid challenge (e.g., 250 mL) ONLY if clearly dry/no congestion"` ✔. `"Add inotrope for low output as ordered (dobutamine; milrinone if on β-blocker/need vasodilation)"` ✔ but milrinone causes hypotension, accumulates in renal failure (the card says "renal dosing") and has a long half-life; avoid bolus. `"Epinephrine low dose"` — epinephrine is associated with higher refractory shock/lactic acidosis in cardiogenic shock (CardShock) — list as third-line.

#### CS-3 — Mechanical support statements overstated by omission (MINOR)
*Quoted:* `"Prepare for mechanical circulatory support (IABP/Impella/ECMO) evaluation per team."` Routine IABP in MI-shock was not beneficial (IABP-SHOCK II); Impella CP lowered mortality in selected STEMI-CS (DanGer Shock) at the cost of more complications; routine VA-ECMO did not lower mortality (ECLS-SHOCK). Not an error but a nurse should know MCS is a team decision; add "selected patients, early (SCAI C–D)".

#### CS-4 — Definition and hemodynamics (SUGGESTION)
*Quoted:* `"SBP <90 (or MAP <60 / drop ≥30 mmHg) sustained"`, `"CI <2.2 L/min/m²"` ✔. Add SCAI stages (A–E) and "normotensive shock" with lactate >2 as early forms, plus the use of the 'cardiac power output <0.6 W' marker if PA catheter.

#### CS-5 — Oxygen/NIV caution wording (SUGGESTION)
*Quoted:* `"O₂/NIV for hypoxia (use caution: positive pressure drops preload)"`. In cardiogenic pulmonary edema NIV is beneficial (reduces preload *and* afterload); caution applies to RV failure/hypotension. Refine: `"NIV usually helps pulmonary edema; monitor BP — hypotension after NIV initiation is common (reduced preload)"`.

**Verified correct:** MAP ≥65, lactate trending, early echo/cath lab, avoid nitrates when hypotensive, avoid large fluid loads in congestion, dobutamine 2–20, milrinone 0.125–0.75.

### 5.7 Atrial fibrillation with RVR
Compared to: AHA 2025 ALS Part 9 (tachyarrhythmia) [checked]; 2023 ACC/AHA/ACCP/HRS AF guideline [from knowledge – verify].

#### AF-1 — "Do NOT give" list for pre-excited AF omits IV amiodarone (CRITICAL)
*Quoted:* `"Do NOT give AV-nodal blockers (diltiazem, β-blocker, digoxin, adenosine) in suspected pre-excited AF (WPW) — call provider; procainamide or cardioversion."`, and two bullets earlier `"Hypotension, decompensated HF or reduced EF: avoid diltiazem/β-blocker; amiodarone 150 mg IV over 10 min then 1 mg/min ×6 h, 0.5 mg/min ×18 h (or digoxin)."` Also Escalate: `"Wide irregular tachycardia → treat as WPW-AF/VT: no AV-nodal blockers"`; Unstable tachycardia card: `"Pre-excitation (WPW) or unclear wide-complex → no AV-nodal blockers"`.
*Issue:* In pre-excited AF (AF with an accessory pathway), AHA 2025 gives **IV amiodarone** a Class 3 (Harm) recommendation together with digoxin, β-blockers and non-dihydropyridine calcium-channel blockers [checked]; amiodarone has been reported to precipitate VF in this setting. The card restricts the warning to "AV-nodal blockers" (amiodarone is not classed as one by most nurses), and the nearest amiodarone instruction is a *hypotension* indication — exactly the patient (wide, fast, irregular, hypotensive) in whom a nurse might reach for it. The card also omits verapamil.
*Why CRITICAL:* a literal reading in a hypotensive patient with a wide irregular rhythm leads to amiodarone (or diltiazem as "rate control") and risks degeneration to VF.
*Corrected wording (replace the line):* `"!WIDE, FAST, IRREGULAR rhythm (varying QRS width) = pre-excited AF until proven otherwise. Do NOT give diltiazem, verapamil, β-blocker, digoxin, adenosine OR amiodarone. Unstable → synchronized cardioversion now. Stable → procainamide (or ibutilide) ONLY on expert/provider order."* Add to Recognize: `"Rate often >200 with some beats very fast; QRS wide/variable."` Also add the same list to the unstable-tachycardia escalate line and the WPW wording in the recognition bullet. [AHA 2025 Part 9 Class 3: Harm — checked at guideline-summary level; confirm the exact COR/LOE text.]

#### AF-2 — Cardioversion energy (MINOR)
*Quoted:* `"prepare synchronized cardioversion (biphasic 120–200 J per device/protocol)"`; Unstable-tachy: `"narrow irregular (AF) 120–200 J"`.
*Issue:* AHA 2025 suggests an initial biphasic energy of **≥200 J** for AF/flutter cardioversion and escalating if unsuccessful [checked, secondary summary]; previous guidance (2020) was 120–200 J. Many ICU defibrillators are 150 J-maximum or manufacturer-specific. Low-energy first shocks fail more often, prolonging sedation/instability.
*Corrected:* `"Synchronized cardioversion: start at device-specific maximum or ≥200 J biphasic for AF (per provider/device); atrial flutter/SVT lower energies (50–100 J) suffice."`

#### AF-3 — Instability definition, compensatory tachycardia and anticoagulation (MINOR)
*Quoted:* `"Unstable (hypotension, ischemic pain, AMS, acute HF/shock) → synchronized cardioversion"`; `"In ICU, RVR is often secondary to sepsis, volume depletion, pain, withdrawal, PE, thyroid, catecholamines — fix the driver"` ✔ (good). 
*Issue:* A septic or hypovolemic patient with AF at 140 and hypotension is *often compensatory*; cardioversion in this situation fails or relapses and delays treatment of the cause (AHA 2025: assess whether the arrhythmia is the cause [checked]). The card's glance says "Unstable → synchronized cardioversion" which can lead a nurse to prepare cardioversion for sepsis. Also, cardioversion of AF >48 h/unknown duration without anticoagulation/TEE carries stroke risk (the card mentions this as a question but does not say emergent cardioversion is acceptable when unstable).
*Corrected:* `"Unstable AND the rhythm is the likely cause (very fast, e.g., >150, with ischemia/pulmonary edema) → cardioversion. If shock from sepsis/bleeding with AF 120–140 → treat the cause first (fluids/pressor/antibiotics); call provider."`

#### AF-4 — Diltiazem/β-blocker stacking and dosing nuances (MINOR)
*Quoted:* `"diltiazem 0.25 mg/kg IV over 2 min (≈15–20 mg), repeat 0.35 mg/kg in 15 min if needed, then infusion 5–15 mg/h; OR metoprolol 2.5–5 mg IV over 2 min q5 min up to ~15 mg."` — doses ✔. Add: do not give both a non-DHP CCB and β-blocker in sequence without a provider order (profound bradycardia/hypotension); caution if on β-blocker, in HFrEF (EF <40%) and in shock; esmolol is a good ICU choice because of short half-life; diltiazem causes hypotension in ~10–20%.

#### AF-5 — Amiodarone and digoxin (MINOR)
*Quoted:* `"amiodarone 150 mg IV over 10 min then 1 mg/min ×6 h, 0.5 mg/min ×18 h (or digoxin)"` ✔ (AHA 2025: IV amiodarone useful for rate control in critically ill patients with non-pre-excited AF [checked]). Add: amiodarone may chemically cardiovert (embolic risk if AF >48 h without anticoagulation); phlebitis (central line/0.2 mg/mL for >2 mg/mL); digoxin: renal dosing, hypokalemia increases toxicity, onset 1–4 h (not for acute control), `"Digoxin 0.25 mg IV q2 h (max ~1–1.5 mg total loading) in HF"` ✔ (typical 0.25 mg q2h ×up to 1.5 mg) — avoid in renal failure/hypoK.

#### AF-6 — K/Mg and rate goals (SUGGESTION)
`"K (goal ≥4.0), Mg (≥2.0)"`, `"goal resting HR <110"` (RACE II lenient) ✔. Add that atrial flutter 2:1 (rate ~150 regular) is often mislabelled — check flutter waves/adenosine only by provider.

**Verified correct:** dose tables, rate target <110, K/Mg, ask about anticoagulation/duration, triggers list, stroke code on new deficit.

### 5.8 Unstable tachycardia (with a pulse)

#### UT-1 — Energy and "wide irregular" (MAJOR)
*Quoted:* `"Initial energy (biphasic): narrow regular 50–100 J; narrow irregular (AF) 120–200 J; wide regular (VT) 100 J. Increase stepwise if no response."` and `"Wide irregular / polymorphic VT: defibrillate (unsynchronized) at high energy."`
*Issue:* (1) AF energy as AF-2 (≥200 J, AHA 2025). (2) "Wide irregular → defibrillate unsynchronized" lumps two things: *polymorphic VT* (unsynchronized shock if pulseless/unstable — AHA 2025 "immediate unsynchronized shock" [checked]) and *pre-excited AF* (irregular, wide, **pulse present** → synchronized cardioversion first; unsynchronized shock risks R-on-T and VF). The rule in the app could produce an unsynchronized shock on a perfusing patient who is in AF with WPW.
*Corrected:* `"Wide IRREGULAR: if pulseless or polymorphic VT/torsades (rate >200, changing morphology) → unsynchronized defibrillation. If pulse present with varying QRS width (suspected pre-excited AF) → SYNCHRONIZED cardioversion; no AV-nodal blockers or amiodarone."` Add: `"If sync fails to fire (no R-wave marker, polymorphic VT), use unsynchronized shock — never delay a shock for an unstable patient."` and `"After each shock check the SYNC button — most devices default back to unsynchronized."`

#### UT-2 — Calcium-channel blockers/adenosine in wide-complex tachycardia (MINOR)
*Quoted:* `"Adenosine is for REGULAR monomorphic rhythms only — never for irregular or polymorphic rhythms."` ✔ (AHA 2025 Class 3 Harm for irregular/polymorphic, unstable WCT; 2b for stable regular monomorphic WCT [checked]). Add: verapamil/diltiazem are Class 3 Harm in undifferentiated WCT (nurses often see "narrow vs wide" mix-ups); avoid giving amiodarone and procainamide together (additive QT, hypotension).

#### UT-3 — Stable wide regular: dosing and QT precautions (MINOR)
*Quoted:* `"STABLE wide regular: 12-lead; amiodarone 150 mg over 10 min or procainamide 20–50 mg/min (max 17 mg/kg) per expert."` ✔ numerically (AHA). Add: stop procainamide if QRS widens >50%, hypotension, or QT prolongation; do not use if long QT/torsades; reduce in renal failure; expert consult.

#### UT-4 — Torsades details (MINOR)
*Quoted:* `"Torsades (polymorphic VT with long QT): magnesium 1–2 g IV; unstable → defibrillate."` ✔. Add: Mg 2 g over 5–20 min (1–2 min if pulseless), then infusion; stop QT-prolonging drugs; correct K to 4.5–5; overdrive pacing/isoproterenol per provider if pause-dependent. Mg is the only electrolyte recommended in arrest and only for torsades with long QT (AHA 2025 [checked]).

#### UT-5 — Adenosine administration (SUGGESTION)
`"adenosine 6 mg rapid IV push with flush (large proximal vein); if no conversion 12 mg ×1–2."` ✔ (AHA: 6 mg then 12 mg, may repeat 12 mg). `"↓ to 3 mg via central line/heart transplant; caution asthma"` ✔ (also dipyridamole/carbamazepine potentiate; theophylline antagonises). Record rhythm strip during administration (diagnostic).

**Verified correct:** SVT adenosine doses; procainamide max 17 mg/kg; VT 100 J initial; amiodarone 150 mg/10 min; sedation before cardioversion; pulseless → CPR/defib.

### 5.9 Symptomatic bradycardia
Compared to: AHA 2020 bradycardia algorithm (atropine 1 mg) [from knowledge]; AHA 2025 ALS Part 9 (not re-verified in detail) [uncertain].

#### BR-1 — Atropine dose inconsistency and anachronism (MINOR)
*Quoted:* `"Atropine 1 mg IV q3–5 min (max 3 mg)"` (glance, meds) vs `"Atropine 0.5–1 mg IV rapid push (ACLS: 1 mg), repeat q3–5 min, max total 3 mg. Doses <0.5 mg can worsen bradycardia."`
*Issue:* AHA 2020 and later: atropine 1 mg q3–5 min, max 3 mg. 0.5 mg was the pre-2020 dose. The "<0.5 mg paradoxical bradycardia" caution is historical; keep one dose to avoid a nurse under-dosing.
*Corrected:* `"Atropine 1 mg IV push q3–5 min (max 3 mg). Ineffective in transplanted/denervated hearts and in infranodal blocks; do not delay pacing."` Remove the 0.5 mg line.

#### BR-2 — Pacing setup details (MINOR)
*Quoted:* `"TRANSCUTANEOUS PACING: pads front/back (or anterior-lateral), rate ~60–80, increase mA until electrical capture… AND mechanical capture"` ✔. Add: set rate 60–80, start at 0 mA and increase until capture then +10% safety margin (or start at 70 mA and decrease); confirm mechanical capture by femoral pulse/arterial waveform because skeletal muscle twitching mimics it; sedate/analgesia for conscious patients; avoid carotid pulse. "Avoid pads on implantable device/ pacemaker generator."

#### BR-3 — Infusion alternatives and sequence (MINOR)
*Quoted:* `"Infusion alternative: dopamine 5–20 mcg/kg/min or epinephrine 2–10 mcg/min"` ✔ (AHA). Note dopamine is no longer recommended as a first-line vasopressor elsewhere in the app (SSC); acceptable here per ACLS.

#### BR-4 — Cause-directed therapy (SUGGESTION)
Add: hyperkalemia (calcium; bradycardia + wide QRS + AKI + AV-nodal blocker = "BRASH"), digoxin toxicity (digoxin Fab), β-blocker/CCB overdose (calcium, glucagon, HIE), hypothermia (rewarming; atropine ineffective), Cushing response (ICP), post-op vagal. The Overdose card handles β-blocker/CCB but not digoxin/BRASH.

**Verified correct:** HR <50 definition, Mobitz II/3° need pacing readiness, pacing rate 60–80, glucagon 3–10 mg, dopamine/epinephrine ranges, denervated heart caveat.

---

### 5.10 Acute respiratory failure: intubation & vent basics
Compared to: SSC 2026 (respiratory section) [checked]; ARDSNet; SCCM PADIS 2018 [from knowledge]; GOLD 2024/ATS-ERS NIV guidance; DAS/ASA difficult-airway guidance.

#### RF-1 — Default RR 14–20 with no obstructive-lung exception (MAJOR)
*Quoted:* `"Initial vent: Assist-control volume (or PRVC), VT 6–8 mL/kg PBW, RR 14–20, PEEP 5, FiO₂ 100% then titrate to SpO₂ 92–96% (88–95% in ARDS)."`
*Issue:* For severe asthma/COPD the recommended initial settings are low RR (**8–12/min**), VT 6–8 mL/kg PBW, prolonged expiratory time (I:E ≥1:4), minimal PEEP, permissive hypercapnia (pH ≥7.20); a nurse following RR 14–20 literally in status asthmaticus causes breath-stacking, auto-PEEP, tension physiology and arrest. The app has no asthma/COPD card at all (§9). Likewise, for ARDS the initial RR is up to 35 (ARDS card) — so the instructions conflict.
*Corrected:* `"Initial vent (usual): A/C volume, VT 6–8 mL/kg PBW, RR 14–20, PEEP 5, FiO₂ 100% → titrate. ASTHMA/COPD: RR 8–12, long expiratory time, watch for auto-PEEP, accept pH ≥7.20; if BP drops or flow does not return to zero → disconnect briefly (see Vent alarms). ARDS: see ARDS card (RR up to 35). Neuro: avoid hypercapnia."* Also add a one-line "who gets which settings" table.

#### RF-2 — Sedation/analgesia sequencing after paralysis (MAJOR)
*Quoted:* step 10 `"Start analgesia-first sedation (fentanyl) ± propofol/dexmedetomidine per orders. Target RASS 0 to −2."`; Meds: `"Paralytic: rocuronium 1–1.2 mg/kg · succinylcholine 1–1.5 mg/kg"`.
*Issue:* Rocuronium paralyses for 45–70 min, ketamine/etomidate last 5–15 min — if sedation is not started promptly, the patient may be aware while paralysed (awareness under paralysis). The app lists sedation as step 10 of 12 after CXR and OG. Further, "RASS 0 to −2" immediately after intubation for a patient with ICP, hemodynamic compromise, or severe dyssynchrony is not a general target.
*Corrected:* `"!IMMEDIATELY after the tube is confirmed (before CXR/OG): start sedation/analgesia — especially after rocuronium (lasts 45–70 min). Awareness while paralysed is a real, preventable harm. Then titrate to ordered RASS."* Move to step 6 or insert a "!" step directly after tube confirmation.

#### RF-3 — "GCS ≤8 = intubate" and indications (MINOR)
*Quoted:* `"inability to protect airway (GCS ≤8, vomiting, secretions)"` — dogma; see QT-6.

#### RF-4 — NIV selection and contraindications (MINOR)
*Quoted:* `"Try NIV (BiPAP/CPAP) if appropriate: awake, protecting airway, COPD/CHF; reassess in 30–60 min."` ✔. Add absolute/relative contraindications: vomiting, upper-GI bleed, facial trauma, inability to protect airway, severe hypoxemia/ARDS with P/F <150 (high failure), hemodynamic instability; HFNC is preferred over NIV for de novo hypoxemic failure (SSC 2026 suggests HFNC over NIV [checked]); hypercapnic COPD pH 7.25–7.35 → NIV; pH <7.25 high failure → ICU. The recognition line `"pH <7.30 with PaCO₂ >50"` ✔ matches.

#### RF-5 — Preoxygenation and tube position (MINOR)
`"preoxygenate 3–5 min (NRB + nasal cannula or NIV)"` ✔. `"depth at teeth (≈21 cm F / 23 cm M)"` ✔. `"CXR (tip 2–5 cm above carina)"` ✔. `"cuff pressure 20–30 cmH₂O"` ✔. Add: apneic oxygenation (NC 15 L/min) continues during laryngoscopy; first-pass success matters (video laryngoscopy, bougie); capnography mandatory; esophageal intubation signs; hypoxemia after intubation → DOPE (link). Hemodynamic optimisation: "shock index >0.8 predicts post-intubation arrest — fluids/pressor ready, reduce induction dose by ~50%" ✔ partially in card.

#### RF-6 — Drug doses and contraindications (MINOR)
*Quoted:* `"ketamine 1–2 mg/kg · etomidate 0.3 mg/kg · propofol 1–2 mg/kg (avoid in shock) — reduce in shock"`; `"succinylcholine 1–1.5 mg/kg (avoid: hyperK, burns/crush >24–72 h, neuromuscular disease, malignant hyperthermia history)"` ✔; `"phenylephrine 50–100 mcg or epinephrine 5–20 mcg IV"` ✔. Notes: ketamine in shock 0.5–1 mg/kg; etomidate adrenal suppression is a non-issue for single dose (contested in sepsis); roc 1.2 mg/kg preferred for RSI; sugammadex 16 mg/kg availability for "can't intubate/can't oxygenate" — a physician decision; add "sux: also contraindicated in prolonged immobilisation (>3–5 days ICU), spinal-cord injury >48–72 h, Guillain-Barré". "Steroids for asthma/COPD flare" okay.

#### RF-7 — Accidental extubation instruction (MINOR)
*Quoted:* `"Accidental extubation: bag-mask, call for help; do NOT reinsert blindly without assessment"`. ✔ but better: `"…never advance/reinsert a displaced tube; deflate cuff if partially out; oxygenate with BVM + airway adjunct; prepare reintubation with airway-qualified provider; 'self-extubation' with stridor → post-extubation stridor management."`

#### RF-8 — Escalation threshold (SUGGESTION)
`"SpO₂ <88% despite 100% FiO₂, rising PaCO₂/pH <7.25"`: fine; add a numeric ratio like P/F <150 and "rising oxygen index".

**Verified correct:** SOAP-ME mnemonic; RSI doses; VT 6–8 mL/kg PBW start; plateau ≤30; HOB; SAT/SBT; CXR tip; cuff pressure; OG; ABG 20–30 min.

### 5.11 Ventilator alarms troubleshooting

#### VA-1 — Cuff leak instruction (MINOR)
*Quoted:* `"LOW VOLUME / LEAK: check connections, cuff (add air to minimal-leak)"`. "Add air" without measuring pressure risks over-inflation (>30 cmH₂O mucosal injury) — `"re-check cuff pressure with manometer (20–30 cmH₂O); if cuff will not hold pressure → ETT/pilot balloon failure; call provider (tube may need exchange)"`. Minimal-leak technique is an old practice for non-measurable settings.

#### VA-2 — Plateau pressure measurement conditions (MINOR)
*Quoted:* `"Check peak vs plateau (inspiratory hold)"`. A valid plateau requires a passive patient, VCV, no leak, and a 0.5–2 s hold; with spontaneous effort the value is unreliable. Add; also "Driving pressure = Pplat − total PEEP".

#### VA-3 — Peak-pressure differential list (MINOR)
`"Both ↑ → compliance (PTX, mainstem, pulmonary edema, abdominal distension, ARDS, atelectasis)"` ✔; add auto-PEEP/intrinsic PEEP raising plateau (intrinsic PEEP contributes to both). Add "bronchospasm → peak ↑ plateau normal" ✔. Add 'tape/ETT bite' ✔ present.

#### VA-4 — Naloxone in a ventilated patient (MINOR)
`"Naloxone for opioid-induced apnea (low dose, titrate)"` — in an intubated sedated patient, reversing opioids causes agitation, hypertension, pulmonary edema, and extubation; clarify "only for suspected unintended overdose in non-intubated or planned wake-up; otherwise dose-reduce sedation".

#### VA-5 — Bag-valve disconnect and PEEP (SUGGESTION)
`"DISCONNECT from vent and hand-bag with 100% O₂"` ✔. Add: use PEEP valve if PEEP ≥10 (de-recruitment risk) except when the problem is auto-PEEP/obstructive; in high-PEEP ARDS patient, clamp ETT during disconnect (transport) per RT. "Closed-suction first" ✔.

#### VA-6 — Escalation numbers (SUGGESTION)
`"Persistently high plateau >30 or driving pressure >15"` ✔; add 'peak >50 acute with hypotension → disconnect'. Add "Alarm limits never widened to silence" (the card says never silence/reset without cause ✔).

**Verified correct:** DOPE-S logic, disconnect-and-bag first, peak vs plateau differential, expiratory flow not returning to zero, document alarms.

### 5.12 ARDS
Compared to: ATS 2024 update (Qadir et al.), ESICM 2023, SSC 2026, Berlin 2012, Global 2023 definition [ATS/SSC checked; Berlin/Global from knowledge].

#### AR-1 — Neuromuscular blockade criteria and "deep sedation initially" (MAJOR)
*Quoted:* `"Deep sedation/analgesia initially if dyssynchrony; consider neuromuscular blocker (e.g., cisatracurium) for severe/ persistent dyssynchrony or P/F <150 — per intensivist."`; Meds: `"Neuromuscular blocker (cisatracurium) — short course for severe ARDS per provider"`; Glance: `"consider early paralytic/ECMO referral for severe"`.
*Issue:* Based on ACURASYS (2010), but ROSE (2019, P/F <150 with early deep sedation vs NMB) showed no mortality benefit with routine continuous NMB + deep sedation (90-day mortality 42.5% vs 42.8%) [checked]. ESICM 2023 recommends *against* routine continuous NMB infusion; ATS 2024 *suggests* NMB only in selected early severe ARDS (~P/F ≤100 within 48 h) [checked, secondary summary]; SSC 2026 suggests intermittent boluses over continuous infusions in refractory ARDS and no routine NMB [checked]. "P/F <150" as an NMB threshold is thus outdated; "deep sedation initially" is contrary to PADIS (light sedation, analgesia-first) and ROSE's control arm (lighter sedation was safe).
*Corrected:* `"Aim for the lightest sedation that allows lung-protective ventilation. NMB is NOT routine: reserve for severe early ARDS (P/F ≲100 on optimised settings), refractory dyssynchrony, or high plateau/driving pressure despite sedation — prefer intermittent boluses; short course (≤48 h); eye protection, TOF monitoring, deep sedation required while paralysed."*

#### AR-2 — "Recruitment/higher PEEP" as rescue; PEEP table caveat (MAJOR)
*Quoted:* `"Escalate to rescue: recruitment/higher PEEP, inhaled pulmonary vasodilator, ECMO referral…"`; `"Set PEEP/FiO₂ per ARDSNet table (e.g., FiO₂ 0.3→PEEP 5; 0.5→8–10; 0.7→10–14; 1.0→18–24)"`.
*Issue:* The numbers quoted are the ARDSNet *lower-PEEP* table (FiO₂ 0.3→5; 0.4→5–8; 0.5→8–10; 0.7→10–14; 0.9→14–18; 1.0→18–24) — correctly transcribed but one of two ARDSNet tables; higher PEEP is suggested for moderate–severe ARDS (ATS 2024 suggests higher over lower PEEP [checked]); SSC 2026 gives a *strong* recommendation against **incremental PEEP-titration recruitment manoeuvres** and ATS 2024 strongly recommends against prolonged high-pressure RMs (e.g., PEEP ≥35 cmH₂O for >60 s) [checked]. A nurse reading "recruitment" may perform sustained inflation/CPAP 40×40 s — hypotension/barotrauma.
*Corrected:* `"PEEP per ARDSNet table (lower- or higher-PEEP table per protocol; higher PEEP preferred in moderate–severe ARDS if compliance improves). NO routine recruitment manoeuvres; never perform sustained high-pressure (≥35 cmH₂O ≥60 s) inflation. Rescue: prone, inhaled pulmonary vasodilator (trial — no mortality benefit), ECMO referral."*

#### AR-3 — Proning criteria and prerequisites (MINOR)
*Quoted:* `"Prone positioning for P/F <150 on FiO₂ ≥0.6 (PEEP ≥5): proned ≥12–16 h/day"` ✔ (PROSEVA: P/F <150 on FiO₂ ≥0.6, PEEP ≥5; 16 h sessions; SSC 2026: prone >12 h [checked]). Add: start within 36 h of intubation after 12–24 h optimisation, contraindications (unstable spine/fractures, open abdomen, ↑ICP, massive hemoptysis, recent sternotomy) and 'supine after ≥16 h only if P/F >150 on PEEP ≤10, FiO₂ ≤0.6 four hours after supination'; cardiac arrest while prone → resuscitate supine or consider prone CPR per team.

#### AR-4 — ECMO referral numbers (MINOR)
*Quoted:* `"ECMO referral for refractory hypoxemia (P/F <80 despite optimization)"`; Escalate: `"Plateau >30, pH <7.20, or severe hypoxemia → ECMO/rescue discussion"`.
*Issue:* EOLIA criteria: P/F <50 for >3 h, P/F <80 for >6 h, or pH <7.25 with PaCO₂ ≥60 for >6 h (on VT 6 mL/kg, PEEP ≥10, FiO₂ ≥0.8). "P/F <80" without a time/optimisation qualifier is acceptable as a referral trigger, but "pH <7.20 → ECMO" and "plateau >30 → ECMO" are not criteria — they should be "call provider; optimise ventilation; early ECMO centre discussion" (SSC 2026 and ATS 2024 suggest VV-ECMO for selected severe ARDS in experienced centres [checked]).

#### AR-5 — Steroids (MINOR)
*Quoted:* `"Corticosteroids (e.g., dexamethasone 20 mg/day→10) may be considered per provider/protocol"`. DEXA-ARDS regimen (20 mg days 1–5, 10 mg days 6–10) ✔; ATS 2024 conditionally recommends corticosteroids for ARDS (initiated early, ideally within 14 days) [checked], SSC 2026 suggests corticosteroids for ARDS [checked, secondary summary]. Update to "suggested" and exclude influenza and uncontrolled fungal infection per provider; monitor glucose.

#### AR-6 — Diagnosis (SUGGESTION)
*Quoted:* `"Berlin: P/F (PEEP ≥5) 200–300 mild · 100–200 moderate · ≤100 severe"` ✔ . Add the 2023 Global definition (includes HFNC ≥30 L/min, SpO₂/FiO₂ ≤315, ultrasound, resource-limited settings) as note [from knowledge – verify].

#### AR-7 — Fluids, PBW, VT (SUGGESTION)
*Quoted:* `"Set VT 6 mL/kg PBW (range 4–8); initial RR up to 35"` ✔; `"Aim driving pressure (plateau − PEEP) <15"` ✔ (a reasonable bedside target supported by observational data/Amato 2015 re-analysis; not a strong guideline recommendation — contested) [uncertain]. `"Conservative fluids once perfusion is stable"` ✔ (FACTT; SSC 2026 'active fluid removal after resuscitation' [checked]).

**Verified correct:** VT 6 mL/kg PBW; Pplat ≤30; RR up to 35; pH ≥7.30 target and permissive hypercapnia; DEXA-ARDS dosing; PROSEVA criteria; lower-PEEP table values; SpO₂ 88–95%/PaO₂ 55–80.

### 5.13 Pulmonary embolism
Compared to: 2026 AHA/ACC multisociety PE guideline (categories A–E) [checked at summary level — exact category thresholds not verified]; ESC 2019 [from knowledge – ESC successor not checked]; ACCP/CHEST.

#### PE-1 — No thrombolysis contraindication/eligibility list; only a vague "assess bleeding risks" (MAJOR)
*Quoted:* `"Assess bleeding risks and contraindications to anticoagulation/lytics (recent surgery, ICH, active bleeding, stroke)."` and `"Hemodynamically unstable and no contraindication: systemic thrombolysis (alteplase 100 mg over 2 h; 50 mg IV bolus in arrest per protocol)."`
*Issue:* A bedside nurse screening for eligibility needs the explicit list; the card gives neither absolute nor relative contraindications (ESC 2019) and does not state that in cardiac arrest/peri-arrest from PE, contraindications are relative. Missing: time frames (surgery <3 wk, stroke <6 mo, etc.).
*Corrected:* add `"Absolute: prior hemorrhagic stroke or stroke of unknown origin; ischemic stroke <6 mo; CNS neoplasm; major trauma/surgery/head injury <3 wk; bleeding diathesis; active bleeding. Relative: TIA <6 mo; oral anticoagulation; pregnancy/first post-partum week; non-compressible puncture; traumatic resuscitation; refractory HTN (SBP >180); advanced liver disease; infective endocarditis; active peptic ulcer. In imminent arrest, contraindications become relative — provider decides."* [ESC 2019 Table; from knowledge – verify].

#### PE-2 — Risk stratification vs 2026 AHA/ACC categories (MINOR)
*Quoted:* `"High-risk (massive): SBP <90 for ≥15 min or pressor need, or cardiac arrest"` ✔ (ESC 2019). 2026 AHA/ACC introduce categories A–E incorporating normotensive shock (cardiac index/lactate), "incipient" decompensation, refractory shock/arrest; PERT activation for C–E; systemic lysis reasonable in E, considered in D, avoided in A–C2 [checked, summary]. Not mentioned: normotensive shock (lactate >2, rising pressor) and PERT thresholds. Add `"PERT activation for intermediate-high/high-risk (RV dysfunction + troponin ↑), not just hypotension."`

#### PE-3 — Anticoagulation choices (MINOR)
*Quoted:* `"UFH IV (80 units/kg bolus then 18 units/kg/h, per nomogram) preferred if high-risk/may need lysis; LMWH otherwise."` ✔ . AHA/ACC 2026 favour LMWH over UFH when parenteral therapy is used and DOAC over VKA [checked, summary] — consistent with card. Add: renal failure (CrCl <30) → UFH; weight >150 kg; whether to pause heparin during alteplase infusion (practice varies; follow facility protocol — practice varies; follow facility protocol).

#### PE-4 — IVC filter and DVT prophylaxis bullet (MINOR)
*Quoted:* `"Mechanical DVT prophylaxis only if anticoagulation not possible; consider IVC filter per provider."` Confusing: DVT prophylaxis ≠ PE treatment. IVC filter is indicated only for acute PE/proximal DVT with an absolute contraindication to anticoagulation (or recurrent PE despite therapeutic anticoagulation) (ESC/ACCP/AHA). Replace: `"If anticoagulation is absolutely contraindicated: provider to consider IVC filter (retrievable); use IPC on legs only with provider order."`

#### PE-5 — RV failure support details (MINOR)
*Quoted:* `"cautious fluids (≤500 mL; stop if CVP rising), norepinephrine first-line vasopressor ± inotrope (dobutamine); avoid over-diuresis"` ✔ (ESC). Add: avoid excessive intubation sedation; if intubation unavoidable → push-dose pressors, induce with ketamine/etomidate, low PEEP, avoid hypercapnia/hypoxia (↑PVR). ECMO for refractory shock.

#### PE-6 — Alteplase dose in arrest and approach (MINOR)
*Quoted:* `"alteplase 100 mg over 2 h; 50 mg IV bolus in arrest per protocol"` — 100 mg over 2 h ✔ (FDA); 50 mg bolus in arrest is an accepted off-label regimen; 0.6 mg/kg over 15 min (max 50 mg) is the ESC-referenced accelerated regimen [from knowledge]. Add 'half-dose lysis (50 mg) for intermediate-risk is under study; not standard'.

**Verified correct:** UFH 80 U/kg + 18 U/kg/h; enoxaparin 1 mg/kg q12h; HIT platelets drop >50% (note: 4T score, typical day 5–10); avoid intubation if possible; ECG findings; post-lysis neuro checks.

### 5.14 Sepsis / septic shock
Compared to: SSC International Guidelines 2026 (published 2026-03-23) [checked]; SSC 2021 (what app cites).

#### SP-1 — Card follows SSC 2021; changes in 2026 (rolled into X-1; not counted separately)
Items that differ or should be softened per SSC 2026 [checked, summary level]:
* **qSOFA**: *Quoted* `"SBP ≤100 (qSOFA)"` appears as a screening element; 2026: strong recommendation against qSOFA as a single screening tool; use NEWS/MEWS/SIRS.
* **30 mL/kg**: *Quoted* `"balanced crystalloid (LR/Plasma-Lyte) 30 mL/kg IV within first 3 h"`; 2026 conditional/low-certainty: ≥30 mL/kg may be given but individualise with dynamic measures (PLR, pulse-pressure variation, echo, cap refill); use ideal/adjusted weight if BMI >30; consider fluids for lactate 2–4.
* **Antibiotic timing**: `"Broad-spectrum IV antibiotics within 1 h for shock or high suspicion"` ✔ for shock/probable sepsis; possible sepsis without shock: time-limited rapid assessment, antibiotics within 3 h if concern persists [checked]. Add the 3-h pathway — avoids unnecessary broad antibiotic use.
* **Source control**: `"ideally within 6–12 h"` — SSC 2026 ideal ≤6 h [checked]. 
* **Vasopressin/epinephrine**: `"vasopressin 0.03 units/min (when NE ~0.25–0.5 mcg/kg/min)"` ✔; epinephrine added if MAP still inadequate ✔.
* **Corticosteroids**: `"hydrocortisone 200 mg/day (50 mg q6h) if ongoing pressors"` vs Meds `"if ongoing high vasopressor need (≥4 h)"` — inconsistent; SSC 2021: NE ≥0.25 mcg/kg/min for ≥4 h; 2026 suggests IV corticosteroids (low certainty) [checked]. Harmonise: `"…if NE ≥0.25 mcg/kg/min (or equivalent) for ≥4 h despite fluids"`.
* **Missing 2021/2026 items:** restrictive transfusion (Hgb <7, strong), prolonged β-lactam infusion after first bolus dose (strong), LMWH preferred for VTE prophylaxis, insulin start at ≥180, bicarbonate only for pH ≤7.2 with AKI stage 2–3 (not for lactic acidosis perfusion), crystalloid preferred to albumin initially (albumin if large volumes), avoid RRT without definitive indication, source: "either invasive or non-invasive BP" with invasive suggested on escalating pressors.

#### SP-2 — Hour-1 "bundle" wording and cultures (MINOR)
*Quoted:* `"Blood cultures ×2 … BEFORE antibiotics if no significant delay (<45 min)"` ✔ (SSC). `"don't delay >45 min for cultures"` ✔. Keep. The "Hour-1 bundle" per CMS SEP-1 (30 mL/kg for hypotension or lactate ≥4) is regulatory — nurses should know SEP-1 still applies even where clinical practice differs (SEP-1 unchanged as of my knowledge [uncertain]).

#### SP-3 — Septic shock definition (MINOR)
*Quoted:* `"Septic SHOCK: vasopressor need to keep MAP ≥65 AND lactate >2 mmol/L despite adequate fluids"` ✔ (Sepsis-3). Fine; add that SSC treats MAP 65 as target (strong), with 60–65 suggested for patients ≥65 y in whom pressor doses are high [checked].

#### SP-4 — Fluid safety and albumin (MINOR)
*Quoted:* `"Albumin if large crystalloid volumes needed (per provider)"` ✔ (SSC: albumin after large volumes/cirrhosis; avoid in TBI [checked]). Add: use 0.9% saline rather than balanced crystalloid in TBI (SSC 2026) — an important exception; fluid overload watch.

#### SP-5 — Norepinephrine range & peripheral infusion (MINOR)
*Quoted:* `"Norepinephrine 0.05–0.5+ mcg/kg/min"` — harmonise with CS-1 (single range: 0.02–1). `"peripheral OK short-term, then central"` ✔ (SSC suggests starting peripherally rather than delay; use large proximal vein, monitor site). Add 'extravasation: phentolamine per protocol'.

#### SP-6 — Cap refill >3 s; lactate clearance (SUGGESTION)
`"cap refill >3 s"` ✔ (SSC: cap refill-guided resuscitation suggested over lactate-guided in ARISE/ANDROMEDA-SHOCK-2 context; ANDROMEDA-SHOCK-2 (2025) showed benefit of CRT-targeted individualised approach [from knowledge – verify]). 

**Verified correct:** lactate re-measurement 2–4 h; cultures before antibiotics; MAP ≥65; NE first-line; vasopressin 0.03 u/min; hydrocortisone 50 mg q6h; glucose 140–180; SOFA ≥2; arterial line suggested.

### 5.15 Hypovolemic / hemorrhagic shock
Compared to: ATLS 10th ed. (11th ed. not reviewed — uncertain); PROPPR; CRASH-2; WOMAN; HALT-IT; ESC/AABB/ACG; SSC 2026 for non-hemorrhagic.

#### HS-1 — TXA indication ambiguous (MAJOR)
*Quoted:* `"Tranexamic acid (TXA) 1 g IV over 10 min, then 1 g over 8 h if within 3 h of injury / major bleed (per provider)."`
*Issue:* The CRASH-2 regimen (1 g over 10 min then 1 g over 8 h) is correct, but the "/ major bleed" reading makes TXA appear indicated for any "major bleed" at any time. Evidence: benefit in trauma if given within 3 h of injury (CRASH-2; harm >3 h); postpartum hemorrhage within 3 h (WOMAN); **no benefit and more venous thromboembolism/seizures in GI bleed (HALT-IT)**; the app itself says "TXA is NOT routinely recommended" in the GI-bleed card, so the two cards conflict. Also TXA seizure risk at high doses; dose in renal failure.
*Corrected:* `"TXA 1 g IV over 10 min then 1 g over 8 h — ONLY for trauma or postpartum hemorrhage, ideally within 1 h and never >3 h after injury/onset. Not for GI bleeding. Provider order required."`

#### HS-2 — Permissive hypotension numbers and exceptions (MINOR)
*Quoted:* `"Permissive hypotension (SBP ~80–90 / MAP 50–60) until bleeding controlled in trauma WITHOUT head injury; keep MAP higher with TBI/spinal injury."` ✔ consistent with ATLS/European trauma guidance (SBP 80–90; MAP 50–60 is more aggressive than most). Add: not for >60 y/ neurogenic shock/ pregnancy/ prolonged transport (limits ≤60–90 min); target SBP ≥110 in TBI; avoid in chronic hypertension? and in non-trauma GI bleed (not applicable).

#### HS-3 — Andexanet; reversal agents (MAJOR)
*Quoted:* `"Xa inhibitors → andexanet/PCC"` and Meds `"Reversal agents (PCC, vitamin K, protamine, idarucizumab, andexanet)"`.
*Issue:* Andexanet alfa (Andexxa) was voluntarily withdrawn from the US market effective 22 Dec 2025 after FDA's safety communication about thromboembolic events [checked]. Verify availability locally/non-US. 4-factor PCC (25–50 units/kg, per local protocol) is the alternative.
*Corrected:* `"Xa inhibitors (apixaban/rivaroxaban): 4F-PCC per pharmacy protocol (andexanet no longer available in US). Warfarin: 4F-PCC + vitamin K 5–10 mg IV. Dabigatran: idarucizumab 5 g. Heparin: protamine (1 mg per 100 units, max 50 mg)."*

#### HS-4 — ATLS class table caveats (MINOR)
*Quoted:* `"Blood loss class: I <15% · II 15–30% (↑HR) · III 30–40% (↓BP) · IV >40% (obtunded)"` ✔ (ATLS). ATLS 11th ed. may refine; and beta-blocker/elderly/athletes/pregnancy mask tachycardia — add. Use shock index ≥1.0 or ABC score caution. The card's "shock index >0.9–1.0" ✔.

#### HS-5 — Whole blood, ratio and MTP trigger (SUGGESTION)
*Quoted:* `"balanced 1:1:1 (pRBC : plasma : platelets)"` ✔ (PROPPR). Low-titer O whole blood is now used by many centres; recommend "per MTP". `"MTP if >~4 U pRBC/h expected"` ✔ as a rough guide; use ABC/shock index per facility. Calcium: `"calcium chloride 1 g or gluconate 3 g"` ✔; target iCa >1.1 ✔. Fibrinogen threshold `"<150–200 mg/dL"` ✔ (European guideline 1.5–2 g/L).

#### HS-6 — Crystalloid volumes (MINOR)
*Quoted:* `"limit crystalloid (≤1 L)"` ✔ (ATLS) and Meds `"Crystalloid warmed bolus 250–500 mL for non-hemorrhagic hypovolemia, reassess (1–2 L total typical)"`. For non-hemorrhagic hypovolemia in ICU: individualise (SSC 2026 dynamic assessment; 250–500 mL boluses ✔). Fine; label clearly that hemorrhage ≠ hypovolemia and do not give crystalloid boluses while waiting for blood.

#### HS-7 — Warfarin reversal and cirrhosis (SUGGESTION)
`"warfarin → 4-factor PCC + vitamin K"` ✔. Add that FFP is second-line when PCC unavailable; avoid protamine overdose; in coagulopathy of trauma, early fibrinogen replacement.

**Verified correct:** permissive hypotension concept; MTP 1:1:1; calcium; lethal triad; class I–IV percentages; pelvic binder; hypothermia <35 °C; K↑ with massive transfusion; warfarin/dabigatran reversal.

### 5.16 Acute ischemic stroke
Compared to: 2026 AHA/ASA Early Management of AIS (Jan 2026) [checked at society/summary level]; 2019 AHA/ASA [from knowledge].

#### IS-1 — No thrombolysis eligibility/exclusion screen (MAJOR)
*Quoted:* `"Lysis (if eligible; provider decision): alteplase 0.9 mg/kg (max 90 mg; 10% bolus, remainder over 60 min) or tenecteplase 0.25 mg/kg (max 25 mg) single bolus per facility protocol."` and `"Record last anticoagulant/antiplatelet dose and time (affects lysis eligibility)."`
*Issue:* "Eligible" is never defined. The nurse gathers the data that determines eligibility, so the card should list what to check and the cut-offs the provider will use. Missing (AHA/ASA 2019; 2026 update retains most [checked at summary level, details uncertain]): glucose <50 mg/dL; platelets <100,000; INR >1.7 / aPTT >40 s / PT >15 s; therapeutic LMWH within 24 h; DOAC within 48 h (unless normal renal function and normal specific assays); major surgery or serious trauma within 14 d (3 mo for head trauma/prior stroke); GI/GU bleeding within 21 d; prior ICH; intracranial neoplasm/AVM; BP persistently >185/110; suspected aortic arch dissection; infective endocarditis; CT with extensive hypodensity; symptoms suggesting SAH.
*Corrected:* add a "Before lysis checklist (nurse to gather; provider decides)": `"Time LKW · weight (measured) · BP <185/110 · glucose ≥50 · platelets/INR (do not wait for results unless anticoagulants/bleeding disorder suspected) · last DOAC/LMWH/warfarin · recent surgery/trauma/GI bleed · prior ICH."*

#### IS-2 — 2026 update: tenecteplase, extended window, disabling deficit (MINOR)
*Quoted:* `"Thrombolysis window ≤4.5 h from LKW; thrombectomy up to 24 h"`; `"tenecteplase 0.25 mg/kg (max 25 mg) single bolus"` ✔.
*Issue:* 2026 guideline: tenecteplase (0.25 mg/kg, max 25 mg) and alteplase (0.9 mg/kg, max 90 mg) both COR 1 within 4.5 h; thrombolysis for any *disabling* deficit regardless of NIHSS; IV thrombolysis beyond 4.5 h/unknown onset (to ~9 h) with advanced imaging; thrombectomy window extended with imaging selection including large core [checked]. Replace "≤4.5 h" with "≤4.5 h (longer with advanced imaging per stroke team)" so that nurses do not exclude eligible patients by LKW alone.

#### IS-3 — Post-lysis/post-EVT BP and monitoring (MINOR)
*Quoted:* `"BP management: if lysis candidate keep BP <185/110 before and <180/105 for 24 h after."` ✔ (unchanged in 2026 [checked]). Add post-thrombectomy BP: current practice/2026: avoid intensive lowering to SBP <140 after EVT (possibly harmful) [checked]; individualised target by stroke team (often ≤180/105). `"permissive HTN: treat only if >220/120 (lower ≈15% in first 24 h)"` ✔ (2019). Monitoring `"neuro checks + BP q15 min ×2 h, q30 min ×6 h, then q1h ×16 h"` ✔.

#### IS-4 — Thrombolysis complication handling absent (MINOR)
*Quoted:* `"!STOP lysis infusion & stat CT if: severe headache, N/V, new neuro decline, acute hypertension, bleeding"` ✔. Missing the treatment for symptomatic ICH after alteplase (cryoprecipitate 10 units, TXA 1 g or aminocaproic acid 4–5 g per local protocol) and for orolingual angioedema (airway: HOB up, early airway evaluation/intubation readiness, methylprednisolone/diphenhydramine/famotidine, epinephrine IM for progression, hold ACE-i; icatibant/C1-INH variable) [from knowledge – verify]. The card mentions angioedema only as a monitoring item.

#### IS-5 — Glucose threshold inconsistency (MINOR)
`"POINT-OF-CARE GLUCOSE (treat if <60 mg/dL)"` (AHA/ASA 2019: treat <60) ✔ per guideline; the Hypoglycemia card and Seizure card use <70. Pick context-labelled thresholds (X-5). Monitor goal `"Glucose 140–180"` ✔ (note 2026 emphasis on less aggressive glycemic lowering; avoid <140 hypoglycemia) [checked, secondary].

#### IS-6 — Aspirin/antithrombotic timing (MINOR)
*Quoted:* `"Aspirin 160–325 mg within 24–48 h (after lysis exclusion/24 h post lysis)"`; `"aspirin usually delayed ≥24 h after lysis"` ✔. Add: dysphagia → PR/NG; for minor stroke/TIA (NIHSS ≤3) dual antiplatelet (aspirin + clopidogrel, 21 days) per neurology (CHANCE/POINT) [from knowledge – verify] — not a nurse action but "expect" order.

#### IS-7 — Head-of-bed (SUGGESTION)
`"Head-of-bed per order/protocol (elevate if aspiration or ↑ICP risk)"` ✔ (HeadPoST: flat vs 30° no difference). Fine.

#### IS-8 — Door-to-imaging goal (SUGGESTION)
`"goal door-to-CT ≤25 min"` — AHA/ASA 2019 recommends imaging within 20 min of arrival (door-to-needle ≤60 min; ≤45 min as a quality goal) [from knowledge – verify]. Change to "≤20 min (≤25 min acceptable)" or cite local policy.

#### IS-9 — "In ICU/post-op: new deficit in any pt = stroke until proven otherwise" (SUGGESTION)
Correct, but in the ICU patient on anticoagulation/post-procedure the first step is a stroke alert + glucose + hemorrhage exclusion; mimics such as hypotension, sepsis, hyponatremia, drug effect should be added. Add NIHSS.

**Verified correct:** alteplase and tenecteplase dosing; BP thresholds; nicardipine 5 mg/h titrate 2.5 mg/h q5–15 min max 15 mg/h; swallow screen before oral intake; repeat CT at 24 h; avoid invasive lines/IM 24 h; malignant edema day 2–4.

### 5.17 Intracranial hemorrhage / increased ICP
Compared to: AHA/ASA ICH 2022; AHA/ASA aSAH 2023; BTF TBI 4th ed. (2016, with 2020 update); NCS Emergency Neurological Life Support; ICP consensus [all from knowledge – verify; not re-fetched].

#### IC-1 — Three diseases, three BP/CPP targets in one card (MAJOR)
*Quoted:* `"BP: ICH acute — typical SBP target ~140 (range 130–150); avoid SBP <130 and big swings… Maintain CPP 60–70 if ICP monitored."`; `"SAH: secure aneurysm; … BP control before securing"`; Glance: `"Sudden severe headache… → STAT CT"`; Recognize combines ICH/SAH/ICP.
*Issue:* ICH (SBP 130–150, avoid <130), aSAH (no numeric target in the card; common practice SBP <160 before securing, avoid hypotension; after securing, avoid hypotension for vasospasm), ischemic stroke (permissive), severe TBI (SBP ≥100–110 mmHg per BTF depending on age; ICP/CPP 60–70) and intracranial hypertension from other causes demand different BP management. A nurse reading a single bullet "SBP 140" could lower pressure in a TBI patient with raised ICP (CPP falls) or in vasospasm.
*Corrected:* split into (a) Spontaneous ICH, (b) aSAH, (c) Severe TBI/↑ICP; or insert `"SBP target depends on diagnosis — ICH 130–150 (avoid <130); aSAH <160 until aneurysm secured (verify local), then avoid hypotension; severe TBI SBP ≥100–110, CPP 60–70 — do NOT lower BP for raised ICP; call neuro."*

#### IC-2 — Nimodipine route (MAJOR)
*Quoted:* `"nimodipine 60 mg q4h PO/NG (hold/split if hypotension)"`; Meds `"Nimodipine 60 mg q4h (SAH)"`.
*Issue:* Dose ✔ (60 mg q4h, or 30 mg q2h). The risk is the capsule/liquid being drawn up and given **IV** (deaths and severe hypotension/cardiovascular collapse; FDA boxed warning). The Meds line lacks any route.
*Corrected:* `"Nimodipine 60 mg ENTERAL (PO/NG) q4h ×21 days — NEVER IV. If SBP <100 or MAP drops: call provider; split 30 mg q2h per order. Use oral syringe (not IV syringe) and label."`

#### IC-3 — Andexanet listed (MAJOR)
*Quoted:* `"Xa inhibitors → andexanet/PCC"`; Meds `"Reversal: 4F-PCC, vitamin K 10 mg IV, idarucizumab 5 g, andexanet alfa, protamine"`.
*Issue:* Withdrawn from the US market effective 22 Dec 2025 [checked]. In ICH, 4F-PCC is the alternative (AHA ICH 2022 listed andexanet or 4F-PCC for factor Xa inhibitors, [from knowledge]). Verify non-US availability. Also add PCC dose range (25–50 units/kg or fixed 2000 units per local), and vitamin K 10 mg IV ✔, protamine 1 mg per 100 units heparin (max 50 mg) ✔.

#### IC-4 — Platelet transfusion for antiplatelet-associated ICH (MINOR)
*Quoted:* `"thrombocytopenia/antiplatelets → per neurosurgery"`. PATCH trial: platelet transfusion in antiplatelet-associated ICH not undergoing surgery increased death/dependence; AHA 2022: platelet transfusion for antiplatelet-associated ICH not recommended unless surgery (with DDAVP considered) [from knowledge – verify]. State: `"Do not give platelets for antiplatelet-associated ICH unless neurosurgery orders for a procedure."`

#### IC-5 — Hyperosmolar therapy details/conflicting Na limits (MINOR)
*Quoted:* `"Maintain Na 140–155 (target per provider)"` vs `"Na q4–6h with hypertonic saline (stop if >155–160)"`; `"23.4% saline 30 mL via central line over 10–20 min (or 3% saline 250 mL bolus), or mannitol 0.25–1 g/kg IV over 15–20 min"`; `"serum osm if mannitol (hold if osm >320 or renal failure)"`.
*Issue:* The Na ceiling conflicts (155 vs 160); doses ✔ (23.4% 30 mL; 3% 250 mL; mannitol 0.25–1 g/kg) but 23.4% requires central access, pharmacy double-check, slow push; mannitol causes osmotic diuresis/hypovolemia — replace UOP with isotonic fluid; hold for osm gap >20 and AKI. HTS target Na 145–155 (up to 160 in refractory) per neurocritical order; also avoid correcting chronic hyponatremia too fast.
*Corrected:* `"Hold hypertonic saline if Na >155 (>160 refractory per intensivist); Na rise ≤ 8–10 mmol/L per 24 h unless herniation; replace mannitol-related urine losses with isotonic saline."`

#### IC-6 — Fluids in ICP and Cushing's sign wording (MINOR)
No statement that **only isotonic fluids** (0.9% saline/balanced per neurosurgery; avoid hypotonic D5W/LR hypotonic in cerebral edema; SSC 2026 uses saline in TBI [checked]) should be used; add "never D5W/hypotonic fluids". Add: normoglycemia, fever control (each °C ↑ metabolic demand), avoid jugular compression, sedation first ("RASS −3 acceptable"), avoid hyperventilation >30–35 except herniation bridge ✔ (present).

#### IC-7 — Seizure prophylaxis & anticonvulsant (MINOR)
*Quoted:* `"Levetiracetam if seizure (or prophylaxis per neurosurgery)"`. AHA 2022 does not recommend prophylactic anticonvulsants in ICH (clinical seizures treated; continuous EEG for depressed mental status); TBI: levetiracetam or phenytoin for 7 days is BTF standard; SAH: avoid phenytoin [from knowledge – verify].

#### IC-8 — Surgical/EVD escalation triggers (MINOR)
Add: ICH cerebellar hemorrhage >3 cm or brainstem compression/hydrocephalus → urgent neurosurgery (AHA 2022); IVH with hydrocephalus → EVD; GCS ≤8 → intubate ✔; EVD level `"at tragus (external auditory meatus)"` ✔ (tragus level approximates the foramen of Monro); "clamp when moving or lying position change" ✔; "never open the EVD above ordered height or drain without an order".

#### IC-9 — "Intubate for GCS ≤8", RSI haemodynamics (SUGGESTION)
*Quoted:* `"GCS ≤8 or deteriorating → intubate (RSI with minimal hemodynamic swings)"` ✔ (avoid hypoxia/hypotension, use ketamine/etomidate/propofol per provider; avoid succinylcholine only in ↑K). Mild.

#### IC-10 — DI & Na monitoring (SUGGESTION)
`"UOP (DI with SAH/TBI — hourly UOP and Na)"` ✔. Add cerebral salt wasting in SAH (hypovolemic hyponatremia; do not fluid restrict) and desmopressin per order; Na goal ≥135 in SAH.

**Verified correct:** HOB 30°; ICP threshold 22 mmHg (BTF 4th ed.); CPP 60–70; PaCO₂ 35–45 with brief 30–35 for herniation; nicardipine 5–15 mg/h; clevidipine 1–21 mg/h; vitamin K 10 mg IV; idarucizumab 5 g; vasospasm days 3–14 (typically 4–14).

### 5.18 Diabetic ketoacidosis
Compared to: ADA/EASD/JBDS/AACE/DTS 2024 Hyperglycemic Crises consensus [checked, summary level]; ADA 2009 [the thresholds the app actually uses].

#### DK-1 — Potassium thresholds and replacement rate (MAJOR)
*Quoted:* `"Check K+ BEFORE insulin: K <3.3 → hold insulin and replace K first"`; `"K <3.3 → HOLD insulin; give 20–30 mEq/h KCl until K ≥3.3. K 3.3–5.0 (5.2) → add 20–30 mEq to each liter IV fluid"`; Escalate `"K <3.3 or >5.5"`.
*Issue:* ADA 2009 (K <3.3) is superseded by the 2024 consensus: if K <3.5 mmol/L → **hold insulin**, replace K (≈10 mmol/h; faster only with continuous ECG and central line, as 20–30 mEq/h through a peripheral line burns/arrhythmias) until K >3.5; K 3.5–5.0 give 10–20 mmol/h to keep 4–5; K >5.0–5.2 no K [checked, summary level]. The app's cut-offs differ (3.3 vs 3.5) and are internally inconsistent (K thresholds: 5.0, 5.2, 5.5 in different lines). 20–30 mEq/h is high-risk if infused peripherally.
*Corrected:* `"K <3.5: HOLD insulin; give KCl ~10 mEq/h (central line + continuous ECG if >10 mEq/h) until K ≥3.5, then start insulin. K 3.5–5.0: add 20–30 mEq/L fluid (≈10–20 mEq/h); K >5.0: no K, recheck q2h."*

#### DK-2 — Bicarbonate threshold (MINOR)
*Quoted:* `"Bicarbonate only if pH <6.9 (per provider)"`; Escalate `"pH <7.0"`. 2024 consensus: routine bicarbonate not recommended; consider only if pH <7.0 (with hemodynamic compromise or hyperkalemic arrhythmia) [checked]; ADA 2009 used <6.9. Harmonise to <7.0 and add "(100 mmol in 400 mL sterile water over 2 h only on order, with K monitoring)". The meds/glance numbers conflict (6.9 vs 7.0).

#### DK-3 — Diagnostic and resolution criteria (MINOR)
*Quoted:* `"Glucose usually >250 mg/dL… pH <7.30, HCO₃ <18, anion gap ↑, ketones +"`; resolution `"glucose <200 AND ≥2 of: HCO₃ ≥15–18, pH >7.3, AG ≤12 (or ketones <0.6)"`.
*Issue:* 2024 consensus: DKA = glucose ≥200 mg/dL (or prior diabetes) **and** BHB ≥3.0 mmol/L (or urine ketones ≥2+) **and** pH <7.3 and/or HCO₃ <18; resolution = BHB <0.6 mmol/L **and** (pH ≥7.3 or HCO₃ ≥18) [checked, summary level]. The app's "glucose <200" for resolution is outdated (resolution does not depend on glucose); the 2009 AG ≤12 criterion is unreliable with hyperchloremia. Also euglycemic DKA (SGLT2i) is mentioned ✔.
*Corrected:* `"Resolution: ketones (BHB) <0.6 mmol/L AND (pH ≥7.3 or HCO₃ ≥18). Do not stop insulin on glucose alone; give SC basal insulin and continue IV insulin 1–2 h overlap."`

#### DK-4 — Fluid volume and regimen (MINOR)
*Quoted:* `"isotonic crystalloid … 15–20 mL/kg (≈1–1.5 L) in first hour; then 250–500 mL/h"` ✔ (ADA 2009; 2024: 500–1000 mL/h for first 2–4 h with hemodynamic guidance, balanced crystalloid preferred). Add: caution in HF/CKD; avoid >50 mL/kg/4 h in children (not relevant). Insulin `"0.1 unit/kg/h (± 0.1 unit/kg bolus) or 0.14 unit/kg/h"` ✔; 2024 recommends fixed-rate 0.1 U/kg/h (no bolus) and, if glucose does not fall by ≥3 mmol/L/h (~50 mg/dL), double rate ✔ partially.

#### DK-5 — Dextrose rule (MINOR)
*Quoted:* `"add dextrose when glucose <250 (200–250)"` ✔ (2024: add dextrose when glucose <250 mg/dL, 10% dextrose) and `"never stop insulin until gap closes"`: accept, but "gap" is replaced by ketones (DK-3). The statement `"↓ rate to 0.02–0.05 units/kg/h only per protocol"` ✔ (2024: reduce to 0.05 U/kg/h when glucose <250 per protocol).

#### DK-6 — Cerebral edema statement and phosphate (MINOR)
`"cerebral edema: headache, drop in GCS, bradycardia (more in kids)"` ✔ (rare in adults). Phosphate `"if <1.0 mg/dL or cardiac dysfunction/hypoxia"` ✔ (ADA 2009; 2024: <0.32 mmol/L i.e. ~1.0 mg/dL ✔). Corrected sodium formula `Na + 1.6 × [glucose − 100]/100` ✔ (some use 2.4 at glucose >400; minor).

#### DK-7 — HHS missing (MAJOR)
Hyperosmolar hyperglycemic state is not covered at all though the DKA card says nothing about it. Dosing differs (slower correction, osm, fluid first, insulin delayed until fluids; mortality higher).

**Verified correct:** check K before insulin; insulin infusion 0.1 U/kg/h; hourly glucose; dextrose add-on; SC insulin overlap; phosphate and bicarbonate as "only if"; SGLT2i euglycemic DKA; K total-body depletion.

### 5.19 Severe hypoglycemia

#### HG-1 — Thresholds & title (MINOR)
*Quoted:* title `"Severe hypoglycemia"` with glance `"Glucose <70 mg/dL (<54 clinically significant)"`. ADA/IHSG: level 1 <70, level 2 <54, level 3 severe = any glucose with altered mentation requiring assistance. In ICU, many protocols treat <70–80 with dextrose. Retitle "Hypoglycemia (ICU)" and show levels.

#### HG-2 — Don't stop insulin in DKA/HHS; D50 harm (MINOR)
*Quoted:* `"STOP insulin"`; `"Stop/pause insulin infusion"`. Correct for iatrogenic hypoglycemia; add that in DKA the insulin infusion is paused only for glucose <70 with dextrose given and restarted early (ketosis persists). D50 extravasation/hypertonicity: central or large vein preferred; D10 125–250 mL ✔ safer; quoted doses ✔ (D50 25 g = 50 mL).

#### HG-3 — Thiamine sequencing (MINOR)
*Quoted:* `"Alcohol/malnutrition: give thiamine 100 mg IV with/before dextrose."` Dextrose must not be delayed for thiamine in symptomatic hypoglycemia (risk of Wernicke is small): `"give dextrose immediately; give thiamine concurrently or immediately after."`

#### HG-4 — Octreotide frequency (SUGGESTION)
*Quoted:* `"octreotide 50 mcg SC/IV q6h per provider"` (actions) vs `"q6–12h"` (meds). Harmonise to "50 mcg SC/IV q6h (per toxicology/pharmacy)". Sulfonylurea recurrent hypoglycemia up to 24+ h ✔.

#### HG-5 — Glucagon efficacy and dosing (SUGGESTION)
`"glucagon 1 mg IM/SC (or 3 mg intranasal)"` ✔; `"Glucagon 1 mg IM/SC/IV"` in Meds ✔ IV allowed. Warn: ineffective in glycogen-depleted states ✔ present; nausea/vomiting after. Also advise "do not give glucagon to treat sulfonylurea hypoglycemia as primary therapy".

#### HG-6 — Monitoring (SUGGESTION)
`"Glucose q15 min until >70 ×2, then q1h ×4–6h"` ✔. Rebound hyperglycemia after D50 ✔. Add 'avoid hyperglycemia >180 overshoot'.

**Verified correct:** D50 25 g; D10; 15–20 g carbohydrate; 15-min recheck; glucagon IM 1 mg; sulfonylurea octreotide 50 mcg; thiamine 100 mg.

### 5.20 Hyperkalemia
Compared to: UK Kidney Association / Renal Association Hyperkalaemia Guideline 2020 (cited); KDIGO conference 2020; AHA 2025 (arrest) [checked for arrest].

#### HK-1 — Insulin/dextrose hypoglycemia risk and glucose dose (MINOR)
*Quoted:* `"regular insulin 10 units IV + dextrose 25 g (D50 50 mL). Use 5 units (or more dextrose) if renal failure/low baseline glucose."` ✔ . Lowest-hypoglycemia approach: 5 units, dextrose 50 g if baseline glucose <250 (renal failure/low weight), and glucose checks q1h ×6 h (hypoglycemia up to 6 h later, most cases). The statement "q30–60 min × 4–6 h" ✔. Add "if baseline glucose ≥250: no dextrose needed".

#### HK-2 — Bicarbonate and calcium compatibility (MINOR)
*Quoted:* `"Sodium bicarbonate 50–150 mEq IV if acidotic (pH <7.2 / HCO₃ low); less effective alone."` Evidence for bicarbonate acutely lowering K is weak (benefit mainly with metabolic acidosis). Add 'Do not mix with calcium in the same line (precipitates)'. 50–150 mEq: ok per ACLS-era; UK guideline: 500 mL of 1.26% bicarbonate over 15 min if acidotic — local protocol.

#### HK-3 — Calcium dose and rhythms (MINOR)
*Quoted:* `"calcium gluconate 10% 1–3 g (10–30 mL) IV over 5–10 min (or calcium chloride 1 g via central/good IV). Repeat in 5 min if ECG still abnormal. Lasts 30–60 min."` ✔ (UK: 30 mL 10% gluconate over 10 min, repeat if ECG persists at 5–10 min). Add: calcium chloride 1 g ≈ calcium gluconate 3 g; extravasation (vesicant); digoxin toxicity is a caution (Ca in digoxin toxicity is traditionally cautioned; current data suggests safety, but follow provider) [uncertain].

#### HK-4 — Sodium polystyrene sulfonate and binders (MINOR)
*Quoted:* `"sodium zirconium cyclosilicate 10 g PO or patiromer; sodium polystyrene as alternative."` SPS: slow/unreliable and associated with intestinal necrosis (avoid in post-op ileus/bowel obstruction); patiromer onset ~7 h (not for acute); SZC 10 g TID up to 48 h ✔ (onset ≈1 h). Add 'Furosemide only if making urine and not volume depleted'.

#### HK-5 — Staging and dialysis triggers (MINOR)
*Quoted:* `"mild 5.5–5.9 · moderate 6.0–6.4 · severe ≥6.5"` ✔ (UK Renal Association). `"K ≥6.5 = EMERGENCY"`; add "rapid rise (>0.5 mmol/L/h), rhabdo/tumor-lysis, ECG changes at any K". Dialysis triggers fine.

#### HK-6 — Arrest wording (MINOR)
See CA-1: `"Cardiac arrest: calcium + bicarbonate + insulin/dextrose per ACLS"` → "for suspected hyperkalemia as cause: calcium IV (AHA 2025 permits when suspected), bicarbonate/insulin–dextrose reasonable".

#### HK-7 — Albuterol caution (SUGGESTION)
`"Albuterol 10–20 mg nebulized over 10 min (avoid if active ischemia/tachyarrhythmia)"` ✔ (10–20 mg neb is standard; ICU nebs of 20 mg require continuous neb systems/large reservoirs). Mention that ~20% of patients (especially ESRD) are poor responders.

**Verified correct:** staging; peaked T → wide QRS progression; calcium first; insulin 10 units/5 units; albuterol 10–20 mg; SZC 10 g; recheck K in 1–2 h; rebound at 2–4 h; hemolyzed sample pseudohyperK.

### 5.21 Acute kidney injury
Compared to: KDIGO AKI 2012 [from knowledge — newer KDIGO AKI update not verified]; SSC 2026 (RRT timing) [checked].

#### AK-1 — KDIGO staging incomplete (MINOR)
*Quoted:* `"Stage 1: 1.5–1.9× · Stage 2: 2.0–2.9× · Stage 3: ≥3× or Cr ≥4 or RRT or UOP <0.3 mL/kg/h ×24 h / anuria ×12 h"`.
*Issue:* Stage 1 also includes Cr rise ≥0.3 mg/dL (within 48 h) and UOP <0.5 mL/kg/h for 6–12 h; Stage 2 includes UOP <0.5 mL/kg/h for ≥12 h; Stage 3 includes Cr ≥4.0 mg/dL (with acute rise ≥0.3 or ≥1.5×) ✔ . Also "Cr ↑0.3 in 48 h" ✔ appears in the glance. Add UOP rows.
*Corrected:* `"Stage 1: Cr 1.5–1.9× baseline OR ↑≥0.3 mg/dL OR UOP <0.5 mL/kg/h for 6–12 h. Stage 2: 2.0–2.9× OR UOP <0.5 for ≥12 h. Stage 3: ≥3× OR Cr ≥4.0 OR RRT OR UOP <0.3 for ≥24 h OR anuria ≥12 h."*

#### AK-2 — Vancomycin "trough" outdated (MINOR)
*Quoted:* `"Hold/avoid nephrotoxins: NSAIDs, IV contrast, aminoglycosides, vanco trough, ACE-i/ARB, diuretics"`; Monitor `"Drug levels (vancomycin, aminoglycosides)"`. Wording "vanco trough" is cryptic; 2020 ASHP/IDSA/PIDS/SIDP vancomycin guideline recommends AUC-guided dosing (AUC/MIC 400–600) rather than trough 15–20 [from knowledge – verify]. Also vancomycin + piperacillin-tazobactam AKI signal. Rephrase "vancomycin (use AUC dosing; avoid high troughs); aminoglycosides".

#### AK-3 — MAP in chronic HTN and fluids (MINOR)
*Quoted:* `"Support MAP ≥65 (higher e.g., 70–80 in chronic HTN per provider)"` — SEPSISPAM (MAP 80–85 in chronic HTN had less RRT, but more AF, no mortality benefit), SSC 2026 MAP 65 strong [checked]. Phrase "per provider" ok. `"Hypovolemic → balanced crystalloid bolus 250–500 mL"` ✔.

#### AK-4 — Dialysis indications & timing (MINOR)
*Quoted:* `"Dialysis indications — A.E.I.O.U.…"` ✔. Add: no benefit of early/accelerated RRT in the absence of urgent indication (STARRT-AKI, AKIKI-2); SSC 2026 recommends against RRT initiation for AKI without definitive indication [checked]; hyperkalemia ≥6.5 refractory, pH <7.15 ✔. The escalation `pH <7.2` is ok.

#### AK-5 — Missing key AKI syndromes (MINOR)
Hepatorenal syndrome (albumin + terlipressin/norepinephrine), rhabdomyolysis (CK >5000; fluids), abdominal compartment syndrome (bladder pressure >20 + organ dysfunction), contrast, tumor lysis, obstruction ✔ (bladder scan). Add 'Do not give furosemide to "make urine" in prerenal state' ✔ (present in Meds).

#### AK-6 — Contrast/NSAID wording (SUGGESTION)
`"IV contrast"` as an avoidable nephrotoxin is conditional: never withhold needed contrast (e.g., CTPA/stroke CTA) due to AKI risk alone — the app tells nurses to "avoid" IV contrast in AKI, which risks delaying PE/stroke diagnosis. Change to 'discuss with provider; do not delay emergent imaging'.

**Verified correct:** AEIOU; UOP/stage thresholds as listed; bladder scan; renal ultrasound; loop diuretics not AKI therapy; CRRT citrate/iCa monitoring.

### 5.22 GI bleed (upper / lower)
Compared to: ACG UGIB 2021; Baveno VII; AASLD portal-hypertension guidance 2024; ESGE; SSC for resuscitation [from knowledge – verify].

#### GI-1 — Transfusion thresholds inconsistent (MINOR)
*Quoted:* Glance `"restrictive transfusion (Hgb ~7) unless unstable"`; Actions `"blood for Hgb <7 g/dL (target 7–9; threshold ~8 if CAD)"`; Escalate "need >2–4 units". Variceal: Baveno VII threshold 7, target 7–8 (over-transfusion ↑ portal pressure). ACG UGIB: threshold 7 (8 for CAD). Align: `"Hgb <7 (CAD/active ischemia: <8): transfuse; target 7–9 (variceal 7–8). Unstable/massive: transfuse by hemodynamics, not Hgb."`

#### GI-2 — Coagulopathy correction in cirrhosis (MINOR)
*Quoted:* `"Correct platelets <50 and INR as ordered."` The INR is unreliable in cirrhosis; FFP to "correct INR" worsens portal hypertension/volume; correct platelets <50 only in active bleeding; fibrinogen replacement only for bleeding with low fibrinogen. Add: "Do not correct INR in cirrhosis with FFP unless provider orders (consider viscoelastic testing)"; TXA not helpful (HALT-IT) ✔ present.

#### GI-3 — Antibiotics and octreotide duration (SUGGESTION)
`"ceftriaxone 1 g IV daily"` ✔ (up to 7 days; quinolone allergies...). `"octreotide 50 mcg IV bolus then 50 mcg/h"` ✔ continue 2–5 days. Mention vasopressin alternative (terlipressin) ✔. Lactulose for HE ✔.

#### GI-4 — Blakemore and airway (MINOR)
*Quoted:* `"Refractory variceal bleed: balloon tamponade (Blakemore) – keep scissors at bedside; TIPS/surgery."` Blakemore requires prior **intubation** (aspiration, discomfort), traction/pressure limits (gastric balloon 250 mL then up to 500; esophageal 30–45 mmHg), maximum 24 h; scissors at bedside for emergent deflation ✔. Early (pre-emptive) TIPS (within 72 h) for Child-Pugh B with active bleeding/C 10–13 per Baveno VII — escalate to hepatology. State: `"Intubate before balloon; maximum 24 h."`

#### GI-5 — PPI regimen & erythromycin (SUGGESTION)
`"pantoprazole 80 mg IV bolus then infusion 8 mg/h or 40 mg IV q12h"` ✔ (ACG: intermittent is non-inferior; high-dose after endoscopic therapy). Erythromycin `"250 mg IV 30–120 min before endoscopy"` ✔ (QT-prolonging; check QTc). Timing `"Endoscopy within 24 h (variceal: within 12 h)"` ✔.

#### GI-6 — Lower GI bleeding (SUGGESTION)
Brief; add 'unstable LGIB: CT angiography first (not colonoscopy) ; massive transfusion; consider upper source (BUN/Cr)'. OK as-is for scope.

#### GI-7 — Anticoagulant/antiplatelet management (SUGGESTION)
`"Stop/hold anticoagulants, antiplatelets, NSAIDs; reverse per provider if life-threatening"` ✔. Add: do not stop aspirin for secondary prevention in coronary stents without cardiology; andexanet note (see HS-3).

**Verified correct:** large-bore IVs; PPI dosing; octreotide dosing; ceftriaxone 1 g; endoscopy timing; erythromycin; TXA not routine; BUN:Cr; Hgb lag.

### 5.23 Cardiac tamponade
Compared to: ESC pericardial diseases 2015; ACC/AHA; CALS/STS expert consensus [from knowledge – verify].

#### TM-1 — Aortic dissection hemopericardium: pericardiocentesis hazard not stated (MAJOR)
*Quoted:* `"Causes: malignancy, post-cardiac surgery/procedure, trauma, aortic dissection, MI free-wall rupture…"`; `"Definitive: pericardiocentesis or surgical drainage"`; `"Prepare for pericardiocentesis (echo-guided)…"`; Escalate: `"Any hypotension with suspected tamponade → emergent drainage (do not wait for CT)"`.
*Issue:* In type A aortic dissection with hemopericardium and in MI free-wall rupture, percutaneous drainage can precipitate re-bleeding and rapid death; definitive therapy is emergent surgery (minimal-volume drainage only as a bridge by surgeon). A nurse could prepare/push for pericardiocentesis alone, and "do not wait for CT" could cause the unstable but surgical patient to be drained in the wrong setting. Also, post-cardiac-surgery tamponade is often **localized/clot** (TTE non-diagnostic; TEE needed) and requires reopening, not needle drainage.
*Corrected:* `"!Tamponade after cardiac surgery, aortic dissection, or MI rupture → call cardiac surgery NOW — needle pericardiocentesis is usually NOT the treatment (re-exploration/surgical drainage). Needle drainage is for cancer, uremic, idiopathic, post-catheter lab effusions."`

#### TM-2 — "Milk/strip chest tubes" (MINOR)
*Quoted:* `"Post-cardiac surgery with chest tubes: milk/strip per protocol and notify surgeon; do not assume tubes are working."` Routine milking/stripping is discouraged in most guidelines (high negative pressure, no proven benefit) — acceptable only per unit protocol for suspected clot in the tube; the sudden stop of drainage with hypotension is a surgical emergency. Rephrase: `"Sudden drop in chest tube output + falling BP/rising CVP = suspect tamponade: call surgeon. Do not rely on stripping to 'fix' it."`

#### TM-3 — Fluid and ventilation advice (MINOR)
*Quoted:* `"Support preload: IV crystalloid bolus 250–500 mL (repeat once if responsive) as a temporizing bridge."` ✔ (temporising only; fluids help only if hypovolemic; ESC states volume loading may be harmful if CVP already high). `"intubation … ketamine & ready pressors"` ✔. Add 'avoid PEEP and large tidal volumes'. 'Position of comfort' ✔.

#### TM-4 — Diagnostic signs (SUGGESTION)
`"Beck's triad"`, `"pulsus paradoxus (inspiratory SBP drop >10 mmHg)"` ✔; add that pulsus paradoxus is **absent** in positive-pressure ventilation, hypotension, RV hypertrophy, regional tamponade; and echo signs `"RA/RV diastolic collapse, plethoric IVC"` ✔.

**Verified correct:** pulsus >10 mmHg; electrical alternans; avoid diuretics/vasodilators; reversal of anticoagulation; resternotomy kit; CALS mention.

### 5.24 Alcohol withdrawal / delirium tremens
Compared to: ASAM Alcohol Withdrawal Management Guideline 2020 [from knowledge – verify]; SCCM PADIS 2018.

#### AW-1 — Thiamine dose and Wernicke (MINOR)
*Quoted:* `"THIAMINE 100 mg IV/IM (or higher per provider)"`; Meds `"Thiamine 100 mg IV (higher doses if Wernicke)"`. Suspected Wernicke encephalopathy: thiamine 500 mg IV TID ×2–3 days then 250 mg daily (RCP/EFNS-style) [from knowledge – verify]; 100 mg is prophylaxis. Make the high-dose regimen explicit in the escalation line `"suspected Wernicke"`.

#### AW-2 — CIWA-Ar limits (MINOR)
*Quoted:* `"Score CIWA-Ar q1h"`, `"Symptom-triggered benzodiazepine… Typical target RASS 0 to −1"`. CIWA-Ar requires a communicative patient — unreliable in delirium, intubated or sedated patients (use RASS/ICU withdrawal protocol); ASAM recommends symptom-triggered regimens in monitored settings and fixed-dose/front-loading in severe/ICU withdrawal. Add this limitation and that CIWA >15 / history of DTs/seizures merits scheduled dosing.

#### AW-3 — Benzodiazepine dosing safety and resistant definition (MINOR)
*Quoted:* `"lorazepam 1–4 mg IV (or diazepam 5–20 mg IV) q5–15 min"`; `"Resistant (>~ 3 doses with poor control or large cumulative dose)"`. ASAM: resistant = >50 mg diazepam (or equivalent) in first hour, or >200 mg in 3 h. Use numeric thresholds; in liver failure/elderly prefer lorazepam. Nurses should confirm cumulative-dose limits and airway readiness; high cumulative doses warrant physician at the bedside.

#### AW-4 — Phenobarbital and adjuncts (MINOR)
*Quoted:* `"phenobarbital (e.g., 130–260 mg IV loading step or weight-based per protocol), adjunct dexmedetomidine (NOT alone), propofol with intubation"`; Meds `"Phenobarbital 130–260 mg IV bolus steps (or 10 mg/kg IBW load per protocol)"`. Both are used in published protocols (130–260 mg repeated; 10 mg/kg IBW over 30 min); respiratory depression and prolonged half-life (80–100 h); avoid combining large benzo + phenobarbital doses without airway plan; contraindicated in porphyria. Haloperidol caution ✔ (QT; lowers threshold).

#### AW-5 — Ammonia order & Wernicke/hypoglycemia screening (SUGGESTION)
*Quoted:* `"ammonia if encephalopathy"` — low-value test (clinical diagnosis of HE); suggest removing. Add: magnesium/phosphate repletion (refeeding) ✔ present; consider alcoholic ketoacidosis, withdrawal seizures (benzodiazepines, not phenytoin).

#### AW-6 — Seizure timing (SUGGESTION)
`"12–48 h: withdrawal seizures"` ✔ (6–48 h). DTs `"48–96 h"` ✔; mortality when untreated ~5–15% ✔ (card lacks number; fine). Mention fever as marker of severity.

**Verified correct:** timeline; benzodiazepine first-line; thiamine before dextrose; avoid restraints; escalation parameters; haloperidol adjunct only.

### 5.25 Overdose / poisoning basics
Compared to: AACT/ AAPCC position statements; ACMT [from knowledge – verify].

#### OD-1 — Charcoal timing inconsistent; indications (MINOR)
*Quoted:* Glance `"Charcoal only if airway protected and within ~1 h"`; Actions `"within 1–2 h"`; Meds `"1 g/kg"`; `"max 50 g"`. AACT/EAPCCT: single-dose AC may be considered within 1 h of a potentially toxic ingestion; later only for sustained-release/anticholinergic/ salicylate with delayed absorption on toxicologist advice. Harmonise to 1 h. Add: do not give in decreased consciousness without airway protection, GI obstruction/ileus, or if endoscopy is planned (caustic).

#### OD-2 — Acetaminophen nomogram timing (MINOR)
*Quoted:* `"Acetaminophen (level at ≥4 h or unknown time/staggered): start N-acetylcysteine per nomogram/provider."` Correct core; refine: if time of ingestion unknown, ingestion >8 h ago with detectable level/elevated ALT, or level not available within 8 h of ingestion → start NAC immediately; do not wait for the 4-h level in a patient presenting >8 h; extended-release → repeat level at 4 h and 8 h.

#### OD-3 — Salicylate poisoning actions are thin (MINOR)
*Quoted:* Escalate: `"Suspected salicylate poisoning — avoid intubation without ventilator planning (loss of respiratory compensation); consider dialysis"`; Meds `"Sodium bicarbonate 1–2 mEq/kg IV (TCA/salicylate)"`.
*Issue:* The warning is excellent (and rare). Missing: bicarbonate infusion target urine pH 7.5–8, serum pH ≤7.55; keep K ≥4; avoid acetazolamide; matched high minute ventilation after intubation; hemodialysis criteria (level >100 mg/dL, AMS, pulmonary edema, renal failure, pH ≤7.20) [EXTRIP, from knowledge – verify]. Add these to the action list.

#### OD-4 — Naloxone dosing and intranasal (MINOR)
*Quoted:* `"naloxone 0.04–0.4 mg IV (titrate q2–3 min to adequate breathing; up to 2 mg total, IM/IN 2–4 mg)"`; Meds `"IN 4 mg; infusion ~2/3 of effective dose per hour"` ✔. Fentanyl/synthetic opioid cases may require higher doses (up to 10 mg); avoid full reversal in chronic opioid users (withdrawal, agitation, pulmonary edema); observe ≥2–3 h (longer for long-acting opioids/methadone) after the last naloxone dose. Add.

#### OD-5 — β-blocker/CCB dosing missing; HIE (MINOR)
*Quoted:* `"β-blocker/CCB: calcium IV, glucagon (β-blocker), high-dose insulin euglycemia, vasopressors — toxicology guidance."` Appropriate ceiling for nurses, but add doses for urgency: glucagon 3–10 mg IV then 3–5 mg/h; calcium chloride 1–3 g or gluconate 3–9 g; HIE: insulin 1 U/kg bolus then 0.5–1 U/kg/h with dextrose and K monitoring (a high-alert drug: must be pharmacy-prepared) [from knowledge – verify]. Add early ECMO/ lipid emulsion when peri-arrest.

#### OD-6 — TCA bicarbonate and QRS (MINOR)
*Quoted:* `"sodium bicarbonate 1–2 mEq/kg IV bolus, repeat to QRS narrowing/pH 7.45–7.55"` ✔ ; `"QRS >100 ms"` ✔ . Add: hypertonic saline alternative; avoid physostigmine; avoid flumazenil; treat hypotension with norepinephrine; avoid class IA/IC antiarrhythmics.

#### OD-7 — Flumazenil, lipid emulsion, others (SUGGESTION)
`"Benzodiazepine overdose: supportive; avoid routine flumazenil"` ✔. `"Intravenous lipid emulsion / dialysis per toxicology"` ✔ (limited evidence; interference with lab analysis). Add acute alcohol overdose, toxic alcohols (fomepizole), organophosphates (atropine titrate to bronchorrhea; pralidoxime), serotonin syndrome/NMS/MH/sympathomimetic hyperthermia (cooling, benzodiazepines, dantrolene/cyproheptadine), carbon monoxide/cyanide ✔ partly in Meds.

#### OD-8 — Escalation thresholds (SUGGESTION)
`"RR <10, GCS ≤8, QRS >100, seizures, hemodynamic instability, hyperthermia >39 °C"` ✔ ; add 'QTc >500', 'sodium-channel/β-blocker/CCB ingestion = admit ICU for 24 h'.

**Verified correct:** poison control number; avoid induced emesis; charcoal exclusions; naloxone titration; TCA bicarbonate; flumazenil caution; acetaminophen/salicylate levels in all intentional ingestions; delayed toxicity items.

---

## 6. app.js observations (safety-relevant rendering only)

* **X-2** persistence (above).
* **GCS calculator has no "T" (intubated verbal) option** though the note says `Verbal = 'T' (score 1T)`; a nurse scoring an intubated patient will either pick "None (1)" (reads as GCS 3+...) or guess. Add "T" with total shown as "x T" and warn the total is not comparable.
* **Code timer** does not prompt "3rd shock → amiodarone" and "second epinephrine/ 2 min rhythm check" beyond epinephrine due; consider prompting 2-min cycle, shocks count, and amiodarone/lidocaine doses (aid, not substitute for recorder).
* **Ordered steps vs concurrency**: actions render as numbered tick items, which implies strict sequence. In arrests, anaphylaxis, tension pneumothorax and stroke many tasks are parallel and a few are time-critical — consider marking time-critical "!" steps at top (already done with "!") and add "do in parallel" label.
* **"!" prefix escalation styling** is a good feature; ensure that high-alert drugs get a distinct "HIGH ALERT" style (X-3).
* **Review status:** `reviewStatus: "NOT YET CLINICALLY REVIEWED"` and the "VERIFY PER FACILITY PROTOCOL" lines are appropriate; keep them until sign-off by a pharmacist, nurse educator, and physician and show `lastReviewed` on every card.

---

## 7. Contested or evolving practices (table)

| Topic | App says | Current stance | Action |
|---|---|---|---|
| Calcium/bicarbonate/Mg in arrest | listed generically | AHA 2025: not routine (Class 3 No Benefit) [checked] | CA-1 |
| Post-arrest TTM duration | ≥24 h | ≥36 h, 32–37.5 °C [checked] | CA-2 |
| NMB in ARDS | P/F <150, deep sedation | ROSE neutral; ATS 2024 selective; ESICM against routine; SSC 2026 intermittent boluses [checked] | AR-1 |
| Recruitment/higher PEEP | rescue | SSC 2026 strong against incremental PEEP titration; ATS 2024 against prolonged RM [checked] | AR-2 |
| Corticosteroids in ARDS | "may be considered" | ATS 2024 suggests; SSC 2026 suggests [checked] | AR-5 |
| Albumin in sepsis | "if large crystalloid volumes" | consistent; avoid in TBI [checked] | SP-4 |
| Fluids 30 mL/kg | fixed | individualised, low certainty [checked] | SP-1 |
| Bicarbonate in DKA | pH <6.9 | pH <7.0 consider only [checked] | DK-2 |
| Bicarbonate in sepsis | not covered | only pH ≤7.2 + AKI 2–3 (SSC 2026) [checked] | add |
| Epinephrine in cardiac-surgery arrest | routine 1 mg | avoid routine (CALS) | CA-5 |
| TXA | "major bleed" | trauma ≤3 h, PPH; not GI bleed | HS-1 |
| IABP/Impella/ECMO in CS | "evaluation" | IABP not routine; Impella selected; VA-ECMO neutral | CS-3 |
| Platelets in antiplatelet ICH | per neurosurgery | avoid unless surgery (PATCH) | IC-4 |
| BP lowering after EVT | not covered | avoid SBP <140 intensive lowering [checked] | IS-3 |
| Andexanet | listed | withdrawn US Dec 2025 [checked] | HS-3, IC-3 |
| NMB for intubation: sux vs roc | both listed | roc 1.2 mg/kg preferred unless contraindicated | RF-6 |
| qSOFA | used as screen element | SSC 2026: not a single screening tool [checked] | QT-2, SP-1 |
| Pre-emptive TIPS | not covered | Baveno VII | GI-4 |
| Hyperkalemia binders | SPS alternative | SZC preferred; SPS safety | HK-4 |

---

## 8. Cross-card terminology/threshold inconsistencies that could produce wrong action
See X-5 (SpO₂ targets; atropine; NE; charcoal; Hgb; glucose; Na; K; RR; bicarbonate pH 6.9 vs 7.0; octreotide frequency; epinephrine infusion unit ranges).

---

## 9. Missing high-yield ICU conditions (priority order)

**Tier 1 (add before release)**
1. **Hyperosmolar hyperglycemic state (HHS)** — differs from DKA (fluids first, slower insulin, osm monitoring, thromboembolism).
2. **Severe asthma / COPD exacerbation (incl. ventilator management of obstructive disease)** — links to RF-1.
3. **Acute decompensated heart failure / cardiogenic pulmonary edema** (NIV, nitrates, diuretics; currently only in shock).
4. **Hypertensive emergency / aortic dissection** (HR before BP: esmolol; SBP 100–120; avoid hydralazine; no anticoagulants/thrombolytics).
5. **Hyponatremia / hypernatremia / severe electrolytes (Mg, Ca, Phos)** — overcorrection (ODS) limits (≤8–10 mmol/L/24 h), 3% saline dosing (100–150 mL bolus for severe symptomatic).
6. **Transfusion reactions (hemolytic, TRALI/TACO, febrile, septic)** and **massive-transfusion complications**.
7. **Post-cardiac-surgery emergencies** (CALS arrest, tamponade, bleeding, vasoplegia) — currently scattered.
8. **Difficult airway / failed intubation / cricothyrotomy** (CICO) .
9. **Delirium/agitation, sedation, withdrawal (opioid/benzo)** — PADIS bundle.
10. **Severe TBI standalone** (BTF), spinal cord injury (neurogenic shock, autonomic dysreflexia).
11. **Acute liver failure / hepatic encephalopathy / hepatorenal syndrome**.

**Tier 2**
12. Hyperthermia syndromes: malignant hyperthermia, NMS, serotonin syndrome, heat stroke; toxic alcohols.
13. Adrenal crisis, myxedema coma, thyroid storm.
14. Guillain–Barré / myasthenic crisis (respiratory monitoring: FVC <20 mL/kg, NIF < −30 cmH₂O).
15. Neutropenic fever, tumor lysis, DIC/HIT/TTP, severe thrombocytopenia.
16. Rhabdomyolysis, abdominal compartment syndrome, burns, hemoptysis, severe hypothermia, obstetric emergencies (eclampsia, PPH, amniotic fluid embolism), refeeding syndrome.
17. Post-ICU: brain death determination/organ donation basics; ECMO nursing basics.

---

## 10. Inventory of numeric values I verified as correct (do NOT change)
PBW formulas (50/45.5 + 2.3 × [in − 60]); VT 6 mL/kg PBW (4–8); Pplat ≤30; driving pressure <15 (suggested); ARDSNet lower-PEEP table values; RR up to 35 in ARDS; proning P/F <150 + FiO₂ ≥0.6 + PEEP ≥5 for ≥12–16 h; Berlin categories; DEXA-ARDS dose; epinephrine 1 mg q3–5; amiodarone 300/150; lidocaine 1–1.5 & 0.5–0.75 mg/kg; adenosine 6/12 (3 central); procainamide 20–50 mg/min (17 mg/kg); atropine 1 mg (max 3); dopamine 5–20; epinephrine infusion 2–10 mcg/min; diltiazem 0.25/0.35 mg/kg; metoprolol 2.5–5 mg; amiodarone AF infusion; digoxin 0.25 mg q2h; IM epinephrine 0.01 mg/kg max 0.5; glucagon 1–5 mg; albuterol 2.5–5 / 10–20 mg; alteplase stroke 0.9 mg/kg (max 90), tenecteplase 0.25 mg/kg (max 25); BP 185/110 and 180/105; nicardipine 5 mg/h q5–15 min 2.5 mg/h max 15; ICP >22; CPP 60–70; 23.4% 30 mL, 3% 250 mL, mannitol 0.25–1 g/kg; vitamin K 10 mg; idarucizumab 5 g; nimodipine 60 mg q4h; lorazepam 0.1 mg/kg (max 4); diazepam 0.15–0.2 mg/kg (max 10); IM midazolam 10 mg; levetiracetam 60 mg/kg (4500); fosphenytoin 20 PE/kg (1500); valproate 40 mg/kg (3000); UFH 80 U/kg + 18 U/kg/h; enoxaparin 1 mg/kg q12h; alteplase PE 100 mg/2 h; SSC lactate/antibiotic/vasopressin/hydrocortisone doses; TXA regimen; calcium 1 g CaCl / 3 g gluconate; hyperK doses (Ca gluconate 1–3 g, insulin 10 U/5 U, albuterol 10–20, SZC 10 g); KDIGO stage 3 criteria; pantoprazole 80+8; octreotide 50+50; ceftriaxone 1 g; erythromycin 250 mg; hypoglycemia treatments (D50 25 g, glucagon 1 mg); sodium bicarbonate TCA 1–2 mEq/kg; naloxone dosing; PE alteplase arrest 50 mg; RASS and GCS tables.

---

## 11. Severity tally
| Severity | Count | Where |
|---|---|---|
| CRITICAL | 1 | AF-1 |
| MAJOR | 22 | X-1, X-2, QT-1, CA-5, AN-1, SE-1, ACS-4, UT-1, RF-1, RF-2, AR-1, AR-2, PE-1, HS-1, HS-3, IS-1, IC-1, IC-2, IC-3, DK-1, DK-7 (HHS omission), TM-1 |
| MINOR | 112 | throughout |
| SUGGESTION | 43 | throughout |

Per-condition "Verified correct" lists and §10 record what I checked and found right. All 25 conditions and all Quick Tools (vitals, labs, GCS, RASS, ABCDE, SBAR, rapid-response triggers, H's & T's, handoff, PBW) were reviewed.

---

## 12. Overall verdict and Top-10 fixes

**Verdict: CONDITIONAL — REVISE AND RE-REVIEW.** The content is structurally sound, mostly dose-accurate and helpfully cautious, but (1) it cites guideline editions that are now superseded and relies on one agent (andexanet) that has been withdrawn, (2) it contains one statement (AF/pre-excitation) that, followed literally, can precipitate a fatal arrhythmia, and (3) several high-risk omissions (thrombolysis exclusion screens; obstructive-lung ventilation; immediate post-paralysis sedation; oral-only nimodipine; epinephrine concentration; pericardiocentesis in dissection) are exactly the situations in which a nurse following a quick-reference may act without a physician present. Keep `reviewStatus: "NOT YET CLINICALLY REVIEWED"` until the Top-10 are completed and a pharmacist and nurse educator sign off.

### Top-10 fixes (in order)
1. **AF-1/UT-1/AF-2:** Add IV amiodarone to the "never give" list for pre-excited AF (with verapamil); separate wide-irregular + pulse (synchronized cardioversion) from polymorphic VT/pulseless (unsynchronized); update AF cardioversion energy to start ≥200 J biphasic/device max.
2. **IS-1, PE-1, ACS-4:** Add explicit thrombolysis exclusion checklists (stroke, PE, STEMI) and update stroke content to AIS 2026 (extended window, disabling deficit, post-EVT BP).
3. **RF-1, RF-2, QT-1:** Ventilator safety — obstructive-lung settings (RR 8–12, long expiratory time), COPD SpO₂ 88–92%, and immediate sedation/analgesia after tube confirmation (esp. after rocuronium).
4. **X-1:** Update to AHA 2025 (calcium/bicarb not routine; TTM ≥36 h; SpO₂ 90–98), SSC 2026, AHA/ACC PE 2026 (categories, PERT), ACS 2025, ATS 2024; add a review date field.
5. **HS-3/IC-3:** Remove or flag andexanet (withdrawn US, Dec 2025); add 4F-PCC dose and the PATCH platelet caveat.
6. **DK-1/DK-2/DK-3 + HHS card:** DKA: K <3.5 → hold insulin, replacement ~10 mEq/h; bicarbonate only pH <7.0; ketone-based resolution; add HHS.
7. **AR-1, AR-2, AR-4, AR-5:** Rewrite ARDS adjuncts: NMB not routine, no routine recruitment/incremental PEEP titration, ECMO criteria with time, steroid suggestion; remove "deep sedation initially".
8. **IC-1, IC-2, IC-5, IC-6:** Split ICH/SAH/TBI/ICP; state "nimodipine ENTERAL ONLY — never IV"; align hypertonic Na ceiling; isotonic fluids only; no platelets for antiplatelet ICH.
9. **AN-1, HS-1, TM-1, CA-5, SE-1:** High-alert safeguards — epinephrine concentration warning; TXA indication (trauma/PPH ≤3 h, not GI bleed); no routine pericardiocentesis for dissection/post-op tamponade; CALS in arrest card; give second-line anti-seizure drug as soon as benzodiazepine fails.
10. **X-2 + governance:** Fix localStorage persistence (patient-specific/expiry), add GCS "T", add HIGH-ALERT banner, adult-only scope statement, harmonise inconsistent thresholds (X-5), and obtain pharmacist/nurse-educator/intensivist sign-off; add Tier-1 missing cards (§9).

*Honorable mentions:* SE-2 pediatric dose; QT-6 GCS language; AK-6 contrast wording; OD-3 salicylate actions; GI-4 intubate before Blakemore; HK-1 insulin hypoglycemia; AW-1 thiamine for Wernicke; SP-1 antibiotic 3-h pathway for possible sepsis.

---

## 13. Limitations and uncertainty
* **Verified online 2026-10-04:** AHA 2025 CPR/ECC key statements; SSC 2026; AHA/ASA AIS 2026; AHA/ACC 2026 PE (summary level); 2025 ACC/AHA ACS (summary level); ATS 2024 ARDS update and ESICM 2023 NMB statement; ADA/EASD/JBDS/AACE/DTS 2024; andexanet withdrawal notice. In several cases I read society summaries or secondary summaries rather than full guideline text; recommendation grades quoted ("Class 3: Harm", "strong") should be re-checked against the source before they are cited in the app.
* **Not re-verified (marked "from knowledge – verify"):** ATLS 11th ed. changes, KDIGO AKI update, AHA ICH 2022/aSAH 2023/BTF text, NCS/AES updates, exact AHA/ACC 2026 PE category thresholds, 2025 AHA bradycardia text, vancomycin AUC guidance details, Baveno VII and ASAM specifics, ESC PE successor guideline, SEP-1 current specs.
* **Scope:** I reviewed clinical content, not UI accessibility, offline/service-worker behaviour or code security except where it affects clinical safety (persisted state, GCS "T").
* No patient-specific advice is given; all dosing must be verified against local formulary/pharmacy protocols.
* No files in `/workspace/icu-quickref/` were modified.
