'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class GunbuildSchema extends Schema {
  up () {
    this.create('gunbuilds', (table) => {
      table.increments()
      table.integer('user_id').unsigned().references('id').inTable('users')
      table.integer('gun_id').unsigned().references('id').inTable('guns')
      table.string('name', 255)
      table.integer('horizontal_recoil_final')
      table.integer('vertical_recoil_final')
      table.integer('ergonomics_final')
      table.timestamps()
    })
  }

  down () {
    this.drop('gunbuilds')
  }
}

module.exports = GunbuildSchema
