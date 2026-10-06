module.exports = {
  id: "ischemic-stroke", name: "Acute ischemic stroke", category: "Neuro", emergency: true,
  keywords: ["stroke", "cva", "code stroke", "stroke alert", "ischemic stroke", "ais", "brain attack", "tpa", "alteplase", "tenecteplase", "tnk", "lytics", "thrombolysis", "thrombectomy", "evt", "lvo", "nihss", "be-fast", "fast", "lkw", "last known well", "facial droop", "aphasia", "hemiparesis"],
  warnings: [
    "LYSIS SCREEN (nurse gathers, provider decides): glucose <50; platelets <100,000; INR >1.7 / aPTT >40 s / PT >15 s; therapeutic LMWH <24 h; DOAC <48 h (unless normal renal function/specific assays); prior ICH; intracranial neoplasm/AVM.",
    "LYSIS SCREEN (cont.): major surgery or serious trauma <14 d (head trauma/prior stroke <3 mo); GI/GU bleed <21 d; BP persistently >185/110; suspected aortic arch dissection; infective endocarditis; extensive hypodensity on CT; symptoms suggesting SAH (verify vs AHA/ASA 2026 and facility checklist).",
    "Thrombolytics are HIGH-ALERT: ordered by stroke provider; MEASURED weight preferred; dose prepared/verified by pharmacy or stroke protocol with independent bedside double check. Stroke TNK dose ≠ STEMI TNK dose; alteplase stroke ≠ PE ≠ line-clearance.",
    "Orolingual angioedema during/after lytic (esp. ACE-i): stop infusion, call airway/rapid response now."
  ],
  glance: [
    "Note LAST KNOWN WELL time. Call STROKE CODE. Check glucose.",
    "STAT non-contrast CT head (goal door-to-CT ≤20–25 min per facility); NPO until swallow screen",
    "Lysis ≤4.5 h from LKW (longer with advanced imaging per stroke team); thrombectomy up to 24 h for LVO — disabling deficit = treat regardless of NIHSS"
  ],
  recognize: [
    "BE-FAST: Balance, Eyes (vision loss), Face droop, Arm drift, Speech slurred/aphasia, Time",
    "Sudden: weakness/numbness one side, aphasia, visual loss, vertigo with ataxia, severe headache (hemorrhagic?), neglect, gaze deviation",
    "In ICU/post-op: new deficit in any pt = stroke until proven otherwise; sedated pt — provider may hold sedation for exam",
    "Mimics: hypoglycemia, seizure/post-ictal, migraine, Bell's palsy, sepsis, hypotension, hyponatremia, drug effect — check glucose first"
  ],
  actions: [
    ["RN", "Note LKW (last time seen normal) / discovery time and witness phone number. Do NOT give food/drink/oral meds."],
    ["RN", "!Activate stroke code / rapid response."],
    ["RN", "ABCs; O₂ only if SpO₂ <94%. HOB per order/protocol (elevate if aspiration or ↑ICP risk). IV ×2 per protocol."],
    ["RN", "POINT-OF-CARE GLUCOSE; treat hypoglycemia per facility protocol (stroke guidance threshold <60 mg/dL)."],
    ["ORDER", "STAT CT head non-contrast ± CTA/perfusion; labs per order (CBC, BMP, coags, troponin, type & screen); ECG — do not delay lysis for labs unless anticoagulant/bleeding disorder suspected."],
    ["RN", "Gather lysis-screen data before CT returns: measured weight, LKW, last DOAC/LMWH/warfarin/antiplatelet dose & time, recent surgery/trauma/GI bleed, prior ICH, BP, glucose. NIHSS by trained staff."],
    ["ORDER", "BP per order: lysis candidate <185/110 before and <180/105 for 24 h after. No lysis: permissive HTN unless >220/120 or other indication. Call if outside ordered range on 2 checks."],
    ["PROV", "Anticipate/assist: thrombolysis decision by stroke provider (alteplase or tenecteplase per protocol/pharmacy). Door-to-needle goal ≤60 min (ideally ≤45)."],
    ["PROV", "Anticipate/assist: LVO suspected → transfer/IR for thrombectomy (extended windows via imaging)."],
    ["RN", "No aspirin/anticoagulant until hemorrhage excluded and lysis decision made (aspirin usually ≥24 h after lysis, per order)."],
    ["RN", "Bedside swallow screen BEFORE any oral intake."],
    ["RN", "!During/after lytic: severe headache, N/V, neuro decline, acute hypertension, bleeding, or tongue/lip swelling → STOP infusion per protocol, call provider; stat CT per order."]
  ],
  monitor: [
    ["ORDER", "Post-lysis: neuro checks + BP q15 min ×2 h, q30 min ×6 h, then q1h ×16 h (or per protocol)"],
    ["ORDER", "Post-thrombectomy BP target per stroke team (avoid intensive lowering to SBP <140)"],
    ["RN", "Angioedema (tongue/lip/throat swelling) during/after lytic, esp. on ACE-i — airway readiness"],
    ["ORDER", "Glucose 140–180; temp (treat fever per order); SpO₂; aspiration precautions"],
    ["RN", "No arterial punctures/NG/Foley/IM injections for 24 h post-lysis unless essential (provider)"],
    ["ORDER", "Repeat CT at 24 h before antithrombotics"]
  ],
  meds: [
    "VERIFY PER FACILITY PROTOCOL / ORDER (AHA/ASA 2026). No numeric thrombolytic or antihypertensive-infusion doses shown — per stroke protocol/pharmacy.",
    "Thrombolytic: alteplase or tenecteplase — stroke-specific weight-based dose per order/pharmacy (HIGH-ALERT)",
    "BP: labetalol IV (hold for bradycardia/heart block/asthma/acute HF) or niCARdipine / clevidipine infusion titrated per order (clevidipine = lipid emulsion; niCARdipine ≠ NIFEdipine)",
    "Symptomatic ICH after lytic: reversal (e.g., cryoprecipitate, antifibrinolytic) per stroke protocol/provider",
    "Angioedema: airway first; treatment (epinephrine, antihistamine, steroid, others) per provider; hold ACE-i",
    "Aspirin only after swallow screen or alternate route, per order, timing per lysis status; DAPT for minor stroke per neurology",
    "Statin, glucose control, DVT prophylaxis (IPC) per order; antiepileptics only if seizure"
  ],
  escalate: [
    "!Any new deficit, decreased LOC, severe headache or vomiting → call provider/stroke team; stat CT",
    "!BP above ordered limits despite meds",
    "Malignant edema signs (decline day 2–4) → neurosurgery/neuro-ICU for hemicraniectomy"
  ]
};
