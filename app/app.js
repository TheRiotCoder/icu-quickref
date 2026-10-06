/* ICU QuickRef: app logic (v2). Content lives in data.js. No build step needed to deploy:
   this file is plain ES5-compatible JS. Supports both data schemas (string list items or
   {id,t,s} objects; top-level meta{} or legacy version/date/reviewStatus). */
(function () {
  'use strict';
  try {
/* ===================== 01 core: constants, helpers, storage ===================== */
var $ = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
var app = $('#app');

var MIN = 60e3, HOUR = 60 * MIN, DAY = 24 * HOUR;
var TICK_TTL = 12 * HOUR;            // checklist ticks expire 12 h after being ticked
var TIMER_STALE_WARN = 60 * MIN;     // running > 60 min: on-screen warning
var TIMER_STALE_PROMPT = 2 * HOUR;   // running > 2 h at launch: ask whether to end it
var TIMER_LOG_TTL = 12 * HOUR;       // a stopped code log is discarded after 12 h
var CYCLE = 120;                     // rhythm check every 2 min (seconds)
var TAP_LOCK_MS = 600;               // debounce for timer controls (double taps)
var SAME_EVENT_LOCK_MS = 2000;       // ignore a 2nd epi/shock within 2 s (duplicate tap)
var ALERT_REPEAT_MS = 10e3;          // rhythm-check alert repeats until acknowledged
var ALERT_MAX_REPEATS = 6;
var VERIFY_STALE_DAYS = 14;          // "not verified online" warning
var VERSION_CHECK_MS = 30 * MIN;

function reducedMotion() { return !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches); }
function scrollBehavior() { return reducedMotion() ? 'auto' : 'smooth'; }

function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
function str(v) { return typeof v === 'string' ? v : (typeof v === 'number' && isFinite(v) ? String(v) : ''); }
function isObj(v) { return !!v && typeof v === 'object' && !Array.isArray(v); }
function isNum(v) { return typeof v === 'number' && isFinite(v); }
function arr(v) { return Array.isArray(v) ? v : []; }
function hash(s) { var h = 5381; s = String(s); for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0; return 'h' + (h >>> 0).toString(36); }
function pad2(n) { return (n < 10 ? '0' : '') + n; }
function fmt(sec) { sec = Math.max(0, Math.floor(sec)); var m = Math.floor(sec / 60), s = sec % 60; return pad2(m) + ':' + pad2(s); }
function clock(ts) { var d = new Date(ts); return pad2(d.getHours()) + ':' + pad2(d.getMinutes()); }
function dateTime(ts) { var d = new Date(ts); return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()) + ' ' + clock(ts); }
function ago(ms) {
  ms = Math.max(0, ms); var m = Math.floor(ms / MIN);
  if (m < 1) return 'just now';
  if (m < 60) return m + ' min ago';
  var h = Math.floor(m / 60);
  if (h < 48) return h + ' h' + (m % 60 ? ' ' + (m % 60) + ' min' : '') + ' ago';
  return Math.floor(h / 24) + ' days ago';
}
function dur(ms) { return ago(ms).replace(/ ago$/, '').replace('just now', 'under a minute'); }
function now() { return Date.now(); }

/* Storage: every read is validated by a shape check; bad values fall back to defaults. */
var store = {
  get: function (k, d, ok) {
    try {
      var v = localStorage.getItem('icuqr.' + k);
      if (v == null) return d;
      v = JSON.parse(v);
      if (ok && !ok(v)) { store.bad.push(k); return d; }
      return v;
    } catch (e) { store.bad.push(k); return d; }
  },
  set: function (k, v) { try { localStorage.setItem('icuqr.' + k, JSON.stringify(v)); return true; } catch (e) { return false; } },
  del: function (k) { try { localStorage.removeItem('icuqr.' + k); } catch (e) {} },
  keys: function () { try { return Object.keys(localStorage).filter(function (k) { return k.indexOf('icuqr.') === 0; }).map(function (k) { return k.slice(6); }); } catch (e) { return []; } },
  clearAll: function (keep) {
    store.keys().forEach(function (k) { if (!keep || keep.indexOf(k) < 0) store.del(k); });
  },
  bad: []
};
function isStrArr(v) { return Array.isArray(v) && v.every(function (x) { return typeof x === 'string'; }); }
function isTheme(v) { return v === 'light' || v === 'dark'; }

/* Session-level record of the last error (kept on-device only; shown in About). */
function noteError(where, e) {
  try { console.error('[icuqr] ' + where, e); } catch (x) {}
  store.set('lastError', { ts: now(), where: String(where), msg: String((e && e.message) || e).slice(0, 300) });
}
/* ===================== 02 data normalization (old + new schema) ===================== */
var RAW = isObj(window.ICU_DATA) ? window.ICU_DATA : {};
var META = (function () {
  var m = isObj(RAW.meta) ? RAW.meta : {};
  return {
    version: str(m.version) || str(RAW.version) || 'unknown',
    date: str(m.date) || str(RAW.date),
    status: str(m.status) || str(RAW.reviewStatus) || 'NOT YET CLINICALLY REVIEWED',
    expires: str(m.expires) || str(RAW.expires),
    reviewedBy: str(m.reviewedBy) || str(RAW.reviewedBy),
    facilityNote: str(m.facilityNote) || str(RAW.facilityNote),
    medNotice: str(m.medNotice), disclaimer: str(m.disclaimer), scope: str(m.scope),
    scopeTags: isObj(m.scopeTags) ? m.scopeTags : {}
  };
})();
var SCOPES = {
  RN: { label: 'RN', sr: 'Scope: RN', cls: 'rn' },
  ORDER: { label: 'Per order', sr: 'Scope: per provider order', cls: 'order' },
  PROV: { label: 'Provider', sr: 'Scope: provider performs', cls: 'prov' }
};
/* List item: "text" | "!call text" | {id, t, s, call?}. Returns {id, t, s, call} or null. */
function normItem(x) {
  var t = '', id = '', s = '', call = false;
  if (typeof x === 'string') t = x;
  else if (typeof x === 'number') t = String(x);
  else if (isObj(x)) { t = str(x.t) || str(x.text); id = str(x.id); s = str(x.s || x.scope).toUpperCase(); call = x.call === true; }
  t = t.replace(/^\s+/, '');
  if (t.charAt(0) === '!') { call = true; t = t.slice(1).replace(/^\s+/, ''); }
  if (!t) return null;
  return { id: id || hash(t), t: t, s: SCOPES[s] ? s : '', call: call };
}
function scopeLegendHtml() {
  var rows = Object.keys(SCOPES).map(function (k) {
    var d = str(META.scopeTags[k]) || { RN: 'Nurse may do per standard nursing protocol', ORDER: 'Needs a provider order or active standing order/protocol', PROV: 'Provider performs; nurse anticipates, prepares, assists' }[k];
    return '<li><span class="scope s-' + SCOPES[k].cls + '">' + esc(SCOPES[k].label) + '</span> ' + esc(d) + '</li>';
  });
  return '<ul class="legend-list">' + rows.join('') + '</ul>';
}
function normList(v) {
  var seen = {};
  return arr(v).map(normItem).filter(function (it) {
    if (!it) return false;
    if (seen[it.id]) it.id = it.id + '~' + hash(it.t);   // duplicate ids: keep both, distinct keys
    seen[it.id] = 1; return true;
  });
}
function normKeywords(k) {
  if (typeof k === 'string') return k.split(/[,;]+/).map(function (x) { return x.trim(); }).filter(Boolean);
  return arr(k).map(str).map(function (x) { return x.trim(); }).filter(Boolean);
}
var BAD_CONDITIONS = [];
var CONDITIONS = arr(RAW.conditions).filter(function (c) { return isObj(c) && str(c.id) && str(c.name); }).map(function (c) {
  try { return normCondition(c); } catch (e) { BAD_CONDITIONS.push(str(c.id)); noteError('data ' + str(c.id), e); return null; }
}).filter(Boolean);
function normCondition(c) {
  return {
    id: str(c.id).replace(/[^\w-]/g, ''), name: str(c.name), category: str(c.category) || 'Other',
    emergency: c.emergency === true,
    timer: c.timer === true || /arrest/.test(str(c.id)),
    keywords: normKeywords(c.keywords),
    warnings: normList(c.warnings), glance: normList(c.glance), recognize: normList(c.recognize),
    actions: normList(c.actions), monitor: normList(c.monitor), meds: normList(c.meds), escalate: normList(c.escalate),
    reviewed: str(c.reviewed), reviewer: str(c.reviewer)
  };
}
var CATEGORIES = (function () {
  var cats = arr(RAW.categories).map(str).filter(Boolean);
  CONDITIONS.forEach(function (c) { if (cats.indexOf(c.category) < 0) cats.push(c.category); });
  return cats;
})();
var TOOLS = isObj(RAW.tools) ? RAW.tools : {};
var DATA_OK = CONDITIONS.length > 0;
function byId(id) { for (var i = 0; i < CONDITIONS.length; i++) if (CONDITIONS[i].id === id) return CONDITIONS[i]; return null; }
var LEGACY_EMERGENCY = ['cardiac-arrest', 'anaphylaxis', 'tension-pneumothorax', 'status-epilepticus'];
function emergencyList() {
  var em = CONDITIONS.filter(function (c) { return c.emergency; });
  if (!em.length) em = LEGACY_EMERGENCY.map(byId).filter(Boolean);
  return em;
}
function isEmergency(c) { return c.emergency || (!CONDITIONS.some(function (x) { return x.emergency; }) && LEGACY_EMERGENCY.indexOf(c.id) >= 0); }
function isDraft() { return !/^\s*(approved|reviewed|clinically reviewed)/i.test(META.status); }
function parseDay(s) { var m = /^(\d{4})-(\d{2})-(\d{2})/.exec(str(s)); if (!m) return NaN; return new Date(+m[1], +m[2] - 1, +m[3]).getTime(); }
function contentExpired() { var t = parseDay(META.expires); return isFinite(t) && now() >= t + DAY; } // expires at end of that day (local)

/* Tables: rows of [a, b, c?]; drop exact duplicate rows (e.g. a copy-paste slip). */
function tableRows(t) {
  var seen = {};
  return arr(isObj(t) ? t.rows : null).filter(Array.isArray).map(function (r) { return r.map(str); }).filter(function (r) {
    var k = r.join('\u0001'); if (seen[k]) return false; seen[k] = 1; return true;
  });
}
/* GCS groups: items as [score, label] or {v|score, t|label}. Verbal gets a 'T' (intubated) option. */
function gcsGroups() {
  var g = isObj(TOOLS.gcs) ? arr(TOOLS.gcs.groups) : [];
  var out = g.slice(0, 3).map(function (grp, gi) {
    var items = arr(isObj(grp) ? grp.items : null).map(function (it) {
      if (Array.isArray(it)) return { v: it[0], t: str(it[1]) };
      if (isObj(it)) return { v: it.v != null ? it.v : it.score, t: str(it.t || it.label) };
      return null;
    }).filter(function (it) { return it && (isNum(it.v) || it.v === 'T'); });
    return { key: 'evm'.charAt(gi), name: str(isObj(grp) && grp.name) || ['Eye', 'Verbal', 'Motor'][gi], items: items };
  });
  if (out[1] && !out[1].items.some(function (it) { return it.v === 'T'; })) out[1].items.push({ v: 'T', t: 'Intubated / not testable (T)' });
  return out;
}
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
/* ===================== 04 search: index + ranking ===================== */
function toks(s) { return normText(s).split(' ').filter(Boolean); }
function uniq(a) { var o = {}, r = []; a.forEach(function (x) { if (!o[x]) { o[x] = 1; r.push(x); } }); return r; }
function itemsText(list) { return list.map(function (x) { return x.t; }).join(' '); }

/* Quick tools as searchable entries. slug -> element id "tool-<slug>" on the Tools page. */
function toolEntries() {
  var out = [{ id: 'tool:timer', slug: 'timer', name: 'Code timer', kw: 'code timer cpr stopwatch epinephrine shock rhythm check 2 minutes', body: '' }];
  if (isObj(TOOLS.gcs)) out.push({ id: 'tool:gcs', slug: 'gcs', name: 'GCS calculator (Glasgow Coma Scale)', kw: 'gcs glasgow coma scale eye verbal motor loc', body: str(TOOLS.gcs.note) });
  [['rass', 'sedation agitation richmond'], ['vitals', 'normal vitals vital signs'], ['labs', 'lab ranges normal labs values']].forEach(function (p) {
    var t = TOOLS[p[0]]; if (!isObj(t)) return;
    out.push({ id: 'tool:' + p[0], slug: p[0], name: str(t.title) || p[0], kw: p[1], body: tableRows(t).map(function (r) { return r.join(' '); }).join(' ') });
  });
  arr(TOOLS.reminders).forEach(function (r, i) {
    if (!isObj(r)) return;
    var title = str(r.title), slug = 'r' + i;
    if (/sbar/i.test(title)) slug = 'sbar'; else if (/H.s\s*&\s*T/i.test(title)) slug = 'hts'; else if (/rapid response/i.test(title)) slug = 'rrt';
    else if (/PBW|predicted body/i.test(title)) slug = 'pbw'; else if (/ABCDE/.test(title)) slug = 'abcde'; else if (/handoff/i.test(title)) slug = 'handoff';
    out.push({ id: 'tool:' + slug, slug: slug, name: title, kw: '', body: arr(r.lines).map(str).join(' ') });
  });
  return out;
}
var TOOL_ENTRIES = toolEntries();
function toolBySlug(s) { for (var i = 0; i < TOOL_ENTRIES.length; i++) if (TOOL_ENTRIES[i].slug === s) return TOOL_ENTRIES[i]; return null; }

var INDEX = CONDITIONS.map(function (c) {
  var body = [c.warnings, c.glance, c.recognize, c.actions, c.monitor, c.meds, c.escalate].map(itemsText).join(' ');
  return mkEntry('cond', c.id, c.name, c.keywords.join(' ') + ' ' + c.category, body, c);
}).concat(TOOL_ENTRIES.map(function (t) { return mkEntry('tool', t.id, t.name, t.kw, t.body, t); }));
function mkEntry(type, id, name, kw, body, ref) {
  var nb = normText(body);
  return {
    type: type, id: id, ref: ref, name: name, nameN: normText(name), kwN: normText(kw),
    nameT: uniq(toks(name)), kwT: uniq(toks(kw)), bodyN: ' ' + nb + ' ', bodyT: uniq(nb.split(' ')),
    em: type === 'cond' && isEmergency(ref)
  };
}
function startsWord(hay, needle) { return (' ' + hay + ' ').indexOf(' ' + needle) >= 0; }
function hasTok(list, t) { return list.indexOf(t) >= 0; }
function hasPrefix(list, t) { for (var i = 0; i < list.length; i++) if (list[i].indexOf(t) === 0) return true; return false; }
function fuzzy(list, t) {
  if (t.length < 4) return false;
  var max = t.length >= 6 ? 2 : 1;
  for (var i = 0; i < list.length; i++) if (list[i].length >= 4 && lev(t, list[i], max) <= max) return true;
  return false;
}
/* Score of one query token against an entry (0 = no match). Short tokens (<=2 chars) only match
   names, keywords and abbreviations exactly; never body text. */
function tokenScore(e, t) {
  var best = 0, al = aliasFor(t), r = aliasRank(al, e.id);
  if (r >= 0) best = 130 - r * 5;
  if (hasTok(e.nameT, t)) best = Math.max(best, 95);
  if (hasTok(e.kwT, t)) best = Math.max(best, 70);
  if (t.length <= 2) return best;
  if (hasPrefix(e.nameT, t)) best = Math.max(best, 75);
  if (hasPrefix(e.kwT, t)) best = Math.max(best, 50);
  if (best) return best;
  if (fuzzy(e.nameT, t)) return 45;
  if (fuzzy(e.kwT, t)) return 28;
  if (al && al.terms.length) {
    for (var i = 0; i < al.terms.length; i++) {
      if (hasTok(e.kwT, al.terms[i])) best = Math.max(best, 60);
      else if (startsWord(e.bodyN, al.terms[i])) best = Math.max(best, 9);
    }
    if (best) return best;
  }
  if (startsWord(e.bodyN, t)) return 8;
  if (t.length >= 4 && e.bodyN.indexOf(t) >= 0) return 3;
  return 0;
}
function search(q, cat) {
  var qn = normText(q); if (!qn) return [];
  var words = qn.split(' '), content = words.filter(function (w) { return !STOPWORDS[w]; });
  if (!content.length) content = words;
  var phrase = words.length > 1 ? aliasFor(qn) : null;
  var single = words.length === 1 ? aliasFor(qn) : null;
  var out = [];
  INDEX.forEach(function (e) {
    if (cat && cat !== 'All' && (e.type !== 'cond' || e.ref.category !== cat)) return;
    var score = 0, pr = aliasRank(phrase, e.id);
    if (pr >= 0) score += 1000 - pr * 20;
    if (words.length > 1) {
      if (e.nameN.indexOf(qn) === 0) score += 300; else if (startsWord(e.nameN, qn)) score += 200;
      else if (startsWord(e.kwN, qn)) score += 150;
    }
    var ok = true, sum = 0;
    for (var i = 0; i < content.length; i++) {
      var s = tokenScore(e, content[i]);
      if (!s) { ok = false; break; }
      sum += s;
    }
    if (!ok && score < 150) return;
    if (ok) score += sum;
    var sr = aliasRank(single, e.id);
    if (sr >= 0) score += Math.max(0, 40 - 20 * sr);
    if (e.nameN.indexOf(qn) === 0) score += 10;
    if (e.em) score += 2;
    if (e.type === 'tool') score -= 1;
    if (score > 0) out.push({ e: e, s: score });
  });
  out.sort(function (a, b) { return b.s - a.s || a.e.name.localeCompare(b.e.name); });
  return out.map(function (x) { return x.e; });
}
/* ===================== 05 checklist ticks ===================== */
/* Stored as icuqr.chk.<conditionId> = {v:2, ver:<content version>, ticks:{"a:<stepId>": tickedAtMs}}.
   Keyed by stable step id (data `id`, else a hash of the text), so editing/reordering content
   never moves a tick onto a different step. A tick expires TICK_TTL after it was made; the whole
   record is dropped when the content version changes. Old index-based records are discarded. */
var CHECK_SECTIONS = [['a', 'actions'], ['m', 'monitor']];
function isTickRec(v) {
  if (!isObj(v) || v.v !== 2 || typeof v.ver !== 'string' || !isObj(v.ticks)) return false;
  for (var k in v.ticks) if (Object.prototype.hasOwnProperty.call(v.ticks, k) && !isNum(v.ticks[k])) return false;
  return true;
}
function validStepKeys(c) {
  var keys = {};
  CHECK_SECTIONS.forEach(function (p) { c[p[1]].forEach(function (it) { keys[p[0] + ':' + it.id] = 1; }); });
  return keys;
}
function loadTicks(c) {
  var rec = store.get('chk.' + c.id, null, isTickRec), t = now(), out = {}, changed = false;
  if (!rec) return { v: 2, ver: META.version, ticks: out };
  if (rec.ver !== META.version) { store.del('chk.' + c.id); return { v: 2, ver: META.version, ticks: out }; }
  var valid = validStepKeys(c);
  Object.keys(rec.ticks).forEach(function (k) {
    var ts = rec.ticks[k];
    if (valid[k] && t - ts < TICK_TTL && ts <= t + 5 * MIN) out[k] = ts; else changed = true;
  });
  rec.ticks = out;
  if (changed) saveTicks(c, rec);
  return rec;
}
function saveTicks(c, rec) {
  if (!Object.keys(rec.ticks).length) store.del('chk.' + c.id);
  else store.set('chk.' + c.id, { v: 2, ver: META.version, ticks: rec.ticks });
}
function toggleTick(c, key) {
  var rec = loadTicks(c), on = !rec.ticks[key];
  if (on) rec.ticks[key] = now(); else delete rec.ticks[key];
  saveTicks(c, rec);
  return rec;
}
function clearTicks(c) { store.del('chk.' + c.id); }
function clearAllTicks() { store.keys().forEach(function (k) { if (k.indexOf('chk.') === 0) store.del(k); }); }
function ticksSummary(c, rec) {
  var ks = Object.keys(rec.ticks), oldest = 0;
  ks.forEach(function (k) { if (!oldest || rec.ticks[k] < oldest) oldest = rec.ticks[k]; });
  return { n: ks.length, oldest: oldest };
}
/* All conditions with live ticks (for the Home "new patient" control). */
function conditionsWithTicks() {
  return CONDITIONS.filter(function (c) { return store.keys().indexOf('chk.' + c.id) >= 0 && ticksSummary(c, loadTicks(c)).n > 0; });
}
/* ===================== 06 code timer: state, audio, wake lock ===================== */
function newTimer() { return { v: 2, run: false, start: 0, stop: 0, epi: [], shock: [], log: [] }; }
function isNumArr(v) { return Array.isArray(v) && v.every(isNum); }
function isTimer(v) {
  return isObj(v) && v.v === 2 && typeof v.run === 'boolean' && isNum(v.start) && isNum(v.stop) &&
    isNumArr(v.epi) && isNumArr(v.shock) && Array.isArray(v.log) &&
    v.log.every(function (l) { return isObj(l) && isNum(l.ts) && typeof l.txt === 'string'; }) &&
    (!v.run || v.start > 0);
}
var timer = store.get('timer', null, isTimer) || newTimer();
function saveTimer() { store.set('timer', timer); }
function hasCode() { return timer.start > 0; }
function refTime() { return timer.run ? now() : (timer.stop || now()); }      // frozen at stop
function elapsedMs() { return hasCode() ? Math.max(0, refTime() - timer.start) : 0; }
function logEv(txt) { timer.log.unshift({ ts: now(), txt: txt }); timer.log = timer.log.slice(0, 80); }
function lastEvent() {
  var e = timer.epi.length ? timer.epi[timer.epi.length - 1] : 0, s = timer.shock.length ? timer.shock[timer.shock.length - 1] : 0;
  if (!e && !s) return null;
  return e >= s ? { kind: 'epi', ts: e, label: 'Epinephrine #' + timer.epi.length } : { kind: 'shock', ts: s, label: 'Shock #' + timer.shock.length };
}
/* On load: discard an old stopped log; a timer running > 2 h is handled by a prompt (see init). */
if (!timer.run && timer.stop && now() - timer.stop > TIMER_LOG_TTL) { timer = newTimer(); saveTimer(); }

/* ---- double-tap protection ---- */
var lastTimerTap = 0, lastStartTap = 0;
function timerTapOK(kind) {
  var t = now();
  if (t - lastTimerTap < TAP_LOCK_MS) return false;
  if ((kind === 'epi' || kind === 'shock') && t - lastStartTap < 1500) return false;   // tap that "fell through" Start
  lastTimerTap = t;
  if (kind === 'start') lastStartTap = t;
  return true;
}

/* ---- audio (created/resumed on user gestures and when the page becomes visible) ---- */
var audioCtx = null;
function getAudio() {
  try { if (!audioCtx) { var AC = window.AudioContext || window.webkitAudioContext; if (AC) audioCtx = new AC(); } } catch (e) { audioCtx = null; }
  return audioCtx;
}
function unlockAudio() {
  var c = getAudio();
  try { if (c && c.state !== 'running' && c.resume) c.resume().catch(function () {}); } catch (e) {}
}
function audioBlocked() { return !audioCtx || audioCtx.state !== 'running'; }
['pointerdown', 'touchend', 'keydown', 'click'].forEach(function (ev) { document.addEventListener(ev, unlockAudio, { capture: true, passive: true }); });
/* 3-tone pattern (lower first tone), louder than v1. */
function beepPattern() {
  var c = getAudio(); if (!c) return;
  try {
    if (c.state !== 'running' && c.resume) c.resume().catch(function () {});
    var t0 = c.currentTime + 0.02;
    [[660, 0], [880, 0.26], [880, 0.52]].forEach(function (p) {
      var o = c.createOscillator(), g = c.createGain();
      o.type = 'square'; o.frequency.value = p[0];
      g.gain.setValueAtTime(0.0001, t0 + p[1]);
      g.gain.exponentialRampToValueAtTime(0.6, t0 + p[1] + 0.02);
      g.gain.setValueAtTime(0.6, t0 + p[1] + 0.18);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + p[1] + 0.22);
      o.connect(g); g.connect(c.destination);
      o.start(t0 + p[1]); o.stop(t0 + p[1] + 0.24);
    });
  } catch (e) {}
}
/* Vibrate only after a user gesture on this page (otherwise Chrome blocks it and logs an error). */
function vibrate(p) {
  try {
    var ua = navigator.userActivation;
    if (navigator.vibrate && (!ua || ua.hasBeenActive)) navigator.vibrate(p);
  } catch (e) {}
}

