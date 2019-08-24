'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Attachment extends Model {

  gunBuilds () {
    return this.belongsToMany('App/Models/GunBuild')
  }

  slot () {
    return this.belongsTo('App/Models/Slot')
  }
}

module.exports = Attachment
