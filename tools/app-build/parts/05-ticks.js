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