/* ---- wake lock (re-acquired when the page becomes visible again) ---- */
var wake = null, wantWake = false;
function setWake(on) {
  wantWake = !!on;
  try {
    if (on && navigator.wakeLock && document.visibilityState === 'visible' && !wake) {
      navigator.wakeLock.request('screen').then(function (w) {
        wake = w;
        try { w.addEventListener('release', function () { wake = null; }); } catch (e) {}
        if (!wantWake) { w.release().catch(function () {}); wake = null; }
      }).catch(function () {});
    } else if (!on && wake) { wake.release().catch(function () {}); wake = null; }
  } catch (e) {}
}
/* ===================== 07 code timer: UI, loop, rhythm-check alert ===================== */
var tickHandle = null, lastCycle = -1, alertState = null, lastLogKey = '', lastBtnState = '';
function timerState() { return timer.run ? 'run' : (hasCode() ? 'stopped' : 'idle'); }
function timerWidgetHtml(where) {
  return '<section class="tcard timer" id="' + (where === 'cond' ? 'code-dock' : 'tool-timer') + '" aria-labelledby="timer-h">' +
    '<h2 id="timer-h"' + (where === 'tools' ? ' tabindex="-1"' : '') + '>Code timer</h2>' +
    '<div class="timer-big" id="t-big">00:00</div>' +
    '<div class="timer-sub" id="t-cyc"></div>' +
    '<div class="timer-warn" id="t-stale" role="status" hidden></div>' +
    '<div class="timer-sub sm" id="t-epi"></div><div class="timer-sub sm" id="t-shock"></div>' +
    '<div id="t-btns"></div>' +
    '<div class="tlog" id="t-log" role="log" aria-label="Code log, newest first"></div>' +
    '<p class="note">Alerts every 2 min (3 beeps + vibration + flashing banner) until acknowledged. Turn the ringer/silent switch ON and keep this app in the foreground; the screen is kept awake while running where supported. Not a record of the code: document per policy.</p>' +
    '</section>';
}
function timerButtonsHtml() {
  var st = timerState(), le = lastEvent();
  if (st === 'idle') return '<div class="tbtns one"><button type="button" class="abtn go big" data-act="tstart">▶ Start code timer</button></div>';
  if (st === 'run') {
    return '<div class="tbtns"><button type="button" class="abtn big" data-act="tepi">Epinephrine given</button><button type="button" class="abtn big" data-act="tshock">Shock given</button></div>' +
      (le ? '<div class="tbtns one"><button type="button" class="abtn sm" data-act="tundo">↩ Undo last: ' + esc(le.label) + ' (' + clock(le.ts) + ')</button></div>' : '') +
      '<div class="tbtns one sep"><button type="button" class="abtn danger-o" data-act="tend">■ End code…</button></div>';
  }
  return '<div class="tbtns"><button type="button" class="abtn go" data-act="tresume">▶ Resume code</button><button type="button" class="abtn" data-act="tnew">New code…</button></div>' +
    '<div class="tbtns one sep"><button type="button" class="abtn danger-o" data-act="tclear">Clear log…</button></div>';
}
function renderTimerButtons(force) {
  var el = $('#t-btns'); if (!el) return;
  var le = lastEvent(), key = timerState() + '|' + (le ? le.label + le.ts : '');
  if (!force && key === lastBtnState && el.firstChild) return;
  lastBtnState = key; el.innerHTML = timerButtonsHtml();
}
function updateTimerUI() {
  var e = elapsedMs() / 1000, chip = $('#timerchip'), rem = CYCLE - (e % CYCLE);
  document.documentElement.classList.toggle('timing', timer.run);
  var qs = $('#qstart .go'); if (qs) qs.hidden = hasCode();
  if (chip) {
    chip.hidden = !timer.run;
    if (timer.run) {
      chip.textContent = (elapsedMs() > TIMER_STALE_WARN ? '⚠ ' : '⏱ ') + fmt(e) + ' · ' + fmt(rem);
      chip.setAttribute('aria-label', 'Code timer running ' + fmt(e) + ', next rhythm check in ' + fmt(rem) + '. Open timer.');
    }
  }
  var big = $('#t-big'); if (!big) return;
  big.textContent = fmt(e);
  var sub = $('#t-cyc');
  if (timer.run) {
    sub.textContent = rem <= 10 ? 'RHYTHM CHECK in ' + Math.ceil(rem) + ' s' : 'Next rhythm check in ' + fmt(rem);
    sub.className = 'timer-sub' + (rem <= 10 ? ' soon' : '');
  } else { sub.textContent = hasCode() ? 'Ended ' + clock(timer.stop) + ' (' + ago(now() - timer.stop) + ')' : 'Ready'; sub.className = 'timer-sub'; }
  var stale = $('#t-stale');
  if (stale) {
    var isStale = timer.run && elapsedMs() > TIMER_STALE_WARN;
    stale.hidden = !isStale;
    if (isStale) stale.textContent = '⚠ Running for ' + dur(elapsedMs()) + ' (started ' + dateTime(timer.start) + '). If this code is over, tap End code.';
  }
  var epi = $('#t-epi');
  if (timer.epi.length) {
    var since = (refTime() - timer.epi[timer.epi.length - 1]) / 1000;
    epi.textContent = 'Epinephrine ×' + timer.epi.length + ' · last ' + fmt(since) + ' ago' + (timer.run ? (since >= 300 ? ' (over 5 min)' : since >= 180 ? ' (3–5 min: due per protocol)' : '') : '');
    epi.className = 'timer-sub sm' + (timer.run && since >= 300 ? ' t-red' : timer.run && since >= 180 ? ' t-amber' : '');
  } else { epi.textContent = 'Epinephrine: none logged'; epi.className = 'timer-sub sm'; }
  var sh = timer.shock.length;
  $('#t-shock').textContent = 'Shocks: ' + sh + (sh ? ' · last ' + fmt((refTime() - timer.shock[sh - 1]) / 1000) + ' ago' : '');
  var lk = timer.log.length + '|' + (timer.log[0] ? timer.log[0].ts + timer.log[0].txt : '');
  var lg = $('#t-log');
  if (lg && (lk !== lastLogKey || !lg.firstChild)) {
    lastLogKey = lk;
    lg.innerHTML = timer.log.map(function (l) { return '<div><b>' + (hasCode() ? fmt((l.ts - timer.start) / 1000) : '') + '</b> <span class="muted">' + clock(l.ts) + '</span> ' + esc(l.txt) + '</div>'; }).join('');
  }
  renderTimerButtons(false);
}
function loop() {
  if (timer.run) {
    var cyc = Math.floor(elapsedMs() / 1000 / CYCLE);
    if (lastCycle < 0) lastCycle = cyc;
    if (cyc > lastCycle) { var missed = cyc - lastCycle; lastCycle = cyc; fireRhythmAlert(cyc, missed); }
  }
  if (alertState && now() >= alertState.next) {
    if (alertState.count >= ALERT_MAX_REPEATS) ackAlert(true);
    else { alertState.count++; alertState.next = now() + ALERT_REPEAT_MS; beepPattern(); vibrate([400, 150, 400, 150, 400]); updateAlertBar(); }
  }
  updateTimerUI();
}
function startLoop() { if (!tickHandle) tickHandle = setInterval(loop, 250); loop(); }
function stopLoopIfIdle() { if (!timer.run && !alertState && tickHandle) { clearInterval(tickHandle); tickHandle = null; } updateTimerUI(); }
function fireRhythmAlert(cyc, missed) {
  alertState = { cyc: cyc, at: now(), count: 1, next: now() + ALERT_REPEAT_MS, missed: missed > 1 };
  beepPattern(); vibrate([400, 150, 400, 150, 400]);
  updateAlertBar();
  announce('Rhythm and pulse check now. Switch compressor.');
}
function updateAlertBar() {
  var bar = $('#alertbar'); if (!bar) return;
  if (!alertState) { bar.hidden = true; bar.innerHTML = ''; document.documentElement.classList.remove('alerting'); layoutVars(); return; }
  var due = fmt(alertState.cyc * CYCLE);
  bar.hidden = false;
  document.documentElement.classList.add('alerting');
  bar.innerHTML = '<button type="button" class="alertbtn" data-act="ackalert"><span class="ab-main">⚠ RHYTHM / PULSE CHECK NOW: switch compressor</span>' +
    '<span class="ab-sub">Due at ' + due + (alertState.missed ? ' (an earlier check was missed while the app was in the background)' : '') + ' · tap to acknowledge' + (audioBlocked() ? ' · sound blocked: tap anywhere to enable' : '') + '</span></button>';
  layoutVars();
}
function ackAlert(auto) { if (!alertState) return; alertState = null; updateAlertBar(); if (!auto) announce('Rhythm check acknowledged'); stopLoopIfIdle(); }

