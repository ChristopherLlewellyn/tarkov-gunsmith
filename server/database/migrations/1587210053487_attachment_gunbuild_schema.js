'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AttachmentGunbuildSchema extends Schema {
  up () {
    this.drop('attachment_gunbuild')
  }

  down () {
    this.create('attachment_gunbuild', (table) => {
      // reverse alterations
      table.increments()

      table.integer('attachment_id').unsigned()
        .references('id').inTable('attachments').onDelete('cascade')

      table.integer('gunbuild_id').unsigned()
        .references('id').inTable('gunbuilds').onDelete('cascade')

      table.integer('quantity')
    })
  }
}

module.exports = AttachmentGunbuildSchema
