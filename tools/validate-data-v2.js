#!/usr/bin/env node
/* validate-data-v2.js — schema v2 lint for ICU Quick Reference data.js (extends validate-data.js).
   Usage: node validate-data-v2.js <appRoot> [--report-doses] [--no-crossfile]
   Exit 1 on any ERROR. */
const fs = require('fs'), vm = require('vm'), path = require('path');
const root = process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : '.';
const ctx = { window: {} }; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, 'data.js'), 'utf8'), ctx, { filename: 'data.js' });
const D = ctx.window.ICU_DATA;
const errors = [], warns = [], info = [];
const E = (m) => errors.push(m), W = (m) => warns.push(m), I = (m) => info.push(m);

// ---- top level
for (const k of ['version', 'date', 'reviewStatus', 'sources', 'categories', 'tools', 'conditions', 'meta'])
  if (D[k] == null || D[k] === '') E(`top-level "${k}" missing/empty`);
if (!/^\d{4}-\d{2}-\d{2}$/.test(D.date || '')) E(`date must be YYYY-MM-DD, got "${D.date}"`);
if (D.date && (Date.now() - Date.parse(D.date)) / 864e5 > 365) W(`content date ${D.date} is >12 months old`);
if (!D.reviewedBy) W('reviewedBy empty (draft)');
if (!/draft|NOT/i.test(D.version + D.reviewStatus) && !D.reviewedBy) E('status says reviewed but reviewedBy empty');
const M = D.meta || {};
for (const k of ['version', 'date', 'status', 'expires']) if (!M[k]) E(`meta.${k} missing`);
if (M.version && M.version !== D.version) E(`meta.version "${M.version}" != version "${D.version}"`);
if (M.date && M.date !== D.date) E(`meta.date "${M.date}" != date "${D.date}"`);
if (M.expires && !/^\d{4}-\d{2}-\d{2}$/.test(M.expires)) E('meta.expires must be YYYY-MM-DD');
if (M.expires && Date.parse(M.expires) < Date.now()) E(`content EXPIRED (meta.expires ${M.expires})`);
if (M.expires && M.date && Date.parse(M.expires) <= Date.parse(M.date)) E('meta.expires must be after meta.date');

// ---- conditions
const STR_LISTS = ['glance', 'recognize', 'meds', 'escalate'];
const OBJ_LISTS = { actions: 'a', monitor: 'm' };
const TAGS = new Set(['RN', 'ORDER', 'PROV']);
const ids = new Set(), names = new Set(), itemIds = new Set();
const BANNED_ANY = [[/andexanet/i, 'andexanet (withdrawn from US market Dec 2025) — use 4F-PCC per order']]; // allowed ONLY in top-level sources[] (citation of the withdrawal notice)
// numeric infusion-rate units banned in actions/meds (dose policy v2)
const RATE = /\d[\d.,–\-\s]*(mcg\/kg\/min|mcg\/min|mg\/min|units?\/kg\/h(r|our)?|units?\/h(r|our)?\b|units?\/min|mEq\/h(r|our)?|mmol\/h(r|our)?|mL\/h(r|our)?\b|mg\/h(r|our)?\b|mg\/kg\/h(r|our)?|mcg\/kg\/h(r|our)?|mcg\/h(r|our)?\b)/i;
const RATE_ALLOW = [/mL\/kg\/h/i]; // urine-output thresholds (monitoring, not dosing)
const HIGH_ALERT_NUM = /\b(norepinephrine|vasopressin|phenylephrine|dopamine|dobutamine|milrinone|insulin|heparin|alteplase|tenecteplase|potassium chloride|KCl|propofol|dexmedetomidine|rocuronium|vecuronium|cisatracurium|nitroprusside|nicardipine|clevidipine|esmolol|3% saline|23\.4%)\b[^.;·]{0,40}?\b\d+(\.\d+)?\s?(mg|mcg|units?|mEq|mL)\b/i;

