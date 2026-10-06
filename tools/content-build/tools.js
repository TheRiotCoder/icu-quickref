module.exports = {
  vitals: {
    title: "Normal adult vitals (approx.)",
    rows: [
      ["HR", "60–100 /min"],
      ["BP", "<120/80 normal; SBP <90, MAP <65, or SBP >40 mmHg below baseline = hypotension"],
      ["MAP", "65–100 mmHg (goal ≥65 in most shock unless ordered otherwise)"],
      ["RR", "12–20 /min (≥22 abnormal — NEWS2/MEWS trigger; do not rely on qSOFA alone to screen for sepsis)"],
      ["SpO₂", "≥94% most acutely ill (92–96% acceptable) · 88–92% if hypercapnic COPD / CO₂-retainer risk · 88–95% ARDS · post-arrest 90–98% · target per order"],
      ["Temp", "36.0–37.5 °C (96.8–99.5 °F); fever ≥38.3 °C (101 °F) in ICU (many protocols alert at ≥38.0); <36.0 °C hypothermia"],
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
      ["Troponin", "Assay-specific: above lab 99th percentile = myocardial injury; trend per lab pathway (e.g., 0/1 h or 0/2 h hs-cTn)"],
      ["ABG pH", "7.35–7.45"],
      ["PaCO₂ / PaO₂", "35–45 / 80–100 mmHg"],
      ["Anion gap", "Na − (Cl + HCO₃): ~8–12; albumin-corrected AG = AG + 2.5 × (4 − albumin g/dL)"],
      ["P/F ratio", "PaO₂ ÷ FiO₂ — Berlin ARDS (PEEP ≥5): ≤300 mild · ≤200 moderate · ≤100 severe"],
      ["Critical values", "Examples only — use your lab's list: K <3.0 or >6.0 · Na <120 or >160 · glucose <50 or >500 · pH <7.2 · lactate ≥4 · Hgb <7 · platelets <20"]
    ]
  },
  gcs: {
    title: "Glasgow Coma Scale (3–15)",
    groups: [
      { name: "Eye", items: [[4, "Spontaneous"], [3, "To sound / voice"], [2, "To pressure (pain)"], [1, "None"]] },
      { name: "Verbal", items: [[5, "Oriented"], [4, "Confused"], [3, "Words (inappropriate)"], [2, "Sounds"], [1, "None"]] },
      { name: "Motor", items: [[6, "Obeys commands"], [5, "Localizes"], [4, "Normal flexion / withdraws"], [3, "Abnormal flexion (decorticate)"], [2, "Extension (decerebrate)"], [1, "None"]] }
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
    { title: "cABCDE", lines: [
      "c — Catastrophic bleeding first (direct pressure / tourniquet / call)",
      "A — Airway: patent? Talking? Needs jaw thrust / adjunct / suction?",
      "B — Breathing: RR, SpO₂, work of breathing, breath sounds, ETCO₂",
      "C — Circulation: pulse, BP, cap refill, rhythm, bleeding, access",
      "D — Disability: GCS/AVPU, pupils, glucose, seizure",
      "E — Exposure: full skin check, temp, lines/drains, wounds"
    ]},
    { title: "Oxygen targets (default — follow the order)", lines: [
      "Most acutely ill adults: SpO₂ ≥94% (92–96% acceptable; avoid hyperoxia)",
      "Hypercapnic COPD / CO₂-retainer risk (obesity hypoventilation, neuromuscular): 88–92%",
      "ARDS: 88–95% (PaO₂ 55–80 mmHg)",
      "Post-cardiac arrest: 90–98%; ACS and stroke: give O₂ only if SpO₂ <90–94% per card"
    ]},
    { title: "Medication safety before any drug", lines: [
      "Order (or active protocol) present? Read back verbal orders.",
      "Allergies · MEASURED weight (dosing weight per order/pharmacy) · pregnancy · renal/hepatic function",
      "Right drug AND concentration (e.g., epinephrine 1 mg/mL IM vs 0.1 mg/mL IV syringe); label every syringe",
      "HIGH-ALERT (insulin, heparin, K⁺, vasopressors, sedatives/paralytics, thrombolytics, hypertonic saline): independent double check + smart-pump drug library; never override limits without an order",
      "Vesicants/pressors peripherally only per policy: large proximal vein, check site at least hourly; extravasation → stop, leave catheter, call, follow protocol",
      "When unsure: STOP and call pharmacy"
    ]},
    { title: "SBAR for calling the provider", lines: [
      "S — Situation: 'I'm calling about [pt, room]. I am concerned because ___.'",
      "B — Background: dx, code status, key history, meds/anticoagulants, allergies",
      "A — Assessment: vitals (trend), exam, labs/ABG/ECG, what changed, what you've done",
      "R — Request/Recommendation: 'I need you to come see the patient now' / specific order / how soon? / what should I monitor?",
      "Read back orders. If no response or you remain worried: escalate via chain of command / rapid response."
    ]},
    { title: "When to escalate urgently (ward-style triggers — use your facility's; ICU nurses call the provider earlier)", lines: [
      "Staff worried about the patient (always a valid reason)",
      "HR <40 or >130 · SBP <90 · RR <8 or >28 · SpO₂ <90% despite O₂",
      "Acute change in LOC (e.g., GCS drop ≥2), new seizure, stroke symptoms",
      "Acute chest pain, suspected airway compromise, uncontrolled bleeding, lactate ≥4",
      "Urine output <0.5 mL/kg/h for 4+ h, sudden new agitation or lethargy"
    ]},
    { title: "ACLS reversible causes — H's & T's", lines: [
      "Hypovolemia · Hypoxia · Hydrogen ion (acidosis) · Hypo-/Hyperkalemia · Hypothermia (also check glucose)",
      "Tension pneumothorax · Tamponade (cardiac) · Toxins · Thrombosis (pulmonary) · Thrombosis (coronary)"
    ]},
    { title: "Pre-call / handoff preparation", lines: [
      "Have ready: vitals trend, MAR (recent meds), last labs, code status, allergies, IV access",
      "Know the pt's weight and baseline (BP, mental status)",
      "Write down time of call and response; document orders read back"
    ]},
    { title: "PBW (predicted body weight) for vent settings", lines: [
      "Male: 50 + 2.3 × (height in inches − 60) kg  =  50 + 0.91 × (height cm − 152.4)",
      "Female: 45.5 + 2.3 × (height in inches − 60) kg  =  45.5 + 0.91 × (height cm − 152.4)",
      "Tidal volume 6 mL/kg PBW in ARDS (range 4–8); 6–8 mL/kg PBW typical for other ventilated pts. Use measured HEIGHT, not actual weight."
    ]}
  ]
};
