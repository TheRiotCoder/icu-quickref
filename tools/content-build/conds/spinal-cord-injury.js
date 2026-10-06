module.exports = {
  id: "spinal-cord-injury", name: "Acute spinal cord injury / neurogenic shock / autonomic dysreflexia", category: "Neuro", emergency: false,
  keywords: ["sci", "spinal cord injury", "spine injury", "cervical spine", "c-spine", "neurogenic shock", "spinal shock", "autonomic dysreflexia", "ad", "quadriplegia", "tetraplegia", "paraplegia", "log roll", "hypotension bradycardia", "map goal"],
  warnings: [
    "Neurogenic shock (injury ≥T6): hypotension + BRADYCARDIA + warm skin — but exclude hemorrhage first in trauma.",
    "Succinylcholine: avoid after ~48–72 h post-injury (life-threatening hyperkalemia) — tell anesthesia/provider the injury date.",
    "Autonomic dysreflexia (injury ≥T6): sudden severe HTN + headache + bradycardia → sit up, remove trigger (bladder/bowel/skin), call provider."
  ],
  glance: [
    "Spinal precautions (log-roll, collar per order); airway/ventilation watch in high cervical injury",
    "Neurogenic shock: fluids then vasopressor to ordered MAP goal (elevated for several days per order); atropine/pacing for bradycardia per order",
    "Autonomic dysreflexia: sit up, find & remove trigger (bladder first), BP q2–5 min"
  ],
  recognize: [
    "Motor/sensory loss below level, priapism, loss of rectal tone, diaphragmatic breathing (C3–5)",
    "Neurogenic shock: hypotension, bradycardia, warm dry extremities, poikilothermia",
    "Respiratory failure: falling vital capacity/NIF, weak cough, rising CO₂ (high cervical lesions; can worsen over days)",
    "Autonomic dysreflexia: severe HTN, pounding headache, flushing/sweating above lesion, pale/cool below, bradycardia, nasal congestion"
  ],
  actions: [
    ["RN", "!Call provider for hypotension, bradycardia, respiratory decline, neuro level change."],
    ["RN", "Spinal precautions: log-roll with enough staff, collar/positioning per order; pressure injury prevention."],
    ["ORDER", "Respiratory: monitor VC/NIF per order (RT); suction, assisted cough; O₂ per order."],
    ["PROV", "Anticipate/assist: early intubation for high cervical injury/respiratory fatigue (in-line stabilization; avoid succinylcholine after ~48–72 h)."],
    ["ORDER", "Hypotension: exclude/treat bleeding; fluids per order; vasopressor (e.g., norepinephrine) to ordered MAP goal and duration."],
    ["ORDER", "Bradycardia (suctioning/turning triggers): atropine per order; pacing per provider; pre-oxygenate before suctioning."],
    ["RN", "Bladder: urinary catheter/intermittent cath per order (retention triggers AD); bowel program per order."],
    ["RN", "Autonomic dysreflexia: sit upright/legs down, loosen clothing/devices, check bladder (kinked catheter, distension) then bowel/skin; BP q2–5 min."],
    ["ORDER", "AD with persistent severe HTN after trigger removal: fast-acting antihypertensive per order; watch rebound hypotension."],
    ["ORDER", "VTE prophylaxis and GI prophylaxis per order; temperature management (poikilothermia)."]
  ],
  monitor: [
    ["RN", "MAP/HR continuously (arterial line); bradycardia with suction/turns"],
    ["RN", "Motor/sensory level per order (ASIA/ISNCSCI exam by trained staff)"],
    ["ORDER", "VC/NIF, ABG per order; SpO₂, RR, cough strength"],
    ["RN", "Bladder volume/UOP, bowel function, skin q2h"],
    ["RN", "Temperature; DVT signs; AD symptoms in chronic SCI"]
  ],
  meds: [
    "VERIFY PER FACILITY PROTOCOL / ORDER. No infusion rates shown.",
    "Vasopressor (norepinephrine; phenylephrine may worsen bradycardia) per order to MAP goal",
    "Atropine 1 mg IV (0.1 mg/mL syringe) for symptomatic bradycardia if ordered (q3–5 min, max 3 mg)",
    "Short-acting antihypertensive for autonomic dysreflexia per order",
    "VTE prophylaxis per order; steroids NOT routine (provider decision only)"
  ],
  escalate: [
    "!Respiratory decline (VC/NIF falling, rising CO₂), ascending neuro level",
    "!MAP below goal despite therapy; symptomatic bradycardia/asystole",
    "Autonomic dysreflexia not resolving after trigger removal"
  ]
};
