var cp = require('child_process');
const { write } = require('fs');
var { log } = require('./log');

// const subprocess = cp.exec('node child.js', {
//   maxBuffer: 1024 * 1024 * 1024
// })

const subprocess = cp.exec('node child.js', {
  maxBuffer: 1024 * 1024 * 1024
})

setTimeout(() => {
  subprocess.stdin.write(JSON.stringify({
    type: 'exit'
  }));
  process.exit();
}, 10000)

log('father pid ===>' + process.pid);

process.on('exit', (code) => {
  log('father exit ===>', code);
  // subprocess.kill();
})