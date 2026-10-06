module.exports = {
  id: "sodium-emergencies", name: "Sodium emergencies (severe hypo- / hypernatremia)", category: "Metabolic/Renal", emergency: false,
  keywords: ["sodium", "na", "hyponatremia", "low sodium", "hypernatremia", "high sodium", "3% saline", "hypertonic saline", "siadh", "osmotic demyelination", "ods", "cpm", "central pontine myelinolysis", "free water", "diabetes insipidus", "di", "desmopressin", "ddavp", "tolvaptan"],
  warnings: [
    "Hypertonic saline (3%, and 23.4%) is HIGH-ALERT: per order/protocol only, pump, independent double check, dedicated labeling; 23.4% central line only, never as general fluid.",
    "Limit correction: chronic hyponatremia rise ≤8–10 mmol/L in 24 h (lower limit for high-risk: alcohol use, malnutrition, hypokalemia, liver disease) — overcorrection causes osmotic demyelination. Report a rise faster than the ordered limit at once.",
    "Brisk unexpected urine output (water diuresis) during treatment = overcorrection risk — check Na and call provider (re-lowering/desmopressin per provider)."
  ],
  glance: [
    "Severe symptomatic hypoNa (seizure, coma, vomiting, confusion) → hypertonic saline bolus PER ORDER/protocol, recheck Na frequently",
    "Correction limit (≤8–10 mmol/L/24 h chronic); watch UOP for overcorrection",
    "HyperNa: free water deficit replacement per order; slow in chronic; check DI (high dilute UOP)"
  ],
  recognize: [
    "Hyponatremia (Na <135; severe <125 or symptomatic): headache, N/V, confusion, seizures, coma, respiratory arrest (cerebral edema)",
    "Acute (<48 h: marathon, MDMA, polydipsia, post-op hypotonic fluids) is higher risk for herniation; chronic is higher risk for ODS",
    "Hypernatremia (Na >145): thirst (if able), lethargy, irritability, seizures; ICU: no free water access, osmotic diuresis, DI (large dilute UOP)",
    "Volume status, urine osm/Na, serum osm, glucose (pseudo/translocational hypoNa), meds (thiazides, SSRIs, carbamazepine, desmopressin)"
  ],
  actions: [
    ["RN", "!Notify provider for Na <125 or >155 mmol/L (or per facility critical value), any neuro symptoms, or rapid change."],
    ["RN", "Seizure precautions; neuro checks; airway assessment; strict I&O; daily weight."],
    ["ORDER", "Labs per order: serum Na q2–4h during active correction (more often initially), serum osm, glucose, urine osm/Na, K, BMP."],
    ["ORDER", "Severe symptomatic hyponatremia: hypertonic (3%) saline bolus(es) per order/protocol — high-alert double check; recheck Na after each bolus per order."],
    ["ORDER", "Stop/hold contributing fluids & meds per order (hypotonic IV fluids, thiazides, desmopressin); fluid restriction per order (SIADH)."],
    ["RN", "Track Na change vs ordered 24-h limit; report rise approaching limit or sudden ↑UOP immediately."],
    ["PROV", "Anticipate/assist: overcorrection rescue (D5W and/or desmopressin) per provider."],
    ["ORDER", "Hypernatremia: free water (enteral) or hypotonic IV fluid per order; correct cause (DI → desmopressin per order); avoid rapid correction in chronic."],
    ["ORDER", "Correct K per protocol (raising K also raises Na)."]
  ],
  monitor: [
    ["ORDER", "Serum Na per ordered interval; glucose; K"],
    ["RN", "Hourly UOP (sudden dilute diuresis = alert), I&O, weight"],
    ["RN", "Neuro status: headache, confusion, seizure; days later: dysarthria, dysphagia, weakness (ODS)"],
    ["RN", "Hypertonic saline IV site/line; fluid overload signs"],
    ["RN", "Thirst/access to water (hyperNa), insensible losses, fever"]
  ],
  meds: [
    "VERIFY PER FACILITY PROTOCOL / ORDER.",
    "3% sodium chloride (HIGH-ALERT) bolus/infusion per order/protocol",
    "Desmopressin per provider (DI; or overcorrection rescue) · D5W/free water per order",
    "Vaptans (tolvaptan) per provider only — overcorrection and hepatotoxicity risk",
    "Potassium replacement per protocol"
  ],
  escalate: [
    "!Seizure, GCS decline, respiratory compromise with abnormal Na",
    "!Na rising faster than ordered limit or sudden large dilute UOP",
    "Na not responding to therapy; new neuro signs days after correction (ODS)"
  ]
};
