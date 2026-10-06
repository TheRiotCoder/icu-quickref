/* ===================== 01 core: constants, helpers, storage ===================== */
var $ = function (s, r) { return (r || document).querySelector(s); };
var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
var app = $('#app');

var MIN = 60e3, HOUR = 60 * MIN, DAY = 24 * HOUR;
var TICK_TTL = 12 * HOUR;            // checklist ticks expire 12 h after being ticked
var TIMER_STALE_WARN = 60 * MIN;     // running > 60 min: on-screen warning
var TIMER_STALE_PROMPT = 2 * HOUR;   // running > 2 h at launch: ask whether to end it
var TIMER_LOG_TTL = 12 * HOUR;       // a stopped code log is discarded after 12 h
var CYCLE = 120;                     // rhythm check every 2 min (seconds)
var TAP_LOCK_MS = 600;               // debounce for timer controls (double taps)
var SAME_EVENT_LOCK_MS = 2000;       // ignore a 2nd epi/shock within 2 s (duplicate tap)
var ALERT_REPEAT_MS = 10e3;          // rhythm-check alert repeats until acknowledged
var ALERT_MAX_REPEATS = 6;
var VERIFY_STALE_DAYS = 14;          // "not verified online" warning
var VERSION_CHECK_MS = 30 * MIN;

function reducedMotion() { return !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches); }
function scrollBehavior() { return reducedMotion() ? 'auto' : 'smooth'; }

function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
function str(v) { return typeof v === 'string' ? v : (typeof v === 'number' && isFinite(v) ? String(v) : ''); }
function isObj(v) { return !!v && typeof v === 'object' && !Array.isArray(v); }
function isNum(v) { return typeof v === 'number' && isFinite(v); }
function arr(v) { return Array.isArray(v) ? v : []; }
function hash(s) { var h = 5381; s = String(s); for (var i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0; return 'h' + (h >>> 0).toString(36); }
function pad2(n) { return (n < 10 ? '0' : '') + n; }
function fmt(sec) { sec = Math.max(0, Math.floor(sec)); var m = Math.floor(sec / 60), s = sec % 60; return pad2(m) + ':' + pad2(s); }
function clock(ts) { var d = new Date(ts); return pad2(d.getHours()) + ':' + pad2(d.getMinutes()); }
function dateTime(ts) { var d = new Date(ts); return d.getFullYear() + '-' + pad2(d.getMonth() + 1) + '-' + pad2(d.getDate()) + ' ' + clock(ts); }
function ago(ms) {
  ms = Math.max(0, ms); var m = Math.floor(ms / MIN);
  if (m < 1) return 'just now';
  if (m < 60) return m + ' min ago';
  var h = Math.floor(m / 60);
  if (h < 48) return h + ' h' + (m % 60 ? ' ' + (m % 60) + ' min' : '') + ' ago';
  return Math.floor(h / 24) + ' days ago';
}
function dur(ms) { return ago(ms).replace(/ ago$/, '').replace('just now', 'under a minute'); }
function now() { return Date.now(); }

/* Storage: every read is validated by a shape check; bad values fall back to defaults. */
var store = {
  get: function (k, d, ok) {
    try {
      var v = localStorage.getItem('icuqr.' + k);
      if (v == null) return d;
      v = JSON.parse(v);
      if (ok && !ok(v)) { store.bad.push(k); return d; }
      return v;
    } catch (e) { store.bad.push(k); return d; }
  },
  set: function (k, v) { try { localStorage.setItem('icuqr.' + k, JSON.stringify(v)); return true; } catch (e) { return false; } },
  del: function (k) { try { localStorage.removeItem('icuqr.' + k); } catch (e) {} },
  keys: function () { try { return Object.keys(localStorage).filter(function (k) { return k.indexOf('icuqr.') === 0; }).map(function (k) { return k.slice(6); }); } catch (e) { return []; } },
  clearAll: function (keep) {
    store.keys().forEach(function (k) { if (!keep || keep.indexOf(k) < 0) store.del(k); });
  },
  bad: []
};
function isStrArr(v) { return Array.isArray(v) && v.every(function (x) { return typeof x === 'string'; }); }
function isTheme(v) { return v === 'light' || v === 'dark'; }

/* Session-level record of the last error (kept on-device only; shown in About). */
function noteError(where, e) {
  try { console.error('[icuqr] ' + where, e); } catch (x) {}
  store.set('lastError', { ts: now(), where: String(where), msg: String((e && e.message) || e).slice(0, 300) });
}
