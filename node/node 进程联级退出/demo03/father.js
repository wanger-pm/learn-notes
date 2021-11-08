var cp = require('child_process');
var { log } = require('./log');

const subprocess = cp.exec('node child.js', {
  maxBuffer: 1024 * 1024 * 1024
})

setInterval(() => {

}, 1000)

log('father pid ===>' + process.pid);

process.on('SIGINT', (code) => {
  log('father SIGINT', code);
  process.exit();
})


process.on('SIGTERM', (code) => {
  log('father SIGTERM ===>', code);
  process.exit();
})

process.on('exit', (code) => {
  log('father exit ===>', code);
  subprocess.kill();
})