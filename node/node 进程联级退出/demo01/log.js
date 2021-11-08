const fs = require('fs');

const log = (str) => {
  fs.appendFileSync('server.log', `${new Date().toString()}: ${str}\n`)
}

module.exports = {
  log
}

