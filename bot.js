const Discord = require('discord.js')

module.exports = class Bot {
  constructor(token) {
    this.token = token
    this.client = new Discord.Client()
  }

  async connect() {
    await this.client.login(this.token)
  }

}

