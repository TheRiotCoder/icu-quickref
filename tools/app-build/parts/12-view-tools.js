/* ===================== 12 views: tools, about, recovery ===================== */
function table(rows) {
  return '<table class="kv">' + rows.map(function (r) {
    return '<tr>' + r.map(function (c, i) { return i === 0 ? '<th scope="row">' + esc(c) + '</th>' : '<td>' + esc(c) + '</td>'; }).join('') + '</tr>';
  }).join('') + '</table>';
}
var gcs = { e: 0, v: 0, m: 0 };
function gcsHtml() {
  var G = gcsGroups(); if (!G.length) return '<p class="note">GCS data not available.</p>';
  return G.map(function (g) {
    return '<fieldset class="seg"><legend>' + esc(g.name) + '</legend><div class="opts">' + g.items.map(function (it) {
      var lab = (g.key === 'v' && it.v === 'T') ? 'T' : String(it.v);
      return '<button type="button" class="opt" data-gcs="' + g.key + '" data-v="' + esc(String(it.v)) + '" aria-pressed="false"><b>' + esc(lab) + '</b><span>' + esc(it.t) + '</span></button>';
    }).join('') + '</div></fieldset>';
  }).join('') + '<div class="gcs-total" id="gcs-total" aria-live="polite"></div>' +
    (isObj(TOOLS.gcs) && TOOLS.gcs.note ? '<p class="note">' + esc(TOOLS.gcs.note) + '</p>' : '') +
    '<button type="button" class="abtn wide" data-act="gcsreset">Clear GCS</button>';
}
function gcsText() {
  if (!gcs.e || !gcs.v || !gcs.m) return { t: 'Select E, V and M', sev: false };
  if (gcs.v === 'T') { var s = gcs.e + gcs.m; return { t: 'E' + gcs.e + ' VT M' + gcs.m + ' = ' + s + 'T', sub: 'Intubated: verbal not testable', sev: s <= 6 }; }
  var tot = gcs.e + gcs.v + gcs.m;
  return { t: 'E' + gcs.e + ' V' + gcs.v + ' M' + gcs.m + ' = ' + tot, sub: tot <= 8 ? 'SEVERE (≤8)' : tot <= 12 ? 'Moderate (9–12)' : 'Mild (13–15)', sev: tot <= 8 };
}
function gcsUpdate() {
  var el = $('#gcs-total'); if (!el) return;
  var r = gcsText();
  el.innerHTML = '<span>' + esc(r.t) + '</span>' + (r.sub ? '<small>' + esc(r.sub) + '</small>' : '');
  el.classList.toggle('sev', !!r.sev);
  $$('[data-gcs]').forEach(function (b) {
    var k = b.getAttribute('data-gcs'), v = b.getAttribute('data-v'), on = String(gcs[k]) === v;
    b.classList.toggle('sel', on); b.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
}
function toolSec(slug, title, body, open) {
  return '<details class="sec" id="tool-' + esc(slug) + '"' + (open ? ' open' : '') + '><summary><h2>' + esc(title) + '</h2></summary><div class="body">' + body + '</div></details>';
}
function renderTools(sub) {
  setTitle((sub && sub !== 'timer' && toolBySlug(sub) ? toolBySlug(sub).name + ' · ' : '') + 'Quick tools · ICU QuickRef');
  var T = TOOLS, h = '<h1 id="view-h" tabindex="-1" class="vh">Quick tools</h1>' + timerWidgetHtml('tools');
  h += toolSec('gcs', 'GCS calculator', gcsHtml(), true);
  if (isObj(T.rass)) h += toolSec('rass', str(T.rass.title) || 'RASS', table(tableRows(T.rass).map(function (r) { return [r[0], r[1] + (r[2] ? ': ' + r[2] : '')]; })) + (T.rass.note ? '<p class="note">' + esc(T.rass.note) + '</p>' : ''));
  if (isObj(T.vitals)) h += toolSec('vitals', str(T.vitals.title) || 'Vitals', table(tableRows(T.vitals)));
  if (isObj(T.labs)) h += toolSec('labs', str(T.labs.title) || 'Labs', table(tableRows(T.labs)));
  TOOL_ENTRIES.forEach(function (t, i) {
    if (!/^tool:/.test(t.id) || ['timer', 'gcs', 'rass', 'vitals', 'labs'].indexOf(t.slug) >= 0) return;
    var r = arr(T.reminders).filter(function (x) { return isObj(x) && str(x.title) === t.name; })[0];
    if (r) h += toolSec(t.slug, t.name, '<div class="lines">' + arr(r.lines).map(function (l) { return '<p>' + esc(str(l)) + '</p>'; }).join('') + '</div>', i < 7);
  });
  h += '<p class="foot"><b>Reference aid only.</b> Ranges are approximate adult values. Use your lab/facility ranges.</p>';
  app.innerHTML = h;
  lastBtnState = ''; lastLogKey = '';
  gcsUpdate(); updateTimerUI();
}
function telLinks(s) {
  return esc(s).replace(/(\+?\d[\d ().-]{4,}\d)/g, function (m) { return '<a href="tel:' + m.replace(/[^\d+]/g, '') + '">' + m + '</a>'; });
}
function renderAbout() {
  setTitle('About · ICU QuickRef');
  var le = store.get('lastError', null, function (v) { return isObj(v) && isNum(v.ts) && typeof v.msg === 'string'; });
  var r = remote();
  app.innerHTML = '<div class="about">' +
    '<h1 id="view-h" tabindex="-1">About ICU QuickRef</h1>' +
    '<div class="discl">REFERENCE AID ONLY. This app is not a substitute for provider orders, facility protocol/policy, manufacturer instructions, or clinical judgment. It is not a diagnostic tool and contains no patient-specific dosing. Drug doses shown are general published adult ranges and must be verified against your facility protocol and the active order before administration. Content must be reviewed and approved by your clinical educator / medical director before use in practice.</div>' +
    (META.scope ? '<p><b>Scope:</b> ' + esc(META.scope) + '</p>' : '') + (META.disclaimer ? '<p>' + esc(META.disclaimer) + '</p>' : '') +
    '<h2>Scope tags</h2>' + scopeLegendHtml() +
    '<h2>Version &amp; freshness</h2>' + freshnessHtml() +
    '<table class="kv">' +
    '<tr><th scope="row">Content version</th><td>' + esc(META.version) + '</td></tr>' +
    '<tr><th scope="row">Content date</th><td>' + esc(META.date || '—') + '</td></tr>' +
    '<tr><th scope="row">Review status</th><td>' + esc(META.status) + '</td></tr>' +
    '<tr><th scope="row">Reviewed by</th><td>' + esc(META.reviewedBy || '— (not yet reviewed)') + '</td></tr>' +
    (META.expires ? '<tr><th scope="row">Content expires</th><td>' + esc(META.expires) + (contentExpired() ? ' (EXPIRED)' : '') + '</td></tr>' : '') +
    '<tr><th scope="row">Latest online</th><td>' + (r ? 'v' + esc(r.version) + (r.date ? ' (' + esc(r.date) + ')' : '') + (r.withdrawn ? ' · WITHDRAWN' : '') : 'not checked yet') + '</td></tr>' +
    '<tr><th scope="row">Conditions</th><td>' + CONDITIONS.length + '</td></tr>' +
    '<tr><th scope="row">Offline</th><td id="offstate">checking…</td></tr></table>' +
    (META.facilityNote ? '<h2>Facility contacts</h2><p>' + telLinks(META.facilityNote) + '</p>' : '') +
    '<h2>Guidance this content is based on</h2><ul>' + arr(RAW.sources).map(function (s) { return '<li>' + esc(str(s)) + '</li>'; }).join('') + '</ul><p class="note">Guidelines are updated regularly. Your reviewer must confirm current editions and local practice.</p>' +
    '<h2>Install</h2><p><b>iPhone (Safari only):</b> Share → Add to Home Screen. A Home Screen app keeps its own storage, separate from the Safari tab.<br><b>Android (Chrome):</b> ⋮ menu → Install app / Add to Home screen.</p>' +
    '<div class="btnrow"><button type="button" class="abtn" data-act="install">Install app</button><button type="button" class="abtn" data-act="update">Check for update</button></div>' +
    '<h2>Patient-session data</h2><p class="note">Checklist ticks clear automatically 12 h after ticking and whenever the content version changes. A stopped code log is discarded after 12 h.</p>' +
    '<div class="btnrow"><button type="button" class="abtn danger-o" data-act="newpatient">New patient: clear all ticks…</button></div>' +
    '<h2 class="danger-h">Troubleshooting</h2><p class="note">If the app misbehaves, Reset app data deletes everything this app stored on this device (ticks, code log, pins, recents, settings). Reference content is not affected.</p>' +
    (le ? '<p class="note">Last error: ' + esc(dateTime(le.ts)) + ' · ' + esc(le.where || '') + ': ' + esc(le.msg) + '</p>' : '') +
    '<div class="btnrow"><button type="button" class="abtn danger" data-act="resetall">Reset app data…</button></div>' +
    '<p class="note">Privacy: no login, no analytics, no third-party requests; the app sends no data (it only fetches its own files and version.json). Everything you store stays on this device. Do not enter patient information.</p>' +
    '</div>';
  offlineStatus(function (t) { var e = $('#offstate'); if (e) e.textContent = t; });
}
function renderRecovery(err) {
  setTitle('Problem · ICU QuickRef');
  try { $('#actionbar').hidden = true; $('#tabbar').hidden = false; } catch (e) {}
  app.innerHTML = '<div class="recovery" role="alert"><h1 id="view-h" tabindex="-1">Something went wrong</h1>' +
    '<p>' + (DATA_OK ? 'This screen could not be displayed, possibly because data saved on this device is damaged.' : 'The reference content (data.js) did not load. Reconnect and reload; use facility protocol meanwhile.') + '</p>' +
    '<p class="note">' + esc(String((err && err.message) || err || '')) + '</p>' +
    '<div class="btnrow"><button type="button" class="abtn primary" data-act="reload">Try again</button><button type="button" class="abtn danger" data-act="resetall">Reset app data…</button></div>' +
    '<p class="note">Reset deletes ticks, code log, pins and settings on this device. Reference content is unaffected.</p>' +
    '<p><a href="#/">Home</a> · <a href="#/about">About</a></p></div>';
}
