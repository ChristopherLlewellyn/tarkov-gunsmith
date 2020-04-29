'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GunbuildSchema extends Schema {
  up () {
    this.table('gunbuilds', (table) => {
      // alter table
      table.json('all_items')
    })
  }

  down () {
    this.table('gunbuilds', (table) => {
      // reverse alterations
      table.dropColumn('all_items')
    })
  }
}

module.exports = GunbuildSchema
