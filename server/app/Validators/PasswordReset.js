'use strict'

class ResetPassword {
  get rules () {
    return {
      // validation rules
      token: 'required',
      email: 'required|email',
      password: 'required|confirmed'
    }
  }

  get messages () {
    return {
      'email.required': 'You must provide an email address',
      'email.email': 'You must provide a valid email address',
      'token.required': 'You must provide a token',
      'password.required': 'You must provide a password',
      'password.confirmed': 'Passwords must match'
    }
  }
}

module.exports = ResetPassword