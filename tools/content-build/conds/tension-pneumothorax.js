module.exports = {
  id: "tension-pneumothorax", name: "Tension pneumothorax", category: "Respiratory", emergency: true,
  keywords: ["tension pneumothorax", "pneumothorax", "ptx", "tpx", "collapsed lung", "needle decompression", "finger thoracostomy", "chest tube", "barotrauma", "absent breath sounds", "high peak pressure", "subcutaneous emphysema"],
  warnings: [
    "Needle/finger decompression and chest tube insertion are PROVIDER procedures — nurse recognizes, calls, prepares and assists.",
    "Do NOT clamp a chest tube with an air leak (or for transport) — tension can recur."
  ],
  glance: [
    "Sudden hypoxia + hypotension + one-sided absent breath sounds (esp. on vent / after line) = suspect TENSION",
    "This is a CLINICAL diagnosis — unstable? do not wait for chest X-ray or ultrasound",
    "Call provider STAT; 100% O₂; prepare for provider decompression then chest tube"
  ],
  recognize: [
    "Severe respiratory distress, rising peak airway pressures on vent, falling SpO₂",
    "Hypotension, tachycardia, JVD (may be absent if hypovolemic), PEA arrest",
    "Unilateral absent/decreased breath sounds, hyperresonance; subcutaneous emphysema",
    "Tracheal deviation (LATE sign). Risks: positive-pressure ventilation, trauma, central line, CPR, thoracentesis",
    "Ultrasound (if available, never delaying decompression): absent lung sliding is suggestive, not diagnostic (also mainstem intubation, apnea, bullae); lung point confirms"
  ],
  actions: [
    ["RN", "!Call provider / rapid response STAT. State: 'suspected tension pneumothorax'."],
    ["RN", "100% O₂. Ventilated: briefly disconnect from vent to allow exhalation; bag gently at low rate while decompression is prepared; check DOPE (see Vent alarms)."],
    ["RN", "Prepare: large-bore 14 G catheter ≥8 cm (3.25 in) (may be too short in obesity), finger-thoracostomy/chest tube tray, chlorhexidine, sterile gloves, drainage system."],
    ["PROV", "Anticipate/assist: needle decompression — affected side, 5th ICS anterior-to-mid axillary line (alt 2nd ICS midclavicular), over top of rib. Air rush may be absent; judge by response."],
    ["PROV", "Anticipate/assist: needle fails or peri-arrest → finger (simple) thoracostomy, then chest tube (needle decompression alone is temporary)."],
    ["ORDER", "Connect chest tube to water seal/suction per order; system upright and below chest; secure all connections."],
    ["RN", "Reassess immediately: breath sounds, SpO₂, BP, HR, airway pressures."],
    ["RN", "!No improvement: tell provider now — repeat/alternate site per provider; consider hemothorax, tamponade, other causes."],
    ["ORDER", "Unstable: no imaging first. Stable/after decompression: portable CXR or ultrasound per provider."]
  ],
  monitor: [
    ["RN", "Continuous SpO₂, ECG, BP; re-evaluate q5–15 min initially"],
    ["RN", "Chest tube: air leak (bubbling), output amount/color, tidaling; system upright, below chest; never clamp with air leak"],
    ["RN", "Tube disconnected/dislodged: reconnect or cover per policy, call provider, reassess for recurrent tension"],
    ["RN", "Recurrent tension if catheter kinks/clots; subcutaneous emphysema spread"],
    ["RN", "Ventilated pt: peak/plateau pressures, delivered VT, new leak; PEEP/pressure changes only by provider/RT"],
    ["ORDER", "CXR per order; watch for re-expansion pulmonary edema"]
  ],
  meds: [
    "VERIFY PER FACILITY PROTOCOL / ORDER.",
    "Oxygen 100%",
    "Analgesia for chest tube per order; local anesthetic per provider (track total local-anesthetic dose)",
    "Fluids / vasopressor for hypotension per order — temporizing only"
  ],
  escalate: [
    "!Cardiac arrest/PEA with suspected tension: provider performs bilateral decompression/thoracostomy (ACLS reversible cause)",
    "!No improvement after decompression → provider at bedside; consider massive hemothorax, bronchial injury, bronchopleural fistula",
    "Hemothorax output >1,500 mL initially, or >200 mL/h for 2–4 h, or sudden jump in output with hypotension → call surgeon now",
    "Large persistent air leak → provider/surgeon"
  ]
};
