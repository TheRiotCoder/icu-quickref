#!/usr/bin/env node
/* Suggested lint: node tools/validate-data.js  (run in CI + pre-deploy). Exit 1 on any error. */
const fs = require('fs'), vm = require('vm'), path = require('path');
const root = process.argv[2] || '.';
const ctx = { window: {} }; vm.createContext(ctx);
vm.runInContext(fs.readFileSync(path.join(root, 'data.js'), 'utf8'), ctx, { filename: 'data.js' });
const D = ctx.window.ICU_DATA;
const errors = [], warns = [];
const E = (m) => errors.push(m), W = (m) => warns.push(m);

// ---- top level
for (const k of ['version', 'date', 'reviewStatus', 'sources', 'categories', 'tools', 'conditions'])
  if (D[k] == null || D[k] === '') E(`top-level "${k}" missing/empty`);
if (!/^\d{4}-\d{2}-\d{2}$/.test(D.date || '')) E(`date must be YYYY-MM-DD, got "${D.date}"`);
if (D.date && (Date.now() - Date.parse(D.date)) / 864e5 > 365) W(`content date ${D.date} is >12 months old`);
if (!D.reviewedBy) W('reviewedBy empty (draft)');
if (!/draft|NOT/i.test(D.version + D.reviewStatus) && !D.reviewedBy) E('status says reviewed but reviewedBy empty');

// ---- conditions
const LISTS = ['glance', 'recognize', 'actions', 'monitor', 'meds', 'escalate'];
const ids = new Set(), names = new Set();
D.conditions.forEach((c, n) => {
  const w = `conditions[${n}]${c && c.id ? ' (' + c.id + ')' : ''}`;
  if (!c || typeof c !== 'object') return E(`${w}: not an object`);
  if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(c.id || '')) E(`${w}: id must be kebab-case [a-z0-9-]`);
  if (ids.has(c.id)) E(`${w}: duplicate id`); ids.add(c.id);
  if (!c.name || names.has(c.name)) E(`${w}: name missing/duplicate`); names.add(c.name);
  if (!D.categories.includes(c.category)) E(`${w}: category "${c.category}" not in categories`);
  if (c.emergency !== undefined && typeof c.emergency !== 'boolean') E(`${w}: emergency must be boolean if present`);
  if (!c.keywords || c.keywords.split(/\s+/).length < 3) W(`${w}: <3 search keywords`);
  for (const L of LISTS) {
    const a = c[L];
    if (!Array.isArray(a) || !a.length) { E(`${w}: "${L}" missing or empty`); continue; }
    a.forEach((s, i) => {
      if (typeof s !== 'string' || !s.trim()) E(`${w}.${L}[${i}]: empty / non-string`);
      else {
        if (s !== s.trim()) W(`${w}.${L}[${i}]: leading/trailing whitespace`);
        if (/\s{2,}/.test(s)) W(`${w}.${L}[${i}]: double space`);
        if (/[\u2018\u2019\u201C\u201D]/.test(s)) W(`${w}.${L}[${i}]: curly quotes (inconsistent w/ README convention)`);
        if (s.length > 220) W(`${w}.${L}[${i}]: ${s.length} chars (> 220; tap target gets huge)`);
      }
    });
    if (new Set(a).size !== a.length) E(`${w}.${L}: duplicate lines`);
  }
  if (c.glance && c.glance.length !== 3) W(`${w}: glance has ${c.glance.length} lines (convention = 3)`);
  if (c.actions && c.actions.length > 15) W(`${w}: ${c.actions.length} actions (long checklist)`);
  if (c.emergency && !(c.actions || []).some((s) => s[0] === '!')) E(`${w}: emergency without a "!" CALL step`);
  if (!(c.escalate || []).length) E(`${w}: no escalation criteria`);
  // dosing lines must carry a unit and the section must carry the verify line
  (c.meds || []).forEach((s, i) => { if (/^VERIFY/i.test(s)) return;
    if (/\d/.test(s) && !/(mg|mcg|µg|g\b|units?|U\b|mEq|mmol|mL|L\b|%|J\b|mmHg|\/min|min|h\b|hr|kg)/i.test(s)) W(`${w}.meds[${i}]: number without unit`);
  });
  if (!(c.meds || []).some((s) => /^VERIFY/i.test(s))) W(`${w}: no "VERIFY PER FACILITY" line in meds[]`);
  // any dose-like token anywhere -> list for reviewer sign-off
  LISTS.forEach((L) => (c[L] || []).forEach((s, i) => { if (/\b\d+(\.\d+)?\s?(mg|mcg|µg|units?|mEq|mmol|mL)\b/i.test(s) && L !== 'meds' && process.argv.includes('--report-doses')) W(`${w}.${L}[${i}]: dose outside meds[] -> needs reviewer sign-off`); }));
});
// ---- tools
['vitals', 'labs'].forEach((k) => { const t = D.tools[k]; if (!t || !t.rows || !t.rows.length) E(`tools.${k} missing`); else t.rows.forEach((r, i) => { if (r.length !== 2 || !r[0] || !r[1]) E(`tools.${k}.rows[${i}] malformed`); }); });
const g = D.tools.gcs; if (!g || g.groups.length !== 3) E('tools.gcs must have 3 groups (E,V,M — app.js indexes by position)');
else { const max = [4, 5, 6], min = [1, 1, 1];
  g.groups.forEach((gr, i) => { const v = gr.items.map((x) => x[0]); if (Math.max(...v) !== max[i] || Math.min(...v) !== min[i] || new Set(v).size !== v.length) E(`gcs group ${gr.name}: scores must be unique ${min[i]}..${max[i]}`); }); }
if (!D.tools.rass || D.tools.rass.rows.length !== 10) W(`rass rows = ${D.tools.rass && D.tools.rass.rows.length} (expected 10: +4..-5)`);
(D.tools.reminders || []).forEach((r, i) => { if (!r.title || !r.lines || !r.lines.length) E(`tools.reminders[${i}] malformed`); });

// ---- cross-file consistency
const sw = fs.readFileSync(path.join(root, 'sw.js'), 'utf8');
const cv = (sw.match(/CACHE_VERSION\s*=\s*'([^']+)'/) || [])[1];
if (!cv || !cv.includes(D.version)) E(`sw.js CACHE_VERSION "${cv}" does not contain data version "${D.version}"`);
const assets = [...sw.matchAll(/'([^']+\.(?:html|css|js|json|png))'/g)].map((m) => m[1]);
assets.forEach((a) => { if (!fs.existsSync(path.join(root, a))) E(`sw.js precache asset missing on disk: ${a}`); });
fs.readdirSync(root).filter((f) => /\.(html|css|js|json)$/.test(f) && f !== 'sw.js').forEach((f) => { if (!assets.includes(f)) W(`file ${f} not in sw.js ASSETS`); });
const man = JSON.parse(fs.readFileSync(path.join(root, 'manifest.json'), 'utf8'));
man.icons.forEach((i) => { if (!fs.existsSync(path.join(root, i.src))) E(`manifest icon missing: ${i.src}`); });
(man.shortcuts || []).forEach((s) => { const m = s.url.match(/#\/c\/([\w-]+)/); if (m && !ids.has(m[1])) E(`manifest shortcut "${s.name}" -> unknown condition ${m[1]}`); });

warns.forEach((m) => console.log('WARN  ' + m)); errors.forEach((m) => console.log('ERROR ' + m));
console.log(`\n${D.conditions.length} conditions, ${errors.length} errors, ${warns.length} warnings`);
process.exit(errors.length ? 1 : 0);
