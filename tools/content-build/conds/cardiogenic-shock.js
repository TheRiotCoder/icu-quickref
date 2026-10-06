module.exports = {
  id: "cardiogenic-shock", name: "Cardiogenic shock", category: "Cardiac", emergency: false,
  keywords: ["cardiogenic shock", "cs", "pump failure", "low output", "lv failure", "rv failure", "scai", "inotrope", "dobutamine", "milrinone", "norepinephrine", "levophed", "norepi", "iabp", "balloon pump", "impella", "ecmo", "va-ecmo", "mcs", "heart failure", "shock team"],
  warnings: [
    "Vasopressors/inotropes are HIGH-ALERT: dose, concentration and units (mcg/min vs mcg/kg/min) per order and pump library; independent double check.",
    "DOBUTamine ≠ DOPamine (look-alike). Milrinone: renally cleared (accumulates), bolus only if explicitly ordered (hypotension).",
    "Peripheral vasopressor only per policy: large proximal vein, site check at least hourly; extravasation → stop, leave catheter, aspirate, call, facility extravasation protocol (antidote only per order)."
  ],
  glance: [
    "Hypotension + cool/clammy + congestion (crackles, JVD) + falling UOP = pump failure",
    "Get 12-lead, call provider/cardiology (shock team) early; echo is key",
    "NO large fluid boluses if congested; vasopressor ± inotrope per order; early MCS evaluation per team"
  ],
  recognize: [
    "SBP <90 (or MAP <60 / drop ≥30 mmHg) sustained, or needing pressors, with signs of hypoperfusion",
    "Early ('normotensive') shock: normal BP but cold, oliguric, lactate >2 — SCAI stages A–E",
    "Cold, clammy, mottled extremities; AMS; oliguria; lactate >2; narrow pulse pressure",
    "Pulmonary edema (crackles, hypoxia, pink frothy sputum), JVD, S3",
    "Common causes: large MI, mechanical complication (VSD, papillary muscle rupture), acute-on-chronic HF, myocarditis, arrhythmia, valve failure, PE, tamponade"
  ],
  actions: [
    ["RN", "!Call rapid response/provider and cardiology (shock team if available)."],
    ["RN", "Continuous ECG, SpO₂; upright position if BP allows. O₂ for hypoxia per protocol."],
    ["ORDER", "NIV/HFNC per order — usually helps pulmonary edema; watch BP after start (preload drop), esp. RV failure."],
    ["RN", "12-lead ECG now; notify provider. Anticipate STAT bedside echo (LV/RV, effusion, valves)."],
    ["PROV", "Anticipate/assist: arterial line and central venous access."],
    ["ORDER", "Labs per order: lactate, troponin, BNP, BMP, LFTs, ABG, CBC, coags, type & screen."],
    ["ORDER", "Fluid challenge ONLY if ordered and clearly dry/no congestion (small volume) — reassess after."],
    ["ORDER", "Vasopressor (norepinephrine commonly first-line) titrated to ordered MAP goal (typically ≥65) per order/pump library."],
    ["ORDER", "Inotrope for low output per order (DOBUTamine; milrinone) — watch tachyarrhythmia and hypotension."],
    ["PROV", "Anticipate/assist: treat cause — ACS → emergent revascularization; arrhythmia → cardioversion/rate control; tamponade → drainage."],
    ["PROV", "Anticipate/assist: MCS (IABP/Impella/VA-ECMO) evaluation — team decision, selected pts, early (SCAI C–D)."],
    ["ORDER", "Foley + strict I&O per order. Hold antihypertensives, β-blockers, ACE-i/ARB, nephrotoxins as directed."]
  ],
  monitor: [
    ["RN", "MAP (goal per order, typically ≥65), HR/rhythm, cap refill/skin temperature, mentation"],
    ["ORDER", "Lactate q2–4 h until falling (per order); UOP hourly"],
    ["RN", "Oxygenation, work of breathing; ventilation needs"],
    ["RN", "CO/CI, ScvO₂, PA catheter data if present (CI <2.2 L/min/m², PCWP ↑) — report trends"],
    ["RN", "Pressor/inotrope requirement trend (rapidly rising → call), infusion site/extravasation, arrhythmias, K and Mg"],
    ["RN", "MCS: leg straight with femoral devices; distal pulses/color/temp hourly; bleeding; hemolysis (dark urine); device alarms → call, never reposition/turn off"]
  ],
  meds: [
    "VERIFY PER FACILITY PROTOCOL / ORDER. No infusion doses shown — per order/pump library.",
    "Norepinephrine — commonly first-line vasopressor; titrate to ordered MAP (HIGH-ALERT)",
    "DOBUTamine — inotrope; tachyarrhythmia/hypotension (do not confuse with DOPamine)",
    "Milrinone — inotrope/vasodilator; renal adjustment per pharmacy; bolus only if explicitly ordered",
    "Epinephrine — third-line per provider (lactic acidosis, arrhythmia)",
    "Loop diuretic (e.g., furosemide IV) per order once perfusion/BP adequate and congested",
    "Avoid: large fluid loads if congested, vasodilators/nitrates when hypotensive, negative inotropes"
  ],
  escalate: [
    "!MAP below goal despite pressor, lactate rising, worsening hypoxia/mental status",
    "!Need for MCS or revascularization — contact cardiology/cath lab early (time-sensitive)",
    "Arrhythmia with instability → synchronized cardioversion/ACLS",
    "MCS alarm, limb ischemia, bleeding or dark urine → provider/MCS team now"
  ]
};
