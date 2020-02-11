'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AttachmentSchema extends Schema {
  up () {
    this.create('attachments', (table) => {
      table.increments()
      table.string('name', 255)
      table.integer('slot_id').unsigned().references('id').inTable('slots')
      table.integer('recoil_modifier')
      table.integer('ergonomics_modifier')
      table.integer('accuracy_modifier')
      table.integer('muzzle_velocity_modifier')
      table.string('image')
    })
  }

  down () {
    this.drop('attachments')
  }
}

module.exports = AttachmentSchema
