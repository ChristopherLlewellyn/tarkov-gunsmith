'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class DefaultAttachmentsSchema extends Schema {
  up () {
    this.create('default_attachments', (table) => {
      table.increments()
      table.integer('gun_id').unsigned().references('id').inTable('guns')
      table.integer('attachment_id').unsigned().references('id').inTable('attachments')
    })
  }

  down () {
    this.drop('default_attachments')
  }
}

module.exports = DefaultAttachmentsSchema
