const express = require('express')
const bodyParser = require('body-parser')
const settings = require('./settings')
const Bot = require('./bot')

const bot = new Bot(settings.discord.token)
const app = express()

app.use(bodyParser.json())

app.post('/hook', async (req, res) => {
  console.log('hook', req.body)
  const params = req.body
  let msg = null
  if (params.comment) {
    msg = `[${params.repository.name}][${params.issue.title}] Comment ${params.action}:\n${params.comment.body}`
  } else if (params.issue) {
    msg = `[${params.repository.name}][${params.issue.title}] Issue ${params.action}:\n${params.issue.body}`
  }

  if (msg) {
    try {
      bot.send(msg)
    } catch (e) {
      console.error('bot error', e)
    }
  }

  res.send({ success: true })
})

const initBot = async () => {
  console.log('connecting bot...')
  try {
    await bot.connect()
    console.log('GitMate Discord bot connected')
  } catch (e) {
    console.error('GitMate Discord bot connection error', e)
  }
}

app.listen(settings.port, settings.host, async () => {
  initBot()
  console.log(`GitMate running at http://${settings.host}:${settings.port}`)
})