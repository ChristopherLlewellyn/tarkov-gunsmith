'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class AttachmentGunbuildSchema extends Schema {
  up () {
    this.create('attachment_gunbuild', (table) => {
      table.increments()

      table.integer('attachment_id').unsigned()
        .references('id').inTable('attachments').onDelete('cascade')

      table.integer('gunbuild_id').unsigned()
        .references('id').inTable('gunbuilds').onDelete('cascade')
    })
  }

  down () {
    this.drop('attachment_gunbuild')
  }
}

module.exports = AttachmentGunbuildSchema
