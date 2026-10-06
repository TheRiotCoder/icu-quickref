module.exports = {
  id: "severe-tbi", name: "Severe traumatic brain injury (TBI)", category: "Neuro", emergency: true,
  keywords: ["tbi", "traumatic brain injury", "head injury", "head trauma", "severe tbi", "subdural", "sdh", "epidural", "edh", "contusion", "diffuse axonal injury", "icp", "evd", "bolt", "cpp", "herniation", "cushing", "hyperosmolar therapy", "mannitol", "hypertonic saline"],
  warnings: [
    "Avoid HYPOTENSION and HYPOXIA — a single episode worsens outcome. BTF 4th ed: SBP ≥100 (age 50–69) / ≥110 mmHg (15–49 or >70); treat ICP >22 mmHg; CPP 60–70 mmHg — exact targets per order.",
    "No corticosteroids for TBI (CRASH). No prophylactic hyperventilation — brief hyperventilation only as a bridge for herniation per provider.",
    "Hypertonic saline (3%/23.4%) and mannitol are HIGH-ALERT — per order/protocol only; 23.4% central line only."
  ],
  glance: [
    "GCS ≤8 after head trauma: secure airway, SpO₂ & SBP targets, C-spine precautions",
    "ICP/CPP goals per order; HOB 30°, head midline, normocapnia, normothermia, normoglycemia",
    "Herniation signs (pupil dilation, posturing, Cushing) → hyperosmolar therapy per order, neurosurgery NOW"
  ],
  recognize: [
    "Decreased GCS, unequal/dilated pupils, posturing, seizures, CSF leak, scalp/skull injury",
    "Herniation: unilateral fixed dilated pupil, extensor posturing, Cushing triad (HTN, bradycardia, irregular breathing)",
    "Secondary insults: hypotension, hypoxia, hypo/hypercapnia, fever, hypo/hyperglycemia, hyponatremia, seizures, anemia",
    "Coagulopathy (anticoagulants, trauma-induced), associated C-spine/polytrauma"
  ],
  actions: [
    ["RN", "!Call provider/neurosurgery for GCS drop ≥2, new pupil change, posturing, ICP above ordered threshold."],
    ["RN", "Airway/breathing: SpO₂ target per order (avoid <90%); C-spine precautions until cleared."],
    ["PROV", "Anticipate/assist: intubation for GCS ≤8 (avoid hypotension/hypoxia during RSI)."],
    ["ORDER", "Ventilate to normocapnia (PaCO₂/ETCO₂ target per order); no routine hyperventilation."],
    ["ORDER", "Maintain SBP/MAP/CPP at ordered targets: isotonic fluids (0.9% saline/balanced per order; avoid hypotonic fluids; albumin not recommended in TBI), vasopressor per order."],
    ["RN", "ICP bundle: HOB 30° (if spine allows), head midline, loosen ETT ties/C-collar per policy, minimize stimulation, treat pain/agitation per order."],
    ["ORDER", "ICP above threshold: sedation/analgesia per order, CSF drainage per EVD order, hyperosmolar therapy (hypertonic saline or mannitol) per order."],
    ["ORDER", "Reverse anticoagulation per order/protocol (4F-PCC, vitamin K slow IV, idarucizumab, protamine); seizure prophylaxis per order."],
    ["ORDER", "Normothermia (treat fever), glucose and Na targets per order; avoid hyponatremia."],
    ["PROV", "Anticipate/assist: CT head, ICP monitor/EVD placement, decompressive surgery."]
  ],
  monitor: [
    ["RN", "GCS, pupils (size/reactivity), motor q1h or per order"],
    ["RN", "Continuous arterial BP/MAP, ICP, CPP; SpO₂, ETCO₂"],
    ["RN", "EVD: level at zero reference per order, drain open/closed per order, output & color, waveform"],
    ["ORDER", "Na, osmolality (hyperosmolar therapy), glucose, coags, Hgb per order"],
    ["RN", "Temperature, seizures (continuous EEG if ordered), UOP (DI/SIADH/cerebral salt wasting)"]
  ],
  meds: [
    "VERIFY PER FACILITY PROTOCOL / ORDER. No infusion rates shown.",
    "Hypertonic saline (3%/23.4%, HIGH-ALERT) or mannitol per order (check osmolality/Na, UOP)",
    "Sedation/analgesia (propofol, fentanyl) per order",
    "Vasopressor for CPP/SBP target per order · isotonic crystalloid",
    "Seizure prophylaxis (e.g., levETIRAcetam) per order · reversal agents per protocol · no steroids"
  ],
  escalate: [
    "!New pupil asymmetry/fixed pupil, posturing, Cushing triad, GCS drop ≥2",
    "!ICP above threshold or CPP below target despite measures",
    "Hypotension, hypoxia, seizure, Na out of range, EVD malfunction/no output"
  ]
};
