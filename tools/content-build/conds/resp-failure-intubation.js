module.exports = {
  id: "resp-failure-intubation", name: "Acute respiratory failure: intubation & vent basics", category: "Respiratory", emergency: true,
  keywords: ["respiratory failure", "resp failure", "intubation", "intubate", "rsi", "airway", "ett", "et tube", "ventilator", "vent", "vent settings", "mechanical ventilation", "bipap", "cpap", "niv", "hfnc", "high flow", "hypoxia", "hypoxemia", "hypercapnia", "etomidate", "ketamine", "rocuronium", "roc", "succinylcholine", "sux", "paralytic", "sedation"],
  warnings: [
    "PARALYZED ≠ SEDATED: start analgesia/sedation IMMEDIATELY after tube confirmation (rocuronium lasts ~45–70+ min; induction agents 5–15 min). Request orders before induction.",
    "Succinylcholine CONTRAINDICATED: hyperkalemia, burns/crush >24–72 h, prolonged immobilization/ICU stay > a few days, critical-illness neuromyopathy, spinal cord injury/stroke >48–72 h, neuromuscular disease (incl. Guillain-Barré), rhabdomyolysis, malignant hyperthermia history, pseudocholinesterase deficiency.",
    "Neuromuscular blockers, induction agents, sedative infusions and push-dose pressors are HIGH-ALERT: ordered/dosed by the intubating provider; label 'paralyzing agent'; push-dose pressor only from pharmacy-prepared/standard syringe.",
    "Asthma/COPD: default RR 14–20 can cause breath stacking/auto-PEEP/arrest — see 'Severe asthma / COPD' card (low RR, long expiration)."
  ],
  glance: [
    "Struggling? Call help, 100% O₂, BVM/NIV — oxygenate and resuscitate BEFORE intubation",
    "Prep (SOAP-ME): Suction, Oxygen, Airway equipment, Pharmacy, Monitors/Equipment; code status/DNI checked",
    "Confirm tube with waveform ETCO₂ → START SEDATION/ANALGESIA NOW → lung-protective settings per order"
  ],
  recognize: [
    "Hypoxemic: SpO₂ <90% on high-flow O₂, RR >30, accessory muscle use, cyanosis, P/F <200",
    "Hypercapnic: AMS/somnolence, pH <7.30 with PaCO₂ >50, rising ETCO₂, shallow breathing, tripod/paradoxical breathing",
    "Failing: exhaustion, can't speak full sentences, silent chest, poor airway protection (vomiting, secretions, falling GCS/trajectory — GCS ≤8 alone is not an automatic order)"
  ],
  actions: [
    ["RN", "!Call rapid response / provider / airway team early. Sit upright, O₂ via NRB or HFNC per protocol. Suction."],
    ["RN", "Confirm code status/DNI and goals with provider (unless emergent per policy)."],
    ["ORDER", "Reversible causes per order: bronchospasm (albuterol), pulmonary edema (diuretic/nitrate/NIV), pneumothorax, secretions, opioid (naloxone)."],
    ["ORDER", "HFNC or NIV per provider (HFNC preferred for de novo hypoxemia; NIV for hypercapnic COPD/cardiogenic edema). Not if vomiting, falling GCS, shock, facial trauma. Reassess 30–60 min."],
    ["RN", "Pre-intubation setup: IV ×2, monitor/waveform ETCO₂, BVM + PEEP valve, suction, video + direct laryngoscope, ETT + 1 size smaller, stylet/bougie, SGA/cric kit, vent ready."],
    ["ORDER", "Resuscitate before intubating per order: fluids/pressor ready; preoxygenate 3–5 min (NRB + nasal cannula or NIV); apneic O₂ via NC; HOB up 20–30°."],
    ["PROV", "Anticipate/assist: RSI — induction agent + neuromuscular blocker chosen/dosed by intubating provider (reduced induction dose in shock). Drugs drawn up, labeled, double-checked."],
    ["PROV", "Anticipate/assist: tube placement; cuff up; waveform ETCO₂ — flat/absent after 6 breaths = esophageal until proven otherwise; breath sounds; depth at teeth (≈21 cm F / 23 cm M)."],
    ["ORDER", "!IMMEDIATELY after confirmation (before CXR/OG): start analgesia + sedation per order (paralyzed ≠ sedated); treat post-intubation hypotension per order."],
    ["RN", "Secure ETT; cuff pressure 20–30 cmH₂O; OG tube per order; CXR per order (tip 2–5 cm above carina)."],
    ["ORDER", "Initial vent set by provider/RT: usual A/C volume, VT 6–8 mL/kg PBW, RR 14–20, PEEP 5, FiO₂ 100% → titrate. Asthma/COPD: RR 8–12, long expiration. ARDS: see ARDS card. RN: verify height/PBW, alarms."],
    ["ORDER", "ABG 20–30 min after intubation per order. Bundle: HOB 30–45°, oral care, daily SAT/SBT, DVT/GI prophylaxis per orders."]
  ],
  monitor: [
    ["RN", "Continuous SpO₂, waveform ETCO₂, ECG, BP (post-intubation hypotension common — q1–2 min first 15 min)"],
    ["RN", "Vent: peak & plateau pressures (plateau ≤30), VT/minute ventilation, RR, auto-PEEP, FiO₂/PEEP — report to RT/provider"],
    ["RN", "Breath sounds, chest rise, secretions, ETT depth and cuff leak"],
    ["RN", "Sedation depth (RASS) to ordered target, pain (CPOT/BPS), delirium (CAM-ICU)"],
    ["ORDER", "ABG/VBG, lactate; CXR; Na/K; triglycerides if on propofol"]
  ],
  meds: [
    "VERIFY PER FACILITY PROTOCOL / ORDER. No numeric doses for RSI, paralytic, sedative infusions or push-dose pressors — per intubating provider/order/pump library.",
    "Preoxygenation: NRB + nasal cannula 15 L/min, or NIV/HFNC",
    "Induction (e.g., ketamine, etomidate, propofol — propofol hypotension) — provider-dosed; reduced in shock; weight basis per provider/pharmacy",
    "Neuromuscular blocker: rocuronium (commonly preferred) or succinylcholine (see contraindications) — HIGH-ALERT; know where sugammadex is stocked",
    "Push-dose vasopressor ONLY per order from pharmacy-prepared/standard syringe (concentration on label); do not self-dilute without second check",
    "Analgesia-first sedation per order (fentanyl, then propofol or dexmedetomidine) — rates/units per pump library; dexmedetomidine bradycardia/hypotension",
    "Bronchodilators albuterol/ipratropium; steroids for asthma/COPD flare per order"
  ],
  escalate: [
    "!Can't intubate / can't oxygenate → difficult airway call, SGA, front-of-neck access per airway algorithm (see Airway emergency card)",
    "!SpO₂ <88% despite 100% FiO₂, rising PaCO₂/pH <7.25, shock post-intubation",
    "Persistently high plateau >30 → ARDS strategy/ICU attending",
    "Unplanned extubation: never re-advance a displaced tube; deflate cuff if partly out, BVM + adjunct, call airway-qualified provider (see Airway emergency card)"
  ]
};
