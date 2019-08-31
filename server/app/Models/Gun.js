'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Gun extends Model {

  slots () {
    return this.belongsToMany('App/Models/Slot')
  }

  gunbuilds () {
    return this.hasMany('App/Models/Gunbuilds')
  }
}

module.exports = Gun
