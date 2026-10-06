module.exports = {
  id: "pe", name: "Pulmonary embolism", category: "Respiratory", emergency: true,
  keywords: ["pe", "pulmonary embolism", "pulmonary embolus", "massive pe", "saddle", "clot", "dvt", "vte", "anticoagulation", "heparin", "ufh", "enoxaparin", "lovenox", "thrombolysis", "lytics", "alteplase", "tpa", "pert", "rv strain", "d-dimer", "ctpa", "cta"],
  warnings: [
    "THROMBOLYSIS screen — absolute: prior hemorrhagic stroke or stroke of unknown origin; ischemic stroke <6 mo; CNS neoplasm; major trauma/surgery/head injury <3 wk; bleeding diathesis; active bleeding.",
    "THROMBOLYSIS screen — relative: TIA <6 mo; oral anticoagulation; pregnancy/first postpartum week; non-compressible puncture; traumatic resuscitation; refractory HTN (SBP >180); advanced liver disease; infective endocarditis; active peptic ulcer. In imminent arrest these become relative — provider decides (ESC 2019 list; verify against facility checklist).",
    "ALTEPLASE dose depends on indication (PE ≠ stroke ≠ line clearance): dose set by ordering provider, verified by pharmacy + second clinician. Never use a dose from another indication.",
    "Heparin is HIGH-ALERT: weight-based per facility nomogram; independent double check of weight, vial strength/concentration, bolus vs infusion and pump."
  ],
  glance: [
    "Sudden dyspnea/hypoxia/tachycardia/chest pain/syncope ± DVT signs — think PE. Vented: sudden ↓ETCO₂ + hypoxia + hypotension",
    "Unstable (SBP <90, shock, arrest)? Call STAT — PERT / reperfusion decision after contraindication screen",
    "Anticoagulate per order promptly when suspicion is high and no contraindication, while confirming"
  ],
  recognize: [
    "Dyspnea, pleuritic pain, tachycardia, hypoxia, cough/hemoptysis, syncope, leg swelling",
    "Risk factors: immobility, surgery, trauma, cancer, central lines, prior VTE, pregnancy, estrogen",
    "High-risk (massive): SBP <90 for ≥15 min or pressor need, or cardiac arrest. Normotensive shock (lactate >2, rising pressor need) also counts — tell provider",
    "Intermediate-high: RV dysfunction + troponin ↑ → PERT per facility even if BP normal",
    "ECG: sinus tach, S1Q3T3, RBBB, T inversion V1–V4. Echo: RV dilation/strain. Troponin/BNP ↑"
  ],
  actions: [
    ["RN", "O₂ to SpO₂ ≥90% per protocol; monitor ECG/SpO₂/BP; IV access. Tell provider if intubation is being considered (positive pressure + sedation can precipitate collapse)."],
    ["RN", "!Call provider/rapid response. Unstable: activate PERT / thrombolysis decision per facility."],
    ["RN", "Screen bleeding risk/lysis contraindications with provider (see warnings); limit arterial/central punctures and IM injections; keep IV sites compressible."],
    ["ORDER", "Anticoagulation per order: UFH per facility nomogram (preferred if high-risk/may need lysis or CrCl <30) or LMWH — HIGH-ALERT double check."],
    ["ORDER", "Work-up per order: CT pulmonary angiogram (renal function/contrast allergy), echo, leg duplex, troponin, BNP, lactate, ABG."],
    ["PROV", "Anticipate/assist: systemic thrombolysis (alteplase per order/pharmacy) for high-risk PE after contraindication screen; heparin hold/continue per facility protocol."],
    ["PROV", "Anticipate/assist: lysis contraindicated/failed → catheter-directed therapy, surgical embolectomy, ECMO as rescue."],
    ["ORDER", "RV failure care per order: cautious fluids (small volume, stop if CVP rising), norepinephrine first-line ± inotrope (DOBUTamine); avoid over-diuresis."],
    ["ORDER", "If intubation unavoidable: push-dose pressor ready, provider-chosen hemodynamically stable induction, avoid hypoxia/hypercapnia."],
    ["PROV", "Anticipate/assist: if anticoagulation absolutely contraindicated → retrievable IVC filter per provider; leg IPC only with order."]
  ],
  monitor: [
    ["RN", "SpO₂, HR, BP, RR continuously; mentation; urine output"],
    ["ORDER", "Bleeding (IV sites, GI, neuro checks); aPTT/anti-Xa per nomogram; platelets (HIT: drop >50%, typical day 5–10)"],
    ["RN", "Post-lysis: neuro checks per protocol (e.g., q15 min initially); no IM injections/invasive procedures"],
    ["ORDER", "RV function on echo; lactate"],
    ["ORDER", "Hgb, creatinine"]
  ],
  meds: [
    "VERIFY PER FACILITY PROTOCOL / ORDER. No numeric doses for heparin, LMWH or thrombolytics — per nomogram/order/pharmacy.",
    "Unfractionated heparin — facility VTE/PE nomogram (weight-based bolus + infusion, facility caps); verify vial strength (HIGH-ALERT)",
    "Enoxaparin (LMWH) per order — reduce/avoid in severe renal impairment; anti-Xa in obesity/renal impairment; never with UFH simultaneously",
    "Alteplase (unstable PE / arrest) — indication-specific dose per order/pharmacy (HIGH-ALERT)",
    "DOACs after stabilization per provider",
    "Norepinephrine, DOBUTamine for RV failure — per order/pump library"
  ],
  escalate: [
    "!SBP <90, syncope, rising pressor need, or cardiac arrest → emergent reperfusion decision (lysis/embolectomy/ECMO)",
    "!Major bleeding or new headache/neuro change on anticoagulation or lysis → STOP infusion per protocol, call provider; stat CT head if neuro change",
    "HIT suspicion (platelets ↓ >50%) → provider before next heparin dose"
  ]
};
