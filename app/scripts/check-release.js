#!/usr/bin/env node
/* Pre-deploy check: node scripts/check-release.js [appDir]
   - every JS file passes a syntax check
   - data.js content version (meta.version or legacy version) == version.json version
   - sw.js CACHE_VERSION contains that version; every precached asset exists
   - no inline <script> blocks or style="" attributes (strict CSP) */
'use strict';
const fs = require('fs'), path = require('path'), vm = require('vm'), cp = require('child_process');
const dir = path.resolve(process.argv[2] || path.join(__dirname, '..'));
let errors = 0;
const err = (m) => { errors++; console.error('ERROR: ' + m); };
const ok = (m) => console.log('ok: ' + m);
for (const f of ['app.js', 'data.js', 'sw.js', 'theme-init.js']) {
  try { cp.execFileSync(process.execPath, ['--check', path.join(dir, f)], { stdio: 'pipe' }); ok(f + ' syntax'); }
  catch (e) { err(f + ' syntax: ' + String(e.stderr || e.message).split('\n').slice(0, 4).join(' ')); }
}
let D = null;
try { const ctx = { window: {} }; vm.createContext(ctx); vm.runInContext(fs.readFileSync(path.join(dir, 'data.js'), 'utf8'), ctx); D = ctx.window.ICU_DATA; } catch (e) { err('data.js does not run: ' + e.message); }
const dataVer = D ? ((D.meta && D.meta.version) || D.version) : null;
let vj = null;
try { vj = JSON.parse(fs.readFileSync(path.join(dir, 'version.json'), 'utf8')); } catch (e) { err('version.json invalid: ' + e.message); }
if (D && vj) { if (vj.version === dataVer) ok('version.json matches data.js (' + dataVer + ')'); else err('version.json version "' + vj.version + '" != data.js version "' + dataVer + '"'); }
const sw = fs.readFileSync(path.join(dir, 'sw.js'), 'utf8');
const cv = (sw.match(/CACHE_VERSION\s*=\s*'([^']+)'/) || [])[1];
if (!cv) err('CACHE_VERSION not found in sw.js'); else if (dataVer && cv.indexOf(dataVer) < 0) err('CACHE_VERSION "' + cv + '" does not contain data version "' + dataVer + '"'); else ok('CACHE_VERSION ' + cv);
const assets = (sw.match(/const ASSETS = \[([\s\S]*?)\]/) || [])[1];
(assets || '').match(/'[^']+'/g).map((s) => s.slice(1, -1)).forEach((a) => { if (a !== './' && !fs.existsSync(path.join(dir, a))) err('precached asset missing: ' + a); });
const html = fs.readFileSync(path.join(dir, 'index.html'), 'utf8');
if (/<script(?![^>]*\ssrc=)[^>]*>/i.test(html)) err('inline <script> in index.html'); else ok('no inline scripts');
if (/\sstyle\s*=/i.test(html + fs.readFileSync(path.join(dir, 'app.js'), 'utf8').replace(/\.style\b/g, ''))) err('style= attribute found (breaks CSP)'); else ok('no inline style attributes');
if (D) {
  const ids = new Set();
  (D.conditions || []).forEach((c) => { if (ids.has(c.id)) err('duplicate condition id ' + c.id); ids.add(c.id); });
  (D.conditions || []).forEach((c) => ['actions', 'monitor'].forEach((k) => {
    const seen = new Set();
    (c[k] || []).forEach((it) => { if (it && typeof it === 'object' && it.id) { if (seen.has(it.id)) err(c.id + '.' + k + ' duplicate step id ' + it.id); seen.add(it.id); } });
  }));
  ok((D.conditions || []).length + ' conditions; ' + (D.conditions || []).filter((c) => c.emergency).length + ' emergency');
}
console.log(errors ? errors + ' error(s)' : 'release check passed');
process.exit(errors ? 1 : 0);