/* ---- timer actions ---- */
function scrollToDock() { var d = $('#code-dock') || $('#tool-timer'); if (d) { d.scrollIntoView({ behavior: scrollBehavior(), block: 'start' }); focusEl(d.querySelector('h2')); } }
function timerAction(act) {
  if (act === 'ackalert') { ackAlert(false); return; }
  if (act === 'gotimer') { scrollToDock(); return; }
  if (act === 'tstartgo') { if (!timer.run && !hasCode() && timerTapOK('start')) beginCode(); else if (!timer.run && hasCode()) toast('A previous code log exists: Resume or New code below', 4000); scrollToDock(); updateTimerUI(); return; }
  if (!timerTapOK(act.slice(1))) return;
  if (act === 'tstart') { if (timer.run || hasCode()) return; beginCode(); }
  else if (act === 'tresume') {
    if (timer.run || !hasCode()) return;
    timer.run = true; timer.stop = 0; logEv('Resumed'); lastCycle = Math.floor(elapsedMs() / 1000 / CYCLE);
    saveTimer(); setWake(true); startLoop(); toast('Code timer resumed');
  } else if (act === 'tend') {
    if (!timer.run) return;
    confirmModal('End the code timer at ' + fmt(elapsedMs() / 1000) + '?\nThe log (epinephrine ×' + timer.epi.length + ', shocks ×' + timer.shock.length + ') is kept until you clear it.', 'End code', true).then(function (ok) {
      if (!ok || !timer.run) return;
      timer.run = false; timer.stop = now(); logEv('Code ended'); saveTimer(); setWake(false); ackAlert(true); stopLoopIfIdle(); renderTimerButtons(true); toast('Code timer ended');
    });
  } else if (act === 'tnew') {
    confirmModal('Start a NEW code?\nThis permanently clears the current log (epinephrine ×' + timer.epi.length + ', shocks ×' + timer.shock.length + ').', 'Clear & start new', true).then(function (ok) { if (ok) { timer = newTimer(); beginCode(); } });
  } else if (act === 'tclear') {
    confirmModal('Clear the code log?\nEpinephrine ×' + timer.epi.length + ', shocks ×' + timer.shock.length + ' and all times will be deleted from this device.', 'Clear log', true).then(function (ok) {
      if (!ok) return; timer = newTimer(); saveTimer(); setWake(false); ackAlert(true); lastCycle = -1; stopLoopIfIdle(); renderTimerButtons(true); toast('Code log cleared');
    });
  } else if (act === 'tepi' || act === 'tshock') {
    if (!timer.run) { toast('Start the code timer first'); return; }
    var list = act === 'tepi' ? timer.epi : timer.shock, last = list[list.length - 1];
    if (last && now() - last < SAME_EVENT_LOCK_MS) { toast('Duplicate tap ignored'); return; }
    list.push(now());
    var label = (act === 'tepi' ? 'Epinephrine #' : 'Shock #') + list.length;
    logEv(label); saveTimer(); vibrate(40); updateTimerUI(); toast(label + ' logged at ' + fmt(elapsedMs() / 1000) + ' (Undo below)');
  } else if (act === 'tundo') {
    var le = lastEvent(); if (!le || !timer.run) return;
    (le.kind === 'epi' ? timer.epi : timer.shock).pop();
    logEv('Removed ' + le.label + ' (undo)'); saveTimer(); updateTimerUI(); toast('Removed ' + le.label);
  }
  updateTimerUI();
}
function beginCode() {
  unlockAudio();
  timer = newTimer(); timer.run = true; timer.start = now(); logEv('Code started');
  lastCycle = 0; saveTimer(); setWake(true); startLoop(); renderTimerButtons(true);
  toast('Code timer started' + (audioBlocked() ? '' : ''));
}
/* ===================== 08 UI helpers: toast, live region, modal, layout, theme ===================== */
var toastT;
function toast(msg, ms) {
  var t = $('#toast'); if (!t) return;
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove('show'); }, ms || 2600);
}
function announce(msg) { var l = $('#srlive'); if (!l) return; l.textContent = ''; setTimeout(function () { l.textContent = msg; }, 30); }

