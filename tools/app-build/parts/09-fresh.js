/* ===================== 09 freshness, recall, service-worker updates ===================== */
function isRemote(v) { return isObj(v) && typeof v.version === 'string'; }
function isVerified(v) { return isObj(v) && isNum(v.ts) && (v.remote == null || isRemote(v.remote)); }
var verified = store.get('verified', null, isVerified);   // {ts: last OK fetch of version.json from network, remote: {...}}
var checkedOnce = false, blockAck = false, swReg = null, swWaiting = null, updating = false, lastCheck = 0;
function cmpVer(a, b) {
  var pa = String(a).split(/[.\-+]/), pb = String(b).split(/[.\-+]/);
  for (var i = 0; i < Math.max(pa.length, pb.length); i++) {
    var x = pa[i] || '0', y = pb[i] || '0', nx = +x, ny = +y;
    if (!isNaN(nx) && !isNaN(ny)) { if (nx !== ny) return nx < ny ? -1 : 1; }
    else if (x !== y) return x < y ? -1 : 1;
  }
  return 0;
}
function remote() { return verified && verified.remote ? verified.remote : null; }
function withdrawn() {
  var r = remote(); if (!r) return false;
  if (r.withdrawn === true && (!r.withdrawnVersion || r.withdrawnVersion === META.version)) return true;
  return !!(r.minSafe && typeof r.minSafe === 'string' && cmpVer(META.version, r.minSafe) < 0);
}
function newerAvailable() { var r = remote(); return !!(swWaiting || (r && r.version && r.version !== META.version)); }
function daysSinceVerified() { return verified ? (now() - verified.ts) / DAY : Infinity; }
function freshnessText() {
  return 'Content v' + META.version + (META.date ? ' (' + META.date + ')' : '') + ' · last verified online: ' +
    (verified ? dateTime(verified.ts) + ' (' + ago(now() - verified.ts) + ')' : 'never on this device');
}
function freshnessHtml() {
  var stale = daysSinceVerified() > VERIFY_STALE_DAYS;
  return '<p class="fresh' + (stale && checkedOnce ? ' stale' : '') + '" id="fresh-stamp">' + esc(freshnessText()) + '</p>';
}
function checkVersion(force) {
  if (!window.fetch) return Promise.resolve();
  if (!force && now() - lastCheck < 60e3) return Promise.resolve();
  lastCheck = now();
  return fetch('version.json', { cache: 'no-store' }).then(function (res) {
    if (!res.ok || res.headers.get('X-SW-Fallback')) throw new Error('offline');
    return res.json();
  }).then(function (j) {
    if (!isRemote(j)) throw new Error('bad version.json');
    verified = { ts: now(), remote: { version: j.version, date: str(j.date), withdrawn: j.withdrawn === true, withdrawnVersion: str(j.withdrawnVersion), minSafe: str(j.minSafe), message: str(j.message).slice(0, 500) } };
    store.set('verified', verified);
  }).catch(function () { /* offline or blocked: keep the last stamp */ }).then(function () {
    checkedOnce = true; renderBanners();
    var f = $('#fresh-stamp'); if (f) f.outerHTML = freshnessHtml();
  });
}
function renderBanners() {
  var b = $('#banners'); if (!b) return;
  var h = '', r = remote(), expired = contentExpired(), wd = withdrawn();
  if (wd || expired) {
    var why = wd ? 'This content version (v' + META.version + ') has been WITHDRAWN.' : 'This content expired on ' + META.expires + '.';
    h += '<div class="banner red" role="alert"><b>' + esc(why) + '</b> Do not rely on it. ' + esc(wd && r.message ? r.message : 'Use facility protocol and orders.') +
      (newerAvailable() ? ' <button type="button" class="bbtn" data-act="applyupdate">Update now</button>' : '') + '</div>';
    if (!blockAck) showBlocker(why, wd && r.message ? r.message : '');
  } else hideBlocker();
  if (newerAvailable() && !(wd || expired)) {
    h += '<div class="banner blue" role="status"><span>' + (updating ? 'Updating… waiting for the new version to finish downloading.' : 'Updated content is available' + (r && r.version && r.version !== META.version ? ' (v' + esc(r.version) + ')' : '') + '.') + '</span>' +
      (updating ? '' : '<button type="button" class="bbtn" data-act="applyupdate">Reload to update</button>') + '</div>';
  }
  if (checkedOnce && daysSinceVerified() > VERIFY_STALE_DAYS && !(wd || expired)) {
    h += '<div class="banner amber" role="status">' + (verified ? 'Content not verified online for ' + Math.floor(daysSinceVerified()) + ' days' : 'Content has not been verified online on this device') +
      '. It may be out of date: connect to the internet to check.</div>';
  }
  if (b.innerHTML !== h) { b.innerHTML = h; layoutVars(); }
}
function showBlocker(why, msg) {
  var bl = $('#blocker'); if (!bl || (!bl.hidden && bl.getAttribute('data-why') === why + msg)) return;
  bl.setAttribute('data-why', why + msg);
  bl.innerHTML = '<div class="blocker-box"><h2 id="blocker-h">⚠ Do not use this content</h2><p>' + esc(why) + '</p>' + (msg ? '<p>' + esc(msg) + '</p>' : '') +
    '<p>Follow your facility protocol and active orders. Connect to the internet and update the app.</p>' +
    '<div class="btnrow"><button type="button" class="abtn primary" data-act="applyupdate">Check for update</button><button type="button" class="abtn" data-act="blockack">I understand: view anyway</button></div></div>';
  bl.hidden = false;
  setTimeout(function () { var x = bl.querySelector('button'); if (x) x.focus(); }, 0);
}
function hideBlocker() { var bl = $('#blocker'); if (bl && !bl.hidden) { bl.hidden = true; bl.innerHTML = ''; } }

