module.exports = {
  id: "hhs", name: "Hyperosmolar hyperglycemic state (HHS)", category: "Metabolic/Renal", emergency: false,
  keywords: ["hhs", "hhns", "hyperosmolar", "hyperosmolar hyperglycemic state", "hyperglycemia", "high blood sugar", "high glucose", "osmolality", "osm", "dehydration", "insulin drip", "mixed dka hhs"],
  warnings: [
    "Insulin infusion is HIGH-ALERT — rate per protocol/order only; independent double check; fluids come FIRST in HHS (insulin may be delayed until glucose stops falling with fluids per protocol).",
    "Check K before insulin: HOLD insulin and notify if K <3.5 mmol/L (ADA/EASD 2024) — replace K per protocol first.",
    "Avoid rapid falls in glucose/osmolality/sodium (cerebral edema, osmotic demyelination) — report rates of change outside the ordered targets."
  ],
  glance: [
    "Glucose very high (often >600 mg/dL), osmolality >300 mOsm/kg, profound dehydration, AMS — minimal ketosis/acidosis",
    "Isotonic fluid resuscitation FIRST per order; K check before insulin; insulin per protocol",
    "Slow, controlled correction; hourly glucose; VTE prophylaxis; find the trigger (infection, MI, stroke, drugs)"
  ],
  recognize: [
    "Days of polyuria/polydipsia, weakness, weight loss; older adults; often new/untreated type 2 diabetes",
    "Glucose usually >600 mg/dL (>33.3 mmol/L); effective osmolality >300 mOsm/kg; pH ≥7.3, HCO₃ ≥15, ketones minimal (ADA/EASD 2024) — mixed DKA/HHS common",
    "Severe dehydration: tachycardia, hypotension, dry mucosa, AKI; neuro: confusion → coma, focal deficits, seizures",
    "Triggers: infection/sepsis, MI, stroke, steroids, thiazides, antipsychotics, SGLT2i, missed insulin"
  ],
  actions: [
    ["RN", "!Notify provider; ABCs; airway protection if GCS ≤8 (see Resp failure)."],
    ["RN", "2 large-bore IVs; cardiac monitor; strict I&O; urinary catheter per order/policy; seizure & fall precautions."],
    ["ORDER", "Labs per order: glucose, BMP (Na, K, Cl, HCO₃, BUN/Cr), calculated/measured osmolality, VBG/ABG, ketones (β-hydroxybutyrate), Mg, Phos, CBC, lactate, cultures, troponin, ECG."],
    ["ORDER", "Isotonic crystalloid resuscitation per order/protocol (volume and fluid choice per provider; caution in HF/ESKD)."],
    ["ORDER", "K replacement per protocol (concentration/rate limits, pump, central line per policy). HOLD insulin and notify if K <3.5."],
    ["ORDER", "Insulin per HHS/DKA protocol (often started after fluids; rate per order); hourly POC glucose; add dextrose per protocol when glucose falls to the protocol threshold."],
    ["RN", "Report glucose fall faster than ordered target, falling/rising corrected Na outside target, or any neuro decline immediately."],
    ["ORDER", "VTE prophylaxis per order (high thrombosis risk); treat trigger (antibiotics, cardiac work-up) per order."],
    ["RN", "Neuro checks q1h (GCS, pupils) during correction."],
    ["ORDER", "Transition to SC basal insulin per protocol, overlapping before stopping the infusion."]
  ],
  monitor: [
    ["RN", "POC glucose q1h while on insulin infusion"],
    ["ORDER", "BMP/K, osmolality, corrected Na q2–4h per order; Mg, Phos"],
    ["RN", "Hourly I&O, fluid balance, signs of overload (crackles, SpO₂, edema)"],
    ["RN", "Neuro status q1h; cardiac rhythm (K shifts)"],
    ["RN", "Skin/pressure injury and VTE signs (immobile, dehydrated)"]
  ],
  meds: [
    "VERIFY PER FACILITY PROTOCOL / ORDER. No infusion rates shown.",
    "Isotonic crystalloid (0.9% saline or balanced crystalloid) per order",
    "Regular insulin IV infusion (HIGH-ALERT) per HHS/DKA protocol",
    "Potassium chloride/phosphate per protocol (HIGH-ALERT concentrated electrolytes)",
    "Dextrose-containing fluids when glucose reaches protocol threshold · VTE prophylaxis per order"
  ],
  escalate: [
    "!GCS decline, seizure, new focal deficit, or airway concern",
    "!Hypotension despite fluids, arrhythmia, K <3.5 or >6.0 mmol/L",
    "Oliguria/rising creatinine, glucose falling faster than ordered, Na change outside ordered limit"
  ]
};
