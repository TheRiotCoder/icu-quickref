const { startServer, launch, newPage, sleep, BASE } = require('./lib');
(async () => {
  const srv = await startServer('/workspace/v2-build/site', 8812), b = await launch();
  const vp = (process.argv[2] || '360x640').split('x').map(Number), theme = process.argv[3] || 'dark';
  const p = await newPage(b, vp);
  await p.goto(BASE(8812), { waitUntil: 'networkidle0' });
  await p.evaluate((t) => localStorage.setItem('icuqr.theme', JSON.stringify(t)), theme);
  await p.reload({ waitUntil: 'networkidle0' });
  const pre = vp.join('x') + '-' + theme;
  for (const [n, r, full] of [['home', '#/', false], ['arrest', '#/c/cardiac-arrest', false], ['arrest-full', '#/c/cardiac-arrest', true], ['tools', '#/tools', false], ['about', '#/about', true], ['pe', '#/c/pe', false]]) {
    await p.evaluate((r) => { location.hash = r; }, r); await sleep(150);
    await p.screenshot({ path: 'shots/' + pre + '-' + n + '.png', fullPage: full });
  }
  // arrest page: start timer, tick a step, screenshot
  await p.evaluate(() => { location.hash = '#/c/cardiac-arrest'; }); await sleep(150);
  await p.tap('#code-dock [data-act="tstart"]'); await sleep(800);
  await p.tap('.step[data-step]'); await sleep(100);
  await p.evaluate(() => document.querySelector('#sec-actions').scrollIntoView()); await sleep(100);
  await p.screenshot({ path: 'shots/' + pre + '-arrest-running.png' });
  await p.evaluate(() => window.scrollTo(0, 0)); await sleep(100);
  await p.screenshot({ path: 'shots/' + pre + '-arrest-running-top.png' });
  await b.close(); srv.kill();
})().catch((e) => { console.error(e); process.exit(2); });
