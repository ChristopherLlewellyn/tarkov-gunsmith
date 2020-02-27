'use strict'

class Gunbuild {
  get rules () {
    return {
      // validation rules
      name: 'required|max:45',
    }
  }

  get messages () {
    return {
      'name.required': 'Give your loadout a title',
      'name.max': 'Title should not exceed 45 characters',
    }
  }
}

module.exports = Gunbuild
