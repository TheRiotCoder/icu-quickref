/* ===================== 07 code timer: UI, loop, rhythm-check alert ===================== */
var tickHandle = null, lastCycle = -1, alertState = null, lastLogKey = '', lastBtnState = '';
function timerState() { return timer.run ? 'run' : (hasCode() ? 'stopped' : 'idle'); }
function timerWidgetHtml(where) {
  return '<section class="tcard timer" id="' + (where === 'cond' ? 'code-dock' : 'tool-timer') + '" aria-labelledby="timer-h">' +
    '<h2 id="timer-h"' + (where === 'tools' ? ' tabindex="-1"' : '') + '>Code timer</h2>' +
    '<div class="timer-big" id="t-big">00:00</div>' +
    '<div class="timer-sub" id="t-cyc"></div>' +
    '<div class="timer-warn" id="t-stale" role="status" hidden></div>' +
    '<div class="timer-sub sm" id="t-epi"></div><div class="timer-sub sm" id="t-shock"></div>' +
    '<div id="t-btns"></div>' +
    '<div class="tlog" id="t-log" role="log" aria-label="Code log, newest first"></div>' +
    '<p class="note">Alerts every 2 min (3 beeps + vibration + flashing banner) until acknowledged. Turn the ringer/silent switch ON and keep this app in the foreground; the screen is kept awake while running where supported. Not a record of the code: document per policy.</p>' +
    '</section>';
}
function timerButtonsHtml() {
  var st = timerState(), le = lastEvent();
  if (st === 'idle') return '<div class="tbtns one"><button type="button" class="abtn go big" data-act="tstart">▶ Start code timer</button></div>';
  if (st === 'run') {
    return '<div class="tbtns"><button type="button" class="abtn big" data-act="tepi">Epinephrine given</button><button type="button" class="abtn big" data-act="tshock">Shock given</button></div>' +
      (le ? '<div class="tbtns one"><button type="button" class="abtn sm" data-act="tundo">↩ Undo last: ' + esc(le.label) + ' (' + clock(le.ts) + ')</button></div>' : '') +
      '<div class="tbtns one sep"><button type="button" class="abtn danger-o" data-act="tend">■ End code…</button></div>';
  }
  return '<div class="tbtns"><button type="button" class="abtn go" data-act="tresume">▶ Resume code</button><button type="button" class="abtn" data-act="tnew">New code…</button></div>' +
    '<div class="tbtns one sep"><button type="button" class="abtn danger-o" data-act="tclear">Clear log…</button></div>';
}
function renderTimerButtons(force) {
  var el = $('#t-btns'); if (!el) return;
  var le = lastEvent(), key = timerState() + '|' + (le ? le.label + le.ts : '');
  if (!force && key === lastBtnState && el.firstChild) return;
  lastBtnState = key; el.innerHTML = timerButtonsHtml();
}
function updateTimerUI() {
  var e = elapsedMs() / 1000, chip = $('#timerchip'), rem = CYCLE - (e % CYCLE);
  document.documentElement.classList.toggle('timing', timer.run);
  var qs = $('#qstart .go'); if (qs) qs.hidden = hasCode();
  if (chip) {
    chip.hidden = !timer.run;
    if (timer.run) {
      chip.textContent = (elapsedMs() > TIMER_STALE_WARN ? '⚠ ' : '⏱ ') + fmt(e) + ' · ' + fmt(rem);
      chip.setAttribute('aria-label', 'Code timer running ' + fmt(e) + ', next rhythm check in ' + fmt(rem) + '. Open timer.');
    }
  }
  var big = $('#t-big'); if (!big) return;
  big.textContent = fmt(e);
  var sub = $('#t-cyc');
  if (timer.run) {
    sub.textContent = rem <= 10 ? 'RHYTHM CHECK in ' + Math.ceil(rem) + ' s' : 'Next rhythm check in ' + fmt(rem);
    sub.className = 'timer-sub' + (rem <= 10 ? ' soon' : '');
  } else { sub.textContent = hasCode() ? 'Ended ' + clock(timer.stop) + ' (' + ago(now() - timer.stop) + ')' : 'Ready'; sub.className = 'timer-sub'; }
  var stale = $('#t-stale');
  if (stale) {
    var isStale = timer.run && elapsedMs() > TIMER_STALE_WARN;
    stale.hidden = !isStale;
    if (isStale) stale.textContent = '⚠ Running for ' + dur(elapsedMs()) + ' (started ' + dateTime(timer.start) + '). If this code is over, tap End code.';
  }
  var epi = $('#t-epi');
  if (timer.epi.length) {
    var since = (refTime() - timer.epi[timer.epi.length - 1]) / 1000;
    epi.textContent = 'Epinephrine ×' + timer.epi.length + ' · last ' + fmt(since) + ' ago' + (timer.run ? (since >= 300 ? ' (over 5 min)' : since >= 180 ? ' (3–5 min: due per protocol)' : '') : '');
    epi.className = 'timer-sub sm' + (timer.run && since >= 300 ? ' t-red' : timer.run && since >= 180 ? ' t-amber' : '');
  } else { epi.textContent = 'Epinephrine: none logged'; epi.className = 'timer-sub sm'; }
  var sh = timer.shock.length;
  $('#t-shock').textContent = 'Shocks: ' + sh + (sh ? ' · last ' + fmt((refTime() - timer.shock[sh - 1]) / 1000) + ' ago' : '');
  var lk = timer.log.length + '|' + (timer.log[0] ? timer.log[0].ts + timer.log[0].txt : '');
  var lg = $('#t-log');
  if (lg && (lk !== lastLogKey || !lg.firstChild)) {
    lastLogKey = lk;
    lg.innerHTML = timer.log.map(function (l) { return '<div><b>' + (hasCode() ? fmt((l.ts - timer.start) / 1000) : '') + '</b> <span class="muted">' + clock(l.ts) + '</span> ' + esc(l.txt) + '</div>'; }).join('');
  }
  renderTimerButtons(false);
}
function loop() {
  if (timer.run) {
    var cyc = Math.floor(elapsedMs() / 1000 / CYCLE);
    if (lastCycle < 0) lastCycle = cyc;
    if (cyc > lastCycle) { var missed = cyc - lastCycle; lastCycle = cyc; fireRhythmAlert(cyc, missed); }
  }
  if (alertState && now() >= alertState.next) {
    if (alertState.count >= ALERT_MAX_REPEATS) ackAlert(true);
    else { alertState.count++; alertState.next = now() + ALERT_REPEAT_MS; beepPattern(); vibrate([400, 150, 400, 150, 400]); updateAlertBar(); }
  }
  updateTimerUI();
}
function startLoop() { if (!tickHandle) tickHandle = setInterval(loop, 250); loop(); }
function stopLoopIfIdle() { if (!timer.run && !alertState && tickHandle) { clearInterval(tickHandle); tickHandle = null; } updateTimerUI(); }
function fireRhythmAlert(cyc, missed) {
  alertState = { cyc: cyc, at: now(), count: 1, next: now() + ALERT_REPEAT_MS, missed: missed > 1 };
  beepPattern(); vibrate([400, 150, 400, 150, 400]);
  updateAlertBar();
  announce('Rhythm and pulse check now. Switch compressor.');
}
function updateAlertBar() {
  var bar = $('#alertbar'); if (!bar) return;
  if (!alertState) { bar.hidden = true; bar.innerHTML = ''; document.documentElement.classList.remove('alerting'); layoutVars(); return; }
  var due = fmt(alertState.cyc * CYCLE);
  bar.hidden = false;
  document.documentElement.classList.add('alerting');
  bar.innerHTML = '<button type="button" class="alertbtn" data-act="ackalert"><span class="ab-main">⚠ RHYTHM / PULSE CHECK NOW: switch compressor</span>' +
    '<span class="ab-sub">Due at ' + due + (alertState.missed ? ' (an earlier check was missed while the app was in the background)' : '') + ' · tap to acknowledge' + (audioBlocked() ? ' · sound blocked: tap anywhere to enable' : '') + '</span></button>';
  layoutVars();
}
function ackAlert(auto) { if (!alertState) return; alertState = null; updateAlertBar(); if (!auto) announce('Rhythm check acknowledged'); stopLoopIfIdle(); }

