module.exports = {
  id: "vent-alarms", name: "Ventilator alarms troubleshooting", category: "Respiratory", emergency: true,
  keywords: ["vent alarm", "ventilator alarm", "high pressure", "high peak", "low pressure", "low volume", "low tidal volume", "leak", "cuff leak", "dope", "dopes", "disconnect", "apnea alarm", "auto-peep", "breath stacking", "dyssynchrony", "fighting vent", "peak", "plateau", "desat", "mucus plug"],
  warnings: [
    "Patient first: if distressed/desaturating/unsure → disconnect and hand-bag 100% O₂ (PEEP valve if PEEP-dependent, unless auto-PEEP is suspected).",
    "Never silence, reset, or widen alarm limits without finding the cause.",
    "Naloxone does not fix an apnea alarm on a ventilated patient — ventilate, assess, call provider before reversing any opioid/sedative."
  ],
  glance: [
    "Patient in distress or not sure? DISCONNECT from vent and hand-bag with 100% O₂, then work DOPES",
    "D-Displaced tube · O-Obstruction · P-Pneumothorax · E-Equipment · S-Stacked breaths (auto-PEEP)",
    "High pressure: Peak ↑ only = airway resistance; Peak AND plateau ↑ = lung/chest compliance (or auto-PEEP)"
  ],
  recognize: [
    "HIGH PRESSURE alarm: cough, biting ETT, secretions/mucus plug, kinked/water in tubing, bronchospasm, pneumothorax, mainstem intubation, dyssynchrony, ↓ compliance, auto-PEEP",
    "LOW PRESSURE / LOW VOLUME alarm: circuit disconnect or leak, cuff leak/rupture, ETT displaced above cords, chest tube air leak (bronchopleural fistula), inadequate trigger",
    "HIGH RR / LOW MINUTE VENTILATION: pain, anxiety, fever, acidosis, hypoxia, sepsis, over-sedation, apnea",
    "APNEA alarm: no triggering — sedation, neuro injury, paralytic, central cause"
  ],
  actions: [
    ["RN", "Look at the PATIENT first: color, chest rise, SpO₂, ETCO₂ waveform, BP, ETT depth."],
    ["RN", "!Unstable/desaturating/unsure: disconnect from vent, bag 100% O₂ via BVM (PEEP valve if PEEP-dependent), call RT + provider."],
    ["RN", "D — Displacement: ETT depth vs documented, breath sounds both lungs & stomach, ETCO₂ waveform. Not in trachea → BVM/mask and call airway help (see Airway emergency)."],
    ["RN", "O — Obstruction: suction (closed suction first); check kinks/bite (bite block), mucus plug. Catheter won't pass = blocked tube → bag, call airway help, prepare to replace ETT."],
    ["RN", "!P — Pneumothorax: unilateral breath sounds, hypotension, SpO₂ drop, ↑ airway pressures → call provider STAT (see Tension pneumothorax)."],
    ["RN", "E — Equipment: water, disconnects, kinks, clogged HME/filter, O₂ supply. Vent failure → manual ventilation and RT to swap vent."],
    ["RN", "S — Stacked breaths/auto-PEEP: expiratory flow not back to zero, hypotension → briefly disconnect to let chest exhale; tell RT/provider (↓RR, ↑expiratory time, treat bronchospasm)."],
    ["RN", "HIGH PRESSURE: with RT check peak vs plateau (passive pt, 0.5–2 s hold). Peak↑ plateau normal → resistance. Both ↑ → compliance (PTX, mainstem, edema, abdomen, ARDS, atelectasis) or auto-PEEP."],
    ["RN", "LOW VOLUME / LEAK: connections; cuff pressure by manometer (20–30 cmH₂O) — won't hold → call RT/provider (tube may need exchange); leak at mouth; chest tube bubbling; ETT may be partly out."],
    ["ORDER", "Dyssynchrony: assess pain/anxiety/air hunger; RT adjusts trigger/flow/rate per order; analgesia first, then sedation per order."],
    ["RN", "Apnea alarm: confirm backup ventilation active, check sedation level/neuro status; call provider."],
    ["RN", "Document alarms & actions. High-PEEP pts: avoid prolonged disconnects; clamp ETT for circuit change per RT."]
  ],
  monitor: [
    ["RN", "SpO₂, ETCO₂ waveform and value, HR/BP after any intervention"],
    ["RN", "Peak, plateau, driving pressure (Pplat − total PEEP), VT/MV, RR, PEEP (set vs total), I:E, FiO₂ — with RT"],
    ["RN", "Breath sounds, secretions amount/color, cuff pressure"],
    ["RN", "Sedation/analgesia level (RASS/CPOT); trigger sensitivity"],
    ["ORDER", "ABG if persistent change"]
  ],
  meds: [
    "VERIFY PER FACILITY PROTOCOL / ORDER.",
    "Albuterol/ipratropium (inline neb) for bronchospasm per order",
    "Analgesia (e.g., fentanyl) ± sedation per order for dyssynchrony; no paralytics unless ordered",
    "Naloxone: only if ordered and the pt is not ventilator-supported (suspected unintended overdose) — reversal on the vent causes agitation, hypertension, self-extubation",
    "Saline lavage not routine; mucolytics per RT/provider"
  ],
  escalate: [
    "!Not resolved in <1–2 min, or any hypoxia/hypotension → RT + provider/rapid response now",
    "!Suspected PTX, mainstem, blocked or displaced tube",
    "Acute peak pressure rise with hypotension → disconnect, bag, call",
    "Persistently high plateau >30 or driving pressure >15 → provider/RT lung-protective changes"
  ]
};
