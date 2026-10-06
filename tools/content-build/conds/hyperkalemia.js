module.exports = {
  id: "hyperkalemia", name: "Hyperkalemia", category: "Metabolic/Renal", emergency: true,
  keywords: ["hyperkalemia", "hyperk", "high potassium", "high k", "k", "potassium", "calcium gluconate", "calcium chloride", "insulin dextrose", "albuterol", "peaked t waves", "sine wave", "dialysis", "hd", "crrt", "kayexalate", "sps", "lokelma", "szc", "patiromer"],
  warnings: [
    "Insulin for hyperK is HIGH-ALERT and causes delayed hypoglycemia: give WITH dextrose per order set (reduced insulin and/or extra dextrose in renal failure, low baseline glucose, low weight). Glucose before and hourly for ≥4–6 h.",
    "Calcium chloride ≠ calcium gluconate gram-for-gram (1 g chloride ≈ 3 g gluconate). Chloride only via central/secure large vein (vesicant). Separate line or flush between calcium and bicarbonate/phosphate (precipitates). Caution if on digoxin — provider.",
    "Avoid sodium polystyrene (SPS) with ileus, bowel obstruction or after bowel surgery (intestinal necrosis). Binders are not rapid therapy."
  ],
  glance: [
    "ECG changes (peaked T, wide QRS, loss of P) or K ≥6.5 = EMERGENCY",
    "1) Calcium IV (protect heart) · 2) Shift K in (insulin + dextrose, albuterol) · 3) Remove K (diuretic, binder, dialysis) — all per order",
    "STOP K⁺ sources now; recheck K in 1–2 h; glucose checks after insulin"
  ],
  recognize: [
    "K >5.5 mmol/L (mild 5.5–5.9 · moderate 6.0–6.4 · severe ≥6.5); rapid rise, rhabdo/tumor lysis, or ECG change at any K = urgent",
    "ECG: peaked T waves → PR prolongation, P loss → wide QRS → sine wave → VF/asystole",
    "Muscle weakness, paralysis, paresthesias, bradycardia (BRASH), palpitations; often few symptoms",
    "Causes: AKI/CKD, K-sparing diuretics, ACE-i/ARB, rhabdo, tissue breakdown, acidosis, transfusion, DKA, succinylcholine, digoxin, hemolyzed sample (pseudohyperK)"
  ],
  actions: [
    ["RN", "Cardiac monitor; 12-lead ECG. Repeat K (non-hemolyzed) per order but do NOT delay treatment if ECG changes."],
    ["RN", "!Call provider/rapid response for K ≥6.5 or any ECG change."],
    ["RN", "Hold K⁺ supplements, K⁺-containing IV fluids/tube feeds now; ask provider about K-raising meds (K-sparing diuretics, ACE-i/ARB, NSAIDs, TMP-SMX, heparin)."],
    ["ORDER", "STABILIZE HEART: calcium IV per order (gluconate preferred peripherally; chloride central) with continuous ECG; repeat per order if ECG still abnormal (effect lasts 30–60 min)."],
    ["ORDER", "SHIFT K: regular insulin IV WITH dextrose per hyperkalemia order set (if glucose ≥250 provider may omit dextrose). POC glucose before, then hourly ≥4–6 h."],
    ["ORDER", "High-dose nebulized albuterol per order (far above a routine neb; HR/rhythm; caution ischemia/tachyarrhythmia)."],
    ["ORDER", "Sodium bicarbonate only per order if metabolic acidosis (separate from calcium)."],
    ["ORDER", "REMOVE K per order: loop diuretic if making urine and not volume depleted; binder (e.g., SZC; SPS avoided with ileus/obstruction/post-op bowel)."],
    ["PROV", "Anticipate/assist: dialysis access/CRRT (nephrology STAT) for refractory/severe hyperK, oliguric AKI, or rhabdomyolysis."],
    ["ORDER", "Recheck K 1–2 h after treatment and q2–4h until stable; on digoxin → tell provider (digoxin immune Fab per order)."]
  ],
  monitor: [
    ["RN", "Continuous ECG until K <5.5 and ECG normal"],
    ["ORDER", "K at 1–2 h then q2–4h; glucose hourly ≥4–6 h after insulin (hypoglycemia can be delayed)"],
    ["RN", "Calcium effect is short; ECG changes recur → call for repeat calcium"],
    ["ORDER", "UOP, creatinine, acid–base"],
    ["RN", "Rebound hyperK as insulin/albuterol wear off (2–4 h)"]
  ],
  meds: [
    "VERIFY PER FACILITY HYPERKALEMIA ORDER SET. Typical adult published doses only where shown — give only if ordered.",
    "Calcium gluconate 10%: typical 1–3 g (10–30 mL) IV over 5–10 min, repeat per order · calcium chloride (central/secure vein) — 1 g chloride ≈ 3 g gluconate",
    "Regular insulin IV + dextrose — dose per order set (HIGH-ALERT; reduce/extra dextrose in renal failure); dextrose infusion afterward per order if glucose falling",
    "Albuterol high-dose nebulized per order · sodium bicarbonate per order if acidotic",
    "Loop diuretic per order · binders: sodium zirconium cyclosilicate, patiromer (slow), SPS (avoid with ileus/obstruction)",
    "Dialysis / CRRT"
  ],
  escalate: [
    "!Any ECG change, K ≥6.5, arrhythmia, weakness → provider now, calcium first",
    "!Oliguria/AKI or refractory → nephrology for dialysis",
    "Cardiac arrest with suspected hyperK: calcium IV (± bicarbonate, insulin/dextrose) per code leader — not routine in other arrests"
  ]
};
