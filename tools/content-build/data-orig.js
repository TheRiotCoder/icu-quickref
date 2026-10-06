/* =====================================================================
   ICU QuickRef — ALL CONTENT LIVES IN THIS FILE.
   Edit text here; no build step. After editing:
     1) bump `version`/`date` below
     2) bump CACHE_VERSION in sw.js so installed phones refresh.
   Conventions inside the arrays:
     - A string starting with "!" is highlighted as a CALL / ESCALATE step.
     - `actions` and `monitor` are tap-to-tick checklists. Others are bullets.
     - Keep lines short: one idea per line.
   REFERENCE AID ONLY. Must be reviewed by clinical educator / medical
   director and adapted to facility protocol before clinical use.
   ===================================================================== */
window.ICU_DATA = {
  version: "1.0.0-draft",
  date: "2026-10-04",
  reviewStatus: "NOT YET CLINICALLY REVIEWED",
  reviewedBy: "",            // e.g. "J. Smith RN, CNS / Dr. A. Lee — 2026-11-01"
  facilityNote: "",          // e.g. "Rapid Response: ext 5555 | Pharmacy: ext 1234 | Poison Control: 1-800-222-1222"


  /* Guidance this content is aligned to (reviewer: confirm current editions) */
  sources: [
    "AHA Advanced Cardiovascular Life Support (ACLS) Guidelines & 2023 focused update (cardiac arrest, tachy/bradycardia, post-arrest care)",
    "Surviving Sepsis Campaign International Guidelines 2021 (and Hour-1 bundle)",
    "ARDS Network (ARMA) lung-protective ventilation protocol; ATS/ESICM/SCCM ARDS guideline 2017; PROSEVA (proning)",
    "AHA/ASA Guidelines for Early Management of Acute Ischemic Stroke (2019 + updates); AHA/ASA Spontaneous ICH Guideline 2022; Neurocritical Care Society ICP/ICH guidance",
    "Neurocritical Care Society / American Epilepsy Society Status Epilepticus Guidelines 2012 / 2016",
    "ACC/AHA Chest Pain Guideline 2021; ACC/AHA STEMI/NSTE-ACS guidance; SCAI Cardiogenic Shock Classification",
    "ADA/EASD/JBDS/AACE/DTS Consensus Report on Hyperglycemic Crises (DKA/HHS) 2024; ADA Standards of Care",
    "KDIGO Acute Kidney Injury Guideline; Renal Association UK Hyperkalaemia Guideline 2020",
    "ACG / AASLD guidance on GI bleeding and variceal hemorrhage; ATLS 10th edition (hemorrhagic shock, tension pneumothorax)",
    "ESC 2019 Acute Pulmonary Embolism Guidelines / AHA PE statement; World Allergy Organization & AAAAI/ACAAI anaphylaxis guidance",
    "SCCM PADIS Guideline 2018 (pain, agitation, delirium); ASAM Alcohol Withdrawal Management Guideline 2020",
    "AACT / Poison Control (US 1-800-222-1222) — toxicology references"
  ],

  categories: ["Cardiac", "Respiratory", "Shock", "Neuro", "Metabolic/Renal", "GI/Heme", "Tox/Behavioral"],

  /* ---------------- QUICK TOOLS ---------------- */
  tools: {
    vitals: {
      title: "Normal adult vitals (approx.)",
      rows: [
        ["HR", "60–100 /min"],
        ["BP", "<120/80 normal; SBP <90 or MAP <65 = hypotension"],
        ["MAP", "65–100 mmHg (goal ≥65 in most shock)"],
        ["RR", "12–20 /min (>22 = concern; qSOFA)"],
        ["SpO₂", "≥94% (92–96% typical COPD; 88–95% ARDS)"],
        ["Temp", "36.0–38.0 °C (96.8–100.4 °F)"],
        ["CVP", "2–8 mmHg (trend > absolute)"],
        ["UOP", "≥0.5 mL/kg/h"],
        ["ETCO₂", "35–45 mmHg"]
      ]
    },
    labs: {
      title: "Common lab ranges (approx. — use your lab's ranges)",
      rows: [
        ["Na", "135–145 mmol/L"],
        ["K", "3.5–5.0 mmol/L"],
        ["Cl", "98–106 mmol/L"],
        ["HCO₃", "22–28 mmol/L"],
        ["BUN / Cr", "7–20 / 0.6–1.3 mg/dL"],
        ["Glucose", "70–100 fasting; ICU goal ~140–180 mg/dL"],
        ["Ca (total / ionized)", "8.5–10.5 mg/dL / 1.1–1.3 mmol/L"],
        ["Mg / Phos", "1.7–2.2 / 2.5–4.5 mg/dL"],
        ["Lactate", "<2 mmol/L (≥4 severe)"],
        ["WBC", "4–11 ×10³/µL"],
        ["Hgb", "M 13.5–17.5 / F 12–15.5 g/dL"],
        ["Platelets", "150–400 ×10³/µL"],
        ["INR / aPTT", "0.8–1.2 / 25–35 s"],
        ["Troponin", "Above lab 99th percentile = myocardial injury; trend"],
        ["ABG pH", "7.35–7.45"],
        ["PaCO₂ / PaO₂", "35–45 / 80–100 mmHg"],
        ["Anion gap", "Na − (Cl + HCO₃): ~8–12"],
        ["P/F ratio", "PaO₂ ÷ FiO₂ (≤300 impaired; ≤100 severe)"]
      ]
    },
    gcs: {
      title: "Glasgow Coma Scale (3–15)",
      groups: [
        { name: "Eye", items: [[4, "Spontaneous"], [3, "To voice"], [2, "To pain"], [1, "None"]] },
        { name: "Verbal", items: [[5, "Oriented"], [4, "Confused"], [3, "Words (inappropriate)"], [2, "Sounds"], [1, "None"]] },
        { name: "Motor", items: [[6, "Obeys commands"], [5, "Localizes pain"], [4, "Withdraws"], [3, "Flexion (decorticate)"], [2, "Extension (decerebrate)"], [1, "None"]] }
      ],
      note: "≤8 = severe; consider airway protection. Intubated: Verbal = 'T' (score 1T)."
    },
    rass: {
      title: "RASS — Richmond Agitation-Sedation Scale",
      rows: [
        ["+4", "Combative", "Violent, immediate danger to staff"],
        ["+3", "Very agitated", "Pulls/removes tubes or catheters; aggressive"],
        ["+2", "Agitated", "Frequent non-purposeful movement, fights vent"],
        ["+1", "Restless", "Anxious, movements not aggressive"],
        ["0", "Alert & calm", ""],
        ["−1", "Drowsy", "Not fully alert; eyes open/contact >10 s to voice"],
        ["−2", "Light sedation", "Briefly awakens, eye contact <10 s to voice"],
        ["−3", "Moderate sedation", "Movement/eye opening to voice, no eye contact"],
        ["−4", "Deep sedation", "No response to voice; movement to physical stimulation"],
        ["−5", "Unarousable", "No response to voice or physical stimulation"]
      ],
      note: "Typical ICU goal: RASS 0 to −2 (light sedation) unless ordered otherwise. Pair with CAM-ICU for delirium."
    },
    reminders: [
      { title: "ABCDE", lines: [
        "A — Airway: patent? Talking? Needs jaw thrust / adjunct / suction?",
        "B — Breathing: RR, SpO₂, work of breathing, breath sounds, ETCO₂",
        "C — Circulation: pulse, BP, cap refill, rhythm, bleeding, access",
        "D — Disability: GCS/AVPU, pupils, glucose, seizure",
        "E — Exposure: full skin check, temp, lines/drains, wounds"
      ]},
      { title: "SBAR for calling the provider", lines: [
        "S — Situation: 'I'm calling about [pt, room]. I am concerned because ___.'",
        "B — Background: dx, code status, key history, meds/anticoagulants, allergies",
        "A — Assessment: vitals (trend), exam, labs/ABG/ECG, what changed, what you've done",
        "R — Request/Recommendation: 'I need you to come see the patient now' / specific order / how soon? / what should I monitor?",
        "Read back orders. If no response or you remain worried: escalate via chain of command / rapid response."
      ]},
      { title: "When to call rapid response (typical triggers — use your facility's)", lines: [
        "Staff worried about the patient (always a valid reason)",
        "HR <40 or >130 · SBP <90 · RR <8 or >28 · SpO₂ <90% despite O₂",
        "Acute change in LOC, new seizure, stroke symptoms",
        "Acute chest pain, suspected airway compromise, uncontrolled bleeding",
        "Urine output <0.5 mL/kg/h for 4+ h, sudden new agitation or lethargy"
      ]},
      { title: "ACLS reversible causes — H's & T's", lines: [
        "Hypovolemia · Hypoxia · Hydrogen ion (acidosis) · Hypo-/Hyperkalemia · Hypothermia",
        "Tension pneumothorax · Tamponade (cardiac) · Toxins · Thrombosis (pulmonary) · Thrombosis (coronary)"
      ]},
      { title: "Safe handoff / pre-call checklist", lines: [
        "Have ready: vitals trend, MAR (recent meds), last labs, code status, allergies, IV access",
        "Know the pt's weight and baseline (BP, mental status)",
        "Write down time of call and response; document orders read back"
      ]},
      { title: "PBW (predicted body weight) for vent settings", lines: [
        "Male: 50 + 2.3 × (height in inches − 60) kg",
        "Female: 45.5 + 2.3 × (height in inches − 60) kg",
        "Tidal volume 6 mL/kg PBW (range 4–8). Use HEIGHT, not actual weight."
      ]}
    ]
  },

  conditions: [
    /* ============================ EMERGENCY ============================ */
    {
      id: "cardiac-arrest", name: "Cardiac arrest (ACLS overview)", category: "Cardiac", emergency: true,
      keywords: "code blue vf vt pea asystole cpr defibrillation epinephrine rosc acls",
      glance: [
        "Unresponsive, no normal breathing/no pulse (≤10 s check) → CALL CODE, START CPR",
        "Push hard & fast: 100–120/min, ≥2 in (5 cm), full recoil, minimize pauses",
        "Shockable (VF/pVT)? Shock ASAP → CPR 2 min. Non-shockable? Epinephrine early, find H's & T's"
      ],
      recognize: [
        "Unresponsive, apneic or agonal gasping, no definite pulse (carotid/femoral, ≤10 s)",
        "Monitor: VF / pulseless VT, PEA, or asystole. Arterial line flat / ETCO₂ suddenly drops",
        "Confirm true arrest (check leads, pt, pulse) — but never delay CPR to 'be sure' if unresponsive & pulseless"
      ],
      actions: [
        "!Call a CODE / activate emergency response. Note TIME. Get crash cart + defibrillator.",
        "Start high-quality CPR: 100–120/min, depth ≥2 in (5 cm) but ≤2.4 in (6 cm), full recoil, firm surface/backboard, rotate compressor every 2 min.",
        "Ventilate: 30:2 with BVM and 100% O₂ (or 1 breath every 6 s once advanced airway, continuous compressions). Avoid over-ventilation.",
        "Attach pads/monitor. Analyze rhythm (brief pause ≤10 s).",
        "SHOCKABLE (VF / pulseless VT): shock once at device-recommended energy (biphasic 120–200 J) → resume CPR immediately for 2 min.",
        "NON-SHOCKABLE (PEA / asystole): resume CPR; give epinephrine as soon as IV/IO access obtained.",
        "Establish IV/IO access (do not interrupt CPR).",
        "Epinephrine 1 mg IV/IO every 3–5 min. (Shockable: after 2nd shock.) Record each dose time.",
        "Refractory VF/pVT (after 3rd shock): amiodarone 300 mg IV/IO, then 150 mg once (or lidocaine 1–1.5 mg/kg, then 0.5–0.75 mg/kg).",
        "Rhythm/pulse check every 2 min. Switch compressors. Check ETCO₂ (goal ideally >10–20 mmHg; sudden rise ≥40 may signal ROSC).",
        "Look for and treat reversible causes: H's & T's (see Quick tools).",
        "Advanced airway (ETT/SGA) when it does not interrupt compressions; confirm with waveform capnography.",
        "ROSC (pulse + BP + ETCO₂ rise): go to post-arrest care — see Monitor."
      ],
      monitor: [
        "Post-ROSC: 12-lead ECG immediately; STEMI/high suspicion → cardiology/cath lab STAT",
        "Target SBP ≥90 and MAP ≥65; SpO₂ 92–98% (avoid hyperoxia, avoid hypoxia); PaCO₂ 35–45",
        "Avoid hypotension: fluids/norepinephrine as ordered; arterial line",
        "Comatose after ROSC (not following commands): targeted temperature management 32–37.5 °C ≥24 h; prevent fever",
        "Glucose (avoid hypo/hyperglycemia), K/Mg, ABG, lactate, troponin, CXR; seizure watch",
        "Do not give early prognostic judgments — neuroprognostication is delayed (≥72 h) and multimodal"
      ],
      meds: [
        "Epinephrine 1 mg IV/IO q3–5 min",
        "Amiodarone 300 mg then 150 mg IV/IO — OR lidocaine 1–1.5 mg/kg then 0.5–0.75 mg/kg",
        "Magnesium 1–2 g IV only for torsades de pointes",
        "Reversible-cause therapy: calcium/bicarb/insulin-dextrose (hyperK), fluids/blood, needle decompression, thrombolytic (PE), naloxone (opioid), etc.",
        "Post-ROSC: vasopressor (e.g., norepinephrine), sedation, TTM per protocol",
        "VERIFY PER FACILITY PROTOCOL / CURRENT AHA ACLS EDITION"
      ],
      escalate: [
        "!All arrests: team leader/physician at bedside; consider ECPR/ECMO team if available and appropriate",
        "Recurrent VF/pVT (electrical storm), re-arrest after ROSC, or post-ROSC shock",
        "Confirm code status / POLST / goals of care — if DNR documented, do not start; notify provider",
        "Debrief after code; document times, shocks, drugs, rhythm changes"
      ]
    },
    {
      id: "anaphylaxis", name: "Anaphylaxis", category: "Shock", emergency: true,
      keywords: "allergic reaction epinephrine angioedema hives bronchospasm contrast transfusion reaction",
      glance: [
        "STOP the trigger (infusion, blood, contrast, drug). Call for help.",
        "EPINEPHRINE IM 0.3–0.5 mg (1 mg/mL) lateral thigh NOW — repeat q5–15 min",
        "Lay flat/legs up, 100% O₂, large-bore IV, fluid bolus; prepare for airway"
      ],
      recognize: [
        "Rapid onset after exposure (minutes–hours): skin (hives, flushing, itch), swelling lips/tongue/face",
        "Respiratory: wheeze, stridor, hoarse voice, dyspnea, throat tightness, hypoxia",
        "Cardiovascular: hypotension, tachycardia, syncope, shock; GI: vomiting, cramping",
        "Any 2 organ systems after likely allergen — or hypotension alone after known allergen = anaphylaxis",
        "Skin signs may be absent in severe cases"
      ],
      actions: [
        "STOP the suspected trigger (clamp infusion, remove from contact). Keep IV access; do not flush the trigger drug through the line.",
        "!Call rapid response / code team. Note the time of onset.",
        "EPINEPHRINE IM 0.3–0.5 mg (0.01 mg/kg, max 0.5 mg) of 1 mg/mL (1:1000) into anterolateral mid-thigh. Do not delay for IV access.",
        "Position supine with legs elevated (if vomiting/respiratory distress, position of comfort/side). Do not stand or sit up abruptly.",
        "High-flow O₂ (non-rebreather 10–15 L/min). Monitor, SpO₂, BP q1–5 min.",
        "Large-bore IV x2. Rapid crystalloid bolus 1–2 L (adult) for hypotension; reassess after each liter.",
        "Repeat epinephrine IM every 5–15 min if no/partial improvement.",
        "Wheeze: albuterol neb. Stridor/airway edema: nebulized epinephrine adjunct — call anesthesia/airway expert EARLY.",
        "Refractory (≥2 IM doses or shock): start epinephrine IV infusion as ordered; ICU-level care.",
        "Adjuncts AFTER epinephrine: H1 blocker (diphenhydramine 25–50 mg IV), H2 blocker (famotidine 20 mg IV), corticosteroid (e.g., methylprednisolone 1–2 mg/kg) — do not replace epinephrine.",
        "Draw serum tryptase ideally 1–3 h after onset if ordered. Document allergen; add to allergy list."
      ],
      monitor: [
        "Continuous ECG/SpO₂, BP q5 min until stable; airway/voice change/swelling progression",
        "Biphasic reaction can recur 1–72 h later (usually within 8 h): observe ≥4–6 h, longer if severe",
        "Epinephrine side effects: tachycardia, tremor, HTN, arrhythmia, ischemia (older/cardiac pts)",
        "Urine output, lactate if shock"
      ],
      meds: [
        "Epinephrine 1 mg/mL IM 0.3–0.5 mg adult, q5–15 min",
        "Epinephrine infusion (refractory): typically 0.05–0.1 mcg/kg/min titrated (e.g., 1–10 mcg/min)",
        "Crystalloid 1–2 L bolus (adult)",
        "Albuterol 2.5–5 mg neb for bronchospasm",
        "Glucagon 1–5 mg IV over 5 min, then 5–15 mcg/min if on β-blocker and not responding",
        "Vasopressin / norepinephrine for refractory hypotension",
        "VERIFY PER FACILITY PROTOCOL / ORDER"
      ],
      escalate: [
        "!Stridor, hoarseness, tongue/uvula swelling, or voice change → call for airway expert now; prepare difficult airway/cricothyrotomy kit",
        "!Persistent hypotension after 2–3 IM epinephrine doses + fluids → ICU/infusion, add pressor",
        "Cardiac arrest: ACLS + epinephrine 1 mg IV as per ACLS",
        "Transfusion reaction: stop transfusion, keep line open with saline, notify blood bank"
      ]
    },
    {
      id: "tension-pneumothorax", name: "Tension pneumothorax", category: "Respiratory", emergency: true,
      keywords: "needle decompression chest tube hypotension absent breath sounds ventilator barotrauma",
      glance: [
        "Sudden hypoxia + hypotension + one-sided absent breath sounds (esp. on vent / after line) = DECOMPRESS",
        "This is a CLINICAL diagnosis — do not wait for chest X-ray",
        "Call STAT; 100% O₂; needle/finger decompression then chest tube"
      ],
      recognize: [
        "Severe respiratory distress, rising peak airway pressures on vent, falling SpO₂",
        "Hypotension, tachycardia, JVD (may be absent if hypovolemic), PEA arrest",
        "Unilateral absent/decreased breath sounds, hyperresonance; subcutaneous emphysema",
        "Tracheal deviation (LATE sign). Risks: positive-pressure ventilation, trauma, central line, CPR, thoracentesis",
        "Ultrasound: absent lung sliding (if available)"
      ],
      actions: [
        "!Call rapid response / provider STAT. State: 'suspected tension pneumothorax'.",
        "100% O₂. If ventilated, disconnect and hand-bag to feel compliance; check for DOPE (see Vent alarms).",
        "Prepare: large-bore (14 G, ≥8 cm / 3.25 in) angiocath, chest tube tray, gloves/chlorhexidine.",
        "NEEDLE DECOMPRESSION (per provider/protocol): affected side, 5th intercostal space anterior-to-mid axillary line (alt: 2nd ICS midclavicular line), just over the TOP of the rib. Expect a rush of air.",
        "Alternative if trained/available: finger (simple) thoracostomy 4th–5th ICS, then chest tube.",
        "Chest tube placement (definitive) — assist; connect to water seal/suction per order. Needle decompression alone is temporary.",
        "Reassess immediately: breath sounds, SpO₂, BP, HR, airway pressures.",
        "If no improvement: repeat/alternate site decompression; consider hemothorax, tamponade, other causes.",
        "Portable CXR after decompression (not before)."
      ],
      monitor: [
        "Continuous SpO₂, ECG, BP; re-evaluate q5–15 min initially",
        "Chest tube: bubbling (air leak), output amount/color, tidaling, system upright and below chest",
        "Recurrent tension if catheter kinks/clots; subcutaneous emphysema spread",
        "Daily CXR per orders; watch for re-expansion pulmonary edema",
        "Ventilated pt: peak/plateau pressures, VT delivered, new leak"
      ],
      meds: [
        "Oxygen 100%",
        "Analgesia for chest tube (per order); local anesthetic",
        "Hold nitrous oxide; minimize PEEP/pressures as directed by provider",
        "Fluids / vasopressor for hypotension as temporizing measure only",
        "VERIFY PER FACILITY PROTOCOL / ORDER"
      ],
      escalate: [
        "!Cardiac arrest/PEA: bilateral decompression/thoracostomy is part of ACLS reversible-cause treatment",
        "!No improvement after decompression → provider at bedside; consider massive hemothorax, bronchial injury, bronchopleural fistula",
        "Large persistent air leak, or hemothorax output >1,500 mL initial or >200 mL/h → surgery"
      ]
    },
    {
      id: "status-epilepticus", name: "Status epilepticus / seizure", category: "Neuro", emergency: true,
      keywords: "seizure convulsion lorazepam midazolam levetiracetam keppra fosphenytoin ativan",
      glance: [
        "Seizure ≥5 min (or repeated without recovery) = emergency → call for help, time it",
        "Protect airway, O₂, CHECK GLUCOSE, IV access",
        "Benzodiazepine NOW (IV lorazepam or IM midazolam) → then second-line agent if continuing"
      ],
      recognize: [
        "Continuous seizure activity ≥5 min, or ≥2 seizures without return to baseline",
        "Subtle/non-convulsive status: unexplained coma, twitching eyes/face, fluctuating consciousness (needs EEG)",
        "Triggers: missed AEDs, alcohol/benzodiazepine withdrawal, hypoglycemia, hyponatremia, hypoxia, infection, stroke/ICH, toxins, TBI"
      ],
      actions: [
        "Note seizure START TIME. Call for help / rapid response. Ease to floor/bed, remove hazards, side-lying if possible, pad rails. Nothing in mouth.",
        "ABCs: suction, jaw thrust, O₂ (NRB/BVM) as needed; SpO₂ & ECG monitor.",
        "POINT-OF-CARE GLUCOSE. If <70 mg/dL (or unknown & seizing): dextrose per order; give thiamine first/with it if alcohol use or malnutrition.",
        "IV/IO access; send labs (BMP, Mg, Ca, CBC, tox, AED levels, ABG).",
        "!At 5 min — FIRST-LINE benzodiazepine (one of): IV lorazepam 0.1 mg/kg (max 4 mg/dose, may repeat once at 5 min); IM midazolam 10 mg (>40 kg), 5 mg (13–40 kg); IV diazepam 0.15–0.2 mg/kg (max 10 mg/dose).",
        "Have airway equipment/BVM at bedside; anticipate respiratory depression.",
        "!At ~20 min if still seizing — SECOND-LINE (one): levetiracetam 60 mg/kg IV (max 4,500 mg) over ~10 min; or fosphenytoin 20 mg PE/kg (max 1,500 mg PE) at ≤150 mg PE/min; or valproate 40 mg/kg (max 3,000 mg) over 10 min.",
        "Fosphenytoin/phenytoin: continuous ECG & BP during infusion. Valproate: avoid in liver disease/pregnancy.",
        "!At ~40 min (refractory): call ICU/neurology — intubation + continuous anesthetic infusion (midazolam, propofol, ketamine ± barbiturate) with continuous EEG.",
        "Stat head CT once stabilized if new/unexplained; consider LP/EEG per provider."
      ],
      monitor: [
        "Airway, SpO₂/ETCO₂, BP, ECG during and after meds; resp depression after benzos",
        "Neuro checks/GCS; post-ictal state expected to improve over minutes–hour",
        "Glucose, Na, Ca, Mg; temperature (hyperthermia, rhabdo → CK, urine color)",
        "Seizure precautions; document duration, type, laterality, eye deviation, post-ictal findings",
        "Continuous EEG if not waking up (non-convulsive status)"
      ],
      meds: [
        "Lorazepam 0.1 mg/kg IV (max 4 mg), may repeat ×1",
        "Midazolam IM 10 mg (>40 kg) · Diazepam 0.15–0.2 mg/kg IV (max 10 mg)",
        "Levetiracetam 60 mg/kg IV (max 4,500 mg) · Fosphenytoin 20 mg PE/kg (max 1,500) · Valproate 40 mg/kg (max 3,000)",
        "Thiamine 100 mg IV if alcohol/malnutrition · Dextrose for hypoglycemia",
        "Refractory: midazolam/propofol/ketamine infusions, pentobarbital",
        "Pyridoxine in INH toxicity; treat cause (Na, Mg, toxin)",
        "VERIFY PER FACILITY PROTOCOL / ORDER"
      ],
      escalate: [
        "!Seizure >5 min, repeated seizures, no return to baseline, hypoxia, or aspiration",
        "!Failure of 2 drug classes (refractory) → ICU, continuous EEG, anesthetic infusion",
        "New focal deficit, head trauma, fever/neck stiffness, pregnancy, anticoagulated pt → provider now"
      ]
    },
    /* ============================ CARDIAC ============================ */
    {
      id: "acs-mi", name: "Acute MI / ACS (STEMI, NSTEMI)", category: "Cardiac",
      keywords: "chest pain stemi nstemi unstable angina troponin ecg aspirin nitroglycerin heparin cath lab myocardial infarction",
      glance: [
        "12-lead ECG within 10 min of chest pain/arrival — hand to provider immediately",
        "STEMI = cath lab activation NOW (door-to-balloon goal ≤90 min)",
        "Aspirin 162–325 mg chewed (unless allergy/active bleed); O₂ only if SpO₂ <90%"
      ],
      recognize: [
        "Chest pressure/tightness/pain (≥15–20 min) radiating to arm/jaw/back; dyspnea, diaphoresis, nausea",
        "Atypical (women, elderly, diabetics): fatigue, dyspnea, epigastric pain, syncope",
        "ECG: ST elevation ≥1 mm in ≥2 contiguous leads (V2–V3: ≥2 mm men / 1.5 mm women), new LBBB with symptoms, ST depression/T inversion, posterior (ST↓ V1–V3) → get V7–V9",
        "Inferior MI (II, III, aVF): also get right-sided leads (V4R) for RV infarct",
        "Red flags: hypotension, pulmonary edema, new murmur, VT/VF, bradyarrhythmia/heart block"
      ],
      actions: [
        "Stop activity, bed rest, continuous ECG/SpO₂ monitor, defib pads nearby. Large-bore IV ×2.",
        "!12-lead ECG within 10 min; give to provider immediately. If STEMI: activate cath lab per facility protocol.",
        "Aspirin 162–325 mg chewed (non-enteric) unless allergy/already given/active major bleed.",
        "O₂ only if SpO₂ <90% (or distress). Avoid routine O₂ if sats normal.",
        "Nitroglycerin 0.4 mg SL q5 min ×3 for ongoing pain IF SBP ≥90–100 and no RV infarct, no PDE-5 inhibitor (sildenafil 24 h / tadalafil 48 h), not severe bradycardia/tachycardia.",
        "Pain unrelieved by nitro: opioid (e.g., fentanyl/morphine small IV doses) per provider — may mask/worsen hypotension.",
        "Draw troponin (repeat per protocol, e.g., 0/1–3 h), BMP, Mg, CBC, coags, type & screen.",
        "Anticoagulant (heparin/enoxaparin) and P2Y12 inhibitor per cardiology orders. Check bleeding risks first.",
        "Hold: NSAIDs. Avoid IV β-blocker if signs of HF, low output, shock, bradycardia, AV block.",
        "Give high-intensity statin when ordered; ask about last dose of DOACs/antiplatelets.",
        "Prepare for cath: allergies (contrast), NPO, consent, groin/radial access prep, remove jewelry/meds list."
      ],
      monitor: [
        "Continuous ECG (ST monitoring if available) — arrhythmia (VT/VF, AV block, AF)",
        "Vitals q5–15 min during acute phase; pain score; repeat 12-lead with any pain change",
        "Heart failure signs: crackles, JVD, new O₂ need; hypotension",
        "Post-cath: access site (hematoma, bleeding, distal pulses/color), bed rest, hydration/renal function",
        "Serial troponin, K ≥4.0, Mg ≥2.0"
      ],
      meds: [
        "Aspirin 162–325 mg chewed (then 81 mg daily)",
        "Nitroglycerin 0.4 mg SL q5 min ×3; IV infusion for refractory pain/HTN/HF",
        "Heparin UFH / enoxaparin; P2Y12 inhibitor (clopidogrel, ticagrelor, prasugrel) per cardiology",
        "Opioid (fentanyl/morphine) cautiously · β-blocker PO within 24 h if stable",
        "High-intensity statin (e.g., atorvastatin 40–80 mg)",
        "Fibrinolytic if PCI not available within ~120 min of first contact (per protocol/contraindications)",
        "VERIFY PER FACILITY PROTOCOL / ORDER"
      ],
      escalate: [
        "!STEMI, ongoing pain, hemodynamic/electrical instability → cardiology/cath lab now",
        "!VT/VF → ACLS. Symptomatic bradycardia/high-grade AV block → pacing pads on",
        "Hypotension/shock or pulmonary edema → cardiogenic shock pathway",
        "New murmur or sudden collapse → think papillary rupture / VSD / free-wall rupture / tamponade"
      ]
    },
    {
      id: "cardiogenic-shock", name: "Cardiogenic shock", category: "Cardiac",
      keywords: "pump failure low output inotrope dobutamine milrinone norepinephrine iabp impella ecmo heart failure",
      glance: [
        "Hypotension + cool/clammy + congestion (crackles, JVD) + falling UOP = pump failure",
        "Get 12-lead, call provider/cardiology early; echo is key",
        "NO large fluid boluses if congested; norepinephrine ± inotrope; early mechanical support evaluation"
      ],
      recognize: [
        "SBP <90 (or MAP <60 / drop ≥30 mmHg) sustained, or needing pressors, with signs of hypoperfusion",
        "Cold, clammy, mottled extremities; AMS; oliguria; lactate >2; narrow pulse pressure",
        "Pulmonary edema (crackles, hypoxia, pink frothy sputum), JVD, S3",
        "Common causes: large MI, mechanical complication (VSD, papillary muscle rupture), acute-on-chronic HF, myocarditis, arrhythmia, valve failure, PE, tamponade"
      ],
      actions: [
        "!Call rapid response/provider and cardiology (shock team if available).",
        "Monitor ECG, SpO₂, arterial line if ordered. Upright position if able. O₂/NIV for hypoxia (use caution: positive pressure drops preload).",
        "12-lead ECG; STAT bedside echo (LV/RV function, effusion, valves).",
        "Establish central access if ordered. Draw lactate, troponin, BNP, BMP, LFTs, ABG, CBC, coags, type & screen.",
        "Judicious fluid challenge (e.g., 250 mL) ONLY if clearly dry/no congestion — reassess after.",
        "Vasopressor to maintain MAP ≥65 (norepinephrine commonly first-line).",
        "Add inotrope for low output as ordered (dobutamine; milrinone if on β-blocker/need vasodilation).",
        "Treat cause: ACS → emergent revascularization; arrhythmia → rate/rhythm control or cardioversion; tamponade → drainage.",
        "Prepare for mechanical circulatory support (IABP/Impella/ECMO) evaluation per team.",
        "Place Foley; strict I&O. Hold antihypertensives, β-blockers, ACE-i/ARB, and nephrotoxins as directed."
      ],
      monitor: [
        "MAP (goal ≥65), HR/rhythm, cap refill/skin temperature, mentation",
        "Lactate q2–4 h until falling; UOP hourly",
        "Oxygenation, work of breathing; ventilation needs",
        "Cardiac output / ScvO₂ / PA catheter data if present (CI <2.2 L/min/m², PCWP ↑)",
        "Pressor/inotrope doses, extravasation (central line preferred), arrhythmias, K and Mg",
        "If MCS: distal limb perfusion, bleeding, hemolysis, line position/alarms"
      ],
      meds: [
        "Norepinephrine 0.01–3 mcg/kg/min (titrate to MAP) — often first-line",
        "Dobutamine 2–20 mcg/kg/min · Milrinone 0.125–0.75 mcg/kg/min (renal dosing) · Epinephrine low dose",
        "Loop diuretic (furosemide IV) once perfusion/BP adequate and congested",
        "Avoid: large fluid loads if congested, vasodilators/nitrates when hypotensive, negative inotropes",
        "Antiarrhythmics/cardioversion for unstable rhythms",
        "VERIFY PER FACILITY PROTOCOL / ORDER"
      ],
      escalate: [
        "!MAP <65 despite pressor, lactate rising, worsening hypoxia/mental status",
        "!Need for MCS or revascularization — contact cardiology/cath lab early (time-sensitive)",
        "Arrhythmia with instability → synchronized cardioversion/ACLS"
      ]
    },
    {
      id: "afib-rvr", name: "Atrial fibrillation with RVR", category: "Cardiac",
      keywords: "afib a-fib atrial fibrillation rapid ventricular response diltiazem metoprolol amiodarone cardioversion irregular",
      glance: [
        "Irregularly irregular, HR often >110–150. Is the pt STABLE or UNSTABLE?",
        "Unstable (hypotension, ischemic pain, AMS, acute HF/shock) → synchronized cardioversion",
        "Stable → treat cause (sepsis, pain, hypovolemia, hypoxia), correct K/Mg, rate control per order"
      ],
      recognize: [
        "Irregularly irregular narrow-complex rhythm, no P waves, HR >100 (RVR commonly >110–120)",
        "Symptoms: palpitations, dyspnea, dizziness, chest pain, hypotension",
        "Wide irregular fast rhythm with varying QRS width: think AF with WPW (pre-excitation) — DANGER",
        "In ICU, RVR is often secondary to sepsis, volume depletion, pain, withdrawal, PE, thyroid, catecholamines — fix the driver"
      ],
      actions: [
        "Assess perfusion: BP, mentation, chest pain, signs of shock/acute HF. Apply pads. Get 12-lead.",
        "!Unstable → call provider/rapid response; prepare synchronized cardioversion (biphasic 120–200 J per device/protocol); sedate if conscious.",
        "Check labs: K (goal ≥4.0), Mg (≥2.0), TSH, troponin, lactate, CBC, ABG.",
        "Replace K and Mg per protocol (e.g., Mg 2 g IV).",
        "Treat triggers: fluids if hypovolemic, analgesia, treat infection/PE, minimize catecholamines, stop offending drugs.",
        "STABLE, preserved EF: rate control per order — diltiazem 0.25 mg/kg IV over 2 min (≈15–20 mg), repeat 0.35 mg/kg in 15 min if needed, then infusion 5–15 mg/h; OR metoprolol 2.5–5 mg IV over 2 min q5 min up to ~15 mg.",
        "Hypotension, decompensated HF or reduced EF: avoid diltiazem/β-blocker; amiodarone 150 mg IV over 10 min then 1 mg/min ×6 h, 0.5 mg/min ×18 h (or digoxin).",
        "Do NOT give AV-nodal blockers (diltiazem, β-blocker, digoxin, adenosine) in suspected pre-excited AF (WPW) — call provider; procainamide or cardioversion.",
        "Ask about anticoagulation and duration of AF (>48 h/unknown → stroke risk with conversion).",
        "Notify provider about anticoagulation/CHA₂DS₂-VASc."
      ],
      monitor: [
        "Continuous ECG; HR and BP q5–15 min while titrating; goal resting HR <110 (or per provider)",
        "Hypotension/bradycardia with IV diltiazem or β-blocker; infusion rates",
        "K, Mg after each repletion; QTc with amiodarone",
        "Signs of stroke/embolism (new neuro deficit), HF",
        "Response to treating underlying cause"
      ],
      meds: [
        "Diltiazem 0.25 mg/kg then 0.35 mg/kg IV; infusion 5–15 mg/h",
        "Metoprolol 2.5–5 mg IV (max ~15 mg) · Esmolol infusion",
        "Amiodarone 150 mg IV over 10 min, then 1 mg/min ×6 h, then 0.5 mg/min",
        "Digoxin 0.25 mg IV q2 h (max ~1–1.5 mg total loading) in HF",
        "Magnesium 2 g IV · Potassium to ≥4.0",
        "Heparin / DOAC for stroke prevention per provider",
        "VERIFY PER FACILITY PROTOCOL / ORDER"
      ],
      escalate: [
        "!Hypotension, chest pain, AMS, pulmonary edema, or HR >150 not responding → cardioversion/cardiology",
        "Wide irregular tachycardia → treat as WPW-AF/VT: no AV-nodal blockers",
        "New neuro deficit → stroke code",
        "Recurrent RVR with pressor requirement: reconsider drivers and anti-arrhythmic strategy"
      ]
    },
    {
      id: "unstable-tachy", name: "Unstable tachycardia (with a pulse)", category: "Cardiac",
      keywords: "svt vt ventricular tachycardia cardioversion adenosine synchronized wide complex narrow complex supraventricular",
      glance: [
        "Pulse + unstable (hypotension, AMS, shock, ischemic pain, acute HF) → SYNCHRONIZED cardioversion",
        "No pulse = cardiac arrest → CPR/defibrillate (unsynchronized)",
        "Stable: 12-lead, vagal maneuver/adenosine for regular narrow; expert help for wide"
      ],
      recognize: [
        "HR usually ≥150 causing symptoms. Narrow QRS (<0.12 s) vs wide QRS; regular vs irregular",
        "Instability: SBP <90, AMS, chest pain, acute HF/pulmonary edema, shock signs",
        "Wide-complex tachycardia: treat as VT until proven otherwise"
      ],
      actions: [
        "Confirm pulse. Pulse absent → CODE. Support ABCs, O₂ if hypoxic, IV access, monitor/12-lead, pads on.",
        "!Call rapid response / provider (expert consult).",
        "UNSTABLE: sedate if conscious (don't delay if crashing), SYNCHRONIZED cardioversion — verify 'SYNC' marker on R waves.",
        "Initial energy (biphasic): narrow regular 50–100 J; narrow irregular (AF) 120–200 J; wide regular (VT) 100 J. Increase stepwise if no response. Per device/protocol.",
        "Wide irregular / polymorphic VT: defibrillate (unsynchronized) at high energy.",
        "Adenosine is for REGULAR monomorphic rhythms only — never for irregular or polymorphic rhythms.",
        "STABLE regular narrow (SVT): vagal maneuver (modified Valsalva), then adenosine 6 mg rapid IV push with flush (large proximal vein); if no conversion 12 mg ×1–2.",
        "STABLE wide regular: 12-lead; amiodarone 150 mg over 10 min or procainamide 20–50 mg/min (max 17 mg/kg) per expert.",
        "Torsades (polymorphic VT with long QT): magnesium 1–2 g IV; unstable → defibrillate.",
        "Correct K and Mg; treat cause (ischemia, drugs, hypoxia, acidosis)."
      ],
      monitor: [
        "Continuous ECG; repeat 12-lead after conversion; BP/HR q5 min",
        "Airway/sedation after cardioversion (resp depression)",
        "Recurrence; skin burns at pad site",
        "QTc, K, Mg; troponin",
        "Adenosine: brief asystole/chest tightness expected — warn the pt"
      ],
      meds: [
        "Adenosine 6 mg rapid IV push, then 12 mg (↓ to 3 mg via central line/heart transplant; caution asthma)",
        "Amiodarone 150 mg IV over 10 min (repeat as needed), then infusion",
        "Procainamide 20–50 mg/min (not with long QT) · Lidocaine 1–1.5 mg/kg",
        "Magnesium 1–2 g IV for torsades",
        "Sedation for cardioversion (e.g., etomidate/midazolam/ketamine) per provider",
        "VERIFY PER FACILITY PROTOCOL / ORDER"
      ],
      escalate: [
        "!Unstable → cardioversion NOW; pulseless → ACLS",
        "Recurrent VT/VF or incessant tachycardia → cardiology / electrophysiology",
        "Pre-excitation (WPW) or unclear wide-complex → no AV-nodal blockers"
      ]
    },
    {
      id: "unstable-brady", name: "Symptomatic bradycardia", category: "Cardiac",
      keywords: "heart block atropine pacing transcutaneous dopamine av block slow heart rate",
      glance: [
        "HR <50 with hypotension, AMS, shock, ischemic pain, or acute HF = unstable",
        "Atropine 1 mg IV q3–5 min (max 3 mg) while preparing pacing pads",
        "No response (esp. Mobitz II / 3° block) → transcutaneous pacing or dopamine/epinephrine infusion"
      ],
      recognize: [
        "HR <50 (or inappropriately slow) with: hypotension, syncope/dizziness, confusion, chest pain, dyspnea, shock",
        "ECG: sinus brady, junctional, 2nd degree (Mobitz I vs II), complete heart block",
        "Look for causes: inferior MI, β-blocker/CCB/digoxin/amiodarone/clonidine, hyperK, hypothermia, hypoxia, ↑ICP (Cushing), vagal (suction, vomiting), sleep apnea, hypothyroid"
      ],
      actions: [
        "Assess pulse/perfusion; if pulseless → CODE. Monitor, 12-lead, O₂ only if SpO₂ <90%, IV access, pads ON.",
        "!Call provider/rapid response if unstable.",
        "Atropine 0.5–1 mg IV rapid push (ACLS: 1 mg), repeat q3–5 min, max total 3 mg. Doses <0.5 mg can worsen bradycardia.",
        "Do not delay pacing for atropine in high-grade block (Mobitz II, 3rd degree) or after heart transplant/denervated heart.",
        "TRANSCUTANEOUS PACING: pads front/back (or anterior-lateral), rate ~60–80, increase mA until electrical capture (wide QRS after each spike) AND mechanical capture (palpable pulse/SpO₂ waveform). Give analgesia/sedation as ordered.",
        "Infusion alternative: dopamine 5–20 mcg/kg/min or epinephrine 2–10 mcg/min, titrated.",
        "Identify/stop causes: hold AV nodal agents; hyperK → calcium; β-blocker/CCB overdose → glucagon/calcium/HIE (see Overdose); treat hypothermia/hypoxia.",
        "Prepare for transvenous pacing (central access, cardiology/EP)."
      ],
      monitor: [
        "Continuous ECG; capture confirmed continuously with pacing (pulse, SpO₂ pleth, art line)",
        "BP, perfusion, mentation; HR response to atropine/pacing",
        "K, Mg, troponin, TSH; med reconciliation",
        "Pad site skin, discomfort during pacing (analgesia)",
        "Pacing thresholds, loss of capture"
      ],
      meds: [
        "Atropine 1 mg IV q3–5 min, max 3 mg",
        "Dopamine 5–20 mcg/kg/min · Epinephrine 2–10 mcg/min",
        "Glucagon 3–10 mg IV (β-blocker/CCB toxicity) · Calcium (CCB, hyperK)",
        "Sedation/analgesia for pacing per provider",
        "VERIFY PER FACILITY PROTOCOL / ORDER"
      ],
      escalate: [
        "!Hypotension/AMS/shock with HR <50 not responding to atropine → pace + call provider/cardiology",
        "Mobitz II or complete heart block (any symptomatic) → pacing readiness, cardiology",
        "Bradycardia + HTN + irregular respirations (Cushing's) → see ICH / increased ICP"
      ]
    },
    /* ============================ RESPIRATORY ============================ */
    {
      id: "resp-failure-intubation", name: "Acute respiratory failure: intubation & vent basics", category: "Respiratory",
      keywords: "intubation rsi airway ventilator bipap niv hypoxia hypercapnia ett etomidate ketamine rocuronium vent settings",
      glance: [
        "Struggling? Call help, 100% O₂, BVM/NIV — oxygenate before you intubate",
        "Prep (SOAP-ME): Suction, Oxygen, Airway equipment, Pharmacy, Monitors/Equipment; stabilize BP first",
        "Confirm tube: waveform ETCO₂ + bilateral breath sounds + CXR; start lung-protective settings (6–8 mL/kg PBW)"
      ],
      recognize: [
        "Hypoxemic: SpO₂ <90% on high-flow O₂, RR >30, accessory muscle use, cyanosis, P/F <200",
        "Hypercapnic: AMS/somnolence, pH <7.30 with PaCO₂ >50, rising ETCO₂, shallow breathing, tripod/paradoxical breathing",
        "Failing: exhaustion, can't speak full sentences, silent chest, inability to protect airway (GCS ≤8, vomiting, secretions)"
      ],
      actions: [
        "!Call rapid response / provider / airway team early. Sit upright, O₂ via NRB or HFNC. Suction.",
        "Treat reversible causes in parallel: bronchospasm (albuterol), pulmonary edema (diuretic/nitrates/NIV), pneumothorax, secretions, opioid (naloxone).",
        "Try NIV (BiPAP/CPAP) if appropriate: awake, protecting airway, COPD/CHF; reassess in 30–60 min. Avoid delaying intubation if worsening.",
        "Pre-intubation checklist: IV ×2, monitor/ETCO₂, BVM + PEEP valve, suction, 2 laryngoscopes (video), ETT (7.0–8.0) + 1 size smaller, stylet/bougie, SGA/cric kit, meds drawn up, vent set up.",
        "Resuscitate BEFORE intubating: fluids/pressor ready (push-dose pressor), preoxygenate 3–5 min (NRB + nasal cannula or NIV), HOB up 20–30°.",
        "Medications per provider (RSI): induction agent + paralytic (see Meds). Reduce dose in shock.",
        "After tube passes cords: inflate cuff, attach ETCO₂ — need sustained waveform. Auscultate epigastrium/lungs bilaterally; note depth at teeth (≈21 cm F / 23 cm M).",
        "Secure ETT; CXR (tip 2–5 cm above carina); OG tube; cuff pressure 20–30 cmH₂O.",
        "Initial vent: Assist-control volume (or PRVC), VT 6–8 mL/kg PBW, RR 14–20, PEEP 5, FiO₂ 100% then titrate to SpO₂ 92–96% (88–95% in ARDS).",
        "Start analgesia-first sedation (fentanyl) ± propofol/dexmedetomidine per orders. Target RASS 0 to −2.",
        "ABG 20–30 min after intubation; adjust RR/VT for pH goal 7.30–7.45.",
        "Bundle: HOB 30–45°, oral care, SAT/SBT daily, DVT/GI prophylaxis per orders."
      ],
      monitor: [
        "Continuous SpO₂, ETCO₂, ECG, BP (post-intubation hypotension common — q1–2 min first 15 min)",
        "Vent: peak & plateau pressures (plateau ≤30), VT/minute ventilation, RR, auto-PEEP, FiO₂/PEEP",
        "Breath sounds, chest rise, secretions, ETT depth and cuff leak",
        "Sedation depth (RASS), pain, delirium (CAM-ICU)",
        "ABG/VBG, lactate; CXR; Na/K"
      ],
      meds: [
        "Preoxygenation: NRB + NC 15 L/min, or NIV/HFNC",
        "Induction: ketamine 1–2 mg/kg · etomidate 0.3 mg/kg · propofol 1–2 mg/kg (avoid in shock) — reduce in shock",
        "Paralytic: rocuronium 1–1.2 mg/kg · succinylcholine 1–1.5 mg/kg (avoid: hyperK, burns/crush >24–72 h, neuromuscular disease, malignant hyperthermia history)",
        "Push-dose pressor: phenylephrine 50–100 mcg or epinephrine 5–20 mcg IV",
        "Post-intubation sedation: fentanyl 25–100 mcg/h, propofol 5–50 mcg/kg/min, dexmedetomidine 0.2–1.5 mcg/kg/h",
        "Bronchodilator albuterol/ipratropium; steroids for asthma/COPD flare",
        "VERIFY PER FACILITY PROTOCOL / ORDER"
      ],
      escalate: [
        "!Can't intubate / can't oxygenate → difficult airway call, SGA, front-of-neck access (cric) per airway algorithm",
        "!SpO₂ <88% despite 100% FiO₂, rising PaCO₂/pH <7.25, shock post-intubation",
        "Persistently high plateau >30 → ARDS strategy/ICU attending",
        "Accidental extubation: bag-mask, call for help; do NOT reinsert blindly without assessment"
      ]
    },
    {
      id: "vent-alarms", name: "Ventilator alarms troubleshooting", category: "Respiratory",
      keywords: "high pressure low pressure low volume low tidal volume leak dope disconnect apnea auto-peep dyssynchrony fighting vent peak plateau",
      glance: [
        "Patient in distress or not sure? DISCONNECT from vent and hand-bag with 100% O₂, then work DOPE",
        "D-Displaced tube · O-Obstruction · P-Pneumothorax · E-Equipment / stacked breaths",
        "High pressure: Peak ↑ only = airway resistance; Peak AND plateau ↑ = lung/chest compliance"
      ],
      recognize: [
        "HIGH PRESSURE alarm: cough, biting ETT, secretions/mucus plug, kinked/water in tubing, bronchospasm, pneumothorax, mainstem intubation, dyssynchrony, ↓ compliance",
        "LOW PRESSURE / LOW VOLUME alarm: circuit disconnect or leak, cuff leak/rupture, ETT displaced above cords, chest tube air leak (bronchopleural fistula), inadequate trigger",
        "HIGH RR / LOW MINUTE VENTILATION: pain, anxiety, fever, acidosis, hypoxia, sepsis, over-sedation, apnea",
        "APNEA alarm: no triggering — sedation, neuro injury, paralytic, central cause"
      ],
      actions: [
        "Look at the PATIENT first: color, chest rise, SpO₂, ETCO₂ waveform, BP, ETT depth.",
        "!If unstable/desaturating/unsure: disconnect from vent, bag with 100% O₂ via BVM, call RT + provider.",
        "D — Displacement: check ETT depth (compare with documented), listen over both lungs & stomach, ETCO₂ waveform; if not in trachea → call for airway help / re-intubate.",
        "O — Obstruction: suction ETT (closed suction first), pass suction catheter; check for kinks/bite (bite block), mucus plug; consider bronchodilator, bronchoscopy.",
        "P — Pneumothorax: unilateral breath sounds, hypotension, SpO₂ drop, ↑ airway pressures → see Tension pneumothorax; call STAT.",
        "E — Equipment: check circuit for water, disconnects, kinks, HME/filter clogged, cuff pressure (20–30 cmH₂O), O₂ supply, vent settings; replace circuit/vent if suspected failure.",
        "S — Stacked breaths/auto-PEEP: look at flow-time waveform (expiratory flow not back to zero); briefly disconnect circuit to allow exhalation; ↓RR, ↑expiratory time; treat bronchospasm.",
        "HIGH PRESSURE sequence: Check peak vs plateau (inspiratory hold). Peak↑ plateau normal → resistance (secretions, kink, bronchospasm, bite). Both ↑ → compliance (PTX, mainstem, pulmonary edema, abdominal distension, ARDS, atelectasis).",
        "LOW VOLUME / LEAK: check connections, cuff (add air to minimal-leak), listen for leak at mouth, check chest tube bubbling; ETT may be partially out.",
        "Patient-vent dyssynchrony: assess pain/anxiety/hunger for air; adjust trigger/flow/rate with RT; analgesia first, sedation as ordered.",
        "Never silence/reset an alarm without identifying the cause. Document alarms & actions."
      ],
      monitor: [
        "SpO₂, ETCO₂ waveform and value, HR/BP after any intervention",
        "Peak, plateau, VT/MV, RR, PEEP (set vs total), I:E ratio, FiO₂",
        "Breath sounds, secretions amount/color, cuff pressure",
        "Sedation/analgesia level; trigger sensitivity",
        "ABG if persistent change"
      ],
      meds: [
        "Albuterol/ipratropium (via inline neb) for bronchospasm",
        "Analgesia (fentanyl) ± sedation per order for dyssynchrony; avoid routine paralytics unless ordered",
        "Naloxone for opioid-induced apnea (low dose, titrate)",
        "Sodium chloride lavage not routine; mucolytics per RT/provider",
        "VERIFY PER FACILITY PROTOCOL / ORDER"
      ],
      escalate: [
        "!Not resolved in <1–2 min, or any hypoxia/hypotension → RT + provider/rapid response now",
        "!Suspected PTX, mainstem, or tube out of place",
        "Persistently high plateau >30 or driving pressure >15 → provider/RT lung-protective changes",
        "Vent failure/low O₂ supply → manual ventilation, swap vent"
      ]
    },
    {
      id: "ards", name: "ARDS", category: "Respiratory",
      keywords: "acute respiratory distress syndrome lung protective ventilation prone peep tidal volume ardsnet plateau driving pressure paralytic",
      glance: [
        "Severe hypoxemia + bilateral infiltrates not explained by heart failure/fluid overload",
        "Lung-protective vent: VT 6 mL/kg PBW (4–8), plateau ≤30 cmH₂O, PEEP per ARDSNet table",
        "P/F <150 → proning ≥12–16 h/day; consider early paralytic/ECMO referral for severe"
      ],
      recognize: [
        "Acute onset (≤1 week of known insult: sepsis, pneumonia, aspiration, pancreatitis, trauma, transfusion)",
        "Bilateral opacities on CXR/CT; respiratory failure not fully explained by cardiac failure/fluid",
        "Berlin: P/F (PEEP ≥5) 200–300 mild · 100–200 moderate · ≤100 severe",
        "Refractory hypoxemia, ↓ compliance, high plateau pressure"
      ],
      actions: [
        "!Notify provider/RT; confirm diagnosis (CXR, ABG, echo to exclude cardiogenic edema).",
        "Calculate PBW from HEIGHT & sex (Quick tools). Set VT 6 mL/kg PBW (range 4–8); initial RR up to 35 to hold minute ventilation.",
        "Keep plateau ≤30 cmH₂O (check q4h and with changes). Aim driving pressure (plateau − PEEP) <15.",
        "Oxygen targets: SpO₂ 88–95% (PaO₂ 55–80). Set PEEP/FiO₂ per ARDSNet table (e.g., FiO₂ 0.3→PEEP 5; 0.5→8–10; 0.7→10–14; 1.0→18–24).",
        "pH goal 7.30–7.45; permissive hypercapnia is acceptable (avoid pH <7.20 — consider ↑RR / VT up to 8 mL/kg if plateau allows).",
        "Treat the cause (antibiotics for infection, source control, stop transfusion).",
        "Deep sedation/analgesia initially if dyssynchrony; consider neuromuscular blocker (e.g., cisatracurium) for severe/ persistent dyssynchrony or P/F <150 — per intensivist.",
        "Prone positioning for P/F <150 on FiO₂ ≥0.6 (PEEP ≥5): proned ≥12–16 h/day; use proning team protocol (secure tube/lines, protect face/eyes, pressure points).",
        "Conservative fluids once perfusion is stable (avoid positive balance).",
        "Escalate to rescue: recruitment/higher PEEP, inhaled pulmonary vasodilator, ECMO referral for refractory hypoxemia (P/F <80 despite optimization)."
      ],
      monitor: [
        "SpO₂, ABG/P/F trend; plateau & driving pressure, compliance q4h",
        "Hemodynamics (high PEEP and proning can drop BP/preload)",
        "Net fluid balance, weights; renal function",
        "Skin/pressure injuries, ETT position and eyes in prone; tube feeds tolerance",
        "Sedation/paralytic depth (TOF if on NMB), glucose, delirium"
      ],
      meds: [
        "Analgesia/sedation: fentanyl, propofol, dexmedetomidine (avoid benzos if possible)",
        "Neuromuscular blocker (cisatracurium) — short course for severe ARDS per provider",
        "Antibiotics for cause · Diuretic once stable · Inhaled nitric oxide/epoprostenol (rescue)",
        "Corticosteroids (e.g., dexamethasone 20 mg/day→10) may be considered per provider/protocol",
        "Stress ulcer & VTE prophylaxis per orders",
        "VERIFY PER FACILITY PROTOCOL / ORDER"
      ],
      escalate: [
        "!P/F <150 despite optimization → proning decision, intensivist now",
        "!Plateau >30, pH <7.20, or severe hypoxemia → ECMO/rescue discussion",
        "New pneumothorax, hemodynamic collapse, or sudden desaturation → treat immediately (see Tension pneumothorax)"
      ]
    },
    {
      id: "pe", name: "Pulmonary embolism", category: "Respiratory",
      keywords: "pe clot dvt anticoagulation heparin thrombolysis alteplase tpa rv strain saddle d-dimer ctpa",
      glance: [
        "Sudden dyspnea/hypoxia/tachycardia/chest pain/syncope ± DVT signs — think PE",
        "Unstable (SBP <90, shock, arrest)? Call STAT — systemic thrombolysis / PERT",
        "Anticoagulate promptly when suspicion is high and no contraindication, while confirming"
      ],
      recognize: [
        "Dyspnea, pleuritic pain, tachycardia, hypoxia, cough/hemoptysis, syncope, leg swelling",
        "Risk factors: immobility, surgery, trauma, cancer, central lines, prior VTE, pregnancy, estrogen",
        "High-risk (massive): SBP <90 for ≥15 min or pressor need, or cardiac arrest",
        "ECG: sinus tach, S1Q3T3, RBBB, T inversion V1–V4. Echo: RV dilation/strain. Troponin/BNP ↑"
      ],
      actions: [
        "O₂ to SpO₂ ≥90%; monitor ECG/SpO₂/BP; IV access. Avoid intubation if possible (positive pressure + sedation can precipitate collapse).",
        "!Call provider/rapid response. If unstable: activate PERT / call for thrombolysis decision.",
        "Assess bleeding risks and contraindications to anticoagulation/lytics (recent surgery, ICH, active bleeding, stroke).",
        "Begin anticoagulation per order: UFH IV (80 units/kg bolus then 18 units/kg/h, per nomogram) preferred if high-risk/may need lysis; LMWH otherwise.",
        "Confirm: CT pulmonary angiogram (check renal function/contrast allergy), echo, lower-limb duplex, troponin, BNP, lactate, ABG.",
        "Hemodynamically unstable and no contraindication: systemic thrombolysis (alteplase 100 mg over 2 h; 50 mg IV bolus in arrest per protocol).",
        "If lysis contraindicated/failed: catheter-directed therapy or surgical embolectomy; ECMO as rescue.",
        "RV failure care: cautious fluids (≤500 mL; stop if CVP rising), norepinephrine first-line vasopressor ± inotrope (dobutamine); avoid over-diuresis.",
        "Mechanical DVT prophylaxis only if anticoagulation not possible; consider IVC filter per provider."
      ],
      monitor: [
        "SpO₂, HR, BP, RR continuously; mentation; urine output",
        "Bleeding (IV sites, GI, neuro checks), aPTT/anti-Xa per nomogram q6h; platelets (HIT)",
        "Post-lysis: neuro checks q15 min ×1–2 h; avoid IM injections/invasive procedures",
        "RV function on echo; lactate",
        "Hgb, creatinine"
      ],
      meds: [
        "UFH 80 units/kg IV bolus → 18 units/kg/h (adjust per aPTT/anti-Xa nomogram)",
        "Enoxaparin 1 mg/kg q12h (renal adjustments) · DOACs after stabilization",
        "Alteplase 100 mg IV over 2 h (unstable PE); 50 mg IV bolus in arrest per local protocol",
        "Norepinephrine, dobutamine for RV failure",
        "VERIFY PER FACILITY PROTOCOL / ORDER"
      ],
      escalate: [
        "!SBP <90, syncope, rising pressor need, or cardiac arrest → emergent reperfusion (lysis/embolectomy)",
        "!Bleeding on anticoagulation or lysis → stop infusion, call provider",
        "New neuro change after lysis → stat CT head; HIT suspicion (platelets ↓ >50%)"
      ]
    },
    /* ============================ SHOCK ============================ */
    {
      id: "sepsis", name: "Sepsis / septic shock", category: "Shock",
      keywords: "infection hour-1 bundle lactate cultures antibiotics norepinephrine vasopressin fluids ssc qsofa sirs map",
      glance: [
        "Suspect infection + organ dysfunction/hypotension → start the HOUR-1 bundle NOW",
        "Lactate + blood cultures ×2 → broad-spectrum antibiotics within 1 h (don't delay >45 min for cultures)",
        "Fluids 30 mL/kg balanced crystalloid for hypotension/lactate ≥4; norepinephrine if MAP <65"
      ],
      recognize: [
        "Suspected/confirmed infection + acute organ dysfunction (SOFA ↑ ≥2): AMS, RR ≥22, SBP ≤100 (qSOFA), oliguria, ↑creatinine/bilirubin, ↓platelets, hypoxemia",
        "Fever or hypothermia, tachycardia, WBC ↑/↓, bandemia; mottled skin, cap refill >3 s",
        "Septic SHOCK: vasopressor need to keep MAP ≥65 AND lactate >2 mmol/L despite adequate fluids",
        "Beware: older, immunosuppressed, cirrhosis, β-blocked pts may not mount fever/tachycardia"
      ],
      actions: [
        "!Call provider/rapid response; initiate sepsis alert per protocol. Note time zero.",
        "Measure lactate (venous OK). Remeasure in 2–4 h if initial >2 mmol/L.",
        "Blood cultures ×2 (aerobic/anaerobic, different sites) BEFORE antibiotics if no significant delay (<45 min). Culture other sources (urine, sputum, lines, wound).",
        "Broad-spectrum IV antibiotics within 1 h for shock or high suspicion (cover likely source/local antibiogram, MRSA/Pseudomonas risk). Check allergies.",
        "Large-bore IV ×2 (or IO). For hypotension or lactate ≥4: balanced crystalloid (LR/Plasma-Lyte) 30 mL/kg IV within first 3 h; bolus & reassess.",
        "Reassess perfusion after each bolus (BP, cap refill, UOP, lactate, passive leg raise, dynamic indices).",
        "Start vasopressor if MAP <65 during/after fluids — norepinephrine first-line; don't wait for all fluids (peripheral OK short-term, then central).",
        "Arterial line for ongoing MAP monitoring. Foley and hourly UOP.",
        "Source control ASAP (drain abscess, remove infected line/device, surgical consult) — ideally within 6–12 h.",
        "Persistent hypotension: add vasopressin 0.03 units/min (when NE ~0.25–0.5 mcg/kg/min); consider hydrocortisone 200 mg/day (50 mg q6h) if ongoing pressors.",
        "Glucose 140–180 mg/dL; VTE prophylaxis; stress ulcer prophylaxis if risk; reassess antibiotics daily/de-escalate."
      ],
      monitor: [
        "MAP ≥65 (continuous art line), HR, cap refill, mottling score",
        "Lactate clearance q2–4 h until normalizing",
        "UOP ≥0.5 mL/kg/h; creatinine; fluid balance (avoid overload after resuscitation)",
        "SpO₂/P:F ratio; ventilation needs; mental status",
        "Temp, WBC, cultures, procalcitonin per provider; line sites",
        "Pressor doses, extravasation, platelets/coags (DIC), glucose"
      ],
      meds: [
        "Antibiotics (broad-spectrum) per facility sepsis pathway/allergies — first dose ASAP",
        "Crystalloid (LR/Plasma-Lyte preferred over NS) 30 mL/kg for hypotension/lactate ≥4",
        "Norepinephrine 0.05–0.5+ mcg/kg/min titrate to MAP ≥65 (first-line)",
        "Vasopressin 0.03 units/min fixed · Epinephrine second-line · Dobutamine if cardiac dysfunction",
        "Hydrocortisone 50 mg IV q6h (200 mg/day) if ongoing high vasopressor need (≥4 h)",
        "Albumin if large crystalloid volumes needed (per provider)",
        "VERIFY PER FACILITY PROTOCOL / ORDER"
      ],
      escalate: [
        "!MAP <65 after 30 mL/kg + rising pressor dose, lactate not clearing, new organ failure",
        "!Source needing procedure (abscess, necrotizing infection, obstructed system, perforation)",
        "Escalate to ICU attending/intensivist; consider ECMO/CRRT per course",
        "Allergy concern or antibiotic delay >1 h → pharmacy/provider NOW (don't withhold first dose without guidance)"
      ]
    },
    {
      id: "hemorrhagic-shock", name: "Hypovolemic / hemorrhagic shock", category: "Shock",
      keywords: "bleeding hemorrhage trauma transfusion massive transfusion protocol mtp txa blood loss hypovolemia dehydration",
      glance: [
        "Find & STOP the bleed: direct pressure / tourniquet / call surgeon",
        "2 large-bore IVs (or IO), activate MASSIVE TRANSFUSION if ongoing major bleed",
        "Blood > crystalloid; keep warm; give calcium & TXA as ordered"
      ],
      recognize: [
        "Tachycardia, hypotension (late), narrow pulse pressure, cool pale clammy skin, AMS, oliguria, thirst",
        "Blood loss class: I <15% · II 15–30% (↑HR) · III 30–40% (↓BP) · IV >40% (obtunded)",
        "Sources: trauma, GI bleed, retroperitoneal, post-op/surgical site, ruptured aneurysm/AAA, ectopic, postpartum, anticoagulation",
        "Non-hemorrhagic hypovolemia: vomiting, diarrhea, burns, DKA, over-diuresis, third-spacing",
        "Lactate ↑, base deficit ↑, shock index (HR ÷ SBP) >0.9–1.0"
      ],
      actions: [
        "!Call rapid response/provider/surgery now. Activate massive transfusion protocol (MTP) if >~4 U pRBC/h expected or unstable.",
        "Control external bleeding: direct pressure, packing, tourniquet for extremity. Pelvic binder if pelvic fracture suspected.",
        "Position supine (leg raise ok). O₂. Keep NPO.",
        "Two large-bore IVs (16–14 G) or IO; rapid infuser/warmer. Send STAT: type & crossmatch, CBC, coags/fibrinogen, TEG/ROTEM, BMP, ionized Ca, lactate, ABG.",
        "Resuscitate with blood products: balanced 1:1:1 (pRBC : plasma : platelets) for hemorrhage; limit crystalloid (≤1 L).",
        "Permissive hypotension (SBP ~80–90 / MAP 50–60) until bleeding controlled in trauma WITHOUT head injury; keep MAP higher with TBI/spinal injury.",
        "Tranexamic acid (TXA) 1 g IV over 10 min, then 1 g over 8 h if within 3 h of injury / major bleed (per provider).",
        "Replace calcium (calcium chloride 1 g or gluconate 3 g) with ongoing transfusion; keep iCa >1.1 mmol/L.",
        "Prevent lethal triad: keep warm (warming blankets, warmed fluids), correct acidosis and coagulopathy.",
        "Reverse anticoagulants: warfarin → 4-factor PCC + vitamin K; dabigatran → idarucizumab; Xa inhibitors → andexanet/PCC; heparin → protamine (per provider).",
        "Definitive hemostasis: OR / IR embolization / endoscopy / chest tube."
      ],
      monitor: [
        "HR, BP/MAP, shock index, cap refill, mentation q5–15 min",
        "Hgb/Hct, lactate, base deficit, iCa, K, fibrinogen, platelets, TEG; temp (goal >36 °C)",
        "UOP hourly; chest tube/drain output; abdominal girth; dressing strikethrough",
        "Transfusion reaction signs; K ↑ with massive transfusion; ongoing blood loss",
        "Pressor requirement (if any) – last resort after volume"
      ],
      meds: [
        "pRBC : FFP : platelets ~1:1:1 · Cryoprecipitate/fibrinogen concentrate for fibrinogen <150–200 mg/dL",
        "TXA 1 g IV over 10 min then 1 g over 8 h",
        "Calcium chloride 1 g IV (central) or calcium gluconate 3 g",
        "Crystalloid warmed bolus 250–500 mL for non-hemorrhagic hypovolemia, reassess (1–2 L total typical)",
        "Vasopressor (norepinephrine/vasopressin) only as bridge if refractory",
        "Reversal agents (PCC, vitamin K, protamine, idarucizumab, andexanet)",
        "VERIFY PER FACILITY PROTOCOL / ORDER"
      ],
      escalate: [
        "!Ongoing bleed with unstable vitals → MTP + surgery/IR NOW",
        "!Altered mental status, SBP <80, or no response to initial transfusion",
        "Hypothermia <35 °C, coagulopathy, or acidosis (pH <7.2) — escalate resuscitation"
      ]
    },
    /* ============================ NEURO ============================ */
    {
      id: "ischemic-stroke", name: "Acute ischemic stroke", category: "Neuro",
      keywords: "stroke cva code stroke tpa alteplase tenecteplase thrombectomy nihss fast bp last known well lvo",
      glance: [
        "Note LAST KNOWN WELL time. Call STROKE CODE. Check glucose.",
        "STAT non-contrast CT head (goal door-to-CT ≤25 min); NPO until swallow screen",
        "Thrombolysis window ≤4.5 h from LKW; thrombectomy up to 24 h for large vessel occlusion — time = brain"
      ],
      recognize: [
        "FAST / BE-FAST: Balance, Eyes (vision loss), Face droop, Arm drift, Speech slurred/aphasia, Time",
        "Sudden: weakness/numbness one side, aphasia, visual loss, vertigo with ataxia, severe headache (hemorrhagic?), neglect, gaze deviation",
        "In ICU/post-op: new deficit in any pt = stroke until proven otherwise",
        "Mimics: hypoglycemia, seizure/post-ictal, migraine, Bell's palsy, sepsis — check glucose first"
      ],
      actions: [
        "Note LKW / discovery time and witness phone number. Do NOT give food/drink/oral meds.",
        "!Activate stroke code / rapid response.",
        "ABCs; O₂ only if SpO₂ <94%. Head-of-bed per order/protocol (elevate if aspiration or ↑ICP risk). IV ×2.",
        "POINT-OF-CARE GLUCOSE (treat if <60 mg/dL).",
        "STAT CT head non-contrast ± CT angiography/perfusion; labs (CBC, BMP, coags, troponin, type & screen); ECG.",
        "NIHSS by trained staff. Record last anticoagulant/antiplatelet dose and time (affects lysis eligibility).",
        "BP management: if lysis candidate keep BP <185/110 before and <180/105 for 24 h after. If NOT receiving lysis, permissive HTN: treat only if >220/120 (lower ≈15% in first 24 h) unless other indication.",
        "Lysis (if eligible; provider decision): alteplase 0.9 mg/kg (max 90 mg; 10% bolus, remainder over 60 min) or tenecteplase 0.25 mg/kg (max 25 mg) single bolus per facility protocol. Door-to-needle goal ≤60 min (ideally <45).",
        "LVO suspected: prepare transfer/IR for thrombectomy (extended windows via perfusion imaging).",
        "No aspirin/anticoagulant until hemorrhage excluded and lysis decision made (aspirin usually delayed ≥24 h after lysis).",
        "Bedside swallow screen BEFORE any oral intake.",
        "Post-lysis: ICU/stroke unit monitoring (see Monitor)."
      ],
      monitor: [
        "Post-lysis: neuro checks + BP q15 min ×2 h, q30 min ×6 h, then q1h ×16 h (or per protocol)",
        "!STOP lysis infusion & stat CT if: severe headache, N/V, new neuro decline, acute hypertension, bleeding",
        "Angioedema (tongue/lip swelling) during/after alteplase, esp. on ACE-i",
        "Glucose 140–180; temp (treat fever); SpO₂; aspiration precautions",
        "No arterial punctures/NG/Foley/IM injections for 24 h post-lysis unless essential",
        "Repeat CT at 24 h before antithrombotics"
      ],
      meds: [
        "Alteplase 0.9 mg/kg (max 90 mg) over 60 min, 10% as bolus; or tenecteplase 0.25 mg/kg (max 25 mg) bolus",
        "BP: labetalol 10–20 mg IV, nicardipine 5 mg/h titrate (2.5 mg/h q5–15 min, max 15 mg/h), clevidipine",
        "Aspirin 160–325 mg within 24–48 h (after lysis exclusion/24 h post lysis)",
        "Statin, glucose control, DVT prophylaxis (IPC)",
        "Antiepileptics only if seizure",
        "VERIFY PER FACILITY PROTOCOL / ORDER"
      ],
      escalate: [
        "!Any new deficit, decreased LOC, severe headache or vomiting → call provider/stroke team; stat CT",
        "!BP above limits despite meds",
        "Malignant edema signs (decline day 2–4) → neurosurgery/neuro-ICU for hemicraniectomy"
      ]
    },
    {
      id: "ich-icp", name: "Intracranial hemorrhage / increased ICP", category: "Neuro",
      keywords: "brain bleed intracerebral hemorrhage subarachnoid sah herniation cushing mannitol hypertonic saline evd head injury tbi pupil blown",
      glance: [
        "Sudden severe headache, vomiting, ↓LOC, unequal pupils, focal deficit → STAT CT + provider",
        "HOB 30°, head midline, treat airway, avoid hypotension/hypoxia/hypercapnia",
        "Herniation signs (blown pupil, Cushing's, posturing) → hyperosmolar therapy NOW + neurosurgery"
      ],
      recognize: [
        "ICH/SAH: sudden worst headache, nausea/vomiting, seizure, focal deficit, neck stiffness, ↓GCS",
        "↑ICP: headache, vomiting, declining LOC, papilledema, dilated sluggish pupil, CN VI palsy",
        "IMMINENT HERNIATION: unilateral/bilateral fixed dilated pupils, posturing, Cushing's triad (hypertension + bradycardia + irregular breathing)",
        "Anticoagulant/antiplatelet use, coagulopathy, trauma, or hypertensive crisis increase risk"
      ],
      actions: [
        "!Call rapid response / provider STAT (neurosurgery/neurology). Time and document neuro exam (GCS, pupils, motor).",
        "ABC: protect airway — GCS ≤8 or deteriorating → intubate (RSI with minimal hemodynamic swings). Avoid hypoxia (SpO₂ ≥94%).",
        "HOB 30°, head midline, neck not rotated; loosen tight cervical collar/ETT ties (avoid jugular compression). Minimize stimulation, treat pain/agitation.",
        "STAT non-contrast CT head; labs: coags, CBC, platelets, BMP/Na, glucose, type & screen. Check last anticoag dose.",
        "REVERSE anticoagulation per order: warfarin → 4F-PCC + IV vitamin K; dabigatran → idarucizumab; Xa inhibitors → andexanet/PCC; heparin → protamine; thrombocytopenia/antiplatelets → per neurosurgery.",
        "BP: ICH acute — typical SBP target ~140 (range 130–150); avoid SBP <130 and big swings (nicardipine/clevidipine/labetalol infusions). Maintain CPP 60–70 if ICP monitored.",
        "Normocapnia (PaCO₂ 35–45). Brief hyperventilation (PaCO₂ ~30–35) ONLY for impending herniation as bridge.",
        "Herniation / ICP >22: hyperosmolar therapy — 23.4% saline 30 mL via central line over 10–20 min (or 3% saline 250 mL bolus), or mannitol 0.25–1 g/kg IV over 15–20 min.",
        "Maintain Na 140–155 (target per provider), normothermia, glucose 140–180, treat seizures.",
        "EVD/ICP monitor: level at tragus (external auditory meatus) at ordered height; clamp when moving; hourly drain output.",
        "SAH: secure aneurysm; nimodipine 60 mg q4h PO/NG (hold/split if hypotension); BP control before securing; avoid hypovolemia."
      ],
      monitor: [
        "Neuro checks q15 min–q1h (GCS, pupils size/reactivity, motor, speech)",
        "ICP (goal <20–22 mmHg), CPP (MAP − ICP; goal 60–70), MAP, SBP target",
        "Na q4–6h with hypertonic saline (stop if >155–160); serum osm if mannitol (hold if osm >320 or renal failure)",
        "ETCO₂/PaCO₂, SpO₂, temp, glucose; UOP (DI with SAH/TBI — hourly UOP and Na)",
        "EVD: waveform, drainage color/amount, insertion site, leak",
        "Seizure activity; vasospasm days 3–14 in SAH (new deficit → call)"
      ],
      meds: [
        "Hypertonic saline 3% 250 mL bolus (or 23.4% 30 mL central) · Mannitol 0.25–1 g/kg",
        "Nicardipine 5–15 mg/h · Clevidipine 1–21 mg/h · Labetalol 10–20 mg IV / infusion",
        "Reversal: 4F-PCC, vitamin K 10 mg IV, idarucizumab 5 g, andexanet alfa, protamine",
        "Levetiracetam if seizure (or prophylaxis per neurosurgery); analgesia/sedation (propofol, fentanyl)",
        "Nimodipine 60 mg q4h (SAH) · Stool softeners; avoid straining",
        "VERIFY PER FACILITY PROTOCOL / ORDER"
      ],
      escalate: [
        "!Any GCS drop ≥2, new pupillary change, posturing, Cushing's response → neurosurgery STAT",
        "!ICP persistently >22 or EVD problem (no drainage, blockage, leaking, high output)",
        "SBP above/below target on meds · seizure · new focal deficit"
      ]
    },
    /* ============================ METABOLIC / RENAL ============================ */
    {
      id: "dka", name: "Diabetic ketoacidosis (DKA)", category: "Metabolic/Renal",
      keywords: "diabetes ketoacidosis insulin drip potassium anion gap hhs hyperglycemia kussmaul",
      glance: [
        "Check K+ BEFORE insulin: K <3.3 → hold insulin and replace K first",
        "Fluids first (≈1–1.5 L isotonic crystalloid in hour 1), then insulin infusion 0.1 unit/kg/h",
        "Hourly glucose; add dextrose when glucose <250 (200–250); never stop insulin until gap closes"
      ],
      recognize: [
        "Glucose usually >250 mg/dL (can be lower — euglycemic DKA with SGLT2 inhibitors), pH <7.30, HCO₃ <18, anion gap ↑, ketones +",
        "Polyuria/polydipsia, N/V, abdominal pain, Kussmaul breathing, fruity breath, dehydration, AMS",
        "Triggers: missed insulin, infection, MI, stroke, pancreatitis, steroids, SGLT2i, pregnancy",
        "Total body K is depleted even if serum K normal/high"
      ],
      actions: [
        "!Call provider; place on cardiac monitor; 2 IVs; labs: BMP (K!), glucose, β-hydroxybutyrate/ketones, VBG/ABG, lactate, Mg, Phos, CBC, UA, ECG, cultures if febrile.",
        "Fluids: isotonic crystalloid (balanced or 0.9% NaCl) 15–20 mL/kg (≈1–1.5 L) in first hour; then 250–500 mL/h guided by hydration, Na, UOP.",
        "POTASSIUM: K <3.3 → HOLD insulin; give 20–30 mEq/h KCl until K ≥3.3. K 3.3–5.0 (5.2) → add 20–30 mEq to each liter IV fluid (goal 4–5). K >5.0–5.2 → no K; recheck q2h.",
        "INSULIN (once K ≥3.3): regular insulin IV infusion 0.1 unit/kg/h (± 0.1 unit/kg bolus) or 0.14 unit/kg/h without bolus. Goal glucose fall 50–75 mg/dL/h.",
        "Glucose hourly. If glucose falls <250 mg/dL (or 200 per protocol) add D5 (or D10) to fluids and keep insulin running (↓ rate to 0.02–0.05 units/kg/h only per protocol).",
        "Bicarbonate only if pH <6.9 (per provider). Phosphate if <1.0 mg/dL or cardiac dysfunction/hypoxia.",
        "Find and treat the trigger (antibiotics, ACS workup, stop SGLT2i).",
        "NPO until improving; antiemetic; strict I&O; Foley if needed.",
        "Resolution (typical): glucose <200 AND ≥2 of: HCO₃ ≥15–18, pH >7.3, AG ≤12 (or ketones <0.6). Give SC basal insulin and overlap 1–2 h BEFORE stopping infusion.",
        "Check Mg; replace PO4/K as ordered."
      ],
      monitor: [
        "Glucose q1h; BMP + anion gap, K q2–4h; VBG pH q2–4h; ketones",
        "ECG/cardiac monitor (K shifts); UOP, I&O, vitals, mentation",
        "Hypoglycemia & hypokalemia (most common insulin complications); cerebral edema: headache, drop in GCS, bradycardia (more in kids)",
        "Fluid overload in heart/renal disease; hyperchloremic acidosis (non-gap)",
        "Mg, Phos, Na (corrected = Na + 1.6 × [glucose − 100]/100)"
      ],
      meds: [
        "Isotonic crystalloid 1–1.5 L first hour · maintenance 250–500 mL/h",
        "Regular insulin IV 0.1 unit/kg/h (± 0.1 unit/kg bolus) or 0.14 unit/kg/h",
        "KCl 20–30 mEq per liter / 20–30 mEq/h for K <3.3",
        "Dextrose 5–10% when glucose <250 · Sodium bicarbonate only if pH <6.9",
        "Phosphate if <1.0 mg/dL · Basal SC insulin when transitioning",
        "VERIFY PER FACILITY PROTOCOL / ORDER (DKA order set)"
      ],
      escalate: [
        "!K <3.3 or >5.5 · pH <7.0 · AMS/GCS drop · glucose not falling · shock",
        "!Headache or neuro decline during treatment → possible cerebral edema",
        "Anion gap not closing after 6–12 h · recurrent ketosis · pregnancy"
      ]
    },
    {
      id: "hypoglycemia", name: "Severe hypoglycemia", category: "Metabolic/Renal",
      keywords: "low blood sugar dextrose d50 glucagon insulin sulfonylurea octreotide d10 glucose",
      glance: [
        "Glucose <70 mg/dL (<54 clinically significant). Treat FIRST, then investigate",
        "Alert + can swallow: 15–20 g fast carbs, recheck in 15 min",
        "Unable to swallow/unresponsive: IV dextrose (D50 25 g or D10) — or glucagon if no IV; STOP insulin"
      ],
      recognize: [
        "Sweating, tremor, tachycardia, hunger, anxiety; confusion, seizure, coma, focal deficit mimicking stroke",
        "ICU masks: sedation, β-blockers, critical illness",
        "ICU causes: insulin infusion/over-correction, sulfonylureas, ↓ feeds/TPN/steroid change, sepsis, adrenal insufficiency, liver/renal failure, alcohol"
      ],
      actions: [
        "Check glucose (POC; confirm on blood sample if unexpected). Stop/pause insulin infusion; stay with pt.",
        "!Call provider if severe, unresponsive, seizing, or cause unclear.",
        "ALERT & can swallow safely: 15–20 g fast carbohydrate (4 oz juice or 3–4 glucose tabs). Recheck in 15 min; repeat until >70, then give snack/meal.",
        "NOT able to take PO or has IV access: dextrose 50% 25 g (50 mL) IV push — or dextrose 10% 125–250 mL IV bolus (12.5–25 g) per protocol.",
        "No IV access: glucagon 1 mg IM/SC (or 3 mg intranasal). Less effective in starvation/liver disease/alcohol — get IV.",
        "Recheck glucose in 15 min and again until stable ≥70 (goal 100+) — repeat dextrose if still low.",
        "Start dextrose-containing infusion (e.g., D10 at 50–100 mL/h) if prolonged risk (insulin/sulfonylurea).",
        "Alcohol/malnutrition: give thiamine 100 mg IV with/before dextrose.",
        "Sulfonylurea-induced: expect recurrent lows 24–72 h; octreotide 50 mcg SC/IV q6h per provider; admit/monitor hourly.",
        "Find cause; review insulin orders; adjust tube feeds/TPN/steroids; document."
      ],
      monitor: [
        "Glucose q15 min until >70 ×2, then q1h ×4–6h (longer for sulfonylurea / long-acting insulin)",
        "Mental status, seizure activity; vitals, ECG (K shifts)",
        "Rebound hyperglycemia after D50 is common — avoid over-treating",
        "Nutrition status: tube feeds/TPN running? steroids?",
        "Renal/hepatic function, cortisol if no clear cause"
      ],
      meds: [
        "Oral carbs 15–20 g · Dextrose 50% 25 g IV (50 mL) · Dextrose 10% 125–250 mL",
        "Glucagon 1 mg IM/SC/IV or intranasal 3 mg",
        "Thiamine 100 mg IV if at risk",
        "Octreotide 50 mcg SC/IV q6–12h (sulfonylurea)",
        "Hydrocortisone if adrenal insufficiency suspected (per provider)",
        "VERIFY PER FACILITY PROTOCOL / ORDER"
      ],
      escalate: [
        "!Glucose <54 not responding after 2 treatments · persistent AMS · seizure",
        "Suspected sulfonylurea or long-acting insulin overdose",
        "Recurrent hypoglycemia on insulin protocol — review protocol/orders"
      ]
    },
    {
      id: "hyperkalemia", name: "Hyperkalemia", category: "Metabolic/Renal",
      keywords: "high potassium calcium gluconate insulin dextrose albuterol peaked t waves dialysis kayexalate lokelma sine wave",
      glance: [
        "ECG changes (peaked T, wide QRS, loss of P) or K ≥6.5 = EMERGENCY",
        "1) Calcium IV (protect heart)  2) Shift K in (insulin+dextrose, albuterol)  3) Remove K (diuretic, binder, dialysis)",
        "STOP K sources (supplements, K-sparing meds, ACE-i/ARB); recheck K in 1–2 h"
      ],
      recognize: [
        "K >5.5 mmol/L (mild 5.5–5.9 · moderate 6.0–6.4 · severe ≥6.5)",
        "ECG: peaked T waves → PR prolongation, P loss → wide QRS → sine wave → VF/asystole",
        "Muscle weakness, paralysis, paresthesias, bradycardia, palpitations; often few symptoms",
        "Causes: AKI/CKD, K-sparing diuretics, ACE-i/ARB, rhabdo, tissue breakdown, acidosis, transfusion, DKA, succinylcholine, hemolyzed sample (pseudohyperK)"
      ],
      actions: [
        "Place on cardiac monitor; 12-lead ECG. Repeat K (non-hemolyzed) but do NOT delay treatment if ECG changes.",
        "!Call provider/rapid response for K ≥6.5 or ECG changes.",
        "STOP K-containing fluids/supplements/meds (K-sparing diuretics, ACE-i/ARB, NSAIDs, TMP-SMX, heparin).",
        "STABILIZE HEART: calcium gluconate 10% 1–3 g (10–30 mL) IV over 5–10 min (or calcium chloride 1 g via central/good IV). Repeat in 5 min if ECG still abnormal. Lasts 30–60 min.",
        "SHIFT K: regular insulin 10 units IV + dextrose 25 g (D50 50 mL). Use 5 units (or more dextrose) if renal failure/low baseline glucose. Glucose checks q30–60 min × 4–6 h.",
        "Albuterol 10–20 mg nebulized over 10 min (additive; avoid if active ischemia/tachyarrhythmia).",
        "Sodium bicarbonate 50–150 mEq IV if acidotic (pH <7.2 / HCO₃ low); less effective alone.",
        "REMOVE K: loop diuretic (furosemide 40–80 mg IV) if making urine; sodium zirconium cyclosilicate 10 g PO or patiromer; sodium polystyrene as alternative.",
        "Dialysis (nephrology STAT) for refractory/severe hyperK, AKI/oliguria, or rhabdomyolysis.",
        "Recheck K 1–2 h after treatment and q2–4h until stable; treat cause."
      ],
      monitor: [
        "Continuous ECG until K <5.5 and ECG normal",
        "K at 1–2 h then q2–4h; glucose after insulin (q30–60 min ×4–6h)",
        "Calcium effect duration is short; repeat calcium if ECG changes recur",
        "UOP, creatinine, acid–base",
        "Rebound hyperK as insulin/albuterol wear off (2–4 h)"
      ],
      meds: [
        "Calcium gluconate 1–3 g IV over 5–10 min (or CaCl 1 g central) — repeat PRN",
        "Insulin regular 10 units IV (or 5 if renal/low weight) + D50 25 g, then D10 infusion if glucose falling",
        "Albuterol 10–20 mg neb · Sodium bicarbonate 50–150 mEq if acidotic",
        "Furosemide 40–80 mg IV · Sodium zirconium cyclosilicate 10 g · Patiromer · SPS",
        "Hemodialysis",
        "VERIFY PER FACILITY PROTOCOL / ORDER"
      ],
      escalate: [
        "!Any ECG change, K ≥6.5, arrhythmia, weakness → provider now, calcium first",
        "!Oliguria/AKI or refractory → nephrology for dialysis",
        "Cardiac arrest: calcium + bicarbonate + insulin/dextrose per ACLS (H's & T's)"
      ]
    },
    {
      id: "aki", name: "Acute kidney injury (AKI)", category: "Metabolic/Renal",
      keywords: "kidney failure oliguria creatinine dialysis crrt nephrotoxins contrast urine output prerenal atn kdigo",
      glance: [
        "Oliguria (<0.5 mL/kg/h ×6h) or Cr ↑0.3 in 48h / ≥1.5× baseline = AKI",
        "Find the cause: prerenal (volume, perfusion) · intrinsic (ATN, toxins) · postrenal (obstruction — bladder scan!)",
        "Fix perfusion (MAP ≥65), stop nephrotoxins, renally dose meds; watch K/acid/volume for dialysis triggers"
      ],
      recognize: [
        "KDIGO: Cr rise ≥0.3 mg/dL within 48h, ≥1.5× baseline within 7 d, or UOP <0.5 mL/kg/h ×6 h",
        "Stage 1: 1.5–1.9× · Stage 2: 2.0–2.9× · Stage 3: ≥3× or Cr ≥4 or RRT or UOP <0.3 mL/kg/h ×24 h / anuria ×12 h",
        "Causes: sepsis, shock, hypovolemia, cardiorenal, contrast, vancomycin/aminoglycosides, NSAIDs, rhabdomyolysis, obstruction, hepatorenal",
        "Late: volume overload, ↑K, metabolic acidosis, uremic signs (confusion, pericardial rub, bleeding)"
      ],
      actions: [
        "!Notify provider of low UOP or rising creatinine; verify baseline Cr.",
        "Bladder scan; flush/replace Foley if blocked; confirm catheter output; notify for obstruction.",
        "Volume assessment: vitals, orthostatics (if able), JVP, edema, lung exam, weight, I&O, ultrasound (IVC).",
        "Hypovolemic → balanced crystalloid bolus 250–500 mL and reassess. Overloaded → hold fluids; diuretic trial per provider.",
        "Support MAP ≥65 (higher e.g., 70–80 in chronic HTN per provider); treat shock/sepsis.",
        "Hold/avoid nephrotoxins: NSAIDs, IV contrast, aminoglycosides, vanco trough, ACE-i/ARB, diuretics; renally dose all meds (pharmacy).",
        "Labs: BMP, K, HCO₃, Mg, Phos, CBC, UA + urine Na/Cr/urea (FENa/FEUrea), CK if rhabdo, ABG/VBG. Renal ultrasound.",
        "Treat hyperkalemia/acidosis per protocol (see Hyperkalemia).",
        "Strict I&O (hourly UOP), daily weight, avoid unnecessary lines/catheter days.",
        "Dialysis indications — A.E.I.O.U.: refractory Acidosis, Electrolytes (K), Intoxication, Overload (pulm edema), Uremia (pericarditis/encephalopathy/bleeding). Call nephrology."
      ],
      monitor: [
        "UOP hourly; creatinine/BUN daily or q12h",
        "K, HCO₃, Na, Phos, Mg, Ca per protocol",
        "Fluid balance, weight, lung sounds, SpO₂ (overload)",
        "Drug levels (vancomycin, aminoglycosides), drug dosing review",
        "CRRT: filter pressures, anticoagulation (citrate → ionized Ca), temp, fluid removal goals"
      ],
      meds: [
        "Balanced crystalloid bolus 250–500 mL if hypovolemic",
        "Norepinephrine to MAP ≥65 if shock",
        "Loop diuretic (furosemide) for overload — not to 'treat' AKI",
        "Hyperkalemia/acidosis therapy · Phosphate binders per nephrology",
        "AVOID: NSAIDs, nephrotoxins; adjust antibiotics",
        "VERIFY PER FACILITY PROTOCOL / ORDER"
      ],
      escalate: [
        "!Anuria, K ≥6.5/ECG changes, pH <7.2, pulmonary edema → nephrology STAT",
        "Obstruction on scan/ultrasound → urology",
        "Rising Cr despite perfusion fix; nephrotoxic exposure; rhabdomyolysis"
      ]
    },
    /* ============================ GI / HEME ============================ */
    {
      id: "gi-bleed", name: "GI bleed (upper / lower)", category: "GI/Heme",
      keywords: "hematemesis melena variceal bleeding ppi pantoprazole octreotide egd endoscopy hematochezia transfusion blakemore",
      glance: [
        "Hematemesis/melena/hematochezia + tachycardia/hypotension = resuscitate first",
        "2 large-bore IVs, type & crossmatch, airway protection, call GI/provider",
        "Cirrhosis? Octreotide + ceftriaxone + PPI; restrictive transfusion (Hgb ~7) unless unstable"
      ],
      recognize: [
        "Vomiting blood/coffee-ground emesis, black tarry stools (melena), maroon/bright-red blood per rectum",
        "Shock signs: tachycardia, hypotension, orthostasis, cool skin, AMS",
        "Risk: cirrhosis/varices, ulcer disease, NSAIDs/anticoagulants, ICU stress ulcers, alcohol, malignancy",
        "BUN:Cr ratio ↑ suggests upper source; Hgb may be normal early"
      ],
      actions: [
        "!Call provider/rapid response if unstable; notify GI for urgent endoscopy.",
        "Large-bore IV ×2 (≥18 G) or central; monitor. Keep NPO. Position to protect airway (HOB up / left lateral).",
        "STAT labs: CBC, type & crossmatch (2–4 units), coags/INR, platelets, BMP/BUN, LFTs, lactate, troponin if risk, ABG.",
        "Resuscitate: crystalloid judiciously for instability; blood for Hgb <7 g/dL (target 7–9; threshold ~8 if CAD); for massive/unstable bleeding transfuse by hemodynamics and activate MTP.",
        "Stop/hold anticoagulants, antiplatelets, NSAIDs; reverse per provider if life-threatening (PCC/vit K/etc.). Correct platelets <50 and INR as ordered.",
        "IV PPI (e.g., pantoprazole 80 mg IV bolus then infusion 8 mg/h or 40 mg IV q12h per protocol) for suspected upper source.",
        "Suspected variceal bleed (cirrhosis/ETOH): octreotide 50 mcg IV bolus then 50 mcg/h; ceftriaxone 1 g IV daily (antibiotic prophylaxis); avoid over-transfusion (portal pressure ↑).",
        "Consider erythromycin 250 mg IV 30–120 min before endoscopy (per provider) to clear stomach.",
        "Airway: intubate before endoscopy for massive hematemesis/AMS (per provider/anesthesia).",
        "Endoscopy within 24 h (variceal: within 12 h). Lower GI: colonoscopy/CT angiography/IR as directed.",
        "Refractory variceal bleed: balloon tamponade (Blakemore) – keep scissors at bedside; TIPS/surgery."
      ],
      monitor: [
        "HR, BP, MAP, shock index q5–15 min while unstable; mental status; UOP",
        "Hgb/Hct q4–6h (initial value lags), lactate, coags, platelets, Ca (with transfusion)",
        "Amount/character of emesis, NG output, stool; abdominal distension",
        "Signs of hepatic encephalopathy (AMS, asterixis) — lactulose per provider",
        "Transfusion reaction; K/Ca after massive transfusion"
      ],
      meds: [
        "Pantoprazole 80 mg IV bolus then 8 mg/h (or 40 mg IV q12h)",
        "Octreotide 50 mcg IV bolus → 50 mcg/h (variceal) · Vasopressin alternative",
        "Ceftriaxone 1 g IV q24h (cirrhosis with GI bleed)",
        "pRBC (restrictive threshold), platelets, FFP/PCC/vitamin K as indicated; TXA is NOT routinely recommended",
        "Erythromycin 250 mg IV pre-endoscopy · Lactulose in cirrhosis",
        "VERIFY PER FACILITY PROTOCOL / ORDER"
      ],
      escalate: [
        "!Hemodynamic instability, ongoing hematemesis, Hgb drop ≥2 g/dL, need >2–4 units → MTP / urgent endoscopy / surgery",
        "!Airway concern from active vomiting of blood or AMS",
        "Suspected variceal bleeding → GI/hepatology/ICU; consider balloon tamponade/TIPS"
      ]
    },
    {
      id: "tamponade", name: "Cardiac tamponade", category: "Cardiac",
      keywords: "pericardial effusion pericardiocentesis becks triad pulsus paradoxus muffled heart sounds electrical alternans post cardiac surgery",
      glance: [
        "Hypotension + JVD + muffled heart sounds (Beck's) / pulsus paradoxus = TAMPONADE until proven otherwise",
        "STAT echo + cardiology/CT surgery; preload dependent — support with fluids",
        "Definitive: pericardiocentesis or surgical drainage; avoid positive pressure/intubation if possible"
      ],
      recognize: [
        "Beck's triad: hypotension, JVD, muffled heart sounds (often incomplete)",
        "Tachycardia, dyspnea, pulsus paradoxus (inspiratory SBP drop >10 mmHg), narrow pulse pressure",
        "ECG: low voltage, electrical alternans, sinus tach. Post-cardiac surgery: sudden drop in chest-tube output with hypotension, ↑CVP, equalized pressures",
        "Causes: malignancy, post-cardiac surgery/procedure, trauma, aortic dissection, MI free-wall rupture, uremia, infection, anticoagulation",
        "Echo: effusion with RA/RV diastolic collapse, plethoric IVC"
      ],
      actions: [
        "!Call rapid response/provider, cardiology/cardiac surgery STAT. Request STAT bedside echo.",
        "O₂, monitor, large-bore IV; keep pt in position of comfort (often upright).",
        "Support preload: IV crystalloid bolus 250–500 mL (repeat once if responsive) as a temporizing bridge.",
        "Avoid: diuretics, vasodilators, and (if possible) intubation/positive-pressure ventilation and sedation which drop preload — if unavoidable use ketamine & ready pressors, aim for drainage first.",
        "Vasopressor/inotrope as ordered only as a bridge (norepinephrine, dobutamine).",
        "Prepare for pericardiocentesis (echo-guided): tray, 18G needle/catheter, drainage bag, ECG lead, sterile prep, consent, coags status.",
        "Post-cardiac surgery with chest tubes: milk/strip per protocol and notify surgeon; do not assume tubes are working. Resternotomy kit if arrest.",
        "Hold/reverse anticoagulants per provider.",
        "Traumatic or arrest due to tamponade: emergent thoracotomy/needle pericardiocentesis per ACLS/ATLS."
      ],
      monitor: [
        "BP, HR, CVP, SpO₂, mentation continuously; pulsus paradoxus on arterial line",
        "Drain output (volume, color, rate), chest-tube patency",
        "Post-drainage: BP improvement, recurrence signs, repeat echo",
        "Coags, Hgb; ECG voltage",
        "Reperfusion/hemodynamic changes after drainage; pericardial drain management"
      ],
      meds: [
        "Crystalloid bolus 250–500 mL (temporizing)",
        "Norepinephrine / dobutamine as bridge only",
        "Local anesthetic ± minimal sedation for pericardiocentesis (ketamine)",
        "Protamine / PCC / vit K for anticoagulation reversal if indicated",
        "VERIFY PER FACILITY PROTOCOL / ORDER"
      ],
      escalate: [
        "!Any hypotension with suspected tamponade → emergent drainage (do not wait for CT)",
        "!Cardiac arrest/PEA post-cardiac surgery → follow CALS (emergency resternotomy) per facility",
        "Recurrent or loculated effusion → surgical window"
      ]
    },
    /* ============================ TOX / BEHAVIORAL ============================ */
    {
      id: "alcohol-withdrawal", name: "Alcohol withdrawal / delirium tremens", category: "Tox/Behavioral",
      keywords: "alcohol etoh withdrawal dts ciwa benzodiazepine phenobarbital thiamine agitation delirium tremens hallucinations",
      glance: [
        "Tremor, sweats, tachycardia, anxiety, hallucinations, seizure → CIWA-Ar / treat early",
        "Symptom-triggered benzodiazepines (titrate to calm, RASS 0 to −1); thiamine 100 mg IV",
        "Rule out other causes: hypoglycemia, head injury, infection, hepatic encephalopathy, overdose"
      ],
      recognize: [
        "6–24 h: tremor, anxiety, insomnia, diaphoresis, N/V, HTN, tachycardia",
        "12–48 h: withdrawal seizures (generalized, often single/brief)",
        "48–96 h (DTs): disorientation, agitation, visual/tactile hallucinations, fever, severe autonomic instability, arrhythmia, seizure — mortality if untreated",
        "Risk: prior DTs/seizures, high daily intake, abnormal labs, concurrent illness, age"
      ],
      actions: [
        "Safety: bed low, fall/seizure precautions, call light, calm low-stimulation room. Avoid restraints if possible (pull-out lines, rhabdo risk).",
        "!Notify provider of withdrawal signs; obtain benzodiazepine order set and CIWA-Ar orders.",
        "POC glucose; labs: BMP, Mg, Phos, LFTs, CBC, CK, ETOH level, UDS, ammonia if encephalopathy.",
        "THIAMINE 100 mg IV/IM (or higher per provider) BEFORE or with dextrose; folate 1 mg, multivitamin; replace Mg, K, Phos.",
        "Score CIWA-Ar q1h (or per protocol). Symptom-triggered benzodiazepine: lorazepam 1–4 mg IV (or diazepam 5–20 mg IV) q5–15 min (typical sedation target RASS 0 to −1).",
        "Severe/DTs: front-load benzodiazepines; escalate promptly rather than low repeated doses. Monitor airway & RR with each dose.",
        "Resistant (>~ 3 doses with poor control or large cumulative dose): call provider — phenobarbital (e.g., 130–260 mg IV loading step or weight-based per protocol), adjunct dexmedetomidine (NOT alone), propofol with intubation as needed.",
        "Haloperidol only as adjunct for hallucinations/agitation after adequate benzodiazepine (↑QTc, lowers seizure threshold).",
        "Seizure → treat per Status epilepticus (benzodiazepine). Hydrate; treat fever, correct electrolytes.",
        "Assess for aspiration risk, hepatic encephalopathy, GI bleed, pancreatitis, Wernicke (confusion, ataxia, ophthalmoplegia)."
      ],
      monitor: [
        "CIWA-Ar q1–4h per protocol; RASS; CAM-ICU",
        "HR, BP, temp, RR/SpO₂/ETCO₂ after benzodiazepine/phenobarbital",
        "Glucose, electrolytes (Mg, K, Phos); hydration, UOP",
        "Total benzodiazepine dose given; over-sedation or respiratory depression",
        "Seizure, hallucinations, injury, tube/line removal; CK if prolonged agitation"
      ],
      meds: [
        "Lorazepam 1–4 mg IV q5–15 min PRN symptom-triggered · Diazepam 5–20 mg IV",
        "Phenobarbital 130–260 mg IV bolus steps (or 10 mg/kg IBW load per protocol)",
        "Thiamine 100 mg IV (higher doses if Wernicke) · Folic acid 1 mg · Multivitamin · Mg/K/Phos repletion",
        "Dexmedetomidine adjunct · Haloperidol 2–5 mg IV adjunct (monitor QTc)",
        "Propofol with intubation for refractory agitation",
        "VERIFY PER FACILITY PROTOCOL / ORDER"
      ],
      escalate: [
        "!Seizure, uncontrolled agitation, refractory to benzodiazepines, resp depression",
        "!Fever >39 °C, HR >130, BP unstable, hallucinations with unsafe behavior",
        "New focal deficit or head injury → CT head; suspected Wernicke/hepatic encephalopathy"
      ]
    },
    {
      id: "overdose", name: "Overdose / poisoning basics", category: "Tox/Behavioral",
      keywords: "poisoning opioid naloxone narcan acetaminophen tylenol salicylate tricyclic tca benzodiazepine beta blocker calcium channel blocker toxidrome poison control charcoal",
      glance: [
        "ABCs first. Glucose. Naloxone if slow breathing/pinpoint pupils — titrate to breathing",
        "ECG (QRS, QTc). Get exact drug, dose, time, intent — call POISON CONTROL 1-800-222-1222 (US)",
        "Don't induce vomiting. Charcoal only if airway protected and within ~1 h (provider decision)"
      ],
      recognize: [
        "Opioid: ↓RR, pinpoint pupils, sedation · Sedative-hypnotic: sedation, slurred speech, normal pupils",
        "Sympathomimetic: agitation, mydriasis, HTN, tachycardia, hyperthermia, diaphoresis",
        "Anticholinergic: dry skin, flushed, mydriasis, delirium, urinary retention, tachycardia",
        "Cholinergic/organophosphate: SLUDGE, miosis, bradycardia, bronchorrhea, fasciculations",
        "TCA: QRS >100 ms, tachycardia, seizures · Salicylate: tinnitus, tachypnea, mixed acid–base · Acetaminophen: often asymptomatic early",
        "β-blocker/CCB: bradycardia + hypotension (+ hyperglycemia in CCB)"
      ],
      actions: [
        "Safety first (PPE if chemical/organophosphate exposure; decontaminate skin/clothing).",
        "!Call rapid response/provider; call Poison Control 1-800-222-1222 (US) or facility toxicology.",
        "ABCs: airway/ventilation (BVM, intubate if needed), O₂, IV access, cardiac monitor, SpO₂/ETCO₂.",
        "POC glucose (treat low). Temp. 12-lead ECG (QRS, QTc). Pregnancy test if applicable.",
        "Opioid toxidrome with hypoventilation: naloxone 0.04–0.4 mg IV (titrate q2–3 min to adequate breathing; up to 2 mg total, IM/IN 2–4 mg). Support ventilation first. Repeat/infusion as effect wears off (watch re-sedation).",
        "Labs: BMP, anion gap, osm gap, ABG/VBG, lactate, acetaminophen & salicylate levels (ALL intentional ingestions), ETOH, CK, LFTs, UDS (limited).",
        "Acetaminophen (level at ≥4 h or unknown time/staggered): start N-acetylcysteine per nomogram/provider.",
        "Activated charcoal 1 g/kg (max 50 g) only if airway protected, within 1–2 h, substance adsorbs; NOT for caustics/hydrocarbons/alcohols/metals.",
        "TCA/sodium channel blocker with QRS >100 or arrhythmia: sodium bicarbonate 1–2 mEq/kg IV bolus, repeat to QRS narrowing/pH 7.45–7.55.",
        "β-blocker/CCB: calcium IV, glucagon (β-blocker), high-dose insulin euglycemia, vasopressors — toxicology guidance.",
        "Benzodiazepine overdose: supportive; avoid routine flumazenil (seizure risk with co-ingestants/dependence).",
        "Intent unknown/suicide attempt: 1:1 observer, remove hazards, psychiatric evaluation after medical stabilization."
      ],
      monitor: [
        "Continuous ECG (QRS, QTc), SpO₂/ETCO₂, BP, temp, mentation q15–60 min",
        "Respiratory rate and sedation after naloxone (short half-life: 20–90 min)",
        "Serial acetaminophen/salicylate levels, glucose, K, ABG, creatinine, LFTs",
        "Seizures, hyperthermia, rhabdomyolysis, aspiration",
        "Delayed toxicity (extended-release products, acetaminophen, salicylates, CCB): observe per toxicology"
      ],
      meds: [
        "Naloxone 0.04–0.4 mg IV titrated; IN 4 mg; infusion ~2/3 of effective dose per hour",
        "N-acetylcysteine IV (acetaminophen) per protocol",
        "Sodium bicarbonate 1–2 mEq/kg IV (TCA/salicylate) · Activated charcoal 1 g/kg",
        "Calcium, glucagon, high-dose insulin (β-blocker/CCB) · Atropine (cholinergic) · Hydroxocobalamin (cyanide) · 100% O₂ (CO)",
        "Benzodiazepines for sympathomimetic agitation/seizures · Flumazenil: avoid routine use",
        "Intravenous lipid emulsion / dialysis per toxicology",
        "VERIFY PER FACILITY PROTOCOL / ORDER"
      ],
      escalate: [
        "!RR <10, GCS ≤8, QRS >100, seizures, hemodynamic instability, hyperthermia >39 °C → rapid response / toxicology / ICU",
        "!Suspected salicylate poisoning — avoid intubation without ventilator planning (loss of respiratory compensation); consider dialysis",
        "Co-ingestions or unknown substance — Poison Control + toxicology; psychiatry for intentional"
      ]
    }
  ]
};
