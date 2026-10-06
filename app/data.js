/* =====================================================================
   ICU QuickRef — ALL CLINICAL CONTENT LIVES IN THIS FILE (schema v2).
   REFERENCE AID ONLY. NOT YET CLINICALLY REVIEWED. Must be reviewed by a
   clinical educator, ICU medical director and pharmacist and adapted to
   facility protocol before clinical use. Content change log:
   CHANGELOG-content.md.
   Schema v2 (per condition):
     id, name, category, emergency (boolean), keywords (array of search
     synonyms/abbreviations), warnings (array of HIGH-ALERT callouts),
     glance[3], recognize[], actions[{id,t,s}], monitor[{id,t,s}],
     meds[], escalate[].
     s (scope tag): "RN"    = nurse may do independently / standard nursing protocol
                    "ORDER" = requires provider order or active standing protocol
                    "PROV"  = provider-performed; text starts "Anticipate/assist:"
     A text (t or string) starting with "!" = CALL / ESCALATE step.
   Dose policy: no numeric doses/rates for infusions or high-alert drugs
   (drug/class + "per order/facility protocol"). Bolus reference doses are
   typical adult published doses, given only if ordered / per protocol.
   After editing: bump version/date + meta, and CACHE_VERSION in sw.js.
   ===================================================================== */
