'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DefaultAttachmentsSchema extends Schema {
  up () {
    this.drop('default_attachments')
  }

  down () {
    this.create('default_attachments', (table) => {
      // reverse alterations
      table.increments()
      table.integer('gun_id').unsigned().references('id').inTable('guns')
      table.integer('attachment_id').unsigned().references('id').inTable('attachments')
    })
  }
}

module.exports = DefaultAttachmentsSchema
