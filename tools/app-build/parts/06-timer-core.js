/* ===================== 06 code timer: state, audio, wake lock ===================== */
function newTimer() { return { v: 2, run: false, start: 0, stop: 0, epi: [], shock: [], log: [] }; }
function isNumArr(v) { return Array.isArray(v) && v.every(isNum); }
function isTimer(v) {
  return isObj(v) && v.v === 2 && typeof v.run === 'boolean' && isNum(v.start) && isNum(v.stop) &&
    isNumArr(v.epi) && isNumArr(v.shock) && Array.isArray(v.log) &&
    v.log.every(function (l) { return isObj(l) && isNum(l.ts) && typeof l.txt === 'string'; }) &&
    (!v.run || v.start > 0);
}
var timer = store.get('timer', null, isTimer) || newTimer();
function saveTimer() { store.set('timer', timer); }
function hasCode() { return timer.start > 0; }
function refTime() { return timer.run ? now() : (timer.stop || now()); }      // frozen at stop
function elapsedMs() { return hasCode() ? Math.max(0, refTime() - timer.start) : 0; }
function logEv(txt) { timer.log.unshift({ ts: now(), txt: txt }); timer.log = timer.log.slice(0, 80); }
function lastEvent() {
  var e = timer.epi.length ? timer.epi[timer.epi.length - 1] : 0, s = timer.shock.length ? timer.shock[timer.shock.length - 1] : 0;
  if (!e && !s) return null;
  return e >= s ? { kind: 'epi', ts: e, label: 'Epinephrine #' + timer.epi.length } : { kind: 'shock', ts: s, label: 'Shock #' + timer.shock.length };
}
/* On load: discard an old stopped log; a timer running > 2 h is handled by a prompt (see init). */
if (!timer.run && timer.stop && now() - timer.stop > TIMER_LOG_TTL) { timer = newTimer(); saveTimer(); }

/* ---- double-tap protection ---- */
var lastTimerTap = 0, lastStartTap = 0;
function timerTapOK(kind) {
  var t = now();
  if (t - lastTimerTap < TAP_LOCK_MS) return false;
  if ((kind === 'epi' || kind === 'shock') && t - lastStartTap < 1500) return false;   // tap that "fell through" Start
  lastTimerTap = t;
  if (kind === 'start') lastStartTap = t;
  return true;
}

/* ---- audio (created/resumed on user gestures and when the page becomes visible) ---- */
var audioCtx = null;
function getAudio() {
  try { if (!audioCtx) { var AC = window.AudioContext || window.webkitAudioContext; if (AC) audioCtx = new AC(); } } catch (e) { audioCtx = null; }
  return audioCtx;
}
function unlockAudio() {
  var c = getAudio();
  try { if (c && c.state !== 'running' && c.resume) c.resume().catch(function () {}); } catch (e) {}
}
function audioBlocked() { return !audioCtx || audioCtx.state !== 'running'; }
['pointerdown', 'touchend', 'keydown', 'click'].forEach(function (ev) { document.addEventListener(ev, unlockAudio, { capture: true, passive: true }); });
/* 3-tone pattern (lower first tone), louder than v1. */
function beepPattern() {
  var c = getAudio(); if (!c) return;
  try {
    if (c.state !== 'running' && c.resume) c.resume().catch(function () {});
    var t0 = c.currentTime + 0.02;
    [[660, 0], [880, 0.26], [880, 0.52]].forEach(function (p) {
      var o = c.createOscillator(), g = c.createGain();
      o.type = 'square'; o.frequency.value = p[0];
      g.gain.setValueAtTime(0.0001, t0 + p[1]);
      g.gain.exponentialRampToValueAtTime(0.6, t0 + p[1] + 0.02);
      g.gain.setValueAtTime(0.6, t0 + p[1] + 0.18);
      g.gain.exponentialRampToValueAtTime(0.0001, t0 + p[1] + 0.22);
      o.connect(g); g.connect(c.destination);
      o.start(t0 + p[1]); o.stop(t0 + p[1] + 0.24);
    });
  } catch (e) {}
}
/* Vibrate only after a user gesture on this page (otherwise Chrome blocks it and logs an error). */
function vibrate(p) {
  try {
    var ua = navigator.userActivation;
    if (navigator.vibrate && (!ua || ua.hasBeenActive)) navigator.vibrate(p);
  } catch (e) {}
}

/* ---- wake lock (re-acquired when the page becomes visible again) ---- */
var wake = null, wantWake = false;
function setWake(on) {
  wantWake = !!on;
  try {
    if (on && navigator.wakeLock && document.visibilityState === 'visible' && !wake) {
      navigator.wakeLock.request('screen').then(function (w) {
        wake = w;
        try { w.addEventListener('release', function () { wake = null; }); } catch (e) {}
        if (!wantWake) { w.release().catch(function () {}); wake = null; }
      }).catch(function () {});
    } else if (!on && wake) { wake.release().catch(function () {}); wake = null; }
  } catch (e) {}
}
