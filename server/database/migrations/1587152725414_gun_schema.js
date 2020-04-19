'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GunSchema extends Schema {
  up () {
    this.table('guns', (table) => {
      // alter table
      table.string('short_name')
      table.text('description')
      table.integer('price')
      table.decimal('weight')
      table.integer('modified')
      table.string('_kind')
      table.renameColumn('calibre', 'caliber')
      table.renameColumn('horizontal_recoil_base', 'horizontal_recoil')
      table.renameColumn('vertical_recoil_base', 'vertical_recoil')
      table.renameColumn('ergonomics_base', 'ergonomics')
      table.json('slots')
    })
  }

  down () {
    this.table('guns', (table) => {
      // reverse alterations
      table.dropColumn('short_name')
      table.dropColumn('description')
      table.dropColumn('price')
      table.dropColumn('weight')
      table.dropColumn('modified')
      table.dropColumn('_kind')
      table.renameColumn('caliber', 'calibre')
      table.renameColumn('horizontal_recoil', 'horizontal_recoil_base')
      table.renameColumn('vertical_recoil', 'vertical_recoil_base')
      table.renameColumn('ergonomics', 'ergonomics_base')
      table.dropColumn('slots')
    })
  }
}

module.exports = GunSchema
