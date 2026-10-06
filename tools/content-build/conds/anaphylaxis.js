module.exports = {
  id: "anaphylaxis", name: "Anaphylaxis", category: "Shock", emergency: true,
  keywords: ["anaphylaxis", "anaphylactic", "allergic reaction", "allergy", "epinephrine", "epi", "epipen", "im epi", "angioedema", "hives", "urticaria", "bronchospasm", "stridor", "contrast reaction", "drug reaction", "latex", "chlorhexidine", "sugammadex"],
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
    ["RN", "STOP the suspected trigger: stop infusion, disconnect and replace tubing (do not flush residual drug in); keep bag/tubing for pharmacy/blood bank."],
    ["RN", "!Call rapid response / code team / ICU provider. Note time of onset."],
    ["ORDER", "Epinephrine IM per anaphylaxis standing order (no standing order → get verbal order immediately; do not wait for provider arrival): 0.3–0.5 mg = 0.3–0.5 mL of 1 mg/mL, anterolateral thigh. Don't delay for IV."],
    ["RN", "Supine with legs elevated (vomiting/respiratory distress: position of comfort/side; pregnant: left lateral). Do not stand or sit up abruptly."],
    ["RN", "High-flow O₂ (non-rebreather 10–15 L/min). Continuous ECG/SpO₂, BP q1–5 min."],
    ["ORDER", "Large-bore IV ×2. Rapid crystalloid boluses per order (typical adult 1–2 L; smaller aliquots in HF/ESRD); reassess after each."],
    ["ORDER", "Repeat IM epinephrine q5–15 min per order/protocol if no/partial improvement."],
    ["ORDER", "Wheeze: albuterol neb per order (nebulized epinephrine is NOT a substitute for IM)."],
    ["PROV", "Anticipate/assist: stridor/airway edema → airway expert EARLY; difficult airway cart + cricothyrotomy kit to bedside."],
    ["ORDER", "No improvement after 2 IM doses + fluids: anticipate epinephrine IV infusion per order (HIGH-ALERT, pharmacy concentration, pump library); ICU-level care."],
    ["ORDER", "Adjuncts only AFTER epinephrine and only if ordered: H1/H2 blocker, corticosteroid (infuse diphenhydramine slowly; sedation can mask airway swelling)."],
    ["ORDER", "Serum tryptase ideally 1–3 h after onset if ordered. Document allergen; update allergy list."]
  ],
  monitor: [
    ["RN", "Continuous ECG/SpO₂, BP q5 min until stable; airway/voice change/swelling progression"],
    ["RN", "Biphasic reaction can recur 1–72 h later (usually within 8 h): observe ≥4–6 h, longer if severe, per order"],
    ["RN", "Epinephrine side effects: tachycardia, tremor, HTN, arrhythmia, ischemia (older/cardiac pts)"],
    ["RN", "β-blocker patients may be refractory/bradycardic — report early"],
    ["RN", "Urine output; lactate if shock (per order)"]
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
};
