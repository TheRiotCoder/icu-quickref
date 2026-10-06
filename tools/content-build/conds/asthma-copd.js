module.exports = {
  id: "asthma-copd", name: "Severe asthma / COPD exacerbation & auto-PEEP", category: "Respiratory", emergency: true,
  keywords: ["asthma", "status asthmaticus", "copd", "aecopd", "copd exacerbation", "bronchospasm", "wheeze", "auto-peep", "autopeep", "intrinsic peep", "breath stacking", "dynamic hyperinflation", "albuterol", "duoneb", "ipratropium", "magnesium", "bipap", "niv", "permissive hypercapnia"],
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
    ["RN", "!Call provider/RT; sit upright; continuous SpO₂, cardiac monitor; ETCO₂ if available."],
    ["ORDER", "O₂ titrated: COPD SpO₂ 88–92%; asthma ~93–95% per order. ABG/VBG per order."],
    ["ORDER", "Inhaled short-acting β-agonist (albuterol) + ipratropium (nebulized/MDI, repeated or continuous) per order/RT protocol."],
    ["ORDER", "Systemic corticosteroid per order; IV magnesium sulfate for severe asthma per order (monitor BP, reflexes)."],
    ["ORDER", "Refractory asthma: epinephrine IM/SC or other adjuncts per provider order only (confirm concentration)."],
    ["ORDER", "Hypercapnic COPD (pH <7.35): NIV (BiPAP) per order — reassess in 1–2 h; worsening → intubation plan."],
    ["PROV", "Anticipate/assist: intubation by most experienced operator (large ETT; ketamine often used); pressors ready — post-intubation hypotension common."],
    ["ORDER", "Ventilator per order/RT: low RR, small VT, short inspiratory time/high flow, long expiratory time; permissive hypercapnia; minimal external PEEP per provider."],
    ["RN", "!Ventilated + sudden hypotension/high pressures: disconnect circuit briefly to let chest decompress, BVM slowly (low rate); check for tension PTX; call provider/RT."],
    ["ORDER", "Deep sedation/analgesia per order after intubation; avoid paralysis if possible (myopathy with steroids) — only per provider."],
    ["RN", "Antibiotics if bacterial COPD exacerbation per order; avoid sedatives in non-intubated hypercapnic patient unless ordered."]
  ],
  monitor: [
    ["RN", "RR, work of breathing, speech, mental status, SpO₂ continuously"],
    ["ORDER", "ABG/VBG trend (PaCO₂, pH) per order; K (β-agonists/steroids lower K), glucose, lactate (β-agonist-related)"],
    ["RN", "Vent: peak & plateau pressure, auto-PEEP (expiratory hold with RT), flow waveform, BP after vent changes"],
    ["RN", "HR/arrhythmia (β-agonists); BP during magnesium"],
    ["RN", "NIV tolerance, mask leak/skin, aspiration risk"]
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
};
