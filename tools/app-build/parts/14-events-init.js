/* ===================== 14 events + init ===================== */
function rerenderCurrent() { var y = window.scrollY; route(); window.scrollTo(0, y); }
function resetAppData() {
  confirmModal('Reset app data?\nThis deletes ALL ticks, the code log, pins, recents and settings stored by this app on this device. Reference content is unaffected.', 'Reset app data', true).then(function (ok) {
    if (!ok) return;
    store.clearAll([]);
    try { sessionStorage.clear(); } catch (e) {}
    timer = newTimer(); setWake(false); alertState = null;
    location.replace('#/'); location.reload();
  });
}
function newPatient() {
  var n = conditionsWithTicks().length;
  confirmModal('New patient: clear ALL ticked steps' + (n ? ' (' + n + ' condition' + (n === 1 ? '' : 's') + ')' : '') + '?\nThe code timer is not affected.', 'Clear all ticks', true).then(function (ok) {
    if (!ok) return; clearAllTicks(); toast('All ticks cleared'); announce('All ticks cleared'); rerenderCurrent();
  });
}
var ACTIONS = {
  back: goBack,
  top: function () { window.scrollTo({ top: 0, behavior: scrollBehavior() }); focusEl($('#view-h')); },
  fav: function () { if (!curCond) return; var on = toggleFav(curCond.id); renderActionBar(curCond); toast(on ? 'Pinned to Home' : 'Unpinned'); },
  clearticks: function () {
    var c = curCond; if (!c) return;
    var n = ticksSummary(c, loadTicks(c)).n;
    confirmModal('Clear ' + n + ' ticked step' + (n === 1 ? '' : 's') + ' on “' + c.name + '”?', 'Clear ticks', true).then(function (ok) {
      if (!ok) return; clearTicks(c); refreshTicks(c); toast('Ticks cleared');
    });
  },
  newpatient: newPatient,
  hidetip: function () { store.set('tipHidden', true); var tp = $('#installTip'); if (tp) tp.remove(); },
  gcsreset: function () { gcs = { e: 0, v: 0, m: 0 }; gcsUpdate(); },
  install: function () {
    if (deferredPrompt) { deferredPrompt.prompt(); deferredPrompt = null; }
    else toast(isIOS() ? 'Safari: Share → Add to Home Screen' : 'Browser menu → Install app / Add to Home screen', 4000);
  },
  update: function () {
    toast('Checking for updates…');
    checkVersion(true).then(function () {
      if (swReg) return swReg.update().catch(function () {});
    }).then(function () {
      setTimeout(function () {
        if (swReg && (swReg.waiting || swReg.installing)) { swWaiting = swReg.waiting || swWaiting; renderBanners(); toast('Update found: tap “Reload to update”.', 4000); }
        else if (newerAvailable()) toast('Newer content available: tap “Reload to update”.', 4000);
        else toast(verified && now() - verified.ts < 60e3 ? 'Up to date (v' + META.version + '), verified online just now' : 'Could not reach the server; showing saved copy', 4000);
        if (curView === 'about') rerenderCurrent();
      }, 1200);
    });
  },
  applyupdate: applyUpdate,
  blockack: function () { blockAck = true; hideBlocker(); renderBanners(); },
  resetall: resetAppData,
  reload: function () { location.reload(); }
};
document.addEventListener('click', function (e) {
  var t;
  if (!e.target || !e.target.closest) return;
  if ((t = e.target.closest('#timerchip')) && curCond && curCond.timer && $('#code-dock')) { e.preventDefault(); scrollToDock(); return; }
  if ((t = e.target.closest('.step[data-step]'))) {
    if (!curCond) return;
    toggleTick(curCond, t.getAttribute('data-step')); refreshTicks(curCond); vibrate(15); return;
  }
  if ((t = e.target.closest('[data-go]'))) {
    var s = $('#sec-' + t.getAttribute('data-go'));
    if (s) { s.open = true; s.scrollIntoView({ behavior: scrollBehavior(), block: 'start' }); focusEl(s.querySelector('summary')); }
    return;
  }
  if ((t = e.target.closest('[data-gcs]'))) { var v = t.getAttribute('data-v'); gcs[t.getAttribute('data-gcs')] = v === 'T' ? 'T' : +v; gcsUpdate(); return; }
  if ((t = e.target.closest('[data-cat]'))) {
    homeState.cat = t.getAttribute('data-cat');
    $$('.chip').forEach(function (x) { var on = x === t; x.classList.toggle('active', on); x.setAttribute('aria-pressed', on ? 'true' : 'false'); });
    safe('home list', renderHomeBody); return;
  }
  if (!(t = e.target.closest('[data-act]'))) return;
  if (t.disabled) return;
  var act = t.getAttribute('data-act');
  if ((act.charAt(0) === 't' && act !== 'top') || act === 'ackalert' || act === 'gotimer') { safe('timer', function () { timerAction(act); }); return; }
  if (ACTIONS[act]) safe('action ' + act, ACTIONS[act]);
});
document.addEventListener('visibilitychange', function () {
  if (document.visibilityState !== 'visible') return;
  unlockAudio();
  if (wantWake) { wake = null; setWake(true); }
  if (timer.run || alertState) loop();
  if (curView === 'cond' && curCond) safe('ticks', function () { refreshTicks(curCond); });
  checkForUpdates(false);
  renderBanners();
});
window.addEventListener('pageshow', function (e) { if (e.persisted) { unlockAudio(); if (timer.run) loop(); } });
window.addEventListener('error', function (e) { noteError('window', e.error || e.message); });
window.addEventListener('unhandledrejection', function (e) { noteError('promise', e.reason); });

/* periodic: tick ages/expiry on condition pages, freshness banners */
setInterval(function () {
  if (curView === 'cond' && curCond) safe('ticks', function () { refreshTicks(curCond); });
  renderBanners();
}, 60e3);
setInterval(function () { if (document.visibilityState === 'visible') checkForUpdates(true); }, VERSION_CHECK_MS);

/* ---- init ---- */
(function init() {
  net();
  safe('banners', renderBanners);
  route();
  if (timer.run) {
    lastCycle = Math.floor(elapsedMs() / 1000 / CYCLE);
    setWake(true); startLoop();
    if (elapsedMs() > TIMER_STALE_PROMPT) {
      var started = timer.start;
      confirmModal('A code timer started ' + ago(now() - started) + ' (' + dateTime(started) + ') is still running.\nEnd it now? The log is kept until you clear it.', 'End timer', true).then(function (ok) {
        if (!ok || !timer.run || timer.start !== started) return;
        timer.run = false; timer.stop = now(); logEv('Ended (stale timer, on reopen)'); saveTimer(); setWake(false); ackAlert(true); stopLoopIfIdle(); renderTimerButtons(true);
      });
    }
  } else updateTimerUI();
  if (document.readyState === 'complete') initSW(); else window.addEventListener('load', initSW);
  checkVersion(true);
})();
