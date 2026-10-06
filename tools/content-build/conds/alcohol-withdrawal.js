module.exports = {
  id: "alcohol-withdrawal", name: "Alcohol withdrawal / delirium tremens", category: "Tox/Behavioral", emergency: false,
  keywords: ["alcohol", "etoh", "aws", "withdrawal", "dts", "delirium tremens", "ciwa", "ciwa-ar", "benzodiazepine", "benzo", "lorazepam", "ativan", "phenobarbital", "thiamine", "wernicke", "agitation", "hallucinations", "withdrawal seizure"],
  warnings: [
    "CIWA-Ar is valid ONLY if the patient can communicate. Intubated/sedated/delirious: use RASS + objective signs per ICU protocol (CAM-ICU for delirium).",
    "PHENobarbital is HIGH-ALERT (very long half-life, additive respiratory depression with benzodiazepines) — per ICU/pharmacy protocol only; independent double check; do NOT confuse with PENTobarbital.",
    "Suspected Wernicke (confusion, ataxia, eye signs): tell provider NOW — high-dose IV thiamine per order, given before or with glucose."
  ],
  glance: [
    "Tremor, sweats, tachycardia, anxiety, hallucinations, seizure → assess (CIWA-Ar if communicative; RASS if not) and treat early",
    "Benzodiazepine per order set (symptom-triggered or front-loaded per provider); thiamine IV before/with dextrose",
    "Rule out other causes: hypoglycemia, head injury, infection, hepatic encephalopathy, overdose"
  ],
  recognize: [
    "6–24 h: tremor, anxiety, insomnia, diaphoresis, N/V, HTN, tachycardia",
    "6–48 h: withdrawal seizures (generalized, often single/brief)",
    "48–96 h (DTs): disorientation, agitation, visual/tactile hallucinations, fever, severe autonomic instability, arrhythmia, seizure — mortality if untreated",
    "Risk: prior DTs/seizures, high daily intake, abnormal labs, concurrent illness, age; fever = marker of severity"
  ],
  actions: [
    ["RN", "Safety: bed low, fall/seizure precautions, calm low-stimulation room. Restraints last resort — per restraint policy/order, least restrictive, frequent reassessment."],
    ["RN", "!Notify provider of withdrawal signs; obtain withdrawal order set (benzodiazepine regimen, assessment tool)."],
    ["ORDER", "POC glucose; labs per order: BMP, Mg, Phos, LFTs, CBC, CK, ethanol level, tox screen."],
    ["ORDER", "Thiamine IV per order BEFORE or with dextrose (prophylactic vs high-dose Wernicke regimen per provider); folate, multivitamin; replace Mg, K, Phos per protocol."],
    ["RN", "Assess q1h or per protocol: CIWA-Ar ONLY if able to communicate; intubated/delirious → RASS + objective signs (target RASS 0 to −1 per order)."],
    ["ORDER", "Benzodiazepine per order set (drug, dose, interval per order; lorazepam often preferred in liver disease/elderly). Track cumulative dose; hold & call for RASS ≤ −2, slow RR, SpO₂/ETCO₂ change."],
    ["RN", "!Severe/DTs or escalating doses: ask provider for front-loading/ICU escalation; airway checks q5–15 min after doses; call per protocol when cumulative-dose threshold reached."],
    ["ORDER", "Resistant withdrawal: PHENobarbital per ICU/pharmacy protocol (high-alert; airway/ETCO₂ monitoring); dexmedetomidine as adjunct only (NOT alone)."],
    ["ORDER", "Haloperidol only per order after adequate benzodiazepine; baseline QTc and K/Mg (lowers seizure threshold)."],
    ["PROV", "Anticipate/assist: intubation + propofol for refractory agitation/respiratory compromise."],
    ["RN", "Seizure → Status epilepticus card (benzodiazepine; not phenytoin for withdrawal seizures). Treat fever; hydration per order."],
    ["RN", "Assess for aspiration, hepatic encephalopathy, GI bleed, pancreatitis, alcoholic ketoacidosis, Wernicke."]
  ],
  monitor: [
    ["RN", "CIWA-Ar (communicative only) or RASS/CAM-ICU per protocol"],
    ["RN", "HR, BP, temp, RR/SpO₂/ETCO₂ after benzodiazepine/phenobarbital"],
    ["ORDER", "Glucose, electrolytes (Mg, K, Phos — refeeding risk); hydration, UOP"],
    ["RN", "Cumulative benzodiazepine dose; over-sedation or respiratory depression"],
    ["RN", "Seizure, hallucinations, injury, tube/line removal; CK if prolonged agitation"]
  ],
  meds: [
    "VERIFY PER FACILITY PROTOCOL / ORDER. Doses per order set.",
    "Benzodiazepines (lorazepam, diazepam) — symptom-triggered or front-loaded per order; cumulative-dose call threshold per protocol",
    "PHENobarbital (HIGH-ALERT) per ICU/pharmacy protocol — IBW-based dosing/caps per order",
    "Thiamine IV (higher dose if Wernicke) · folic acid · multivitamin · Mg/K/Phos repletion",
    "Dexmedetomidine adjunct only · haloperidol adjunct (QTc) · propofol with intubation"
  ],
  escalate: [
    "!Seizure, uncontrolled agitation, refractory to benzodiazepines (escalating cumulative dose), respiratory depression",
    "!High fever, severe tachycardia/BP instability, hallucinations with unsafe behavior",
    "New focal deficit or head injury → CT head; suspected Wernicke/hepatic encephalopathy"
  ]
};
