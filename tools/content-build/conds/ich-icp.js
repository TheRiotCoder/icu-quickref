module.exports = {
  id: "ich-icp", name: "Intracranial hemorrhage (ICH / SAH) / increased ICP", category: "Neuro", emergency: true,
  keywords: ["ich", "intracranial hemorrhage", "intracerebral hemorrhage", "brain bleed", "hemorrhagic stroke", "sah", "subarachnoid hemorrhage", "aneurysm", "icp", "increased icp", "raised icp", "herniation", "cushing", "blown pupil", "mannitol", "hypertonic saline", "3% saline", "23.4%", "evd", "ventriculostomy", "nimodipine", "vasospasm", "pcc", "reversal"],
  warnings: [
    "NIMODIPINE = ORAL/ENTERAL ONLY — NEVER IV (fatal cardiovascular collapse). Use an enteral-only/oral syringe, label 'oral'. Hold/split for hypotension only per prescriber.",
    "23.4% sodium chloride is HIGH-ALERT: pharmacy-dispensed, central line only, via pump over the ordered time, independent double check. 3% NaCl rate/line per policy.",
    "BP target depends on diagnosis — ICH: SBP ~140 (130–150), avoid <130. SAH: per neurosurgery until aneurysm secured, then avoid hypotension. TBI/↑ICP: do NOT lower BP for raised ICP — see Severe TBI card. Always the ordered target.",
    "Factor Xa inhibitor (apixaban/rivaroxaban) reversal = 4F-PCC per pharmacy protocol (prior Xa-specific reversal agent no longer marketed in US). Vitamin K IV slow infusion (anaphylaxis risk); protamine slowly (hypotension/anaphylaxis).",
    "No platelet transfusion for antiplatelet-associated ICH unless neurosurgery orders it for a procedure (PATCH)."
  ],
  glance: [
    "Sudden severe headache, vomiting, ↓LOC, unequal pupils, focal deficit → STAT CT + provider; note last anticoagulant dose",
    "HOB 30°, head midline, airway; avoid hypotension/hypoxia/hypercapnia; isotonic fluids only; BP to the ORDERED, diagnosis-specific target",
    "Herniation signs (blown pupil, Cushing's, posturing) → call neurosurgery/ICU STAT; hyperosmolar therapy ready — give per order"
  ],
  recognize: [
    "ICH: sudden focal deficit, headache, vomiting, ↓GCS, often hypertensive/anticoagulated",
    "SAH: sudden 'worst' headache, neck stiffness, photophobia, seizure, ↓GCS",
    "↑ICP: headache, vomiting, declining LOC, papilledema, dilated sluggish pupil, CN VI palsy",
    "IMMINENT HERNIATION: unilateral/bilateral fixed dilated pupils, posturing, Cushing's triad (hypertension + bradycardia + irregular breathing)",
    "Anticoagulant/antiplatelet use, coagulopathy, trauma (→ Severe TBI card), or hypertensive crisis increase risk"
  ],
  actions: [
    ["RN", "!Call rapid response / provider STAT (neurosurgery/neurology). Time and document neuro exam (GCS, pupils, motor)."],
    ["PROV", "Anticipate/assist: airway protection if poor airway reflexes/deteriorating (RSI with minimal BP swings). Avoid hypoxia (SpO₂ ≥94% per order)."],
    ["RN", "HOB 30°, head midline, neck not rotated; adjust ETT ties (cervical collar changes only per provider/spine precautions). Minimize stimulation; pain/agitation per order."],
    ["ORDER", "STAT non-contrast CT head; labs per order: coags, CBC, platelets, BMP/Na, glucose, type & screen. Record last anticoagulant/antiplatelet dose & time."],
    ["ORDER", "REVERSE anticoagulation per order/pharmacy: warfarin → 4F-PCC + slow IV vitamin K; dabigatran → idarucizumab; Xa inhibitor → 4F-PCC; heparin → protamine. No platelets for antiplatelet ICH unless ordered for surgery."],
    ["ORDER", "BP per ORDERED target: ICH typically SBP ~140 (130–150), avoid <130 and big swings; SAH per neurosurgery before securing. Antihypertensive infusion per order/pump library."],
    ["ORDER", "Normocapnia (PaCO₂ 35–45). Brief hyperventilation (PaCO₂ ~30–35) ONLY as a bridge for impending herniation, on provider order."],
    ["ORDER", "Herniation / sustained ICP >22: hyperosmolar therapy per order (23.4% NaCl central only, 3% NaCl, or mannitol) — HIGH-ALERT, no numeric doses here."],
    ["ORDER", "Isotonic fluids only (no hypotonic/D5W); Na target per order; normothermia; glucose 140–180; treat clinical seizures (no routine prophylaxis in ICH)."],
    ["RN", "EVD: level at tragus at ordered height; clamp for transport/position change per order, then re-level, re-open, document. Never flush. Hourly output."],
    ["ORDER", "SAH: nimodipine per order — ENTERAL ONLY, NEVER IV (check BP before each dose); avoid hypovolemia; anticipate aneurysm securing."]
  ],
  monitor: [
    ["RN", "Neuro checks q15 min–q1h per order (GCS, pupils size/reactivity, motor, speech)"],
    ["RN", "ICP (goal ≤20–22 mmHg), CPP (MAP − ICP; goal 60–70 per order), MAP, ordered SBP target"],
    ["ORDER", "Na q4–6h with hypertonic saline — hold parameter per order (commonly Na >155; up to 160 refractory per intensivist); Na rise ≤8–10 mmol/L/24 h unless herniation; serum osm with mannitol (hold if osm >320 or AKI, per order)"],
    ["RN", "ETCO₂/PaCO₂, SpO₂, temp, glucose; hourly UOP (mannitol diuresis; DI with SAH/TBI — hourly UOP and Na; SAH cerebral salt wasting — do not fluid restrict)"],
    ["RN", "EVD: waveform, drainage color/amount, insertion site, leak; no drainage/air/leak → check clamp/level/tubing, call"],
    ["RN", "Seizure activity; SAH vasospasm days ~3–14 (new deficit → call)"]
  ],
  meds: [
    "VERIFY PER FACILITY PROTOCOL / ORDER. No numeric doses for hyperosmolar therapy, antihypertensive infusions or reversal agents.",
    "Hyperosmolar: 3% NaCl · 23.4% NaCl (central only, HIGH-ALERT) · mannitol (filter/line per policy; BP, UOP, Na, osm) — per neurosurgery/ICU order",
    "BP: niCARdipine or clevidipine infusion, labetalol — per order/pump library",
    "Reversal per pharmacy protocol: 4F-PCC · vitamin K (slow IV) · idarucizumab · protamine (slow) (Xa inhibitors → 4F-PCC)",
    "Nimodipine (SAH): ORAL/ENTERAL ONLY — typical 60 mg q4h (or split 30 mg q2h for hypotension) per order; CYP3A4 interactions",
    "Levetiracetam for seizures (prophylaxis only per neurosurgery); analgesia/sedation per order; stool softeners — avoid straining"
  ],
  escalate: [
    "!Any GCS drop ≥2, new pupillary change, posturing, Cushing's response → neurosurgery STAT",
    "!ICP persistently >22 or EVD problem (no drainage, blockage, leaking, high output)",
    "Cerebellar hemorrhage, brainstem compression or hydrocephalus → urgent neurosurgery",
    "SBP above/below ordered target on meds · seizure · new focal deficit"
  ]
};
