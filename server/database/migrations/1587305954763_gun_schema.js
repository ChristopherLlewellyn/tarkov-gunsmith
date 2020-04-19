'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GunSchema extends Schema {
  up () {
    this.table('guns', (table) => {
      // alter table
      table.integer('avg_24h_price')
      table.string('trader_name')
      table.integer('trader_price')
      table.string('trader_price_cur')
      table.text('icon')
      table.text('img')
      table.text('img_big')
      table.text('tarkov_market_link')
      table.text('wiki_link')
    })
  }

  down () {
    this.table('guns', (table) => {
      // reverse alterations
      table.dropColumn('avg_24h_price')
      table.dropColumn('trader_name')
      table.dropColumn('trader_price')
      table.dropColumn('trader_price_cur')
      table.dropColumn('icon')
      table.dropColumn('img')
      table.dropColumn('img_big')
      table.dropColumn('tarkov_market_link')
      table.dropColumn('wiki_link')
    })
  }
}

module.exports = GunSchema
