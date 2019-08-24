'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Slot extends Model {

  guns () {
    return this.belongsToMany('App/Models/Gun')
  }

  attachments () { 
    return this.hasMany('App/Models/Attachment')
  }
}

module.exports = Slot
