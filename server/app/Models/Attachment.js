'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Attachment extends Model {

  gunbuilds () {
    return this.belongsToMany('App/Models/Gunbuild')
  }

  slot () {
    return this.belongsTo('App/Models/Slot')
  }
}

module.exports = Attachment
