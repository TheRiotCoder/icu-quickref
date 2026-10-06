// Service worker: offline, update banner after version bump, withdrawn, expired, stale-verification.
const fs = require('fs');
const { startServer, launch, newPage, sleep, check, summary, BASE } = require('./lib');
const ROOT = '/workspace/v2-build/site-sw', PORT = 8814, U = BASE(PORT);
const rd = (f) => fs.readFileSync(ROOT + '/' + f, 'utf8'), wr = (f, s) => fs.writeFileSync(ROOT + '/' + f, s);
(async () => {
  fs.rmSync(ROOT, { recursive: true, force: true }); fs.cpSync('/workspace/v2-build/site', ROOT, { recursive: true });
  let srv = await startServer(ROOT, PORT); const b = await launch();
  try {
    const p = await newPage(b, [390, 844]);
    await p.goto(U, { waitUntil: 'networkidle0' });
    await p.evaluate(() => navigator.serviceWorker.ready);
    await sleep(800);
    check(await p.evaluate(() => !!navigator.serviceWorker.controller), 'SW controls page after first load (clients.claim)');
    const cached = await p.evaluate(async () => { const r = await Promise.all(['index.html', 'app.js', 'data.js', 'styles.css', 'theme-init.js', 'version.json', 'manifest.json', 'icons/icon-192.png'].map((f) => caches.match(f))); return r.filter(Boolean).length; });
    check(cached === 8, 'all assets precached (' + cached + '/8)');
    check(await p.evaluate(() => /last verified online: 20/.test(document.getElementById('fresh-stamp').textContent)), 'Home shows "last verified online" stamp');
    // offline
    srv.kill(); await sleep(300);
    await p.reload({ waitUntil: 'domcontentloaded' }); await sleep(800);
    check(await p.evaluate(() => !!document.querySelector('#homeBody .card') && !document.querySelector('.recovery')), 'offline reload: home renders');
    await p.goto(U + '#/c/pe', { waitUntil: 'domcontentloaded' }); await p.reload({ waitUntil: 'domcontentloaded' }); await sleep(600);
    check(await p.evaluate(() => /Pulmonary embolism/.test(document.querySelector('h1').textContent)), 'offline deep link reload renders condition');
    await p.goto(U + '#/tools', { waitUntil: 'domcontentloaded' }); await sleep(300);
    check(await p.evaluate(() => !!document.getElementById('tool-timer')), 'offline tools render');
    // stale verification warning while offline
    await p.evaluate(() => { const v = JSON.parse(localStorage.getItem('icuqr.verified')); v.ts = Date.now() - 20 * 864e5; localStorage.setItem('icuqr.verified', JSON.stringify(v)); });
    await p.goto(U + '#/', { waitUntil: 'domcontentloaded' }); await p.reload({ waitUntil: 'domcontentloaded' }); await sleep(5500);
    check(await p.evaluate(() => /not verified online for 20 days/.test(document.getElementById('banners').textContent)), 'offline >14 days: amber "not verified" banner');
    const offErr = p.errors.filter((e) => !/Failed to load resource|net::ERR/.test(e));
    check(offErr.length === 0, 'no app console errors offline ' + offErr.join('|'));
    // back online + version bump
    srv = await startServer(ROOT, PORT);
    wr('sw.js', rd('sw.js').replace(/CACHE_VERSION = '([^']+)'/, "CACHE_VERSION = 'icuqr-v2.0.1-test'"));
    wr('version.json', JSON.stringify({ version: '2.0.1', date: '2026-10-05', withdrawn: false }));
    wr('data.js', rd('data.js').replace(/version: "2\.0\.0"/g, 'version: "2.0.1"'));
    await p.goto(U + '#/about', { waitUntil: 'domcontentloaded' }); await sleep(300);
    await p.click('[data-act="update"]');
    await p.waitForFunction(() => /Reload to update/.test(document.getElementById('banners').textContent), { timeout: 15000 }).then(() => check(true, 'update banner appears after version bump'), () => check(false, 'update banner appears after version bump'));
    await sleep(3000);
    check(await p.evaluate(() => /Reload to update/.test(document.getElementById('banners').textContent)), 'update banner is persistent (still there after 3 s)');
    await Promise.all([p.waitForNavigation({ timeout: 20000 }), p.click('#banners [data-act="applyupdate"]')]);
    await sleep(1000);
    const after = await p.evaluate(async () => ({ ver: (window.ICU_DATA.meta || {}).version || window.ICU_DATA.version, keys: await caches.keys(), banner: document.getElementById('banners').textContent }));
    check(after.ver === '2.0.1' && after.keys.includes('icuqr-v2.0.1-test') && !after.keys.some((k) => k !== 'icuqr-v2.0.1-test') && !/Reload to update/.test(after.banner), 'after reload: new version, old cache deleted, banner gone ' + JSON.stringify(after.keys));
    // withdrawn
    wr('version.json', JSON.stringify({ version: '2.0.1', date: '2026-10-05', withdrawn: true, message: 'Dose error found in sepsis card.' }));
    await p.goto(U + '#/about', { waitUntil: 'domcontentloaded' }); await sleep(200);
    await p.click('[data-act="update"]'); await sleep(2500);
    check(await p.evaluate(() => !document.getElementById('blocker').hidden && /WITHDRAWN/.test(document.getElementById('blocker').textContent + document.getElementById('banners').textContent)), 'withdrawn:true -> blocking red screen');
    await p.click('#blocker [data-act="blockack"]'); await sleep(200);
    check(await p.evaluate(() => document.getElementById('blocker').hidden && /WITHDRAWN/.test(document.getElementById('banners').textContent)), 'after acknowledging: persistent red banner');
    // expired
    wr('version.json', JSON.stringify({ version: '2.0.1', date: '2026-10-05', withdrawn: false }));
    wr('data.js', rd('data.js').replace(/expires: "[^"]*"/, 'expires: "2020-01-01"'));
    await p.reload({ waitUntil: 'networkidle0' }); await sleep(800);
    check(await p.evaluate(() => !document.getElementById('blocker').hidden && /expired on 2020-01-01/.test(document.getElementById('blocker').textContent)), 'meta.expires passed -> blocking red screen');
    const errs = p.errors.filter((e) => !/Failed to load resource|net::ERR/.test(e));
    check(errs.length === 0, 'no console errors (sw) ' + errs.join('|'));
  } finally { await b.close(); srv.kill(); }
  process.exit(summary('sw') ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