/* Accessible confirm dialog (replaces window.confirm). Resolves true/false. */
var modalResolve = null, modalReturn = null;
function confirmModal(msg, okLabel, danger) {
  var m = $('#modal');
  if (!m) return Promise.resolve(window.confirm(msg));
  if (modalResolve) closeModal(false);
  $('#modal-msg').innerHTML = String(msg).split('\n').map(function (p) { return '<span class="mline">' + esc(p) + '</span>'; }).join('');
  var ok = $('#modal-ok'); ok.textContent = okLabel || 'OK'; ok.className = 'abtn ' + (danger ? 'danger' : 'primary');
  modalReturn = document.activeElement;
  m.hidden = false; document.documentElement.classList.add('modal-open');
  setTimeout(function () { $('#modal-cancel').focus(); }, 0);
  return new Promise(function (res) { modalResolve = res; });
}
function closeModal(val) {
  var m = $('#modal'); if (m) m.hidden = true;
  document.documentElement.classList.remove('modal-open');
  var r = modalResolve; modalResolve = null;
  try { if (modalReturn && modalReturn.focus && document.contains(modalReturn)) modalReturn.focus({ preventScroll: true }); } catch (e) {}
  if (r) r(val);
}
(function wireModal() {
  var m = $('#modal'); if (!m) return;
  $('#modal-ok').addEventListener('click', function () { closeModal(true); });
  $('#modal-cancel').addEventListener('click', function () { closeModal(false); });
  m.addEventListener('click', function (e) { if (e.target === m) closeModal(false); });
  document.addEventListener('keydown', function (e) {
    if (m.hidden) return;
    if (e.key === 'Escape') { e.preventDefault(); closeModal(false); }
    else if (e.key === 'Tab') {
      var a = $('#modal-cancel'), b = $('#modal-ok');
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); b.focus(); }
      else if (!e.shiftKey && document.activeElement === b) { e.preventDefault(); a.focus(); }
      else if (document.activeElement !== a && document.activeElement !== b) { e.preventDefault(); a.focus(); }
    }
  });
})();

/* Header/footer heights -> CSS variables (header grows with large text or banners; nothing clips). */
function layoutVars() {
  var root = document.documentElement, tb = $('#topbar'), ab = $('#actionbar'), nb = $('#tabbar');
  if (tb) root.style.setProperty('--hdr-h', tb.offsetHeight + 'px');
  var foot = (ab && !ab.hidden ? ab.offsetHeight : 0) || (nb && !nb.hidden ? nb.offsetHeight : 0);
  root.style.setProperty('--foot-h', foot + 'px');
}
(function watchLayout() {
  window.addEventListener('resize', layoutVars);
  if (window.ResizeObserver) {
    try { var ro = new ResizeObserver(layoutVars); ['#topbar', '#actionbar', '#tabbar'].forEach(function (s) { var el = $(s); if (el) ro.observe(el); }); } catch (e) {}
  }
})();

/* ---- theme (stored as JSON "light"/"dark"; theme-init.js applies it before first paint) ---- */
function applyTheme(t) {
  if (!isTheme(t)) t = 'dark';
  document.documentElement.setAttribute('data-theme', t);
  var m = document.querySelector('meta[name="theme-color"]');
  if (m) m.setAttribute('content', t === 'light' ? '#ffffff' : '#0a0e14');
  var b = $('#themeBtn');
  if (b) { b.innerHTML = '<span aria-hidden="true">' + (t === 'light' ? '☾' : '☀') + '</span>'; b.setAttribute('aria-label', t === 'light' ? 'Switch to dark mode' : 'Switch to light mode'); }
}
applyTheme(store.get('theme', 'dark', isTheme));
(function () {
  var b = $('#themeBtn'); if (!b) return;
  b.addEventListener('click', function () {
    var t = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    store.set('theme', t); applyTheme(t);
  });
})();
/* ===================== 09 freshness, recall, service-worker updates ===================== */
function isRemote(v) { return isObj(v) && typeof v.version === 'string'; }
function isVerified(v) { return isObj(v) && isNum(v.ts) && (v.remote == null || isRemote(v.remote)); }
var verified = store.get('verified', null, isVerified);   // {ts: last OK fetch of version.json from network, remote: {...}}
var checkedOnce = false, blockAck = false, swReg = null, swWaiting = null, updating = false, lastCheck = 0;
function cmpVer(a, b) {
  var pa = String(a).split(/[.\-+]/), pb = String(b).split(/[.\-+]/);
  for (var i = 0; i < Math.max(pa.length, pb.length); i++) {
    var x = pa[i] || '0', y = pb[i] || '0', nx = +x, ny = +y;
    if (!isNaN(nx) && !isNaN(ny)) { if (nx !== ny) return nx < ny ? -1 : 1; }
    else if (x !== y) return x < y ? -1 : 1;
  }
  return 0;
}
function remote() { return verified && verified.remote ? verified.remote : null; }
function withdrawn() {
  var r = remote(); if (!r) return false;
  if (r.withdrawn === true && (!r.withdrawnVersion || r.withdrawnVersion === META.version)) return true;
  return !!(r.minSafe && typeof r.minSafe === 'string' && cmpVer(META.version, r.minSafe) < 0);
}
function newerAvailable() { var r = remote(); return !!(swWaiting || (r && r.version && r.version !== META.version)); }
function daysSinceVerified() { return verified ? (now() - verified.ts) / DAY : Infinity; }
function freshnessText() {
  return 'Content v' + META.version + (META.date ? ' (' + META.date + ')' : '') + ' · last verified online: ' +
    (verified ? dateTime(verified.ts) + ' (' + ago(now() - verified.ts) + ')' : 'never on this device');
}
function freshnessHtml() {
  var stale = daysSinceVerified() > VERIFY_STALE_DAYS;
  return '<p class="fresh' + (stale && checkedOnce ? ' stale' : '') + '" id="fresh-stamp">' + esc(freshnessText()) + '</p>';
}
function checkVersion(force) {
  if (!window.fetch) return Promise.resolve();
  if (!force && now() - lastCheck < 60e3) return Promise.resolve();
  lastCheck = now();
  return fetch('version.json', { cache: 'no-store' }).then(function (res) {
    if (!res.ok || res.headers.get('X-SW-Fallback')) throw new Error('offline');
    return res.json();
  }).then(function (j) {
    if (!isRemote(j)) throw new Error('bad version.json');
    verified = { ts: now(), remote: { version: j.version, date: str(j.date), withdrawn: j.withdrawn === true, withdrawnVersion: str(j.withdrawnVersion), minSafe: str(j.minSafe), message: str(j.message).slice(0, 500) } };
    store.set('verified', verified);
  }).catch(function () { /* offline or blocked: keep the last stamp */ }).then(function () {
    checkedOnce = true; renderBanners();
    var f = $('#fresh-stamp'); if (f) f.outerHTML = freshnessHtml();
  });
}
function renderBanners() {
  var b = $('#banners'); if (!b) return;
  var h = '', r = remote(), expired = contentExpired(), wd = withdrawn();
  if (wd || expired) {
    var why = wd ? 'This content version (v' + META.version + ') has been WITHDRAWN.' : 'This content expired on ' + META.expires + '.';
    h += '<div class="banner red" role="alert"><b>' + esc(why) + '</b> Do not rely on it. ' + esc(wd && r.message ? r.message : 'Use facility protocol and orders.') +
      (newerAvailable() ? ' <button type="button" class="bbtn" data-act="applyupdate">Update now</button>' : '') + '</div>';
    if (!blockAck) showBlocker(why, wd && r.message ? r.message : '');
  } else hideBlocker();
  if (newerAvailable() && !(wd || expired)) {
    h += '<div class="banner blue" role="status"><span>' + (updating ? 'Updating… waiting for the new version to finish downloading.' : 'Updated content is available' + (r && r.version && r.version !== META.version ? ' (v' + esc(r.version) + ')' : '') + '.') + '</span>' +
      (updating ? '' : '<button type="button" class="bbtn" data-act="applyupdate">Reload to update</button>') + '</div>';
  }
  if (checkedOnce && daysSinceVerified() > VERIFY_STALE_DAYS && !(wd || expired)) {
    h += '<div class="banner amber" role="status">' + (verified ? 'Content not verified online for ' + Math.floor(daysSinceVerified()) + ' days' : 'Content has not been verified online on this device') +
      '. It may be out of date: connect to the internet to check.</div>';
  }
  if (b.innerHTML !== h) { b.innerHTML = h; layoutVars(); }
}
function showBlocker(why, msg) {
  var bl = $('#blocker'); if (!bl || (!bl.hidden && bl.getAttribute('data-why') === why + msg)) return;
  bl.setAttribute('data-why', why + msg);
  bl.innerHTML = '<div class="blocker-box"><h2 id="blocker-h">⚠ Do not use this content</h2><p>' + esc(why) + '</p>' + (msg ? '<p>' + esc(msg) + '</p>' : '') +
    '<p>Follow your facility protocol and active orders. Connect to the internet and update the app.</p>' +
    '<div class="btnrow"><button type="button" class="abtn primary" data-act="applyupdate">Check for update</button><button type="button" class="abtn" data-act="blockack">I understand: view anyway</button></div></div>';
  bl.hidden = false;
  setTimeout(function () { var x = bl.querySelector('button'); if (x) x.focus(); }, 0);
}
function hideBlocker() { var bl = $('#blocker'); if (bl && !bl.hidden) { bl.hidden = true; bl.innerHTML = ''; } }

