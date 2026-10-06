/* ===================== 08 UI helpers: toast, live region, modal, layout, theme ===================== */
var toastT;
function toast(msg, ms) {
  var t = $('#toast'); if (!t) return;
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastT); toastT = setTimeout(function () { t.classList.remove('show'); }, ms || 2600);
}
function announce(msg) { var l = $('#srlive'); if (!l) return; l.textContent = ''; setTimeout(function () { l.textContent = msg; }, 30); }

/* Accessible confirm dialog (replaces window.confirm). Resolves true/false. */
var modalResolve = null, modalReturn = null;
function confirmModal(msg, okLabel, danger) {
  var m = $('#modal');
  if (!m) return Promise.resolve(window.confirm(msg));
  if (modalResolve) closeModal(false);
  $('#modal-msg').innerHTML = String(msg).split('\n').map(function (p) { return '<span class="mline">' + esc(p) + '</span>'; }).join('');
  var ok = $('#modal-ok'); ok.textContent = okLabel || 'OK'; ok.className = 'abtn ' + (danger ? 'danger' : 'primary');
  modalReturn = document.activeElement;
  m.hidden = false; document.documentElement.classList.add('modal-open');
  setTimeout(function () { $('#modal-cancel').focus(); }, 0);
  return new Promise(function (res) { modalResolve = res; });
}
function closeModal(val) {
  var m = $('#modal'); if (m) m.hidden = true;
  document.documentElement.classList.remove('modal-open');
  var r = modalResolve; modalResolve = null;
  try { if (modalReturn && modalReturn.focus && document.contains(modalReturn)) modalReturn.focus({ preventScroll: true }); } catch (e) {}
  if (r) r(val);
}
(function wireModal() {
  var m = $('#modal'); if (!m) return;
  $('#modal-ok').addEventListener('click', function () { closeModal(true); });
  $('#modal-cancel').addEventListener('click', function () { closeModal(false); });
  m.addEventListener('click', function (e) { if (e.target === m) closeModal(false); });
  document.addEventListener('keydown', function (e) {
    if (m.hidden) return;
    if (e.key === 'Escape') { e.preventDefault(); closeModal(false); }
    else if (e.key === 'Tab') {
      var a = $('#modal-cancel'), b = $('#modal-ok');
      if (e.shiftKey && document.activeElement === a) { e.preventDefault(); b.focus(); }
      else if (!e.shiftKey && document.activeElement === b) { e.preventDefault(); a.focus(); }
      else if (document.activeElement !== a && document.activeElement !== b) { e.preventDefault(); a.focus(); }
    }
  });
})();

/* Header/footer heights -> CSS variables (header grows with large text or banners; nothing clips). */
function layoutVars() {
  var root = document.documentElement, tb = $('#topbar'), ab = $('#actionbar'), nb = $('#tabbar');
  if (tb) root.style.setProperty('--hdr-h', tb.offsetHeight + 'px');
  var foot = (ab && !ab.hidden ? ab.offsetHeight : 0) || (nb && !nb.hidden ? nb.offsetHeight : 0);
  root.style.setProperty('--foot-h', foot + 'px');
}
(function watchLayout() {
  window.addEventListener('resize', layoutVars);
  if (window.ResizeObserver) {
    try { var ro = new ResizeObserver(layoutVars); ['#topbar', '#actionbar', '#tabbar'].forEach(function (s) { var el = $(s); if (el) ro.observe(el); }); } catch (e) {}
  }
})();

/* ---- theme (stored as JSON "light"/"dark"; theme-init.js applies it before first paint) ---- */
function applyTheme(t) {
  if (!isTheme(t)) t = 'dark';
  document.documentElement.setAttribute('data-theme', t);
  var m = document.querySelector('meta[name="theme-color"]');
  if (m) m.setAttribute('content', t === 'light' ? '#ffffff' : '#0a0e14');
  var b = $('#themeBtn');
  if (b) { b.innerHTML = '<span aria-hidden="true">' + (t === 'light' ? '☾' : '☀') + '</span>'; b.setAttribute('aria-label', t === 'light' ? 'Switch to dark mode' : 'Switch to light mode'); }
}
applyTheme(store.get('theme', 'dark', isTheme));
(function () {
  var b = $('#themeBtn'); if (!b) return;
  b.addEventListener('click', function () {
    var t = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    store.set('theme', t); applyTheme(t);
  });
})();
