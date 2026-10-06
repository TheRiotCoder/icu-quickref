module.exports = {
  id: "unstable-brady", name: "Symptomatic bradycardia", category: "Cardiac", emergency: true,
  keywords: ["bradycardia", "brady", "slow heart rate", "heart block", "chb", "complete heart block", "third degree", "3rd degree", "mobitz", "av block", "atropine", "pacing", "tcp", "transcutaneous pacing", "transvenous", "dopamine", "brash", "junctional"],
  warnings: [
    "Atropine dose is 1 mg IV q3–5 min, max 3 mg (AHA). Ineffective in transplanted hearts and often in Mobitz II/3° block — go to pacing.",
    "Chronotropic infusions (DOPamine or epinephrine) are HIGH-ALERT: dose, units (mcg/kg/min vs mcg/min), concentration and line per order/pump library; DOPamine ≠ DOBUTamine."
  ],
  glance: [
    "HR <50 with hypotension, AMS, shock, ischemic pain, or acute HF = unstable",
    "Pads ON; atropine 1 mg IV q3–5 min (max 3 mg) per ACLS order while preparing pacing",
    "No response (esp. Mobitz II / 3° block) → transcutaneous pacing or chronotropic infusion per order"
  ],
  recognize: [
    "HR <50 (or inappropriately slow) with: hypotension, syncope/dizziness, confusion, chest pain, dyspnea, shock",
    "ECG: sinus brady, junctional, 2nd degree (Mobitz I vs II), complete heart block",
    "Causes: inferior MI, β-blocker/CCB/digoxin/amiodarone/clonidine, hyperK (BRASH: brady + renal failure + AV-nodal blocker + shock + hyperK), hypothermia, hypoxia, ↑ICP (Cushing), vagal (suction, vomiting), hypothyroid"
  ],
  actions: [
    ["RN", "Assess pulse/perfusion; pulseless → CODE. Monitor, 12-lead, O₂ only if SpO₂ <90%, IV access, pacing pads ON."],
    ["RN", "!Call provider/rapid response if unstable."],
    ["ORDER", "Atropine 1 mg IV push per ACLS order/protocol, repeat q3–5 min to max 3 mg."],
    ["RN", "Do not delay pacing for atropine in high-grade block (Mobitz II, 3rd degree) or transplanted/denervated heart — tell provider."],
    ["ORDER", "Transcutaneous pacing per ACLS protocol if RN-competent (otherwise provider): rate 60–80, increase mA to electrical capture, then add safety margin per device/protocol."],
    ["RN", "Confirm MECHANICAL capture by femoral pulse, art line or pleth (not carotid — muscle jerks mimic pulse). Analgesia/sedation per order."],
    ["ORDER", "Chronotropic infusion alternative per order (DOPamine or epinephrine) — HIGH-ALERT, pump library."],
    ["ORDER", "Identify/stop causes per provider: hold AV-nodal agents; hyperK → calcium; β-blocker/CCB toxicity → antidotes per toxicology/Poison Control (see Overdose); treat hypothermia/hypoxia."],
    ["PROV", "Anticipate/assist: transvenous pacing (central access, cardiology/EP)."]
  ],
  monitor: [
    ["RN", "Continuous ECG; mechanical capture confirmed continuously with pacing (femoral pulse, SpO₂ pleth, art line)"],
    ["RN", "BP, perfusion, mentation; HR response to atropine/pacing"],
    ["ORDER", "K, Mg, troponin, TSH, digoxin level if on it; med reconciliation"],
    ["RN", "Pad site skin, discomfort during pacing (analgesia per order)"],
    ["RN", "Pacing thresholds, loss of capture"]
  ],
  meds: [
    "VERIFY PER FACILITY PROTOCOL / ORDER (AHA ACLS). Typical adult published bolus dose — give only if ordered.",
    "Atropine 1 mg IV q3–5 min, max total 3 mg",
    "DOPamine or epinephrine infusion — dose/units/concentration per order and pump library (HIGH-ALERT)",
    "β-blocker/CCB toxicity: glucagon, calcium, high-dose insulin — per toxicology/Poison Control and order (doses differ from anaphylaxis)",
    "Calcium for hyperK (see Hyperkalemia) · digoxin immune Fab for digoxin toxicity per order",
    "Sedation/analgesia for pacing per provider"
  ],
  escalate: [
    "!Hypotension/AMS/shock with HR <50 not responding to atropine → pace + call provider/cardiology",
    "Mobitz II or complete heart block (any symptomatic) → pacing readiness, cardiology",
    "Bradycardia + HTN + irregular respirations (Cushing's) → see ICH / increased ICP"
  ]
};
