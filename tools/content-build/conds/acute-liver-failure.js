module.exports = {
  id: "acute-liver-failure", name: "Acute liver failure / hepatic encephalopathy", category: "GI/Heme", emergency: false,
  keywords: ["alf", "acute liver failure", "fulminant hepatic failure", "liver failure", "hepatic encephalopathy", "he", "ammonia", "acetaminophen toxicity", "apap", "nac", "lactulose", "rifaximin", "coagulopathy", "inr", "transplant", "cerebral edema", "cirrhosis"],
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
    ["RN", "!Notify provider of encephalopathy change, glucose low, bleeding, hemodynamic change."],
    ["ORDER", "Labs per order: INR, LFTs, glucose, ammonia (ALF), lactate, ABG, BMP, phosphate, CBC, acetaminophen level, tox/viral screen, cultures."],
    ["ORDER", "POC glucose q1–2h or per order; dextrose infusion/bolus per protocol for hypoglycemia."],
    ["ORDER", "NAC IV per poison center/pharmacy protocol (acetaminophen; non-acetaminophen ALF per provider)."],
    ["PROV", "Anticipate/assist: intubation for grade 3–4 HE; transplant center referral/transfer."],
    ["RN", "Neuro: GCS/HE grade, pupils q1h; HOB 30°, head midline, minimize stimulation; seizure precautions."],
    ["ORDER", "Raised ICP risk: Na target/hyperosmolar therapy per order; normothermia; avoid hypotonic fluids."],
    ["ORDER", "Hemodynamics: fluids then vasopressor to MAP goal per order; AKI → early CRRT per provider."],
    ["ORDER", "Hepatic encephalopathy (cirrhosis): lactulose per order titrated to stool output ± rifaximin; identify trigger (GI bleed, infection, sedatives, electrolytes)."],
    ["RN", "Avoid/question sedatives, benzodiazepines, hepatotoxic drugs (incl. acetaminophen dosing), NSAIDs; bleeding precautions."]
  ],
  monitor: [
    ["RN", "Glucose q1–2h; neuro/HE grade q1h"],
    ["ORDER", "INR, LFTs, lactate, ammonia, Na, K, phosphate, creatinine per order"],
    ["RN", "MAP, HR, temperature, SpO₂; infection signs (high risk)"],
    ["RN", "Bleeding (lines, GI), stool output with lactulose, I&O"],
    ["RN", "Signs of cerebral edema (pupils, HTN + bradycardia, posturing)"]
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
};
