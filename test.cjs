const http = require('http');

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('FUNCIONA');
}).listen(3333, '127.0.0.1', () => {
  console.log('Servidor simple en http://127.0.0.1:3333');
});