'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class VoteCount extends Model {
  
  static boot () {
    super.boot()
    this.addTrait('NoTimestamp')
  }

  gunbuild () {
    return this.belongsTo('App/Models/Gunbuild')
  }
}

module.exports = VoteCount
