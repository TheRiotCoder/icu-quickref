const puppeteer = require('/workspace/reviews/_t/node_modules/puppeteer-core');
const { spawn } = require('child_process');
const path = require('path');
const BASE = (port) => 'http://127.0.0.1:' + port + '/';
function startServer(root, port) {
  return new Promise((res, rej) => {
    const p = spawn(process.execPath, [path.join(__dirname, 'srv.js'), root, String(port)], { stdio: ['ignore', 'pipe', 'inherit'] });
    p.stdout.once('data', () => res(p)); p.once('error', rej);
  });
}
async function launch() {
  return puppeteer.launch({ executablePath: '/usr/bin/google-chrome', headless: 'new', args: ['--no-sandbox', '--disable-gpu', '--autoplay-policy=no-user-gesture-required'] });
}
async function newPage(browser, vp, opts = {}) {
  const ctx = opts.ctx || await browser.createBrowserContext();
  const page = await ctx.newPage();
  await page.setViewport({ width: vp[0], height: vp[1], isMobile: true, hasTouch: true, deviceScaleFactor: 2 });
  page.errors = [];
  page.on('console', (m) => { if (m.type() === 'error') page.errors.push('console: ' + m.text()); });
  page.on('pageerror', (e) => page.errors.push('pageerror: ' + e.message));
  await page.evaluateOnNewDocument(() => {
    document.addEventListener('securitypolicyviolation', (e) => { (window.__csp = window.__csp || []).push(e.violatedDirective + ' ' + e.blockedURI); console.error('CSP violation ' + e.violatedDirective + ' ' + e.blockedURI); });
  });
  page.ctx = ctx;
  return page;
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let fails = 0, passes = 0;
function check(cond, msg) { if (cond) { passes++; console.log('  ok   ' + msg); } else { fails++; console.log('  FAIL ' + msg); } }
function summary(name) { console.log(name + ': ' + passes + ' passed, ' + fails + ' failed'); return fails; }
module.exports = { startServer, launch, newPage, sleep, check, summary, BASE };
