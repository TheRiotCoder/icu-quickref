/* ICU QuickRef: set theme before first paint (external file so CSP needs no 'unsafe-inline').
   app.js stores the theme as JSON (e.g. "\"light\""); older builds may have stored a raw string. */
(function () {
  try {
    var t = localStorage.getItem('icuqr.theme');
    if (t) { try { t = JSON.parse(t); } catch (e) { /* raw string */ } }
    if (t !== 'light' && t !== 'dark') t = 'dark';
    document.documentElement.setAttribute('data-theme', t);
    var m = document.querySelector('meta[name="theme-color"]');
    if (m) m.setAttribute('content', t === 'light' ? '#ffffff' : '#0a0e14');
  } catch (e) { /* storage blocked: keep dark default */ }
})();
