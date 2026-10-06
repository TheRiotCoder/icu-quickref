/* ICU QuickRef service worker.
   - Network-first (4 s timeout, cache fallback) for index.html / navigations, data.js, version.json
     so clinical content is as fresh as the connection allows.
   - Cache-first for static assets (app.js, styles.css, icons...) from the versioned cache only.
   - Atomic install (cache.addAll, bypassing the HTTP cache). No skipWaiting on install:
     the page asks for it (message 'SKIP_WAITING') when the user taps the update banner.
   BUMP CACHE_VERSION on every release (keep it in sync with data.js meta.version + version.json;
   `node scripts/check-release.js` verifies this). */
const CACHE_VERSION = 'icuqr-v2.0.0-r2';
const ASSETS = [
  './',
  'index.html',
  'styles.css',
  'theme-init.js',
  'app.js',
  'data.js',
  'version.json',
  'manifest.json',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-maskable-512.png',
  'icons/apple-touch-icon.png',
  '404.html'
];
const NETWORK_FIRST = ['index.html', 'data.js', 'version.json'];
const NET_TIMEOUT_MS = 4000;

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_VERSION).then((cache) =>
      cache.addAll(ASSETS.map((u) => new Request(u, { cache: 'reload' }))))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('icuqr-') && k !== CACHE_VERSION).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('message', (event) => {
  const d = event.data;
  if (d === 'SKIP_WAITING' || (d && d.type === 'SKIP_WAITING')) self.skipWaiting();
  if (d && d.type === 'GET_VERSION' && event.source) event.source.postMessage({ type: 'VERSION', cache: CACHE_VERSION });
});

function scopePath(url) {
  const base = new URL(self.registration.scope).pathname;
  let p = url.pathname;
  if (p.indexOf(base) === 0) p = p.slice(base.length);
  return p === '' ? './' : p;
}

/* Only store a response if it looks like what was asked for (hosts with SPA fallback return
   200 text/html for missing files). */
function looksRight(path, res) {
  if (!res || !res.ok || res.type !== 'basic') return false;
  const ct = (res.headers.get('content-type') || '').toLowerCase();
  if (/\.js$/.test(path)) return ct.indexOf('javascript') >= 0;
  if (/\.json$/.test(path)) return ct.indexOf('json') >= 0;
  if (/\.css$/.test(path)) return ct.indexOf('css') >= 0;
  if (/\.png$/.test(path)) return ct.indexOf('image') >= 0;
  if (path === './' || /\.html$/.test(path)) return ct.indexOf('html') >= 0;
  return true;
}

/* Mark responses served from cache because the network failed, so the page can tell
   "verified online" apart from "offline copy". */
async function markFallback(res) {
  if (!res) return res;
  const h = new Headers(res.headers);
  h.set('X-SW-Fallback', '1');
  const body = await res.blob();
  return new Response(body, { status: res.status, statusText: res.statusText, headers: h });
}

const OFFLINE_HTML = '<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">' +
  '<title>ICU QuickRef offline</title><body style="font:18px system-ui;padding:24px;background:#0a0e14;color:#f4f7fb">' +
  '<h1>Offline and not cached</h1><p>ICU QuickRef has not been saved on this device yet (or the browser cleared it). ' +
  'Open it once with a connection. Use your facility protocol meanwhile.</p></body>';

async function networkFirst(event, path) {
  const req = event.request;
  const cache = await caches.open(CACHE_VERSION);
  const key = (req.mode === 'navigate' || path === './') ? 'index.html' : path;
  /* For navigations, fetch the original URL (usually /). Rewriting to index.html
     breaks Chrome desktop installed PWAs with ERR_FAILED. */
  const netReq = req.mode === 'navigate'
    ? new Request(req.url, { cache: 'no-cache', redirect: 'follow' })
    : new Request(req, { cache: 'no-cache' });
  const net = fetch(netReq)
    .then((res) => {
      if (looksRight(key, res)) { const copy = res.clone(); return cache.put(key, copy).then(() => res); }
      return res && res.ok ? res : Promise.reject(new Error('bad response'));
    });
  let timer;
  const timeout = new Promise((resolve) => { timer = setTimeout(() => resolve(null), NET_TIMEOUT_MS); });
  try {
    const res = await Promise.race([net, timeout]);
    clearTimeout(timer);
    if (res) return res;
    event.waitUntil(net.catch(() => null)); // keep updating the cache in the background
  } catch (e) { clearTimeout(timer); }
  const cached = (await cache.match(key)) || (key === 'index.html' ? await cache.match('./') : null);
  if (cached) return markFallback(cached);
  if (req.mode === 'navigate') return new Response(OFFLINE_HTML, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  return new Response('Offline', { status: 503, statusText: 'Offline' });
}

async function cacheFirst(event, path) {
  const cache = await caches.open(CACHE_VERSION);
  const cached = await cache.match(event.request, { ignoreSearch: true });
  if (cached) return cached;
  try {
    const res = await fetch(event.request);
    if (ASSETS.indexOf(path) >= 0 && looksRight(path, res)) await cache.put(path, res.clone());
    return res;
  } catch (e) {
    return new Response('Offline', { status: 503, statusText: 'Offline' });
  }
}

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  const path = scopePath(url);
  if (req.mode === 'navigate' || NETWORK_FIRST.indexOf(path) >= 0 || path === './') {
    event.respondWith(networkFirst(event, path));
  } else {
    event.respondWith(cacheFirst(event, path));
  }
});
