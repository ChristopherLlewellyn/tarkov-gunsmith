'use strict'

/** @type {typeof import('@adonisjs/lucid/src/Lucid/Model')} */
const Model = use('Model')

class Attachment extends Model {

  static boot () {
    super.boot()
    this.addTrait('NoTimestamp')
  }

  gunbuilds () {
    return this.belongsToMany('App/Models/Gunbuild').pivotTable('attachment_gunbuild')
  }
}

module.exports = Attachment
