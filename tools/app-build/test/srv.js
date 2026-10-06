// Test server: node srv.js <root> <port>. Emulates _headers (CSP etc. + no-cache list) and SPA-less 404.
const http = require('http'), fs = require('fs'), path = require('path');
const root = process.argv[2], port = +process.argv[3];
const mt = { '.html': 'text/html; charset=utf-8', '.js': 'application/javascript', '.css': 'text/css', '.json': 'application/json', '.png': 'image/png', '.txt': 'text/plain' };
const CSP = "default-src 'self'; script-src 'self'; style-src 'self'; img-src 'self'; font-src 'self'; connect-src 'self'; manifest-src 'self'; worker-src 'self'; media-src 'self'; object-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'";
const NOCACHE = ['/sw.js', '/version.json', '/data.js', '/index.html', '/'];
http.createServer((q, s) => {
  let u = decodeURIComponent(q.url.split('?')[0]);
  const nc = NOCACHE.includes(u);
  if (u.endsWith('/')) u += 'index.html';
  const f = path.join(root, u);
  fs.readFile(f, (e, d) => {
    const h = { 'Content-Security-Policy': CSP, 'X-Content-Type-Options': 'nosniff', 'Referrer-Policy': 'no-referrer', 'X-Robots-Tag': 'noindex, nofollow',
      'Cache-Control': nc ? 'no-cache' : 'public, max-age=0, must-revalidate' };
    if (e) { s.writeHead(404, { ...h, 'content-type': 'text/html' }); return s.end('<h1>404</h1>'); }
    s.writeHead(200, { ...h, 'content-type': mt[path.extname(f)] || 'application/octet-stream' }); s.end(d);
  });
}).listen(port, () => console.log('listening ' + port));
