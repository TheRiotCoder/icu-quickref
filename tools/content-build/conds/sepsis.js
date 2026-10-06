module.exports = {
  id: "sepsis", name: "Sepsis / septic shock", category: "Shock", emergency: true,
  keywords: ["sepsis", "septic", "septic shock", "infection", "sepsis bundle", "sep-1", "lactate", "cultures", "blood cultures", "antibiotics", "abx", "norepinephrine", "levophed", "norepi", "vasopressin", "vaso", "pressor", "fluids", "bolus", "ssc", "news2", "mews", "sirs", "map", "hydrocortisone"],
  warnings: [
    "Do not rely on qSOFA alone to screen for sepsis (SSC 2026) — use the unit's NEWS2/MEWS/SIRS tool plus clinical judgment.",
    "Vasopressors are HIGH-ALERT: dose, concentration and units per order/pump library (vasopressin units/min vs units/h = 60× error; dose differs by indication).",
    "Peripheral norepinephrine only per facility policy: large proximal vein, site check at least hourly, central access ASAP; extravasation → stop, leave catheter, aspirate, call, extravasation protocol (antidote e.g., phentolamine only per order)."
  ],
  glance: [
    "Suspect infection + organ dysfunction/hypotension → sepsis alert per protocol NOW; note time zero",
    "Lactate + blood cultures ×2 → antibiotics per order within 1 h for shock/probable sepsis (don't delay >45 min for cultures)",
    "Fluids per order (commonly 30 mL/kg; individualize, reassess); vasopressor per order if MAP below goal (usually <65)"
  ],
  recognize: [
    "Screen: unit's NEWS2/MEWS/SIRS alert + judgment. Organ dysfunction: new AMS, SBP <100/MAP <65, RR ≥22, SpO₂ ↓, oliguria, ↑creatinine/bilirubin, ↓platelets, lactate ↑",
    "Fever or hypothermia, tachycardia, WBC ↑/↓, bandemia; mottled skin, cap refill >3 s",
    "Septic SHOCK: vasopressor need to keep MAP ≥65 AND lactate >2 mmol/L despite adequate fluids",
    "Normal vitals don't exclude sepsis: older, immunosuppressed, cirrhosis, β-blocked pts may not mount fever/tachycardia"
  ],
  actions: [
    ["RN", "!Call provider/rapid response; initiate sepsis alert per protocol. Note time zero."],
    ["ORDER", "Lactate per protocol (venous OK); remeasure in 2–4 h if initial >2 mmol/L."],
    ["ORDER", "Blood cultures ×2 (different sites) BEFORE antibiotics if no significant delay (<45 min); other sources (urine, sputum, lines, wound) per order."],
    ["ORDER", "Antibiotics per order within 1 h for shock/probable sepsis (possible sepsis without shock: rapid assessment, within 3 h if concern persists). First dose = full dose, given first."],
    ["RN", "Allergy listed? Call pharmacy/provider NOW so the first dose isn't delayed — don't give the listed drug until cleared or an alternative is chosen."],
    ["ORDER", "Large-bore IV ×2 (or IO) per protocol. Crystalloid boluses per order (balanced preferred; commonly 30 mL/kg — ideal/adjusted weight if BMI >30; smaller in HF/ESRD; saline in TBI)."],
    ["RN", "Reassess perfusion after each bolus (BP, cap refill, UOP, lactate, passive leg raise, dynamic indices); report fluid intolerance (crackles, ↑O₂ need)."],
    ["ORDER", "Vasopressor if MAP below ordered goal (usually 65; 60–65 may be ordered if ≥65 y) — norepinephrine first-line; start early (peripheral per policy) rather than wait for all fluids."],
    ["PROV", "Anticipate/assist: arterial line for escalating pressors; central line. Foley and hourly UOP per order."],
    ["PROV", "Anticipate/assist: source control ASAP, ideally within 6 h (drain abscess, remove infected line/device, surgical consult)."],
    ["ORDER", "Escalating norepinephrine: vasopressin add-on and IV hydrocortisone per order (monitor glucose); epinephrine if MAP still inadequate."],
    ["ORDER", "Glucose 140–180 (insulin if ≥180 per protocol); VTE prophylaxis (LMWH preferred); stress ulcer prophylaxis if risk; daily antibiotic review/de-escalation."]
  ],
  monitor: [
    ["RN", "MAP to ordered goal (art line), HR, cap refill, mottling"],
    ["ORDER", "Lactate q2–4 h until normalizing"],
    ["RN", "UOP ≥0.5 mL/kg/h; creatinine; fluid balance (avoid overload after resuscitation)"],
    ["RN", "SpO₂/P:F ratio; ventilation needs; mental status"],
    ["ORDER", "Temp, WBC, cultures, procalcitonin per provider; line sites"],
    ["RN", "Pressor requirement trend, infusion site (hourly if peripheral), platelets/coags (DIC), glucose"]
  ],
  meds: [
    "VERIFY PER FACILITY PROTOCOL / ORDER (SSC 2026). No vasopressor doses shown — per order/pump library.",
    "Antibiotics per facility sepsis pathway/allergies — first dose ASAP, full dose (renal adjustment applies to later doses); β-lactams: prolonged infusion after loading dose per order",
    "Crystalloid (balanced preferred over 0.9% saline, except TBI) per order; albumin after large volumes per provider (avoid in TBI)",
    "Norepinephrine — first-line vasopressor, titrate to ordered MAP (HIGH-ALERT)",
    "Vasopressin add-on (fixed rate per order; units/min) · epinephrine second-line · DOBUTamine if cardiac dysfunction — per order",
    "Hydrocortisone IV for ongoing vasopressor requirement — dose per order; monitor glucose",
    "Bicarbonate: not for lactic acidosis to improve hemodynamics; only pH ≤7.2 with AKI stage 2–3 per provider"
  ],
  escalate: [
    "!MAP below goal after fluids + rising pressor requirement, lactate not clearing, new organ failure",
    "!Source needing procedure (abscess, necrotizing infection, obstructed system, perforation)",
    "Escalate to ICU attending/intensivist; ECMO/CRRT per course",
    "Antibiotic delay >1 h for any reason (access, allergy, supply) → pharmacy/provider NOW"
  ]
};
