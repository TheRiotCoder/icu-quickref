/* ===================== 13 router, navigation, focus ===================== */
function setTitle(t) { document.title = t; }
var curView = '', firstRoute = true;
function safe(where, fn) {
  try { fn(); return true; } catch (e) { noteError(where, e); try { renderRecovery(e); } catch (e2) {} return false; }
}
function histState() { return isObj(history.state) ? history.state : null; }
function markHistory() {
  try {
    var s = histState();
    if (!s || !s.icuqr) history.replaceState({ icuqr: 1, n: firstRoute ? 0 : (markHistory.n || 0) + 1 }, '');
    markHistory.n = histState() ? histState().n : 0;
  } catch (e) {}
}
function route() {
  var h = location.hash || '#/', m;
  if (curView === 'home') homeState.scroll = window.scrollY;
  markHistory();
  curCond = null;
  $('#actionbar').hidden = true; $('#actionbar').innerHTML = ''; $('#tabbar').hidden = false;
  var tab = 'home', sub = '';
  if (!DATA_OK) { curView = 'recovery'; renderRecovery(new Error('Content not loaded')); }
  else if ((m = h.match(/^#\/c\/([\w-]+)/))) { tab = ''; curView = 'cond'; safe('condition ' + m[1], function () { renderCondition(m[1]); }); }
  else if ((m = h.match(/^#\/tools(?:\/([\w-]+))?/))) { tab = 'tools'; curView = 'tools'; sub = m[1] || ''; safe('tools', function () { renderTools(sub); }); }
  else if (h.indexOf('#/about') === 0) { tab = 'about'; curView = 'about'; safe('about', renderAbout); }
  else { curView = 'home'; safe('home', renderHome); }
  $$('.tabbar a').forEach(function (a) {
    if (a.getAttribute('data-tab') === tab) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    a.classList.toggle('active', a.getAttribute('data-tab') === tab);
  });
  layoutVars();
  var target = null;
  if (curView === 'tools' && sub) {
    target = $('#tool-' + sub);
    if (target && target.tagName === 'DETAILS') target.open = true;
  }
  if (target) { target.scrollIntoView({ block: 'start', behavior: 'auto' }); var f = target.querySelector('summary, h2'); focusEl(f); }
  else {
    window.scrollTo(0, curView === 'home' ? (homeState.scroll || 0) : 0);
    if (!firstRoute || curView !== 'home') focusEl($('#view-h'));
  }
  firstRoute = false;
}
function focusEl(el) { if (!el) return; try { if (!el.hasAttribute('tabindex') && !/^(SUMMARY|BUTTON|A|INPUT)$/.test(el.tagName)) el.setAttribute('tabindex', '-1'); el.focus({ preventScroll: true }); } catch (e) {} }
function goBack() {
  var s = histState();
  if (s && s.icuqr && s.n > 0) history.back(); else location.replace('#/');
}
window.addEventListener('hashchange', route);
