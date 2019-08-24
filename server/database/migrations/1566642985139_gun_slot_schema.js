'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GunSlotSchema extends Schema {
  up () {
    this.create('gun_slot', (table) => {
      table.integer('gun_id').unsigned().index('gun_id')
      table.integer('slot_id').unsigned().index('slot_id')
      
      table.foreign('gun_id').references('guns.id').onDelete('cascade')
      table.foreign('slot_id').references('slots.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('gun_slot')
  }
}

module.exports = GunSlotSchema
