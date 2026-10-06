module.exports = {
  id: "hemorrhagic-shock", name: "Hypovolemic / hemorrhagic shock", category: "Shock", emergency: true,
  keywords: ["hemorrhagic shock", "hemorrhage", "bleeding", "bleed", "hypovolemic", "hypovolemia", "trauma", "transfusion", "massive transfusion", "mtp", "blood loss", "txa", "tranexamic acid", "pcc", "kcentra", "reversal", "anticoagulant reversal", "retroperitoneal bleed", "dehydration"],
  warnings: [
    "Factor Xa inhibitor (apixaban/rivaroxaban) bleeding: 4-factor PCC per facility protocol/order — follow local formulary.",
    "Tranexamic acid: trauma (≤3 h of injury; never >3 h) or postpartum hemorrhage only, per protocol/order. NOT for GI bleeding (HALT-IT). IV only — never intrathecal; spell out the name (not 'TXA', which some read as tPA).",
    "Calcium chloride and gluconate are NOT gram-for-gram equivalent (1 g chloride ≈ 3 g gluconate). Chloride via central/secure large vein; separate from bicarbonate/phosphate.",
    "Vitamin K IV: slow infusion per order — rare severe anaphylactoid reactions."
  ],
  glance: [
    "Find & STOP the bleed: direct pressure / tourniquet / call surgeon",
    "2 large-bore IVs (or IO); activate MASSIVE TRANSFUSION per policy if ongoing major bleed",
    "Blood > crystalloid; keep warm; calcium per order; BP target = provider order"
  ],
  recognize: [
    "Tachycardia, hypotension (late), narrow pulse pressure, cool pale clammy skin, AMS, oliguria, thirst",
    "No tachycardia does NOT rule out shock (β-blockers, pacemaker, elderly, athletes, pregnancy)",
    "Blood loss class (ATLS): I <15% · II 15–30% (↑HR) · III 30–40% (↓BP) · IV >40% (obtunded)",
    "Sources: trauma, GI bleed, retroperitoneal (post-cath), post-op/surgical site, chest tube, ruptured AAA, ectopic, postpartum, anticoagulation",
    "Non-hemorrhagic hypovolemia: vomiting, diarrhea, burns, DKA, over-diuresis, third-spacing. Lactate ↑, base deficit ↑, shock index (HR ÷ SBP) >0.9–1.0"
  ],
  actions: [
    ["RN", "!Call rapid response/provider/surgery now. Activate massive transfusion protocol (MTP) per policy if unstable or ongoing major bleed."],
    ["RN", "Control external bleeding: direct pressure, packing, tourniquet for extremity. Post-cath groin: manual pressure above puncture site, flat."],
    ["ORDER", "Pelvic binder if pelvic fracture suspected, per protocol/order."],
    ["RN", "Supine (leg raise ok). O₂. Keep NPO."],
    ["ORDER", "Two large-bore IVs or IO per protocol; rapid infuser/warmer. STAT labs per order: type & crossmatch, CBC, coags/fibrinogen, TEG/ROTEM, BMP, iCa, lactate, ABG."],
    ["ORDER", "Resuscitate with blood products per MTP (balanced ~1:1:1 or whole blood per facility); limit crystalloid. Two-person bedside verification; compatible fluids only."],
    ["RN", "BP target = provider order. Permissive hypotension only in selected trauma without TBI/spinal injury, per surgeon — do not let SBP drift low on your own; call."],
    ["ORDER", "Tranexamic acid per trauma/postpartum hemorrhage protocol only (≤3 h from injury/onset) — not for GI bleeding."],
    ["ORDER", "Calcium per order with ongoing transfusion (keep iCa >1.1 mmol/L); check which salt."],
    ["RN", "Prevent lethal triad: keep warm (warming blankets, warmed products), report acidosis/coagulopathy."],
    ["ORDER", "Anticoagulant reversal per provider/pharmacy: warfarin → 4F-PCC + IV vitamin K (slow); dabigatran → idarucizumab; Xa inhibitor → 4F-PCC; heparin → protamine (slow; hypotension/anaphylaxis)."],
    ["PROV", "Anticipate/assist: definitive hemostasis — OR / IR embolization / endoscopy / chest tube."]
  ],
  monitor: [
    ["RN", "HR, BP/MAP, shock index, cap refill, mentation q5–15 min"],
    ["ORDER", "Hgb/Hct (lags), lactate, base deficit, iCa, K, fibrinogen, platelets, TEG; temp (goal >36 °C)"],
    ["RN", "UOP hourly; chest tube/drain output; abdominal girth; dressing strikethrough"],
    ["RN", "Transfusion reaction signs (see Transfusion reaction card); K ↑ with massive transfusion; ongoing blood loss"],
    ["RN", "Pressor requirement (if any) — bridge only after volume"]
  ],
  meds: [
    "VERIFY PER FACILITY PROTOCOL / ORDER. No infusion or reversal-agent doses shown — per protocol/pharmacy.",
    "Blood products per MTP (pRBC : plasma : platelets ~1:1:1); cryoprecipitate/fibrinogen concentrate for low fibrinogen per protocol",
    "Tranexamic acid — trauma ≤3 h / postpartum hemorrhage only, per protocol; IV only",
    "Calcium chloride (central/secure vein) or calcium gluconate — per order; 1 g chloride ≈ 3 g gluconate",
    "Crystalloid boluses per order for NON-hemorrhagic hypovolemia (small boluses, reassess); not a substitute for blood",
    "Vasopressor (norepinephrine/vasopressin) only as bridge if refractory, per order (HIGH-ALERT)",
    "Reversal agents per pharmacy protocol: 4F-PCC, vitamin K (slow IV), protamine (slow), idarucizumab (Xa inhibitors → 4F-PCC)"
  ],
  escalate: [
    "!Ongoing bleed with unstable vitals → MTP + surgery/IR NOW",
    "!Altered mental status, SBP <80, or no response to initial transfusion",
    "Chest tube output ≥200 mL/h, expanding hematoma, or back/flank pain + hypotension after femoral access → provider now",
    "Hypothermia <35 °C, coagulopathy, or acidosis (pH <7.2) — escalate resuscitation"
  ]
};
