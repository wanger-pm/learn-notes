var cp = require('child_process');
var { log } = require('./log');

// setInterval(() => {

// }, 1000)

const subprocess = cp.exec('node app.js', {
  maxBuffer: 1024 * 1024 * 1024
})

log('child pid ===>' + process.pid);

setInterval(() => {
  log('child ppid ===>' + process.ppid);
}, 3000)

process.on('SIGINT', (code) => {
  log('child SIGINT', code);
  process.exit();
})

process.on('SIGTERM', (code) => {
  log('child SIGTERM ===>', code);
  // subprocess.kill();
  // process.exit();
})

process.on('exit', (code) => {
  log('child exit ===>', code);
  // subprocess.kill();
})
