'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Filter = require('bad-words')
const Badwords = require('badwords-list')

class ProfanityFilterGunbuild {
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

    let name = request.only('name')

    if(filter.isProfane(name.name)) {
      return response.status(422).json({
        message: `Please don't use profanity in your title!`,
      })
    }

    await next()
  }
}

module.exports = ProfanityFilterGunbuild
