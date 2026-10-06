module.exports = {
  id: "transfusion-reaction", name: "Acute transfusion reaction", category: "GI/Heme", emergency: false,
  keywords: ["transfusion reaction", "blood reaction", "hemolytic reaction", "ahtr", "taco", "trali", "febrile reaction", "fnhtr", "septic transfusion", "allergic transfusion", "urticaria", "prbc", "platelets", "ffp", "blood bank", "abo incompatibility"],
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
    ["RN", "STOP transfusion; disconnect blood tubing at the hub; keep IV access with new tubing + 0.9% saline."],
    ["RN", "!Full vitals, SpO₂, assess airway/breathing; call provider. Severe (hypotension, hypoxemia, wheeze) → rapid response."],
    ["RN", "Bedside check: patient ID band vs bag label/tag/order — report any discrepancy to blood bank immediately."],
    ["RN", "Notify blood bank per policy; return bag, tubing, attached solutions and forms."],
    ["ORDER", "Send transfusion-reaction labs per policy/order: DAT, type & screen, CBC, LDH/bilirubin/haptoglobin, coags, BMP; first-void urine (hemoglobinuria); blood cultures (patient ± bag) if febrile/septic."],
    ["ORDER", "Treat per order: antipyretic (fever), antihistamine (mild allergic), O₂/NIV, diuretic for TACO, fluids/pressors for hypotension, antibiotics if septic."],
    ["PROV", "Anticipate/assist: intubation/ventilation (TRALI, lung-protective), management of DIC/AKI in hemolysis."],
    ["RN", "Mild urticaria only: resumption ONLY if provider orders it after evaluation (never for fever, dyspnea, hypotension)."],
    ["RN", "Document time, volume transfused, unit numbers, symptoms, actions; complete incident/hemovigilance report."]
  ],
  monitor: [
    ["RN", "Vitals q15 min until stable, then per policy; SpO₂, RR, breath sounds"],
    ["RN", "UOP and urine color (hemoglobinuria → AKI risk)"],
    ["ORDER", "Hemolysis labs, coags, creatinine, K per order"],
    ["RN", "Fluid balance (TACO), bleeding/oozing (DIC)"],
    ["RN", "Subsequent transfusions: closer vitals; premedication only if ordered"]
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
};
