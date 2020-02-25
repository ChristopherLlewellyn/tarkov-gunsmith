'use strict'

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use('Schema')

class VoteCountSchema extends Schema {
  up () {
    this.create('vote_counts', (table) => {
      table.increments()

      table.integer('gunbuild_id').unsigned()
        .references('id').inTable('gunbuilds').onDelete('cascade')

      table.integer('votes')
    })
  }

  down () {
    this.drop('vote_counts')
  }
}

module.exports = VoteCountSchema
