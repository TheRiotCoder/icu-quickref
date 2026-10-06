module.exports = {
  id: "cardiac-arrest", name: "Cardiac arrest (ACLS overview)", category: "Cardiac", emergency: true,
  keywords: ["code", "code blue", "arrest", "cpr", "vf", "vfib", "v-fib", "ventricular fibrillation", "vt", "vtach", "v-tach", "pulseless vt", "pvt", "pea", "asystole", "defibrillation", "defib", "shock", "epinephrine", "epi", "amiodarone", "rosc", "acls", "etco2", "capnography", "ttm", "temperature control", "post-arrest"],
  warnings: [
    "EPINEPHRINE CONCENTRATION: code-cart syringe is 1 mg/10 mL (0.1 mg/mL) for IV/IO. NEVER give the 1 mg/mL vial IV push to a patient with a pulse.",
    "Within ~10 days of cardiac surgery: use the CALS pathway (see 'Post-cardiac-surgery emergencies / arrest') — routine 1 mg epinephrine may be harmful.",
    "Calcium, bicarbonate and magnesium are NOT routine in arrest (AHA 2025) — only for a specific suspected cause, on team-leader order."
  ],
  glance: [
    "Unresponsive, no normal breathing/no pulse (≤10 s) → CALL CODE, START CPR. No valid DNR order = start now; verify code status in parallel",
    "Push hard & fast: 100–120/min, 2–2.4 in (5–6 cm), full recoil, minimize pauses; pads on ASAP",
    "Shockable (VF/pVT)? Shock ASAP → CPR 2 min. Non-shockable? Epinephrine early per code leader; find H's & T's"
  ],
  recognize: [
    "Unresponsive, apneic or agonal gasping, no definite pulse (carotid/femoral, ≤10 s)",
    "Monitor: VF / pulseless VT, PEA, or asystole. Arterial line loses pulsatility / ETCO₂ suddenly drops",
    "Confirm true arrest (check leads, pt, pulse) — but never delay CPR to 'be sure' if unresponsive & pulseless",
    "Post-cardiac-surgery (≤~10 days), pregnancy, hypothermia, or suspected toxin/hyperK change the approach — see warnings/escalate"
  ],
  actions: [
    ["RN", "!Call a CODE / activate emergency response. Note TIME. Get crash cart + defibrillator. Start compressions."],
    ["RN", "Valid DNR/POLST documented? Do not start (or stop) and notify provider. No valid DNR order = continue CPR; verify code status in parallel."],
    ["RN", "High-quality CPR: 100–120/min, depth 2–2.4 in (5–6 cm), full recoil, backboard/CPR mode on bed, rotate compressor every 2 min."],
    ["RN", "Pads on/monitor → analyze rhythm (pause ≤10 s). Pads ≥1 in (2.5 cm) from pacemaker/ICD; remove medication patches."],
    ["RN", "SHOCKABLE (VF/pVT): shock once at device's labeled biphasic energy (if unknown: max) per competency/policy. Call 'CLEAR', O₂ away → resume CPR immediately for 2 min."],
    ["RN", "Ventilate: BVM 100% O₂ 30:2; with advanced airway 1 breath every 6 s + continuous compressions. Already intubated: disconnect vent, bag via ETT with PEEP valve. Avoid over-ventilation."],
    ["ORDER", "IV/IO access: use existing IV/central line, else IO (do not interrupt CPR). Flush every peripheral drug dose."],
    ["ORDER", "Epinephrine 1 mg IV/IO (0.1 mg/mL code syringe) q3–5 min on code-leader order; non-shockable: as soon as access; shockable: after initial shocks fail. Read back; log time."],
    ["ORDER", "VF/pVT persisting after shocks: amiodarone OR lidocaine (one, not both) on code-leader order per ACLS — see Meds."],
    ["RN", "Every 2 min: rhythm/pulse check, switch compressors. ETCO₂ goal ≥10, ideally ≥20 mmHg; abrupt sustained rise (>10 mmHg) or pulsatile art line → check pulse. Never stop CPR on ETCO₂ alone."],
    ["RN", "Call out/treat reversible causes with team: H's & T's (see Quick tools) — check glucose and K⁺."],
    ["PROV", "Anticipate/assist: advanced airway (ETT/SGA) without interrupting compressions; confirm with waveform capnography."],
    ["RN", "ROSC (pulse + BP / pulsatile art line / sustained ETCO₂ rise): go to post-arrest care — see Monitor."]
  ],
  monitor: [
    ["RN", "Post-ROSC: 12-lead ECG immediately; STEMI/high suspicion → notify provider for cardiology/cath lab STAT"],
    ["ORDER", "MAP ≥65 (avoid hypotension) — fluids/vasopressor per order; arterial line"],
    ["ORDER", "SpO₂ 90–98% (100% O₂ until reliable reading, then wean FiO₂; avoid hyperoxia/hypoxia); PaCO₂ 35–45 per order"],
    ["ORDER", "Not following commands after ROSC: temperature control (constant target 32–37.5 °C) for ≥36 h per provider/protocol; actively prevent fever (≥72 h per protocol)"],
    ["RN", "Glucose 70–180 mg/dL; K⁺/Mg, ABG, lactate, troponin, CXR per order; seizure watch (EEG per order)"],
    ["RN", "No early prognostic statements — neuroprognostication is delayed (≥72 h) and multimodal (provider-led)"]
  ],
  meds: [
    "VERIFY PER FACILITY PROTOCOL / CODE-LEADER ORDER (AHA 2025 ALS). Preparation prompts — not orders.",
    "Epinephrine 1 mg IV/IO q3–5 min — 0.1 mg/mL (1 mg/10 mL) prefilled syringe; flush after peripheral dose",
    "Amiodarone 300 mg IV/IO, then 150 mg once — OR lidocaine 1–1.5 mg/kg, then 0.5–0.75 mg/kg (observe cumulative limit per protocol) — one agent, per code leader",
    "Magnesium IV, diluted, ONLY for torsades de pointes — dose/method per order",
    "NOT routine: calcium, bicarbonate, magnesium. Specific causes only, per team leader: suspected hyperK or Ca-/Na-channel blocker toxicity; naloxone does not replace CPR",
    "Post-ROSC: vasopressor infusion (e.g., norepinephrine), sedation/analgesia, temperature control — all per order/protocol (HIGH-ALERT infusions: double check, pump library)"
  ],
  escalate: [
    "!Within ~10 days of cardiac surgery → call CT surgeon/team; follow unit CALS protocol (stacked shocks, pacing via wires, early resternotomy) — see Post-cardiac-surgery card",
    "!Pregnant (visible uterus ≥~20 wk)? Manual left uterine displacement; call OB/neonatal team early (resuscitative delivery per facility policy)",
    "All arrests: team leader/physician at bedside; consider ECPR/ECMO team if available and appropriate",
    "Recurrent VF/pVT (electrical storm), re-arrest after ROSC, or post-ROSC shock",
    "Debrief after code; document times, shocks, drugs, rhythm changes"
  ]
};
