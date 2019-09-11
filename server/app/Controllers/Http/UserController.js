'use strict'

const User = use('App/Models/User')

class UserController {

  //log the user in using email and password from post request
  async login({ request, auth }) {
    const { email, password } = request.all()
    const token = await auth.attempt(email, password)
    return token
  }

  //get the email and password from post request and create a new User
  async register({ request }) {
    const { email, password, username } = request.all()
    const user = await User.create({ 
      email, 
      password, 
      username,
    })
    return this.login(...arguments)
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

}

module.exports = UserController
