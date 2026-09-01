// Static server for Floppy Bird. No dependencies. Railway sets PORT.
// Serves exactly one page plus a health check; every other path is 404 so
// nothing added to this folder later can leak by accident.
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3000;
const INDEX = fs.readFileSync(path.join(__dirname, 'index.html'));
const HEADERS = {
  'Content-Type': 'text/html; charset=utf-8',
  'Cache-Control': 'no-cache',
  'X-Content-Type-Options': 'nosniff',
  'X-Frame-Options': 'SAMEORIGIN',
  'Referrer-Policy': 'no-referrer',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': "default-src 'none'; script-src 'unsafe-inline'; style-src 'unsafe-inline'; img-src data:; media-src 'none'; connect-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'self'",
};

http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') { res.writeHead(405, { Allow: 'GET, HEAD' }); return res.end(); }
  const p = new URL(req.url, 'http://x').pathname;
  if (p === '/healthz') { res.writeHead(200, { 'Content-Type': 'text/plain', 'Cache-Control': 'no-store' }); return res.end('ok'); }
  if (p === '/' || p === '/index.html') { res.writeHead(200, HEADERS); return res.end(req.method === 'HEAD' ? undefined : INDEX); }
  res.writeHead(404, { 'Content-Type': 'text/plain' }); res.end('not found');
}).listen(PORT, () => console.log('Floppy Bird on http://localhost:' + PORT));