D.conditions.forEach((c, n) => {
  const w = `conditions[${n}]${c && c.id ? ' (' + c.id + ')' : ''}`;
  if (!c || typeof c !== 'object') return E(`${w}: not an object`);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(c.id || '')) E(`${w}: id must be kebab-case [a-z0-9-]`);
  if (ids.has(c.id)) E(`${w}: duplicate id`); ids.add(c.id);
  if (!c.name || names.has(c.name)) E(`${w}: name missing/duplicate`); names.add(c.name);
  if (!D.categories.includes(c.category)) E(`${w}: category "${c.category}" not in categories`);
  if (typeof c.emergency !== 'boolean') E(`${w}: emergency must be boolean (required in v2)`);
  if (!Array.isArray(c.keywords)) E(`${w}: keywords must be an array (v2)`);
  else { if (c.keywords.length < 3) E(`${w}: <3 keywords`);
    if (c.keywords.some((k) => typeof k !== 'string' || !k.trim())) E(`${w}: empty/non-string keyword`);
    if (new Set(c.keywords.map((k) => k.toLowerCase())).size !== c.keywords.length) W(`${w}: duplicate keywords`); }
  if (!Array.isArray(c.warnings)) E(`${w}: warnings must be an array (may be empty)`);
  else c.warnings.forEach((s, i) => { if (typeof s !== 'string' || !s.trim()) E(`${w}.warnings[${i}]: empty / non-string`); });
  if (c._unrevised) E(`${w}: _unrevised flag present (v1 content not migrated)`);

  const textCheck = (s, where) => {
    if (s !== s.trim()) W(`${where}: leading/trailing whitespace`);
    if (/\s{2,}/.test(s)) W(`${where}: double space`);
    if (/[\u2018\u2019\u201C\u201D]/.test(s)) W(`${where}: curly quotes`);
    if (s.length > 260) W(`${where}: ${s.length} chars (> 260)`);
  };
  for (const L of STR_LISTS) {
    const a = c[L];
    if (!Array.isArray(a) || !a.length) { E(`${w}: "${L}" missing or empty`); continue; }
    a.forEach((s, i) => { if (typeof s !== 'string' || !s.trim()) E(`${w}.${L}[${i}]: empty / non-string`); else textCheck(s, `${w}.${L}[${i}]`); });
    if (new Set(a).size !== a.length) E(`${w}.${L}: duplicate lines`);
  }
  for (const [L, suf] of Object.entries(OBJ_LISTS)) {
    const a = c[L];
    if (!Array.isArray(a) || !a.length) { E(`${w}: "${L}" missing or empty`); continue; }
    a.forEach((o, i) => {
      const where = `${w}.${L}[${i}]`;
      if (!o || typeof o !== 'object' || Array.isArray(o)) return E(`${where}: must be {id,t,s} object`);
      const want = `${c.id}-${suf}${i + 1}`;
      if (o.id !== want) E(`${where}: id "${o.id}" (expected "${want}")`);
      if (itemIds.has(o.id)) E(`${where}: duplicate item id ${o.id}`); itemIds.add(o.id);
      if (typeof o.t !== 'string' || !o.t.trim()) E(`${where}: t empty / non-string`); else textCheck(o.t, where);
      if (!TAGS.has(o.s)) E(`${where}: s "${o.s}" not in RN|ORDER|PROV`);
      if (o.s === 'PROV' && !/^!?Anticipate\/assist/.test(o.t || '')) E(`${where}: PROV item must start "Anticipate/assist"`);
      const extra = Object.keys(o).filter((k) => !['id', 't', 's'].includes(k)); if (extra.length) W(`${where}: extra keys ${extra}`);
    });
    if (new Set(a.map((o) => o && o.t)).size !== a.length) E(`${w}.${L}: duplicate lines`);
  }
  if (c.glance && c.glance.length !== 3) W(`${w}: glance has ${c.glance.length} lines (convention = 3)`);
  if (c.actions && c.actions.length > 15) W(`${w}: ${c.actions.length} actions (long checklist)`);
  if (c.emergency && !(c.actions || []).some((o) => o && /^!/.test(o.t || ''))) E(`${w}: emergency without a "!" CALL step in actions`);
  if (!(c.escalate || []).length) E(`${w}: no escalation criteria`);
  if (!(c.meds || []).some((s) => /^VERIFY/i.test(s))) E(`${w}: no "VERIFY PER FACILITY…" line in meds[]`);
  (c.meds || []).forEach((s, i) => { if (/^VERIFY/i.test(s)) return;
    if (/\d/.test(s) && !/(mg|mcg|µg|g\b|units?|U\b|mEq|mmol|mL|L\b|%|J\b|mmHg|\/min|min|h\b|hr|kg|°)/i.test(s)) W(`${w}.meds[${i}]: number without unit`); });

  // ---- banned patterns / dose policy
  const all = [];
  STR_LISTS.forEach((L) => (c[L] || []).forEach((s, i) => all.push([`${L}[${i}]`, s, L])));
  Object.keys(OBJ_LISTS).forEach((L) => (c[L] || []).forEach((o, i) => all.push([`${L}[${i}]`, o && o.t || '', L])));
  (c.warnings || []).forEach((s, i) => all.push([`warnings[${i}]`, s, 'warnings']));
  all.push(['name', c.name || '', 'name']);
  all.forEach(([where, s, L]) => {
    BANNED_ANY.forEach(([re, why]) => { if (re.test(s)) E(`${w}.${where}: banned "${re.source}" — ${why}`); });
    if ((L === 'actions' || L === 'meds') && RATE.test(s) && !RATE_ALLOW.some((r) => r.test(s))) E(`${w}.${where}: numeric infusion-rate unit in ${L} (dose policy v2): "${s.match(RATE)[0]}"`);
    else if (RATE.test(s) && !RATE_ALLOW.some((r) => r.test(s))) W(`${w}.${where}: numeric rate unit outside actions/meds — confirm it is a monitoring threshold, not a dose`);
    if ((L === 'actions' || L === 'meds') && HIGH_ALERT_NUM.test(s)) E(`${w}.${where}: numeric dose next to high-alert/infusion drug: "${s.match(HIGH_ALERT_NUM)[0]}"`);
    if (process.argv.includes('--report-doses') && /\b\d+(\.\d+)?\s?(mg|mcg|µg|g|units?|mEq|mmol|J)\b/i.test(s)) I(`${w}.${where}: bolus/reference dose → reviewer sign-off: ${s.slice(0, 120)}`);
  });
});
// ---- tools
['vitals', 'labs'].forEach((k) => { const t = D.tools[k]; if (!t || !t.rows || !t.rows.length) E(`tools.${k} missing`); else {
  t.rows.forEach((r, i) => { if (r.length !== 2 || !r[0] || !r[1]) E(`tools.${k}.rows[${i}] malformed`); });
  const keys = t.rows.map((r) => r[0]); const dup = keys.filter((x, i) => keys.indexOf(x) !== i); if (dup.length) E(`tools.${k}: duplicate row labels ${[...new Set(dup)]}`); } });
