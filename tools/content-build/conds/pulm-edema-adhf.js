module.exports = {
  id: "pulm-edema-adhf", name: "Acute pulmonary edema / acute decompensated HF", category: "Cardiac", emergency: false,
  keywords: ["pulmonary edema", "flash pulmonary edema", "ape", "adhf", "chf", "heart failure", "hf exacerbation", "fluid overload", "volume overload", "crackles", "rales", "pink frothy sputum", "lasix", "furosemide", "diuretic", "nitroglycerin", "ntg", "bipap", "cpap", "scape"],
  warnings: [
    "Nitrates contraindicated/caution: SBP below ordered threshold, PDE-5 inhibitor use (sildenafil/vardenafil 24 h, tadalafil 48 h), RV infarct, severe aortic stenosis — ask provider.",
    "Hypotension or poor perfusion with pulmonary edema = cardiogenic shock — do NOT give vasodilators; see Cardiogenic shock card.",
    "Nitroglycerin/nitroprusside/inotrope infusions are titrated per order/pump library only (no rates in this app)."
  ],
  glance: [
    "Acute dyspnea, crackles, hypoxemia, often hypertensive (SCAPE) → sit upright, O₂, CPAP/BiPAP per order",
    "Hypertensive: nitrate vasodilation per order; congested: IV loop diuretic per order",
    "Hypotensive/cold = cardiogenic shock pathway; find trigger (ACS, arrhythmia, valve, med/diet non-adherence)"
  ],
  recognize: [
    "Sudden/worsening dyspnea, orthopnea, tachypnea, anxiety, diaphoresis; pink frothy sputum",
    "Crackles, wheeze ('cardiac asthma'), JVD, S3, edema, weight gain; SpO₂ ↓",
    "Profile: warm-wet (congested, perfused) vs cold-wet (shock); SCAPE: very high BP + flash edema",
    "CXR: vascular congestion/edema; POCUS B-lines; BNP ↑; ECG/troponin for ischemia; new murmur → valve/ruptured papillary muscle"
  ],
  actions: [
    ["RN", "!Call provider/RT if hypoxemic or distressed. Sit upright, legs dependent; continuous SpO₂, ECG, frequent BP."],
    ["ORDER", "O₂ to target per order; CPAP/BiPAP early for respiratory distress/hypoxemia per order (watch BP — positive pressure lowers preload)."],
    ["ORDER", "12-lead ECG STAT (ACS? arrhythmia?); labs per order: troponin, BNP, BMP, Mg, CBC, ABG/VBG, lactate."],
    ["ORDER", "Hypertensive/SCAPE: SL nitroglycerin 0.4 mg if ordered (check SBP & PDE-5i), then IV nitrate infusion titrated per order."],
    ["ORDER", "Congestion: IV loop diuretic per order (dose often based on home dose); strict I&O, urinary catheter per order; reassess UOP within 2–6 h per order."],
    ["RN", "Hold/clarify: IV fluids, negative inotropes (new β-blocker/non-DHP CCB in acute decompensation), NSAIDs — ask provider."],
    ["ORDER", "Treat trigger per order: rapid AF (see AF card), ACS (see ACS card), hypertensive emergency, infection, med non-adherence."],
    ["PROV", "Anticipate/assist: intubation if NIV failure/AMS (hemodynamic collapse risk — pressors ready)."],
    ["PROV", "Anticipate/assist: cardiology/echo; mechanical support or ultrafiltration for refractory cases; urgent surgery for acute valve lesion."],
    ["RN", "Shock signs (SBP low, cold, oliguria, lactate ↑) → stop vasodilators per order and escalate (Cardiogenic shock card)."]
  ],
  monitor: [
    ["RN", "SpO₂, RR, work of breathing, BP q5–15 min during titration"],
    ["RN", "Hourly UOP, I&O, daily weight"],
    ["ORDER", "K, Mg, creatinine after diuresis per order"],
    ["RN", "Headache/hypotension with nitrates; NIV tolerance, mask fit, aspiration"],
    ["RN", "Rhythm (AF, VT), chest pain, perfusion (skin, mentation, lactate)"]
  ],
  meds: [
    "VERIFY PER FACILITY PROTOCOL / ORDER. No infusion rates shown.",
    "Nitroglycerin SL 0.4 mg (if ordered) → IV nitroglycerin infusion per order (nitroprusside per provider/arterial line)",
    "Loop diuretic IV (furosemide, bumetanide) per order ± thiazide per provider",
    "Inotrope (DOBUTamine, milrinone) only for low output per order — see Cardiogenic shock",
    "K/Mg replacement per protocol"
  ],
  escalate: [
    "!SpO₂ falling or work of breathing worsening on NIV, AMS, inability to protect airway",
    "!SBP falling/shock signs, new arrhythmia, ischemic ECG changes or chest pain",
    "Poor diuretic response (low UOP) or worsening creatinine → provider/cardiology"
  ]
};
