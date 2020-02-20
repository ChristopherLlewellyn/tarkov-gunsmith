'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Gun = use('App/Models/Gun')

class FindGun {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response, params: { id } }, next) {
    // call next to advance the request
    const gun = await Gun.find(id)

    if (!gun) {
      return response.status(404).json({
        message: 'Gun not found',
        id
      })
    }

    request.gun = gun

    await next()
  }
}

module.exports = FindGun
