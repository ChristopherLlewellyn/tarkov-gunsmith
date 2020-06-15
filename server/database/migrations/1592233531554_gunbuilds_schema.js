'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GunbuildsSchema extends Schema {
  up () {
    this.table('gunbuilds', (table) => {
      // alter table
      table.text('description')
    })
  }

  down () {
    this.table('gunbuilds', (table) => {
      // reverse alterations
      table.dropColumn('description')
    })
  }
}

module.exports = GunbuildsSchema
