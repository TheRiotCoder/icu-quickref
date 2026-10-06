module.exports = {
  id: "hypertensive-emergency", name: "Hypertensive emergency", category: "Cardiac", emergency: false,
  keywords: ["hypertensive emergency", "hypertensive crisis", "hypertensive urgency", "htn", "high blood pressure", "malignant hypertension", "hypertensive encephalopathy", "pres", "nicardipine", "cardene", "clevidipine", "cleviprex", "labetalol", "esmolol", "nitroprusside", "eclampsia"],
  warnings: [
    "Do NOT drop BP precipitously: usual general target is ≤25% reduction in the first hour, then gradual (per order). EXCEPTIONS with their own targets per order: aortic dissection (fast, HR first), ischemic stroke (lytic vs non-lytic thresholds), ICH, pre-eclampsia/eclampsia, pheochromocytoma.",
    "Vasoactive infusions (nicardipine, clevidipine, esmolol, nitroprusside, labetalol infusion) are titrated per order/pump library only — no rates in this app.",
    "Severe BP without acute organ damage (\"urgency\") usually needs oral therapy and time, not IV bolus — ask provider before PRN IV pushes."
  ],
  glance: [
    "Severe BP elevation + ACUTE organ damage (brain, heart, aorta, lungs, kidneys, eyes) = emergency",
    "Arterial line, titratable IV agent per order; controlled reduction per ordered target",
    "Condition-specific targets: dissection, stroke, ICH, eclampsia, pulmonary edema — confirm with provider"
  ],
  recognize: [
    "Very high BP (often >180/120) WITH: headache/AMS/seizure/visual change (encephalopathy/PRES), focal deficit (stroke/ICH)",
    "Chest/back pain (ACS, dissection), pulmonary edema, AKI/hematuria, retinal hemorrhage/papilledema",
    "Pregnancy/≤6 wk postpartum: pre-eclampsia/eclampsia (BP thresholds lower, magnesium per OB)",
    "Causes: med non-adherence, stimulants (cocaine/amphetamine), withdrawal (clonidine, β-blocker, alcohol), pain, urinary retention, pheochromocytoma"
  ],
  actions: [
    ["RN", "!Notify provider; repeat BP (correct cuff size, both arms if chest/back pain); continuous monitoring; neuro check."],
    ["RN", "Treat reversible causes: pain, full bladder (bladder scan), anxiety, missed home meds — report."],
    ["ORDER", "12-lead ECG, labs per order (BMP, troponin, CBC, UA, pregnancy test, tox screen); CT head/CTA per order."],
    ["PROV", "Anticipate/assist: arterial line for continuous titration."],
    ["ORDER", "Titratable IV antihypertensive per order (e.g., niCARdipine, clevidipine, labetalol, esmolol) to the ORDERED target and timeframe."],
    ["RN", "Clarify target with provider: general ≤25% in 1st hour vs condition-specific (dissection, stroke, ICH, eclampsia, pulmonary edema)."],
    ["RN", "Report overshoot: new neuro deficit, chest pain, oliguria, BP below target — stop/reduce per order and call."],
    ["ORDER", "Cocaine/amphetamine: benzodiazepines per order; question β-blocker without vasodilator."],
    ["ORDER", "Pre-eclampsia/eclampsia: magnesium sulfate + antihypertensive per OB protocol (high-alert magnesium)."]
  ],
  monitor: [
    ["RN", "BP q5–15 min during titration (arterial line preferred), HR"],
    ["RN", "Neuro checks (GCS, pupils, focal deficits, vision) q1h or per order"],
    ["RN", "Chest pain, dyspnea, SpO₂, UOP"],
    ["ORDER", "Creatinine, K, troponin trend per order; cyanide/thiocyanate risk with prolonged nitroprusside per pharmacy"],
    ["RN", "IV site (peripheral nicardipine phlebitis — rotate per policy)"]
  ],
  meds: [
    "VERIFY PER FACILITY PROTOCOL / ORDER. No infusion rates shown.",
    "niCARdipine or clevidipine infusion (dihydropyridine CCB) per order",
    "Labetalol IV bolus/infusion or esmolol infusion per order (avoid in acute HF, bradycardia, bronchospasm, cocaine without vasodilator)",
    "Nitroglycerin (ACS/pulmonary edema) or nitroprusside (arterial line; cyanide risk) per order",
    "Magnesium sulfate (eclampsia) per OB protocol · benzodiazepines (sympathomimetic) per order"
  ],
  escalate: [
    "!New neuro deficit, seizure, chest/back pain, pulmonary edema",
    "!BP falls below target or rapidly (>25% in first hour unless ordered) with symptoms",
    "Suspected dissection → Aortic dissection card; stroke/ICH → neuro cards"
  ]
};
