// Functional: search UI, timer, ticks expiry, corrupt storage, recovery, GCS, theme, contrast, jump bar.
const { startServer, launch, newPage, sleep, check, summary, BASE } = require('./lib');
const U = BASE(8813);
async function fresh(b, vp, pre) {
  const p = await newPage(b, vp || [390, 844]);
  if (pre) await p.evaluateOnNewDocument(pre);
  await p.goto(U, { waitUntil: 'networkidle0' });
  return p;
}
async function hash(p, h) { await p.evaluate((h) => { location.hash = h; }, h); await sleep(120); }
async function confirmOK(p) { await p.waitForSelector('#modal:not([hidden])', { timeout: 3000 }); await p.click('#modal-ok'); await sleep(100); }
(async () => {
  const srv = await startServer('/workspace/v2-build/site', 8813), b = await launch();
  try {
    /* ---------- search via the UI ---------- */
    console.log('search');
    let p = await fresh(b);
    const cases = [['PE', /^#\/c\/pe$/], ['vtach', /cardiac-arrest|unstable-tachy/], ['heart attack', /acs-mi/], ['GIB', /gi-bleed/], ['levophed', /sepsis|shock/], ['anaphylxis', /anaphylaxis/],
      ['vfib', /cardiac-arrest/], ['sz', /status-epilepticus/], ['hyperkalaemia', /hyperkalemia/], ['code', /cardiac-arrest/], ['timer', /tools\/timer/], ['gcs', /tools\/gcs/], ['MI', /acs-mi/], ['K', /hyperkalemia/]];
    for (const [q, re] of cases) {
      await p.evaluate(() => { const i = document.getElementById('q'); i.value = ''; });
      await p.type('#q', q); await sleep(50);
      const top = await p.evaluate(() => { const a = document.querySelector('#homeBody .card'); return a ? a.getAttribute('href') : '(none)'; });
      const top3 = await p.evaluate(() => Array.from(document.querySelectorAll('#homeBody .card')).slice(0, 3).map((a) => a.getAttribute('href')).join(' '));
      check(re.test(top), 'search "' + q + '" -> ' + top3);
    }
    if (true) { // levophed: top results are shock cards
      await p.evaluate(() => { document.getElementById('q').value = ''; }); await p.type('#q', 'levophed'); await sleep(50);
      const t = await p.evaluate(() => Array.from(document.querySelectorAll('#homeBody .card')).slice(0, 3).map((a) => a.getAttribute('href')));
      check(t.every((h) => /sepsis|shock/.test(h)), 'levophed top 3 are shock cards: ' + t.join(' '));
    }
    await p.evaluate(() => { document.getElementById('q').value = ''; }); await p.type('#q', 'PE'); await p.keyboard.press('Enter'); await sleep(150);
    check(await p.evaluate(() => location.hash === '#/c/pe'), 'Enter opens top result');
    check(p.errors.length === 0, 'no console errors (search) ' + p.errors.join('|'));
    await p.ctx.close();

    /* ---------- timer ---------- */
    console.log('timer');
    p = await fresh(b);
    await hash(p, '#/c/cardiac-arrest');
    const st = await p.$('#code-dock [data-act="tstart"]'); const bb = await st.boundingBox();
    await p.evaluate(() => document.querySelector('#code-dock').scrollIntoView()); await sleep(50);
    const bb2 = await (await p.$('#code-dock [data-act="tstart"]')).boundingBox();
    const cx = bb2.x + bb2.width / 2, cy = bb2.y + bb2.height / 2;
    await p.touchscreen.tap(cx, cy); await sleep(120); await p.touchscreen.tap(cx, cy); await sleep(300);
    let T = await p.evaluate(() => JSON.parse(localStorage.getItem('icuqr.timer')));
    check(T.run === true && T.epi.length === 0 && T.shock.length === 0 && T.log.length === 1, 'double-tap Start: running, nothing else logged (' + T.log.map((l) => l.txt).join(',') + ')');
    await sleep(1600);
    const epiBtn = async () => (await p.$('#code-dock [data-act="tepi"]')).boundingBox();
    let eb = await epiBtn();
    await p.touchscreen.tap(eb.x + 20, eb.y + 20); await sleep(80); await p.touchscreen.tap(eb.x + 20, eb.y + 20); await sleep(300);
    T = await p.evaluate(() => JSON.parse(localStorage.getItem('icuqr.timer')));
    check(T.epi.length === 1, 'double-tap Epinephrine logs once (' + T.epi.length + ')');
    await sleep(700); await p.click('#code-dock [data-act="tundo"]'); await sleep(200);
    T = await p.evaluate(() => JSON.parse(localStorage.getItem('icuqr.timer')));
    check(T.epi.length === 0 && /Removed/.test(T.log[0].txt), 'Undo last removes epinephrine');
    await sleep(700); await p.click('#code-dock [data-act="tshock"]'); await sleep(700);
    await p.click('#code-dock [data-act="tend"]'); await p.waitForSelector('#modal:not([hidden])');
    await p.click('#modal-cancel'); await sleep(100);
    T = await p.evaluate(() => JSON.parse(localStorage.getItem('icuqr.timer')));
    check(T.run === true, 'End code: Cancel keeps running');
    await sleep(700); await p.click('#code-dock [data-act="tend"]'); await confirmOK(p);
    T = await p.evaluate(() => JSON.parse(localStorage.getItem('icuqr.timer')));
    check(T.run === false && T.shock.length === 1, 'End code: confirm stops, log preserved');
    check(await p.evaluate(() => !document.querySelector('[data-act="tstart"]') && !!document.querySelector('[data-act="tresume"]') && !!document.querySelector('[data-act="tnew"]')), 'stopped: Resume / New code (no one-tap restart)');
    await sleep(700); await p.click('#code-dock [data-act="tnew"]'); await p.waitForSelector('#modal:not([hidden])'); await p.click('#modal-cancel'); await sleep(100);
    T = await p.evaluate(() => JSON.parse(localStorage.getItem('icuqr.timer')));
    check(T.shock.length === 1 && !T.run, 'New code: Cancel keeps log');
    await sleep(700); await p.click('#code-dock [data-act="tclear"]'); await confirmOK(p);
    T = await p.evaluate(() => JSON.parse(localStorage.getItem('icuqr.timer')));
    check(T.start === 0 && T.log.length === 0, 'Clear log: confirm clears');
    // rhythm alert at 2-min mark
    await p.evaluate(() => { const t = Date.now(); localStorage.setItem('icuqr.timer', JSON.stringify({ v: 2, run: true, start: t - 118500, stop: 0, epi: [], shock: [], log: [{ ts: t - 118500, txt: 'Code started' }] })); });
    await p.reload({ waitUntil: 'networkidle0' }); await sleep(2500);
    check(await p.evaluate(() => !document.getElementById('alertbar').hidden && document.documentElement.classList.contains('alerting')), 'rhythm-check alert banner + flash at 2:00');
    await p.click('#alertbar .alertbtn'); await sleep(100);
    check(await p.evaluate(() => document.getElementById('alertbar').hidden), 'alert acknowledged');
    // stale >60 min warning and >2 h prompt
    await p.evaluate(() => { const t = Date.now(); localStorage.setItem('icuqr.timer', JSON.stringify({ v: 2, run: true, start: t - 70 * 60e3, stop: 0, epi: [], shock: [], log: [] })); });
    await p.reload({ waitUntil: 'networkidle0' }); await hash(p, '#/tools'); await sleep(400);
    check(await p.evaluate(() => !document.getElementById('t-stale').hidden && document.getElementById('modal').hidden), '>60 min: stale warning, no prompt');
    await p.evaluate(() => { const t = Date.now(); localStorage.setItem('icuqr.timer', JSON.stringify({ v: 2, run: true, start: t - 3 * 3600e3, stop: 0, epi: [], shock: [], log: [] })); });
    await p.reload({ waitUntil: 'networkidle0' }); await sleep(300);
    check(await p.evaluate(() => !document.getElementById('modal').hidden && /still running/.test(document.getElementById('modal-msg').textContent)), '>2 h on load: prompt to end');
    await p.click('#modal-ok'); await sleep(150);
    T = await p.evaluate(() => JSON.parse(localStorage.getItem('icuqr.timer')));
    check(T.run === false, 'stale prompt: End stops timer');
    check(p.errors.length === 0, 'no console errors (timer) ' + p.errors.join('|'));
    await p.ctx.close();

    /* ---------- ticks ---------- */
    console.log('ticks');
    p = await fresh(b);
    await hash(p, '#/c/sepsis');
    await p.click('.step[data-step]'); await sleep(100);
    const key0 = await p.evaluate(() => document.querySelector('.step[data-step]').getAttribute('data-step'));
    await p.reload({ waitUntil: 'networkidle0' }); await sleep(100);
    check(await p.evaluate(() => document.querySelector('.step.done') && /✓/.test(document.querySelector('.step.done .tage').textContent)), 'tick persists with age shown');
    check(/^a:/.test(key0), 'tick keyed by stable id (' + key0 + ')');
    await p.ctx.close();
    // mock Date +13 h in a page sharing the same storage
    const ctx = await b.createBrowserContext();
    p = await newPage(b, [390, 844], { ctx }); await p.goto(U + '#/c/sepsis', { waitUntil: 'networkidle0' });
    await p.click('.step[data-step]'); await sleep(100);
    check(await p.evaluate(() => document.querySelectorAll('.step.done').length === 1), 'ticked in ctx');
    const p2 = await newPage(b, [390, 844], { ctx });
    await p2.evaluateOnNewDocument(() => { const off = 13 * 3600e3, RD = Date; const N = RD.now; Date.now = () => N() + off; });
    await p2.goto(U + '#/c/sepsis', { waitUntil: 'networkidle0' }); await sleep(100);
    check(await p2.evaluate(() => document.querySelectorAll('.step.done').length === 0), 'ticks expire after 12 h (Date mocked +13 h)');
    // content version change
    await p2.close(); await p.bringToFront(); await p.reload({ waitUntil: 'networkidle0' });
    await p.click('.step[data-step]'); await sleep(50);
    await p.evaluate(() => { const r = JSON.parse(localStorage.getItem('icuqr.chk.sepsis')); r.ver = 'old-version'; localStorage.setItem('icuqr.chk.sepsis', JSON.stringify(r)); });
    await p.reload({ waitUntil: 'networkidle0' }); await sleep(100);
    check(await p.evaluate(() => document.querySelectorAll('.step.done').length === 0), 'ticks dropped on content version change');
    // old v1 index-based ticks are ignored
    await p.evaluate(() => localStorage.setItem('icuqr.chk.sepsis', JSON.stringify({ a: [0, 1, 99], m: [] })));
    await p.reload({ waitUntil: 'networkidle0' }); await sleep(100);
    check(await p.evaluate(() => document.querySelectorAll('.step.done').length === 0 && !document.querySelector('.recovery')), 'legacy index ticks ignored');
    // new patient clear-all with confirm
    await p.click('.step[data-step]'); await hash(p, '#/c/dka'); await p.click('.step[data-step]'); await hash(p, '#/');
    check(await p.evaluate(() => /2 ticked steps/.test(document.getElementById('newpt').textContent)), 'home shows tick count');
    await p.click('#newpt [data-act="newpatient"]'); await confirmOK(p);
    check(await p.evaluate(() => !Object.keys(localStorage).some((k) => k.indexOf('icuqr.chk.') === 0)), 'New patient clears all ticks');
    check(p.errors.length === 0, 'no console errors (ticks) ' + p.errors.join('|'));
    await ctx.close();

    /* ---------- corrupt storage per key ---------- */
    console.log('corrupt storage');
    const keys = ['favs', 'recent', 'timer', 'theme', 'chk.cardiac-arrest', 'chk.sepsis', 'verified', 'tipHidden', 'lastError'];
    const vals = ['{}', 'null', '"x"', '5', '[1,2]', 'not json{', '{"a":[0,1,99],"m":null}', '{"v":2,"ver":"2.0.0","ticks":{"a:x":"bad"}}', '{"v":2,"run":true,"start":"x"}', 'true'];
    const ctx2 = await b.createBrowserContext();
    p = await newPage(b, [360, 640], { ctx: ctx2 }); await p.goto(U, { waitUntil: 'networkidle0' });
    const badList = [];
    for (const k of keys) for (const v of vals) {
      await p.evaluate((k, v) => { localStorage.clear(); localStorage.setItem('icuqr.' + k, v); }, k, v);
      for (const r of ['#/', '#/c/cardiac-arrest', '#/c/sepsis', '#/tools', '#/about']) {
        await p.goto(U + r, { waitUntil: 'domcontentloaded' }); await sleep(60);
        const ok = await p.evaluate(() => !!document.querySelector('h1#view-h') && !document.querySelector('.recovery') && document.querySelectorAll('#app *').length > 10);
        if (!ok) badList.push(k + '=' + v + ' @' + r);
      }
    }
    check(badList.length === 0, keys.length * vals.length + ' corrupt values x 5 routes render normally ' + badList.slice(0, 5).join(', '));
    check(p.errors.length === 0, 'no console errors (corrupt) ' + p.errors.slice(0, 3).join('|'));
    // localStorage throwing entirely
    await p.close(); const p3 = await newPage(b, [360, 640], { ctx: ctx2 });
    await p3.evaluateOnNewDocument(() => { Object.defineProperty(window, 'localStorage', { get() { throw new Error('denied'); } }); });
    await p3.goto(U + '#/c/cardiac-arrest', { waitUntil: 'networkidle0' });
    check(await p3.evaluate(() => !!document.querySelector('h1#view-h') && !document.querySelector('.recovery')), 'localStorage denied: still works');
    // recovery screen when a render throws
    await p3.close(); const p4 = await newPage(b, [360, 640], { ctx: ctx2 });
    await p4.setBypassServiceWorker(true); await p4.setRequestInterception(true);
    p4.on('request', (r) => r.url().endsWith('/data.js') ? r.respond({ status: 200, contentType: 'application/javascript', body: 'window.ICU_DATA = { conditions: [ { id: "x", name: "X", get actions() { throw new Error("boom"); } } ] };' }) : r.continue());
    await p4.goto(U, { waitUntil: 'networkidle0' });
    const rec = await p4.evaluate(() => ({ rec: !!document.querySelector('.recovery'), btn: !!document.querySelector('.recovery [data-act="resetall"]') }));
    check(rec.rec && rec.btn, 'broken content -> recovery screen with Reset app data');
    await p4.click('.recovery [data-act="resetall"]'); await p4.waitForSelector('#modal:not([hidden])');
    check(true, 'Reset app data asks for confirmation');
    await ctx2.close();

    /* ---------- GCS, theme, contrast, jump bar ---------- */
    console.log('gcs/theme/contrast');
    p = await fresh(b, [320, 568]);
    await hash(p, '#/tools/gcs');
    await p.click('[data-gcs="e"][data-v="3"]'); await p.click('[data-gcs="v"][data-v="T"]'); await p.click('[data-gcs="m"][data-v="5"]'); await sleep(50);
    const g = await p.evaluate(() => document.getElementById('gcs-total').textContent);
    check(/E3 VT M5 = 8T/.test(g), 'GCS intubated: ' + g);
    check(await p.evaluate(() => document.querySelector('[data-gcs="v"][data-v="T"]').getAttribute('aria-pressed') === 'true'), 'GCS options expose aria-pressed');
    await hash(p, '#/');
    check(await p.evaluate(() => !document.querySelector('[role="tablist"]') && document.querySelector('.chip[aria-pressed="true"]') && document.querySelector('.tabbar a[aria-current="page"]')), 'chips aria-pressed, tabs aria-current, no tablist');
    const contrast = await p.evaluate(() => {
      function rgb(s) { const m = s.match(/[\d.]+/g).map(Number); return m.slice(0, 3); }
      function L(c) { c = c.map((v) => { v /= 255; return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4); }); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; }
      function cr(a, b) { const x = L(rgb(a)), y = L(rgb(b)); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); }
      const out = {};
      for (const sel of ['.badge.em', '.logo']) { const e = document.querySelector(sel); if (e) { const cs = getComputedStyle(e); out[sel] = cr(cs.color, cs.backgroundColor).toFixed(2); } }
      const d = document.createElement('div'); document.body.appendChild(d);
      for (const v of ['--red-fill', '--red-fill2']) { d.style.background = 'var(' + v + ')'; d.style.color = '#fff'; const cs = getComputedStyle(d); out[v] = cr(cs.color, cs.backgroundColor).toFixed(2); }
      d.remove();
      return out;
    });
    check(Object.values(contrast).every((v) => +v >= 4.5), 'dark theme white-on-red >= 4.5:1 ' + JSON.stringify(contrast));
    await hash(p, '#/c/cardiac-arrest');
    const rows = await p.evaluate(() => new Set(Array.from(document.querySelectorAll('.secnav button')).map((b) => Math.round(b.getBoundingClientRect().top))).size);
    check(rows === 1, 'jump bar is one row at 320px');
    await p.ctx.close();
    // theme flash: block app.js; stored JSON '"light"' must still apply light theme
    p = await newPage(b, [360, 640]);
    await p.goto(U, { waitUntil: 'networkidle0' });
    await p.evaluate(() => localStorage.setItem('icuqr.theme', '"light"'));
    await p.setBypassServiceWorker(true); await p.setRequestInterception(true);
    p.on('request', (r) => /app\.js$/.test(r.url()) ? r.abort() : r.continue());
    await p.reload({ waitUntil: 'domcontentloaded' });
    check(await p.evaluate(() => document.documentElement.getAttribute('data-theme') === 'light'), 'theme-init applies stored "light" before app.js');
    await p.ctx.close();
  } finally { await b.close(); srv.kill(); }
  process.exit(summary('func') ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
