module.exports = {
  id: "delirium-agitation", name: "ICU delirium / agitation", category: "Tox/Behavioral", emergency: false,
  keywords: ["delirium", "icu delirium", "agitation", "agitated", "confusion", "cam-icu", "cam icu", "rass", "padis", "abcdef bundle", "sundowning", "restraints", "self extubation", "haloperidol", "haldol", "quetiapine", "dexmedetomidine", "precedex", "sedation"],
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
    ["RN", "Safety: stay with patient/sitter, protect airway/lines/tubes, bed low; call for help if danger."],
    ["RN", "!Acute change in mental status: check SpO₂, ETCO₂/ABG if ventilated, glucose, vitals, pain, bladder scan; notify provider (new focal deficit → stroke pathway)."],
    ["RN", "Assess with RASS and CAM-ICU (CIWA-Ar only for communicative alcohol-withdrawal pts); assess pain (CPOT/BPS if non-verbal)."],
    ["ORDER", "Analgesia first per order; light sedation target per order; daily sedation interruption/SBT per protocol."],
    ["RN", "Non-drug bundle: reorient, glasses/hearing aids, day-night routine, noise/light control, early mobility, family presence, minimize tethers."],
    ["ORDER", "Review meds with pharmacist/provider: deliriogenic drugs (benzodiazepines, anticholinergics, opioid excess, steroids)."],
    ["ORDER", "Dexmedetomidine may be preferred over benzodiazepines for ventilated agitation per order (watch bradycardia/hypotension)."],
    ["ORDER", "Antipsychotic only per order for severe distress/danger; baseline/serial QTc, K/Mg."],
    ["ORDER", "Restraints only per policy/order after alternatives; reassess and document per policy."],
    ["RN", "Withdrawal (alcohol, opioid, benzodiazepine, nicotine) → see Alcohol withdrawal card; notify provider."]
  ],
  monitor: [
    ["RN", "RASS and CAM-ICU each shift and with change; pain score"],
    ["RN", "Sleep, mobility level, restraint checks per policy"],
    ["ORDER", "QTc, K, Mg on antipsychotics per order"],
    ["RN", "HR/BP with dexmedetomidine; oversedation (RASS ≤ −2)"],
    ["RN", "Self-extubation/line removal risk; falls"]
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
};
