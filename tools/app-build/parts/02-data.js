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
