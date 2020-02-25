'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Gunbuild extends Model {
  
  user () {
    return this.belongsTo('App/Models/User')
  }

  gun () {
    return this.hasOne('App/Models/Gun')
  }

  attachments () {
    return this.belongsToMany('App/Models/Attachment').pivotTable('attachment_gunbuild')
  }

  voteCount () {
    return this.hasOne('App/Models/VoteCount')
  }
}

module.exports = Gunbuild
