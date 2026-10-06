module.exports = {
  id: "tamponade", name: "Cardiac tamponade", category: "Cardiac", emergency: true,
  keywords: ["tamponade", "cardiac tamponade", "pericardial tamponade", "pericardial effusion", "effusion", "pericardiocentesis", "becks triad", "beck's", "pulsus paradoxus", "muffled heart sounds", "electrical alternans", "post cardiac surgery", "chest tube output", "resternotomy", "hemopericardium"],
  warnings: [
    "Tamponade after cardiac surgery, from aortic dissection, or MI free-wall rupture → call cardiac surgery NOW: needle pericardiocentesis is usually NOT the treatment (can cause re-bleeding/death) — surgical re-exploration/drainage. Needle drainage suits malignant, uremic, idiopathic, post-cath-lab effusions.",
    "Post-op tamponade can be LOCALIZED (clot) — TTE may miss it. Low output + high CVP + falling UOP + falling drain output = call surgeon even if echo 'negative'.",
    "Pericardiocentesis, thoracotomy and resternotomy are PROVIDER procedures."
  ],
  glance: [
    "Hypotension + JVD + muffled heart sounds (Beck's) / pulsus paradoxus = TAMPONADE until proven otherwise",
    "STAT echo + cardiology/cardiac surgery; preload dependent — small fluid bolus per order as bridge",
    "Definitive drainage by provider (surgical if post-cardiac surgery/dissection/rupture); avoid positive pressure/intubation if possible"
  ],
  recognize: [
    "Beck's triad: hypotension, JVD, muffled heart sounds (often incomplete)",
    "Tachycardia, dyspnea, pulsus paradoxus (inspiratory SBP drop >10 mmHg; absent on positive-pressure ventilation, RV hypertrophy, regional tamponade), narrow pulse pressure",
    "ECG: low voltage, electrical alternans, sinus tach. Post-cardiac surgery: sudden drop in chest-tube output with hypotension, ↑CVP, equalized pressures",
    "Causes: malignancy, post-cardiac surgery/procedure, trauma, aortic dissection, MI free-wall rupture, uremia, infection, anticoagulation",
    "Echo: effusion with RA/RV diastolic collapse, plethoric IVC"
  ],
  actions: [
    ["RN", "!Call rapid response/provider, cardiology/cardiac surgery STAT. Request STAT bedside echo."],
    ["RN", "O₂, monitor, large-bore IV; position of comfort (often upright)."],
    ["ORDER", "Support preload per order: small crystalloid bolus as temporizing bridge (may harm if CVP already high)."],
    ["RN", "Avoid/question: diuretics, vasodilators, sedation; tell provider before intubation/positive pressure (drops preload) — if unavoidable: pressors ready, low PEEP/VT, drainage first if possible."],
    ["ORDER", "Vasopressor/inotrope per order only as a bridge (norepinephrine, DOBUTamine)."],
    ["RN", "Post-cardiac surgery: sudden drop in chest-tube output + hypotension/↑CVP = call surgeon NOW. Clear tubes only per unit policy (many ban stripping); don't delay the call."],
    ["PROV", "Anticipate/assist: echo-guided pericardiocentesis (non-surgical causes): tray, catheter, drainage bag, sterile prep; emergency consent per policy; don't delay for coags if unstable."],
    ["PROV", "Anticipate/assist: post-cardiac surgery/dissection/rupture → surgical drainage/re-exploration; resternotomy kit to bedside; arrest → CALS (see Post-cardiac-surgery card)."],
    ["ORDER", "Hold/reverse anticoagulants per provider (protamine slowly — hypotension/anaphylaxis)."],
    ["PROV", "Anticipate/assist: traumatic arrest from tamponade → emergency thoracotomy/pericardiocentesis per ATLS."]
  ],
  monitor: [
    ["RN", "BP, HR, CVP, SpO₂, mentation continuously; pulsus paradoxus on arterial line"],
    ["RN", "Drain output (volume, color, rate), chest-tube patency"],
    ["RN", "Post-drainage: BP improvement, recurrence signs; repeat echo per order"],
    ["ORDER", "Coags, Hgb; ECG voltage"],
    ["RN", "Pericardial drain care per policy; hemodynamic changes after drainage"]
  ],
  meds: [
    "VERIFY PER FACILITY PROTOCOL / ORDER.",
    "Crystalloid small bolus per order (temporizing only)",
    "Norepinephrine / DOBUTamine as bridge only — per order/pump library",
    "Local anesthetic ± minimal sedation (e.g., ketamine) for pericardiocentesis — provider order",
    "Protamine (slow) / 4F-PCC / vitamin K (slow IV) for reversal if indicated — per order"
  ],
  escalate: [
    "!Any hypotension with suspected tamponade → provider for emergent drainage decision (right procedure for the cause)",
    "!Cardiac arrest/PEA post-cardiac surgery → CALS (emergency resternotomy) per facility",
    "Recurrent or loculated effusion → surgical window"
  ]
};
