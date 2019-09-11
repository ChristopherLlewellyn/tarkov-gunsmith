'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const User = use('App/Models/User')

class FindUser {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response, params: { id } }, next) {
    // call next to advance the request
    const user = await User.find(id)

    if (!user) {
      return response.status(404).json({
        message: 'User not found',
        id
      })
    }

    request.user = user

    await next()
  }
}

module.exports = FindUser
