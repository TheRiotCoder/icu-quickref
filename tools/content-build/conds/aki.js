module.exports = {
  id: "aki", name: "Acute kidney injury (AKI)", category: "Metabolic/Renal", emergency: false,
  keywords: ["aki", "acute kidney injury", "kidney failure", "renal failure", "arf", "oliguria", "low urine output", "low uop", "creatinine", "cr", "dialysis", "hd", "crrt", "cvvhdf", "nephrotoxins", "contrast", "prerenal", "atn", "kdigo", "rhabdo", "rhabdomyolysis", "bladder scan"],
  warnings: [
    "Renal function changes drug doses: ask pharmacy to re-dose renally cleared drugs daily; creatinine-based eGFR is unreliable while function is changing. Do not reduce a FIRST antibiotic dose without pharmacy advice. CRRT changes clearance.",
    "Do not delay emergent contrast imaging (e.g., PE, stroke) because of AKI — tell the ordering provider; they decide."
  ],
  glance: [
    "Oliguria (<0.5 mL/kg/h ×6 h) or Cr ↑0.3 in 48 h / ≥1.5× baseline = AKI",
    "Find the cause: prerenal (volume, perfusion) · intrinsic (ATN, toxins) · postrenal (obstruction — bladder scan!)",
    "Fix perfusion (MAP per order), review nephrotoxins with pharmacy; watch K/acid/volume for dialysis triggers"
  ],
  recognize: [
    "KDIGO: Cr rise ≥0.3 mg/dL within 48 h, ≥1.5× baseline within 7 d, or UOP <0.5 mL/kg/h ×6 h",
    "Stage 1: Cr 1.5–1.9× or ↑≥0.3 or UOP <0.5 for 6–12 h · Stage 2: 2.0–2.9× or UOP <0.5 ≥12 h · Stage 3: ≥3× or Cr ≥4.0 or RRT or UOP <0.3 ≥24 h or anuria ≥12 h",
    "Causes: sepsis, shock, hypovolemia, cardiorenal, contrast, vancomycin/aminoglycosides, NSAIDs, rhabdomyolysis, obstruction, hepatorenal, abdominal compartment syndrome",
    "Clues: dark/tea urine + high CK = rhabdo; tense distended abdomen + low UOP → bladder pressure (abdominal compartment)",
    "Late: volume overload, ↑K, metabolic acidosis, uremic signs (confusion, pericardial rub, bleeding)"
  ],
  actions: [
    ["RN", "!Notify provider of low UOP or rising creatinine; verify baseline Cr."],
    ["RN", "Bladder scan; flush/replace Foley per policy if blocked; confirm catheter output; notify for obstruction."],
    ["RN", "Volume assessment: vitals, orthostatics (if able), JVP, edema, lung exam, weight, I&O; IVC ultrasound per provider."],
    ["ORDER", "Hypovolemic → crystalloid bolus per order (small, e.g., 250–500 mL) and reassess. Overloaded → hold fluids; diuretic trial per provider."],
    ["ORDER", "MAP goal per order (usually ≥65; higher in chronic HTN only if ordered); treat shock/sepsis."],
    ["ORDER", "Review nephrotoxins with provider/pharmacy: NSAIDs, IV contrast, aminoglycosides, vancomycin (AUC/levels per pharmacy), ACE-i/ARB; diuretics only for overload."],
    ["ORDER", "Labs per order: BMP, K, HCO₃, Mg, Phos, CBC, UA + urine Na/Cr/urea, CK if rhabdo, ABG/VBG; renal ultrasound; bladder pressure if suspected compartment syndrome."],
    ["ORDER", "Treat hyperkalemia/acidosis per protocol (see Hyperkalemia)."],
    ["RN", "Strict I&O (hourly UOP), daily weight, avoid unnecessary lines/catheter days."],
    ["PROV", "Anticipate/assist: dialysis/CRRT for A.E.I.O.U. — refractory Acidosis, Electrolytes (K), Intoxication, Overload, Uremia. No early RRT without a definite indication (SSC 2026)."]
  ],
  monitor: [
    ["RN", "UOP hourly; creatinine/BUN per order"],
    ["ORDER", "K, HCO₃, Na, Phos, Mg, Ca per protocol"],
    ["RN", "Fluid balance, weight, lung sounds, SpO₂ (overload)"],
    ["ORDER", "Drug levels (vancomycin, aminoglycosides); daily pharmacy dose review"],
    ["RN", "CRRT: filter pressures, anticoagulation (citrate → ionized Ca), temp, fluid removal goals"]
  ],
  meds: [
    "VERIFY PER FACILITY PROTOCOL / ORDER.",
    "Crystalloid bolus per order if hypovolemic (small, reassess)",
    "Norepinephrine to ordered MAP if shock (HIGH-ALERT, pump library)",
    "Loop diuretic (e.g., furosemide) for overload per order — not to 'treat' AKI or make urine in prerenal state",
    "Hyperkalemia/acidosis therapy · phosphate binders per nephrology",
    "Avoid/limit nephrotoxins; renal re-dosing of antibiotics and other drugs by pharmacy"
  ],
  escalate: [
    "!Anuria, K ≥6.5/ECG changes, pH <7.2, pulmonary edema → nephrology STAT",
    "Obstruction on scan/ultrasound → urology",
    "Rising Cr despite perfusion fix; nephrotoxic exposure; rhabdomyolysis; high bladder pressure"
  ]
};
