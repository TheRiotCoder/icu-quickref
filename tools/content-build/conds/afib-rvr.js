module.exports = {
  id: "afib-rvr", name: "Atrial fibrillation with RVR", category: "Cardiac", emergency: false,
  keywords: ["afib", "a-fib", "af", "atrial fibrillation", "rvr", "rapid ventricular response", "aflutter", "atrial flutter", "irregular", "diltiazem", "cardizem", "metoprolol", "esmolol", "amiodarone", "digoxin", "cardioversion", "wpw", "pre-excited", "pre-excitation"],
  warnings: [
    "WIDE, FAST, IRREGULAR rhythm (varying QRS width) = pre-excited AF (WPW) until proven otherwise: NO diltiazem, verapamil, β-blocker, digoxin, adenosine OR IV amiodarone (AHA 2025: harm). Unstable → synchronized cardioversion; stable → expert/provider order only (e.g., procainamide).",
    "Do not stack IV non-DHP calcium-channel blocker and IV β-blocker without explicit provider order (profound bradycardia/hypotension).",
    "Digoxin: narrow therapeutic index — load only per prescriber/pharmacy; check K⁺/Mg²⁺ and renal function first; verify vial strength (mg vs mcg; adult vs pediatric)."
  ],
  glance: [
    "Irregularly irregular, HR often >110–150. Is the RHYTHM causing instability, or is it compensatory (sepsis, bleeding, hypovolemia)?",
    "Unstable AND rhythm is the likely cause → synchronized cardioversion (≥200 J biphasic per device/provider)",
    "Stable → treat cause, correct K/Mg, rate control per order. Wide + irregular = suspect WPW: no AV-nodal blockers or amiodarone"
  ],
  recognize: [
    "Irregularly irregular narrow-complex rhythm, no P waves, HR >100 (RVR commonly >110–120)",
    "Symptoms: palpitations, dyspnea, dizziness, chest pain, hypotension",
    "Wide irregular fast rhythm with varying QRS width, rate often >200 with some very short R-R: pre-excited AF (WPW) — DANGER",
    "Regular narrow tachycardia fixed ≈150 = atrial flutter 2:1 until proven otherwise (provider may use adenosine to unmask)",
    "In ICU, RVR is often compensatory/secondary: sepsis, volume depletion, bleeding, pain, withdrawal, PE, hypoxia, thyroid, catecholamines/inotropes — fix the driver"
  ],
  actions: [
    ["RN", "Assess perfusion: BP, mentation, chest pain, shock/acute HF. Apply pads. Get 12-lead; show provider (QRS narrow vs wide/variable)."],
    ["RN", "!Unstable → call provider/rapid response. Rhythm the cause (very fast, ischemia/pulmonary edema)? Prepare synchronized cardioversion."],
    ["PROV", "Anticipate/assist: synchronized cardioversion, initial ≥200 J biphasic (or device maximum) per provider/device; procedural sedation per provider order; re-arm SYNC after each shock; 'CLEAR'."],
    ["RN", "Compensatory? (sepsis, bleeding, hypovolemia, hypoxia, pain, on pressors/inotropes, HR often 120–140) → tell provider; treat the cause first."],
    ["ORDER", "Labs per order: K (common goal ≥4.0), Mg (≥2.0), TSH, troponin, lactate, CBC, ABG. Replace K/Mg per protocol (rate/line per policy; reduce in renal impairment)."],
    ["ORDER", "Treat triggers per order: fluids if hypovolemic, analgesia, infection/PE treatment, minimize catecholamines, stop offending drugs."],
    ["ORDER", "STABLE, narrow QRS: rate control per order (diltiazem, metoprolol or esmolol). Hold/clarify if SBP <100, on vasopressors, EF low/unknown, acute HF, bronchospasm, or just after other IV AV-nodal blocker."],
    ["ORDER", "Hypotension, decompensated HF or reduced EF (non-pre-excited): amiodarone or digoxin per order — amiodarone may chemically cardiovert (embolic risk if AF >48 h/unknown); central line preferred for infusion."],
    ["RN", "!Wide, irregular, varying QRS → stop: no diltiazem/verapamil/β-blocker/digoxin/adenosine/amiodarone; call provider now."],
    ["RN", "Ask/document AF duration and anticoagulation: >48 h/unknown and not anticoagulated → conversion (electrical or drug) raises stroke risk — tell provider. Unstable: do not delay cardioversion."]
  ],
  monitor: [
    ["RN", "Continuous ECG; HR and BP q5–15 min while titrating; goal resting HR per provider (often <110)"],
    ["RN", "Hypotension/bradycardia after IV diltiazem or β-blocker; infusion rates match order/pump library"],
    ["ORDER", "K, Mg after each repletion; QTc and BP/HR with amiodarone; digoxin level/renal function per order"],
    ["RN", "Signs of stroke/embolism (new neuro deficit), HF"],
    ["RN", "Response to treating underlying cause"]
  ],
  meds: [
    "VERIFY PER FACILITY PROTOCOL / ORDER. No numeric doses for antiarrhythmic/rate-control drugs — per order/pharmacy.",
    "Diltiazem IV (weight-based, facility cap) / infusion per pump library — not if hypotensive, shock, reduced EF, or just after IV β-blocker",
    "Metoprolol IV / esmolol infusion per order — hold for hypotension, bradycardia, AV block, decompensated HF, bronchospasm",
    "Amiodarone IV per order (standard concentration; central preferred for infusion; BP, HR, QTc; warfarin/digoxin interactions) — NEVER in pre-excited AF",
    "Digoxin per prescriber/pharmacy only (renal function, lean weight, prior digoxin, K/Mg; vial strength) — slow onset, not for acute control",
    "Magnesium / potassium replacement per protocol (rate/line per policy)",
    "Anticoagulation (heparin / DOAC) for stroke prevention per provider (HIGH-ALERT)"
  ],
  escalate: [
    "!Hypotension, chest pain, AMS, pulmonary edema, or HR >150 not responding → provider for cardioversion/cardiology",
    "!Wide irregular tachycardia → treat as pre-excited AF/VT: no AV-nodal blockers, no amiodarone; cardioversion if unstable",
    "New neuro deficit → stroke code",
    "Recurrent RVR with pressor requirement: reconsider drivers and antiarrhythmic strategy with provider"
  ]
};
