'use strict'

class RegisterUser {
  get rules () {
    return {
      // validation rules
      email: 'required|email|unique:users',
      password: 'required|min:8',
      username: 'required|alpha_numeric|unique:users|max:16'
    }
  }

  get messages () {
    return {
      'email.required': 'You must provide an email address',
      'email.email': 'You must provide a valid email address',
      'email.unique': 'This email is already registered',
      'password.required': 'You must provide a password',
      'password.min': 'Password must be at least 8 characters long',
      'username.required': 'You must provide a username',
      'username.alpha_numeric': 'Username can only contain letters and numbers',
      'username.unique': 'Username already exists',
      'username.max': 'Username can be a maximum of 16 characters'
    }
  }
}

module.exports = RegisterUser
