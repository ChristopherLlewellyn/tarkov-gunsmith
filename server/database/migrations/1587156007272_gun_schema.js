'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GunSchema extends Schema {
  up () {
    this.table('guns', (table) => {
      // alter table
      table.string('bsg_id')
    })
  }

  down () {
    this.table('guns', (table) => {
      // reverse alterations
      table.dropColumn('bsg_id')
    })
  }
}

module.exports = GunSchema
