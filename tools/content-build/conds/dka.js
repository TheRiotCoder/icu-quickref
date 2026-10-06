module.exports = {
  id: "dka", name: "Diabetic ketoacidosis (DKA)", category: "Metabolic/Renal", emergency: false,
  keywords: ["dka", "diabetic ketoacidosis", "ketoacidosis", "diabetes", "insulin drip", "insulin infusion", "potassium", "k", "kcl", "anion gap", "beta-hydroxybutyrate", "bhb", "ketones", "hyperglycemia", "euglycemic dka", "sglt2", "kussmaul"],
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
    ["RN", "!Call provider; cardiac monitor; 2 IVs per protocol."],
    ["ORDER", "Labs per order: BMP (K⁺!), glucose, β-hydroxybutyrate, VBG/ABG, lactate, Mg, Phos, osm, CBC, UA, ECG; cultures if febrile."],
    ["ORDER", "Fluids per order: isotonic crystalloid at ordered rate (initial rate per protocol; slower in HF/CKD/elderly), then guided by hydration, Na, UOP."],
    ["ORDER", "POTASSIUM per DKA order set: K⁺ <3.5 → insulin HELD, K⁺ replaced at ordered rate (line/ECG/pump safeguards) until >3.5. K⁺ 3.5–5.0 → K⁺ in IV fluids as ordered. K⁺ ≥5.0 → no K⁺; recheck."],
    ["ORDER", "INSULIN only once K⁺ ≥3.5: regular insulin IV infusion per DKA order set (weight-based fixed rate; HIGH-ALERT double check). Report if glucose not falling as expected."],
    ["ORDER", "Glucose hourly. Glucose <250 mg/dL → dextrose-containing fluid added and insulin rate reduced per protocol — keep insulin running."],
    ["ORDER", "Bicarbonate only if pH <7.0, per provider order (K⁺ monitoring). Phosphate only per provider order (state units — mg/dL vs mmol/L)."],
    ["ORDER", "Find and treat the trigger per order (antibiotics, ACS work-up, stop SGLT2i)."],
    ["ORDER", "NPO until improving; antiemetic per order; strict I&O; Foley if ordered."],
    ["ORDER", "Resolution (2024): ketones (BHB) <0.6 mmol/L AND (pH ≥7.3 or HCO₃ ≥18). SC basal insulin given and overlapped 1–2 h BEFORE infusion stopped, per order."]
  ],
  monitor: [
    ["ORDER", "Glucose q1h; K⁺ 2 h after insulin starts then per protocol (e.g., q2–4h); BMP, VBG pH, BHB per order"],
    ["RN", "Continuous ECG (K⁺ shifts); UOP, I&O, vitals, mentation; IV site if K⁺ peripheral"],
    ["RN", "Hypoglycemia & hypokalemia (most common treatment complications); cerebral edema: headache, drop in GCS, bradycardia (rare in adults)"],
    ["RN", "Fluid overload in heart/renal disease; hyperchloremic (non-gap) acidosis"],
    ["ORDER", "Mg, Phos, Na (corrected Na = Na + 1.6 × [glucose − 100]/100)"]
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
};
