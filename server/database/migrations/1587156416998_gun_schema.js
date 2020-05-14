'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GunSchema extends Schema {
  up () {
    this.table('guns', (table) => {
      // alter table
      table.renameColumn('_kind', 'kind')
    })
  }

  down () {
    this.table('guns', (table) => {
      // reverse alterations
      table.renameColumn('kind', '_kind')
    })
  }
}

module.exports = GunSchema
