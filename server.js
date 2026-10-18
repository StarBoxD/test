const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3030;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  let reqUrl = req.url.split('?')[0];
  if (reqUrl === '/' || reqUrl === '') reqUrl = '/index.html';

  if (reqUrl === '/favicon.ico') {
    res.writeHead(204);
    res.end();
    return;
  }
  try {
    reqUrl = decodeURIComponent(reqUrl);
  } catch (e) {}

  const safePath = path.normalize(path.join(__dirname, reqUrl));

  // Dizin dışına çıkış engeli
  if (!safePath.toLowerCase().startsWith(__dirname.toLowerCase())) {
    res.writeHead(403, { 'Content-Type': 'text/plain; charset=utf-8' });
    res.end('403 - Yasak');
    console.log(`[403] ${req.method} ${req.url}`);
    return;
  }

  fs.stat(safePath, (statErr, stats) => {
    if (statErr || !stats.isFile()) {
      const notFoundBody = '<h1>404 - Sayfa Bulunamadı</h1>';
      res.writeHead(404, {
        'Content-Type': 'text/html; charset=utf-8',
        'Content-Length': Buffer.byteLength(notFoundBody)
      });
      res.end(notFoundBody);
      console.log(`[404] ${req.method} ${req.url}`);
      return;
    }

    const ext = path.extname(safePath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';

    fs.readFile(safePath, (readErr, content) => {
      if (readErr) {
        const errBody = '500 Sunucu Hatası';
        res.writeHead(500, {
          'Content-Type': 'text/plain; charset=utf-8',
          'Content-Length': Buffer.byteLength(errBody)
        });
        res.end(errBody);
        console.log(`[500] ${req.method} ${req.url}`);
        return;
      }

      res.writeHead(200, {
        'Content-Type': contentType,
        'Content-Length': Buffer.byteLength(content),
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      });
      res.end(content);
      console.log(`[200] ${req.method} ${req.url} (${content.length} B)`);
    });
  });
});

server.on('error', (err) => {
  console.error('Sunucu hatası:', err.message);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Sunucu hazır!`);
  console.log(`Local:   http://localhost:${PORT}`);
  console.log(`Network: http://127.0.0.1:${PORT}`);
});
