'use strict'

const User = use('App/Models/User')

class UserController {
  //log the user in using email and password from post request
  async login({ request, auth }) {
    const { email, password, } = request.all()
    const token = await auth.attempt(email, password)
    return token
  }

  //get the email and password from post request and create a new User
  async register({ request }) {
    const { email, password } = request.all()
    const user = await User.create({
      email,
      password,
      username: email
    })
    return this.login(...arguments)
  }
}

module.exports = UserController
