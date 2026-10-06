module.exports = {
  id: "aortic-dissection", name: "Acute aortic dissection / acute aortic syndrome", category: "Cardiac", emergency: true,
  keywords: ["aortic dissection", "dissection", "aad", "type a", "type b", "acute aortic syndrome", "tearing chest pain", "back pain", "pulse deficit", "aorta", "esmolol", "intramural hematoma", "aortic rupture"],
  warnings: [
    "NO anticoagulants, antiplatelets or thrombolytics until dissection excluded — dissection can mimic STEMI/stroke.",
    "HR control BEFORE vasodilator (vasodilator alone causes reflex tachycardia → shear). Targets (often HR ~60, SBP ~100–120) per ORDER.",
    "Tamponade from type A dissection: needle pericardiocentesis can be fatal — emergent SURGERY; call cardiac surgery."
  ],
  glance: [
    "Abrupt severe tearing/ripping chest/back pain, pulse/BP differential, neuro deficit, new AR murmur → suspect dissection",
    "CTA per order; NO anticoagulants/antiplatelets/lytics; IV β-blocker first then vasodilator per order",
    "Type A (ascending) = emergency surgery; type B = medical/endovascular per vascular surgery"
  ],
  recognize: [
    "Sudden severe chest, back or abdominal pain (tearing/ripping, maximal at onset), syncope",
    "Pulse deficit or SBP difference between arms, new aortic regurgitation murmur, hypotension/tamponade",
    "Malperfusion: stroke/paraplegia, limb ischemia, mesenteric ischemia (pain, lactate), AKI, MI (often RCA)",
    "Risk: hypertension, Marfan/connective tissue disease, bicuspid valve, cocaine, prior aortic surgery, pregnancy"
  ],
  actions: [
    ["RN", "!Call provider/rapid response; cardiac/vascular surgery notification per provider."],
    ["RN", "BP in BOTH arms; pulses all 4 limbs; neuro & limb checks; 2 large-bore IVs; monitor; type & crossmatch per order."],
    ["RN", "HOLD/question any anticoagulant, antiplatelet, or thrombolytic until dissection excluded."],
    ["ORDER", "STAT CTA chest/abdomen/pelvis or TEE/POCUS per order; ECG, troponin, lactate, CBC, coags, BMP per order."],
    ["PROV", "Anticipate/assist: arterial line (usually right arm unless differential favors otherwise per provider)."],
    ["ORDER", "IV β-blocker (e.g., esmolol, labetalol) FIRST to ordered HR target; then vasodilator (niCARdipine, clevidipine, nitroprusside) per order to ordered SBP target."],
    ["ORDER", "Analgesia (IV opioid) per order — pain drives HR/BP."],
    ["RN", "Hypotension = rupture/tamponade/AR/malperfusion: call STAT; fluids/blood per order; no vasodilators."],
    ["PROV", "Anticipate/assist: type A → emergency surgery; type B complicated → endovascular repair; spinal drain per surgery."]
  ],
  monitor: [
    ["RN", "Arterial BP, HR continuously (titration targets per order)"],
    ["RN", "Neuro checks, lower-limb motor/sensory (spinal ischemia), limb pulses/perfusion q1h"],
    ["RN", "Pain trajectory (new/worsening pain = extension), abdominal exam, UOP"],
    ["ORDER", "Lactate, creatinine, Hgb per order"],
    ["RN", "Signs of tamponade (JVD, pulsus, hypotension)"]
  ],
  meds: [
    "VERIFY PER FACILITY PROTOCOL / ORDER. No infusion rates shown.",
    "Esmolol or labetalol (β-blocker FIRST) per order; non-DHP CCB if β-blocker contraindicated per provider",
    "Vasodilator after HR controlled: niCARdipine, clevidipine, nitroprusside per order",
    "IV opioid analgesia per order",
    "Blood products per order; avoid anticoagulants/antiplatelets/lytics"
  ],
  escalate: [
    "!Hypotension, shock, tamponade signs, new neuro deficit/paraplegia, limb or gut ischemia",
    "!Pain recurring/worsening, HR/BP not at target",
    "Any planned anticoagulant/lytic for 'ACS/stroke' with dissection features → stop and clarify"
  ]
};
