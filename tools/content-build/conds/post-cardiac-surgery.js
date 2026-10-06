module.exports = {
  id: "post-cardiac-surgery", name: "Post-cardiac-surgery emergencies / arrest (CALS)", category: "Cardiac", emergency: true,
  keywords: ["post cardiac surgery", "post-op cardiac", "cabg", "valve surgery", "cals", "cardiac surgical arrest", "resternotomy", "re-sternotomy", "reopen chest", "epicardial pacing", "pacing wires", "chest tube bleeding", "mediastinal bleeding", "tamponade", "vasoplegia", "open heart"],
  warnings: [
    "CALS (STS expert consensus; facility training required): VF/pVT → up to 3 rapid sequential shocks BEFORE compressions; asystole/severe brady with wires → pace at maximum output BEFORE compressions; emergency resternotomy within ~5 min if no ROSC.",
    "Epinephrine is NOT given routinely in CALS arrest (rebound hypertension/bleeding) — only on senior/surgeon direction per protocol. Do not give the standard ACLS dose reflexively.",
    "Bleeding/tamponade: sudden drop in chest-tube output with hypotension/↑CVP = tamponade until proven otherwise — call surgeon NOW; needle pericardiocentesis usually NOT the treatment."
  ],
  glance: [
    "Arrest after cardiac surgery → CALS: shock ×3 (VF/VT) or pace (asystole/brady) first, then CPR, prepare resternotomy",
    "Bleeding (chest tube output above ordered threshold), tamponade, low output, vasoplegia, arrhythmia — call surgeon early",
    "Know your unit's roles: compressor, airway, defibrillation, drugs, resternotomy kit/ sterile team"
  ],
  recognize: [
    "Bleeding: chest-tube output above ordered call threshold, rising HR, falling BP/Hgb, coagulopathy, hypothermia",
    "Tamponade: falling BP, rising/equalized CVP, falling UOP & cardiac output, sudden ↓ drain output (clot), may be localized (TTE can miss)",
    "Low cardiac output: cool extremities, low SvO₂/CI, lactate ↑, oliguria; vasoplegia: warm, low SVR",
    "Arrhythmias: AF, junctional, heart block (pacing wires), VF/VT; tension PTX; graft occlusion/ischemia"
  ],
  actions: [
    ["RN", "!Arrest: call for help/CALS team + cardiac surgeon; confirm rhythm; stop any infusion bolus causing it (check for pump error)."],
    ["ORDER", "VF/pVT: up to 3 rapid sequential defibrillations per CALS protocol before compressions; then CPR + antiarrhythmic per protocol/senior."],
    ["ORDER", "Asystole/extreme bradycardia with epicardial wires: pace at maximum output (asynchronous/DOO per protocol) before CPR; check capture."],
    ["RN", "PEA: start CPR (pause pacing per protocol to exclude underlying VF); think tamponade, bleeding, tension PTX, pump/pacer failure."],
    ["PROV", "Anticipate/assist: emergency resternotomy within ~5 min if no ROSC — open sterile resternotomy kit, internal paddles."],
    ["ORDER", "Epinephrine only on surgeon/senior direction per CALS protocol (not routine)."],
    ["RN", "Bleeding: report chest-tube output per ordered threshold; keep tubes patent per unit policy (no routine stripping); warm patient."],
    ["ORDER", "Labs per order: Hgb, coags, platelets, fibrinogen, iCa, ABG, lactate, viscoelastic test; blood products/protamine per order."],
    ["ORDER", "Hypotension: fluids, vasopressor/inotrope per order; check pacing settings, rhythm, and lines."],
    ["RN", "Pacing wires: keep pacing box at bedside, check connections/battery, sensing and capture per protocol; insulate exposed wires."]
  ],
  monitor: [
    ["RN", "Arterial BP, CVP/PA pressures, HR/rhythm, SpO₂ continuously; CI/SvO₂ if available"],
    ["RN", "Chest-tube output hourly (and character); sudden stop vs heavy output"],
    ["RN", "UOP hourly, temperature (rewarming), peripheral perfusion"],
    ["ORDER", "Hgb, coags, K/Mg/iCa, lactate, glucose per order"],
    ["RN", "Pacemaker settings & capture; neuro status after extubation"]
  ],
  meds: [
    "VERIFY PER FACILITY PROTOCOL / ORDER. No infusion rates shown.",
    "Defibrillation (sequential ×3 for VF/pVT per CALS) · epicardial pacing per protocol",
    "Amiodarone/lidocaine per CALS protocol/senior; epinephrine only on senior direction",
    "Protamine (slow), blood products, PCC/fibrinogen concentrate per order",
    "Vasopressors/inotropes per order and pump library"
  ],
  escalate: [
    "!Any arrest → CALS team + surgeon; resternotomy preparation immediately",
    "!Chest-tube output above threshold, sudden drop in output with hypotension, rising CVP",
    "New arrhythmia, loss of pacing capture, rising lactate/low output"
  ]
};
