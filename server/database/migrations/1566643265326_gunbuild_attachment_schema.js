'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GunbuildAttachmentSchema extends Schema {
  up () {
    this.create('gunbuild_attachment', (table) => {
      table.increments()
      table.integer('gunbuild_id').unsigned().index('gunbuild_id')
      table.integer('attachment_id').unsigned().index('attachment_id')
      table.integer('parent_id').unsigned().references('id').inTable('gunbuild_attachment')
      
      table.foreign('gunbuild_id').references('gunbuilds.id').onDelete('cascade')
      table.foreign('attachment_id').references('attachments.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('gunbuild_attachment')
  }
}

module.exports = GunbuildAttachmentSchema