window.ICU_DATA = {
  version: "2.0.0",
  date: "2026-10-04",
  reviewStatus: "NOT YET CLINICALLY REVIEWED — draft for educator/medical director review",
  reviewedBy: "",
  facilityNote: "",
  meta: {
    version: "2.0.0",
    date: "2026-10-04",
    status: "NOT YET CLINICALLY REVIEWED — draft for educator/medical director review",
    expires: "2027-04-04",
    schema: 2,
    scope: "Adult ICU patients only. Pregnancy and pediatrics not covered.",
    scopeTags: {
      RN: "Nurse may do independently / standard nursing protocol",
      ORDER: "Requires a provider order or active standing order/protocol",
      PROV: "Provider-performed — nurse anticipates, prepares and assists"
    },
    medNotice: "Medication steps are PREPARATION prompts, not orders and not a MAR. Give only per order/protocol; verify drug, concentration, route, dose, allergies and renal/hepatic function; use a MEASURED weight when possible — dosing weight (actual/ideal/adjusted) is set by the order or pharmacy protocol. HIGH-ALERT drugs: independent double check and smart-pump drug library.",
    disclaimer: "Reference aid only. Facility protocol, provider orders, scope of practice (state Nurse Practice Act) and clinical judgment supersede this content."
  },
  sources: [
    "AHA 2025 Guidelines for CPR & Emergency Cardiovascular Care (Part 9 Adult ALS; Part 11 Post-Cardiac Arrest Care)",
    "Society of Thoracic Surgeons expert consensus on resuscitation after cardiac surgery (CALS approach) — reviewer to confirm edition",
    "Surviving Sepsis Campaign International Guidelines 2026",
    "ARDSNet (ARMA) lung-protective ventilation protocol; ATS 2024 clinical practice guideline update on ARDS; SSC 2026 ventilation statements",
    "2026 AHA/ASA Guideline for the Early Management of Acute Ischemic Stroke; AHA/ASA 2022 Spontaneous ICH Guideline; AHA/ASA 2023 Aneurysmal SAH Guideline; Brain Trauma Foundation severe TBI guidelines (4th ed.)",
    "Neurocritical Care Society 2012 / American Epilepsy Society 2016 status epilepticus guidelines",
    "ACC/AHA 2025 ACS guideline; ACC/AHA 2021 Chest Pain Guideline; SCAI Cardiogenic Shock Classification",
    "AHA/ACC 2026 acute pulmonary embolism guidance (as cited by reviewers) / ESC 2019 Acute PE Guidelines",
    "ADA/EASD/JBDS/AACE/DTS Consensus Report on Hyperglycemic Crises (DKA/HHS) 2024",
    "KDIGO Acute Kidney Injury Guideline; Renal Association UK Hyperkalaemia Guideline 2020",
    "ACG / AASLD guidance on GI bleeding and variceal hemorrhage (Baveno VII); HALT-IT trial (tranexamic acid in GI bleeding); ATLS 10th edition",
    "World Allergy Organization & AAAAI/ACAAI anaphylaxis guidance",
    "SCCM PADIS Guideline 2018 (pain, agitation, delirium, immobility, sleep); ASAM Alcohol Withdrawal Management Guideline 2020",
    "FDA safety communication: andexanet alfa (Andexxa) US commercial sales ended Dec 2025",
    "ISMP high-alert medication list; AACT / Poison Control (US 1-800-222-1222)"
  ],
  categories: ["Cardiac", "Respiratory", "Shock", "Neuro", "Metabolic/Renal", "GI/Heme", "Tox/Behavioral"],
  tools: {
    vitals: {
      title: "Normal adult vitals (approx.)",
      rows: [
        ["HR", "60–100 /min"],
        ["BP", "<120/80 normal; SBP <90, MAP <65, or SBP >40 mmHg below baseline = hypotension"],
        ["MAP", "65–100 mmHg (goal ≥65 in most shock unless ordered otherwise)"],
        [
          "RR",
          "12–20 /min (≥22 abnormal — NEWS2/MEWS trigger; do not rely on qSOFA alone to screen for sepsis)"
        ],
        [
          "SpO₂",
          "≥94% most acutely ill (92–96% acceptable) · 88–92% if hypercapnic COPD / CO₂-retainer risk · 88–95% ARDS · post-arrest 90–98% · target per order"
        ],
        [
          "Temp",
          "36.0–37.5 °C (96.8–99.5 °F); fever ≥38.3 °C (101 °F) in ICU (many protocols alert at ≥38.0); <36.0 °C hypothermia"
        ],
        ["CVP", "2–8 mmHg (trend > absolute)"],
        ["UOP", "≥0.5 mL/kg/h"],
        ["ETCO₂", "35–45 mmHg (ventilated, perfusing patient)"]
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
        ["Glucose", "70–100 fasting; ICU goal ~140–180 mg/dL (insulin typically started at ≥180)"],
        ["Ca (total / ionized)", "8.5–10.5 mg/dL / 1.1–1.3 mmol/L"],
        ["Mg / Phos", "1.7–2.2 / 2.5–4.5 mg/dL"],
        ["Lactate", "<2 mmol/L (>2 abnormal; ≥4 severe)"],
        ["WBC", "4–11 ×10³/µL"],
        ["Hgb", "M 13.5–17.5 / F 12–15.5 g/dL"],
        ["Platelets", "150–400 ×10³/µL"],
        ["INR / aPTT", "0.8–1.2 / 25–35 s"],
        [
          "Troponin",
          "Assay-specific: above lab 99th percentile = myocardial injury; trend per lab pathway (e.g., 0/1 h or 0/2 h hs-cTn)"
        ],
        ["ABG pH", "7.35–7.45"],
        ["PaCO₂ / PaO₂", "35–45 / 80–100 mmHg"],
        ["Anion gap", "Na − (Cl + HCO₃): ~8–12; albumin-corrected AG = AG + 2.5 × (4 − albumin g/dL)"],
        ["P/F ratio", "PaO₂ ÷ FiO₂ — Berlin ARDS (PEEP ≥5): ≤300 mild · ≤200 moderate · ≤100 severe"],
        [
          "Critical values",
          "Examples only — use your lab's list: K <3.0 or >6.0 · Na <120 or >160 · glucose <50 or >500 · pH <7.2 · lactate ≥4 · Hgb <7 · platelets <20"
        ]
      ]
    },
    gcs: {
      title: "Glasgow Coma Scale (3–15)",
      groups: [
        {
          name: "Eye",
          items: [[4, "Spontaneous"], [3, "To sound / voice"], [2, "To pressure (pain)"], [1, "None"]]
        },
        {
          name: "Verbal",
          items: [[5, "Oriented"], [4, "Confused"], [3, "Words (inappropriate)"], [2, "Sounds"], [1, "None"]]
        },
        {
          name: "Motor",
          items: [
            [6, "Obeys commands"],
            [5, "Localizes"],
            [4, "Normal flexion / withdraws"],
            [3, "Abnormal flexion (decorticate)"],
            [2, "Extension (decerebrate)"],
            [1, "None"]
          ]
        }
      ],
      note: "≤8 = severe: reassess airway protection now (gag/cough, secretions, trajectory) — not an automatic intubation order. Intubated: Verbal = 'T' (record e.g. E3 VT M5 = 8T). Sedation/paralysis make GCS unreliable. Always record pupils."
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
      note: "Typical goal: RASS −2 to 0 (light sedation) unless a deeper target is ordered (e.g., raised ICP, refractory seizures, severe dyssynchrony/proning, paralysis). Pair with CAM-ICU for delirium."
    },
    reminders: [
      {
        title: "cABCDE",
        lines: [
          "c — Catastrophic bleeding first (direct pressure / tourniquet / call)",
          "A — Airway: patent? Talking? Needs jaw thrust / adjunct / suction?",
          "B — Breathing: RR, SpO₂, work of breathing, breath sounds, ETCO₂",
          "C — Circulation: pulse, BP, cap refill, rhythm, bleeding, access",
          "D — Disability: GCS/AVPU, pupils, glucose, seizure",
          "E — Exposure: full skin check, temp, lines/drains, wounds"
        ]
      },
      {
        title: "Oxygen targets (default — follow the order)",
        lines: [
          "Most acutely ill adults: SpO₂ ≥94% (92–96% acceptable; avoid hyperoxia)",
          "Hypercapnic COPD / CO₂-retainer risk (obesity hypoventilation, neuromuscular): 88–92%",
          "ARDS: 88–95% (PaO₂ 55–80 mmHg)",
          "Post-cardiac arrest: 90–98%; ACS and stroke: give O₂ only if SpO₂ <90–94% per card"
        ]
      },
      {
        title: "Medication safety before any drug",
        lines: [
          "Order (or active protocol) present? Read back verbal orders.",
          "Allergies · MEASURED weight (dosing weight per order/pharmacy) · pregnancy · renal/hepatic function",
          "Right drug AND concentration (e.g., epinephrine 1 mg/mL IM vs 0.1 mg/mL IV syringe); label every syringe",
          "HIGH-ALERT (insulin, heparin, K⁺, vasopressors, sedatives/paralytics, thrombolytics, hypertonic saline): independent double check + smart-pump drug library; never override limits without an order",
          "Vesicants/pressors peripherally only per policy: large proximal vein, check site at least hourly; extravasation → stop, leave catheter, call, follow protocol",
          "When unsure: STOP and call pharmacy"
        ]
      },
      {
        title: "SBAR for calling the provider",
        lines: [
          "S — Situation: 'I'm calling about [pt, room]. I am concerned because ___.'",
          "B — Background: dx, code status, key history, meds/anticoagulants, allergies",
          "A — Assessment: vitals (trend), exam, labs/ABG/ECG, what changed, what you've done",
          "R — Request/Recommendation: 'I need you to come see the patient now' / specific order / how soon? / what should I monitor?",
          "Read back orders. If no response or you remain worried: escalate via chain of command / rapid response."
        ]
      },
      {
        title: "When to escalate urgently (ward-style triggers — use your facility's; ICU nurses call the provider earlier)",
        lines: [
          "Staff worried about the patient (always a valid reason)",
          "HR <40 or >130 · SBP <90 · RR <8 or >28 · SpO₂ <90% despite O₂",
          "Acute change in LOC (e.g., GCS drop ≥2), new seizure, stroke symptoms",
          "Acute chest pain, suspected airway compromise, uncontrolled bleeding, lactate ≥4",
          "Urine output <0.5 mL/kg/h for 4+ h, sudden new agitation or lethargy"
        ]
      },
      {
        title: "ACLS reversible causes — H's & T's",
        lines: [
          "Hypovolemia · Hypoxia · Hydrogen ion (acidosis) · Hypo-/Hyperkalemia · Hypothermia (also check glucose)",
          "Tension pneumothorax · Tamponade (cardiac) · Toxins · Thrombosis (pulmonary) · Thrombosis (coronary)"
        ]
      },
      {
        title: "Pre-call / handoff preparation",
        lines: [
          "Have ready: vitals trend, MAR (recent meds), last labs, code status, allergies, IV access",
          "Know the pt's weight and baseline (BP, mental status)",
          "Write down time of call and response; document orders read back"
        ]
      },
      {
        title: "PBW (predicted body weight) for vent settings",
        lines: [
          "Male: 50 + 2.3 × (height in inches − 60) kg  =  50 + 0.91 × (height cm − 152.4)",
          "Female: 45.5 + 2.3 × (height in inches − 60) kg  =  45.5 + 0.91 × (height cm − 152.4)",
          "Tidal volume 6 mL/kg PBW in ARDS (range 4–8); 6–8 mL/kg PBW typical for other ventilated pts. Use measured HEIGHT, not actual weight."
        ]
      }
    ]
  },
  conditions: [
    {
      id: "cardiac-arrest",
      name: "Cardiac arrest (ACLS overview)",
      category: "Cardiac",
      emergency: true,
      keywords: [
        "code",
        "code blue",
        "arrest",
        "cpr",
        "vf",
        "vfib",
        "v-fib",
        "ventricular fibrillation",
        "vt",
        "vtach",
        "v-tach",
        "pulseless vt",
        "pvt",
        "pea",
        "asystole",
        "defibrillation",
        "defib",
        "shock",
        "epinephrine",
        "epi",
        "amiodarone",
        "rosc",
        "acls",
        "etco2",
        "capnography",
        "ttm",
        "temperature control",
        "post-arrest"
      ],
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
        { id: "cardiac-arrest-a1", t: "!Call a CODE / activate emergency response. Note TIME. Get crash cart + defibrillator. Start compressions.", s: "RN" },
        { id: "cardiac-arrest-a2", t: "Valid DNR/POLST documented? Do not start (or stop) and notify provider. No valid DNR order = continue CPR; verify code status in parallel.", s: "RN" },
        { id: "cardiac-arrest-a3", t: "High-quality CPR: 100–120/min, depth 2–2.4 in (5–6 cm), full recoil, backboard/CPR mode on bed, rotate compressor every 2 min.", s: "RN" },
        { id: "cardiac-arrest-a4", t: "Pads on/monitor → analyze rhythm (pause ≤10 s). Pads ≥1 in (2.5 cm) from pacemaker/ICD; remove medication patches.", s: "RN" },
        { id: "cardiac-arrest-a5", t: "SHOCKABLE (VF/pVT): shock once at device's labeled biphasic energy (if unknown: max) per competency/policy. Call 'CLEAR', O₂ away → resume CPR immediately for 2 min.", s: "RN" },
        { id: "cardiac-arrest-a6", t: "Ventilate: BVM 100% O₂ 30:2; with advanced airway 1 breath every 6 s + continuous compressions. Already intubated: disconnect vent, bag via ETT with PEEP valve. Avoid over-ventilation.", s: "RN" },
        { id: "cardiac-arrest-a7", t: "IV/IO access: use existing IV/central line, else IO (do not interrupt CPR). Flush every peripheral drug dose.", s: "ORDER" },
        { id: "cardiac-arrest-a8", t: "Epinephrine 1 mg IV/IO (0.1 mg/mL code syringe) q3–5 min on code-leader order; non-shockable: as soon as access; shockable: after initial shocks fail. Read back; log time.", s: "ORDER" },
        { id: "cardiac-arrest-a9", t: "VF/pVT persisting after shocks: amiodarone OR lidocaine (one, not both) on code-leader order per ACLS — see Meds.", s: "ORDER" },
        { id: "cardiac-arrest-a10", t: "Every 2 min: rhythm/pulse check, switch compressors. ETCO₂ goal ≥10, ideally ≥20 mmHg; abrupt sustained rise (>10 mmHg) or pulsatile art line → check pulse. Never stop CPR on ETCO₂ alone.", s: "RN" },
        { id: "cardiac-arrest-a11", t: "Call out/treat reversible causes with team: H's & T's (see Quick tools) — check glucose and K⁺.", s: "RN" },
        { id: "cardiac-arrest-a12", t: "Anticipate/assist: advanced airway (ETT/SGA) without interrupting compressions; confirm with waveform capnography.", s: "PROV" },
        { id: "cardiac-arrest-a13", t: "ROSC (pulse + BP / pulsatile art line / sustained ETCO₂ rise): go to post-arrest care — see Monitor.", s: "RN" }
      ],
      monitor: [
        { id: "cardiac-arrest-m1", t: "Post-ROSC: 12-lead ECG immediately; STEMI/high suspicion → notify provider for cardiology/cath lab STAT", s: "RN" },
        { id: "cardiac-arrest-m2", t: "MAP ≥65 (avoid hypotension) — fluids/vasopressor per order; arterial line", s: "ORDER" },
        { id: "cardiac-arrest-m3", t: "SpO₂ 90–98% (100% O₂ until reliable reading, then wean FiO₂; avoid hyperoxia/hypoxia); PaCO₂ 35–45 per order", s: "ORDER" },
        { id: "cardiac-arrest-m4", t: "Not following commands after ROSC: temperature control (constant target 32–37.5 °C) for ≥36 h per provider/protocol; actively prevent fever (≥72 h per protocol)", s: "ORDER" },
        { id: "cardiac-arrest-m5", t: "Glucose 70–180 mg/dL; K⁺/Mg, ABG, lactate, troponin, CXR per order; seizure watch (EEG per order)", s: "RN" },
        { id: "cardiac-arrest-m6", t: "No early prognostic statements — neuroprognostication is delayed (≥72 h) and multimodal (provider-led)", s: "RN" }
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
    },
    {
      id: "post-cardiac-surgery",
      name: "Post-cardiac-surgery emergencies / arrest (CALS)",
      category: "Cardiac",
      emergency: true,
      keywords: [
        "post cardiac surgery",
        "post-op cardiac",
        "cabg",
        "valve surgery",
        "cals",
        "cardiac surgical arrest",
        "resternotomy",
        "re-sternotomy",
        "reopen chest",
        "epicardial pacing",
        "pacing wires",
        "chest tube bleeding",
        "mediastinal bleeding",
        "tamponade",
        "vasoplegia",
        "open heart"
      ],
      warnings: [
        "CALS (STS expert consensus; facility training required): VF/pVT → up to 3 rapid sequential shocks BEFORE compressions; asystole/severe brady with wires → pace at maximum output BEFORE compressions; emergency resternotomy within ~5 min if no ROSC.",
        "Epinephrine is NOT given routinely in CALS arrest (rebound hypertension/bleeding) — only on senior/surgeon direction per protocol. Do not give the standard ACLS dose reflexively.",
        "Bleeding/tamponade: sudden drop in chest-tube output with hypotension/↑CVP = tamponade until proven otherwise — call surgeon NOW; needle pericardiocentesis usually NOT the treatment."
      ],
      glance: [
        "Arrest after cardiac surgery → CALS: shock ×3 (VF/VT) or pace (asystole/brady) first, then CPR, prepare resternotomy",
        "Bleeding (chest tube output above ordered threshold), tamponade, low output, vasoplegia, arrhythmia — call surgeon early",
        "Know your unit's roles: compressor, airway, defibrillation, drugs, resternotomy kit/ sterile team"
      ],
      recognize: [
        "Bleeding: chest-tube output above ordered call threshold, rising HR, falling BP/Hgb, coagulopathy, hypothermia",
        "Tamponade: falling BP, rising/equalized CVP, falling UOP & cardiac output, sudden ↓ drain output (clot), may be localized (TTE can miss)",
        "Low cardiac output: cool extremities, low SvO₂/CI, lactate ↑, oliguria; vasoplegia: warm, low SVR",
        "Arrhythmias: AF, junctional, heart block (pacing wires), VF/VT; tension PTX; graft occlusion/ischemia"
      ],
      actions: [
        { id: "post-cardiac-surgery-a1", t: "!Arrest: call for help/CALS team + cardiac surgeon; confirm rhythm; stop any infusion bolus causing it (check for pump error).", s: "RN" },
        { id: "post-cardiac-surgery-a2", t: "VF/pVT: up to 3 rapid sequential defibrillations per CALS protocol before compressions; then CPR + antiarrhythmic per protocol/senior.", s: "ORDER" },
        { id: "post-cardiac-surgery-a3", t: "Asystole/extreme bradycardia with epicardial wires: pace at maximum output (asynchronous/DOO per protocol) before CPR; check capture.", s: "ORDER" },
        { id: "post-cardiac-surgery-a4", t: "PEA: start CPR (pause pacing per protocol to exclude underlying VF); think tamponade, bleeding, tension PTX, pump/pacer failure.", s: "RN" },
        { id: "post-cardiac-surgery-a5", t: "Anticipate/assist: emergency resternotomy within ~5 min if no ROSC — open sterile resternotomy kit, internal paddles.", s: "PROV" },
        { id: "post-cardiac-surgery-a6", t: "Epinephrine only on surgeon/senior direction per CALS protocol (not routine).", s: "ORDER" },
        { id: "post-cardiac-surgery-a7", t: "Bleeding: report chest-tube output per ordered threshold; keep tubes patent per unit policy (no routine stripping); warm patient.", s: "RN" },
        { id: "post-cardiac-surgery-a8", t: "Labs per order: Hgb, coags, platelets, fibrinogen, iCa, ABG, lactate, viscoelastic test; blood products/protamine per order.", s: "ORDER" },
        { id: "post-cardiac-surgery-a9", t: "Hypotension: fluids, vasopressor/inotrope per order; check pacing settings, rhythm, and lines.", s: "ORDER" },
        { id: "post-cardiac-surgery-a10", t: "Pacing wires: keep pacing box at bedside, check connections/battery, sensing and capture per protocol; insulate exposed wires.", s: "RN" }
      ],
      monitor: [
        { id: "post-cardiac-surgery-m1", t: "Arterial BP, CVP/PA pressures, HR/rhythm, SpO₂ continuously; CI/SvO₂ if available", s: "RN" },
        { id: "post-cardiac-surgery-m2", t: "Chest-tube output hourly (and character); sudden stop vs heavy output", s: "RN" },
        { id: "post-cardiac-surgery-m3", t: "UOP hourly, temperature (rewarming), peripheral perfusion", s: "RN" },
        { id: "post-cardiac-surgery-m4", t: "Hgb, coags, K/Mg/iCa, lactate, glucose per order", s: "ORDER" },
        { id: "post-cardiac-surgery-m5", t: "Pacemaker settings & capture; neuro status after extubation", s: "RN" }
      ],
      meds: [
        "VERIFY PER FACILITY PROTOCOL / ORDER. No infusion rates shown.",
        "Defibrillation (sequential ×3 for VF/pVT per CALS) · epicardial pacing per protocol",
        "Amiodarone/lidocaine per CALS protocol/senior; epinephrine only on senior direction",
        "Protamine (slow), blood products, PCC/fibrinogen concentrate per order",
        "Vasopressors/inotropes per order and pump library"
      ],
      escalate: [
        "!Any arrest → CALS team + surgeon; resternotomy preparation immediately",
        "!Chest-tube output above threshold, sudden drop in output with hypotension, rising CVP",
        "New arrhythmia, loss of pacing capture, rising lactate/low output"
      ]
    },
    {
      id: "anaphylaxis",
      name: "Anaphylaxis",
      category: "Shock",
      emergency: true,
      keywords: [
        "anaphylaxis",
        "anaphylactic",
        "allergic reaction",
        "allergy",
        "epinephrine",
        "epi",
        "epipen",
        "im epi",
        "angioedema",
        "hives",
        "urticaria",
        "bronchospasm",
        "stridor",
        "contrast reaction",
        "drug reaction",
        "latex",
        "chlorhexidine",
        "sugammadex"
      ],
      warnings: [
        "EPINEPHRINE CONCENTRATION: IM uses the 1 mg/mL (1:1000) vial — 0.3–0.5 mg = 0.3–0.5 mL. NEVER give 1 mg/mL IV push. The 0.1 mg/mL (1:10,000) code syringe is for IV arrest dosing.",
        "IV epinephrine bolus/infusion with a pulse: only on order, on a monitor, pharmacy-prepared/standard concentration (HIGH-ALERT: double check, pump library; check mcg/min vs mcg/kg/min).",
        "Antihistamines/steroids never replace or delay epinephrine."
      ],
      glance: [
        "STOP the trigger (infusion, blood, contrast, drug). Call for help.",
        "EPINEPHRINE IM per anaphylaxis order/protocol — 0.3–0.5 mg of 1 mg/mL (IM ONLY) lateral thigh; repeat q5–15 min",
        "Lay flat/legs up, high-flow O₂, large-bore IV, fluid bolus per order; prepare for airway"
      ],
      recognize: [
        "Rapid onset after exposure (minutes–hours): skin (hives, flushing, itch), swelling lips/tongue/face",
        "Respiratory: wheeze, stridor, hoarse voice, dyspnea, throat tightness, hypoxia; ventilated pt: rising airway pressures",
        "Cardiovascular: hypotension, tachycardia, syncope, shock; GI: vomiting, cramping",
        "Any 2 organ systems after likely allergen — or hypotension alone after known allergen = anaphylaxis. Skin signs may be absent",
        "ICU triggers: neuromuscular blockers, sugammadex, antibiotics (β-lactams), chlorhexidine, latex, contrast, blood products, protamine",
        "Mimic: ACE-inhibitor / hereditary angioedema (swelling without hives, poor response to epinephrine) — tell provider"
      ],
      actions: [
        { id: "anaphylaxis-a1", t: "STOP the suspected trigger: stop infusion, disconnect and replace tubing (do not flush residual drug in); keep bag/tubing for pharmacy/blood bank.", s: "RN" },
        { id: "anaphylaxis-a2", t: "!Call rapid response / code team / ICU provider. Note time of onset.", s: "RN" },
        { id: "anaphylaxis-a3", t: "Epinephrine IM per anaphylaxis standing order (no standing order → get verbal order immediately; do not wait for provider arrival): 0.3–0.5 mg = 0.3–0.5 mL of 1 mg/mL, anterolateral thigh. Don't delay for IV.", s: "ORDER" },
        { id: "anaphylaxis-a4", t: "Supine with legs elevated (vomiting/respiratory distress: position of comfort/side; pregnant: left lateral). Do not stand or sit up abruptly.", s: "RN" },
        { id: "anaphylaxis-a5", t: "High-flow O₂ (non-rebreather 10–15 L/min). Continuous ECG/SpO₂, BP q1–5 min.", s: "RN" },
        { id: "anaphylaxis-a6", t: "Large-bore IV ×2. Rapid crystalloid boluses per order (typical adult 1–2 L; smaller aliquots in HF/ESRD); reassess after each.", s: "ORDER" },
        { id: "anaphylaxis-a7", t: "Repeat IM epinephrine q5–15 min per order/protocol if no/partial improvement.", s: "ORDER" },
        { id: "anaphylaxis-a8", t: "Wheeze: albuterol neb per order (nebulized epinephrine is NOT a substitute for IM).", s: "ORDER" },
        { id: "anaphylaxis-a9", t: "Anticipate/assist: stridor/airway edema → airway expert EARLY; difficult airway cart + cricothyrotomy kit to bedside.", s: "PROV" },
        { id: "anaphylaxis-a10", t: "No improvement after 2 IM doses + fluids: anticipate epinephrine IV infusion per order (HIGH-ALERT, pharmacy concentration, pump library); ICU-level care.", s: "ORDER" },
        { id: "anaphylaxis-a11", t: "Adjuncts only AFTER epinephrine and only if ordered: H1/H2 blocker, corticosteroid (infuse diphenhydramine slowly; sedation can mask airway swelling).", s: "ORDER" },
        { id: "anaphylaxis-a12", t: "Serum tryptase ideally 1–3 h after onset if ordered. Document allergen; update allergy list.", s: "ORDER" }
      ],
      monitor: [
        { id: "anaphylaxis-m1", t: "Continuous ECG/SpO₂, BP q5 min until stable; airway/voice change/swelling progression", s: "RN" },
        { id: "anaphylaxis-m2", t: "Biphasic reaction can recur 1–72 h later (usually within 8 h): observe ≥4–6 h, longer if severe, per order", s: "RN" },
        { id: "anaphylaxis-m3", t: "Epinephrine side effects: tachycardia, tremor, HTN, arrhythmia, ischemia (older/cardiac pts)", s: "RN" },
        { id: "anaphylaxis-m4", t: "β-blocker patients may be refractory/bradycardic — report early", s: "RN" },
        { id: "anaphylaxis-m5", t: "Urine output; lactate if shock (per order)", s: "RN" }
      ],
      meds: [
        "VERIFY PER FACILITY PROTOCOL / ORDER. Preparation prompts — not orders.",
        "Epinephrine IM: 1 mg/mL (1:1000) vial, typical adult 0.3–0.5 mg (= 0.3–0.5 mL; 0.01 mg/kg, max 0.5 mg) anterolateral thigh, q5–15 min, per order/protocol. IM ONLY — confirm concentration on vial",
        "Epinephrine IV infusion (refractory): dose, concentration, units and line per order/pump library — HIGH-ALERT",
        "Crystalloid boluses per order (typical adult 1–2 L; smaller aliquots in HF/ESRD)",
        "Albuterol 2.5–5 mg neb for bronchospasm, if ordered",
        "Glucagon (β-blocked, refractory) per order: give slowly, anticipate vomiting — protect airway; any infusion per order/pharmacy",
        "Norepinephrine / vasopressin for refractory hypotension — per order/protocol (HIGH-ALERT)",
        "H1/H2 blockers, corticosteroid: optional, after epinephrine, dose/rate per order (famotidine: renal adjustment)"
      ],
      escalate: [
        "!Stridor, hoarseness, tongue/uvula swelling, or voice change → call airway expert now; prepare difficult airway/cricothyrotomy kit",
        "!No response after 2 IM epinephrine doses + fluids → IV epinephrine infusion per order; prepare airway/pressors; call intensivist",
        "Cardiac arrest: ACLS (epinephrine 1 mg IV/IO as 0.1 mg/mL syringe per code leader)",
        "Suspected transfusion reaction: see 'Acute transfusion reaction' card (STOP, keep line open with saline via new tubing, ID check, blood bank)"
      ]
    },
    {
      id: "airway-emergency",
      name: "Airway emergencies: trach/ETT displacement or obstruction, failed airway",
      category: "Respiratory",
      emergency: true,
      keywords: [
        "airway emergency",
        "trach",
        "tracheostomy",
        "trach dislodged",
        "decannulation",
        "trach obstruction",
        "blocked trach",
        "ett",
        "ett displacement",
        "unplanned extubation",
        "self extubation",
        "tube out",
        "difficult airway",
        "failed airway",
        "cico",
        "cannot intubate cannot oxygenate",
        "cric",
        "cricothyrotomy",
        "laryngectomy",
        "mucus plug"
      ],
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
        { id: "airway-emergency-a1", t: "!Call for help: rapid response/airway team (anesthesia/ENT/RT) — state 'airway emergency'. Bring airway cart, capnography, suction.", s: "RN" },
        { id: "airway-emergency-a2", t: "Apply high-flow O₂ to face AND trach/stoma (laryngectomy: stoma only). Check ETCO₂ waveform.", s: "RN" },
        { id: "airway-emergency-a3", t: "Trach obstruction: remove inner cannula (clean/replace), pass suction catheter; if it won't pass, deflate cuff.", s: "RN" },
        { id: "airway-emergency-a4", t: "Trach still not patent and patient deteriorating: remove trach per policy (mature tract) and oxygenate via face/stoma; small ETT/new trach via stoma by trained provider.", s: "RN" },
        { id: "airway-emergency-a5", t: "Not breathing: BVM via mouth/nose (cover stoma) or via stoma with pediatric mask/LMA per trained staff; start CPR if pulseless.", s: "RN" },
        { id: "airway-emergency-a6", t: "ETT displaced/obstructed: check depth marking & cuff; pass suction catheter; if no ETCO₂ or can't ventilate → remove ETT per provider/RT and BVM with OPA (2-person).", s: "RN" },
        { id: "airway-emergency-a7", t: "Unplanned extubation: assess breathing; O₂/BVM as needed; do NOT reinsert; prepare for reintubation or NIV per provider.", s: "RN" },
        { id: "airway-emergency-a8", t: "Anticipate/assist: reintubation with video laryngoscopy, bougie, supraglottic airway; fiberoptic trach reinsertion.", s: "PROV" },
        { id: "airway-emergency-a9", t: "Anticipate/assist: CICO → front-of-neck access (scalpel-bougie-tube cricothyrotomy) by trained provider.", s: "PROV" },
        { id: "airway-emergency-a10", t: "After airway secured: confirm with waveform capnography, CXR per order; secure tube; sedation/analgesia per order; debrief/report.", s: "RN" }
      ],
      monitor: [
        { id: "airway-emergency-m1", t: "Continuous SpO₂, waveform ETCO₂, HR/rhythm (bradycardia = hypoxia)", s: "RN" },
        { id: "airway-emergency-m2", t: "ETT depth at lips/teeth, cuff pressure, trach ties (one finger), stoma bleeding", s: "RN" },
        { id: "airway-emergency-m3", t: "Bedside emergency equipment each shift: spare trach (same size + one smaller), obturator, suction, BVM, airway cart", s: "RN" },
        { id: "airway-emergency-m4", t: "Sedation/delirium (RASS, CAM-ICU) and restraint need per policy", s: "RN" },
        { id: "airway-emergency-m5", t: "Secretions: humidification, suction frequency, plugging signs", s: "RN" }
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
    },
    {
      id: "tension-pneumothorax",
      name: "Tension pneumothorax",
      category: "Respiratory",
      emergency: true,
      keywords: [
        "tension pneumothorax",
        "pneumothorax",
        "ptx",
        "tpx",
        "collapsed lung",
        "needle decompression",
        "finger thoracostomy",
        "chest tube",
        "barotrauma",
        "absent breath sounds",
        "high peak pressure",
        "subcutaneous emphysema"
      ],
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
        { id: "tension-pneumothorax-a1", t: "!Call provider / rapid response STAT. State: 'suspected tension pneumothorax'.", s: "RN" },
        { id: "tension-pneumothorax-a2", t: "100% O₂. Ventilated: briefly disconnect from vent to allow exhalation; bag gently at low rate while decompression is prepared; check DOPE (see Vent alarms).", s: "RN" },
        { id: "tension-pneumothorax-a3", t: "Prepare: large-bore 14 G catheter ≥8 cm (3.25 in) (may be too short in obesity), finger-thoracostomy/chest tube tray, chlorhexidine, sterile gloves, drainage system.", s: "RN" },
        { id: "tension-pneumothorax-a4", t: "Anticipate/assist: needle decompression — affected side, 5th ICS anterior-to-mid axillary line (alt 2nd ICS midclavicular), over top of rib. Air rush may be absent; judge by response.", s: "PROV" },
        { id: "tension-pneumothorax-a5", t: "Anticipate/assist: needle fails or peri-arrest → finger (simple) thoracostomy, then chest tube (needle decompression alone is temporary).", s: "PROV" },
        { id: "tension-pneumothorax-a6", t: "Connect chest tube to water seal/suction per order; system upright and below chest; secure all connections.", s: "ORDER" },
        { id: "tension-pneumothorax-a7", t: "Reassess immediately: breath sounds, SpO₂, BP, HR, airway pressures.", s: "RN" },
        { id: "tension-pneumothorax-a8", t: "!No improvement: tell provider now — repeat/alternate site per provider; consider hemothorax, tamponade, other causes.", s: "RN" },
        { id: "tension-pneumothorax-a9", t: "Unstable: no imaging first. Stable/after decompression: portable CXR or ultrasound per provider.", s: "ORDER" }
      ],
      monitor: [
        { id: "tension-pneumothorax-m1", t: "Continuous SpO₂, ECG, BP; re-evaluate q5–15 min initially", s: "RN" },
        { id: "tension-pneumothorax-m2", t: "Chest tube: air leak (bubbling), output amount/color, tidaling; system upright, below chest; never clamp with air leak", s: "RN" },
        { id: "tension-pneumothorax-m3", t: "Tube disconnected/dislodged: reconnect or cover per policy, call provider, reassess for recurrent tension", s: "RN" },
        { id: "tension-pneumothorax-m4", t: "Recurrent tension if catheter kinks/clots; subcutaneous emphysema spread", s: "RN" },
        { id: "tension-pneumothorax-m5", t: "Ventilated pt: peak/plateau pressures, delivered VT, new leak; PEEP/pressure changes only by provider/RT", s: "RN" },
        { id: "tension-pneumothorax-m6", t: "CXR per order; watch for re-expansion pulmonary edema", s: "ORDER" }
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
    },
    {
      id: "vent-alarms",
      name: "Ventilator alarms troubleshooting",
      category: "Respiratory",
      emergency: true,
      keywords: [
        "vent alarm",
        "ventilator alarm",
        "high pressure",
        "high peak",
        "low pressure",
        "low volume",
        "low tidal volume",
        "leak",
        "cuff leak",
        "dope",
        "dopes",
        "disconnect",
        "apnea alarm",
        "auto-peep",
        "breath stacking",
        "dyssynchrony",
        "fighting vent",
        "peak",
        "plateau",
        "desat",
        "mucus plug"
      ],
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
        { id: "vent-alarms-a1", t: "Look at the PATIENT first: color, chest rise, SpO₂, ETCO₂ waveform, BP, ETT depth.", s: "RN" },
        { id: "vent-alarms-a2", t: "!Unstable/desaturating/unsure: disconnect from vent, bag 100% O₂ via BVM (PEEP valve if PEEP-dependent), call RT + provider.", s: "RN" },
        { id: "vent-alarms-a3", t: "D — Displacement: ETT depth vs documented, breath sounds both lungs & stomach, ETCO₂ waveform. Not in trachea → BVM/mask and call airway help (see Airway emergency).", s: "RN" },
        { id: "vent-alarms-a4", t: "O — Obstruction: suction (closed suction first); check kinks/bite (bite block), mucus plug. Catheter won't pass = blocked tube → bag, call airway help, prepare to replace ETT.", s: "RN" },
        { id: "vent-alarms-a5", t: "!P — Pneumothorax: unilateral breath sounds, hypotension, SpO₂ drop, ↑ airway pressures → call provider STAT (see Tension pneumothorax).", s: "RN" },
        { id: "vent-alarms-a6", t: "E — Equipment: water, disconnects, kinks, clogged HME/filter, O₂ supply. Vent failure → manual ventilation and RT to swap vent.", s: "RN" },
        { id: "vent-alarms-a7", t: "S — Stacked breaths/auto-PEEP: expiratory flow not back to zero, hypotension → briefly disconnect to let chest exhale; tell RT/provider (↓RR, ↑expiratory time, treat bronchospasm).", s: "RN" },
        { id: "vent-alarms-a8", t: "HIGH PRESSURE: with RT check peak vs plateau (passive pt, 0.5–2 s hold). Peak↑ plateau normal → resistance. Both ↑ → compliance (PTX, mainstem, edema, abdomen, ARDS, atelectasis) or auto-PEEP.", s: "RN" },
        { id: "vent-alarms-a9", t: "LOW VOLUME / LEAK: connections; cuff pressure by manometer (20–30 cmH₂O) — won't hold → call RT/provider (tube may need exchange); leak at mouth; chest tube bubbling; ETT may be partly out.", s: "RN" },
        { id: "vent-alarms-a10", t: "Dyssynchrony: assess pain/anxiety/air hunger; RT adjusts trigger/flow/rate per order; analgesia first, then sedation per order.", s: "ORDER" },
        { id: "vent-alarms-a11", t: "Apnea alarm: confirm backup ventilation active, check sedation level/neuro status; call provider.", s: "RN" },
        { id: "vent-alarms-a12", t: "Document alarms & actions. High-PEEP pts: avoid prolonged disconnects; clamp ETT for circuit change per RT.", s: "RN" }
      ],
      monitor: [
        { id: "vent-alarms-m1", t: "SpO₂, ETCO₂ waveform and value, HR/BP after any intervention", s: "RN" },
        { id: "vent-alarms-m2", t: "Peak, plateau, driving pressure (Pplat − total PEEP), VT/MV, RR, PEEP (set vs total), I:E, FiO₂ — with RT", s: "RN" },
        { id: "vent-alarms-m3", t: "Breath sounds, secretions amount/color, cuff pressure", s: "RN" },
        { id: "vent-alarms-m4", t: "Sedation/analgesia level (RASS/CPOT); trigger sensitivity", s: "RN" },
        { id: "vent-alarms-m5", t: "ABG if persistent change", s: "ORDER" }
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
    },
    {
      id: "status-epilepticus",
      name: "Status epilepticus / seizure",
      category: "Neuro",
      emergency: true,
      keywords: [
        "seizure",
        "sz",
        "seizing",
        "status",
        "status epilepticus",
        "se",
        "convulsion",
        "fit",
        "ncse",
        "nonconvulsive",
        "lorazepam",
        "ativan",
        "midazolam",
        "versed",
        "diazepam",
        "levetiracetam",
        "keppra",
        "fosphenytoin",
        "phenytoin",
        "dilantin",
        "valproate",
        "eclampsia"
      ],
      warnings: [
        "Second-line drug goes in as soon as benzodiazepine fails (~5 min after a full dose) — do NOT wait until 20 min.",
        "Midazolam comes as 1 mg/mL and 5 mg/mL — check vial strength. Fosphenytoin is dosed in mg PE (phenytoin equivalents) — do not confuse with phenytoin.",
        "Paralytic/deep sedation masks seizures — intubated pt may be in nonconvulsive status: continuous EEG."
      ],
      glance: [
        "Seizure ≥5 min (or repeated without recovery) = emergency → call for help, time it",
        "Protect airway, O₂, CHECK GLUCOSE, IV access",
        "Benzodiazepine per order at 5 min (IV lorazepam or IM midazolam) → second-line IMMEDIATELY if still seizing"
      ],
      recognize: [
        "Continuous seizure activity ≥5 min, or ≥2 seizures without return to baseline",
        "Subtle/non-convulsive status: unexplained coma, twitching eyes/face, fluctuating consciousness, unexplained pupil/HR/BP swings (needs EEG)",
        "Triggers: missed AEDs, alcohol/benzodiazepine withdrawal, hypoglycemia, hyponatremia, hypoxia, infection, stroke/ICH, toxins, TBI",
        "Pregnant or ≤6 wk postpartum + seizure = eclampsia until proven otherwise"
      ],
      actions: [
        { id: "status-epilepticus-a1", t: "Note seizure START TIME. Call for help / rapid response. Remove hazards, side-lying if possible, pad rails. Nothing in mouth.", s: "RN" },
        { id: "status-epilepticus-a2", t: "ABCs: suction, jaw thrust, O₂ (NRB/BVM) as needed; SpO₂ & ECG monitor. Airway equipment/BVM at bedside.", s: "RN" },
        { id: "status-epilepticus-a3", t: "POINT-OF-CARE GLUCOSE. Hypoglycemic (or unknown & seizing): dextrose per hypoglycemia protocol/order — give thiamine with or right after if at risk; never delay dextrose.", s: "RN" },
        { id: "status-epilepticus-a4", t: "IV/IO access; labs per order (BMP, Mg, Ca, CBC, tox, AED levels, ABG). Check what benzodiazepine was already given (pre-arrival/earlier).", s: "ORDER" },
        { id: "status-epilepticus-a5", t: "!At 5 min — FIRST-LINE benzodiazepine per seizure order set (IV lorazepam; IM midazolam if no IV; or IV diazepam). No order? Ask for a verbal order at the 5-min call.", s: "ORDER" },
        { id: "status-epilepticus-a6", t: "Prepare second-line drug while the benzodiazepine is given; anticipate respiratory depression.", s: "RN" },
        { id: "status-epilepticus-a7", t: "!Still seizing ~5 min after full-dose benzodiazepine (or recurs) → request second-line NOW (levetiracetam, fosphenytoin or valproate per order). Goal: infusing by ~20 min from onset.", s: "ORDER" },
        { id: "status-epilepticus-a8", t: "During fosphenytoin/phenytoin: continuous ECG & BP (hypotension, bradycardia/arrhythmia); phenytoin via large vein (extravasation/'purple glove').", s: "RN" },
        { id: "status-epilepticus-a9", t: "Eclampsia: magnesium sulfate per OB protocol/order (HIGH-ALERT; reflexes, RR, UOP); left-lateral; call OB + rapid response.", s: "ORDER" },
        { id: "status-epilepticus-a10", t: "!Anticipate/assist: refractory (benzo + one second-line failed) → call ICU/neurology now: intubation + continuous anesthetic infusion with continuous EEG.", s: "PROV" },
        { id: "status-epilepticus-a11", t: "Head CT once stabilized if new/unexplained; LP/EEG per provider.", s: "ORDER" }
      ],
      monitor: [
        { id: "status-epilepticus-m1", t: "Airway, SpO₂/ETCO₂, BP, ECG during and after meds; respiratory depression after benzodiazepines", s: "RN" },
        { id: "status-epilepticus-m2", t: "Neuro checks/GCS; post-ictal state should improve over minutes–hour — not waking up = suspect NCSE, tell provider", s: "RN" },
        { id: "status-epilepticus-m3", t: "Glucose, Na, Ca, Mg; temperature (hyperthermia, rhabdo → CK, urine color) per order", s: "ORDER" },
        { id: "status-epilepticus-m4", t: "Seizure precautions; document duration, type, laterality, eye deviation, post-ictal findings", s: "RN" },
        { id: "status-epilepticus-m5", t: "Continuous EEG if not waking up, intubated/paralyzed, or on anesthetic infusion", s: "ORDER" }
      ],
      meds: [
        "VERIFY PER FACILITY PROTOCOL / ORDER (AES 2016 / NCS). Typical adult published doses — give only if ordered/per protocol.",
        "Lorazepam IV 0.1 mg/kg (max 4 mg/dose), may repeat once; give at labeled rate (refrigerated stock)",
        "Midazolam IM 10 mg (adult >40 kg) — check vial strength (1 vs 5 mg/mL); single dose",
        "Diazepam IV 0.15–0.2 mg/kg (max 10 mg/dose), may repeat once (accumulates in elderly/hepatic impairment)",
        "Second-line (pick one, weight-based load per order/pharmacy): levetiracetam · fosphenytoin (mg PE) · valproate (avoid in liver disease, pregnancy, thrombocytopenia, suspected metabolic/mitochondrial disease)",
        "Thiamine IV if alcohol/malnutrition · dextrose for hypoglycemia (see Hypoglycemia card)",
        "Refractory: midazolam/propofol/ketamine infusions, pentobarbital — per order/ICU protocol (HIGH-ALERT; pump library)",
        "Pyridoxine in INH toxicity; magnesium for eclampsia — per order"
      ],
      escalate: [
        "!Seizure >5 min, repeated seizures, no return to baseline, hypoxia, or aspiration",
        "!Benzodiazepine failed → second-line now; benzo + one second-line failed (refractory) → ICU/neurology, continuous EEG, anesthetic infusion",
        "New focal deficit, head trauma, fever/neck stiffness, pregnancy/postpartum, anticoagulated pt → provider now"
      ]
    },
    {
      id: "unstable-tachy",
      name: "Unstable tachycardia (with a pulse)",
      category: "Cardiac",
      emergency: true,
      keywords: [
        "tachycardia",
        "tachy",
        "svt",
        "psvt",
        "vt",
        "vtach",
        "v-tach",
        "ventricular tachycardia",
        "wct",
        "wide complex",
        "narrow complex",
        "torsades",
        "polymorphic vt",
        "cardioversion",
        "synchronized",
        "sync",
        "adenosine",
        "adenocard",
        "procainamide",
        "amiodarone",
        "flutter"
      ],
      warnings: [
        "Re-select SYNC before EVERY synchronized shock — most devices default back to unsynchronized after a shock. Confirm sync markers on R waves.",
        "Wide QRS or unsure → NO diltiazem or verapamil (harm). Adenosine only for REGULAR monomorphic rhythms — never irregular or polymorphic.",
        "Wide + irregular with a pulse (suspected pre-excited AF) → SYNCHRONIZED cardioversion; no AV-nodal blockers or amiodarone. Pulseless or polymorphic VT → UNSYNCHRONIZED defibrillation."
      ],
      glance: [
        "Pulse + unstable (hypotension, AMS, shock, ischemic pain, acute HF) and rhythm is the cause → SYNCHRONIZED cardioversion",
        "No pulse = cardiac arrest → CPR/defibrillate (unsynchronized). Polymorphic VT/torsades sustained = defibrillate",
        "Stable: 12-lead, vagal maneuver/adenosine per order for regular narrow; expert help for wide"
      ],
      recognize: [
        "HR usually ≥150 when the rhythm causes instability; HR <150 is rarely the cause — sinus tach with fever/pain/bleeding = treat the cause, do not cardiovert",
        "Narrow QRS (<0.12 s) vs wide QRS; regular vs irregular",
        "Instability: SBP <90, AMS, chest pain, acute HF/pulmonary edema, shock signs",
        "Wide-complex tachycardia: treat as VT until proven otherwise"
      ],
      actions: [
        { id: "unstable-tachy-a1", t: "Confirm pulse. Pulse absent → CODE. Support ABCs, O₂ if hypoxic, IV access per protocol, monitor/12-lead, pads on.", s: "RN" },
        { id: "unstable-tachy-a2", t: "!Call rapid response / provider (expert consult).", s: "RN" },
        { id: "unstable-tachy-a3", t: "Conscious & unstable: provider-directed sedation/analgesia (do not delay shock if crashing). Airway equipment/suction at bedside.", s: "ORDER" },
        { id: "unstable-tachy-a4", t: "Anticipate/assist: SYNCHRONIZED cardioversion — sync markers on R waves before every shock; 'CLEAR'. AF/flutter: ≥200 J biphasic (or device max); narrow/wide regular: per device/protocol.", s: "PROV" },
        { id: "unstable-tachy-a5", t: "Shock fails: tell provider — increase energy per provider/device, check pad position/contact and SYNC. Sync won't fire / polymorphic → unsynchronized per provider.", s: "RN" },
        { id: "unstable-tachy-a6", t: "!Sustained polymorphic VT/torsades or pulse lost → defibrillate NOW (unsynchronized, high energy) per ACLS/competency.", s: "RN" },
        { id: "unstable-tachy-a7", t: "Torsades with long QT: magnesium IV per order (after defibrillation if unstable); correct K, stop QT-prolonging drugs; pacing/isoproterenol per expert.", s: "ORDER" },
        { id: "unstable-tachy-a8", t: "STABLE regular narrow (SVT): modified Valsalva if awake/cooperative (no carotid massage) per protocol/order.", s: "RN" },
        { id: "unstable-tachy-a9", t: "Then adenosine per order: 6 mg rapid IV push + immediate 20 mL flush (proximal vein/stopcock), record rhythm strip; 12 mg if no conversion (may repeat once).", s: "ORDER" },
        { id: "unstable-tachy-a10", t: "STABLE wide regular: 12-lead to provider; amiodarone or procainamide per expert/order (not both); continuous BP/ECG.", s: "ORDER" },
        { id: "unstable-tachy-a11", t: "Correct K and Mg per protocol; treat cause (ischemia, drugs, hypoxia, acidosis).", s: "ORDER" }
      ],
      monitor: [
        { id: "unstable-tachy-m1", t: "Continuous ECG; repeat 12-lead after conversion; BP/HR q5 min", s: "RN" },
        { id: "unstable-tachy-m2", t: "Airway/sedation after cardioversion (respiratory depression)", s: "RN" },
        { id: "unstable-tachy-m3", t: "Recurrence; skin burns at pad site", s: "RN" },
        { id: "unstable-tachy-m4", t: "QTc, K, Mg; troponin per order", s: "ORDER" },
        { id: "unstable-tachy-m5", t: "Adenosine: brief asystole/chest tightness expected — warn the pt", s: "RN" },
        { id: "unstable-tachy-m6", t: "Procainamide: stop and call for hypotension, QRS widening >50%, arrhythmia termination, or ordered max reached", s: "RN" }
      ],
      meds: [
        "VERIFY PER FACILITY PROTOCOL / ORDER (AHA 2025 ALS). Typical adult published bolus doses — give only if ordered.",
        "Adenosine 6 mg rapid IV push, then 12 mg (may repeat 12 mg once). Central line, heart transplant, dipyridamole or carbamazepine: reduced dose per pharmacy. Avoid in asthma/active bronchospasm, 2nd/3rd-degree block or sick sinus without pacer; theophylline/caffeine antagonize",
        "Amiodarone IV per order (bolus then infusion per pharmacy; BP, QTc)",
        "Procainamide per expert/order only — not with long QT; reduce in renal impairment; stop criteria above",
        "Magnesium IV for torsades — dose/rate per order",
        "Sedation for cardioversion (e.g., etomidate/midazolam/ketamine/propofol) per provider"
      ],
      escalate: [
        "!Unstable → cardioversion NOW; pulseless → ACLS",
        "!Pre-excitation (WPW) or unclear wide irregular → no AV-nodal blockers, no amiodarone; synchronized cardioversion if unstable",
        "Recurrent VT/VF or incessant tachycardia → cardiology / electrophysiology"
      ]
    },
    {
      id: "unstable-brady",
      name: "Symptomatic bradycardia",
      category: "Cardiac",
      emergency: true,
      keywords: [
        "bradycardia",
        "brady",
        "slow heart rate",
        "heart block",
        "chb",
        "complete heart block",
        "third degree",
        "3rd degree",
        "mobitz",
        "av block",
        "atropine",
        "pacing",
        "tcp",
        "transcutaneous pacing",
        "transvenous",
        "dopamine",
        "brash",
        "junctional"
      ],
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
        { id: "unstable-brady-a1", t: "Assess pulse/perfusion; pulseless → CODE. Monitor, 12-lead, O₂ only if SpO₂ <90%, IV access, pacing pads ON.", s: "RN" },
        { id: "unstable-brady-a2", t: "!Call provider/rapid response if unstable.", s: "RN" },
        { id: "unstable-brady-a3", t: "Atropine 1 mg IV push per ACLS order/protocol, repeat q3–5 min to max 3 mg.", s: "ORDER" },
        { id: "unstable-brady-a4", t: "Do not delay pacing for atropine in high-grade block (Mobitz II, 3rd degree) or transplanted/denervated heart — tell provider.", s: "RN" },
        { id: "unstable-brady-a5", t: "Transcutaneous pacing per ACLS protocol if RN-competent (otherwise provider): rate 60–80, increase mA to electrical capture, then add safety margin per device/protocol.", s: "ORDER" },
        { id: "unstable-brady-a6", t: "Confirm MECHANICAL capture by femoral pulse, art line or pleth (not carotid — muscle jerks mimic pulse). Analgesia/sedation per order.", s: "RN" },
        { id: "unstable-brady-a7", t: "Chronotropic infusion alternative per order (DOPamine or epinephrine) — HIGH-ALERT, pump library.", s: "ORDER" },
        { id: "unstable-brady-a8", t: "Identify/stop causes per provider: hold AV-nodal agents; hyperK → calcium; β-blocker/CCB toxicity → antidotes per toxicology/Poison Control (see Overdose); treat hypothermia/hypoxia.", s: "ORDER" },
        { id: "unstable-brady-a9", t: "Anticipate/assist: transvenous pacing (central access, cardiology/EP).", s: "PROV" }
      ],
      monitor: [
        { id: "unstable-brady-m1", t: "Continuous ECG; mechanical capture confirmed continuously with pacing (femoral pulse, SpO₂ pleth, art line)", s: "RN" },
        { id: "unstable-brady-m2", t: "BP, perfusion, mentation; HR response to atropine/pacing", s: "RN" },
        { id: "unstable-brady-m3", t: "K, Mg, troponin, TSH, digoxin level if on it; med reconciliation", s: "ORDER" },
        { id: "unstable-brady-m4", t: "Pad site skin, discomfort during pacing (analgesia per order)", s: "RN" },
        { id: "unstable-brady-m5", t: "Pacing thresholds, loss of capture", s: "RN" }
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
    },
    {
      id: "hyperkalemia",
      name: "Hyperkalemia",
      category: "Metabolic/Renal",
      emergency: true,
      keywords: [
        "hyperkalemia",
        "hyperk",
        "high potassium",
        "high k",
        "k",
        "potassium",
        "calcium gluconate",
        "calcium chloride",
        "insulin dextrose",
        "albuterol",
        "peaked t waves",
        "sine wave",
        "dialysis",
        "hd",
        "crrt",
        "kayexalate",
        "sps",
        "lokelma",
        "szc",
        "patiromer"
      ],
      warnings: [
        "Insulin for hyperK is HIGH-ALERT and causes delayed hypoglycemia: give WITH dextrose per order set (reduced insulin and/or extra dextrose in renal failure, low baseline glucose, low weight). Glucose before and hourly for ≥4–6 h.",
        "Calcium chloride ≠ calcium gluconate gram-for-gram (1 g chloride ≈ 3 g gluconate). Chloride only via central/secure large vein (vesicant). Separate line or flush between calcium and bicarbonate/phosphate (precipitates). Caution if on digoxin — provider.",
        "Avoid sodium polystyrene (SPS) with ileus, bowel obstruction or after bowel surgery (intestinal necrosis). Binders are not rapid therapy."
      ],
      glance: [
        "ECG changes (peaked T, wide QRS, loss of P) or K ≥6.5 = EMERGENCY",
        "1) Calcium IV (protect heart) · 2) Shift K in (insulin + dextrose, albuterol) · 3) Remove K (diuretic, binder, dialysis) — all per order",
        "STOP K⁺ sources now; recheck K in 1–2 h; glucose checks after insulin"
      ],
      recognize: [
        "K >5.5 mmol/L (mild 5.5–5.9 · moderate 6.0–6.4 · severe ≥6.5); rapid rise, rhabdo/tumor lysis, or ECG change at any K = urgent",
        "ECG: peaked T waves → PR prolongation, P loss → wide QRS → sine wave → VF/asystole",
        "Muscle weakness, paralysis, paresthesias, bradycardia (BRASH), palpitations; often few symptoms",
        "Causes: AKI/CKD, K-sparing diuretics, ACE-i/ARB, rhabdo, tissue breakdown, acidosis, transfusion, DKA, succinylcholine, digoxin, hemolyzed sample (pseudohyperK)"
      ],
      actions: [
        { id: "hyperkalemia-a1", t: "Cardiac monitor; 12-lead ECG. Repeat K (non-hemolyzed) per order but do NOT delay treatment if ECG changes.", s: "RN" },
        { id: "hyperkalemia-a2", t: "!Call provider/rapid response for K ≥6.5 or any ECG change.", s: "RN" },
        { id: "hyperkalemia-a3", t: "Hold K⁺ supplements, K⁺-containing IV fluids/tube feeds now; ask provider about K-raising meds (K-sparing diuretics, ACE-i/ARB, NSAIDs, TMP-SMX, heparin).", s: "RN" },
        { id: "hyperkalemia-a4", t: "STABILIZE HEART: calcium IV per order (gluconate preferred peripherally; chloride central) with continuous ECG; repeat per order if ECG still abnormal (effect lasts 30–60 min).", s: "ORDER" },
        { id: "hyperkalemia-a5", t: "SHIFT K: regular insulin IV WITH dextrose per hyperkalemia order set (if glucose ≥250 provider may omit dextrose). POC glucose before, then hourly ≥4–6 h.", s: "ORDER" },
        { id: "hyperkalemia-a6", t: "High-dose nebulized albuterol per order (far above a routine neb; HR/rhythm; caution ischemia/tachyarrhythmia).", s: "ORDER" },
        { id: "hyperkalemia-a7", t: "Sodium bicarbonate only per order if metabolic acidosis (separate from calcium).", s: "ORDER" },
        { id: "hyperkalemia-a8", t: "REMOVE K per order: loop diuretic if making urine and not volume depleted; binder (e.g., SZC; SPS avoided with ileus/obstruction/post-op bowel).", s: "ORDER" },
        { id: "hyperkalemia-a9", t: "Anticipate/assist: dialysis access/CRRT (nephrology STAT) for refractory/severe hyperK, oliguric AKI, or rhabdomyolysis.", s: "PROV" },
        { id: "hyperkalemia-a10", t: "Recheck K 1–2 h after treatment and q2–4h until stable; on digoxin → tell provider (digoxin immune Fab per order).", s: "ORDER" }
      ],
      monitor: [
        { id: "hyperkalemia-m1", t: "Continuous ECG until K <5.5 and ECG normal", s: "RN" },
        { id: "hyperkalemia-m2", t: "K at 1–2 h then q2–4h; glucose hourly ≥4–6 h after insulin (hypoglycemia can be delayed)", s: "ORDER" },
        { id: "hyperkalemia-m3", t: "Calcium effect is short; ECG changes recur → call for repeat calcium", s: "RN" },
        { id: "hyperkalemia-m4", t: "UOP, creatinine, acid–base", s: "ORDER" },
        { id: "hyperkalemia-m5", t: "Rebound hyperK as insulin/albuterol wear off (2–4 h)", s: "RN" }
      ],
      meds: [
        "VERIFY PER FACILITY HYPERKALEMIA ORDER SET. Typical adult published doses only where shown — give only if ordered.",
        "Calcium gluconate 10%: typical 1–3 g (10–30 mL) IV over 5–10 min, repeat per order · calcium chloride (central/secure vein) — 1 g chloride ≈ 3 g gluconate",
        "Regular insulin IV + dextrose — dose per order set (HIGH-ALERT; reduce/extra dextrose in renal failure); dextrose infusion afterward per order if glucose falling",
        "Albuterol high-dose nebulized per order · sodium bicarbonate per order if acidotic",
        "Loop diuretic per order · binders: sodium zirconium cyclosilicate, patiromer (slow), SPS (avoid with ileus/obstruction)",
        "Dialysis / CRRT"
      ],
      escalate: [
        "!Any ECG change, K ≥6.5, arrhythmia, weakness → provider now, calcium first",
        "!Oliguria/AKI or refractory → nephrology for dialysis",
        "Cardiac arrest with suspected hyperK: calcium IV (± bicarbonate, insulin/dextrose) per code leader — not routine in other arrests"
      ]
    },
    {
      id: "ich-icp",
      name: "Intracranial hemorrhage (ICH / SAH) / increased ICP",
      category: "Neuro",
      emergency: true,
      keywords: [
        "ich",
        "intracranial hemorrhage",
        "intracerebral hemorrhage",
        "brain bleed",
        "hemorrhagic stroke",
        "sah",
        "subarachnoid hemorrhage",
        "aneurysm",
        "icp",
        "increased icp",
        "raised icp",
        "herniation",
        "cushing",
        "blown pupil",
        "mannitol",
        "hypertonic saline",
        "3% saline",
        "23.4%",
        "evd",
        "ventriculostomy",
        "nimodipine",
        "vasospasm",
        "pcc",
        "reversal"
      ],
      warnings: [
        "NIMODIPINE = ORAL/ENTERAL ONLY — NEVER IV (fatal cardiovascular collapse). Use an enteral-only/oral syringe, label 'oral'. Hold/split for hypotension only per prescriber.",
        "23.4% sodium chloride is HIGH-ALERT: pharmacy-dispensed, central line only, via pump over the ordered time, independent double check. 3% NaCl rate/line per policy.",
        "BP target depends on diagnosis — ICH: SBP ~140 (130–150), avoid <130. SAH: per neurosurgery until aneurysm secured, then avoid hypotension. TBI/↑ICP: do NOT lower BP for raised ICP — see Severe TBI card. Always the ordered target.",
        "Factor Xa inhibitor (apixaban/rivaroxaban) reversal = 4F-PCC per pharmacy protocol (prior Xa-specific reversal agent no longer marketed in US). Vitamin K IV slow infusion (anaphylaxis risk); protamine slowly (hypotension/anaphylaxis).",
        "No platelet transfusion for antiplatelet-associated ICH unless neurosurgery orders it for a procedure (PATCH)."
      ],
      glance: [
        "Sudden severe headache, vomiting, ↓LOC, unequal pupils, focal deficit → STAT CT + provider; note last anticoagulant dose",
        "HOB 30°, head midline, airway; avoid hypotension/hypoxia/hypercapnia; isotonic fluids only; BP to the ORDERED, diagnosis-specific target",
        "Herniation signs (blown pupil, Cushing's, posturing) → call neurosurgery/ICU STAT; hyperosmolar therapy ready — give per order"
      ],
      recognize: [
        "ICH: sudden focal deficit, headache, vomiting, ↓GCS, often hypertensive/anticoagulated",
        "SAH: sudden 'worst' headache, neck stiffness, photophobia, seizure, ↓GCS",
        "↑ICP: headache, vomiting, declining LOC, papilledema, dilated sluggish pupil, CN VI palsy",
        "IMMINENT HERNIATION: unilateral/bilateral fixed dilated pupils, posturing, Cushing's triad (hypertension + bradycardia + irregular breathing)",
        "Anticoagulant/antiplatelet use, coagulopathy, trauma (→ Severe TBI card), or hypertensive crisis increase risk"
      ],
      actions: [
        { id: "ich-icp-a1", t: "!Call rapid response / provider STAT (neurosurgery/neurology). Time and document neuro exam (GCS, pupils, motor).", s: "RN" },
        { id: "ich-icp-a2", t: "Anticipate/assist: airway protection if poor airway reflexes/deteriorating (RSI with minimal BP swings). Avoid hypoxia (SpO₂ ≥94% per order).", s: "PROV" },
        { id: "ich-icp-a3", t: "HOB 30°, head midline, neck not rotated; adjust ETT ties (cervical collar changes only per provider/spine precautions). Minimize stimulation; pain/agitation per order.", s: "RN" },
        { id: "ich-icp-a4", t: "STAT non-contrast CT head; labs per order: coags, CBC, platelets, BMP/Na, glucose, type & screen. Record last anticoagulant/antiplatelet dose & time.", s: "ORDER" },
        { id: "ich-icp-a5", t: "REVERSE anticoagulation per order/pharmacy: warfarin → 4F-PCC + slow IV vitamin K; dabigatran → idarucizumab; Xa inhibitor → 4F-PCC; heparin → protamine. No platelets for antiplatelet ICH unless ordered for surgery.", s: "ORDER" },
        { id: "ich-icp-a6", t: "BP per ORDERED target: ICH typically SBP ~140 (130–150), avoid <130 and big swings; SAH per neurosurgery before securing. Antihypertensive infusion per order/pump library.", s: "ORDER" },
        { id: "ich-icp-a7", t: "Normocapnia (PaCO₂ 35–45). Brief hyperventilation (PaCO₂ ~30–35) ONLY as a bridge for impending herniation, on provider order.", s: "ORDER" },
        { id: "ich-icp-a8", t: "Herniation / sustained ICP >22: hyperosmolar therapy per order (23.4% NaCl central only, 3% NaCl, or mannitol) — HIGH-ALERT, no numeric doses here.", s: "ORDER" },
        { id: "ich-icp-a9", t: "Isotonic fluids only (no hypotonic/D5W); Na target per order; normothermia; glucose 140–180; treat clinical seizures (no routine prophylaxis in ICH).", s: "ORDER" },
        { id: "ich-icp-a10", t: "EVD: level at tragus at ordered height; clamp for transport/position change per order, then re-level, re-open, document. Never flush. Hourly output.", s: "RN" },
        { id: "ich-icp-a11", t: "SAH: nimodipine per order — ENTERAL ONLY, NEVER IV (check BP before each dose); avoid hypovolemia; anticipate aneurysm securing.", s: "ORDER" }
      ],
      monitor: [
        { id: "ich-icp-m1", t: "Neuro checks q15 min–q1h per order (GCS, pupils size/reactivity, motor, speech)", s: "RN" },
        { id: "ich-icp-m2", t: "ICP (goal ≤20–22 mmHg), CPP (MAP − ICP; goal 60–70 per order), MAP, ordered SBP target", s: "RN" },
        { id: "ich-icp-m3", t: "Na q4–6h with hypertonic saline — hold parameter per order (commonly Na >155; up to 160 refractory per intensivist); Na rise ≤8–10 mmol/L/24 h unless herniation; serum osm with mannitol (hold if osm >320 or AKI, per order)", s: "ORDER" },
        { id: "ich-icp-m4", t: "ETCO₂/PaCO₂, SpO₂, temp, glucose; hourly UOP (mannitol diuresis; DI with SAH/TBI — hourly UOP and Na; SAH cerebral salt wasting — do not fluid restrict)", s: "RN" },
        { id: "ich-icp-m5", t: "EVD: waveform, drainage color/amount, insertion site, leak; no drainage/air/leak → check clamp/level/tubing, call", s: "RN" },
        { id: "ich-icp-m6", t: "Seizure activity; SAH vasospasm days ~3–14 (new deficit → call)", s: "RN" }
      ],
      meds: [
        "VERIFY PER FACILITY PROTOCOL / ORDER. No numeric doses for hyperosmolar therapy, antihypertensive infusions or reversal agents.",
        "Hyperosmolar: 3% NaCl · 23.4% NaCl (central only, HIGH-ALERT) · mannitol (filter/line per policy; BP, UOP, Na, osm) — per neurosurgery/ICU order",
        "BP: niCARdipine or clevidipine infusion, labetalol — per order/pump library",
        "Reversal per pharmacy protocol: 4F-PCC · vitamin K (slow IV) · idarucizumab · protamine (slow) (Xa inhibitors → 4F-PCC)",
        "Nimodipine (SAH): ORAL/ENTERAL ONLY — typical 60 mg q4h (or split 30 mg q2h for hypotension) per order; CYP3A4 interactions",
        "Levetiracetam for seizures (prophylaxis only per neurosurgery); analgesia/sedation per order; stool softeners — avoid straining"
      ],
      escalate: [
        "!Any GCS drop ≥2, new pupillary change, posturing, Cushing's response → neurosurgery STAT",
        "!ICP persistently >22 or EVD problem (no drainage, blockage, leaking, high output)",
        "Cerebellar hemorrhage, brainstem compression or hydrocephalus → urgent neurosurgery",
        "SBP above/below ordered target on meds · seizure · new focal deficit"
      ]
    },
    {
      id: "severe-tbi",
      name: "Severe traumatic brain injury (TBI)",
      category: "Neuro",
      emergency: true,
      keywords: [
        "tbi",
        "traumatic brain injury",
        "head injury",
        "head trauma",
        "severe tbi",
        "subdural",
        "sdh",
        "epidural",
        "edh",
        "contusion",
        "diffuse axonal injury",
        "icp",
        "evd",
        "bolt",
        "cpp",
        "herniation",
        "cushing",
        "hyperosmolar therapy",
        "mannitol",
        "hypertonic saline"
      ],
      warnings: [
        "Avoid HYPOTENSION and HYPOXIA — a single episode worsens outcome. BTF 4th ed: SBP ≥100 (age 50–69) / ≥110 mmHg (15–49 or >70); treat ICP >22 mmHg; CPP 60–70 mmHg — exact targets per order.",
        "No corticosteroids for TBI (CRASH). No prophylactic hyperventilation — brief hyperventilation only as a bridge for herniation per provider.",
        "Hypertonic saline (3%/23.4%) and mannitol are HIGH-ALERT — per order/protocol only; 23.4% central line only."
      ],
      glance: [
        "GCS ≤8 after head trauma: secure airway, SpO₂ & SBP targets, C-spine precautions",
        "ICP/CPP goals per order; HOB 30°, head midline, normocapnia, normothermia, normoglycemia",
        "Herniation signs (pupil dilation, posturing, Cushing) → hyperosmolar therapy per order, neurosurgery NOW"
      ],
      recognize: [
        "Decreased GCS, unequal/dilated pupils, posturing, seizures, CSF leak, scalp/skull injury",
        "Herniation: unilateral fixed dilated pupil, extensor posturing, Cushing triad (HTN, bradycardia, irregular breathing)",
        "Secondary insults: hypotension, hypoxia, hypo/hypercapnia, fever, hypo/hyperglycemia, hyponatremia, seizures, anemia",
        "Coagulopathy (anticoagulants, trauma-induced), associated C-spine/polytrauma"
      ],
      actions: [
        { id: "severe-tbi-a1", t: "!Call provider/neurosurgery for GCS drop ≥2, new pupil change, posturing, ICP above ordered threshold.", s: "RN" },
        { id: "severe-tbi-a2", t: "Airway/breathing: SpO₂ target per order (avoid <90%); C-spine precautions until cleared.", s: "RN" },
        { id: "severe-tbi-a3", t: "Anticipate/assist: intubation for GCS ≤8 (avoid hypotension/hypoxia during RSI).", s: "PROV" },
        { id: "severe-tbi-a4", t: "Ventilate to normocapnia (PaCO₂/ETCO₂ target per order); no routine hyperventilation.", s: "ORDER" },
        { id: "severe-tbi-a5", t: "Maintain SBP/MAP/CPP at ordered targets: isotonic fluids (0.9% saline/balanced per order; avoid hypotonic fluids; albumin not recommended in TBI), vasopressor per order.", s: "ORDER" },
        { id: "severe-tbi-a6", t: "ICP bundle: HOB 30° (if spine allows), head midline, loosen ETT ties/C-collar per policy, minimize stimulation, treat pain/agitation per order.", s: "RN" },
        { id: "severe-tbi-a7", t: "ICP above threshold: sedation/analgesia per order, CSF drainage per EVD order, hyperosmolar therapy (hypertonic saline or mannitol) per order.", s: "ORDER" },
        { id: "severe-tbi-a8", t: "Reverse anticoagulation per order/protocol (4F-PCC, vitamin K slow IV, idarucizumab, protamine); seizure prophylaxis per order.", s: "ORDER" },
        { id: "severe-tbi-a9", t: "Normothermia (treat fever), glucose and Na targets per order; avoid hyponatremia.", s: "ORDER" },
        { id: "severe-tbi-a10", t: "Anticipate/assist: CT head, ICP monitor/EVD placement, decompressive surgery.", s: "PROV" }
      ],
      monitor: [
        { id: "severe-tbi-m1", t: "GCS, pupils (size/reactivity), motor q1h or per order", s: "RN" },
        { id: "severe-tbi-m2", t: "Continuous arterial BP/MAP, ICP, CPP; SpO₂, ETCO₂", s: "RN" },
        { id: "severe-tbi-m3", t: "EVD: level at zero reference per order, drain open/closed per order, output & color, waveform", s: "RN" },
        { id: "severe-tbi-m4", t: "Na, osmolality (hyperosmolar therapy), glucose, coags, Hgb per order", s: "ORDER" },
        { id: "severe-tbi-m5", t: "Temperature, seizures (continuous EEG if ordered), UOP (DI/SIADH/cerebral salt wasting)", s: "RN" }
      ],
      meds: [
        "VERIFY PER FACILITY PROTOCOL / ORDER. No infusion rates shown.",
        "Hypertonic saline (3%/23.4%, HIGH-ALERT) or mannitol per order (check osmolality/Na, UOP)",
        "Sedation/analgesia (propofol, fentanyl) per order",
        "Vasopressor for CPP/SBP target per order · isotonic crystalloid",
        "Seizure prophylaxis (e.g., levETIRAcetam) per order · reversal agents per protocol · no steroids"
      ],
      escalate: [
        "!New pupil asymmetry/fixed pupil, posturing, Cushing triad, GCS drop ≥2",
        "!ICP above threshold or CPP below target despite measures",
        "Hypotension, hypoxia, seizure, Na out of range, EVD malfunction/no output"
      ]
    },
    {
      id: "ischemic-stroke",
      name: "Acute ischemic stroke",
      category: "Neuro",
      emergency: true,
      keywords: [
        "stroke",
        "cva",
        "code stroke",
        "stroke alert",
        "ischemic stroke",
        "ais",
        "brain attack",
        "tpa",
        "alteplase",
        "tenecteplase",
        "tnk",
        "lytics",
        "thrombolysis",
        "thrombectomy",
        "evt",
        "lvo",
        "nihss",
        "be-fast",
        "fast",
        "lkw",
        "last known well",
        "facial droop",
        "aphasia",
        "hemiparesis"
      ],
      warnings: [
        "LYSIS SCREEN (nurse gathers, provider decides): glucose <50; platelets <100,000; INR >1.7 / aPTT >40 s / PT >15 s; therapeutic LMWH <24 h; DOAC <48 h (unless normal renal function/specific assays); prior ICH; intracranial neoplasm/AVM.",
        "LYSIS SCREEN (cont.): major surgery or serious trauma <14 d (head trauma/prior stroke <3 mo); GI/GU bleed <21 d; BP persistently >185/110; suspected aortic arch dissection; infective endocarditis; extensive hypodensity on CT; symptoms suggesting SAH (verify vs AHA/ASA 2026 and facility checklist).",
        "Thrombolytics are HIGH-ALERT: ordered by stroke provider; MEASURED weight preferred; dose prepared/verified by pharmacy or stroke protocol with independent bedside double check. Stroke TNK dose ≠ STEMI TNK dose; alteplase stroke ≠ PE ≠ line-clearance.",
        "Orolingual angioedema during/after lytic (esp. ACE-i): stop infusion, call airway/rapid response now."
      ],
      glance: [
        "Note LAST KNOWN WELL time. Call STROKE CODE. Check glucose.",
        "STAT non-contrast CT head (goal door-to-CT ≤20–25 min per facility); NPO until swallow screen",
        "Lysis ≤4.5 h from LKW (longer with advanced imaging per stroke team); thrombectomy up to 24 h for LVO — disabling deficit = treat regardless of NIHSS"
      ],
      recognize: [
        "BE-FAST: Balance, Eyes (vision loss), Face droop, Arm drift, Speech slurred/aphasia, Time",
        "Sudden: weakness/numbness one side, aphasia, visual loss, vertigo with ataxia, severe headache (hemorrhagic?), neglect, gaze deviation",
        "In ICU/post-op: new deficit in any pt = stroke until proven otherwise; sedated pt — provider may hold sedation for exam",
        "Mimics: hypoglycemia, seizure/post-ictal, migraine, Bell's palsy, sepsis, hypotension, hyponatremia, drug effect — check glucose first"
      ],
      actions: [
        { id: "ischemic-stroke-a1", t: "Note LKW (last time seen normal) / discovery time and witness phone number. Do NOT give food/drink/oral meds.", s: "RN" },
        { id: "ischemic-stroke-a2", t: "!Activate stroke code / rapid response.", s: "RN" },
        { id: "ischemic-stroke-a3", t: "ABCs; O₂ only if SpO₂ <94%. HOB per order/protocol (elevate if aspiration or ↑ICP risk). IV ×2 per protocol.", s: "RN" },
        { id: "ischemic-stroke-a4", t: "POINT-OF-CARE GLUCOSE; treat hypoglycemia per facility protocol (stroke guidance threshold <60 mg/dL).", s: "RN" },
        { id: "ischemic-stroke-a5", t: "STAT CT head non-contrast ± CTA/perfusion; labs per order (CBC, BMP, coags, troponin, type & screen); ECG — do not delay lysis for labs unless anticoagulant/bleeding disorder suspected.", s: "ORDER" },
        { id: "ischemic-stroke-a6", t: "Gather lysis-screen data before CT returns: measured weight, LKW, last DOAC/LMWH/warfarin/antiplatelet dose & time, recent surgery/trauma/GI bleed, prior ICH, BP, glucose. NIHSS by trained staff.", s: "RN" },
        { id: "ischemic-stroke-a7", t: "BP per order: lysis candidate <185/110 before and <180/105 for 24 h after. No lysis: permissive HTN unless >220/120 or other indication. Call if outside ordered range on 2 checks.", s: "ORDER" },
        { id: "ischemic-stroke-a8", t: "Anticipate/assist: thrombolysis decision by stroke provider (alteplase or tenecteplase per protocol/pharmacy). Door-to-needle goal ≤60 min (ideally ≤45).", s: "PROV" },
        { id: "ischemic-stroke-a9", t: "Anticipate/assist: LVO suspected → transfer/IR for thrombectomy (extended windows via imaging).", s: "PROV" },
        { id: "ischemic-stroke-a10", t: "No aspirin/anticoagulant until hemorrhage excluded and lysis decision made (aspirin usually ≥24 h after lysis, per order).", s: "RN" },
        { id: "ischemic-stroke-a11", t: "Bedside swallow screen BEFORE any oral intake.", s: "RN" },
        { id: "ischemic-stroke-a12", t: "!During/after lytic: severe headache, N/V, neuro decline, acute hypertension, bleeding, or tongue/lip swelling → STOP infusion per protocol, call provider; stat CT per order.", s: "RN" }
      ],
      monitor: [
        { id: "ischemic-stroke-m1", t: "Post-lysis: neuro checks + BP q15 min ×2 h, q30 min ×6 h, then q1h ×16 h (or per protocol)", s: "ORDER" },
        { id: "ischemic-stroke-m2", t: "Post-thrombectomy BP target per stroke team (avoid intensive lowering to SBP <140)", s: "ORDER" },
        { id: "ischemic-stroke-m3", t: "Angioedema (tongue/lip/throat swelling) during/after lytic, esp. on ACE-i — airway readiness", s: "RN" },
        { id: "ischemic-stroke-m4", t: "Glucose 140–180; temp (treat fever per order); SpO₂; aspiration precautions", s: "ORDER" },
        { id: "ischemic-stroke-m5", t: "No arterial punctures/NG/Foley/IM injections for 24 h post-lysis unless essential (provider)", s: "RN" },
        { id: "ischemic-stroke-m6", t: "Repeat CT at 24 h before antithrombotics", s: "ORDER" }
      ],
      meds: [
        "VERIFY PER FACILITY PROTOCOL / ORDER (AHA/ASA 2026). No numeric thrombolytic or antihypertensive-infusion doses shown — per stroke protocol/pharmacy.",
        "Thrombolytic: alteplase or tenecteplase — stroke-specific weight-based dose per order/pharmacy (HIGH-ALERT)",
        "BP: labetalol IV (hold for bradycardia/heart block/asthma/acute HF) or niCARdipine / clevidipine infusion titrated per order (clevidipine = lipid emulsion; niCARdipine ≠ NIFEdipine)",
        "Symptomatic ICH after lytic: reversal (e.g., cryoprecipitate, antifibrinolytic) per stroke protocol/provider",
        "Angioedema: airway first; treatment (epinephrine, antihistamine, steroid, others) per provider; hold ACE-i",
        "Aspirin only after swallow screen or alternate route, per order, timing per lysis status; DAPT for minor stroke per neurology",
        "Statin, glucose control, DVT prophylaxis (IPC) per order; antiepileptics only if seizure"
      ],
      escalate: [
        "!Any new deficit, decreased LOC, severe headache or vomiting → call provider/stroke team; stat CT",
        "!BP above ordered limits despite meds",
        "Malignant edema signs (decline day 2–4) → neurosurgery/neuro-ICU for hemicraniectomy"
      ]
    },
    {
      id: "hemorrhagic-shock",
      name: "Hypovolemic / hemorrhagic shock",
      category: "Shock",
      emergency: true,
      keywords: [
        "hemorrhagic shock",
        "hemorrhage",
        "bleeding",
        "bleed",
        "hypovolemic",
        "hypovolemia",
        "trauma",
        "transfusion",
        "massive transfusion",
        "mtp",
        "blood loss",
        "txa",
        "tranexamic acid",
        "pcc",
        "kcentra",
        "reversal",
        "anticoagulant reversal",
        "retroperitoneal bleed",
        "dehydration"
      ],
      warnings: [
        "Factor Xa inhibitor (apixaban/rivaroxaban) bleeding: 4-factor PCC per facility protocol/order — follow local formulary.",
        "Tranexamic acid: trauma (≤3 h of injury; never >3 h) or postpartum hemorrhage only, per protocol/order. NOT for GI bleeding (HALT-IT). IV only — never intrathecal; spell out the name (not 'TXA', which some read as tPA).",
        "Calcium chloride and gluconate are NOT gram-for-gram equivalent (1 g chloride ≈ 3 g gluconate). Chloride via central/secure large vein; separate from bicarbonate/phosphate.",
        "Vitamin K IV: slow infusion per order — rare severe anaphylactoid reactions."
      ],
      glance: [
        "Find & STOP the bleed: direct pressure / tourniquet / call surgeon",
        "2 large-bore IVs (or IO); activate MASSIVE TRANSFUSION per policy if ongoing major bleed",
        "Blood > crystalloid; keep warm; calcium per order; BP target = provider order"
      ],
      recognize: [
        "Tachycardia, hypotension (late), narrow pulse pressure, cool pale clammy skin, AMS, oliguria, thirst",
        "No tachycardia does NOT rule out shock (β-blockers, pacemaker, elderly, athletes, pregnancy)",
        "Blood loss class (ATLS): I <15% · II 15–30% (↑HR) · III 30–40% (↓BP) · IV >40% (obtunded)",
        "Sources: trauma, GI bleed, retroperitoneal (post-cath), post-op/surgical site, chest tube, ruptured AAA, ectopic, postpartum, anticoagulation",
        "Non-hemorrhagic hypovolemia: vomiting, diarrhea, burns, DKA, over-diuresis, third-spacing. Lactate ↑, base deficit ↑, shock index (HR ÷ SBP) >0.9–1.0"
      ],
      actions: [
        { id: "hemorrhagic-shock-a1", t: "!Call rapid response/provider/surgery now. Activate massive transfusion protocol (MTP) per policy if unstable or ongoing major bleed.", s: "RN" },
        { id: "hemorrhagic-shock-a2", t: "Control external bleeding: direct pressure, packing, tourniquet for extremity. Post-cath groin: manual pressure above puncture site, flat.", s: "RN" },
        { id: "hemorrhagic-shock-a3", t: "Pelvic binder if pelvic fracture suspected, per protocol/order.", s: "ORDER" },
        { id: "hemorrhagic-shock-a4", t: "Supine (leg raise ok). O₂. Keep NPO.", s: "RN" },
        { id: "hemorrhagic-shock-a5", t: "Two large-bore IVs or IO per protocol; rapid infuser/warmer. STAT labs per order: type & crossmatch, CBC, coags/fibrinogen, TEG/ROTEM, BMP, iCa, lactate, ABG.", s: "ORDER" },
        { id: "hemorrhagic-shock-a6", t: "Resuscitate with blood products per MTP (balanced ~1:1:1 or whole blood per facility); limit crystalloid. Two-person bedside verification; compatible fluids only.", s: "ORDER" },
        { id: "hemorrhagic-shock-a7", t: "BP target = provider order. Permissive hypotension only in selected trauma without TBI/spinal injury, per surgeon — do not let SBP drift low on your own; call.", s: "RN" },
        { id: "hemorrhagic-shock-a8", t: "Tranexamic acid per trauma/postpartum hemorrhage protocol only (≤3 h from injury/onset) — not for GI bleeding.", s: "ORDER" },
        { id: "hemorrhagic-shock-a9", t: "Calcium per order with ongoing transfusion (keep iCa >1.1 mmol/L); check which salt.", s: "ORDER" },
        { id: "hemorrhagic-shock-a10", t: "Prevent lethal triad: keep warm (warming blankets, warmed products), report acidosis/coagulopathy.", s: "RN" },
        { id: "hemorrhagic-shock-a11", t: "Anticoagulant reversal per provider/pharmacy: warfarin → 4F-PCC + IV vitamin K (slow); dabigatran → idarucizumab; Xa inhibitor → 4F-PCC; heparin → protamine (slow; hypotension/anaphylaxis).", s: "ORDER" },
        { id: "hemorrhagic-shock-a12", t: "Anticipate/assist: definitive hemostasis — OR / IR embolization / endoscopy / chest tube.", s: "PROV" }
      ],
      monitor: [
        { id: "hemorrhagic-shock-m1", t: "HR, BP/MAP, shock index, cap refill, mentation q5–15 min", s: "RN" },
        { id: "hemorrhagic-shock-m2", t: "Hgb/Hct (lags), lactate, base deficit, iCa, K, fibrinogen, platelets, TEG; temp (goal >36 °C)", s: "ORDER" },
        { id: "hemorrhagic-shock-m3", t: "UOP hourly; chest tube/drain output; abdominal girth; dressing strikethrough", s: "RN" },
        { id: "hemorrhagic-shock-m4", t: "Transfusion reaction signs (see Transfusion reaction card); K ↑ with massive transfusion; ongoing blood loss", s: "RN" },
        { id: "hemorrhagic-shock-m5", t: "Pressor requirement (if any) — bridge only after volume", s: "RN" }
      ],
      meds: [
        "VERIFY PER FACILITY PROTOCOL / ORDER. No infusion or reversal-agent doses shown — per protocol/pharmacy.",
        "Blood products per MTP (pRBC : plasma : platelets ~1:1:1); cryoprecipitate/fibrinogen concentrate for low fibrinogen per protocol",
        "Tranexamic acid — trauma ≤3 h / postpartum hemorrhage only, per protocol; IV only",
        "Calcium chloride (central/secure vein) or calcium gluconate — per order; 1 g chloride ≈ 3 g gluconate",
        "Crystalloid boluses per order for NON-hemorrhagic hypovolemia (small boluses, reassess); not a substitute for blood",
        "Vasopressor (norepinephrine/vasopressin) only as bridge if refractory, per order (HIGH-ALERT)",
        "Reversal agents per pharmacy protocol: 4F-PCC, vitamin K (slow IV), protamine (slow), idarucizumab (Xa inhibitors → 4F-PCC)"
      ],
      escalate: [
        "!Ongoing bleed with unstable vitals → MTP + surgery/IR NOW",
        "!Altered mental status, SBP <80, or no response to initial transfusion",
        "Chest tube output ≥200 mL/h, expanding hematoma, or back/flank pain + hypotension after femoral access → provider now",
        "Hypothermia <35 °C, coagulopathy, or acidosis (pH <7.2) — escalate resuscitation"
      ]
    },
    {
      id: "tamponade",
      name: "Cardiac tamponade",
      category: "Cardiac",
      emergency: true,
      keywords: [
        "tamponade",
        "cardiac tamponade",
        "pericardial tamponade",
        "pericardial effusion",
        "effusion",
        "pericardiocentesis",
        "becks triad",
        "beck's",
        "pulsus paradoxus",
        "muffled heart sounds",
        "electrical alternans",
        "post cardiac surgery",
        "chest tube output",
        "resternotomy",
        "hemopericardium"
      ],
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
        { id: "tamponade-a1", t: "!Call rapid response/provider, cardiology/cardiac surgery STAT. Request STAT bedside echo.", s: "RN" },
        { id: "tamponade-a2", t: "O₂, monitor, large-bore IV; position of comfort (often upright).", s: "RN" },
        { id: "tamponade-a3", t: "Support preload per order: small crystalloid bolus as temporizing bridge (may harm if CVP already high).", s: "ORDER" },
        { id: "tamponade-a4", t: "Avoid/question: diuretics, vasodilators, sedation; tell provider before intubation/positive pressure (drops preload) — if unavoidable: pressors ready, low PEEP/VT, drainage first if possible.", s: "RN" },
        { id: "tamponade-a5", t: "Vasopressor/inotrope per order only as a bridge (norepinephrine, DOBUTamine).", s: "ORDER" },
        { id: "tamponade-a6", t: "Post-cardiac surgery: sudden drop in chest-tube output + hypotension/↑CVP = call surgeon NOW. Clear tubes only per unit policy (many ban stripping); don't delay the call.", s: "RN" },
        { id: "tamponade-a7", t: "Anticipate/assist: echo-guided pericardiocentesis (non-surgical causes): tray, catheter, drainage bag, sterile prep; emergency consent per policy; don't delay for coags if unstable.", s: "PROV" },
        { id: "tamponade-a8", t: "Anticipate/assist: post-cardiac surgery/dissection/rupture → surgical drainage/re-exploration; resternotomy kit to bedside; arrest → CALS (see Post-cardiac-surgery card).", s: "PROV" },
        { id: "tamponade-a9", t: "Hold/reverse anticoagulants per provider (protamine slowly — hypotension/anaphylaxis).", s: "ORDER" },
        { id: "tamponade-a10", t: "Anticipate/assist: traumatic arrest from tamponade → emergency thoracotomy/pericardiocentesis per ATLS.", s: "PROV" }
      ],
      monitor: [
        { id: "tamponade-m1", t: "BP, HR, CVP, SpO₂, mentation continuously; pulsus paradoxus on arterial line", s: "RN" },
        { id: "tamponade-m2", t: "Drain output (volume, color, rate), chest-tube patency", s: "RN" },
        { id: "tamponade-m3", t: "Post-drainage: BP improvement, recurrence signs; repeat echo per order", s: "RN" },
        { id: "tamponade-m4", t: "Coags, Hgb; ECG voltage", s: "ORDER" },
        { id: "tamponade-m5", t: "Pericardial drain care per policy; hemodynamic changes after drainage", s: "RN" }
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
    },
    {
      id: "pe",
      name: "Pulmonary embolism",
      category: "Respiratory",
      emergency: true,
      keywords: [
        "pe",
        "pulmonary embolism",
        "pulmonary embolus",
        "massive pe",
        "saddle",
        "clot",
        "dvt",
        "vte",
        "anticoagulation",
        "heparin",
        "ufh",
        "enoxaparin",
        "lovenox",
        "thrombolysis",
        "lytics",
        "alteplase",
        "tpa",
        "pert",
        "rv strain",
        "d-dimer",
        "ctpa",
        "cta"
      ],
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
        { id: "pe-a1", t: "O₂ to SpO₂ ≥90% per protocol; monitor ECG/SpO₂/BP; IV access. Tell provider if intubation is being considered (positive pressure + sedation can precipitate collapse).", s: "RN" },
        { id: "pe-a2", t: "!Call provider/rapid response. Unstable: activate PERT / thrombolysis decision per facility.", s: "RN" },
        { id: "pe-a3", t: "Screen bleeding risk/lysis contraindications with provider (see warnings); limit arterial/central punctures and IM injections; keep IV sites compressible.", s: "RN" },
        { id: "pe-a4", t: "Anticoagulation per order: UFH per facility nomogram (preferred if high-risk/may need lysis or CrCl <30) or LMWH — HIGH-ALERT double check.", s: "ORDER" },
        { id: "pe-a5", t: "Work-up per order: CT pulmonary angiogram (renal function/contrast allergy), echo, leg duplex, troponin, BNP, lactate, ABG.", s: "ORDER" },
        { id: "pe-a6", t: "Anticipate/assist: systemic thrombolysis (alteplase per order/pharmacy) for high-risk PE after contraindication screen; heparin hold/continue per facility protocol.", s: "PROV" },
        { id: "pe-a7", t: "Anticipate/assist: lysis contraindicated/failed → catheter-directed therapy, surgical embolectomy, ECMO as rescue.", s: "PROV" },
        { id: "pe-a8", t: "RV failure care per order: cautious fluids (small volume, stop if CVP rising), norepinephrine first-line ± inotrope (DOBUTamine); avoid over-diuresis.", s: "ORDER" },
        { id: "pe-a9", t: "If intubation unavoidable: push-dose pressor ready, provider-chosen hemodynamically stable induction, avoid hypoxia/hypercapnia.", s: "ORDER" },
        { id: "pe-a10", t: "Anticipate/assist: if anticoagulation absolutely contraindicated → retrievable IVC filter per provider; leg IPC only with order.", s: "PROV" }
      ],
      monitor: [
        { id: "pe-m1", t: "SpO₂, HR, BP, RR continuously; mentation; urine output", s: "RN" },
        { id: "pe-m2", t: "Bleeding (IV sites, GI, neuro checks); aPTT/anti-Xa per nomogram; platelets (HIT: drop >50%, typical day 5–10)", s: "ORDER" },
        { id: "pe-m3", t: "Post-lysis: neuro checks per protocol (e.g., q15 min initially); no IM injections/invasive procedures", s: "RN" },
        { id: "pe-m4", t: "RV function on echo; lactate", s: "ORDER" },
        { id: "pe-m5", t: "Hgb, creatinine", s: "ORDER" }
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
    },
    {
      id: "acs-mi",
      name: "Acute MI / ACS (STEMI, NSTEMI)",
      category: "Cardiac",
      emergency: false,
      keywords: [
        "acs",
        "mi",
        "ami",
        "stemi",
        "nstemi",
        "heart attack",
        "myocardial infarction",
        "chest pain",
        "unstable angina",
        "troponin",
        "trop",
        "ecg",
        "ekg",
        "12-lead",
        "aspirin",
        "asa",
        "nitroglycerin",
        "nitro",
        "ntg",
        "heparin",
        "cath lab",
        "pci",
        "sgarbossa",
        "lbbb",
        "lytics",
        "tnk",
        "fibrinolytic"
      ],
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
        { id: "acs-mi-a1", t: "Stop activity, bed rest, continuous ECG/SpO₂, defib pads nearby. Large-bore IV ×2 per protocol.", s: "RN" },
        { id: "acs-mi-a2", t: "!12-lead ECG within 10 min; give to provider immediately. STEMI: activate cath lab per facility protocol.", s: "RN" },
        { id: "acs-mi-a3", t: "Aspirin chewed (non-enteric) per protocol/order — screen first: allergy, active bleeding, recent ICH/surgery, suspected dissection. Can't swallow: PR or via tube per order.", s: "ORDER" },
        { id: "acs-mi-a4", t: "O₂ only if SpO₂ <90% (or distress). Avoid routine O₂ if sats normal.", s: "RN" },
        { id: "acs-mi-a5", t: "Nitroglycerin SL per protocol/order only if SBP ≥90 and not ≥30 below baseline, no RV infarct, no PDE-5 inhibitor (sildenafil 24 h / tadalafil 48 h) or riociguat, HR 50–100; check for nitro patch.", s: "ORDER" },
        { id: "acs-mi-a6", t: "Pain unrelieved by nitro: opioid only if ordered, smallest effective dose (may cause hypotension; delays oral P2Y12 absorption).", s: "ORDER" },
        { id: "acs-mi-a7", t: "Labs per order: troponin (repeat per lab pathway, e.g., 0/1–3 h), BMP, Mg, CBC, coags, type & screen.", s: "ORDER" },
        { id: "acs-mi-a8", t: "Anticoagulant and P2Y12 inhibitor per cardiology order — screen bleeding risk; confirm what was already given.", s: "ORDER" },
        { id: "acs-mi-a9", t: "Fibrinolysis (only if PCI not achievable within ~120 min): complete contraindication checklist (see warnings) with provider before preparing drug.", s: "ORDER" },
        { id: "acs-mi-a10", t: "Hold NSAIDs. IV β-blocker: question order if HF, low output, shock, bradycardia or AV block.", s: "RN" },
        { id: "acs-mi-a11", t: "Ask about last dose of DOACs/antiplatelets. Prepare for cath: allergies (contrast), NPO, consent, access-site prep, med list.", s: "RN" }
      ],
      monitor: [
        { id: "acs-mi-m1", t: "Continuous ECG (ST monitoring if available) — arrhythmia (VT/VF, AV block, AF)", s: "RN" },
        { id: "acs-mi-m2", t: "Vitals q5–15 min during acute phase; pain score; repeat 12-lead with any pain change", s: "RN" },
        { id: "acs-mi-m3", t: "Heart failure signs: crackles, JVD, new O₂ need; hypotension", s: "RN" },
        { id: "acs-mi-m4", t: "Post-cath: access site (hematoma, bleeding, distal pulses/color); back/flank pain + hypotension after femoral access = retroperitoneal bleed → call", s: "RN" },
        { id: "acs-mi-m5", t: "Serial troponin; electrolytes (common target K ≥4.0, Mg ≥2.0 per protocol); renal function after contrast", s: "ORDER" }
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
    },
    {
      id: "cardiogenic-shock",
      name: "Cardiogenic shock",
      category: "Cardiac",
      emergency: false,
      keywords: [
        "cardiogenic shock",
        "cs",
        "pump failure",
        "low output",
        "lv failure",
        "rv failure",
        "scai",
        "inotrope",
        "dobutamine",
        "milrinone",
        "norepinephrine",
        "levophed",
        "norepi",
        "iabp",
        "balloon pump",
        "impella",
        "ecmo",
        "va-ecmo",
        "mcs",
        "heart failure",
        "shock team"
      ],
      warnings: [
        "Vasopressors/inotropes are HIGH-ALERT: dose, concentration and units (mcg/min vs mcg/kg/min) per order and pump library; independent double check.",
        "DOBUTamine ≠ DOPamine (look-alike). Milrinone: renally cleared (accumulates), bolus only if explicitly ordered (hypotension).",
        "Peripheral vasopressor only per policy: large proximal vein, site check at least hourly; extravasation → stop, leave catheter, aspirate, call, facility extravasation protocol (antidote only per order)."
      ],
      glance: [
        "Hypotension + cool/clammy + congestion (crackles, JVD) + falling UOP = pump failure",
        "Get 12-lead, call provider/cardiology (shock team) early; echo is key",
        "NO large fluid boluses if congested; vasopressor ± inotrope per order; early MCS evaluation per team"
      ],
      recognize: [
        "SBP <90 (or MAP <60 / drop ≥30 mmHg) sustained, or needing pressors, with signs of hypoperfusion",
        "Early ('normotensive') shock: normal BP but cold, oliguric, lactate >2 — SCAI stages A–E",
        "Cold, clammy, mottled extremities; AMS; oliguria; lactate >2; narrow pulse pressure",
        "Pulmonary edema (crackles, hypoxia, pink frothy sputum), JVD, S3",
        "Common causes: large MI, mechanical complication (VSD, papillary muscle rupture), acute-on-chronic HF, myocarditis, arrhythmia, valve failure, PE, tamponade"
      ],
      actions: [
        { id: "cardiogenic-shock-a1", t: "!Call rapid response/provider and cardiology (shock team if available).", s: "RN" },
        { id: "cardiogenic-shock-a2", t: "Continuous ECG, SpO₂; upright position if BP allows. O₂ for hypoxia per protocol.", s: "RN" },
        { id: "cardiogenic-shock-a3", t: "NIV/HFNC per order — usually helps pulmonary edema; watch BP after start (preload drop), esp. RV failure.", s: "ORDER" },
        { id: "cardiogenic-shock-a4", t: "12-lead ECG now; notify provider. Anticipate STAT bedside echo (LV/RV, effusion, valves).", s: "RN" },
        { id: "cardiogenic-shock-a5", t: "Anticipate/assist: arterial line and central venous access.", s: "PROV" },
        { id: "cardiogenic-shock-a6", t: "Labs per order: lactate, troponin, BNP, BMP, LFTs, ABG, CBC, coags, type & screen.", s: "ORDER" },
        { id: "cardiogenic-shock-a7", t: "Fluid challenge ONLY if ordered and clearly dry/no congestion (small volume) — reassess after.", s: "ORDER" },
        { id: "cardiogenic-shock-a8", t: "Vasopressor (norepinephrine commonly first-line) titrated to ordered MAP goal (typically ≥65) per order/pump library.", s: "ORDER" },
        { id: "cardiogenic-shock-a9", t: "Inotrope for low output per order (DOBUTamine; milrinone) — watch tachyarrhythmia and hypotension.", s: "ORDER" },
        { id: "cardiogenic-shock-a10", t: "Anticipate/assist: treat cause — ACS → emergent revascularization; arrhythmia → cardioversion/rate control; tamponade → drainage.", s: "PROV" },
        { id: "cardiogenic-shock-a11", t: "Anticipate/assist: MCS (IABP/Impella/VA-ECMO) evaluation — team decision, selected pts, early (SCAI C–D).", s: "PROV" },
        { id: "cardiogenic-shock-a12", t: "Foley + strict I&O per order. Hold antihypertensives, β-blockers, ACE-i/ARB, nephrotoxins as directed.", s: "ORDER" }
      ],
      monitor: [
        { id: "cardiogenic-shock-m1", t: "MAP (goal per order, typically ≥65), HR/rhythm, cap refill/skin temperature, mentation", s: "RN" },
        { id: "cardiogenic-shock-m2", t: "Lactate q2–4 h until falling (per order); UOP hourly", s: "ORDER" },
        { id: "cardiogenic-shock-m3", t: "Oxygenation, work of breathing; ventilation needs", s: "RN" },
        { id: "cardiogenic-shock-m4", t: "CO/CI, ScvO₂, PA catheter data if present (CI <2.2 L/min/m², PCWP ↑) — report trends", s: "RN" },
        { id: "cardiogenic-shock-m5", t: "Pressor/inotrope requirement trend (rapidly rising → call), infusion site/extravasation, arrhythmias, K and Mg", s: "RN" },
        { id: "cardiogenic-shock-m6", t: "MCS: leg straight with femoral devices; distal pulses/color/temp hourly; bleeding; hemolysis (dark urine); device alarms → call, never reposition/turn off", s: "RN" }
      ],
      meds: [
        "VERIFY PER FACILITY PROTOCOL / ORDER. No infusion doses shown — per order/pump library.",
        "Norepinephrine — commonly first-line vasopressor; titrate to ordered MAP (HIGH-ALERT)",
        "DOBUTamine — inotrope; tachyarrhythmia/hypotension (do not confuse with DOPamine)",
        "Milrinone — inotrope/vasodilator; renal adjustment per pharmacy; bolus only if explicitly ordered",
        "Epinephrine — third-line per provider (lactic acidosis, arrhythmia)",
        "Loop diuretic (e.g., furosemide IV) per order once perfusion/BP adequate and congested",
        "Avoid: large fluid loads if congested, vasodilators/nitrates when hypotensive, negative inotropes"
      ],
      escalate: [
        "!MAP below goal despite pressor, lactate rising, worsening hypoxia/mental status",
        "!Need for MCS or revascularization — contact cardiology/cath lab early (time-sensitive)",
        "Arrhythmia with instability → synchronized cardioversion/ACLS",
        "MCS alarm, limb ischemia, bleeding or dark urine → provider/MCS team now"
      ]
    },
    {
      id: "afib-rvr",
      name: "Atrial fibrillation with RVR",
      category: "Cardiac",
      emergency: false,
      keywords: [
        "afib",
        "a-fib",
        "af",
        "atrial fibrillation",
        "rvr",
        "rapid ventricular response",
        "aflutter",
        "atrial flutter",
        "irregular",
        "diltiazem",
        "cardizem",
        "metoprolol",
        "esmolol",
        "amiodarone",
        "digoxin",
        "cardioversion",
        "wpw",
        "pre-excited",
        "pre-excitation"
      ],
      warnings: [
        "WIDE, FAST, IRREGULAR rhythm (varying QRS width) = pre-excited AF (WPW) until proven otherwise: NO diltiazem, verapamil, β-blocker, digoxin, adenosine OR IV amiodarone (AHA 2025: harm). Unstable → synchronized cardioversion; stable → expert/provider order only (e.g., procainamide).",
        "Do not stack IV non-DHP calcium-channel blocker and IV β-blocker without explicit provider order (profound bradycardia/hypotension).",
        "Digoxin: narrow therapeutic index — load only per prescriber/pharmacy; check K⁺/Mg²⁺ and renal function first; verify vial strength (mg vs mcg; adult vs pediatric)."
      ],
      glance: [
        "Irregularly irregular, HR often >110–150. Is the RHYTHM causing instability, or is it compensatory (sepsis, bleeding, hypovolemia)?",
        "Unstable AND rhythm is the likely cause → synchronized cardioversion (≥200 J biphasic per device/provider)",
        "Stable → treat cause, correct K/Mg, rate control per order. Wide + irregular = suspect WPW: no AV-nodal blockers or amiodarone"
      ],
      recognize: [
        "Irregularly irregular narrow-complex rhythm, no P waves, HR >100 (RVR commonly >110–120)",
        "Symptoms: palpitations, dyspnea, dizziness, chest pain, hypotension",
        "Wide irregular fast rhythm with varying QRS width, rate often >200 with some very short R-R: pre-excited AF (WPW) — DANGER",
        "Regular narrow tachycardia fixed ≈150 = atrial flutter 2:1 until proven otherwise (provider may use adenosine to unmask)",
        "In ICU, RVR is often compensatory/secondary: sepsis, volume depletion, bleeding, pain, withdrawal, PE, hypoxia, thyroid, catecholamines/inotropes — fix the driver"
      ],
      actions: [
        { id: "afib-rvr-a1", t: "Assess perfusion: BP, mentation, chest pain, shock/acute HF. Apply pads. Get 12-lead; show provider (QRS narrow vs wide/variable).", s: "RN" },
        { id: "afib-rvr-a2", t: "!Unstable → call provider/rapid response. Rhythm the cause (very fast, ischemia/pulmonary edema)? Prepare synchronized cardioversion.", s: "RN" },
        { id: "afib-rvr-a3", t: "Anticipate/assist: synchronized cardioversion, initial ≥200 J biphasic (or device maximum) per provider/device; procedural sedation per provider order; re-arm SYNC after each shock; 'CLEAR'.", s: "PROV" },
        { id: "afib-rvr-a4", t: "Compensatory? (sepsis, bleeding, hypovolemia, hypoxia, pain, on pressors/inotropes, HR often 120–140) → tell provider; treat the cause first.", s: "RN" },
        { id: "afib-rvr-a5", t: "Labs per order: K (common goal ≥4.0), Mg (≥2.0), TSH, troponin, lactate, CBC, ABG. Replace K/Mg per protocol (rate/line per policy; reduce in renal impairment).", s: "ORDER" },
        { id: "afib-rvr-a6", t: "Treat triggers per order: fluids if hypovolemic, analgesia, infection/PE treatment, minimize catecholamines, stop offending drugs.", s: "ORDER" },
        { id: "afib-rvr-a7", t: "STABLE, narrow QRS: rate control per order (diltiazem, metoprolol or esmolol). Hold/clarify if SBP <100, on vasopressors, EF low/unknown, acute HF, bronchospasm, or just after other IV AV-nodal blocker.", s: "ORDER" },
        { id: "afib-rvr-a8", t: "Hypotension, decompensated HF or reduced EF (non-pre-excited): amiodarone or digoxin per order — amiodarone may chemically cardiovert (embolic risk if AF >48 h/unknown); central line preferred for infusion.", s: "ORDER" },
        { id: "afib-rvr-a9", t: "!Wide, irregular, varying QRS → stop: no diltiazem/verapamil/β-blocker/digoxin/adenosine/amiodarone; call provider now.", s: "RN" },
        { id: "afib-rvr-a10", t: "Ask/document AF duration and anticoagulation: >48 h/unknown and not anticoagulated → conversion (electrical or drug) raises stroke risk — tell provider. Unstable: do not delay cardioversion.", s: "RN" }
      ],
      monitor: [
        { id: "afib-rvr-m1", t: "Continuous ECG; HR and BP q5–15 min while titrating; goal resting HR per provider (often <110)", s: "RN" },
        { id: "afib-rvr-m2", t: "Hypotension/bradycardia after IV diltiazem or β-blocker; infusion rates match order/pump library", s: "RN" },
        { id: "afib-rvr-m3", t: "K, Mg after each repletion; QTc and BP/HR with amiodarone; digoxin level/renal function per order", s: "ORDER" },
        { id: "afib-rvr-m4", t: "Signs of stroke/embolism (new neuro deficit), HF", s: "RN" },
        { id: "afib-rvr-m5", t: "Response to treating underlying cause", s: "RN" }
      ],
      meds: [
        "VERIFY PER FACILITY PROTOCOL / ORDER. No numeric doses for antiarrhythmic/rate-control drugs — per order/pharmacy.",
        "Diltiazem IV (weight-based, facility cap) / infusion per pump library — not if hypotensive, shock, reduced EF, or just after IV β-blocker",
        "Metoprolol IV / esmolol infusion per order — hold for hypotension, bradycardia, AV block, decompensated HF, bronchospasm",
        "Amiodarone IV per order (standard concentration; central preferred for infusion; BP, HR, QTc; warfarin/digoxin interactions) — NEVER in pre-excited AF",
        "Digoxin per prescriber/pharmacy only (renal function, lean weight, prior digoxin, K/Mg; vial strength) — slow onset, not for acute control",
        "Magnesium / potassium replacement per protocol (rate/line per policy)",
        "Anticoagulation (heparin / DOAC) for stroke prevention per provider (HIGH-ALERT)"
      ],
      escalate: [
        "!Hypotension, chest pain, AMS, pulmonary edema, or HR >150 not responding → provider for cardioversion/cardiology",
        "!Wide irregular tachycardia → treat as pre-excited AF/VT: no AV-nodal blockers, no amiodarone; cardioversion if unstable",
        "New neuro deficit → stroke code",
        "Recurrent RVR with pressor requirement: reconsider drivers and antiarrhythmic strategy with provider"
      ]
    },
    {
      id: "pulm-edema-adhf",
      name: "Acute pulmonary edema / acute decompensated HF",
      category: "Cardiac",
      emergency: false,
      keywords: [
        "pulmonary edema",
        "flash pulmonary edema",
        "ape",
        "adhf",
        "chf",
        "heart failure",
        "hf exacerbation",
        "fluid overload",
        "volume overload",
        "crackles",
        "rales",
        "pink frothy sputum",
        "lasix",
        "furosemide",
        "diuretic",
        "nitroglycerin",
        "ntg",
        "bipap",
        "cpap",
        "scape"
      ],
      warnings: [
        "Nitrates contraindicated/caution: SBP below ordered threshold, PDE-5 inhibitor use (sildenafil/vardenafil 24 h, tadalafil 48 h), RV infarct, severe aortic stenosis — ask provider.",
        "Hypotension or poor perfusion with pulmonary edema = cardiogenic shock — do NOT give vasodilators; see Cardiogenic shock card.",
        "Nitroglycerin/nitroprusside/inotrope infusions are titrated per order/pump library only (no rates in this app)."
      ],
      glance: [
        "Acute dyspnea, crackles, hypoxemia, often hypertensive (SCAPE) → sit upright, O₂, CPAP/BiPAP per order",
        "Hypertensive: nitrate vasodilation per order; congested: IV loop diuretic per order",
        "Hypotensive/cold = cardiogenic shock pathway; find trigger (ACS, arrhythmia, valve, med/diet non-adherence)"
      ],
      recognize: [
        "Sudden/worsening dyspnea, orthopnea, tachypnea, anxiety, diaphoresis; pink frothy sputum",
        "Crackles, wheeze ('cardiac asthma'), JVD, S3, edema, weight gain; SpO₂ ↓",
        "Profile: warm-wet (congested, perfused) vs cold-wet (shock); SCAPE: very high BP + flash edema",
        "CXR: vascular congestion/edema; POCUS B-lines; BNP ↑; ECG/troponin for ischemia; new murmur → valve/ruptured papillary muscle"
      ],
      actions: [
        { id: "pulm-edema-adhf-a1", t: "!Call provider/RT if hypoxemic or distressed. Sit upright, legs dependent; continuous SpO₂, ECG, frequent BP.", s: "RN" },
        { id: "pulm-edema-adhf-a2", t: "O₂ to target per order; CPAP/BiPAP early for respiratory distress/hypoxemia per order (watch BP — positive pressure lowers preload).", s: "ORDER" },
        { id: "pulm-edema-adhf-a3", t: "12-lead ECG STAT (ACS? arrhythmia?); labs per order: troponin, BNP, BMP, Mg, CBC, ABG/VBG, lactate.", s: "ORDER" },
        { id: "pulm-edema-adhf-a4", t: "Hypertensive/SCAPE: SL nitroglycerin 0.4 mg if ordered (check SBP & PDE-5i), then IV nitrate infusion titrated per order.", s: "ORDER" },
        { id: "pulm-edema-adhf-a5", t: "Congestion: IV loop diuretic per order (dose often based on home dose); strict I&O, urinary catheter per order; reassess UOP within 2–6 h per order.", s: "ORDER" },
        { id: "pulm-edema-adhf-a6", t: "Hold/clarify: IV fluids, negative inotropes (new β-blocker/non-DHP CCB in acute decompensation), NSAIDs — ask provider.", s: "RN" },
        { id: "pulm-edema-adhf-a7", t: "Treat trigger per order: rapid AF (see AF card), ACS (see ACS card), hypertensive emergency, infection, med non-adherence.", s: "ORDER" },
        { id: "pulm-edema-adhf-a8", t: "Anticipate/assist: intubation if NIV failure/AMS (hemodynamic collapse risk — pressors ready).", s: "PROV" },
        { id: "pulm-edema-adhf-a9", t: "Anticipate/assist: cardiology/echo; mechanical support or ultrafiltration for refractory cases; urgent surgery for acute valve lesion.", s: "PROV" },
        { id: "pulm-edema-adhf-a10", t: "Shock signs (SBP low, cold, oliguria, lactate ↑) → stop vasodilators per order and escalate (Cardiogenic shock card).", s: "RN" }
      ],
      monitor: [
        { id: "pulm-edema-adhf-m1", t: "SpO₂, RR, work of breathing, BP q5–15 min during titration", s: "RN" },
        { id: "pulm-edema-adhf-m2", t: "Hourly UOP, I&O, daily weight", s: "RN" },
        { id: "pulm-edema-adhf-m3", t: "K, Mg, creatinine after diuresis per order", s: "ORDER" },
        { id: "pulm-edema-adhf-m4", t: "Headache/hypotension with nitrates; NIV tolerance, mask fit, aspiration", s: "RN" },
        { id: "pulm-edema-adhf-m5", t: "Rhythm (AF, VT), chest pain, perfusion (skin, mentation, lactate)", s: "RN" }
      ],
      meds: [
        "VERIFY PER FACILITY PROTOCOL / ORDER. No infusion rates shown.",
        "Nitroglycerin SL 0.4 mg (if ordered) → IV nitroglycerin infusion per order (nitroprusside per provider/arterial line)",
        "Loop diuretic IV (furosemide, bumetanide) per order ± thiazide per provider",
        "Inotrope (DOBUTamine, milrinone) only for low output per order — see Cardiogenic shock",
        "K/Mg replacement per protocol"
      ],
      escalate: [
        "!SpO₂ falling or work of breathing worsening on NIV, AMS, inability to protect airway",
        "!SBP falling/shock signs, new arrhythmia, ischemic ECG changes or chest pain",
        "Poor diuretic response (low UOP) or worsening creatinine → provider/cardiology"
      ]
    },
    {
      id: "hypertensive-emergency",
      name: "Hypertensive emergency",
      category: "Cardiac",
      emergency: false,
      keywords: [
        "hypertensive emergency",
        "hypertensive crisis",
        "hypertensive urgency",
        "htn",
        "high blood pressure",
        "malignant hypertension",
        "hypertensive encephalopathy",
        "pres",
        "nicardipine",
        "cardene",
        "clevidipine",
        "cleviprex",
        "labetalol",
        "esmolol",
        "nitroprusside",
        "eclampsia"
      ],
      warnings: [
        "Do NOT drop BP precipitously: usual general target is ≤25% reduction in the first hour, then gradual (per order). EXCEPTIONS with their own targets per order: aortic dissection (fast, HR first), ischemic stroke (lytic vs non-lytic thresholds), ICH, pre-eclampsia/eclampsia, pheochromocytoma.",
        "Vasoactive infusions (nicardipine, clevidipine, esmolol, nitroprusside, labetalol infusion) are titrated per order/pump library only — no rates in this app.",
        "Severe BP without acute organ damage (\"urgency\") usually needs oral therapy and time, not IV bolus — ask provider before PRN IV pushes."
      ],
      glance: [
        "Severe BP elevation + ACUTE organ damage (brain, heart, aorta, lungs, kidneys, eyes) = emergency",
        "Arterial line, titratable IV agent per order; controlled reduction per ordered target",
        "Condition-specific targets: dissection, stroke, ICH, eclampsia, pulmonary edema — confirm with provider"
      ],
      recognize: [
        "Very high BP (often >180/120) WITH: headache/AMS/seizure/visual change (encephalopathy/PRES), focal deficit (stroke/ICH)",
        "Chest/back pain (ACS, dissection), pulmonary edema, AKI/hematuria, retinal hemorrhage/papilledema",
        "Pregnancy/≤6 wk postpartum: pre-eclampsia/eclampsia (BP thresholds lower, magnesium per OB)",
        "Causes: med non-adherence, stimulants (cocaine/amphetamine), withdrawal (clonidine, β-blocker, alcohol), pain, urinary retention, pheochromocytoma"
      ],
      actions: [
        { id: "hypertensive-emergency-a1", t: "!Notify provider; repeat BP (correct cuff size, both arms if chest/back pain); continuous monitoring; neuro check.", s: "RN" },
        { id: "hypertensive-emergency-a2", t: "Treat reversible causes: pain, full bladder (bladder scan), anxiety, missed home meds — report.", s: "RN" },
        { id: "hypertensive-emergency-a3", t: "12-lead ECG, labs per order (BMP, troponin, CBC, UA, pregnancy test, tox screen); CT head/CTA per order.", s: "ORDER" },
        { id: "hypertensive-emergency-a4", t: "Anticipate/assist: arterial line for continuous titration.", s: "PROV" },
        { id: "hypertensive-emergency-a5", t: "Titratable IV antihypertensive per order (e.g., niCARdipine, clevidipine, labetalol, esmolol) to the ORDERED target and timeframe.", s: "ORDER" },
        { id: "hypertensive-emergency-a6", t: "Clarify target with provider: general ≤25% in 1st hour vs condition-specific (dissection, stroke, ICH, eclampsia, pulmonary edema).", s: "RN" },
        { id: "hypertensive-emergency-a7", t: "Report overshoot: new neuro deficit, chest pain, oliguria, BP below target — stop/reduce per order and call.", s: "RN" },
        { id: "hypertensive-emergency-a8", t: "Cocaine/amphetamine: benzodiazepines per order; question β-blocker without vasodilator.", s: "ORDER" },
        { id: "hypertensive-emergency-a9", t: "Pre-eclampsia/eclampsia: magnesium sulfate + antihypertensive per OB protocol (high-alert magnesium).", s: "ORDER" }
      ],
      monitor: [
        { id: "hypertensive-emergency-m1", t: "BP q5–15 min during titration (arterial line preferred), HR", s: "RN" },
        { id: "hypertensive-emergency-m2", t: "Neuro checks (GCS, pupils, focal deficits, vision) q1h or per order", s: "RN" },
        { id: "hypertensive-emergency-m3", t: "Chest pain, dyspnea, SpO₂, UOP", s: "RN" },
        { id: "hypertensive-emergency-m4", t: "Creatinine, K, troponin trend per order; cyanide/thiocyanate risk with prolonged nitroprusside per pharmacy", s: "ORDER" },
        { id: "hypertensive-emergency-m5", t: "IV site (peripheral nicardipine phlebitis — rotate per policy)", s: "RN" }
      ],
      meds: [
        "VERIFY PER FACILITY PROTOCOL / ORDER. No infusion rates shown.",
        "niCARdipine or clevidipine infusion (dihydropyridine CCB) per order",
        "Labetalol IV bolus/infusion or esmolol infusion per order (avoid in acute HF, bradycardia, bronchospasm, cocaine without vasodilator)",
        "Nitroglycerin (ACS/pulmonary edema) or nitroprusside (arterial line; cyanide risk) per order",
        "Magnesium sulfate (eclampsia) per OB protocol · benzodiazepines (sympathomimetic) per order"
      ],
      escalate: [
        "!New neuro deficit, seizure, chest/back pain, pulmonary edema",
        "!BP falls below target or rapidly (>25% in first hour unless ordered) with symptoms",
        "Suspected dissection → Aortic dissection card; stroke/ICH → neuro cards"
      ]
    },
    {
      id: "aortic-dissection",
      name: "Acute aortic dissection / acute aortic syndrome",
      category: "Cardiac",
      emergency: true,
      keywords: [
        "aortic dissection",
        "dissection",
        "aad",
        "type a",
        "type b",
        "acute aortic syndrome",
        "tearing chest pain",
        "back pain",
        "pulse deficit",
        "aorta",
        "esmolol",
        "intramural hematoma",
        "aortic rupture"
      ],
      warnings: [
        "NO anticoagulants, antiplatelets or thrombolytics until dissection excluded — dissection can mimic STEMI/stroke.",
        "HR control BEFORE vasodilator (vasodilator alone causes reflex tachycardia → shear). Targets (often HR ~60, SBP ~100–120) per ORDER.",
        "Tamponade from type A dissection: needle pericardiocentesis can be fatal — emergent SURGERY; call cardiac surgery."
      ],
      glance: [
        "Abrupt severe tearing/ripping chest/back pain, pulse/BP differential, neuro deficit, new AR murmur → suspect dissection",
        "CTA per order; NO anticoagulants/antiplatelets/lytics; IV β-blocker first then vasodilator per order",
        "Type A (ascending) = emergency surgery; type B = medical/endovascular per vascular surgery"
      ],
      recognize: [
        "Sudden severe chest, back or abdominal pain (tearing/ripping, maximal at onset), syncope",
        "Pulse deficit or SBP difference between arms, new aortic regurgitation murmur, hypotension/tamponade",
        "Malperfusion: stroke/paraplegia, limb ischemia, mesenteric ischemia (pain, lactate), AKI, MI (often RCA)",
        "Risk: hypertension, Marfan/connective tissue disease, bicuspid valve, cocaine, prior aortic surgery, pregnancy"
      ],
      actions: [
        { id: "aortic-dissection-a1", t: "!Call provider/rapid response; cardiac/vascular surgery notification per provider.", s: "RN" },
        { id: "aortic-dissection-a2", t: "BP in BOTH arms; pulses all 4 limbs; neuro & limb checks; 2 large-bore IVs; monitor; type & crossmatch per order.", s: "RN" },
        { id: "aortic-dissection-a3", t: "HOLD/question any anticoagulant, antiplatelet, or thrombolytic until dissection excluded.", s: "RN" },
        { id: "aortic-dissection-a4", t: "STAT CTA chest/abdomen/pelvis or TEE/POCUS per order; ECG, troponin, lactate, CBC, coags, BMP per order.", s: "ORDER" },
        { id: "aortic-dissection-a5", t: "Anticipate/assist: arterial line (usually right arm unless differential favors otherwise per provider).", s: "PROV" },
        { id: "aortic-dissection-a6", t: "IV β-blocker (e.g., esmolol, labetalol) FIRST to ordered HR target; then vasodilator (niCARdipine, clevidipine, nitroprusside) per order to ordered SBP target.", s: "ORDER" },
        { id: "aortic-dissection-a7", t: "Analgesia (IV opioid) per order — pain drives HR/BP.", s: "ORDER" },
        { id: "aortic-dissection-a8", t: "Hypotension = rupture/tamponade/AR/malperfusion: call STAT; fluids/blood per order; no vasodilators.", s: "RN" },
        { id: "aortic-dissection-a9", t: "Anticipate/assist: type A → emergency surgery; type B complicated → endovascular repair; spinal drain per surgery.", s: "PROV" }
      ],
      monitor: [
        { id: "aortic-dissection-m1", t: "Arterial BP, HR continuously (titration targets per order)", s: "RN" },
        { id: "aortic-dissection-m2", t: "Neuro checks, lower-limb motor/sensory (spinal ischemia), limb pulses/perfusion q1h", s: "RN" },
        { id: "aortic-dissection-m3", t: "Pain trajectory (new/worsening pain = extension), abdominal exam, UOP", s: "RN" },
        { id: "aortic-dissection-m4", t: "Lactate, creatinine, Hgb per order", s: "ORDER" },
        { id: "aortic-dissection-m5", t: "Signs of tamponade (JVD, pulsus, hypotension)", s: "RN" }
      ],
      meds: [
        "VERIFY PER FACILITY PROTOCOL / ORDER. No infusion rates shown.",
        "Esmolol or labetalol (β-blocker FIRST) per order; non-DHP CCB if β-blocker contraindicated per provider",
        "Vasodilator after HR controlled: niCARdipine, clevidipine, nitroprusside per order",
        "IV opioid analgesia per order",
        "Blood products per order; avoid anticoagulants/antiplatelets/lytics"
      ],
      escalate: [
        "!Hypotension, shock, tamponade signs, new neuro deficit/paraplegia, limb or gut ischemia",
        "!Pain recurring/worsening, HR/BP not at target",
        "Any planned anticoagulant/lytic for 'ACS/stroke' with dissection features → stop and clarify"
      ]
    },
    {
      id: "resp-failure-intubation",
      name: "Acute respiratory failure: intubation & vent basics",
      category: "Respiratory",
      emergency: true,
      keywords: [
        "respiratory failure",
        "resp failure",
        "intubation",
        "intubate",
        "rsi",
        "airway",
        "ett",
        "et tube",
        "ventilator",
        "vent",
        "vent settings",
        "mechanical ventilation",
        "bipap",
        "cpap",
        "niv",
        "hfnc",
        "high flow",
        "hypoxia",
        "hypoxemia",
        "hypercapnia",
        "etomidate",
        "ketamine",
        "rocuronium",
        "roc",
        "succinylcholine",
        "sux",
        "paralytic",
        "sedation"
      ],
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
        { id: "resp-failure-intubation-a1", t: "!Call rapid response / provider / airway team early. Sit upright, O₂ via NRB or HFNC per protocol. Suction.", s: "RN" },
        { id: "resp-failure-intubation-a2", t: "Confirm code status/DNI and goals with provider (unless emergent per policy).", s: "RN" },
        { id: "resp-failure-intubation-a3", t: "Reversible causes per order: bronchospasm (albuterol), pulmonary edema (diuretic/nitrate/NIV), pneumothorax, secretions, opioid (naloxone).", s: "ORDER" },
        { id: "resp-failure-intubation-a4", t: "HFNC or NIV per provider (HFNC preferred for de novo hypoxemia; NIV for hypercapnic COPD/cardiogenic edema). Not if vomiting, falling GCS, shock, facial trauma. Reassess 30–60 min.", s: "ORDER" },
        { id: "resp-failure-intubation-a5", t: "Pre-intubation setup: IV ×2, monitor/waveform ETCO₂, BVM + PEEP valve, suction, video + direct laryngoscope, ETT + 1 size smaller, stylet/bougie, SGA/cric kit, vent ready.", s: "RN" },
        { id: "resp-failure-intubation-a6", t: "Resuscitate before intubating per order: fluids/pressor ready; preoxygenate 3–5 min (NRB + nasal cannula or NIV); apneic O₂ via NC; HOB up 20–30°.", s: "ORDER" },
        { id: "resp-failure-intubation-a7", t: "Anticipate/assist: RSI — induction agent + neuromuscular blocker chosen/dosed by intubating provider (reduced induction dose in shock). Drugs drawn up, labeled, double-checked.", s: "PROV" },
        { id: "resp-failure-intubation-a8", t: "Anticipate/assist: tube placement; cuff up; waveform ETCO₂ — flat/absent after 6 breaths = esophageal until proven otherwise; breath sounds; depth at teeth (≈21 cm F / 23 cm M).", s: "PROV" },
        { id: "resp-failure-intubation-a9", t: "!IMMEDIATELY after confirmation (before CXR/OG): start analgesia + sedation per order (paralyzed ≠ sedated); treat post-intubation hypotension per order.", s: "ORDER" },
        { id: "resp-failure-intubation-a10", t: "Secure ETT; cuff pressure 20–30 cmH₂O; OG tube per order; CXR per order (tip 2–5 cm above carina).", s: "RN" },
        { id: "resp-failure-intubation-a11", t: "Initial vent set by provider/RT: usual A/C volume, VT 6–8 mL/kg PBW, RR 14–20, PEEP 5, FiO₂ 100% → titrate. Asthma/COPD: RR 8–12, long expiration. ARDS: see ARDS card. RN: verify height/PBW, alarms.", s: "ORDER" },
        { id: "resp-failure-intubation-a12", t: "ABG 20–30 min after intubation per order. Bundle: HOB 30–45°, oral care, daily SAT/SBT, DVT/GI prophylaxis per orders.", s: "ORDER" }
      ],
      monitor: [
        { id: "resp-failure-intubation-m1", t: "Continuous SpO₂, waveform ETCO₂, ECG, BP (post-intubation hypotension common — q1–2 min first 15 min)", s: "RN" },
        { id: "resp-failure-intubation-m2", t: "Vent: peak & plateau pressures (plateau ≤30), VT/minute ventilation, RR, auto-PEEP, FiO₂/PEEP — report to RT/provider", s: "RN" },
        { id: "resp-failure-intubation-m3", t: "Breath sounds, chest rise, secretions, ETT depth and cuff leak", s: "RN" },
        { id: "resp-failure-intubation-m4", t: "Sedation depth (RASS) to ordered target, pain (CPOT/BPS), delirium (CAM-ICU)", s: "RN" },
        { id: "resp-failure-intubation-m5", t: "ABG/VBG, lactate; CXR; Na/K; triglycerides if on propofol", s: "ORDER" }
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
    },
    {
      id: "asthma-copd",
      name: "Severe asthma / COPD exacerbation & auto-PEEP",
      category: "Respiratory",
      emergency: true,
      keywords: [
        "asthma",
        "status asthmaticus",
        "copd",
        "aecopd",
        "copd exacerbation",
        "bronchospasm",
        "wheeze",
        "auto-peep",
        "autopeep",
        "intrinsic peep",
        "breath stacking",
        "dynamic hyperinflation",
        "albuterol",
        "duoneb",
        "ipratropium",
        "magnesium",
        "bipap",
        "niv",
        "permissive hypercapnia"
      ],
      warnings: [
        "Ventilated asthma/COPD + sudden hypotension/high pressures = AUTO-PEEP (or tension PTX): DISCONNECT from the vent briefly and let the chest deflate (gentle pressure on chest if trained); call provider/RT; check for tension PTX.",
        "Silent chest, drowsiness, exhaustion, rising CO₂ = impending arrest — do not be reassured by less wheeze.",
        "COPD oxygen target SpO₂ 88–92% (avoid hyperoxia/CO₂ retention); asthma target ~93–95% per order."
      ],
      glance: [
        "Severe bronchospasm: inhaled SABA + ipratropium, systemic steroids, IV magnesium (asthma) per order",
        "COPD: SpO₂ 88–92%; NIV early for hypercapnic acidosis per order",
        "On vent: low RR, long expiration, watch auto-PEEP; hypotension → disconnect & deflate"
      ],
      recognize: [
        "Dyspnea, wheeze or silent chest, accessory muscles, tripod posture, unable to speak full sentences, pulsus paradoxus",
        "Danger: drowsiness/confusion, exhaustion, cyanosis, normal-or-rising PaCO₂ in asthma, pH <7.35 in COPD",
        "Vent: high peak pressure with ↑ plateau, flow not returning to zero before next breath, rising auto-PEEP, falling BP",
        "Triggers: infection, allergen, smoke, med non-adherence, β-blockers/NSAIDs (asthma), PE/pneumothorax/HF mimics"
      ],
      actions: [
        { id: "asthma-copd-a1", t: "!Call provider/RT; sit upright; continuous SpO₂, cardiac monitor; ETCO₂ if available.", s: "RN" },
        { id: "asthma-copd-a2", t: "O₂ titrated: COPD SpO₂ 88–92%; asthma ~93–95% per order. ABG/VBG per order.", s: "ORDER" },
        { id: "asthma-copd-a3", t: "Inhaled short-acting β-agonist (albuterol) + ipratropium (nebulized/MDI, repeated or continuous) per order/RT protocol.", s: "ORDER" },
        { id: "asthma-copd-a4", t: "Systemic corticosteroid per order; IV magnesium sulfate for severe asthma per order (monitor BP, reflexes).", s: "ORDER" },
        { id: "asthma-copd-a5", t: "Refractory asthma: epinephrine IM/SC or other adjuncts per provider order only (confirm concentration).", s: "ORDER" },
        { id: "asthma-copd-a6", t: "Hypercapnic COPD (pH <7.35): NIV (BiPAP) per order — reassess in 1–2 h; worsening → intubation plan.", s: "ORDER" },
        { id: "asthma-copd-a7", t: "Anticipate/assist: intubation by most experienced operator (large ETT; ketamine often used); pressors ready — post-intubation hypotension common.", s: "PROV" },
        { id: "asthma-copd-a8", t: "Ventilator per order/RT: low RR, small VT, short inspiratory time/high flow, long expiratory time; permissive hypercapnia; minimal external PEEP per provider.", s: "ORDER" },
        { id: "asthma-copd-a9", t: "!Ventilated + sudden hypotension/high pressures: disconnect circuit briefly to let chest decompress, BVM slowly (low rate); check for tension PTX; call provider/RT.", s: "RN" },
        { id: "asthma-copd-a10", t: "Deep sedation/analgesia per order after intubation; avoid paralysis if possible (myopathy with steroids) — only per provider.", s: "ORDER" },
        { id: "asthma-copd-a11", t: "Antibiotics if bacterial COPD exacerbation per order; avoid sedatives in non-intubated hypercapnic patient unless ordered.", s: "RN" }
      ],
      monitor: [
        { id: "asthma-copd-m1", t: "RR, work of breathing, speech, mental status, SpO₂ continuously", s: "RN" },
        { id: "asthma-copd-m2", t: "ABG/VBG trend (PaCO₂, pH) per order; K (β-agonists/steroids lower K), glucose, lactate (β-agonist-related)", s: "ORDER" },
        { id: "asthma-copd-m3", t: "Vent: peak & plateau pressure, auto-PEEP (expiratory hold with RT), flow waveform, BP after vent changes", s: "RN" },
        { id: "asthma-copd-m4", t: "HR/arrhythmia (β-agonists); BP during magnesium", s: "RN" },
        { id: "asthma-copd-m5", t: "NIV tolerance, mask leak/skin, aspiration risk", s: "RN" }
      ],
      meds: [
        "VERIFY PER FACILITY PROTOCOL / ORDER.",
        "Albuterol (SABA) + ipratropium inhaled, intermittent or continuous per order/RT",
        "Systemic corticosteroid (e.g., methylPREDNISolone IV / predniSONE PO) per order",
        "Magnesium sulfate IV (severe asthma) per order",
        "Epinephrine (asthma adjunct; IM 1 mg/mL ≠ IV 0.1 mg/mL) per provider order · ketamine for intubation/sedation per provider",
        "Antibiotics for bacterial COPD exacerbation per order"
      ],
      escalate: [
        "!Silent chest, AMS, exhaustion, SpO₂ falling despite O₂, rising PaCO₂ / pH falling",
        "!Ventilated: hypotension, rising plateau/auto-PEEP, suspected pneumothorax",
        "NIV failure at reassessment; refractory bronchospasm → ICU/intensivist (ECMO center for refractory)"
      ]
    },
    {
      id: "ards",
      name: "ARDS",
      category: "Respiratory",
      emergency: false,
      keywords: [
        "ards",
        "acute respiratory distress syndrome",
        "lung protective",
        "lung-protective ventilation",
        "low tidal volume",
        "prone",
        "proning",
        "peep",
        "ardsnet",
        "plateau",
        "driving pressure",
        "p/f",
        "pf ratio",
        "refractory hypoxemia",
        "ecmo",
        "vv-ecmo",
        "paralytic",
        "nmb",
        "cisatracurium"
      ],
      warnings: [
        "Neuromuscular blockade is NOT routine (ATS 2024 / SSC 2026): intensivist order only, intermittent boluses preferred; never paralyze without analgesia + deep sedation; eye care, TOF; HIGH-ALERT.",
        "NO routine recruitment maneuvers; never perform sustained high-pressure inflation (e.g., ≥35 cmH₂O for ≥60 s) — hypotension/barotrauma. Vent changes by provider/RT.",
        "Inhaled pulmonary vasodilators (nitric oxide/epoprostenol): never interrupt abruptly (rebound) — ensure backup supply."
      ],
      glance: [
        "Severe hypoxemia + bilateral infiltrates not explained by heart failure/fluid overload",
        "Lung-protective vent (per order): VT 6 mL/kg PBW (4–8), plateau ≤30 cmH₂O, PEEP per ARDSNet table/protocol",
        "P/F <150 on FiO₂ ≥0.6 → prone >12 h/day (16 h sessions); lightest effective sedation; ECMO-center discussion if refractory"
      ],
      recognize: [
        "Acute onset (≤1 week of known insult: sepsis, pneumonia, aspiration, pancreatitis, trauma, transfusion)",
        "Bilateral opacities on CXR/CT; respiratory failure not fully explained by cardiac failure/fluid",
        "Berlin: P/F (PEEP ≥5) 200–300 mild · 100–200 moderate · ≤100 severe (2023 Global definition also allows HFNC ≥30 L/min, SpO₂/FiO₂ ≤315 — verify)",
        "Refractory hypoxemia, ↓ compliance, high plateau pressure"
      ],
      actions: [
        { id: "ards-a1", t: "!Notify provider/RT; anticipate diagnosis work-up (CXR, ABG, echo to exclude cardiogenic edema).", s: "RN" },
        { id: "ards-a2", t: "Verify PBW from measured HEIGHT & sex (Quick tools) is entered; VT 6 mL/kg PBW (4–8) per order; RR up to 35 per order to hold minute ventilation.", s: "RN" },
        { id: "ards-a3", t: "Plateau ≤30 cmH₂O (check q4h and with changes with RT); driving pressure (plateau − PEEP) aim <15. Plateau >30 → call.", s: "RN" },
        { id: "ards-a4", t: "Oxygen targets SpO₂ 88–95% (PaO₂ 55–80). PEEP/FiO₂ per ARDSNet lower- or higher-PEEP table per protocol (higher PEEP often preferred in moderate–severe if compliance improves).", s: "ORDER" },
        { id: "ards-a5", t: "pH goal 7.30–7.45; permissive hypercapnia acceptable. pH <7.30 → RT/provider adjust RR (max 35); pH <7.15 → call now.", s: "ORDER" },
        { id: "ards-a6", t: "Treat the cause per order (antibiotics, source control, stop transfusion).", s: "ORDER" },
        { id: "ards-a7", t: "Lightest sedation that allows lung-protective ventilation; analgesia first (PADIS). Deeper target only if ordered.", s: "ORDER" },
        { id: "ards-a8", t: "NMB only on intensivist order (severe early ARDS, refractory dyssynchrony, high plateau despite sedation) — boluses preferred, short course; analgesia + deep sedation first; eye care, TOF.", s: "ORDER" },
        { id: "ards-a9", t: "Prone per order (P/F <150, FiO₂ ≥0.6, PEEP ≥5, ideally early): proning team protocol, 4–5 staff, secure ETT/lines/drains, protect eyes/face/pressure points. Arrest while prone → per unit policy.", s: "ORDER" },
        { id: "ards-a10", t: "Conservative fluids / active fluid removal once perfusion is stable, per order.", s: "ORDER" },
        { id: "ards-a11", t: "Anticipate/assist rescue: inhaled pulmonary vasodilator trial, VV-ECMO referral (experienced center) for refractory hypoxemia/hypercapnia despite optimization.", s: "PROV" }
      ],
      monitor: [
        { id: "ards-m1", t: "SpO₂, ABG/P/F trend; plateau & driving pressure, compliance q4h (with RT)", s: "RN" },
        { id: "ards-m2", t: "Hemodynamics (high PEEP and proning can drop BP/preload)", s: "RN" },
        { id: "ards-m3", t: "Net fluid balance, weights; renal function", s: "RN" },
        { id: "ards-m4", t: "Prone: skin/pressure injuries, ETT position, eyes; tube-feed tolerance", s: "RN" },
        { id: "ards-m5", t: "Sedation (RASS), pain (CPOT), TOF if on NMB, glucose, delirium (CAM-ICU)", s: "RN" }
      ],
      meds: [
        "VERIFY PER FACILITY PROTOCOL / ORDER. No infusion doses shown.",
        "Analgesia/sedation per order: fentanyl, propofol, dexmedetomidine (avoid benzodiazepines if possible)",
        "Neuromuscular blocker (e.g., cisatracurium) — not routine; intensivist order; intermittent boluses preferred; HIGH-ALERT",
        "Antibiotics for cause · diuretic once stable · inhaled pulmonary vasodilators per ICU/pharmacy order (rescue; no proven mortality benefit)",
        "Corticosteroids: suggested in ARDS (ATS 2024 / SSC 2026) — drug, dose, route, duration per provider/protocol; monitor glucose",
        "Stress ulcer & VTE prophylaxis per orders"
      ],
      escalate: [
        "!P/F <150 despite optimization → proning decision, intensivist now",
        "!Severe refractory hypoxemia or hypercapnic acidosis despite optimized ventilation → intensivist; early ECMO-center discussion (EOLIA-type criteria per provider)",
        "Plateau >30 or driving pressure >15 → provider/RT",
        "New pneumothorax, hemodynamic collapse, or sudden desaturation → treat immediately (see Tension pneumothorax / Vent alarms)"
      ]
    },
    {
      id: "sepsis",
      name: "Sepsis / septic shock",
      category: "Shock",
      emergency: true,
      keywords: [
        "sepsis",
        "septic",
        "septic shock",
        "infection",
        "sepsis bundle",
        "sep-1",
        "lactate",
        "cultures",
        "blood cultures",
        "antibiotics",
        "abx",
        "norepinephrine",
        "levophed",
        "norepi",
        "vasopressin",
        "vaso",
        "pressor",
        "fluids",
        "bolus",
        "ssc",
        "news2",
        "mews",
        "sirs",
        "map",
        "hydrocortisone"
      ],
      warnings: [
        "Do not rely on qSOFA alone to screen for sepsis (SSC 2026) — use the unit's NEWS2/MEWS/SIRS tool plus clinical judgment.",
        "Vasopressors are HIGH-ALERT: dose, concentration and units per order/pump library (vasopressin units/min vs units/h = 60× error; dose differs by indication).",
        "Peripheral norepinephrine only per facility policy: large proximal vein, site check at least hourly, central access ASAP; extravasation → stop, leave catheter, aspirate, call, extravasation protocol (antidote e.g., phentolamine only per order)."
      ],
      glance: [
        "Suspect infection + organ dysfunction/hypotension → sepsis alert per protocol NOW; note time zero",
        "Lactate + blood cultures ×2 → antibiotics per order within 1 h for shock/probable sepsis (don't delay >45 min for cultures)",
        "Fluids per order (commonly 30 mL/kg; individualize, reassess); vasopressor per order if MAP below goal (usually <65)"
      ],
      recognize: [
        "Screen: unit's NEWS2/MEWS/SIRS alert + judgment. Organ dysfunction: new AMS, SBP <100/MAP <65, RR ≥22, SpO₂ ↓, oliguria, ↑creatinine/bilirubin, ↓platelets, lactate ↑",
        "Fever or hypothermia, tachycardia, WBC ↑/↓, bandemia; mottled skin, cap refill >3 s",
        "Septic SHOCK: vasopressor need to keep MAP ≥65 AND lactate >2 mmol/L despite adequate fluids",
        "Normal vitals don't exclude sepsis: older, immunosuppressed, cirrhosis, β-blocked pts may not mount fever/tachycardia"
      ],
      actions: [
        { id: "sepsis-a1", t: "!Call provider/rapid response; initiate sepsis alert per protocol. Note time zero.", s: "RN" },
        { id: "sepsis-a2", t: "Lactate per protocol (venous OK); remeasure in 2–4 h if initial >2 mmol/L.", s: "ORDER" },
        { id: "sepsis-a3", t: "Blood cultures ×2 (different sites) BEFORE antibiotics if no significant delay (<45 min); other sources (urine, sputum, lines, wound) per order.", s: "ORDER" },
        { id: "sepsis-a4", t: "Antibiotics per order within 1 h for shock/probable sepsis (possible sepsis without shock: rapid assessment, within 3 h if concern persists). First dose = full dose, given first.", s: "ORDER" },
        { id: "sepsis-a5", t: "Allergy listed? Call pharmacy/provider NOW so the first dose isn't delayed — don't give the listed drug until cleared or an alternative is chosen.", s: "RN" },
        { id: "sepsis-a6", t: "Large-bore IV ×2 (or IO) per protocol. Crystalloid boluses per order (balanced preferred; commonly 30 mL/kg — ideal/adjusted weight if BMI >30; smaller in HF/ESRD; saline in TBI).", s: "ORDER" },
        { id: "sepsis-a7", t: "Reassess perfusion after each bolus (BP, cap refill, UOP, lactate, passive leg raise, dynamic indices); report fluid intolerance (crackles, ↑O₂ need).", s: "RN" },
        { id: "sepsis-a8", t: "Vasopressor if MAP below ordered goal (usually 65; 60–65 may be ordered if ≥65 y) — norepinephrine first-line; start early (peripheral per policy) rather than wait for all fluids.", s: "ORDER" },
        { id: "sepsis-a9", t: "Anticipate/assist: arterial line for escalating pressors; central line. Foley and hourly UOP per order.", s: "PROV" },
        { id: "sepsis-a10", t: "Anticipate/assist: source control ASAP, ideally within 6 h (drain abscess, remove infected line/device, surgical consult).", s: "PROV" },
        { id: "sepsis-a11", t: "Escalating norepinephrine: vasopressin add-on and IV hydrocortisone per order (monitor glucose); epinephrine if MAP still inadequate.", s: "ORDER" },
        { id: "sepsis-a12", t: "Glucose 140–180 (insulin if ≥180 per protocol); VTE prophylaxis (LMWH preferred); stress ulcer prophylaxis if risk; daily antibiotic review/de-escalation.", s: "ORDER" }
      ],
      monitor: [
        { id: "sepsis-m1", t: "MAP to ordered goal (art line), HR, cap refill, mottling", s: "RN" },
        { id: "sepsis-m2", t: "Lactate q2–4 h until normalizing", s: "ORDER" },
        { id: "sepsis-m3", t: "UOP ≥0.5 mL/kg/h; creatinine; fluid balance (avoid overload after resuscitation)", s: "RN" },
        { id: "sepsis-m4", t: "SpO₂/P:F ratio; ventilation needs; mental status", s: "RN" },
        { id: "sepsis-m5", t: "Temp, WBC, cultures, procalcitonin per provider; line sites", s: "ORDER" },
        { id: "sepsis-m6", t: "Pressor requirement trend, infusion site (hourly if peripheral), platelets/coags (DIC), glucose", s: "RN" }
      ],
      meds: [
        "VERIFY PER FACILITY PROTOCOL / ORDER (SSC 2026). No vasopressor doses shown — per order/pump library.",
        "Antibiotics per facility sepsis pathway/allergies — first dose ASAP, full dose (renal adjustment applies to later doses); β-lactams: prolonged infusion after loading dose per order",
        "Crystalloid (balanced preferred over 0.9% saline, except TBI) per order; albumin after large volumes per provider (avoid in TBI)",
        "Norepinephrine — first-line vasopressor, titrate to ordered MAP (HIGH-ALERT)",
        "Vasopressin add-on (fixed rate per order; units/min) · epinephrine second-line · DOBUTamine if cardiac dysfunction — per order",
        "Hydrocortisone IV for ongoing vasopressor requirement — dose per order; monitor glucose",
        "Bicarbonate: not for lactic acidosis to improve hemodynamics; only pH ≤7.2 with AKI stage 2–3 per provider"
      ],
      escalate: [
        "!MAP below goal after fluids + rising pressor requirement, lactate not clearing, new organ failure",
        "!Source needing procedure (abscess, necrotizing infection, obstructed system, perforation)",
        "Escalate to ICU attending/intensivist; ECMO/CRRT per course",
        "Antibiotic delay >1 h for any reason (access, allergy, supply) → pharmacy/provider NOW"
      ]
    },
    {
      id: "spinal-cord-injury",
      name: "Acute spinal cord injury / neurogenic shock / autonomic dysreflexia",
      category: "Neuro",
      emergency: false,
      keywords: [
        "sci",
        "spinal cord injury",
        "spine injury",
        "cervical spine",
        "c-spine",
        "neurogenic shock",
        "spinal shock",
        "autonomic dysreflexia",
        "ad",
        "quadriplegia",
        "tetraplegia",
        "paraplegia",
        "log roll",
        "hypotension bradycardia",
        "map goal"
      ],
      warnings: [
        "Neurogenic shock (injury ≥T6): hypotension + BRADYCARDIA + warm skin — but exclude hemorrhage first in trauma.",
        "Succinylcholine: avoid after ~48–72 h post-injury (life-threatening hyperkalemia) — tell anesthesia/provider the injury date.",
        "Autonomic dysreflexia (injury ≥T6): sudden severe HTN + headache + bradycardia → sit up, remove trigger (bladder/bowel/skin), call provider."
      ],
      glance: [
        "Spinal precautions (log-roll, collar per order); airway/ventilation watch in high cervical injury",
        "Neurogenic shock: fluids then vasopressor to ordered MAP goal (elevated for several days per order); atropine/pacing for bradycardia per order",
        "Autonomic dysreflexia: sit up, find & remove trigger (bladder first), BP q2–5 min"
      ],
      recognize: [
        "Motor/sensory loss below level, priapism, loss of rectal tone, diaphragmatic breathing (C3–5)",
        "Neurogenic shock: hypotension, bradycardia, warm dry extremities, poikilothermia",
        "Respiratory failure: falling vital capacity/NIF, weak cough, rising CO₂ (high cervical lesions; can worsen over days)",
        "Autonomic dysreflexia: severe HTN, pounding headache, flushing/sweating above lesion, pale/cool below, bradycardia, nasal congestion"
      ],
      actions: [
        { id: "spinal-cord-injury-a1", t: "!Call provider for hypotension, bradycardia, respiratory decline, neuro level change.", s: "RN" },
        { id: "spinal-cord-injury-a2", t: "Spinal precautions: log-roll with enough staff, collar/positioning per order; pressure injury prevention.", s: "RN" },
        { id: "spinal-cord-injury-a3", t: "Respiratory: monitor VC/NIF per order (RT); suction, assisted cough; O₂ per order.", s: "ORDER" },
        { id: "spinal-cord-injury-a4", t: "Anticipate/assist: early intubation for high cervical injury/respiratory fatigue (in-line stabilization; avoid succinylcholine after ~48–72 h).", s: "PROV" },
        { id: "spinal-cord-injury-a5", t: "Hypotension: exclude/treat bleeding; fluids per order; vasopressor (e.g., norepinephrine) to ordered MAP goal and duration.", s: "ORDER" },
        { id: "spinal-cord-injury-a6", t: "Bradycardia (suctioning/turning triggers): atropine per order; pacing per provider; pre-oxygenate before suctioning.", s: "ORDER" },
        { id: "spinal-cord-injury-a7", t: "Bladder: urinary catheter/intermittent cath per order (retention triggers AD); bowel program per order.", s: "RN" },
        { id: "spinal-cord-injury-a8", t: "Autonomic dysreflexia: sit upright/legs down, loosen clothing/devices, check bladder (kinked catheter, distension) then bowel/skin; BP q2–5 min.", s: "RN" },
        { id: "spinal-cord-injury-a9", t: "AD with persistent severe HTN after trigger removal: fast-acting antihypertensive per order; watch rebound hypotension.", s: "ORDER" },
        { id: "spinal-cord-injury-a10", t: "VTE prophylaxis and GI prophylaxis per order; temperature management (poikilothermia).", s: "ORDER" }
      ],
      monitor: [
        { id: "spinal-cord-injury-m1", t: "MAP/HR continuously (arterial line); bradycardia with suction/turns", s: "RN" },
        { id: "spinal-cord-injury-m2", t: "Motor/sensory level per order (ASIA/ISNCSCI exam by trained staff)", s: "RN" },
        { id: "spinal-cord-injury-m3", t: "VC/NIF, ABG per order; SpO₂, RR, cough strength", s: "ORDER" },
        { id: "spinal-cord-injury-m4", t: "Bladder volume/UOP, bowel function, skin q2h", s: "RN" },
        { id: "spinal-cord-injury-m5", t: "Temperature; DVT signs; AD symptoms in chronic SCI", s: "RN" }
      ],
      meds: [
        "VERIFY PER FACILITY PROTOCOL / ORDER. No infusion rates shown.",
        "Vasopressor (norepinephrine; phenylephrine may worsen bradycardia) per order to MAP goal",
        "Atropine 1 mg IV (0.1 mg/mL syringe) for symptomatic bradycardia if ordered (q3–5 min, max 3 mg)",
        "Short-acting antihypertensive for autonomic dysreflexia per order",
        "VTE prophylaxis per order; steroids NOT routine (provider decision only)"
      ],
      escalate: [
        "!Respiratory decline (VC/NIF falling, rising CO₂), ascending neuro level",
        "!MAP below goal despite therapy; symptomatic bradycardia/asystole",
        "Autonomic dysreflexia not resolving after trigger removal"
      ]
    },
    {
      id: "dka",
      name: "Diabetic ketoacidosis (DKA)",
      category: "Metabolic/Renal",
      emergency: false,
      keywords: [
        "dka",
        "diabetic ketoacidosis",
        "ketoacidosis",
        "diabetes",
        "insulin drip",
        "insulin infusion",
        "potassium",
        "k",
        "kcl",
        "anion gap",
        "beta-hydroxybutyrate",
        "bhb",
        "ketones",
        "hyperglycemia",
        "euglycemic dka",
        "sglt2",
        "kussmaul"
      ],
      warnings: [
        "K⁺ <3.5 mmol/L → HOLD insulin and replace K⁺ first (ADA/EASD 2024). Check K⁺ BEFORE starting insulin.",
        "IV potassium is HIGH-ALERT: rate/concentration per order and facility policy only; higher rates need central or secure large vein + continuous ECG + pump; independent double check; never IV push.",
        "IV insulin is HIGH-ALERT: per DKA order set, standard concentration, smart-pump library, independent double check of weight and rate.",
        "Do not stop the insulin infusion on glucose alone — add dextrose and continue until ketoacidosis resolves; overlap SC basal insulin before stopping."
      ],
      glance: [
        "Check K⁺ BEFORE insulin: K⁺ <3.5 → hold insulin, replace K⁺ first per order",
        "Fluids first (isotonic, rate per order), then IV insulin infusion per DKA order set (HIGH-ALERT)",
        "Hourly glucose; add dextrose when glucose <250 mg/dL; continue insulin until ketones <0.6 AND pH ≥7.3 or HCO₃ ≥18"
      ],
      recognize: [
        "2024 consensus: glucose ≥200 mg/dL (or known diabetes) + ketones (BHB ≥3.0 mmol/L or urine ketones ≥2+) + pH <7.3 and/or HCO₃ <18",
        "Euglycemic DKA (glucose <200, esp. SGLT2 inhibitors, pregnancy, starvation) — still DKA",
        "Polyuria/polydipsia, N/V, abdominal pain, Kussmaul breathing, fruity breath, dehydration, AMS",
        "Triggers: missed insulin, infection, MI, stroke, pancreatitis, steroids, SGLT2i, pregnancy",
        "Total body K⁺ is depleted even if serum K⁺ normal/high. Osm >320 + marked hyperglycemia → consider mixed DKA/HHS (see HHS card)"
      ],
      actions: [
        { id: "dka-a1", t: "!Call provider; cardiac monitor; 2 IVs per protocol.", s: "RN" },
        { id: "dka-a2", t: "Labs per order: BMP (K⁺!), glucose, β-hydroxybutyrate, VBG/ABG, lactate, Mg, Phos, osm, CBC, UA, ECG; cultures if febrile.", s: "ORDER" },
        { id: "dka-a3", t: "Fluids per order: isotonic crystalloid at ordered rate (initial rate per protocol; slower in HF/CKD/elderly), then guided by hydration, Na, UOP.", s: "ORDER" },
        { id: "dka-a4", t: "POTASSIUM per DKA order set: K⁺ <3.5 → insulin HELD, K⁺ replaced at ordered rate (line/ECG/pump safeguards) until >3.5. K⁺ 3.5–5.0 → K⁺ in IV fluids as ordered. K⁺ ≥5.0 → no K⁺; recheck.", s: "ORDER" },
        { id: "dka-a5", t: "INSULIN only once K⁺ ≥3.5: regular insulin IV infusion per DKA order set (weight-based fixed rate; HIGH-ALERT double check). Report if glucose not falling as expected.", s: "ORDER" },
        { id: "dka-a6", t: "Glucose hourly. Glucose <250 mg/dL → dextrose-containing fluid added and insulin rate reduced per protocol — keep insulin running.", s: "ORDER" },
        { id: "dka-a7", t: "Bicarbonate only if pH <7.0, per provider order (K⁺ monitoring). Phosphate only per provider order (state units — mg/dL vs mmol/L).", s: "ORDER" },
        { id: "dka-a8", t: "Find and treat the trigger per order (antibiotics, ACS work-up, stop SGLT2i).", s: "ORDER" },
        { id: "dka-a9", t: "NPO until improving; antiemetic per order; strict I&O; Foley if ordered.", s: "ORDER" },
        { id: "dka-a10", t: "Resolution (2024): ketones (BHB) <0.6 mmol/L AND (pH ≥7.3 or HCO₃ ≥18). SC basal insulin given and overlapped 1–2 h BEFORE infusion stopped, per order.", s: "ORDER" }
      ],
      monitor: [
        { id: "dka-m1", t: "Glucose q1h; K⁺ 2 h after insulin starts then per protocol (e.g., q2–4h); BMP, VBG pH, BHB per order", s: "ORDER" },
        { id: "dka-m2", t: "Continuous ECG (K⁺ shifts); UOP, I&O, vitals, mentation; IV site if K⁺ peripheral", s: "RN" },
        { id: "dka-m3", t: "Hypoglycemia & hypokalemia (most common treatment complications); cerebral edema: headache, drop in GCS, bradycardia (rare in adults)", s: "RN" },
        { id: "dka-m4", t: "Fluid overload in heart/renal disease; hyperchloremic (non-gap) acidosis", s: "RN" },
        { id: "dka-m5", t: "Mg, Phos, Na (corrected Na = Na + 1.6 × [glucose − 100]/100)", s: "ORDER" }
      ],
      meds: [
        "VERIFY PER FACILITY DKA ORDER SET. No numeric insulin or potassium rates shown (HIGH-ALERT).",
        "Isotonic crystalloid per order (balanced or 0.9% NaCl); rate individualized",
        "Regular insulin IV infusion per order set — standard concentration, pump library, double check; not before K⁺ ≥3.5",
        "Potassium chloride per order set (in fluids or separate infusion) — rate/line/ECG per policy",
        "Dextrose 5–10% added when glucose <250 mg/dL per protocol",
        "Sodium bicarbonate only if pH <7.0, per provider · phosphate only per provider order",
        "Basal SC insulin at transition (overlap before stopping infusion)"
      ],
      escalate: [
        "!K⁺ <3.5 or >5.0 at any check · pH <7.0 · AMS/GCS drop · glucose not falling · shock",
        "!Headache or neuro decline during treatment → possible cerebral edema",
        "Ketones not clearing / acidosis not resolving after 6–12 h · recurrent ketosis · pregnancy"
      ]
    },
    {
      id: "hhs",
      name: "Hyperosmolar hyperglycemic state (HHS)",
      category: "Metabolic/Renal",
      emergency: false,
      keywords: [
        "hhs",
        "hhns",
        "hyperosmolar",
        "hyperosmolar hyperglycemic state",
        "hyperglycemia",
        "high blood sugar",
        "high glucose",
        "osmolality",
        "osm",
        "dehydration",
        "insulin drip",
        "mixed dka hhs"
      ],
      warnings: [
        "Insulin infusion is HIGH-ALERT — rate per protocol/order only; independent double check; fluids come FIRST in HHS (insulin may be delayed until glucose stops falling with fluids per protocol).",
        "Check K before insulin: HOLD insulin and notify if K <3.5 mmol/L (ADA/EASD 2024) — replace K per protocol first.",
        "Avoid rapid falls in glucose/osmolality/sodium (cerebral edema, osmotic demyelination) — report rates of change outside the ordered targets."
      ],
      glance: [
        "Glucose very high (often >600 mg/dL), osmolality >300 mOsm/kg, profound dehydration, AMS — minimal ketosis/acidosis",
        "Isotonic fluid resuscitation FIRST per order; K check before insulin; insulin per protocol",
        "Slow, controlled correction; hourly glucose; VTE prophylaxis; find the trigger (infection, MI, stroke, drugs)"
      ],
      recognize: [
        "Days of polyuria/polydipsia, weakness, weight loss; older adults; often new/untreated type 2 diabetes",
        "Glucose usually >600 mg/dL (>33.3 mmol/L); effective osmolality >300 mOsm/kg; pH ≥7.3, HCO₃ ≥15, ketones minimal (ADA/EASD 2024) — mixed DKA/HHS common",
        "Severe dehydration: tachycardia, hypotension, dry mucosa, AKI; neuro: confusion → coma, focal deficits, seizures",
        "Triggers: infection/sepsis, MI, stroke, steroids, thiazides, antipsychotics, SGLT2i, missed insulin"
      ],
      actions: [
        { id: "hhs-a1", t: "!Notify provider; ABCs; airway protection if GCS ≤8 (see Resp failure).", s: "RN" },
        { id: "hhs-a2", t: "2 large-bore IVs; cardiac monitor; strict I&O; urinary catheter per order/policy; seizure & fall precautions.", s: "RN" },
        { id: "hhs-a3", t: "Labs per order: glucose, BMP (Na, K, Cl, HCO₃, BUN/Cr), calculated/measured osmolality, VBG/ABG, ketones (β-hydroxybutyrate), Mg, Phos, CBC, lactate, cultures, troponin, ECG.", s: "ORDER" },
        { id: "hhs-a4", t: "Isotonic crystalloid resuscitation per order/protocol (volume and fluid choice per provider; caution in HF/ESKD).", s: "ORDER" },
        { id: "hhs-a5", t: "K replacement per protocol (concentration/rate limits, pump, central line per policy). HOLD insulin and notify if K <3.5.", s: "ORDER" },
        { id: "hhs-a6", t: "Insulin per HHS/DKA protocol (often started after fluids; rate per order); hourly POC glucose; add dextrose per protocol when glucose falls to the protocol threshold.", s: "ORDER" },
        { id: "hhs-a7", t: "Report glucose fall faster than ordered target, falling/rising corrected Na outside target, or any neuro decline immediately.", s: "RN" },
        { id: "hhs-a8", t: "VTE prophylaxis per order (high thrombosis risk); treat trigger (antibiotics, cardiac work-up) per order.", s: "ORDER" },
        { id: "hhs-a9", t: "Neuro checks q1h (GCS, pupils) during correction.", s: "RN" },
        { id: "hhs-a10", t: "Transition to SC basal insulin per protocol, overlapping before stopping the infusion.", s: "ORDER" }
      ],
      monitor: [
        { id: "hhs-m1", t: "POC glucose q1h while on insulin infusion", s: "RN" },
        { id: "hhs-m2", t: "BMP/K, osmolality, corrected Na q2–4h per order; Mg, Phos", s: "ORDER" },
        { id: "hhs-m3", t: "Hourly I&O, fluid balance, signs of overload (crackles, SpO₂, edema)", s: "RN" },
        { id: "hhs-m4", t: "Neuro status q1h; cardiac rhythm (K shifts)", s: "RN" },
        { id: "hhs-m5", t: "Skin/pressure injury and VTE signs (immobile, dehydrated)", s: "RN" }
      ],
      meds: [
        "VERIFY PER FACILITY PROTOCOL / ORDER. No infusion rates shown.",
        "Isotonic crystalloid (0.9% saline or balanced crystalloid) per order",
        "Regular insulin IV infusion (HIGH-ALERT) per HHS/DKA protocol",
        "Potassium chloride/phosphate per protocol (HIGH-ALERT concentrated electrolytes)",
        "Dextrose-containing fluids when glucose reaches protocol threshold · VTE prophylaxis per order"
      ],
      escalate: [
        "!GCS decline, seizure, new focal deficit, or airway concern",
        "!Hypotension despite fluids, arrhythmia, K <3.5 or >6.0 mmol/L",
        "Oliguria/rising creatinine, glucose falling faster than ordered, Na change outside ordered limit"
      ]
    },
    {
      id: "hypoglycemia",
      name: "Hypoglycemia (severe / ICU)",
      category: "Metabolic/Renal",
      emergency: true,
      keywords: [
        "hypoglycemia",
        "hypoglycemic",
        "low blood sugar",
        "low glucose",
        "low bg",
        "dextrose",
        "d50",
        "d10",
        "glucagon",
        "insulin",
        "sulfonylurea",
        "octreotide",
        "glucose",
        "sugar"
      ],
      warnings: [
        "Dextrose concentration: confirm D50 vs D10 on the syringe/bag. D50 is hypertonic — patent large vein only (central if available), flush, watch site; D10 preferred where available.",
        "Never delay dextrose for thiamine — give thiamine with or right after in at-risk patients.",
        "Octreotide for sulfonylurea hypoglycemia = immediate-release injection, NOT depot/LAR."
      ],
      glance: [
        "Glucose <70 mg/dL (level 2 <54; level 3 = altered mentation needing help). Treat FIRST, then investigate",
        "Alert + can swallow safely: 15–20 g fast carbs, recheck in 15 min",
        "Cannot take PO AND has IV: IV dextrose per protocol (D50 25 g or D10) — no IV: glucagon IM/SC; pause insulin"
      ],
      recognize: [
        "Sweating, tremor, tachycardia, hunger, anxiety; confusion, seizure, coma, focal deficit mimicking stroke",
        "ICU masks: sedation, β-blockers, critical illness — check POC glucose with any unexplained change",
        "ICU causes: insulin infusion/over-correction, sulfonylureas, ↓ feeds/TPN/steroid change, sepsis, adrenal insufficiency, liver/renal failure, alcohol"
      ],
      actions: [
        { id: "hypoglycemia-a1", t: "Check glucose (POC; confirm on blood sample if unexpected). Pause insulin infusion per hypoglycemia protocol; stay with pt.", s: "RN" },
        { id: "hypoglycemia-a2", t: "!Call provider if severe, unresponsive, seizing, on insulin infusion for DKA/HHS, or cause unclear.", s: "RN" },
        { id: "hypoglycemia-a3", t: "ALERT & can swallow safely: 15–20 g fast carbohydrate (4 oz juice or 3–4 glucose tabs) per protocol. Recheck in 15 min; repeat until ≥70, then snack/meal.", s: "ORDER" },
        { id: "hypoglycemia-a4", t: "Cannot safely take PO AND has IV/IO: dextrose per hypoglycemia protocol — D50 25 g (50 mL of 50%) slow IV push via large vein, or D10 125–250 mL (12.5–25 g). Confirm concentration.", s: "ORDER" },
        { id: "hypoglycemia-a5", t: "No IV access: glucagon 1 mg IM/SC (or 3 mg intranasal) per protocol. Less effective in starvation/liver disease/alcohol — get IV.", s: "ORDER" },
        { id: "hypoglycemia-a6", t: "Recheck glucose in 15 min and repeatedly until stable ≥70 — repeat treatment per protocol if still low.", s: "RN" },
        { id: "hypoglycemia-a7", t: "Prolonged risk (insulin/sulfonylurea): dextrose-containing infusion per order.", s: "ORDER" },
        { id: "hypoglycemia-a8", t: "Alcohol/malnutrition: thiamine IV per order with or right after dextrose — do not delay dextrose.", s: "ORDER" },
        { id: "hypoglycemia-a9", t: "DKA/HHS on insulin: insulin paused only per protocol with dextrose given; provider decides early restart (ketosis persists).", s: "ORDER" },
        { id: "hypoglycemia-a10", t: "Sulfonylurea-induced: expect recurrent lows 24–72 h; octreotide (immediate-release) per order; frequent glucose checks.", s: "ORDER" },
        { id: "hypoglycemia-a11", t: "Find cause; review insulin orders; check tube feeds/TPN/steroids running as ordered; document.", s: "RN" }
      ],
      monitor: [
        { id: "hypoglycemia-m1", t: "Glucose q15 min until ≥70 ×2, then q1h ×4–6h per protocol (longer for sulfonylurea / long-acting insulin)", s: "RN" },
        { id: "hypoglycemia-m2", t: "Mental status, seizure activity; vitals", s: "RN" },
        { id: "hypoglycemia-m3", t: "Rebound hyperglycemia after D50 is common — avoid over-treating (>180)", s: "RN" },
        { id: "hypoglycemia-m4", t: "Nutrition status: tube feeds/TPN running? steroids changed?", s: "RN" },
        { id: "hypoglycemia-m5", t: "Renal/hepatic function, cortisol if no clear cause", s: "ORDER" }
      ],
      meds: [
        "VERIFY PER FACILITY HYPOGLYCEMIA PROTOCOL / ORDER. Typical adult published doses — give only per protocol/order.",
        "Oral fast carbohydrate 15–20 g",
        "Dextrose 50% 25 g (50 mL) slow IV push via large vein · Dextrose 10% 125–250 mL (12.5–25 g)",
        "Glucagon 1 mg IM/SC (IV per order) or 3 mg intranasal — may cause vomiting",
        "Thiamine IV if at risk (with/after dextrose) — per order",
        "Octreotide (immediate-release, not LAR) for sulfonylurea hypoglycemia — per order",
        "Hydrocortisone if adrenal insufficiency suspected — per provider"
      ],
      escalate: [
        "!Glucose <54 not responding after 2 treatments · persistent AMS · seizure",
        "Suspected sulfonylurea or long-acting insulin overdose",
        "Recurrent hypoglycemia on insulin protocol — review protocol/orders with provider"
      ]
    },
    {
      id: "sodium-emergencies",
      name: "Sodium emergencies (severe hypo- / hypernatremia)",
      category: "Metabolic/Renal",
      emergency: false,
      keywords: [
        "sodium",
        "na",
        "hyponatremia",
        "low sodium",
        "hypernatremia",
        "high sodium",
        "3% saline",
        "hypertonic saline",
        "siadh",
        "osmotic demyelination",
        "ods",
        "cpm",
        "central pontine myelinolysis",
        "free water",
        "diabetes insipidus",
        "di",
        "desmopressin",
        "ddavp",
        "tolvaptan"
      ],
      warnings: [
        "Hypertonic saline (3%, and 23.4%) is HIGH-ALERT: per order/protocol only, pump, independent double check, dedicated labeling; 23.4% central line only, never as general fluid.",
        "Limit correction: chronic hyponatremia rise ≤8–10 mmol/L in 24 h (lower limit for high-risk: alcohol use, malnutrition, hypokalemia, liver disease) — overcorrection causes osmotic demyelination. Report a rise faster than the ordered limit at once.",
        "Brisk unexpected urine output (water diuresis) during treatment = overcorrection risk — check Na and call provider (re-lowering/desmopressin per provider)."
      ],
      glance: [
        "Severe symptomatic hypoNa (seizure, coma, vomiting, confusion) → hypertonic saline bolus PER ORDER/protocol, recheck Na frequently",
        "Correction limit (≤8–10 mmol/L/24 h chronic); watch UOP for overcorrection",
        "HyperNa: free water deficit replacement per order; slow in chronic; check DI (high dilute UOP)"
      ],
      recognize: [
        "Hyponatremia (Na <135; severe <125 or symptomatic): headache, N/V, confusion, seizures, coma, respiratory arrest (cerebral edema)",
        "Acute (<48 h: marathon, MDMA, polydipsia, post-op hypotonic fluids) is higher risk for herniation; chronic is higher risk for ODS",
        "Hypernatremia (Na >145): thirst (if able), lethargy, irritability, seizures; ICU: no free water access, osmotic diuresis, DI (large dilute UOP)",
        "Volume status, urine osm/Na, serum osm, glucose (pseudo/translocational hypoNa), meds (thiazides, SSRIs, carbamazepine, desmopressin)"
      ],
      actions: [
        { id: "sodium-emergencies-a1", t: "!Notify provider for Na <125 or >155 mmol/L (or per facility critical value), any neuro symptoms, or rapid change.", s: "RN" },
        { id: "sodium-emergencies-a2", t: "Seizure precautions; neuro checks; airway assessment; strict I&O; daily weight.", s: "RN" },
        { id: "sodium-emergencies-a3", t: "Labs per order: serum Na q2–4h during active correction (more often initially), serum osm, glucose, urine osm/Na, K, BMP.", s: "ORDER" },
        { id: "sodium-emergencies-a4", t: "Severe symptomatic hyponatremia: hypertonic (3%) saline bolus(es) per order/protocol — high-alert double check; recheck Na after each bolus per order.", s: "ORDER" },
        { id: "sodium-emergencies-a5", t: "Stop/hold contributing fluids & meds per order (hypotonic IV fluids, thiazides, desmopressin); fluid restriction per order (SIADH).", s: "ORDER" },
        { id: "sodium-emergencies-a6", t: "Track Na change vs ordered 24-h limit; report rise approaching limit or sudden ↑UOP immediately.", s: "RN" },
        { id: "sodium-emergencies-a7", t: "Anticipate/assist: overcorrection rescue (D5W and/or desmopressin) per provider.", s: "PROV" },
        { id: "sodium-emergencies-a8", t: "Hypernatremia: free water (enteral) or hypotonic IV fluid per order; correct cause (DI → desmopressin per order); avoid rapid correction in chronic.", s: "ORDER" },
        { id: "sodium-emergencies-a9", t: "Correct K per protocol (raising K also raises Na).", s: "ORDER" }
      ],
      monitor: [
        { id: "sodium-emergencies-m1", t: "Serum Na per ordered interval; glucose; K", s: "ORDER" },
        { id: "sodium-emergencies-m2", t: "Hourly UOP (sudden dilute diuresis = alert), I&O, weight", s: "RN" },
        { id: "sodium-emergencies-m3", t: "Neuro status: headache, confusion, seizure; days later: dysarthria, dysphagia, weakness (ODS)", s: "RN" },
        { id: "sodium-emergencies-m4", t: "Hypertonic saline IV site/line; fluid overload signs", s: "RN" },
        { id: "sodium-emergencies-m5", t: "Thirst/access to water (hyperNa), insensible losses, fever", s: "RN" }
      ],
      meds: [
        "VERIFY PER FACILITY PROTOCOL / ORDER.",
        "3% sodium chloride (HIGH-ALERT) bolus/infusion per order/protocol",
        "Desmopressin per provider (DI; or overcorrection rescue) · D5W/free water per order",
        "Vaptans (tolvaptan) per provider only — overcorrection and hepatotoxicity risk",
        "Potassium replacement per protocol"
      ],
      escalate: [
        "!Seizure, GCS decline, respiratory compromise with abnormal Na",
        "!Na rising faster than ordered limit or sudden large dilute UOP",
        "Na not responding to therapy; new neuro signs days after correction (ODS)"
      ]
    },
    {
      id: "aki",
      name: "Acute kidney injury (AKI)",
      category: "Metabolic/Renal",
      emergency: false,
      keywords: [
        "aki",
        "acute kidney injury",
        "kidney failure",
        "renal failure",
        "arf",
        "oliguria",
        "low urine output",
        "low uop",
        "creatinine",
        "cr",
        "dialysis",
        "hd",
        "crrt",
        "cvvhdf",
        "nephrotoxins",
        "contrast",
        "prerenal",
        "atn",
        "kdigo",
        "rhabdo",
        "rhabdomyolysis",
        "bladder scan"
      ],
      warnings: [
        "Renal function changes drug doses: ask pharmacy to re-dose renally cleared drugs daily; creatinine-based eGFR is unreliable while function is changing. Do not reduce a FIRST antibiotic dose without pharmacy advice. CRRT changes clearance.",
        "Do not delay emergent contrast imaging (e.g., PE, stroke) because of AKI — tell the ordering provider; they decide."
      ],
      glance: [
        "Oliguria (<0.5 mL/kg/h ×6 h) or Cr ↑0.3 in 48 h / ≥1.5× baseline = AKI",
        "Find the cause: prerenal (volume, perfusion) · intrinsic (ATN, toxins) · postrenal (obstruction — bladder scan!)",
        "Fix perfusion (MAP per order), review nephrotoxins with pharmacy; watch K/acid/volume for dialysis triggers"
      ],
      recognize: [
        "KDIGO: Cr rise ≥0.3 mg/dL within 48 h, ≥1.5× baseline within 7 d, or UOP <0.5 mL/kg/h ×6 h",
        "Stage 1: Cr 1.5–1.9× or ↑≥0.3 or UOP <0.5 for 6–12 h · Stage 2: 2.0–2.9× or UOP <0.5 ≥12 h · Stage 3: ≥3× or Cr ≥4.0 or RRT or UOP <0.3 ≥24 h or anuria ≥12 h",
        "Causes: sepsis, shock, hypovolemia, cardiorenal, contrast, vancomycin/aminoglycosides, NSAIDs, rhabdomyolysis, obstruction, hepatorenal, abdominal compartment syndrome",
        "Clues: dark/tea urine + high CK = rhabdo; tense distended abdomen + low UOP → bladder pressure (abdominal compartment)",
        "Late: volume overload, ↑K, metabolic acidosis, uremic signs (confusion, pericardial rub, bleeding)"
      ],
      actions: [
        { id: "aki-a1", t: "!Notify provider of low UOP or rising creatinine; verify baseline Cr.", s: "RN" },
        { id: "aki-a2", t: "Bladder scan; flush/replace Foley per policy if blocked; confirm catheter output; notify for obstruction.", s: "RN" },
        { id: "aki-a3", t: "Volume assessment: vitals, orthostatics (if able), JVP, edema, lung exam, weight, I&O; IVC ultrasound per provider.", s: "RN" },
        { id: "aki-a4", t: "Hypovolemic → crystalloid bolus per order (small, e.g., 250–500 mL) and reassess. Overloaded → hold fluids; diuretic trial per provider.", s: "ORDER" },
        { id: "aki-a5", t: "MAP goal per order (usually ≥65; higher in chronic HTN only if ordered); treat shock/sepsis.", s: "ORDER" },
        { id: "aki-a6", t: "Review nephrotoxins with provider/pharmacy: NSAIDs, IV contrast, aminoglycosides, vancomycin (AUC/levels per pharmacy), ACE-i/ARB; diuretics only for overload.", s: "ORDER" },
        { id: "aki-a7", t: "Labs per order: BMP, K, HCO₃, Mg, Phos, CBC, UA + urine Na/Cr/urea, CK if rhabdo, ABG/VBG; renal ultrasound; bladder pressure if suspected compartment syndrome.", s: "ORDER" },
        { id: "aki-a8", t: "Treat hyperkalemia/acidosis per protocol (see Hyperkalemia).", s: "ORDER" },
        { id: "aki-a9", t: "Strict I&O (hourly UOP), daily weight, avoid unnecessary lines/catheter days.", s: "RN" },
        { id: "aki-a10", t: "Anticipate/assist: dialysis/CRRT for A.E.I.O.U. — refractory Acidosis, Electrolytes (K), Intoxication, Overload, Uremia. No early RRT without a definite indication (SSC 2026).", s: "PROV" }
      ],
      monitor: [
        { id: "aki-m1", t: "UOP hourly; creatinine/BUN per order", s: "RN" },
        { id: "aki-m2", t: "K, HCO₃, Na, Phos, Mg, Ca per protocol", s: "ORDER" },
        { id: "aki-m3", t: "Fluid balance, weight, lung sounds, SpO₂ (overload)", s: "RN" },
        { id: "aki-m4", t: "Drug levels (vancomycin, aminoglycosides); daily pharmacy dose review", s: "ORDER" },
        { id: "aki-m5", t: "CRRT: filter pressures, anticoagulation (citrate → ionized Ca), temp, fluid removal goals", s: "RN" }
      ],
      meds: [
        "VERIFY PER FACILITY PROTOCOL / ORDER.",
        "Crystalloid bolus per order if hypovolemic (small, reassess)",
        "Norepinephrine to ordered MAP if shock (HIGH-ALERT, pump library)",
        "Loop diuretic (e.g., furosemide) for overload per order — not to 'treat' AKI or make urine in prerenal state",
        "Hyperkalemia/acidosis therapy · phosphate binders per nephrology",
        "Avoid/limit nephrotoxins; renal re-dosing of antibiotics and other drugs by pharmacy"
      ],
      escalate: [
        "!Anuria, K ≥6.5/ECG changes, pH <7.2, pulmonary edema → nephrology STAT",
        "Obstruction on scan/ultrasound → urology",
        "Rising Cr despite perfusion fix; nephrotoxic exposure; rhabdomyolysis; high bladder pressure"
      ]
    },
    {
      id: "gi-bleed",
      name: "GI bleed (upper / lower)",
      category: "GI/Heme",
      emergency: false,
      keywords: [
        "gib",
        "gi bleed",
        "ugib",
        "lgib",
        "upper gi bleed",
        "lower gi bleed",
        "hematemesis",
        "melena",
        "coffee ground",
        "hematochezia",
        "brbpr",
        "variceal",
        "varices",
        "ppi",
        "pantoprazole",
        "protonix",
        "octreotide",
        "egd",
        "endoscopy",
        "blakemore",
        "minnesota tube",
        "tips",
        "cirrhosis"
      ],
      warnings: [
        "Tranexamic acid is NOT recommended for GI bleeding (HALT-IT: no benefit, more VTE/seizures).",
        "Balloon tamponade (Blakemore/Minnesota) is PROVIDER-placed: patient intubated first; scissors at bedside for emergent deflation/airway obstruction; time/pressure limits per provider (max ~24 h).",
        "Vasopressin/terlipressin only by specialist order — dosing is indication-specific; never use the septic-shock rate. Xa-inhibitor reversal = 4F-PCC per pharmacy protocol."
      ],
      glance: [
        "Hematemesis/melena/hematochezia + tachycardia/hypotension = resuscitate first",
        "2 large-bore IVs, type & crossmatch, airway protection, call GI/provider",
        "Cirrhosis? Anticipate octreotide + antibiotic prophylaxis + PPI per order; restrictive transfusion (Hgb <7; variceal target 7–8) unless unstable"
      ],
      recognize: [
        "Vomiting blood/coffee-ground emesis, black tarry stools (melena), maroon/bright-red blood per rectum",
        "Shock signs: tachycardia, hypotension, orthostasis, cool skin, AMS (no tachycardia on β-blockers)",
        "Risk: cirrhosis/varices, ulcer disease, NSAIDs/anticoagulants, ICU stress ulcers, alcohol, malignancy",
        "BUN:Cr ratio ↑ suggests upper source; brisk hematochezia + shock may be upper source; Hgb may be normal early"
      ],
      actions: [
        { id: "gi-bleed-a1", t: "!Call provider/rapid response if unstable; notify GI for urgent endoscopy per provider.", s: "RN" },
        { id: "gi-bleed-a2", t: "Large-bore IV ×2 (≥18 G) per protocol; monitor. Keep NPO. Protect airway (HOB up / left lateral), suction ready.", s: "RN" },
        { id: "gi-bleed-a3", t: "STAT labs per order: CBC, type & crossmatch, coags/INR, platelets, fibrinogen, BMP/BUN, LFTs, lactate, troponin if risk, ABG.", s: "ORDER" },
        { id: "gi-bleed-a4", t: "Transfuse per order: Hgb <7 (CAD/active ischemia <8); variceal target 7–8 (avoid over-transfusion). Massive/unstable: by hemodynamics; activate MTP per policy.", s: "ORDER" },
        { id: "gi-bleed-a5", t: "Hold anticoagulants, antiplatelets, NSAIDs per provider (stented coronary pts: cardiology input on aspirin); reversal per provider/pharmacy (4F-PCC, vitamin K slow IV, etc.).", s: "ORDER" },
        { id: "gi-bleed-a6", t: "Cirrhosis: platelet/INR correction only per provider/hepatology — no routine FFP to 'fix' INR (viscoelastic testing if available).", s: "ORDER" },
        { id: "gi-bleed-a7", t: "Suspected upper source: IV PPI per order/protocol (bolus ± infusion or intermittent per GI).", s: "ORDER" },
        { id: "gi-bleed-a8", t: "Suspected variceal bleed: octreotide bolus + infusion per order; antibiotic prophylaxis (e.g., cefTRIAXone) per order — flush between calcium-containing infusions.", s: "ORDER" },
        { id: "gi-bleed-a9", t: "Erythromycin IV before endoscopy if ordered (check QTc and interacting drugs).", s: "ORDER" },
        { id: "gi-bleed-a10", t: "Anticipate/assist: intubation before endoscopy for massive hematemesis/AMS.", s: "PROV" },
        { id: "gi-bleed-a11", t: "Anticipate/assist: endoscopy within 24 h (variceal ≤12 h); unstable lower GI bleed → CT angiography/IR first; early TIPS discussion for high-risk variceal bleed (hepatology).", s: "PROV" },
        { id: "gi-bleed-a12", t: "Anticipate/assist: refractory variceal bleed → balloon tamponade (intubated pt; scissors at bedside), TIPS/surgery.", s: "PROV" }
      ],
      monitor: [
        { id: "gi-bleed-m1", t: "HR, BP, MAP, shock index q5–15 min while unstable; mental status; UOP", s: "RN" },
        { id: "gi-bleed-m2", t: "Hgb/Hct q4–6h per order (initial value lags), lactate, coags, platelets, iCa (with transfusion)", s: "ORDER" },
        { id: "gi-bleed-m3", t: "Amount/character of emesis, NG output, stool; abdominal distension", s: "RN" },
        { id: "gi-bleed-m4", t: "Hepatic encephalopathy (AMS, asterixis) — avoid benzodiazepines/opioids where possible; lactulose per order", s: "RN" },
        { id: "gi-bleed-m5", t: "Transfusion reaction; K/Ca after massive transfusion", s: "RN" }
      ],
      meds: [
        "VERIFY PER FACILITY PROTOCOL / ORDER. No infusion doses shown.",
        "IV PPI (e.g., pantoprazole) — bolus/continuous vs intermittent per GI/order",
        "Octreotide bolus + infusion (variceal) per order; vasopressin/terlipressin only by specialist order",
        "Antibiotic prophylaxis in cirrhosis with GI bleed (e.g., cefTRIAXone) per order",
        "pRBC (restrictive), platelets, PCC/vitamin K/fibrinogen as indicated per provider; tranexamic acid NOT recommended",
        "Erythromycin pre-endoscopy per order (QTc) · lactulose in cirrhosis per order"
      ],
      escalate: [
        "!Hemodynamic instability, ongoing hematemesis, Hgb drop ≥2 g/dL, need >2–4 units → MTP / urgent endoscopy / IR / surgery",
        "!Airway concern from active vomiting of blood or AMS",
        "Suspected variceal bleeding → GI/hepatology/ICU; balloon tamponade/TIPS decision"
      ]
    },
    {
      id: "transfusion-reaction",
      name: "Acute transfusion reaction",
      category: "GI/Heme",
      emergency: false,
      keywords: [
        "transfusion reaction",
        "blood reaction",
        "hemolytic reaction",
        "ahtr",
        "taco",
        "trali",
        "febrile reaction",
        "fnhtr",
        "septic transfusion",
        "allergic transfusion",
        "urticaria",
        "prbc",
        "platelets",
        "ffp",
        "blood bank",
        "abo incompatibility"
      ],
      warnings: [
        "STOP the transfusion first for any new symptom/vital-sign change — don't 'slow it down'. Keep IV open with NEW tubing + 0.9% saline.",
        "ABO-incompatible (wrong blood) reactions can kill — recheck patient ID vs bag/tag at bedside; notify blood bank; another patient may be at risk (paired misidentification).",
        "Anaphylaxis (hypotension, wheeze, angioedema) → Anaphylaxis card: IM epinephrine 1 mg/mL per protocol."
      ],
      glance: [
        "Any new fever, chills, rigors, dyspnea, hypotension, back/flank pain, hives during/after transfusion → STOP",
        "New tubing + NS to keep line open; vitals; bedside ID recheck; call provider & blood bank",
        "Return bag + tubing to blood bank; send ordered labs; document"
      ],
      recognize: [
        "Acute hemolytic (ABO): fever, chills, flank/back pain, hypotension, hemoglobinuria, oozing/DIC, sense of doom",
        "TACO: dyspnea, hypertension, JVD, crackles, ↑BNP within 12 h — volume. TRALI: hypoxemia, bilateral infiltrates, often hypotension/fever within 6 h",
        "Septic (esp. platelets): high fever, rigors, hypotension. Febrile non-hemolytic: fever/chills without other signs (diagnosis of exclusion)",
        "Allergic: urticaria/itching only (mild) vs anaphylaxis (airway/BP); delayed hemolysis 3–14 d"
      ],
      actions: [
        { id: "transfusion-reaction-a1", t: "STOP transfusion; disconnect blood tubing at the hub; keep IV access with new tubing + 0.9% saline.", s: "RN" },
        { id: "transfusion-reaction-a2", t: "!Full vitals, SpO₂, assess airway/breathing; call provider. Severe (hypotension, hypoxemia, wheeze) → rapid response.", s: "RN" },
        { id: "transfusion-reaction-a3", t: "Bedside check: patient ID band vs bag label/tag/order — report any discrepancy to blood bank immediately.", s: "RN" },
        { id: "transfusion-reaction-a4", t: "Notify blood bank per policy; return bag, tubing, attached solutions and forms.", s: "RN" },
        { id: "transfusion-reaction-a5", t: "Send transfusion-reaction labs per policy/order: DAT, type & screen, CBC, LDH/bilirubin/haptoglobin, coags, BMP; first-void urine (hemoglobinuria); blood cultures (patient ± bag) if febrile/septic.", s: "ORDER" },
        { id: "transfusion-reaction-a6", t: "Treat per order: antipyretic (fever), antihistamine (mild allergic), O₂/NIV, diuretic for TACO, fluids/pressors for hypotension, antibiotics if septic.", s: "ORDER" },
        { id: "transfusion-reaction-a7", t: "Anticipate/assist: intubation/ventilation (TRALI, lung-protective), management of DIC/AKI in hemolysis.", s: "PROV" },
        { id: "transfusion-reaction-a8", t: "Mild urticaria only: resumption ONLY if provider orders it after evaluation (never for fever, dyspnea, hypotension).", s: "RN" },
        { id: "transfusion-reaction-a9", t: "Document time, volume transfused, unit numbers, symptoms, actions; complete incident/hemovigilance report.", s: "RN" }
      ],
      monitor: [
        { id: "transfusion-reaction-m1", t: "Vitals q15 min until stable, then per policy; SpO₂, RR, breath sounds", s: "RN" },
        { id: "transfusion-reaction-m2", t: "UOP and urine color (hemoglobinuria → AKI risk)", s: "RN" },
        { id: "transfusion-reaction-m3", t: "Hemolysis labs, coags, creatinine, K per order", s: "ORDER" },
        { id: "transfusion-reaction-m4", t: "Fluid balance (TACO), bleeding/oozing (DIC)", s: "RN" },
        { id: "transfusion-reaction-m5", t: "Subsequent transfusions: closer vitals; premedication only if ordered", s: "RN" }
      ],
      meds: [
        "VERIFY PER FACILITY PROTOCOL / ORDER.",
        "0.9% sodium chloride via new tubing (keep vein open)",
        "Epinephrine IM 1 mg/mL (anaphylaxis) per protocol — see Anaphylaxis",
        "Antipyretic, antihistamine, diuretic (TACO), bronchodilator per order",
        "Fluids/vasopressors (hemolytic/septic shock), antibiotics (septic) per order"
      ],
      escalate: [
        "!Hypotension, hypoxemia, wheeze/angioedema, hemoglobinuria, back pain + fever — suspected hemolytic, septic, TRALI or anaphylaxis",
        "!Identification discrepancy (wrong blood) — blood bank + provider immediately",
        "Respiratory distress within 6–12 h of transfusion (TACO/TRALI) — provider; report to blood bank"
      ]
    },
    {
      id: "acute-liver-failure",
      name: "Acute liver failure / hepatic encephalopathy",
      category: "GI/Heme",
      emergency: false,
      keywords: [
        "alf",
        "acute liver failure",
        "fulminant hepatic failure",
        "liver failure",
        "hepatic encephalopathy",
        "he",
        "ammonia",
        "acetaminophen toxicity",
        "apap",
        "nac",
        "lactulose",
        "rifaximin",
        "coagulopathy",
        "inr",
        "transplant",
        "cerebral edema",
        "cirrhosis"
      ],
      warnings: [
        "Acute liver failure (coagulopathy + encephalopathy, no prior cirrhosis) → contact a liver transplant center EARLY per provider.",
        "Grade 3–4 encephalopathy: cerebral edema/herniation risk — airway protection, ICP precautions, hyperosmolar therapy per order.",
        "Hypoglycemia is common and dangerous — frequent glucose checks; avoid sedatives/benzodiazepines unless ordered; correct INR only per provider (bleeding/procedure), not to 'treat the number'."
      ],
      glance: [
        "Jaundice + INR ↑ + new confusion = ALF until proven otherwise → transplant center early",
        "Acetaminophen (most common) → NAC per protocol (also used in non-acetaminophen ALF per provider)",
        "Watch: glucose, airway/encephalopathy grade, cerebral edema, infection, AKI, bleeding"
      ],
      recognize: [
        "ALF: INR ≥1.5 + encephalopathy within weeks of illness onset, no prior cirrhosis; jaundice, RUQ pain, N/V",
        "HE grades: 1 mild confusion/sleep change · 2 lethargy, asterixis · 3 somnolent, marked confusion · 4 coma",
        "Cerebral edema: HTN, bradycardia, pupil changes, posturing, seizures",
        "Causes: acetaminophen, drugs/herbals, viral hepatitis, ischemic, Wilson, autoimmune, pregnancy (AFLP/HELLP), mushroom"
      ],
      actions: [
        { id: "acute-liver-failure-a1", t: "!Notify provider of encephalopathy change, glucose low, bleeding, hemodynamic change.", s: "RN" },
        { id: "acute-liver-failure-a2", t: "Labs per order: INR, LFTs, glucose, ammonia (ALF), lactate, ABG, BMP, phosphate, CBC, acetaminophen level, tox/viral screen, cultures.", s: "ORDER" },
        { id: "acute-liver-failure-a3", t: "POC glucose q1–2h or per order; dextrose infusion/bolus per protocol for hypoglycemia.", s: "ORDER" },
        { id: "acute-liver-failure-a4", t: "NAC IV per poison center/pharmacy protocol (acetaminophen; non-acetaminophen ALF per provider).", s: "ORDER" },
        { id: "acute-liver-failure-a5", t: "Anticipate/assist: intubation for grade 3–4 HE; transplant center referral/transfer.", s: "PROV" },
        { id: "acute-liver-failure-a6", t: "Neuro: GCS/HE grade, pupils q1h; HOB 30°, head midline, minimize stimulation; seizure precautions.", s: "RN" },
        { id: "acute-liver-failure-a7", t: "Raised ICP risk: Na target/hyperosmolar therapy per order; normothermia; avoid hypotonic fluids.", s: "ORDER" },
        { id: "acute-liver-failure-a8", t: "Hemodynamics: fluids then vasopressor to MAP goal per order; AKI → early CRRT per provider.", s: "ORDER" },
        { id: "acute-liver-failure-a9", t: "Hepatic encephalopathy (cirrhosis): lactulose per order titrated to stool output ± rifaximin; identify trigger (GI bleed, infection, sedatives, electrolytes).", s: "ORDER" },
        { id: "acute-liver-failure-a10", t: "Avoid/question sedatives, benzodiazepines, hepatotoxic drugs (incl. acetaminophen dosing), NSAIDs; bleeding precautions.", s: "RN" }
      ],
      monitor: [
        { id: "acute-liver-failure-m1", t: "Glucose q1–2h; neuro/HE grade q1h", s: "RN" },
        { id: "acute-liver-failure-m2", t: "INR, LFTs, lactate, ammonia, Na, K, phosphate, creatinine per order", s: "ORDER" },
        { id: "acute-liver-failure-m3", t: "MAP, HR, temperature, SpO₂; infection signs (high risk)", s: "RN" },
        { id: "acute-liver-failure-m4", t: "Bleeding (lines, GI), stool output with lactulose, I&O", s: "RN" },
        { id: "acute-liver-failure-m5", t: "Signs of cerebral edema (pupils, HTN + bradycardia, posturing)", s: "RN" }
      ],
      meds: [
        "VERIFY PER FACILITY PROTOCOL / ORDER.",
        "N-acetylcysteine IV per protocol",
        "Dextrose (bolus per protocol; infusion per order) · lactulose ± rifaximin per order",
        "Vasopressors per order; hypertonic saline (HIGH-ALERT) per order for ICP/Na targets",
        "Blood products/vitamin K (slow IV) only per provider for bleeding/procedures; antimicrobials per order"
      ],
      escalate: [
        "!Worsening encephalopathy (grade ≥3), airway concern, seizure, pupil change",
        "!Hypoglycemia recurrent, hypotension, active bleeding",
        "Rising lactate/INR, AKI, oliguria → transplant center/provider"
      ]
    },
    {
      id: "alcohol-withdrawal",
      name: "Alcohol withdrawal / delirium tremens",
      category: "Tox/Behavioral",
      emergency: false,
      keywords: [
        "alcohol",
        "etoh",
        "aws",
        "withdrawal",
        "dts",
        "delirium tremens",
        "ciwa",
        "ciwa-ar",
        "benzodiazepine",
        "benzo",
        "lorazepam",
        "ativan",
        "phenobarbital",
        "thiamine",
        "wernicke",
        "agitation",
        "hallucinations",
        "withdrawal seizure"
      ],
      warnings: [
        "CIWA-Ar is valid ONLY if the patient can communicate. Intubated/sedated/delirious: use RASS + objective signs per ICU protocol (CAM-ICU for delirium).",
        "PHENobarbital is HIGH-ALERT (very long half-life, additive respiratory depression with benzodiazepines) — per ICU/pharmacy protocol only; independent double check; do NOT confuse with PENTobarbital.",
        "Suspected Wernicke (confusion, ataxia, eye signs): tell provider NOW — high-dose IV thiamine per order, given before or with glucose."
      ],
      glance: [
        "Tremor, sweats, tachycardia, anxiety, hallucinations, seizure → assess (CIWA-Ar if communicative; RASS if not) and treat early",
        "Benzodiazepine per order set (symptom-triggered or front-loaded per provider); thiamine IV before/with dextrose",
        "Rule out other causes: hypoglycemia, head injury, infection, hepatic encephalopathy, overdose"
      ],
      recognize: [
        "6–24 h: tremor, anxiety, insomnia, diaphoresis, N/V, HTN, tachycardia",
        "6–48 h: withdrawal seizures (generalized, often single/brief)",
        "48–96 h (DTs): disorientation, agitation, visual/tactile hallucinations, fever, severe autonomic instability, arrhythmia, seizure — mortality if untreated",
        "Risk: prior DTs/seizures, high daily intake, abnormal labs, concurrent illness, age; fever = marker of severity"
      ],
      actions: [
        { id: "alcohol-withdrawal-a1", t: "Safety: bed low, fall/seizure precautions, calm low-stimulation room. Restraints last resort — per restraint policy/order, least restrictive, frequent reassessment.", s: "RN" },
        { id: "alcohol-withdrawal-a2", t: "!Notify provider of withdrawal signs; obtain withdrawal order set (benzodiazepine regimen, assessment tool).", s: "RN" },
        { id: "alcohol-withdrawal-a3", t: "POC glucose; labs per order: BMP, Mg, Phos, LFTs, CBC, CK, ethanol level, tox screen.", s: "ORDER" },
        { id: "alcohol-withdrawal-a4", t: "Thiamine IV per order BEFORE or with dextrose (prophylactic vs high-dose Wernicke regimen per provider); folate, multivitamin; replace Mg, K, Phos per protocol.", s: "ORDER" },
        { id: "alcohol-withdrawal-a5", t: "Assess q1h or per protocol: CIWA-Ar ONLY if able to communicate; intubated/delirious → RASS + objective signs (target RASS 0 to −1 per order).", s: "RN" },
        { id: "alcohol-withdrawal-a6", t: "Benzodiazepine per order set (drug, dose, interval per order; lorazepam often preferred in liver disease/elderly). Track cumulative dose; hold & call for RASS ≤ −2, slow RR, SpO₂/ETCO₂ change.", s: "ORDER" },
        { id: "alcohol-withdrawal-a7", t: "!Severe/DTs or escalating doses: ask provider for front-loading/ICU escalation; airway checks q5–15 min after doses; call per protocol when cumulative-dose threshold reached.", s: "RN" },
        { id: "alcohol-withdrawal-a8", t: "Resistant withdrawal: PHENobarbital per ICU/pharmacy protocol (high-alert; airway/ETCO₂ monitoring); dexmedetomidine as adjunct only (NOT alone).", s: "ORDER" },
        { id: "alcohol-withdrawal-a9", t: "Haloperidol only per order after adequate benzodiazepine; baseline QTc and K/Mg (lowers seizure threshold).", s: "ORDER" },
        { id: "alcohol-withdrawal-a10", t: "Anticipate/assist: intubation + propofol for refractory agitation/respiratory compromise.", s: "PROV" },
        { id: "alcohol-withdrawal-a11", t: "Seizure → Status epilepticus card (benzodiazepine; not phenytoin for withdrawal seizures). Treat fever; hydration per order.", s: "RN" },
        { id: "alcohol-withdrawal-a12", t: "Assess for aspiration, hepatic encephalopathy, GI bleed, pancreatitis, alcoholic ketoacidosis, Wernicke.", s: "RN" }
      ],
      monitor: [
        { id: "alcohol-withdrawal-m1", t: "CIWA-Ar (communicative only) or RASS/CAM-ICU per protocol", s: "RN" },
        { id: "alcohol-withdrawal-m2", t: "HR, BP, temp, RR/SpO₂/ETCO₂ after benzodiazepine/phenobarbital", s: "RN" },
        { id: "alcohol-withdrawal-m3", t: "Glucose, electrolytes (Mg, K, Phos — refeeding risk); hydration, UOP", s: "ORDER" },
        { id: "alcohol-withdrawal-m4", t: "Cumulative benzodiazepine dose; over-sedation or respiratory depression", s: "RN" },
        { id: "alcohol-withdrawal-m5", t: "Seizure, hallucinations, injury, tube/line removal; CK if prolonged agitation", s: "RN" }
      ],
      meds: [
        "VERIFY PER FACILITY PROTOCOL / ORDER. Doses per order set.",
        "Benzodiazepines (lorazepam, diazepam) — symptom-triggered or front-loaded per order; cumulative-dose call threshold per protocol",
        "PHENobarbital (HIGH-ALERT) per ICU/pharmacy protocol — IBW-based dosing/caps per order",
        "Thiamine IV (higher dose if Wernicke) · folic acid · multivitamin · Mg/K/Phos repletion",
        "Dexmedetomidine adjunct only · haloperidol adjunct (QTc) · propofol with intubation"
      ],
      escalate: [
        "!Seizure, uncontrolled agitation, refractory to benzodiazepines (escalating cumulative dose), respiratory depression",
        "!High fever, severe tachycardia/BP instability, hallucinations with unsafe behavior",
        "New focal deficit or head injury → CT head; suspected Wernicke/hepatic encephalopathy"
      ]
    },
    {
      id: "delirium-agitation",
      name: "ICU delirium / agitation",
      category: "Tox/Behavioral",
      emergency: false,
      keywords: [
        "delirium",
        "icu delirium",
        "agitation",
        "agitated",
        "confusion",
        "cam-icu",
        "cam icu",
        "rass",
        "padis",
        "abcdef bundle",
        "sundowning",
        "restraints",
        "self extubation",
        "haloperidol",
        "haldol",
        "quetiapine",
        "dexmedetomidine",
        "precedex",
        "sedation"
      ],
      warnings: [
        "New agitation/confusion is a SYMPTOM: rule out hypoxia, hypercapnia, hypoglycemia, pain, urinary retention, sepsis, withdrawal, stroke, drugs BEFORE sedating.",
        "Restraints are a last resort — per restraint policy/order only, least restrictive, time-limited, frequent reassessment and documentation.",
        "Antipsychotics: not routine for delirium (PADIS 2018) — use only per order for distress/danger; check QTc and K/Mg; benzodiazepines can worsen delirium (except alcohol/benzo withdrawal)."
      ],
      glance: [
        "Screen RASS + CAM-ICU every shift and with change; treat causes first",
        "Analgesia first, light sedation (RASS 0 to −1 per order), sleep, mobility, family, glasses/hearing aids",
        "Dangerous agitation: protect patient/lines, call provider; medications per order"
      ],
      recognize: [
        "CAM-ICU: acute change/fluctuation + inattention + (disorganized thinking or altered LOC)",
        "Hyperactive (agitated, pulling lines), hypoactive (quiet, withdrawn — most common & missed), mixed",
        "Risk: age, dementia, sedatives (benzodiazepines), sepsis, ventilation, sleep deprivation, immobility, restraints, alcohol use",
        "Agitation scale: RASS +1 restless … +4 combative"
      ],
      actions: [
        { id: "delirium-agitation-a1", t: "Safety: stay with patient/sitter, protect airway/lines/tubes, bed low; call for help if danger.", s: "RN" },
        { id: "delirium-agitation-a2", t: "!Acute change in mental status: check SpO₂, ETCO₂/ABG if ventilated, glucose, vitals, pain, bladder scan; notify provider (new focal deficit → stroke pathway).", s: "RN" },
        { id: "delirium-agitation-a3", t: "Assess with RASS and CAM-ICU (CIWA-Ar only for communicative alcohol-withdrawal pts); assess pain (CPOT/BPS if non-verbal).", s: "RN" },
        { id: "delirium-agitation-a4", t: "Analgesia first per order; light sedation target per order; daily sedation interruption/SBT per protocol.", s: "ORDER" },
        { id: "delirium-agitation-a5", t: "Non-drug bundle: reorient, glasses/hearing aids, day-night routine, noise/light control, early mobility, family presence, minimize tethers.", s: "RN" },
        { id: "delirium-agitation-a6", t: "Review meds with pharmacist/provider: deliriogenic drugs (benzodiazepines, anticholinergics, opioid excess, steroids).", s: "ORDER" },
        { id: "delirium-agitation-a7", t: "Dexmedetomidine may be preferred over benzodiazepines for ventilated agitation per order (watch bradycardia/hypotension).", s: "ORDER" },
        { id: "delirium-agitation-a8", t: "Antipsychotic only per order for severe distress/danger; baseline/serial QTc, K/Mg.", s: "ORDER" },
        { id: "delirium-agitation-a9", t: "Restraints only per policy/order after alternatives; reassess and document per policy.", s: "ORDER" },
        { id: "delirium-agitation-a10", t: "Withdrawal (alcohol, opioid, benzodiazepine, nicotine) → see Alcohol withdrawal card; notify provider.", s: "RN" }
      ],
      monitor: [
        { id: "delirium-agitation-m1", t: "RASS and CAM-ICU each shift and with change; pain score", s: "RN" },
        { id: "delirium-agitation-m2", t: "Sleep, mobility level, restraint checks per policy", s: "RN" },
        { id: "delirium-agitation-m3", t: "QTc, K, Mg on antipsychotics per order", s: "ORDER" },
        { id: "delirium-agitation-m4", t: "HR/BP with dexmedetomidine; oversedation (RASS ≤ −2)", s: "RN" },
        { id: "delirium-agitation-m5", t: "Self-extubation/line removal risk; falls", s: "RN" }
      ],
      meds: [
        "VERIFY PER FACILITY PROTOCOL / ORDER. No infusion rates shown.",
        "Analgesics (e.g., fentanyl, hydromorphone) per order — analgesia-first",
        "Dexmedetomidine (infusion per order/pump library) for ventilated agitation/delirium",
        "Haloperidol / quetiapine per order only for distress/danger (QTc)",
        "Avoid benzodiazepines unless withdrawal or specific indication"
      ],
      escalate: [
        "!Danger to self/others, self-extubation or device removal, hypoxia/hypercapnia",
        "!New focal neuro deficit, seizure, GCS decline",
        "Persistent delirium, need for restraints, QTc prolongation"
      ]
    },
    {
      id: "overdose",
      name: "Overdose / poisoning basics",
      category: "Tox/Behavioral",
      emergency: false,
      keywords: [
        "overdose",
        "od",
        "poisoning",
        "tox",
        "toxidrome",
        "opioid",
        "naloxone",
        "narcan",
        "fentanyl",
        "acetaminophen",
        "apap",
        "tylenol",
        "nac",
        "salicylate",
        "aspirin",
        "asa",
        "tricyclic",
        "tca",
        "benzodiazepine",
        "beta blocker",
        "calcium channel blocker",
        "ccb",
        "organophosphate",
        "poison control",
        "charcoal"
      ],
      warnings: [
        "Ventilate FIRST (BVM) — naloxone titrated to adequate breathing, not full arousal; re-sedation can occur after 20–90 min (monitor ≥2 h; longer for methadone/long-acting).",
        "High-dose insulin therapy for β-blocker/CCB toxicity is toxicology-directed ONLY — its dosing differs sharply from DKA/hyperkalemia insulin; never borrow those doses.",
        "Organophosphate/carbamate: atropine titrated to drying of bronchial secretions per toxicology — the ACLS 3 mg bradycardia maximum does NOT apply.",
        "Salicylate: intubation can be fatal (loss of respiratory compensation) — provider/toxicology must plan matched high minute ventilation; alkalinization/dialysis per toxicology."
      ],
      glance: [
        "ABCs first (BVM). Glucose. Naloxone per protocol if slow breathing/pinpoint pupils — titrate to breathing",
        "ECG (QRS, QTc). Exact drug, dose, time, intent — call POISON CONTROL 1-800-222-1222 (US) early; don't wait for levels",
        "Don't induce vomiting. Charcoal only if ordered by provider/poison center with airway protected"
      ],
      recognize: [
        "Opioid: ↓RR, pinpoint pupils, sedation · Sedative-hypnotic: sedation, slurred speech, normal pupils",
        "Sympathomimetic: agitation, mydriasis, HTN, tachycardia, hyperthermia, diaphoresis",
        "Anticholinergic: dry skin, flushed, mydriasis, delirium, urinary retention, tachycardia",
        "Cholinergic/organophosphate: SLUDGE, miosis, bradycardia, bronchorrhea, fasciculations",
        "TCA: QRS >100 ms, tachycardia, seizures · Salicylate: tinnitus, tachypnea, mixed acid–base · Acetaminophen: often asymptomatic early",
        "β-blocker/CCB: bradycardia + hypotension (+ hyperglycemia in CCB) · Consider toxic alcohols, serotonin syndrome, NMS, CO/cyanide"
      ],
      actions: [
        { id: "overdose-a1", t: "Safety first (PPE for chemical/organophosphate exposure; decontaminate skin/clothing per policy).", s: "RN" },
        { id: "overdose-a2", t: "!Call rapid response/provider; call Poison Control 1-800-222-1222 (US) or facility toxicology.", s: "RN" },
        { id: "overdose-a3", t: "ABCs: BVM ventilation if hypoventilating, O₂, IV access, cardiac monitor, SpO₂/ETCO₂.", s: "RN" },
        { id: "overdose-a4", t: "POC glucose (treat low per protocol). Temp. 12-lead ECG (QRS, QTc). Pregnancy test if applicable.", s: "RN" },
        { id: "overdose-a5", t: "Opioid toxidrome with hypoventilation: naloxone per standing order/protocol — IV small increments (dilute the 0.4 mg/mL vial for small doses) or IM/intranasal fixed dose; titrate to RR/ventilation. No response at protocol max → call provider, keep ventilating.", s: "ORDER" },
        { id: "overdose-a6", t: "Labs per order: BMP, anion gap, osm gap, ABG/VBG, lactate, acetaminophen & salicylate levels (ALL intentional ingestions), ethanol, CK, LFTs, tox screen (limited).", s: "ORDER" },
        { id: "overdose-a7", t: "Acetaminophen: NAC per poison center/pharmacy protocol (weight-based, pharmacy-prepared; anaphylactoid reaction risk in 1st hour). Unknown time/>8 h with detectable level or ↑ALT → don't wait for 4-h level.", s: "ORDER" },
        { id: "overdose-a8", t: "Activated charcoal only if ordered by provider/poison center: alert or protected airway, within ordered window, substance adsorbs, no ileus/obstruction/caustics/hydrocarbons/metals/alcohols.", s: "ORDER" },
        { id: "overdose-a9", t: "TCA/sodium-channel blocker with wide QRS/arrhythmia: sodium bicarbonate bolus per toxicology/order (salicylate alkalinization is a different regimen).", s: "ORDER" },
        { id: "overdose-a10", t: "β-blocker/CCB: calcium IV, glucagon, high-dose insulin + dextrose, vasopressors — toxicology-directed; glucose/K monitoring.", s: "ORDER" },
        { id: "overdose-a11", t: "Benzodiazepine overdose: supportive; question routine flumazenil (seizure risk with co-ingestants/dependence).", s: "RN" },
        { id: "overdose-a12", t: "Intent unknown/suicide attempt: 1:1 observer, remove hazards; psychiatric evaluation after medical stabilization.", s: "RN" }
      ],
      monitor: [
        { id: "overdose-m1", t: "Continuous ECG (QRS, QTc), SpO₂/ETCO₂, BP, temp, mentation q15–60 min", s: "RN" },
        { id: "overdose-m2", t: "RR and sedation after naloxone (re-sedation 20–90 min; monitor ≥2 h after last dose)", s: "RN" },
        { id: "overdose-m3", t: "Serial acetaminophen/salicylate levels, glucose, K, ABG, creatinine, LFTs per order", s: "ORDER" },
        { id: "overdose-m4", t: "Seizures, hyperthermia, rhabdomyolysis, aspiration; precipitated withdrawal/pulmonary edema after naloxone", s: "RN" },
        { id: "overdose-m5", t: "Delayed toxicity (extended-release, acetaminophen, salicylates, CCB): observe per toxicology", s: "RN" }
      ],
      meds: [
        "VERIFY PER FACILITY PROTOCOL / ORDER / POISON CONTROL.",
        "Naloxone 0.4 mg/mL — IV small increments (diluted) / IM / intranasal fixed dose per standing order; infusion per order",
        "N-acetylcysteine IV per poison center/pharmacy protocol",
        "Sodium bicarbonate (TCA, per toxicology) · activated charcoal (provider/poison center order only)",
        "Calcium, glucagon, high-dose insulin + dextrose (β-blocker/CCB; toxicology only) · atropine titrated (organophosphate; pralidoxime per toxicology) · hydroxocobalamin (cyanide) · 100% O₂ (CO) · fomepizole (toxic alcohols)",
        "Benzodiazepines for sympathomimetic agitation/seizures · flumazenil: avoid routine use · lipid emulsion / dialysis per toxicology"
      ],
      escalate: [
        "!RR <10, GCS ≤8, QRS >100 ms, QTc >500 ms, seizures, hemodynamic instability, hyperthermia >39 °C → rapid response / toxicology / ICU",
        "!Suspected salicylate poisoning — avoid intubation without ventilator planning; dialysis per toxicology",
        "Co-ingestions or unknown substance — Poison Control + toxicology; psychiatry for intentional"
      ]
    }
  ]
};
