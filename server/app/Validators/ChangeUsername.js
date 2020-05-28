'use strict'

class ChangeUsername {
  get rules () {
    return {
      // validation rules
      username: 'required|alpha_numeric|unique:users|max:16'
    }
  }

  get messages () {
    return {
      'username.required': 'You must provide a username',
      'username.alpha_numeric': 'Username can only contain letters and numbers',
      'username.unique': 'Username already exists',
      'username.max': 'Username can be a maximum of 16 characters'
    }
  }
}

module.exports = ChangeUsername
