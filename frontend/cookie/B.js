const express = require('express')
const cookieParser = require('cookie-parser');
const cors = require('cors')

const serverName = 'B';
const port = 3002;

const app = express()

app.use(cookieParser())
app.use(cors())

app.use('/html', express.static(`html-${serverName}`))

app.get('/', (req, res) => {
  res.json({ message: 'pong' })
})

app.get('/message', (req, res) => {
  res.json({ message: `${serverName}-server` })
})

app.get('/setCookie', (req, res) => {
  var cookie = req.cookies[`${serverName}-Cookie`];
  if (cookie === undefined) {
    // no: set a new cookie
    res.cookie(`${serverName}-Cookie`, serverName, { maxAge: 900000, httpOnly: true });
    console.log('cookie created successfully');
  } else {
    // yes, cookie was already present 
    console.log('cookie exists', cookie);
  }
  res.json({ message: 'ok' })
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})