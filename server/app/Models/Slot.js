'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Slot extends Model {

  static boot () {
    super.boot()
    this.addTrait('NoTimestamp')
  }

  guns () {
    return this.belongsToMany('App/Models/Gun')
  }

  attachments () { 
    return this.hasMany('App/Models/Attachment')
  }
}

module.exports = Slot
