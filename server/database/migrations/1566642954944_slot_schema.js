'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class SlotSchema extends Schema {
  up () {
    this.create('slots', (table) => {
      table.increments()
      table.string('name', 100)
    })
  }

  down () {
    this.drop('slots')
  }
}

module.exports = SlotSchema
