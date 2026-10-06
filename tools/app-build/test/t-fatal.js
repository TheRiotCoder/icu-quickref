const { startServer, launch, newPage, sleep, check, summary, BASE } = require('./lib');
(async () => {
  const srv = await startServer('/workspace/v2-build/site', 8815), b = await launch();
  const p = await newPage(b, [360, 640]);
  await p.setBypassServiceWorker(true); await p.setRequestInterception(true);
  p.on('request', (r) => r.url().endsWith('/data.js') ? r.respond({ status: 200, contentType: 'application/javascript', body: 'Object.defineProperty(window,"ICU_DATA",{get(){throw new Error("x")}});' }) : r.continue());
  await p.goto(BASE(8815), { waitUntil: 'networkidle0' });
  check(await p.evaluate(() => !!document.querySelector('.recovery #fx-reset')), 'fatal startup error -> fallback recovery with Reset');
  await b.close(); srv.kill(); process.exit(summary('fatal') ? 1 : 0);
})();
