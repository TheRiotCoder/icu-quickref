module.exports = {
  id: "ards", name: "ARDS", category: "Respiratory", emergency: false,
  keywords: ["ards", "acute respiratory distress syndrome", "lung protective", "lung-protective ventilation", "low tidal volume", "prone", "proning", "peep", "ardsnet", "plateau", "driving pressure", "p/f", "pf ratio", "refractory hypoxemia", "ecmo", "vv-ecmo", "paralytic", "nmb", "cisatracurium"],
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
    ["RN", "!Notify provider/RT; anticipate diagnosis work-up (CXR, ABG, echo to exclude cardiogenic edema)."],
    ["RN", "Verify PBW from measured HEIGHT & sex (Quick tools) is entered; VT 6 mL/kg PBW (4–8) per order; RR up to 35 per order to hold minute ventilation."],
    ["RN", "Plateau ≤30 cmH₂O (check q4h and with changes with RT); driving pressure (plateau − PEEP) aim <15. Plateau >30 → call."],
    ["ORDER", "Oxygen targets SpO₂ 88–95% (PaO₂ 55–80). PEEP/FiO₂ per ARDSNet lower- or higher-PEEP table per protocol (higher PEEP often preferred in moderate–severe if compliance improves)."],
    ["ORDER", "pH goal 7.30–7.45; permissive hypercapnia acceptable. pH <7.30 → RT/provider adjust RR (max 35); pH <7.15 → call now."],
    ["ORDER", "Treat the cause per order (antibiotics, source control, stop transfusion)."],
    ["ORDER", "Lightest sedation that allows lung-protective ventilation; analgesia first (PADIS). Deeper target only if ordered."],
    ["ORDER", "NMB only on intensivist order (severe early ARDS, refractory dyssynchrony, high plateau despite sedation) — boluses preferred, short course; analgesia + deep sedation first; eye care, TOF."],
    ["ORDER", "Prone per order (P/F <150, FiO₂ ≥0.6, PEEP ≥5, ideally early): proning team protocol, 4–5 staff, secure ETT/lines/drains, protect eyes/face/pressure points. Arrest while prone → per unit policy."],
    ["ORDER", "Conservative fluids / active fluid removal once perfusion is stable, per order."],
    ["PROV", "Anticipate/assist rescue: inhaled pulmonary vasodilator trial, VV-ECMO referral (experienced center) for refractory hypoxemia/hypercapnia despite optimization."]
  ],
  monitor: [
    ["RN", "SpO₂, ABG/P/F trend; plateau & driving pressure, compliance q4h (with RT)"],
    ["RN", "Hemodynamics (high PEEP and proning can drop BP/preload)"],
    ["RN", "Net fluid balance, weights; renal function"],
    ["RN", "Prone: skin/pressure injuries, ETT position, eyes; tube-feed tolerance"],
    ["RN", "Sedation (RASS), pain (CPOT), TOF if on NMB, glucose, delirium (CAM-ICU)"]
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
};
