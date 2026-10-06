module.exports = {
  id: "overdose", name: "Overdose / poisoning basics", category: "Tox/Behavioral", emergency: false,
  keywords: ["overdose", "od", "poisoning", "tox", "toxidrome", "opioid", "naloxone", "narcan", "fentanyl", "acetaminophen", "apap", "tylenol", "nac", "salicylate", "aspirin", "asa", "tricyclic", "tca", "benzodiazepine", "beta blocker", "calcium channel blocker", "ccb", "organophosphate", "poison control", "charcoal"],
  warnings: [
    "Ventilate FIRST (BVM) — naloxone titrated to adequate breathing, not full arousal; re-sedation can occur after 20–90 min (monitor ≥2 h; longer for methadone/long-acting).",
    "High-dose insulin therapy for β-blocker/CCB toxicity is toxicology-directed ONLY — its dosing differs sharply from DKA/hyperkalemia insulin; never borrow those doses.",
    "Organophosphate/carbamate: atropine titrated to drying of bronchial secretions per toxicology — the ACLS 3 mg bradycardia maximum does NOT apply.",
    "Salicylate: intubation can be fatal (loss of respiratory compensation) — provider/toxicology must plan matched high minute ventilation; alkalinization/dialysis per toxicology."
  ],
  glance: [
    "ABCs first (BVM). Glucose. Naloxone per protocol if slow breathing/pinpoint pupils — titrate to breathing",
    "ECG (QRS, QTc). Exact drug, dose, time, intent — call POISON CONTROL 1-800-222-1222 (US) early; don't wait for levels",
    "Don't induce vomiting. Charcoal only if ordered by provider/poison center with airway protected"
  ],
  recognize: [
    "Opioid: ↓RR, pinpoint pupils, sedation · Sedative-hypnotic: sedation, slurred speech, normal pupils",
    "Sympathomimetic: agitation, mydriasis, HTN, tachycardia, hyperthermia, diaphoresis",
    "Anticholinergic: dry skin, flushed, mydriasis, delirium, urinary retention, tachycardia",
    "Cholinergic/organophosphate: SLUDGE, miosis, bradycardia, bronchorrhea, fasciculations",
    "TCA: QRS >100 ms, tachycardia, seizures · Salicylate: tinnitus, tachypnea, mixed acid–base · Acetaminophen: often asymptomatic early",
    "β-blocker/CCB: bradycardia + hypotension (+ hyperglycemia in CCB) · Consider toxic alcohols, serotonin syndrome, NMS, CO/cyanide"
  ],
  actions: [
    ["RN", "Safety first (PPE for chemical/organophosphate exposure; decontaminate skin/clothing per policy)."],
    ["RN", "!Call rapid response/provider; call Poison Control 1-800-222-1222 (US) or facility toxicology."],
    ["RN", "ABCs: BVM ventilation if hypoventilating, O₂, IV access, cardiac monitor, SpO₂/ETCO₂."],
    ["RN", "POC glucose (treat low per protocol). Temp. 12-lead ECG (QRS, QTc). Pregnancy test if applicable."],
    ["ORDER", "Opioid toxidrome with hypoventilation: naloxone per standing order/protocol — IV small increments (dilute the 0.4 mg/mL vial for small doses) or IM/intranasal fixed dose; titrate to RR/ventilation. No response at protocol max → call provider, keep ventilating."],
    ["ORDER", "Labs per order: BMP, anion gap, osm gap, ABG/VBG, lactate, acetaminophen & salicylate levels (ALL intentional ingestions), ethanol, CK, LFTs, tox screen (limited)."],
    ["ORDER", "Acetaminophen: NAC per poison center/pharmacy protocol (weight-based, pharmacy-prepared; anaphylactoid reaction risk in 1st hour). Unknown time/>8 h with detectable level or ↑ALT → don't wait for 4-h level."],
    ["ORDER", "Activated charcoal only if ordered by provider/poison center: alert or protected airway, within ordered window, substance adsorbs, no ileus/obstruction/caustics/hydrocarbons/metals/alcohols."],
    ["ORDER", "TCA/sodium-channel blocker with wide QRS/arrhythmia: sodium bicarbonate bolus per toxicology/order (salicylate alkalinization is a different regimen)."],
    ["ORDER", "β-blocker/CCB: calcium IV, glucagon, high-dose insulin + dextrose, vasopressors — toxicology-directed; glucose/K monitoring."],
    ["RN", "Benzodiazepine overdose: supportive; question routine flumazenil (seizure risk with co-ingestants/dependence)."],
    ["RN", "Intent unknown/suicide attempt: 1:1 observer, remove hazards; psychiatric evaluation after medical stabilization."]
  ],
  monitor: [
    ["RN", "Continuous ECG (QRS, QTc), SpO₂/ETCO₂, BP, temp, mentation q15–60 min"],
    ["RN", "RR and sedation after naloxone (re-sedation 20–90 min; monitor ≥2 h after last dose)"],
    ["ORDER", "Serial acetaminophen/salicylate levels, glucose, K, ABG, creatinine, LFTs per order"],
    ["RN", "Seizures, hyperthermia, rhabdomyolysis, aspiration; precipitated withdrawal/pulmonary edema after naloxone"],
    ["RN", "Delayed toxicity (extended-release, acetaminophen, salicylates, CCB): observe per toxicology"]
  ],
  meds: [
    "VERIFY PER FACILITY PROTOCOL / ORDER / POISON CONTROL.",
    "Naloxone 0.4 mg/mL — IV small increments (diluted) / IM / intranasal fixed dose per standing order; infusion per order",
    "N-acetylcysteine IV per poison center/pharmacy protocol",
    "Sodium bicarbonate (TCA, per toxicology) · activated charcoal (provider/poison center order only)",
    "Calcium, glucagon, high-dose insulin + dextrose (β-blocker/CCB; toxicology only) · atropine titrated (organophosphate; pralidoxime per toxicology) · hydroxocobalamin (cyanide) · 100% O₂ (CO) · fomepizole (toxic alcohols)",
    "Benzodiazepines for sympathomimetic agitation/seizures · flumazenil: avoid routine use · lipid emulsion / dialysis per toxicology"
  ],
  escalate: [
    "!RR <10, GCS ≤8, QRS >100 ms, QTc >500 ms, seizures, hemodynamic instability, hyperthermia >39 °C → rapid response / toxicology / ICU",
    "!Suspected salicylate poisoning — avoid intubation without ventilator planning; dialysis per toxicology",
    "Co-ingestions or unknown substance — Poison Control + toxicology; psychiatry for intentional"
  ]
};
