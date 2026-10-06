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
