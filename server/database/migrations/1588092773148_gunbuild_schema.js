'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GunbuildSchema extends Schema {
  up () {
    this.table('gunbuilds', (table) => {
      // alter table
      table.integer('market_price')
    })
  }

  down () {
    this.table('gunbuilds', (table) => {
      // reverse alterations
      table.dropColumn('market_price')
    })
  }
}

module.exports = GunbuildSchema
