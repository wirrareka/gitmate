const Discord = require('discord.js')
const settings = require('settings')

module.exports = class Bot {
  constructor(token) {
    this.token = token
    this.client = new Discord.Client()
    this.repoChannels = {}
  }

  async send(repository, msg) {
    const channel = this.repoChannels[repository]
    if (!channel) {
      console.log(`skipping message for ${repository}, channel not found`)
      return
    }

    client.channels.get(channel).send(msg)
  }

  initChannels() {
    const repositories = Object.keys(settings.repo_channels)
    repositories.forEach(repository => {
      const channelName = settings.repo_channels[repository]
      this.repoChannels[repository] = this.client.channels.find('name', channelName)
    })
  }

  async connect() {
    await this.client.login(this.token)
    await this.initChannels()
  }

}

