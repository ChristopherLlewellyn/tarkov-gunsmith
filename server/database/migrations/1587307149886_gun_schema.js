'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GunSchema extends Schema {
  up () {
    this.table('guns', (table) => {
      // alter table
      table.dropColumn('image')
    })
  }

  down () {
    this.table('guns', (table) => {
      // reverse alterations
      table.string('image')
    })
  }
}

module.exports = GunSchema
