'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')
const Database = use('Database')

class GunbuildSchema extends Schema {
  up () {
    this.alter('gunbuilds', (table) => {
      // alter table
      table.dropForeign('user_id', 'gunbuilds_user_id_foreign')
      table.dropForeign('gun_id', 'gunbuilds_gun_id_foreign')
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('cascade').alter()
      table.integer('gun_id').unsigned().references('id').inTable('guns').onDelete('cascade').alter()
    })
  }

  down () {
    this.alter('gunbuilds', (table) => {
      // reverse alterations
      table.dropForeign('user_id', 'gunbuilds_user_id_foreign')
      table.dropForeign('gun_id', 'gunbuilds_gun_id_foreign')
      table.integer('user_id').unsigned().references('id').inTable('users').alter()
      table.integer('gun_id').unsigned().references('id').inTable('guns').alter()
    })
  }
}

module.exports = GunbuildSchema
