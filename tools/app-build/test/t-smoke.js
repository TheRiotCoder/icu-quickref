// Smoke/layout: every route at 3 viewports, console errors, CSP, h1/title, overflow, jump-bar fit, header.
const { startServer, launch, newPage, sleep, check, summary, BASE } = require('./lib');
(async () => {
  const srv = await startServer('/workspace/v2-build/site', 8811), b = await launch();
  try {
    for (const vp of [[360, 640], [390, 844], [320, 568]]) {
      console.log('viewport ' + vp.join('x'));
      const p = await newPage(b, vp);
      await p.goto(BASE(8811), { waitUntil: 'networkidle0' });
      const ids = await p.evaluate(() => Array.from(document.querySelectorAll('#homeBody .list a.card')).map((a) => a.getAttribute('href')));
      check(ids.length >= 20, 'home lists conditions (' + ids.length + ')');
      const routes = ['#/', '#/tools', '#/tools/gcs', '#/about'].concat([...new Set(ids)]);
      const bad = [];
      for (const r of routes) {
        await p.evaluate((r) => { location.hash = r; }, r); await sleep(60);
        const info = await p.evaluate(() => {
          const h1 = document.querySelectorAll('h1');
          const sec = Array.from(document.querySelectorAll('.secnav button')).map((x) => { const bb = x.getBoundingClientRect(); return bb.right <= innerWidth + 0.5 && bb.left >= -0.5 && x.scrollWidth <= x.clientWidth + 1; });
          const tb = document.getElementById('topbar').getBoundingClientRect();
          return { h1: h1.length, title: document.title, over: document.documentElement.scrollWidth > innerWidth, secFit: sec.every(Boolean), nSec: sec.length,
            rec: !!document.querySelector('.recovery'), hdrTop: tb.top, strip: !!document.querySelector('.status-strip') };
        });
        if (info.h1 !== 1 || info.over || !info.secFit || info.rec || info.hdrTop < 0 || !info.title) bad.push(r + ' ' + JSON.stringify(info));
        if (r.indexOf('#/c/') === 0 && (!info.strip || info.nSec !== 5)) bad.push(r + ' missing status strip/jumps');
      }
      check(bad.length === 0, routes.length + ' routes: one h1, title, no overflow, jump bar fits, header visible ' + (bad.length ? bad.join('\n') : ''));
      // section order on a condition page
      await p.evaluate(() => { location.hash = '#/c/cardiac-arrest'; }); await sleep(80);
      const order = await p.evaluate(() => Array.from(document.querySelectorAll('article.cond > section, article.cond > details, article.cond > nav')).map((e) => e.id || e.className.split(' ')[0]));
      check(JSON.stringify(order) === JSON.stringify(['glance', 'warnbox', 'code-dock', 'secnav', 'sec-actions', 'sec-recognize', 'sec-monitor', 'sec-meds', 'sec-escalate']), 'arrest section order ' + order.join(','));
      check(await p.evaluate(() => document.title.indexOf('Cardiac arrest') === 0 && document.activeElement && document.activeElement.id === 'view-h'), 'title + focus on h1 after navigation');
      check(await p.evaluate(() => !!document.querySelector('#code-dock [data-act="tstart"]')), 'Start code timer button on arrest page');
      // 200% text: header grows, not clipped
      await p.evaluate(() => { document.body.style.fontSize = '36px'; document.querySelector('.brand').style.fontSize = '40px'; window.dispatchEvent(new Event('resize')); }); await sleep(100);
      const hd = await p.evaluate(() => { const t = document.getElementById('topbar').getBoundingClientRect(), br = document.querySelector('.brand').getBoundingClientRect(); return { t: t.top, bt: br.top, bb: br.bottom, tb: t.bottom }; });
      check(hd.bt >= hd.t && hd.bb <= hd.tb + 1, 'large text: brand inside header ' + JSON.stringify(hd));
      await p.evaluate(() => { document.body.style.fontSize = ''; document.querySelector('.brand').style.fontSize = ''; });
      check(p.errors.length === 0, 'no console errors / CSP violations ' + p.errors.slice(0, 5).join(' | '));
      await p.ctx.close();
    }
  } finally { await b.close(); srv.kill(); }
  process.exit(summary('smoke') ? 1 : 0);
})().catch((e) => { console.error(e); process.exit(2); });