/* ---- service worker ---- */
function trackInstalling(w) {
  if (!w) return;
  w.addEventListener('statechange', function () {
    if (w.state === 'installed' && navigator.serviceWorker.controller) { swWaiting = swReg && swReg.waiting || w; renderBanners(); if (updating) skipTo(swWaiting); }
  });
}
function skipTo(w) { try { w.postMessage({ type: 'SKIP_WAITING' }); } catch (e) { location.reload(); } }
function applyUpdate() {
  if (!('serviceWorker' in navigator) || !swReg) { location.reload(); return; }
  updating = true; renderBanners();
  if (swReg.waiting) { skipTo(swReg.waiting); return; }
  var done = false;
  swReg.update().catch(function () {}).then(function () {
    if (swReg.waiting) { done = true; skipTo(swReg.waiting); }
    else if (swReg.installing) { done = true; trackInstalling(swReg.installing); }
  });
  /* No new worker within 15 s: this release changed only network-first files; plain reload. */
  setTimeout(function () { if (!done && !swReg.waiting && !swReg.installing) location.reload(); }, 15e3);
}
function initSW() {
  if (!('serviceWorker' in navigator)) return;
  navigator.serviceWorker.addEventListener('controllerchange', function () { if (updating) location.reload(); });
  navigator.serviceWorker.register('sw.js').then(function (reg) {
    swReg = reg;
    if (reg.waiting && navigator.serviceWorker.controller) { swWaiting = reg.waiting; renderBanners(); }
    if (reg.installing) trackInstalling(reg.installing);
    reg.addEventListener('updatefound', function () { trackInstalling(reg.installing); });
  }).catch(function (err) { console.warn('SW registration failed', err); });
  try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(function () {}); } catch (e) {}
}
function checkForUpdates(force) {
  checkVersion(force);
  if (swReg) swReg.update().catch(function () {});
}
var OFFLINE_FILES = ['index.html', 'app.js', 'data.js', 'styles.css', 'theme-init.js', 'manifest.json', 'version.json'];
function offlineStatus(cb) {
  if (!window.caches) { cb('Not supported in this browser'); return; }
  Promise.all(OFFLINE_FILES.map(function (f) { return caches.match(f).then(function (r) { return r ? null : f; }); })).then(function (miss) {
    miss = miss.filter(Boolean);
    cb(miss.length ? (miss.length === OFFLINE_FILES.length ? 'Not saved for offline yet: open once online' : 'Incomplete (missing ' + miss.join(', ') + ')') : 'Ready: all app files saved on this device');
  }).catch(function () { cb('Unknown'); });
}
function net() {
  var d = $('#netdot'); if (!d) return;
  d.classList.toggle('off', !navigator.onLine);
  d.setAttribute('aria-label', navigator.onLine ? 'Online' : 'Offline (app still works)');
  d.title = d.getAttribute('aria-label');
}
window.addEventListener('online', function () { net(); checkForUpdates(true); });
window.addEventListener('offline', net);
/* ===================== 10 view: home ===================== */
function favs() { return store.get('favs', [], isStrArr).filter(function (id) { return !!byId(id); }); }
function isFav(id) { return favs().indexOf(id) >= 0; }
function toggleFav(id) { var f = favs(), i = f.indexOf(id); if (i >= 0) f.splice(i, 1); else f.unshift(id); store.set('favs', f.slice(0, 30)); return i < 0; }
function recents() { return store.get('recent', [], isStrArr); }
function addRecent(id) { var r = recents().filter(function (x) { return x !== id; }); r.unshift(id); store.set('recent', r.slice(0, 8)); }

