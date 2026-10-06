/* ===================== 11 view: condition ===================== */
var curCond = null;
function hasScopes(c) { return [c.actions, c.monitor, c.meds, c.escalate, c.recognize].some(function (l) { return l.some(function (it) { return !!it.s; }); }); }
function scopeBadge(it) {
  if (!it.s) return '';
  var sc = SCOPES[it.s];
  return '<span class="scope s-' + sc.cls + '"><span class="sr">' + esc(sc.sr) + ': </span><span aria-hidden="true">' + esc(sc.label) + '</span></span>';
}
function callPill(it) { return it.call ? '<span class="callpill">CALL</span>' : ''; }
function bullets(list) {
  return '<ul class="bul">' + list.map(function (it) {
    return '<li' + (it.call ? ' class="call"' : '') + '>' + callPill(it) + scopeBadge(it) + esc(it.t) + '</li>';
  }).join('') + '</ul>';
}
function tickAge(ts) { return '✓ ' + clock(ts) + ' · ' + ago(now() - ts); }
function stepsHtml(c, sec, list, rec) {
  return '<ol class="steps">' + list.map(function (it, i) {
    var key = sec + ':' + it.id, ts = rec.ticks[key];
    return '<li><button type="button" class="step' + (it.call ? ' call' : '') + (ts ? ' done' : '') + '" data-step="' + esc(key) + '" aria-pressed="' + (ts ? 'true' : 'false') + '">' +
      '<span class="n" aria-hidden="true">' + (i + 1) + '</span><span class="t"><span class="sr">Step ' + (i + 1) + '. </span>' + callPill(it) + scopeBadge(it) + esc(it.t) +
      '<span class="tage">' + (ts ? esc(tickAge(ts)) : '') + '</span></span></button></li>';
  }).join('') + '</ol>';
}
function statusStrip(c) {
  var draft = isDraft();
  var who = c.reviewer || META.reviewedBy, when = c.reviewed;
  return '<div class="status-strip ' + (draft ? 'draft' : 'ok') + '" role="note">' +
    (draft ? '<b>DRAFT</b> · ' + esc(META.status.split(/\s+[—–]\s+/)[0].toLowerCase()) + ' · v' + esc(META.version) + ' · verify vs orders/protocol'
      : esc(META.status) + (who ? ' · ' + esc(who) : '') + (when ? ' · ' + esc(when) : '') + ' · v' + esc(META.version)) + '</div>';
}
function tickBarHtml(c, rec) {
  var s = ticksSummary(c, rec);
  if (!s.n) return '<div class="tickbar" id="tickbar"><span>Tap a step to tick it. Ticks clear after 12 h.</span></div>';
  return '<div class="tickbar has" id="tickbar"><span><b>' + s.n + ' ticked</b> · oldest ' + clock(s.oldest) + ' (' + ago(now() - s.oldest) + '). Clears after 12 h.</span>' +
    '<span class="tb-btns"><button type="button" class="abtn sm danger-o" data-act="clearticks">Clear ticks…</button><button type="button" class="abtn sm danger-o" data-act="newpatient">New patient…</button></span></div>';
}
function sectionHtml(key, title, body, extra) {
  return '<details class="sec s-' + key + '" id="sec-' + key + '" open><summary><h2>' + title + '</h2>' + (extra || '') + '</summary><div class="body">' + body + '</div></details>';
}
var JUMPS = [['actions', 'Actions', 'Actions'], ['recognize', 'Signs', 'Recognize (signs)'], ['monitor', 'Monitor', 'Monitor'], ['meds', 'Meds', 'Meds'], ['escalate', 'Call', 'Escalate / call if']];
function renderCondition(id) {
  var c = byId(id);
  if (!c) {
    setTitle('Not found · ICU QuickRef');
    app.innerHTML = '<h1 id="view-h" tabindex="-1">Condition not found</h1><div class="empty"><a href="#/">Back to home</a></div>';
    return;
  }
  curCond = c; addRecent(c.id);
  setTitle(c.name + ' · ICU QuickRef');
  var rec = loadTicks(c);
  var verifyLines = c.meds.filter(function (it) { return /^VERIFY/i.test(it.t); }), meds = c.meds.filter(function (it) { return !/^VERIFY/i.test(it.t); });
  var h = '<article class="cond">' + statusStrip(c) +
    '<div class="chead"><h1 id="view-h" tabindex="-1">' + esc(c.name) + '</h1><div class="tags"><span class="badge">' + esc(c.category) + '</span>' + (isEmergency(c) ? '<span class="badge em">Emergency</span>' : '') + '</div></div>';
  if (c.timer) h += '<div class="qstart" id="qstart">' + (timer.run ? '' : '<button type="button" class="abtn go" data-act="tstartgo">▶ Start code timer</button>') + '<button type="button" class="abtn sm" data-act="gotimer">Timer, epi &amp; shock log ↓</button></div>';
  if (c.glance.length) h += '<section class="glance" aria-labelledby="gl-h"><h2 id="gl-h">First things first</h2><ol>' + c.glance.map(function (g) { return '<li>' + callPill(g) + scopeBadge(g) + esc(g.t) + '</li>'; }).join('') + '</ol></section>';
  if (c.warnings.length) h += '<section class="warnbox" aria-labelledby="wb-h"><h2 id="wb-h">⚠ Warnings</h2><ul>' + c.warnings.map(function (w) { return '<li>' + scopeBadge(w) + esc(w.t) + '</li>'; }).join('') + '</ul></section>';
  if (c.timer) h += timerWidgetHtml('cond');
  h += '<nav class="secnav" aria-label="Jump to section">' + JUMPS.map(function (x) { return '<button type="button" data-go="' + x[0] + '" aria-label="Jump to ' + x[2] + '">' + x[1] + '</button>'; }).join('') + '</nav>';
  h += sectionHtml('actions', 'Actions', tickBarHtml(c, rec) + '<p class="vnote">Drug doses and provider-scope steps: only per active order / facility protocol.</p>' +
    (hasScopes(c) ? '<details class="legend"><summary>Scope tags: what RN / Per order / Provider mean</summary>' + scopeLegendHtml() + '</details>' : '') + '<div class="bar" aria-hidden="true"><i id="bar-a"></i></div>' + stepsHtml(c, 'a', c.actions, rec), '<span class="prog" id="prog-a"></span>');
  h += sectionHtml('recognize', 'Recognize (signs)', bullets(c.recognize));
  h += sectionHtml('monitor', 'Monitor / ongoing care', '<div class="bar" aria-hidden="true"><i id="bar-m"></i></div>' + stepsHtml(c, 'm', c.monitor, rec), '<span class="prog" id="prog-m"></span>');
  h += sectionHtml('meds', 'Meds / interventions to anticipate', '<div class="verify">' + esc(META.medNotice || 'Verify per facility protocol / active order. Doses shown are general published adult ranges, not patient-specific.') +
    verifyLines.map(function (v) { return '<span class="vline">' + esc(v.t) + '</span>'; }).join('') + '</div>' + bullets(meds));
  h += sectionHtml('escalate', 'Escalate / call if', bullets(c.escalate));
  h += '<p class="foot"><b>Reference aid only.</b> Not a substitute for provider orders, facility protocol, or clinical judgment. ' + esc(META.status) + ' · v' + esc(META.version) + (META.date ? ' · ' + esc(META.date) : '') + '</p>' +
    '<p class="foot-links"><a href="#/about">About &amp; disclaimer</a></p></article>';
  app.innerHTML = h;
  updateProgress(c, rec);
  renderActionBar(c);
  if (c.timer) { lastBtnState = ''; lastLogKey = ''; updateTimerUI(); }
}
function updateProgress(c, rec) {
  [['a', c.actions], ['m', c.monitor]].forEach(function (p) {
    var n = p[1].filter(function (it) { return rec.ticks[p[0] + ':' + it.id]; }).length, t = p[1].length;
    var pr = $('#prog-' + p[0]), br = $('#bar-' + p[0]);
    if (pr) { pr.textContent = n + '/' + t; pr.setAttribute('aria-label', n + ' of ' + t + ' done'); }
    if (br) br.style.width = (t ? 100 * n / t : 0) + '%';
  });
}
/* Refresh tick ages / tickbar without re-rendering the page (keeps scroll and focus). */
function refreshTicks(c) {
  var rec = loadTicks(c);
  $$('.step[data-step]').forEach(function (b) {
    var ts = rec.ticks[b.getAttribute('data-step')];
    b.classList.toggle('done', !!ts); b.setAttribute('aria-pressed', ts ? 'true' : 'false');
    var a = b.querySelector('.tage'); if (a) a.textContent = ts ? tickAge(ts) : '';
  });
  var tb = $('#tickbar'); if (tb) tb.outerHTML = tickBarHtml(c, rec);
  updateProgress(c, rec);
}
function renderActionBar(c) {
  var ab = $('#actionbar'), on = isFav(c.id);
  ab.hidden = false; $('#tabbar').hidden = true;
  ab.innerHTML =
    '<button type="button" class="abtn" data-act="back"><span aria-hidden="true">←</span> Back</button>' +
    '<button type="button" class="abtn' + (on ? ' on' : '') + '" data-act="fav" aria-pressed="' + on + '"><span aria-hidden="true">' + (on ? '★' : '☆') + '</span> ' + (on ? 'Pinned' : 'Pin') + '</button>' +
    '<button type="button" class="abtn" data-act="top"><span aria-hidden="true">↑</span> Top</button>';
  ab.setAttribute('data-id', c.id);
  layoutVars();
}
