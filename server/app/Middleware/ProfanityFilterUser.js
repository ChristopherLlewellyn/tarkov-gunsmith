'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Filter = require('bad-words')
const Badwords = require('badwords-list')

class ProfanityFilterUser {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response }, next) {
    // call next to advance the request
    let filter = new Filter()
    let badWords = Badwords.array 
    filter.addWords(...badWords);

    let username = request.only('username')

    if(filter.isProfane(username.username)) {
      return response.status(422).json({
        message: `Please don't use profanity in your username!`,
      })
    }

    await next()
  }
}

module.exports = ProfanityFilterUser
