/* ===================== 10 view: home ===================== */
function favs() { return store.get('favs', [], isStrArr).filter(function (id) { return !!byId(id); }); }
function isFav(id) { return favs().indexOf(id) >= 0; }
function toggleFav(id) { var f = favs(), i = f.indexOf(id); if (i >= 0) f.splice(i, 1); else f.unshift(id); store.set('favs', f.slice(0, 30)); return i < 0; }
function recents() { return store.get('recent', [], isStrArr); }
function addRecent(id) { var r = recents().filter(function (x) { return x !== id; }); r.unshift(id); store.set('recent', r.slice(0, 8)); }

var homeState = { q: '', cat: 'All', scroll: 0 };
function cardHtml(c, row, tickedSet) {
  var em = isEmergency(c), tk = tickedSet && tickedSet[c.id];
  return '<a class="card' + (em ? ' em' : '') + (row ? ' row' : '') + '" href="#/c/' + esc(c.id) + '">' +
    '<span class="txt"><span class="name">' + esc(c.name) + '</span><small>' + esc(c.category) + (tk ? ' · <span class="tk">✓ ' + tk + ' ticked</span>' : '') + '</small></span>' +
    (row && em ? '<span class="badge em">Emergency</span>' : '') + '</a>';
}
function toolCardHtml(t) {
  return '<a class="card row tool" href="#/tools/' + esc(t.slug) + '"><span class="txt"><span class="name">' + esc(t.name) + '</span><small>Quick tool</small></span><span class="badge">Tool</span></a>';
}
function listHtml(list, tickedSet) { return '<div class="list">' + list.map(function (c) { return cardHtml(c, true, tickedSet); }).join('') + '</div>'; }
function tickedMap() {
  var m = {};
  conditionsWithTicks().forEach(function (c) { m[c.id] = ticksSummary(c, loadTicks(c)).n; });
  return m;
}
function newPatientHtml() {
  var withT = conditionsWithTicks(), oldest = 0, n = 0;
  withT.forEach(function (c) { var s = ticksSummary(c, loadTicks(c)); n += s.n; if (!oldest || s.oldest < oldest) oldest = s.oldest; });
  return '<div class="newpt" id="newpt"><div class="newpt-txt">' +
    (n ? '<b>' + n + ' ticked step' + (n === 1 ? '' : 's') + '</b> in ' + withT.length + ' condition' + (withT.length === 1 ? '' : 's') + ' (oldest ' + ago(now() - oldest) + '). Ticks clear automatically after 12 h.'
      : 'No ticked steps saved. Ticks clear automatically after 12 h.') +
    '</div><button type="button" class="abtn danger-o" data-act="newpatient"' + (n ? '' : ' disabled') + '>New patient: clear all ticks</button></div>';
}
function renderHome() {
  var cats = ['All'].concat(CATEGORIES);
  setTitle('ICU QuickRef');
  app.innerHTML =
    '<h1 class="sr" id="view-h" tabindex="-1">ICU QuickRef: home</h1>' +
    '<label class="sr" for="q">Search conditions and quick tools</label>' +
    '<input id="q" class="search" type="search" inputmode="search" enterkeyhint="go" placeholder="Search: PE, DKA, afib, K…" autocomplete="off" autocapitalize="off" spellcheck="false" value="' + esc(homeState.q) + '">' +
    '<div class="chips" id="chips" role="group" aria-label="Filter by category">' + cats.map(function (c) {
      var on = c === homeState.cat;
      return '<button type="button" class="chip' + (on ? ' active' : '') + '" data-cat="' + esc(c) + '" aria-pressed="' + on + '">' + esc(c) + '</button>';
    }).join('') + '</div>' +
    '<div id="homeBody"></div>' +
    newPatientHtml() +
    '<p class="foot"><b>Reference aid only.</b> Not a substitute for provider orders, facility protocol, or clinical judgment. ' + esc(META.status) + '.' + (META.scope ? ' ' + esc(META.scope) : '') + '</p>' +
    freshnessHtml() +
    '<p class="foot-links"><a href="#/about">About, disclaimer &amp; reset</a></p>';
  renderHomeBody();
  var q = $('#q');
  q.addEventListener('input', function () { homeState.q = q.value; renderHomeBody(); });
  q.addEventListener('keydown', function (e) {
    if (e.key === 'Enter') { var first = $('#homeBody .card'); if (first) { e.preventDefault(); location.hash = first.getAttribute('href'); } }
  });
}
function suggestFor(qn) {
  var out = [];
  Object.keys(ALIAS).forEach(function (k) { if (k.length >= 3 && lev(qn, k, 2) <= 2) out.push(k); });
  return out.slice(0, 4);
}
function renderHomeBody() {
  var el = $('#homeBody'); if (!el) return;
  var q = homeState.q.trim(), cat = homeState.cat, h = '', tm = tickedMap();
  if (q) {
    var res = search(q, cat);
    h = '<h2 class="sect-h" id="res-h" aria-live="polite">' + res.length + ' result' + (res.length === 1 ? '' : 's') + (cat !== 'All' ? ' in ' + esc(cat) : '') + '</h2>';
    if (res.length) h += '<div class="list">' + res.map(function (e) { return e.type === 'tool' ? toolCardHtml(e.ref) : cardHtml(e.ref, true, tm); }).join('') + '</div>';
    else {
      var sg = suggestFor(normText(q));
      h += '<div class="empty">No match for “' + esc(q) + '”.' + (cat !== 'All' ? ' (Filtered to ' + esc(cat) + ': try All.)' : '') +
        '<br>' + (sg.length ? 'Did you mean: ' + sg.map(esc).join(', ') + '?' : 'Try: VT, tachycardia, shock, K, sepsis, vent.') + '</div>';
    }
  } else if (cat !== 'All') {
    h = '<h2 class="sect-h">' + esc(cat) + '</h2>' + listHtml(CONDITIONS.filter(function (c) { return c.category === cat; }), tm);
  } else {
    h += '<h2 class="sect-h em">Emergency</h2><div class="grid2">' + emergencyList().map(function (c) { return cardHtml(c, false, tm); }).join('') + '</div>';
    var fv = favs().map(byId).filter(Boolean);
    h += '<h2 class="sect-h">★ Pinned</h2>' + (fv.length ? listHtml(fv, tm) : '<div class="tip">Tap ★ Pin on any condition to keep it here.</div>');
    var rc = recents().map(byId).filter(Boolean).slice(0, 5);
    if (rc.length) h += '<h2 class="sect-h">Recently viewed</h2>' + listHtml(rc, tm);
    var all = CONDITIONS.slice().sort(function (a, b) { return a.name.localeCompare(b.name); });
    h += '<h2 class="sect-h">All conditions (' + all.length + ')</h2>' + listHtml(all, tm);
    h += installTip();
  }
  el.innerHTML = h;
}
var deferredPrompt = null;
window.addEventListener('beforeinstallprompt', function (e) { e.preventDefault(); deferredPrompt = e; });
function isIOS() { return /iphone|ipad|ipod/i.test(navigator.userAgent) || (/Macintosh/.test(navigator.userAgent) && navigator.maxTouchPoints > 1); }
function isStandalone() { return window.navigator.standalone === true || (window.matchMedia && matchMedia('(display-mode: standalone)').matches); }
function installTip() {
  if (isStandalone() || store.get('tipHidden', false, function (v) { return typeof v === 'boolean'; })) return '';
  return '<div class="tip" id="installTip"><span>' + (isIOS() ? 'Install (Safari only): tap <b>Share</b> → <b>Add to Home Screen</b>. Without installing, iOS may delete the offline copy after 7 days unused.' : 'Install for offline use: browser menu → <b>Install app</b> / <b>Add to Home screen</b>.') +
    '</span><button type="button" data-act="hidetip" aria-label="Dismiss install tip"><span aria-hidden="true">✕</span></button></div>';
}
