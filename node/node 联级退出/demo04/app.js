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


process.stdin.on('data', data => {
  log('app receive stdin data:', data);
  const obj = JSON.parse(data);
  if (obj.type === 'exit') {
    process.exit();
  }
})

process.on('exit', (code) => {
  log('app exit ===>', code);
})
