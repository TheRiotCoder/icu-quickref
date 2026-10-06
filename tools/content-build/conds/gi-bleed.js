module.exports = {
  id: "gi-bleed", name: "GI bleed (upper / lower)", category: "GI/Heme", emergency: false,
  keywords: ["gib", "gi bleed", "ugib", "lgib", "upper gi bleed", "lower gi bleed", "hematemesis", "melena", "coffee ground", "hematochezia", "brbpr", "variceal", "varices", "ppi", "pantoprazole", "protonix", "octreotide", "egd", "endoscopy", "blakemore", "minnesota tube", "tips", "cirrhosis"],
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
    ["RN", "!Call provider/rapid response if unstable; notify GI for urgent endoscopy per provider."],
    ["RN", "Large-bore IV ×2 (≥18 G) per protocol; monitor. Keep NPO. Protect airway (HOB up / left lateral), suction ready."],
    ["ORDER", "STAT labs per order: CBC, type & crossmatch, coags/INR, platelets, fibrinogen, BMP/BUN, LFTs, lactate, troponin if risk, ABG."],
    ["ORDER", "Transfuse per order: Hgb <7 (CAD/active ischemia <8); variceal target 7–8 (avoid over-transfusion). Massive/unstable: by hemodynamics; activate MTP per policy."],
    ["ORDER", "Hold anticoagulants, antiplatelets, NSAIDs per provider (stented coronary pts: cardiology input on aspirin); reversal per provider/pharmacy (4F-PCC, vitamin K slow IV, etc.)."],
    ["ORDER", "Cirrhosis: platelet/INR correction only per provider/hepatology — no routine FFP to 'fix' INR (viscoelastic testing if available)."],
    ["ORDER", "Suspected upper source: IV PPI per order/protocol (bolus ± infusion or intermittent per GI)."],
    ["ORDER", "Suspected variceal bleed: octreotide bolus + infusion per order; antibiotic prophylaxis (e.g., cefTRIAXone) per order — flush between calcium-containing infusions."],
    ["ORDER", "Erythromycin IV before endoscopy if ordered (check QTc and interacting drugs)."],
    ["PROV", "Anticipate/assist: intubation before endoscopy for massive hematemesis/AMS."],
    ["PROV", "Anticipate/assist: endoscopy within 24 h (variceal ≤12 h); unstable lower GI bleed → CT angiography/IR first; early TIPS discussion for high-risk variceal bleed (hepatology)."],
    ["PROV", "Anticipate/assist: refractory variceal bleed → balloon tamponade (intubated pt; scissors at bedside), TIPS/surgery."]
  ],
  monitor: [
    ["RN", "HR, BP, MAP, shock index q5–15 min while unstable; mental status; UOP"],
    ["ORDER", "Hgb/Hct q4–6h per order (initial value lags), lactate, coags, platelets, iCa (with transfusion)"],
    ["RN", "Amount/character of emesis, NG output, stool; abdominal distension"],
    ["RN", "Hepatic encephalopathy (AMS, asterixis) — avoid benzodiazepines/opioids where possible; lactulose per order"],
    ["RN", "Transfusion reaction; K/Ca after massive transfusion"]
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
};
