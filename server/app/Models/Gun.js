'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Gun extends Model {

  slots () {
    return this.belongsToMany('App/Models/Slot')
  }

  gunBuilds () {
    return this.hasMany('App/Models/GunBuilds')
  }
}

module.exports = Gun
