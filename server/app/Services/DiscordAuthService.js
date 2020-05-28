'use strict'
const Env = use('Env')
const CLIENT_ID = Env.get('DISCORD_CLIENT_ID')
const CLIENT_SECRET = Env.get('DISCORD_CLIENT_SECRET')

const DiscordOauth2 = require('discord-oauth2')
const oauth = new DiscordOauth2({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
})

class DiscordAuthService {
  async requestToken(code, redirectUri) {
    try {
      const response = await oauth.tokenRequest({
        code: code,
        redirectUri: redirectUri,
        scope: 'identify email',
        grantType: "authorization_code"
      })

      const token = response.access_token
      return token
    } catch (err) {
      console.log(err)
    }
  }

  async getUser(token) {
    try {
      const user = await oauth.getUser(token)
      return user
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = new DiscordAuthService()
