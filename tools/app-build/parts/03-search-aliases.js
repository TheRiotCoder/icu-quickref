/* ===================== 03 search: synonym / abbreviation map ===================== */
/* key "a|b|c" -> targets. Target "x" matches condition id x or x-*; "x*" matches any id
   starting with x; "tool:x" = a Quick tool. `terms` are extra words searched in keywords/body.
   Targets that don't exist in data.js are ignored, so this map can list planned conditions. */
var ALIAS_SRC = [
  ['code|code blue|arrest|cardiac arrest|cpr|pulseless|no pulse|acls|rosc|pea|asystole|vf|vfib|v fib|ventricular fibrillation|pvt|pulseless vt|defib|defibrillation|crash', ['cardiac-arrest', 'tool:timer']],
  ['vt|vtach|v tach|ventricular tachycardia|wide complex|torsades', ['unstable-tachy', 'cardiac-arrest']],
  ['svt|tachy|tachycardia|narrow complex|adenosine', ['unstable-tachy', 'afib-rvr']],
  ['brady|bradycardia|heart block|chb|av block|pacing|pacer|atropine', ['unstable-brady']],
  ['pe|pulmonary embolus|pulmonary embolism|clot|vte|dvt|saddle', ['pe']],
  ['gib|ugib|lgib|gi bleed|gi bleeding|gastrointestinal bleed|hematemesis|melena|brbpr|varices|variceal|coffee ground', ['gi-bleed']],
  ['mi|ami|heart attack|stemi|nstemi|acs|chest pain|myocardial infarction|unstable angina|cath lab', ['acs-mi']],
  ['af|afib|a fib|atrial fibrillation|rvr|aflutter|flutter|atrial flutter|wpw', ['afib-rvr']],
  ['sz|seizure|seizures|seizing|convulsion|convulsions|status|fitting', ['status-epilepticus']],
  ['levophed|norepi|norepinephrine|noradrenaline|pressor|pressors|vasopressor|vasopressors|vasopressin', { ids: ['sepsis', 'cardiogenic-shock', 'hemorrhagic-shock'], terms: ['norepinephrine'] }],
  ['shock|hypotension|hypotensive', ['sepsis', 'cardiogenic-shock', 'hemorrhagic-shock', 'anaphylaxis']],
  ['k|potassium|hyperk|hyperkalemia|high k|high potassium|peaked t', ['hyperkalemia']],
  ['hypok|hypokalemia|low k|low potassium', ['hypokalemia*', 'hyperkalemia']],
  ['dka|ketoacidosis|diabetic ketoacidosis', ['dka']],
  ['hhs|hyperosmolar|hhns|hyperglycemia|high sugar', ['hhs*', 'dka']],
  ['icp|herniation|ich|brain bleed|sah|subarachnoid|intracranial|blown pupil|evd', ['ich-icp', 'severe-tbi', 'tbi*']],
  ['tbi|head injury|head trauma|brain injury|cpp', ['severe-tbi', 'tbi*', 'ich-icp']],
  ['cva|stroke|tia|code stroke|lvo|tpa|tnk|alteplase|tenecteplase|nihss', ['ischemic-stroke', 'ich-icp']],
  ['od|overdose|poisoning|poison|tox|toxic|narcan|naloxone|opioid|opiate|tylenol|acetaminophen|apap', ['overdose']],
  ['etoh|alcohol|dts|dt|delirium tremens|withdrawal|ciwa|drunk', ['alcohol-withdrawal']],
  ['ptx|pneumo|pneumothorax|tension|tension pneumo|needle decompression|chest tube', ['tension-pneumothorax']],
  ['hypo|hypoglycemia|low sugar|low bg|low glucose|low blood sugar|d50', ['hypoglycemia']],
  ['epi|epinephrine|adrenaline', { ids: ['cardiac-arrest', 'anaphylaxis'], terms: ['epinephrine'] }],
  ['epipen|epi pen|anaphylaxis|anaphylactic|allergic|allergy|allergic reaction|angioedema', ['anaphylaxis']],
  ['aki|arf|renal failure|kidney|kidney injury|oliguria', ['aki']],
  ['crrt|dialysis|hd|cvvhd', ['aki', 'hyperkalemia']],
  ['ards|prone|proning|lung protective', ['ards']],
  ['intubation|intubate|rsi|ett|airway|bvm|niv|bipap|cpap|resp failure|respiratory failure|hypoxia|hypoxemia', ['resp-failure-intubation', 'airway-emergency', 'trach*', 'difficult-airway*']],
  ['vent|ventilator|vent alarm|alarm|alarms|dope|high pressure|peak pressure|low pressure', ['vent-alarms', 'resp-failure-intubation']],
  ['sepsis|septic|infection|hour 1 bundle|lactate|qsofa', ['sepsis']],
  ['tamponade|pericardial|pericardiocentesis|becks triad|pulsus', ['tamponade']],
  ['bleed|bleeding|hemorrhage|mtp|massive transfusion|trauma|blood loss|txa', ['hemorrhagic-shock', 'gi-bleed']],
  ['cardiogenic|pump failure|impella|iabp|ecmo|inotrope|dobutamine|milrinone', ['cardiogenic-shock']],
  ['asthma|copd|wheeze|wheezing|bronchospasm|auto peep|autopeep|status asthmaticus', ['asthma*', 'copd*', 'severe-asthma*']],
  ['chf|adhf|heart failure|pulmonary edema|flash pulmonary edema|apo|fluid overload', ['pulm-edema-adhf', 'adhf*', 'acute-pulmonary-edema*', 'pulmonary-edema*', 'acute-heart-failure*', 'cardiogenic-shock']],
  ['htn|hypertensive|hypertensive emergency|hypertensive crisis|high bp', ['hypertensive-emergency', 'hypertensive*', 'aortic-dissection']],
  ['dissection|aortic dissection|aaa|tearing pain', ['aortic-dissection', 'aortic*', 'hypertensive-emergency']],
  ['na|sodium|hyponatremia|hypernatremia|low sodium|high sodium', ['hyponatremia*', 'hypernatremia*', 'sodium*']],
  ['transfusion reaction|trali|taco|blood reaction', ['transfusion*', 'anaphylaxis']],
  ['trach|tracheostomy|cric|cricothyrotomy|difficult airway|cant intubate', ['airway-emergency', 'trach*', 'difficult-airway*', 'resp-failure-intubation']],
  ['delirium|agitation|agitated|cam icu|combative', ['delirium*', 'agitation*', 'alcohol-withdrawal']],
  ['liver|liver failure|alf|hepatic|hepatic encephalopathy|ammonia', ['liver*', 'acute-liver*', 'alf*']],
  ['cabg|sternotomy|cals|post op heart|cardiac surgery|post cardiac surgery', ['post-cardiac*', 'cardiac-surgery*', 'tamponade']],
  ['sci|spinal|spinal cord|neurogenic shock', ['spinal-cord-injury', 'spinal*', 'sci*']],
  ['timer|code timer|stopwatch|clock', ['tool:timer', 'cardiac-arrest']],
  ['gcs|glasgow|coma scale|loc', ['tool:gcs']],
  ['rass|sedation scale|sedation', ['tool:rass']],
  ['sbar|call provider|calling provider|handoff|hand off|report', ['tool:sbar', 'tool:handoff']],
  ['hs and ts|hs ts|h and t|hs & ts|reversible causes|hts', ['tool:hts', 'cardiac-arrest']],
  ['pbw|ibw|predicted body weight|ideal body weight|tidal volume', ['tool:pbw', 'ards']],
  ['labs|lab|lab values|normal labs|lab ranges|anion gap', ['tool:labs']],
  ['vitals|vital signs|normal vitals', ['tool:vitals']],
  ['abcde|abc|primary survey', ['tool:abcde']],
  ['rapid response|rrt|met call|rapid response triggers', ['tool:rrt']]
];
var STOPWORDS = { the: 1, of: 1, and: 1, a: 1, an: 1, to: 1, with: 1, for: 1, in: 1, on: 1, or: 1, is: 1 };
/* Normalize for matching: lowercase, strip accents, UK spellings (ae/oe), join hyphenated words. */
function normText(s) {
  s = String(s || '').toLowerCase();
  try { s = s.normalize('NFD').replace(/[\u0300-\u036f]/g, ''); } catch (e) {}
  s = s.replace(/₂/g, '2').replace(/₃/g, '3').replace(/['’]/g, '').replace(/([a-z0-9])[-.]+(?=[a-z0-9])/g, '$1');
  s = s.replace(/ae(?=m)/g, 'e').replace(/\boe(?=d|s)/g, 'e').replace(/&/g, ' and ');
  return s.replace(/[^a-z0-9]+/g, ' ').trim();
}
var ALIAS = {};
ALIAS_SRC.forEach(function (row) {
  var tg = Array.isArray(row[1]) ? { ids: row[1], terms: [] } : row[1];
  row[0].split('|').forEach(function (k) {
    k = normText(k); if (!k) return;
    var cur = ALIAS[k] || (ALIAS[k] = { ids: [], terms: [] });
    tg.ids.forEach(function (x) { if (cur.ids.indexOf(x) < 0) cur.ids.push(x); });
    (tg.terms || []).forEach(function (x) { if (cur.terms.indexOf(x) < 0) cur.terms.push(normText(x)); });
  });
});
function aliasFor(q) { return ALIAS[q] || ALIAS[q.replace(/ /g, '')] || null; }
function targetMatches(t, id) {
  if (t.charAt(t.length - 1) === '*') return id.indexOf(t.slice(0, -1)) === 0;
  return id === t || id.indexOf(t + '-') === 0;
}
/* Rank of an entry among an alias' targets (0 = first), or -1. */
function aliasRank(al, id) {
  if (!al) return -1;
  for (var i = 0; i < al.ids.length; i++) if (targetMatches(al.ids[i], id)) return i;
  return -1;
}
/* Levenshtein distance with early exit when it exceeds max. */
function lev(a, b, max) {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > max) return max + 1;
  var prev = [], cur, i, j;
  for (j = 0; j <= b.length; j++) prev[j] = j;
  for (i = 1; i <= a.length; i++) {
    cur = [i]; var best = i;
    for (j = 1; j <= b.length; j++) {
      cur[j] = Math.min(prev[j] + 1, cur[j - 1] + 1, prev[j - 1] + (a.charAt(i - 1) === b.charAt(j - 1) ? 0 : 1));
      if (cur[j] < best) best = cur[j];
    }
    if (best > max) return max + 1;
    prev = cur;
  }
  return prev[b.length];
}
