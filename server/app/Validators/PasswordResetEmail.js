'use strict'

class ResetPassword {
  get rules () {
    return {
      // validation rules
      email: 'required|email'
    }
  }

  get messages () {
    return {
      'email.required': 'You must provide an email address',
      'email.email': 'You must provide a valid email address'
    }
  }
}

module.exports = ResetPassword