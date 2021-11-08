var cp = require('child_process');
var { log } = require('./log');

const subprocess = cp.exec('node app.js', {
  maxBuffer: 1024 * 1024 * 1024
})

log('child pid ===>' + process.pid);

process.stdin.on('data', data => {
  log('child receive stdin data:', data);
  const obj = JSON.parse(data);
  if (obj.type === 'exit') {
    subprocess.stdin.write(JSON.stringify({
      type: 'exit'
    }))
    process.exit();
  }
})

process.on('exit', (code) => {
  log('child exit ===>', code);
  // subprocess.kill();
})

