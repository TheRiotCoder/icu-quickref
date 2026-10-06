
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
