module.exports = {
  id: "status-epilepticus", name: "Status epilepticus / seizure", category: "Neuro", emergency: true,
  keywords: ["seizure", "sz", "seizing", "status", "status epilepticus", "se", "convulsion", "fit", "ncse", "nonconvulsive", "lorazepam", "ativan", "midazolam", "versed", "diazepam", "levetiracetam", "keppra", "fosphenytoin", "phenytoin", "dilantin", "valproate", "eclampsia"],
  warnings: [
    "Second-line drug goes in as soon as benzodiazepine fails (~5 min after a full dose) — do NOT wait until 20 min.",
    "Midazolam comes as 1 mg/mL and 5 mg/mL — check vial strength. Fosphenytoin is dosed in mg PE (phenytoin equivalents) — do not confuse with phenytoin.",
    "Paralytic/deep sedation masks seizures — intubated pt may be in nonconvulsive status: continuous EEG."
  ],
  glance: [
    "Seizure ≥5 min (or repeated without recovery) = emergency → call for help, time it",
    "Protect airway, O₂, CHECK GLUCOSE, IV access",
    "Benzodiazepine per order at 5 min (IV lorazepam or IM midazolam) → second-line IMMEDIATELY if still seizing"
  ],
  recognize: [
    "Continuous seizure activity ≥5 min, or ≥2 seizures without return to baseline",
    "Subtle/non-convulsive status: unexplained coma, twitching eyes/face, fluctuating consciousness, unexplained pupil/HR/BP swings (needs EEG)",
    "Triggers: missed AEDs, alcohol/benzodiazepine withdrawal, hypoglycemia, hyponatremia, hypoxia, infection, stroke/ICH, toxins, TBI",
    "Pregnant or ≤6 wk postpartum + seizure = eclampsia until proven otherwise"
  ],
  actions: [
    ["RN", "Note seizure START TIME. Call for help / rapid response. Remove hazards, side-lying if possible, pad rails. Nothing in mouth."],
    ["RN", "ABCs: suction, jaw thrust, O₂ (NRB/BVM) as needed; SpO₂ & ECG monitor. Airway equipment/BVM at bedside."],
    ["RN", "POINT-OF-CARE GLUCOSE. Hypoglycemic (or unknown & seizing): dextrose per hypoglycemia protocol/order — give thiamine with or right after if at risk; never delay dextrose."],
    ["ORDER", "IV/IO access; labs per order (BMP, Mg, Ca, CBC, tox, AED levels, ABG). Check what benzodiazepine was already given (pre-arrival/earlier)."],
    ["ORDER", "!At 5 min — FIRST-LINE benzodiazepine per seizure order set (IV lorazepam; IM midazolam if no IV; or IV diazepam). No order? Ask for a verbal order at the 5-min call."],
    ["RN", "Prepare second-line drug while the benzodiazepine is given; anticipate respiratory depression."],
    ["ORDER", "!Still seizing ~5 min after full-dose benzodiazepine (or recurs) → request second-line NOW (levetiracetam, fosphenytoin or valproate per order). Goal: infusing by ~20 min from onset."],
    ["RN", "During fosphenytoin/phenytoin: continuous ECG & BP (hypotension, bradycardia/arrhythmia); phenytoin via large vein (extravasation/'purple glove')."],
    ["ORDER", "Eclampsia: magnesium sulfate per OB protocol/order (HIGH-ALERT; reflexes, RR, UOP); left-lateral; call OB + rapid response."],
    ["PROV", "!Anticipate/assist: refractory (benzo + one second-line failed) → call ICU/neurology now: intubation + continuous anesthetic infusion with continuous EEG."],
    ["ORDER", "Head CT once stabilized if new/unexplained; LP/EEG per provider."]
  ],
  monitor: [
    ["RN", "Airway, SpO₂/ETCO₂, BP, ECG during and after meds; respiratory depression after benzodiazepines"],
    ["RN", "Neuro checks/GCS; post-ictal state should improve over minutes–hour — not waking up = suspect NCSE, tell provider"],
    ["ORDER", "Glucose, Na, Ca, Mg; temperature (hyperthermia, rhabdo → CK, urine color) per order"],
    ["RN", "Seizure precautions; document duration, type, laterality, eye deviation, post-ictal findings"],
    ["ORDER", "Continuous EEG if not waking up, intubated/paralyzed, or on anesthetic infusion"]
  ],
  meds: [
    "VERIFY PER FACILITY PROTOCOL / ORDER (AES 2016 / NCS). Typical adult published doses — give only if ordered/per protocol.",
    "Lorazepam IV 0.1 mg/kg (max 4 mg/dose), may repeat once; give at labeled rate (refrigerated stock)",
    "Midazolam IM 10 mg (adult >40 kg) — check vial strength (1 vs 5 mg/mL); single dose",
    "Diazepam IV 0.15–0.2 mg/kg (max 10 mg/dose), may repeat once (accumulates in elderly/hepatic impairment)",
    "Second-line (pick one, weight-based load per order/pharmacy): levetiracetam · fosphenytoin (mg PE) · valproate (avoid in liver disease, pregnancy, thrombocytopenia, suspected metabolic/mitochondrial disease)",
    "Thiamine IV if alcohol/malnutrition · dextrose for hypoglycemia (see Hypoglycemia card)",
    "Refractory: midazolam/propofol/ketamine infusions, pentobarbital — per order/ICU protocol (HIGH-ALERT; pump library)",
    "Pyridoxine in INH toxicity; magnesium for eclampsia — per order"
  ],
  escalate: [
    "!Seizure >5 min, repeated seizures, no return to baseline, hypoxia, or aspiration",
    "!Benzodiazepine failed → second-line now; benzo + one second-line failed (refractory) → ICU/neurology, continuous EEG, anesthetic infusion",
    "New focal deficit, head trauma, fever/neck stiffness, pregnancy/postpartum, anticoagulated pt → provider now"
  ]
};
