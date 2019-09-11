'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const Gunbuild = use('App/Models/Gunbuild')

class FindGunbuild {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response, params: { id } }, next) {
    // call next to advance the request
    const gunbuild = await Gunbuild.find(id)

    if (!gunbuild) {
      return response.status(404).json({
        message: 'Gunbuild not found',
        id
      })
    }

    request.gunbuild = gunbuild

    await next()
  }
}

module.exports = FindGunbuild
