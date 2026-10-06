module.exports = {
  id: "hypoglycemia", name: "Hypoglycemia (severe / ICU)", category: "Metabolic/Renal", emergency: true,
  keywords: ["hypoglycemia", "hypoglycemic", "low blood sugar", "low glucose", "low bg", "dextrose", "d50", "d10", "glucagon", "insulin", "sulfonylurea", "octreotide", "glucose", "sugar"],
  warnings: [
    "Dextrose concentration: confirm D50 vs D10 on the syringe/bag. D50 is hypertonic — patent large vein only (central if available), flush, watch site; D10 preferred where available.",
    "Never delay dextrose for thiamine — give thiamine with or right after in at-risk patients.",
    "Octreotide for sulfonylurea hypoglycemia = immediate-release injection, NOT depot/LAR."
  ],
  glance: [
    "Glucose <70 mg/dL (level 2 <54; level 3 = altered mentation needing help). Treat FIRST, then investigate",
    "Alert + can swallow safely: 15–20 g fast carbs, recheck in 15 min",
    "Cannot take PO AND has IV: IV dextrose per protocol (D50 25 g or D10) — no IV: glucagon IM/SC; pause insulin"
  ],
  recognize: [
    "Sweating, tremor, tachycardia, hunger, anxiety; confusion, seizure, coma, focal deficit mimicking stroke",
    "ICU masks: sedation, β-blockers, critical illness — check POC glucose with any unexplained change",
    "ICU causes: insulin infusion/over-correction, sulfonylureas, ↓ feeds/TPN/steroid change, sepsis, adrenal insufficiency, liver/renal failure, alcohol"
  ],
  actions: [
    ["RN", "Check glucose (POC; confirm on blood sample if unexpected). Pause insulin infusion per hypoglycemia protocol; stay with pt."],
    ["RN", "!Call provider if severe, unresponsive, seizing, on insulin infusion for DKA/HHS, or cause unclear."],
    ["ORDER", "ALERT & can swallow safely: 15–20 g fast carbohydrate (4 oz juice or 3–4 glucose tabs) per protocol. Recheck in 15 min; repeat until ≥70, then snack/meal."],
    ["ORDER", "Cannot safely take PO AND has IV/IO: dextrose per hypoglycemia protocol — D50 25 g (50 mL of 50%) slow IV push via large vein, or D10 125–250 mL (12.5–25 g). Confirm concentration."],
    ["ORDER", "No IV access: glucagon 1 mg IM/SC (or 3 mg intranasal) per protocol. Less effective in starvation/liver disease/alcohol — get IV."],
    ["RN", "Recheck glucose in 15 min and repeatedly until stable ≥70 — repeat treatment per protocol if still low."],
    ["ORDER", "Prolonged risk (insulin/sulfonylurea): dextrose-containing infusion per order."],
    ["ORDER", "Alcohol/malnutrition: thiamine IV per order with or right after dextrose — do not delay dextrose."],
    ["ORDER", "DKA/HHS on insulin: insulin paused only per protocol with dextrose given; provider decides early restart (ketosis persists)."],
    ["ORDER", "Sulfonylurea-induced: expect recurrent lows 24–72 h; octreotide (immediate-release) per order; frequent glucose checks."],
    ["RN", "Find cause; review insulin orders; check tube feeds/TPN/steroids running as ordered; document."]
  ],
  monitor: [
    ["RN", "Glucose q15 min until ≥70 ×2, then q1h ×4–6h per protocol (longer for sulfonylurea / long-acting insulin)"],
    ["RN", "Mental status, seizure activity; vitals"],
    ["RN", "Rebound hyperglycemia after D50 is common — avoid over-treating (>180)"],
    ["RN", "Nutrition status: tube feeds/TPN running? steroids changed?"],
    ["ORDER", "Renal/hepatic function, cortisol if no clear cause"]
  ],
  meds: [
    "VERIFY PER FACILITY HYPOGLYCEMIA PROTOCOL / ORDER. Typical adult published doses — give only per protocol/order.",
    "Oral fast carbohydrate 15–20 g",
    "Dextrose 50% 25 g (50 mL) slow IV push via large vein · Dextrose 10% 125–250 mL (12.5–25 g)",
    "Glucagon 1 mg IM/SC (IV per order) or 3 mg intranasal — may cause vomiting",
    "Thiamine IV if at risk (with/after dextrose) — per order",
    "Octreotide (immediate-release, not LAR) for sulfonylurea hypoglycemia — per order",
    "Hydrocortisone if adrenal insufficiency suspected — per provider"
  ],
  escalate: [
    "!Glucose <54 not responding after 2 treatments · persistent AMS · seizure",
    "Suspected sulfonylurea or long-acting insulin overdose",
    "Recurrent hypoglycemia on insulin protocol — review protocol/orders with provider"
  ]
};