/* ---- timer actions ---- */
function scrollToDock() { var d = $('#code-dock') || $('#tool-timer'); if (d) { d.scrollIntoView({ behavior: scrollBehavior(), block: 'start' }); focusEl(d.querySelector('h2')); } }
function timerAction(act) {
  if (act === 'ackalert') { ackAlert(false); return; }
  if (act === 'gotimer') { scrollToDock(); return; }
  if (act === 'tstartgo') { if (!timer.run && !hasCode() && timerTapOK('start')) beginCode(); else if (!timer.run && hasCode()) toast('A previous code log exists: Resume or New code below', 4000); scrollToDock(); updateTimerUI(); return; }
  if (!timerTapOK(act.slice(1))) return;
  if (act === 'tstart') { if (timer.run || hasCode()) return; beginCode(); }
  else if (act === 'tresume') {
    if (timer.run || !hasCode()) return;
    timer.run = true; timer.stop = 0; logEv('Resumed'); lastCycle = Math.floor(elapsedMs() / 1000 / CYCLE);
    saveTimer(); setWake(true); startLoop(); toast('Code timer resumed');
  } else if (act === 'tend') {
    if (!timer.run) return;
    confirmModal('End the code timer at ' + fmt(elapsedMs() / 1000) + '?\nThe log (epinephrine ×' + timer.epi.length + ', shocks ×' + timer.shock.length + ') is kept until you clear it.', 'End code', true).then(function (ok) {
      if (!ok || !timer.run) return;
      timer.run = false; timer.stop = now(); logEv('Code ended'); saveTimer(); setWake(false); ackAlert(true); stopLoopIfIdle(); renderTimerButtons(true); toast('Code timer ended');
    });
  } else if (act === 'tnew') {
    confirmModal('Start a NEW code?\nThis permanently clears the current log (epinephrine ×' + timer.epi.length + ', shocks ×' + timer.shock.length + ').', 'Clear & start new', true).then(function (ok) { if (ok) { timer = newTimer(); beginCode(); } });
  } else if (act === 'tclear') {
    confirmModal('Clear the code log?\nEpinephrine ×' + timer.epi.length + ', shocks ×' + timer.shock.length + ' and all times will be deleted from this device.', 'Clear log', true).then(function (ok) {
      if (!ok) return; timer = newTimer(); saveTimer(); setWake(false); ackAlert(true); lastCycle = -1; stopLoopIfIdle(); renderTimerButtons(true); toast('Code log cleared');
    });
  } else if (act === 'tepi' || act === 'tshock') {
    if (!timer.run) { toast('Start the code timer first'); return; }
    var list = act === 'tepi' ? timer.epi : timer.shock, last = list[list.length - 1];
    if (last && now() - last < SAME_EVENT_LOCK_MS) { toast('Duplicate tap ignored'); return; }
    list.push(now());
    var label = (act === 'tepi' ? 'Epinephrine #' : 'Shock #') + list.length;
    logEv(label); saveTimer(); vibrate(40); updateTimerUI(); toast(label + ' logged at ' + fmt(elapsedMs() / 1000) + ' (Undo below)');
  } else if (act === 'tundo') {
    var le = lastEvent(); if (!le || !timer.run) return;
    (le.kind === 'epi' ? timer.epi : timer.shock).pop();
    logEv('Removed ' + le.label + ' (undo)'); saveTimer(); updateTimerUI(); toast('Removed ' + le.label);
  }
  updateTimerUI();
}
function beginCode() {
  unlockAudio();
  timer = newTimer(); timer.run = true; timer.start = now(); logEv('Code started');
  lastCycle = 0; saveTimer(); setWake(true); startLoop(); renderTimerButtons(true);
  toast('Code timer started' + (audioBlocked() ? '' : ''));
}
