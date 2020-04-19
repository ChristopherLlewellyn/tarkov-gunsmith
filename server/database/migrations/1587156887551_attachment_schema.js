'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AttachmentSchema extends Schema {
  up () {
    this.table('attachments', (table) => {
      // alter table
      table.string('bsg_id')
      table.string('short_name')
      table.text('description')
      table.integer('price')
      table.decimal('weight')
      table.integer('modified')
      table.string('kind')
      table.json('slots')
      table.json('compatibility')
      table.json('conflicts')
    })
  }

  down () {
    this.table('attachments', (table) => {
      // reverse alterations
      table.dropColumn('bsg_id')
      table.dropColumn('short_name')
      table.dropColumn('description')
      table.dropColumn('price')
      table.dropColumn('weight')
      table.dropColumn('modified')
      table.dropColumn('kind')
      table.dropColumn('slots')
      table.dropColumn('compatibility')
      table.dropColumn('conflicts')
    })
  }
}

module.exports = AttachmentSchema