var homeState = { q: '', cat: 'All', scroll: 0 };
function cardHtml(c, row, tickedSet) {
  var em = isEmergency(c), tk = tickedSet && tickedSet[c.id];
  return '<a class="card' + (em ? ' em' : '') + (row ? ' row' : '') + '" href="#/c/' + esc(c.id) + '">' +
    '<span class="txt"><span class="name">' + esc(c.name) + '</span><small>' + esc(c.category) + (tk ? ' · <span class="tk">✓ ' + tk + ' ticked</span>' : '') + '</small></span>' +
    (row && em ? '<span class="badge em">Emergency</span>' : '') + '</a>';
}
function toolCardHtml(t) {
  return '<a class="card row tool" href="#/tools/' + esc(t.slug) + '"><span class="txt"><span class="name">' + esc(t.name) + '</span><small>Quick tool</small></span><span class="badge">Tool</span></a>';
}
function listHtml(list, tickedSet) { return '<div class="list">' + list.map(function (c) { return cardHtml(c, true, tickedSet); }).join('') + '</div>'; }
function tickedMap() {
  var m = {};
  conditionsWithTicks().forEach(function (c) { m[c.id] = ticksSummary(c, loadTicks(c)).n; });
  return m;
}
function newPatientHtml() {
  var withT = conditionsWithTicks(), oldest = 0, n = 0;
  withT.forEach(function (c) { var s = ticksSummary(c, loadTicks(c)); n += s.n; if (!oldest || s.oldest < oldest) oldest = s.oldest; });
  return '<div class="newpt" id="newpt"><div class="newpt-txt">' +
    (n ? '<b>' + n + ' ticked step' + (n === 1 ? '' : 's') + '</b> in ' + withT.length + ' condition' + (withT.length === 1 ? '' : 's') + ' (oldest ' + ago(now() - oldest) + '). Ticks clear automatically after 12 h.'
      : 'No ticked steps saved. Ticks clear automatically after 12 h.') +
    '</div><button type="button" class="abtn danger-o" data-act="newpatient"' + (n ? '' : ' disabled') + '>New patient: clear all ticks</button></div>';
}
function renderHome() {
  var cats = ['All'].concat(CATEGORIES);
  setTitle('ICU QuickRef');
  app.innerHTML =
    '<h1 class="sr" id="view-h" tabindex="-1">ICU QuickRef: home</h1>' +
    '<label class="sr" for="q">Search conditions and quick tools</label>' +
    '<input id="q" class="search" type="search" inputmode="search" enterkeyhint="go" placeholder="Search: PE, DKA, afib, K…" autocomplete="off" autocapitalize="off" spellcheck="false" value="' + esc(homeState.q) + '">' +
    '<div class="chips" id="chips" role="group" aria-label="Filter by category">' + cats.map(function (c) {
      var on = c === homeState.cat;
      return '<button type="button" class="chip' + (on ? ' active' : '') + '" data-cat="' + esc(c) + '" aria-pressed="' + on + '">' + esc(c) + '</button>';
    }).join('') + '</div>' +
    '<div id="homeBody"></div>' +
    newPatientHtml() +
    '<p class="foot"><b>Reference aid only.</b> Not a substitute for provider orders, facility protocol, or clinical judgment. ' + esc(META.status) + '.' + (META.scope ? ' ' + esc(META.scope) : '') + '</p>' +
    freshnessHtml() +
    '<p class="foot-links"><a href="#/about">About, disclaimer &amp; reset</a></p>';
  renderHomeBody();
  var q = $('#q');
  q.addEventListener('input', function () { homeState.q = q.value; renderHomeBody(); });
  q.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { var first = $('#homeBody .card'); if (first) { e.preventDefault(); location.hash = first.getAttribute('href'); } }
  });
}
function suggestFor(qn) {
  var out = [];
  Object.keys(ALIAS).forEach(function (k) { if (k.length >= 3 && lev(qn, k, 2) <= 2) out.push(k); });
  return out.slice(0, 4);
}
function renderHomeBody() {
  var el = $('#homeBody'); if (!el) return;
  var q = homeState.q.trim(), cat = homeState.cat, h = '', tm = tickedMap();
  if (q) {
    var res = search(q, cat);
    h = '<h2 class="sect-h" id="res-h" aria-live="polite">' + res.length + ' result' + (res.length === 1 ? '' : 's') + (cat !== 'All' ? ' in ' + esc(cat) : '') + '</h2>';
    if (res.length) h += '<div class="list">' + res.map(function (e) { return e.type === 'tool' ? toolCardHtml(e.ref) : cardHtml(e.ref, true, tm); }).join('') + '</div>';
    else {
      var sg = suggestFor(normText(q));
      h += '<div class="empty">No match for “' + esc(q) + '”.' + (cat !== 'All' ? ' (Filtered to ' + esc(cat) + ': try All.)' : '') +
        '<br>' + (sg.length ? 'Did you mean: ' + sg.map(esc).join(', ') + '?' : 'Try: VT, tachycardia, shock, K, sepsis, vent.') + '</div>';
    }
  } else if (cat !== 'All') {
    h = '<h2 class="sect-h">' + esc(cat) + '</h2>' + listHtml(CONDITIONS.filter(function (c) { return c.category === cat; }), tm);
  } else {
    h += '<h2 class="sect-h em">Emergency</h2><div class="grid2">' + emergencyList().map(function (c) { return cardHtml(c, false, tm); }).join('') + '</div>';
    var fv = favs().map(byId).filter(Boolean);
    h += '<h2 class="sect-h">★ Pinned</h2>' + (fv.length ? listHtml(fv, tm) : '<div class="tip">Tap ★ Pin on any condition to keep it here.</div>');
    var rc = recents().map(byId).filter(Boolean).slice(0, 5);
    if (rc.length) h += '<h2 class="sect-h">Recently viewed</h2>' + listHtml(rc, tm);
    var all = CONDITIONS.slice().sort(function (a, b) { return a.name.localeCompare(b.name); });
    h += '<h2 class="sect-h">All conditions (' + all.length + ')</h2>' + listHtml(all, tm);
    h += installTip();
  }
  el.innerHTML = h;
}
var deferredPrompt = null;
window.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); deferredPrompt = e; });
function isIOS() { return /iphone|ipad|ipod/i.test(navigator.userAgent) || (/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1); }
function isStandalone() { return window.navigator.standalone === true || (window.matchMedia && matchMedia('(display-mode: standalone)').matches); }
function installTip() {
  if (isStandalone() || store.get('tipHidden', false, function (v) { return typeof v === 'boolean'; })) return '';
  return '<div class="tip" id="installTip"><span>' + (isIOS() ? 'Install (Safari only): tap <b>Share</b> → <b>Add to Home Screen</b>. Without installing, iOS may delete the offline copy after 7 days unused.' : 'Install for offline use: browser menu → <b>Install app</b> / <b>Add to Home screen</b>.') +
    '</span><button type="button" data-act="hidetip" aria-label="Dismiss install tip"><span aria-hidden="true">✕</span></button></div>';
}
/* ===================== 11 view: condition ===================== */
var curCond = null;
function hasScopes(c) { return [c.actions, c.monitor, c.meds, c.escalate, c.recognize].some(function (l) { return l.some(function (it) { return !!it.s; }); }); }
function scopeBadge(it) {
  if (!it.s) return '';
  var sc = SCOPES[it.s];
  return '<span class="scope s-' + sc.cls + '"><span class="sr">' + esc(sc.sr) + ': </span><span aria-hidden="true">' + esc(sc.label) + '</span></span>';
}
function callPill(it) { return it.call ? '<span class="callpill">CALL</span>' : ''; }
function bullets(list) {
  return '<ul class="bul">' + list.map(function (it) {
    return '<li' + (it.call ? ' class="call"' : '') + '>' + callPill(it) + scopeBadge(it) + esc(it.t) + '</li>';
  }).join('') + '</ul>';
}
function tickAge(ts) { return '✓ ' + clock(ts) + ' · ' + ago(now() - ts); }
function stepsHtml(c, sec, list, rec) {
  return '<ol class="steps">' + list.map(function (it, i) {
    var key = sec + ':' + it.id, ts = rec.ticks[key];
    return '<li><button type="button" class="step' + (it.call ? ' call' : '') + (ts ? ' done' : '') + '" data-step="' + esc(key) + '" aria-pressed="' + (ts ? 'true' : 'false') + '">' +
      '<span class="n" aria-hidden="true">' + (i + 1) + '</span><span class="t"><span class="sr">Step ' + (i + 1) + '. </span>' + callPill(it) + scopeBadge(it) + esc(it.t) +
      '<span class="tage">' + (ts ? esc(tickAge(ts)) : '') + '</span></span></button></li>';
  }).join('') + '</ol>';
}
function statusStrip(c) {
  var draft = isDraft();
  var who = c.reviewer || META.reviewedBy, when = c.reviewed;
  return '<div class="status-strip ' + (draft ? 'draft' : 'ok') + '" role="note">' +
    (draft ? '<b>DRAFT</b> · ' + esc(META.status.split(/\s+[—–]\s+/)[0].toLowerCase()) + ' · v' + esc(META.version) + ' · verify vs orders/protocol'
      : esc(META.status) + (who ? ' · ' + esc(who) : '') + (when ? ' · ' + esc(when) : '') + ' · v' + esc(META.version)) + '</div>';
}
function tickBarHtml(c, rec) {
  var s = ticksSummary(c, rec);
  if (!s.n) return '<div class="tickbar" id="tickbar"><span>Tap a step to tick it. Ticks clear after 12 h.</span></div>';
  return '<div class="tickbar has" id="tickbar"><span><b>' + s.n + ' ticked</b> · oldest ' + clock(s.oldest) + ' (' + ago(now() - s.oldest) + '). Clears after 12 h.</span>' +
    '<span class="tb-btns"><button type="button" class="abtn sm danger-o" data-act="clearticks">Clear ticks…</button><button type="button" class="abtn sm danger-o" data-act="newpatient">New patient…</button></span></div>';
}
function sectionHtml(key, title, body, extra) {
  return '<details class="sec s-' + key + '" id="sec-' + key + '" open><summary><h2>' + title + '</h2>' + (extra || '') + '</summary><div class="body">' + body + '</div></details>';
}
var JUMPS = [['actions', 'Actions', 'Actions'], ['recognize', 'Signs', 'Recognize (signs)'], ['monitor', 'Monitor', 'Monitor'], ['meds', 'Meds', 'Meds'], ['escalate', 'Call', 'Escalate / call if']];
function renderCondition(id) {
  var c = byId(id);
  if (!c) {
    setTitle('Not found · ICU QuickRef');
    app.innerHTML = '<h1 id="view-h" tabindex="-1">Condition not found</h1><div class="empty"><a href="#/">Back to home</a></div>';
    return;
  }
  curCond = c; addRecent(c.id);
  setTitle(c.name + ' · ICU QuickRef');
  var rec = loadTicks(c);
  var verifyLines = c.meds.filter(function (it) { return /^VERIFY/i.test(it.t); }), meds = c.meds.filter(function (it) { return !/^VERIFY/i.test(it.t); });
  var h = '<article class="cond">' + statusStrip(c) +
    '<div class="chead"><h1 id="view-h" tabindex="-1">' + esc(c.name) + '</h1><div class="tags"><span class="badge">' + esc(c.category) + '</span>' + (isEmergency(c) ? '<span class="badge em">Emergency</span>' : '') + '</div></div>';
  if (c.timer) h += '<div class="qstart" id="qstart">' + (timer.run ? '' : '<button type="button" class="abtn go" data-act="tstartgo">▶ Start code timer</button>') + '<button type="button" class="abtn sm" data-act="gotimer">Timer, epi &amp; shock log ↓</button></div>';
  if (c.glance.length) h += '<section class="glance" aria-labelledby="gl-h"><h2 id="gl-h">First things first</h2><ol>' + c.glance.map(function (g) { return '<li>' + callPill(g) + scopeBadge(g) + esc(g.t) + '</li>'; }).join('') + '</ol></section>';
  if (c.warnings.length) h += '<section class="warnbox" aria-labelledby="wb-h"><h2 id="wb-h">⚠ Warnings</h2><ul>' + c.warnings.map(function (w) { return '<li>' + scopeBadge(w) + esc(w.t) + '</li>'; }).join('') + '</ul></section>';
  if (c.timer) h += timerWidgetHtml('cond');
  h += '<nav class="secnav" aria-label="Jump to section">' + JUMPS.map(function (x) { return '<button type="button" data-go="' + x[0] + '" aria-label="Jump to ' + x[2] + '">' + x[1] + '</button>'; }).join('') + '</nav>';
  h += sectionHtml('actions', 'Actions', tickBarHtml(c, rec) + '<p class="vnote">Drug doses and provider-scope steps: only per active order / facility protocol.</p>' +
    (hasScopes(c) ? '<details class="legend"><summary>Scope tags: what RN / Per order / Provider mean</summary>' + scopeLegendHtml() + '</details>' : '') + '<div class="bar" aria-hidden="true"><i id="bar-a"></i></div>' + stepsHtml(c, 'a', c.actions, rec), '<span class="prog" id="prog-a"></span>');
  h += sectionHtml('recognize', 'Recognize (signs)', bullets(c.recognize));
  h += sectionHtml('monitor', 'Monitor / ongoing care', '<div class="bar" aria-hidden="true"><i id="bar-m"></i></div>' + stepsHtml(c, 'm', c.monitor, rec), '<span class="prog" id="prog-m"></span>');
  h += sectionHtml('meds', 'Meds / interventions to anticipate', '<div class="verify">' + esc(META.medNotice || 'Verify per facility protocol / active order. Doses shown are general published adult ranges, not patient-specific.') +
    verifyLines.map(function (v) { return '<span class="vline">' + esc(v.t) + '</span>'; }).join('') + '</div>' + bullets(meds));
  h += sectionHtml('escalate', 'Escalate / call if', bullets(c.escalate));
  h += '<p class="foot"><b>Reference aid only.</b> Not a substitute for provider orders, facility protocol, or clinical judgment. ' + esc(META.status) + ' · v' + esc(META.version) + (META.date ? ' · ' + esc(META.date) : '') + '</p>' +
    '<p class="foot-links"><a href="#/about">About &amp; disclaimer</a></p></article>';
  app.innerHTML = h;
  updateProgress(c, rec);
  renderActionBar(c);
  if (c.timer) { lastBtnState = ''; lastLogKey = ''; updateTimerUI(); }
}
function updateProgress(c, rec) {
  [['a', c.actions], ['m', c.monitor]].forEach(function (p) {
    var n = p[1].filter(function (it) { return rec.ticks[p[0] + ':' + it.id]; }).length, t = p[1].length;
    var pr = $('#prog-' + p[0]), br = $('#bar-' + p[0]);
    if (pr) { pr.textContent = n + '/' + t; pr.setAttribute('aria-label', n + ' of ' + t + ' done'); }
    if (br) br.style.width = (t ? 100 * n / t : 0) + '%';
  });
}
/* Refresh tick ages / tickbar without re-rendering the page (keeps scroll and focus). */
function refreshTicks(c) {
  var rec = loadTicks(c);
  $$('.step[data-step]').forEach(function (b) {
    var ts = rec.ticks[b.getAttribute('data-step')];
    b.classList.toggle('done', !!ts); b.setAttribute('aria-pressed', ts ? 'true' : 'false');
    var a = b.querySelector('.tage'); if (a) a.textContent = ts ? tickAge(ts) : '';
  });
  var tb = $('#tickbar'); if (tb) tb.outerHTML = tickBarHtml(c, rec);
  updateProgress(c, rec);
}
function renderActionBar(c) {
  var ab = $('#actionbar'), on = isFav(c.id);
  ab.hidden = false; $('#tabbar').hidden = true;
  ab.innerHTML =
    '<button type="button" class="abtn" data-act="back"><span aria-hidden="true">←</span> Back</button>' +
    '<button type="button" class="abtn' + (on ? ' on' : '') + '" data-act="fav" aria-pressed="' + on + '"><span aria-hidden="true">' + (on ? '★' : '☆') + '</span> ' + (on ? 'Pinned' : 'Pin') + '</button>' +
    '<button type="button" class="abtn" data-act="top"><span aria-hidden="true">↑</span> Top</button>';
  ab.setAttribute('data-id', c.id);
  layoutVars();
}
/* ===================== 12 views: tools, about, recovery ===================== */
function table(rows) {
  return '<table class="kv">' + rows.map(function (r) {
    return '<tr>' + r.map(function (c, i) { return i === 0 ? '<th scope="row">' + esc(c) + '</th>' : '<td>' + esc(c) + '</td>'; }).join('') + '</tr>';
  }).join('') + '</table>';
}
var gcs = { e: 0, v: 0, m: 0 };
function gcsHtml() {
  var G = gcsGroups(); if (!G.length) return '<p class="note">GCS data not available.</p>';
  return G.map(function (g) {
    return '<fieldset class="seg"><legend>' + esc(g.name) + '</legend><div class="opts">' + g.items.map(function (it) {
      var lab = (g.key === 'v' && it.v === 'T') ? 'T' : String(it.v);
      return '<button type="button" class="opt" data-gcs="' + g.key + '" data-v="' + esc(String(it.v)) + '" aria-pressed="false"><b>' + esc(lab) + '</b><span>' + esc(it.t) + '</span></button>';
    }).join('') + '</div></fieldset>';
  }).join('') + '<div class="gcs-total" id="gcs-total" aria-live="polite"></div>' +
    (isObj(TOOLS.gcs) && TOOLS.gcs.note ? '<p class="note">' + esc(TOOLS.gcs.note) + '</p>' : '') +
    '<button type="button" class="abtn wide" data-act="gcsreset">Clear GCS</button>';
}
function gcsText() {
  if (!gcs.e || !gcs.v || !gcs.m) return { t: 'Select E, V and M', sev: false };
  if (gcs.v === 'T') { var s = gcs.e + gcs.m; return { t: 'E' + gcs.e + ' VT M' + gcs.m + ' = ' + s + 'T', sub: 'Intubated: verbal not testable', sev: s <= 6 }; }
  var tot = gcs.e + gcs.v + gcs.m;
  return { t: 'E' + gcs.e + ' V' + gcs.v + ' M' + gcs.m + ' = ' + tot, sub: tot <= 8 ? 'SEVERE (≤8)' : tot <= 12 ? 'Moderate (9–12)' : 'Mild (13–15)', sev: tot <= 8 };
}
function gcsUpdate() {
  var el = $('#gcs-total'); if (!el) return;
  var r = gcsText();
  el.innerHTML = '<span>' + esc(r.t) + '</span>' + (r.sub ? '<small>' + esc(r.sub) + '</small>' : '');
  el.classList.toggle('sev', !!r.sev);
  $$('[data-gcs]').forEach(function (b) {
    var k = b.getAttribute('data-gcs'), v = b.getAttribute('data-v'), on = String(gcs[k]) === v;
    b.classList.toggle('sel', on); b.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
}
function toolSec(slug, title, body, open) {
  return '<details class="sec" id="tool-' + esc(slug) + '"' + (open ? ' open' : '') + '><summary><h2>' + esc(title) + '</h2></summary><div class="body">' + body + '</div></details>';
}
function renderTools(sub) {
  setTitle((sub && sub !== 'timer' && toolBySlug(sub) ? toolBySlug(sub).name + ' · ' : '') + 'Quick tools · ICU QuickRef');
  var T = TOOLS, h = '<h1 id="view-h" tabindex="-1" class="vh">Quick tools</h1>' + timerWidgetHtml('tools');
  h += toolSec('gcs', 'GCS calculator', gcsHtml(), true);
  if (isObj(T.rass)) h += toolSec('rass', str(T.rass.title) || 'RASS', table(tableRows(T.rass).map(function (r) { return [r[0], r[1] + (r[2] ? ': ' + r[2] : '')]; })) + (T.rass.note ? '<p class="note">' + esc(T.rass.note) + '</p>' : ''));
  if (isObj(T.vitals)) h += toolSec('vitals', str(T.vitals.title) || 'Vitals', table(tableRows(T.vitals)));
  if (isObj(T.labs)) h += toolSec('labs', str(T.labs.title) || 'Labs', table(tableRows(T.labs)));
  TOOL_ENTRIES.forEach(function (t, i) {
    if (!/^tool:/.test(t.id) || ['timer', 'gcs', 'rass', 'vitals', 'labs'].indexOf(t.slug) >= 0) return;
    var r = arr(T.reminders).filter(function (x) { return isObj(x) && str(x.title) === t.name; })[0];
    if (r) h += toolSec(t.slug, t.name, '<div class="lines">' + arr(r.lines).map(function (l) { return '<p>' + esc(str(l)) + '</p>'; }).join('') + '</div>', i < 7);
  });
  h += '<p class="foot"><b>Reference aid only.</b> Ranges are approximate adult values. Use your lab/facility ranges.</p>';
  app.innerHTML = h;
  lastBtnState = ''; lastLogKey = '';
  gcsUpdate(); updateTimerUI();
}
function telLinks(s) {
  return esc(s).replace(/(\+?\d[\d ().-]{4,}\d)/g, function (m) { return '<a href="tel:' + m.replace(/[^\d+]/g, '') + '">' + m + '</a>'; });
}
function renderAbout() {
  setTitle('About · ICU QuickRef');
  var le = store.get('lastError', null, function (v) { return isObj(v) && isNum(v.ts) && typeof v.msg === 'string'; });
  var r = remote();
  app.innerHTML = '<div class="about">' +
    '<h1 id="view-h" tabindex="-1">About ICU QuickRef</h1>' +
    '<div class="discl">REFERENCE AID ONLY. This app is not a substitute for provider orders, facility protocol/policy, manufacturer instructions, or clinical judgment. It is not a diagnostic tool and contains no patient-specific dosing. Drug doses shown are general published adult ranges and must be verified against your facility protocol and the active order before administration. Content must be reviewed and approved by your clinical educator / medical director before use in practice.</div>' +
    (META.scope ? '<p><b>Scope:</b> ' + esc(META.scope) + '</p>' : '') + (META.disclaimer ? '<p>' + esc(META.disclaimer) + '</p>' : '') +
    '<h2>Scope tags</h2>' + scopeLegendHtml() +
    '<h2>Version &amp; freshness</h2>' + freshnessHtml() +
    '<table class="kv">' +
    '<tr><th scope="row">Content version</th><td>' + esc(META.version) + '</td></tr>' +
    '<tr><th scope="row">Content date</th><td>' + esc(META.date || '—') + '</td></tr>' +
    '<tr><th scope="row">Review status</th><td>' + esc(META.status) + '</td></tr>' +
    '<tr><th scope="row">Reviewed by</th><td>' + esc(META.reviewedBy || '— (not yet reviewed)') + '</td></tr>' +
    (META.expires ? '<tr><th scope="row">Content expires</th><td>' + esc(META.expires) + (contentExpired() ? ' (EXPIRED)' : '') + '</td></tr>' : '') +
    '<tr><th scope="row">Latest online</th><td>' + (r ? 'v' + esc(r.version) + (r.date ? ' (' + esc(r.date) + ')' : '') + (r.withdrawn ? ' · WITHDRAWN' : '') : 'not checked yet') + '</td></tr>' +
    '<tr><th scope="row">Conditions</th><td>' + CONDITIONS.length + '</td></tr>' +
    '<tr><th scope="row">Offline</th><td id="offstate">checking…</td></tr></table>' +
    (META.facilityNote ? '<h2>Facility contacts</h2><p>' + telLinks(META.facilityNote) + '</p>' : '') +
    '<h2>Guidance this content is based on</h2><ul>' + arr(RAW.sources).map(function (s) { return '<li>' + esc(str(s)) + '</li>'; }).join('') + '</ul><p class="note">Guidelines are updated regularly. Your reviewer must confirm current editions and local practice.</p>' +
    '<h2>Install</h2><p><b>iPhone (Safari only):</b> Share → Add to Home Screen. A Home Screen app keeps its own storage, separate from the Safari tab.<br><b>Android (Chrome):</b> ⋮ menu → Install app / Add to Home screen.</p>' +
    '<div class="btnrow"><button type="button" class="abtn" data-act="install">Install app</button><button type="button" class="abtn" data-act="update">Check for update</button></div>' +
    '<h2>Patient-session data</h2><p class="note">Checklist ticks clear automatically 12 h after ticking and whenever the content version changes. A stopped code log is discarded after 12 h.</p>' +
    '<div class="btnrow"><button type="button" class="abtn danger-o" data-act="newpatient">New patient: clear all ticks…</button></div>' +
    '<h2 class="danger-h">Troubleshooting</h2><p class="note">If the app misbehaves, Reset app data deletes everything this app stored on this device (ticks, code log, pins, recents, settings). Reference content is not affected.</p>' +
    (le ? '<p class="note">Last error: ' + esc(dateTime(le.ts)) + ' · ' + esc(le.where || '') + ': ' + esc(le.msg) + '</p>' : '') +
    '<div class="btnrow"><button type="button" class="abtn danger" data-act="resetall">Reset app data…</button></div>' +
    '<p class="note">Privacy: no login, no analytics, no third-party requests; the app sends no data (it only fetches its own files and version.json). Everything you store stays on this device. Do not enter patient information.</p>' +
    '</div>';
  offlineStatus(function (t) { var e = $('#offstate'); if (e) e.textContent = t; });
}
function renderRecovery(err) {
  setTitle('Problem · ICU QuickRef');
  try { $('#actionbar').hidden = true; $('#tabbar').hidden = false; } catch (e) {}
  app.innerHTML = '<div class="recovery" role="alert"><h1 id="view-h" tabindex="-1">Something went wrong</h1>' +
    '<p>' + (DATA_OK ? 'This screen could not be displayed, possibly because data saved on this device is damaged.' : 'The reference content (data.js) did not load. Reconnect and reload; use facility protocol meanwhile.') + '</p>' +
    '<p class="note">' + esc(String((err && err.message) || err || '')) + '</p>' +
    '<div class="btnrow"><button type="button" class="abtn primary" data-act="reload">Try again</button><button type="button" class="abtn danger" data-act="resetall">Reset app data…</button></div>' +
    '<p class="note">Reset deletes ticks, code log, pins and settings on this device. Reference content is unaffected.</p>' +
    '<p><a href="#/">Home</a> · <a href="#/about">About</a></p></div>';
}
/* ===================== 13 router, navigation, focus ===================== */
function setTitle(t) { document.title = t; }
var curView = '', firstRoute = true;
function safe(where, fn) {
  try { fn(); return true; } catch (e) { noteError(where, e); try { renderRecovery(e); } catch (e2) {} return false; }
}
function histState() { return isObj(history.state) ? history.state : null; }
function markHistory() {
  try {
    var s = histState();
    if (!s || !s.icuqr) history.replaceState({ icuqr: 1, n: firstRoute ? 0 : (markHistory.n || 0) + 1 }, '');
    markHistory.n = histState() ? histState().n : 0;
  } catch (e) {}
}
function route() {
  var h = location.hash || '#/', m;
  if (curView === 'home') homeState.scroll = window.scrollY;
  markHistory();
  curCond = null;
  $('#actionbar').hidden = true; $('#actionbar').innerHTML = ''; $('#tabbar').hidden = false;
  var tab = 'home', sub = '';
  if (!DATA_OK) { curView = 'recovery'; renderRecovery(new Error('Content not loaded')); }
  else if ((m = h.match(/^#\/c\/([\w-]+)/))) { tab = ''; curView = 'cond'; safe('condition ' + m[1], function () { renderCondition(m[1]); }); }
  else if ((m = h.match(/^#\/tools(?:\/([\w-]+))?/))) { tab = 'tools'; curView = 'tools'; sub = m[1] || ''; safe('tools', function () { renderTools(sub); }); }
  else if (h.indexOf('#/about') === 0) { tab = 'about'; curView = 'about'; safe('about', renderAbout); }
  else { curView = 'home'; safe('home', renderHome); }
  $$('.tabbar a').forEach(function (a) {
    if (a.getAttribute('data-tab') === tab) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    a.classList.toggle('active', a.getAttribute('data-tab') === tab);
  });
  layoutVars();
  var target = null;
  if (curView === 'tools' && sub) {
    target = $('#tool-' + sub);
    if (target && target.tagName === 'DETAILS') target.open = true;
  }
  if (target) { target.scrollIntoView({ block: 'start', behavior: 'auto' }); var f = target.querySelector('summary, h2'); focusEl(f); }
  else {
    window.scrollTo(0, curView === 'home' ? (homeState.scroll || 0) : 0);
    if (!firstRoute || curView !== 'home') focusEl($('#view-h'));
  }
  firstRoute = false;
}
function focusEl(el) { if (!el) return; try { if (!el.hasAttribute('tabindex') && !/^(SUMMARY|BUTTON|A|INPUT)$/.test(el.tagName)) el.setAttribute('tabindex', '-1'); el.focus({ preventScroll: true }); } catch (e) {} }
function goBack() {
  var s = histState();
  if (s && s.icuqr && s.n > 0) history.back(); else location.replace('#/');
}
window.addEventListener('hashchange', route);
/* ===================== 14 events + init ===================== */
function rerenderCurrent() { var y = window.scrollY; route(); window.scrollTo(0, y); }
function resetAppData() {
  confirmModal('Reset app data?\nThis deletes ALL ticks, the code log, pins, recents and settings stored by this app on this device. Reference content is unaffected.', 'Reset app data', true).then(function (ok) {
    if (!ok) return;
    store.clearAll([]);
    try { sessionStorage.clear(); } catch (e) {}
    timer = newTimer(); setWake(false); alertState = null;
    location.replace('#/'); location.reload();
  });
}
function newPatient() {
  var n = conditionsWithTicks().length;
  confirmModal('New patient: clear ALL ticked steps' + (n ? ' (' + n + ' condition' + (n === 1 ? '' : 's') + ')' : '') + '?\nThe code timer is not affected.', 'Clear all ticks', true).then(function (ok) {
    if (!ok) return; clearAllTicks(); toast('All ticks cleared'); announce('All ticks cleared'); rerenderCurrent();
  });
}
var ACTIONS = {
  back: goBack,
  top: function () { window.scrollTo({ top: 0, behavior: scrollBehavior() }); focusEl($('#view-h')); },
  fav: function () { if (!curCond) return; var on = toggleFav(curCond.id); renderActionBar(curCond); toast(on ? 'Pinned to Home' : 'Unpinned'); },
  clearticks: function () {
    var c = curCond; if (!c) return;
    var n = ticksSummary(c, loadTicks(c)).n;
    confirmModal('Clear ' + n + ' ticked step' + (n === 1 ? '' : 's') + ' on “' + c.name + '”?', 'Clear ticks', true).then(function (ok) {
      if (!ok) return; clearTicks(c); refreshTicks(c); toast('Ticks cleared');
    });
  },
  newpatient: newPatient,
  hidetip: function () { store.set('tipHidden', true); var tp = $('#installTip'); if (tp) tp.remove(); },
  gcsreset: function () { gcs = { e: 0, v: 0, m: 0 }; gcsUpdate(); },
  install: function () {
    if (deferredPrompt) { deferredPrompt.prompt(); deferredPrompt = null; }
    else toast(isIOS() ? 'Safari: Share → Add to Home Screen' : 'Browser menu → Install app / Add to Home screen', 4000);
  },
  update: function () {
    toast('Checking for updates…');
    checkVersion(true).then(function () {
      if (swReg) return swReg.update().catch(function () {});
    }).then(function () {
      setTimeout(function () {
        if (swReg && (swReg.waiting || swReg.installing)) { swWaiting = swReg.waiting || swWaiting; renderBanners(); toast('Update found: tap “Reload to update”.', 4000); }
        else if (newerAvailable()) toast('Newer content available: tap “Reload to update”.', 4000);
        else toast(verified && now() - verified.ts < 60e3 ? 'Up to date (v' + META.version + '), verified online just now' : 'Could not reach the server; showing saved copy', 4000);
        if (curView === 'about') rerenderCurrent();
      }, 1200);
    });
  },
  applyupdate: applyUpdate,
  blockack: function () { blockAck = true; hideBlocker(); renderBanners(); },
  resetall: resetAppData,
  reload: function () { location.reload(); }
};
document.addEventListener('click', function (e) {
  var t;
  if (!e.target || !e.target.closest) return;
  if ((t = e.target.closest('#timerchip')) && curCond && curCond.timer && $('#code-dock')) { e.preventDefault(); scrollToDock(); return; }
  if ((t = e.target.closest('.step[data-step]'))) {
    if (!curCond) return;
    toggleTick(curCond, t.getAttribute('data-step')); refreshTicks(curCond); vibrate(15); return;
  }
  if ((t = e.target.closest('[data-go]'))) {
    var s = $('#sec-' + t.getAttribute('data-go'));
    if (s) { s.open = true; s.scrollIntoView({ behavior: scrollBehavior(), block: 'start' }); focusEl(s.querySelector('summary')); }
    return;
  }
  if ((t = e.target.closest('[data-gcs]'))) { var v = t.getAttribute('data-v'); gcs[t.getAttribute('data-gcs')] = v === 'T' ? 'T' : +v; gcsUpdate(); return; }
  if ((t = e.target.closest('[data-cat]'))) {
    homeState.cat = t.getAttribute('data-cat');
    $$('.chip').forEach(function (x) { var on = x === t; x.classList.toggle('active', on); x.setAttribute('aria-pressed', on ? 'true' : 'false'); });
    safe('home list', renderHomeBody); return;
  }
  if (!(t = e.target.closest('[data-act]'))) return;
  if (t.disabled) return;
  var act = t.getAttribute('data-act');
  if ((act.charAt(0) === 't' && act !== 'top') || act === 'ackalert' || act === 'gotimer') { safe('timer', function () { timerAction(act); }); return; }
  if (ACTIONS[act]) safe('action ' + act, ACTIONS[act]);
});
document.addEventListener('visibilitychange', function () {
  if (document.visibilityState !== 'visible') return;
  unlockAudio();
  if (wantWake) { wake = null; setWake(true); }
  if (timer.run || alertState) loop();
  if (curView === 'cond' && curCond) safe('ticks', function () { refreshTicks(curCond); });
  checkForUpdates(false);
  renderBanners();
});
window.addEventListener('pageshow', function (e) { if (e.persisted) { unlockAudio(); if (timer.run) loop(); } });
window.addEventListener('error', function (e) { noteError('window', e.error || e.message); });
window.addEventListener('unhandledrejection', function (e) { noteError('promise', e.reason); });

/* periodic: tick ages/expiry on condition pages, freshness banners */
setInterval(function () {
  if (curView === 'cond' && curCond) safe('ticks', function () { refreshTicks(curCond); });
  renderBanners();
}, 60e3);
setInterval(function () { if (document.visibilityState === 'visible') checkForUpdates(true); }, VERSION_CHECK_MS);

/* ---- init ---- */
(function init() {
  net();
  safe('banners', renderBanners);
  route();
  if (timer.run) {
    lastCycle = Math.floor(elapsedMs() / 1000 / CYCLE);
    setWake(true); startLoop();
    if (elapsedMs() > TIMER_STALE_PROMPT) {
      var started = timer.start;
      confirmModal('A code timer started ' + ago(now() - started) + ' (' + dateTime(started) + ') is still running.\nEnd it now? The log is kept until you clear it.', 'End timer', true).then(function (ok) {
        if (!ok || !timer.run || timer.start !== started) return;
        timer.run = false; timer.stop = now(); logEv('Ended (stale timer, on reopen)'); saveTimer(); setWake(false); ackAlert(true); stopLoopIfIdle(); renderTimerButtons(true);
      });
    }
  } else updateTimerUI();
  if (document.readyState === 'complete') initSW(); else window.addEventListener('load', initSW);
  checkVersion(true);
})();
  } catch (fatal) {
    /* Last-resort recovery if startup itself fails: plain DOM, no dependencies. */
    try { console.error('[icuqr] fatal', fatal); } catch (e) {}
    var root = document.getElementById('app');
    if (root) {
      root.innerHTML = '<div class="recovery" role="alert"><h1 id="view-h" tabindex="-1">Something went wrong</h1><p>The app could not start. Use facility protocol meanwhile.</p>' +
        '<div class="btnrow"><button type="button" class="abtn primary" id="fx-reload">Try again</button><button type="button" class="abtn danger" id="fx-reset" data-act="resetall">Reset app data</button></div>' +
        '<p class="note">Reset deletes ticks, code log, pins and settings on this device.</p></div>';
      document.getElementById('fx-reload').addEventListener('click', function () { location.reload(); });
      document.getElementById('fx-reset').addEventListener('click', function () {
        if (!window.confirm('Reset app data? Deletes ticks, code log, pins and settings on this device.')) return;
        try { Object.keys(localStorage).forEach(function (k) { if (k.indexOf('icuqr.') === 0) localStorage.removeItem(k); }); } catch (e) {}
        location.reload();
      });
    }
  }
})();
