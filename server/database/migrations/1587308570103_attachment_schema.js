'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AttachmentSchema extends Schema {
  up () {
    this.table('attachments', (table) => {
      // alter table
      table.dropColumn('image')
    })
  }

  down () {
    this.table('attachments', (table) => {
      // reverse alterations
      table.string('image')
    })
  }
}

module.exports = AttachmentSchema