const g = D.tools.gcs; if (!g || g.groups.length !== 3) E('tools.gcs must have 3 groups (E,V,M — app.js indexes by position)');
else { const max = [4, 5, 6], min = [1, 1, 1];
  g.groups.forEach((gr, i) => { const v = gr.items.map((x) => x[0]); if (Math.max(...v) !== max[i] || Math.min(...v) !== min[i] || new Set(v).size !== v.length) E(`gcs group ${gr.name}: scores must be unique ${min[i]}..${max[i]}`); }); }
if (!D.tools.rass || D.tools.rass.rows.length !== 10) W(`rass rows = ${D.tools.rass && D.tools.rass.rows.length} (expected 10: +4..-5)`);
(D.tools.reminders || []).forEach((r, i) => { if (!r.title || !r.lines || !r.lines.length) E(`tools.reminders[${i}] malformed`); });
// COPD target consistency anywhere in data
const blob = JSON.stringify(Object.assign({}, D, { sources: [] }));
(D.sources || []).forEach((s) => { if (/andexanet/i.test(s)) I(`sources: andexanet appears only as withdrawal-notice citation: ${s}`); });
[...blob.matchAll(/COPD[^"·;]{0,40}?(\d{2})\s*[–-]\s*(\d{2})\s*%/g)].forEach((m) => { if (!(m[1] === '88' && m[2] === '92')) E(`COPD SpO₂ target "${m[1]}–${m[2]}%" ≠ 88–92%`); });
if (/andexanet/i.test(blob)) E('andexanet mentioned outside sources[]');
[...blob.matchAll(/atropine[^"]{0,60}?max(imum)?\s*(total\s*)?(\d+(\.\d+)?)\s*mg/gi)].forEach((m) => { if (m[3] !== '3') E(`atropine max "${m[3]} mg" ≠ 3 mg`); });

// ---- cross-file consistency (app worker owns these files; failures here are reported, not fixed in data.js)
if (!process.argv.includes('--no-crossfile')) {
  try {
    const sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
    const cv = (sw.match(/CACHE_VERSION\s*=\s*['"`]([^'"`]+)['"`]/) || [])[1];
    if (!cv || !cv.includes(D.version)) E(`[cross-file] sw.js CACHE_VERSION "${cv}" does not contain data version "${D.version}"`);
    const assets = [...sw.matchAll(/['"]\.?\/?([^'"]+\.(?:html|css|js|json|png|svg))['"]/g)].map((m) => m[1]);
    assets.forEach((a) => { if (!fs.existsSync(path.join(root, a))) E(`[cross-file] sw.js precache asset missing on disk: ${a}`); });
    fs.readdirSync(root).filter((f) => /\.(html|css|js|json)$/.test(f) && f !== 'sw.js').forEach((f) => { if (!assets.includes(f)) W(`[cross-file] file ${f} not in sw.js ASSETS`); });
  } catch (e) { W(`[cross-file] sw.js check skipped: ${e.message}`); }
  try {
    const man = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'));
    (man.icons || []).forEach((i) => { if (!fs.existsSync(path.join(root, i.src))) E(`[cross-file] manifest icon missing: ${i.src}`); });
    (man.shortcuts || []).forEach((s) => { const m = s.url.match(/#\/c\/([\w-]+)/); if (m && !ids.has(m[1])) E(`[cross-file] manifest shortcut "${s.name}" -> unknown condition ${m[1]}`); });
  } catch (e) { W(`[cross-file] manifest check skipped: ${e.message}`); }
}

info.forEach((m) => console.log('INFO  ' + m)); warns.forEach((m) => console.log('WARN  ' + m)); errors.forEach((m) => console.log('ERROR ' + m));
const em = D.conditions.filter((c) => c.emergency).length;
console.log(`\n${D.conditions.length} conditions (${em} emergency), ${itemIds.size} action/monitor items, ${errors.length} errors, ${warns.length} warnings`);
process.exit(errors.length ? 1 : 0);
