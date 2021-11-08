const http = require('http');
var { log } = require('./log');

http.createServer((req, res) => {
  res.writeHead(200, {
    'Content-Type': 'application/json'
  });
  const used = process.memoryUsage();
  const data = {};
  for (let key in used) {
    data[key] = `${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`
  }
  res.end(JSON.stringify({
    data,
    pid: process.pid
  }))
}).listen(8889)

log('app pid ===>' + process.pid);

process.on('SIGINT', (code) => {
  log('app SIGINT', code);
  process.exit();
})

process.on('SIGTERM', (code) => {
  log('app SIGTERM ===>', code);
})

process.on('exit', (code) => {
  log('app exit ===>', code);
})
