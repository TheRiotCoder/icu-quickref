module.exports = {
  id: "airway-emergency", name: "Airway emergencies: trach/ETT displacement or obstruction, failed airway", category: "Respiratory", emergency: true,
  keywords: ["airway emergency", "trach", "tracheostomy", "trach dislodged", "decannulation", "trach obstruction", "blocked trach", "ett", "ett displacement", "unplanned extubation", "self extubation", "tube out", "difficult airway", "failed airway", "cico", "cannot intubate cannot oxygenate", "cric", "cricothyrotomy", "laryngectomy", "mucus plug"],
  warnings: [
    "Know the airway: tracheostomy (upper airway patent → can oxygenate via mouth AND stoma) vs LARYNGECTOMY (neck breather — oxygenate via stoma ONLY). Bedhead sign per policy.",
    "Fresh trach (<~7 days / before first change) — tract not formed: blind reinsertion can create a false passage; call ENT/anesthesia/airway team, oxygenate from above if upper airway patent.",
    "Failed airway / can't intubate, can't oxygenate (CICO): call for help, declare it out loud, prepare front-of-neck access kit for the provider."
  ],
  glance: [
    "Call for help + airway team; O₂ to face AND trach/stoma; capnography to confirm airflow",
    "Trach blocked: remove inner cannula → suction → deflate cuff → if still no air, remove trach (if allowed) and oxygenate",
    "ETT out/obstructed: BVM ventilation with OPA/2-person; prepare reintubation; never leave the patient"
  ],
  recognize: [
    "Sudden distress, SpO₂ fall, no/flat ETCO₂ waveform, high peak pressure or low-pressure/leak alarm, vocalizing with ETT (cuff above cords)",
    "Trach: cannot pass suction catheter, no airflow, subcutaneous emphysema, tube visibly displaced, bleeding",
    "Unplanned extubation: tube at lips/out, gurgling voice, stridor",
    "Risk: agitation/delirium, inadequate sedation, loose ties, turning/transport, thick secretions, obesity, neck edema"
  ],
  actions: [
    ["RN", "!Call for help: rapid response/airway team (anesthesia/ENT/RT) — state 'airway emergency'. Bring airway cart, capnography, suction."],
    ["RN", "Apply high-flow O₂ to face AND trach/stoma (laryngectomy: stoma only). Check ETCO₂ waveform."],
    ["RN", "Trach obstruction: remove inner cannula (clean/replace), pass suction catheter; if it won't pass, deflate cuff."],
    ["RN", "Trach still not patent and patient deteriorating: remove trach per policy (mature tract) and oxygenate via face/stoma; small ETT/new trach via stoma by trained provider."],
    ["RN", "Not breathing: BVM via mouth/nose (cover stoma) or via stoma with pediatric mask/LMA per trained staff; start CPR if pulseless."],
    ["RN", "ETT displaced/obstructed: check depth marking & cuff; pass suction catheter; if no ETCO₂ or can't ventilate → remove ETT per provider/RT and BVM with OPA (2-person)."],
    ["RN", "Unplanned extubation: assess breathing; O₂/BVM as needed; do NOT reinsert; prepare for reintubation or NIV per provider."],
    ["PROV", "Anticipate/assist: reintubation with video laryngoscopy, bougie, supraglottic airway; fiberoptic trach reinsertion."],
    ["PROV", "Anticipate/assist: CICO → front-of-neck access (scalpel-bougie-tube cricothyrotomy) by trained provider."],
    ["RN", "After airway secured: confirm with waveform capnography, CXR per order; secure tube; sedation/analgesia per order; debrief/report."]
  ],
  monitor: [
    ["RN", "Continuous SpO₂, waveform ETCO₂, HR/rhythm (bradycardia = hypoxia)"],
    ["RN", "ETT depth at lips/teeth, cuff pressure, trach ties (one finger), stoma bleeding"],
    ["RN", "Bedside emergency equipment each shift: spare trach (same size + one smaller), obturator, suction, BVM, airway cart"],
    ["RN", "Sedation/delirium (RASS, CAM-ICU) and restraint need per policy"],
    ["RN", "Secretions: humidification, suction frequency, plugging signs"]
  ],
  meds: [
    "VERIFY PER FACILITY PROTOCOL / ORDER.",
    "Oxygen; RSI drugs per provider (see Resp failure / intubation card — paralyzed ≠ sedated)",
    "Sedation/analgesia after airway secured per order",
    "Nebulized saline/racemic epinephrine for post-extubation stridor per order",
    "Topical vasoconstrictor/local anesthetic for airway bleeding/procedures per provider"
  ],
  escalate: [
    "!Any loss of airway, no ETCO₂ waveform, SpO₂ falling, bradycardia → airway team + rapid response NOW",
    "!Fresh trach displacement or laryngectomy patient with obstruction",
    "Stridor after extubation, repeated plugging, bleeding from trach site"
  ]
};
