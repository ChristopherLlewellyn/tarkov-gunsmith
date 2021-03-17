'use strict'
const Env = use('Env')
const CLIENT_ID = process.env.GOOGLE_CLIENT_ID || Env.get('GOOGLE_CLIENT_ID')

const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client(CLIENT_ID)

class GoogleAuthService {
  async verify(token) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
      });
      const payload = ticket.getPayload()

      // Extract user details
      const email = payload['email']

      const user = { 
        email 
      }

      return user
    } 
    catch (err) {
      console.log(err)
    }
  }
}

module.exports = new GoogleAuthService()
