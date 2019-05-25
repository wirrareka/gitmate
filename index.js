const express = require('express')
const bodyParser = require('body-parser')
const settings = require('./settings')
const Bot = require('./bot')

const app = express()

app.use(bodyParser.json())

app.post('/hook', (req, res) => {
  console.log('hook', req.body)
})

app.listen(settings.host, settings.port, () => {
  console.log(`GitMate running at http://${settings.host}:${settings.port}`)
})