// Regression tests for server.js: malformed targets must 404 (not crash), and only three paths are routable.
const net = require('net');
const http = require('http');
const server = require('./server.js');

function raw(target) {
  return new Promise((resolve, reject) => {
    const s = net.connect(server.address().port, '127.0.0.1', () => s.write('GET ' + target + ' HTTP/1.1\r\nHost: x\r\nConnection: close\r\n\r\n'));
    let buf = ''; s.on('data', d => buf += d); s.on('end', () => resolve(+buf.split(' ')[1])); s.on('error', reject);
  });
}
function req(method, path) {
  return new Promise((resolve, reject) => http.request({ port: server.address().port, method, path }, r => { r.resume(); resolve(r.statusCode); }).on('error', reject).end());
}
(async () => {
  await new Promise(r => server.listen(0, '127.0.0.1', r));
  const expect = [];
  for (const t of ['//', '//[', '//foo:bar', '//a]b', '//%C0', '/../server.js', '/%2e%2e/package.json', '/README.md', '/server.js', '/INDEX.HTML', '/index.html%00.txt']) expect.push([t, await raw(t), 404]);
  expect.push(['/', await raw('/'), 200], ['/index.html', await raw('/index.html'), 200], ['/index.html?x=1', await raw('/index.html?x=1'), 200], ['/healthz', await raw('/healthz'), 200]);
  expect.push(['POST /', await req('POST', '/'), 405], ['HEAD /', await req('HEAD', '/'), 200]);
  expect.push(['alive after all of that', await raw('/healthz'), 200]);
  let fail = 0;
  for (const [t, got, want] of expect) { const ok = got === want; if (!ok) fail++; console.log((ok ? 'ok   ' : 'FAIL ') + t.padEnd(28) + got + (ok ? '' : ' (wanted ' + want + ')')); }
  server.close();
  if (fail) { console.error(fail + ' failing'); process.exit(1); }
  console.log('all ' + expect.length + ' checks passed');
})().catch(e => { console.error(e); process.exit(1); });