/* ---- service worker ---- */
function trackInstalling(w) {
  if (!w) return;
  w.addEventListener('statechange', function () {
    if (w.state === 'installed' && navigator.serviceWorker.controller) { swWaiting = swReg && swReg.waiting || w; renderBanners(); if (updating) skipTo(swWaiting); }
  });
}
function skipTo(w) { try { w.postMessage({ type: 'SKIP_WAITING' }); } catch (e) { location.reload(); } }
function applyUpdate() {
  if (!('serviceWorker' in navigator) || !swReg) { location.reload(); return; }
  updating = true; renderBanners();
  if (swReg.waiting) { skipTo(swReg.waiting); return; }
  var done = false;
  swReg.update().catch(function () {}).then(function () {
    if (swReg.waiting) { done = true; skipTo(swReg.waiting); }
    else if (swReg.installing) { done = true; trackInstalling(swReg.installing); }
  });
  /* No new worker within 15 s: this release changed only network-first files; plain reload. */
  setTimeout(function () { if (!done && !swReg.waiting && !swReg.installing) location.reload(); }, 15e3);
}
function initSW() {
  if (!('serviceWorker' in navigator)) return;
  navigator.serviceWorker.addEventListener('controllerchange', function () { if (updating) location.reload(); });
  navigator.serviceWorker.register('sw.js').then(function (reg) {
    swReg = reg;
    if (reg.waiting && navigator.serviceWorker.controller) { swWaiting = reg.waiting; renderBanners(); }
    if (reg.installing) trackInstalling(reg.installing);
    reg.addEventListener('updatefound', function () { trackInstalling(reg.installing); });
  }).catch(function (err) { console.warn('SW registration failed', err); });
  try { if (navigator.storage && navigator.storage.persist) navigator.storage.persist().catch(function () {}); } catch (e) {}
}
function checkForUpdates(force) {
  checkVersion(force);
  if (swReg) swReg.update().catch(function () {});
}
var OFFLINE_FILES = ['index.html', 'app.js', 'data.js', 'styles.css', 'theme-init.js', 'manifest.json', 'version.json'];
function offlineStatus(cb) {
  if (!window.caches) { cb('Not supported in this browser'); return; }
  Promise.all(OFFLINE_FILES.map(function (f) { return caches.match(f).then(function (r) { return r ? null : f; }); })).then(function (miss) {
    miss = miss.filter(Boolean);
    cb(miss.length ? (miss.length === OFFLINE_FILES.length ? 'Not saved for offline yet: open once online' : 'Incomplete (missing ' + miss.join(', ') + ')') : 'Ready: all app files saved on this device');
  }).catch(function () { cb('Unknown'); });
}
function net() {
  var d = $('#netdot'); if (!d) return;
  d.classList.toggle('off', !navigator.onLine);
  d.setAttribute('aria-label', navigator.onLine ? 'Online' : 'Offline (app still works)');
  d.title = d.getAttribute('aria-label');
}
window.addEventListener('online', function () { net(); checkForUpdates(true); });
window.addEventListener('offline', net);
