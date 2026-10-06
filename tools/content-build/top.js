module.exports = {
  version: "2.0.0",
  date: "2026-10-04",
  reviewStatus: "NOT YET CLINICALLY REVIEWED — draft for educator/medical director review",
  reviewedBy: "",            // e.g. "J. Smith RN, CNS / Dr. A. Lee / P. Pharm — 2026-11-01"
  facilityNote: "",          // e.g. "Rapid Response: ext 5555 | Pharmacy: ext 1234 | Poison Control: 1-800-222-1222"
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

  /* Guidance this content is aligned to — reviewer must confirm current editions */
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

  categories: ["Cardiac", "Respiratory", "Shock", "Neuro", "Metabolic/Renal", "GI/Heme", "Tox/Behavioral"]
};
