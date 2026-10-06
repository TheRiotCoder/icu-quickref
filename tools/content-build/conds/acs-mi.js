module.exports = {
  id: "acs-mi", name: "Acute MI / ACS (STEMI, NSTEMI)", category: "Cardiac", emergency: false,
  keywords: ["acs", "mi", "ami", "stemi", "nstemi", "heart attack", "myocardial infarction", "chest pain", "unstable angina", "troponin", "trop", "ecg", "ekg", "12-lead", "aspirin", "asa", "nitroglycerin", "nitro", "ntg", "heparin", "cath lab", "pci", "sgarbossa", "lbbb", "lytics", "tnk", "fibrinolytic"],
  warnings: [
    "Tearing chest/back pain, pulse or arm-BP difference, neuro deficit → suspect AORTIC DISSECTION: tell provider BEFORE any antiplatelet, anticoagulant or fibrinolytic.",
    "FIBRINOLYTIC screen — absolute contraindications: any prior ICH; ischemic stroke <3 mo; intracranial neoplasm/AVM; active bleeding (not menses); suspected aortic dissection; significant head/facial trauma <3 mo; intracranial/spinal surgery <2 mo; BP >180/110 unresponsive to treatment.",
    "FIBRINOLYTIC screen — relative: oral anticoagulant, traumatic/prolonged CPR >10 min, major surgery <3 wk, internal bleeding <4 wk, pregnancy, active peptic ulcer. Decision = provider (verify list against current ACC/AHA guidance/facility checklist).",
    "Antithrombotics (heparin/enoxaparin, P2Y12, cangrelor, lytics) are HIGH-ALERT: confirm what was already given (no UFH + enoxaparin duplication); independent double check."
  ],
  glance: [
    "12-lead ECG within 10 min of chest pain/arrival — hand to provider immediately",
    "STEMI = cath lab activation NOW (first-ECG-to-device goal ≤90 min)",
    "Aspirin chewed per protocol/order after screening (allergy, bleeding, suspected dissection); O₂ only if SpO₂ <90%"
  ],
  recognize: [
    "Chest pressure/tightness/pain (≥15–20 min) radiating to arm/jaw/back; dyspnea, diaphoresis, nausea",
    "Atypical (women, elderly, diabetics): fatigue, dyspnea, epigastric pain, syncope",
    "ECG: ST elevation ≥1 mm in ≥2 contiguous leads (V2–V3: ≥2 mm men ≥40 y, ≥2.5 mm men <40 y, ≥1.5 mm women); ST depression/T inversion; normal troponin does NOT exclude STEMI",
    "LBBB or paced rhythm + ischemic symptoms → show ECG to provider immediately (Sgarbossa) — 'new LBBB' alone is not a STEMI equivalent",
    "Posterior MI (ST↓ V1–V3, tall R) → V7–V9; inferior MI (II, III, aVF) → right-sided leads (V4R) for RV infarct",
    "ICU type 2 (supply-demand) MI: troponin rise with sepsis/tachyarrhythmia/anemia/hypotension, no STE → treat cause; provider decides on heparin/DAPT",
    "Red flags: hypotension, pulmonary edema, new murmur, VT/VF, bradyarrhythmia/heart block"
  ],
  actions: [
    ["RN", "Stop activity, bed rest, continuous ECG/SpO₂, defib pads nearby. Large-bore IV ×2 per protocol."],
    ["RN", "!12-lead ECG within 10 min; give to provider immediately. STEMI: activate cath lab per facility protocol."],
    ["ORDER", "Aspirin chewed (non-enteric) per protocol/order — screen first: allergy, active bleeding, recent ICH/surgery, suspected dissection. Can't swallow: PR or via tube per order."],
    ["RN", "O₂ only if SpO₂ <90% (or distress). Avoid routine O₂ if sats normal."],
    ["ORDER", "Nitroglycerin SL per protocol/order only if SBP ≥90 and not ≥30 below baseline, no RV infarct, no PDE-5 inhibitor (sildenafil 24 h / tadalafil 48 h) or riociguat, HR 50–100; check for nitro patch."],
    ["ORDER", "Pain unrelieved by nitro: opioid only if ordered, smallest effective dose (may cause hypotension; delays oral P2Y12 absorption)."],
    ["ORDER", "Labs per order: troponin (repeat per lab pathway, e.g., 0/1–3 h), BMP, Mg, CBC, coags, type & screen."],
    ["ORDER", "Anticoagulant and P2Y12 inhibitor per cardiology order — screen bleeding risk; confirm what was already given."],
    ["ORDER", "Fibrinolysis (only if PCI not achievable within ~120 min): complete contraindication checklist (see warnings) with provider before preparing drug."],
    ["RN", "Hold NSAIDs. IV β-blocker: question order if HF, low output, shock, bradycardia or AV block."],
    ["RN", "Ask about last dose of DOACs/antiplatelets. Prepare for cath: allergies (contrast), NPO, consent, access-site prep, med list."]
  ],
  monitor: [
    ["RN", "Continuous ECG (ST monitoring if available) — arrhythmia (VT/VF, AV block, AF)"],
    ["RN", "Vitals q5–15 min during acute phase; pain score; repeat 12-lead with any pain change"],
    ["RN", "Heart failure signs: crackles, JVD, new O₂ need; hypotension"],
    ["RN", "Post-cath: access site (hematoma, bleeding, distal pulses/color); back/flank pain + hypotension after femoral access = retroperitoneal bleed → call"],
    ["ORDER", "Serial troponin; electrolytes (common target K ≥4.0, Mg ≥2.0 per protocol); renal function after contrast"]
  ],
  meds: [
    "VERIFY PER FACILITY PROTOCOL / ORDER. Typical adult published doses — give only if ordered/per protocol.",
    "Aspirin 162–325 mg chewed (non-enteric) loading, then daily low dose per order; ASA allergy → provider (alternative P2Y12)",
    "Nitroglycerin 0.4 mg SL q5 min ×3 if criteria met; IV nitroglycerin infusion per order (HIGH-ALERT, pump library)",
    "Anticoagulant (UFH / enoxaparin) and P2Y12 inhibitor (ticagrelor, prasugrel, clopidogrel; IV cangrelor) per cardiology — no numeric doses here; prasugrel avoided after stroke/TIA",
    "Opioid only if ordered (renal impairment favors fentanyl over morphine) · β-blocker, statin per cardiology order",
    "Fibrinolytic (e.g., tenecteplase/alteplase) — provider decision after contraindication screen; dose per order/pharmacy (HIGH-ALERT)"
  ],
  escalate: [
    "!STEMI, ongoing pain, hemodynamic/electrical instability → cardiology/cath lab now",
    "!VT/VF → ACLS. Symptomatic bradycardia/high-grade AV block → pacing pads on",
    "Hypotension/shock or pulmonary edema → cardiogenic shock pathway",
    "New murmur or sudden collapse → think papillary rupture / VSD / free-wall rupture / tamponade",
    "Neuro change or bleeding after lytic/antithrombotic → stop infusion per protocol, call provider STAT"
  ]
};
