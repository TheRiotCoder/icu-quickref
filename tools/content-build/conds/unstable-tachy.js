module.exports = {
  id: "unstable-tachy", name: "Unstable tachycardia (with a pulse)", category: "Cardiac", emergency: true,
  keywords: ["tachycardia", "tachy", "svt", "psvt", "vt", "vtach", "v-tach", "ventricular tachycardia", "wct", "wide complex", "narrow complex", "torsades", "polymorphic vt", "cardioversion", "synchronized", "sync", "adenosine", "adenocard", "procainamide", "amiodarone", "flutter"],
  warnings: [
    "Re-select SYNC before EVERY synchronized shock — most devices default back to unsynchronized after a shock. Confirm sync markers on R waves.",
    "Wide QRS or unsure → NO diltiazem or verapamil (harm). Adenosine only for REGULAR monomorphic rhythms — never irregular or polymorphic.",
    "Wide + irregular with a pulse (suspected pre-excited AF) → SYNCHRONIZED cardioversion; no AV-nodal blockers or amiodarone. Pulseless or polymorphic VT → UNSYNCHRONIZED defibrillation."
  ],
  glance: [
    "Pulse + unstable (hypotension, AMS, shock, ischemic pain, acute HF) and rhythm is the cause → SYNCHRONIZED cardioversion",
    "No pulse = cardiac arrest → CPR/defibrillate (unsynchronized). Polymorphic VT/torsades sustained = defibrillate",
    "Stable: 12-lead, vagal maneuver/adenosine per order for regular narrow; expert help for wide"
  ],
  recognize: [
    "HR usually ≥150 when the rhythm causes instability; HR <150 is rarely the cause — sinus tach with fever/pain/bleeding = treat the cause, do not cardiovert",
    "Narrow QRS (<0.12 s) vs wide QRS; regular vs irregular",
    "Instability: SBP <90, AMS, chest pain, acute HF/pulmonary edema, shock signs",
    "Wide-complex tachycardia: treat as VT until proven otherwise"
  ],
  actions: [
    ["RN", "Confirm pulse. Pulse absent → CODE. Support ABCs, O₂ if hypoxic, IV access per protocol, monitor/12-lead, pads on."],
    ["RN", "!Call rapid response / provider (expert consult)."],
    ["ORDER", "Conscious & unstable: provider-directed sedation/analgesia (do not delay shock if crashing). Airway equipment/suction at bedside."],
    ["PROV", "Anticipate/assist: SYNCHRONIZED cardioversion — sync markers on R waves before every shock; 'CLEAR'. AF/flutter: ≥200 J biphasic (or device max); narrow/wide regular: per device/protocol."],
    ["RN", "Shock fails: tell provider — increase energy per provider/device, check pad position/contact and SYNC. Sync won't fire / polymorphic → unsynchronized per provider."],
    ["RN", "!Sustained polymorphic VT/torsades or pulse lost → defibrillate NOW (unsynchronized, high energy) per ACLS/competency."],
    ["ORDER", "Torsades with long QT: magnesium IV per order (after defibrillation if unstable); correct K, stop QT-prolonging drugs; pacing/isoproterenol per expert."],
    ["RN", "STABLE regular narrow (SVT): modified Valsalva if awake/cooperative (no carotid massage) per protocol/order."],
    ["ORDER", "Then adenosine per order: 6 mg rapid IV push + immediate 20 mL flush (proximal vein/stopcock), record rhythm strip; 12 mg if no conversion (may repeat once)."],
    ["ORDER", "STABLE wide regular: 12-lead to provider; amiodarone or procainamide per expert/order (not both); continuous BP/ECG."],
    ["ORDER", "Correct K and Mg per protocol; treat cause (ischemia, drugs, hypoxia, acidosis)."]
  ],
  monitor: [
    ["RN", "Continuous ECG; repeat 12-lead after conversion; BP/HR q5 min"],
    ["RN", "Airway/sedation after cardioversion (respiratory depression)"],
    ["RN", "Recurrence; skin burns at pad site"],
    ["ORDER", "QTc, K, Mg; troponin per order"],
    ["RN", "Adenosine: brief asystole/chest tightness expected — warn the pt"],
    ["RN", "Procainamide: stop and call for hypotension, QRS widening >50%, arrhythmia termination, or ordered max reached"]
  ],
  meds: [
    "VERIFY PER FACILITY PROTOCOL / ORDER (AHA 2025 ALS). Typical adult published bolus doses — give only if ordered.",
    "Adenosine 6 mg rapid IV push, then 12 mg (may repeat 12 mg once). Central line, heart transplant, dipyridamole or carbamazepine: reduced dose per pharmacy. Avoid in asthma/active bronchospasm, 2nd/3rd-degree block or sick sinus without pacer; theophylline/caffeine antagonize",
    "Amiodarone IV per order (bolus then infusion per pharmacy; BP, QTc)",
    "Procainamide per expert/order only — not with long QT; reduce in renal impairment; stop criteria above",
    "Magnesium IV for torsades — dose/rate per order",
    "Sedation for cardioversion (e.g., etomidate/midazolam/ketamine/propofol) per provider"
  ],
  escalate: [
    "!Unstable → cardioversion NOW; pulseless → ACLS",
    "!Pre-excitation (WPW) or unclear wide irregular → no AV-nodal blockers, no amiodarone; synchronized cardioversion if unstable",
    "Recurrent VT/VF or incessant tachycardia → cardiology / electrophysiology"
  ]
};
