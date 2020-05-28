'use strict'

// Models
const User = use('App/Models/User')
const PasswordReset = use('App/Models/PasswordReset')

const Mail = use('Mail')

// Services
const GoogleAuthService = use('App/Services/GoogleAuthService')
const DiscordAuthService = use('App/Services/DiscordAuthService')

// Libraries
const randomString = require('random-string')
const UsernameGenerator = require('username-generator')

class UserController {

  // log the user in using email and password from post request
  async login({ request, auth, response }) {
    const { email, password } = request.all()

    // check user has confirmed their email
    const user = await User.query()
      .where('email', email)
      .where('is_active', true)
      .first()
    
      if(user) {
        // verify password
        const token = await auth.attempt(email, password)
        return token
      }
      else {
        response.status(404).json({
          message: `We couldn't verify your credentials. If you've signed up, make sure you've confirmed your email address!`
        })
      }
  }

  // get the email and password from post request and create a new User
  async register({ request, response }) {
    const { email, password, username } = request.all()
    const user = await User.create({ 
      email, 
      password, 
      username,
      confirmation_token: randomString({ length: 40 })
    })

    // send confirmation email to user
    await Mail.send('emails.confirm_email', user.toJSON(), message => {
      message.to(user.email)
      .from('quartermaster@tarkovarmory.com')
      .subject('Please confirm your email address')
    })

    response.status(201).json({
      message: 'Registration successful! An email has been sent to your email address. Please follow the instructions to verify your account.'
    })
  }

  // confirm a user's email address using confirmation token
  async confirmEmail({ params, response }) {
    const user = await User.findBy('confirmation_token', params.token)

    // remove their confirmation token and set the user as active
    user.confirmation_token = null
    user.is_active = true
    await user.save()

    response.status(200).json({
      message: 'Your email address has been confirmed!'
    })
  }

  // send a password reset email to a user's email address
  async sendPasswordResetEmail({ request, response }) {
    const { email } = request.all()

    try {
      const user = await User.findBy('email', email)
      
      // delete password reset token if already exists
      await PasswordReset.query().where('email', user.email).delete()


      const { token } = await PasswordReset.create({
        email: user.email,
        token: randomString({ length: 40 })
      })

      const username = user.toJSON().username
      const mailData = {
        username,
        token
      }

      await Mail.send('emails.password_reset', mailData, message => {
        message.to(user.email)
        .from('quartermaster@tarkovarmory.com')
        .subject('Password reset link')
      })

      response.status(200).json({
        message: 'A password reset link has been sent to your email address.'
      })
    }


    catch (error) {
      response.status(404).json({
        message: 'Sorry, we could not find a user associated with that email address.'
      })
    }
  }

  async resetPassword({ request, response }) {
    try {
      const user = await User.findBy('email', request.input('email'))

      const token = await PasswordReset.query()
        .where('email', user.email)
        .where('token', request.input('token'))
        .first()

      if(!token) {
        return response.status(404).json({
          message: 'This password reset token does not exist.'
        })
      }
      
      user.password = request.input('password') // will be hashed automatically on save
      await user.save()

      // delete password reset token
      await PasswordReset.query().where('email', user.email).delete()

      response.status(200).json({
        message: 'Your password has been reset.'
      })
    }

    catch(error) {
      response.status(404).json({
        message: 'Sorry, we could not find a user associated with that email address.'
      })
    }
  }

  // return all users
  async index({ response }) {
    const users = await User.all()

    response.status(200).json({
      message: 'Here is every user',
      data: users
    })
  }

  // return one user
  async show({ request, response, params: { id } }) {
    const user = request.user

    response.status(200).json({
      message: 'Here is your user',
      data: user
    })
  }

  // --- SOCIAL SIGN UP/LOG IN ---
  
  // 'provider' is the 3rd party authenticator's name, e.g. 'google' or 'facebook'
  async socialLogin ({ ally, auth, request, response, params: { provider } }) {
    const accessToken = request.input('token')

    try {
      let providerUser = {}
      let userDetails = {}

      // Use GoogleAuthService if the provider is google
      if (provider == 'google') {
        providerUser = await GoogleAuthService.verify(accessToken)
        
        userDetails = {
          email: providerUser.email,
          username: UsernameGenerator.generateUsername(),
          is_active: 1,
        }
      }

      // Use DiscordAuthService if the provider is discord
      else if (provider == 'discord') {
        const discordRedirectUri = request.input('discordRedirectUri')
        // In this case, accessToken is actually a code provided by discord
        // that can be exchanged for a real access token
        const discordAccessToken = await DiscordAuthService.requestToken(accessToken, discordRedirectUri)
        providerUser = await DiscordAuthService.getUser(discordAccessToken)
        
        userDetails = {
          email: providerUser.email,
          username: UsernameGenerator.generateUsername(),
          is_active: 1,
        }
      }

      // Otherwise, use Ally
      else {
        providerUser = await ally.driver(provider).getUserByToken(accessToken)
        userDetails = {
          email: providerUser.getEmail(),
          username: UsernameGenerator.generateUsername(),
          is_active: 1,
        }
      }
      
      // check if username is taken
      // if it is, generate a new username with a random number on the end and check again
      let checking = true;
      while (checking) {
        let alreadyExists = await User.findBy('username', userDetails.username)
        if (!alreadyExists) {
          checking = false;
        }
        else {
          let newUsername = UsernameGenerator.generateUsername()
          let randomNumber = Math.floor(Math.random() * 999) + 1
          userDetails.username = newUsername + randomNumber.toString()
        }
      }

      // search for existing user
      const whereClause = {
        email: userDetails.email
      }

      const user = await User.findOrCreate(whereClause, userDetails)
      const token = await auth.generate(user) // generates JWT token for user

      return token
    } catch (error) {
      console.log(error)
      response.status(404).json({
        message: `Unable to authenticate using ${provider}. Try again later`
      })
    }
  }

}

module.exports = UserController
