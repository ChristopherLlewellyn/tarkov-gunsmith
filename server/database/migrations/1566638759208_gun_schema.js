'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GunSchema extends Schema {
  up () {
    this.create('guns', (table) => {
      table.increments()
      table.string('name', 255)
      table.string('type', 255)
      table.integer('horizontal_recoil_base')
      table.integer('vertical_recoil_base')
      table.integer('ergonomics_base')
      table.integer('rpm')
      table.string('calibre')
      table.integer('effective_range')
    })
  }

  down () {
    this.drop('guns')
  }
}

module.exports = GunSchema
