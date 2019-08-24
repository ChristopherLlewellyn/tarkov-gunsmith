'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GunBuildAttachmentSchema extends Schema {
  up () {
    this.create('gun_build_attachments', (table) => {
      table.increments()
      table.integer('gun_build_id').unsigned().index('gun_build_id')
      table.integer('attachment_id').unsigned().index('attachment_id')
      table.integer('parent_id').unsigned().references('id').inTable('gun_build_attachments')
      
      table.foreign('gun_build_id').references('gun_builds.id').onDelete('cascade')
      table.foreign('attachment_id').references('attachments.id').onDelete('cascade')
    })
  }

  down () {
    this.drop('gun_build_attachments')
  }
}

module.exports = GunBuildAttachmentSchema
