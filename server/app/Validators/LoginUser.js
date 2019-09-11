'use strict'

class LoginUser {
  get rules () {
    return {
      // validation rules
      email: 'required|email',
      password: 'required',
    }
  }

  get messages () {
    return {
      'email.required': 'You must provide an email address',
      'email.email': 'You must provide a valid email address',
      'password.required': 'You must provide a password',
    }
  }
}

module.exports = LoginUser
