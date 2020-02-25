'use strict'
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

const axios = use('axios')
const Env = use('Env')
const querystring = use('querystring')

class VerifyCaptcha {
  /**
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Function} next
   */
  async handle ({ request, response }, next) {
    // call next to advance the request
    const data = request.only(['captcha'])

  try {
    const data_request = await axios.post('https://www.google.com/recaptcha/api/siteverify', querystring.stringify({ secret: Env.get('RECAPTCHA_PRIVATE_KEY'), response: data['captcha'] }))
    if (!data_request.data.success) {
      // If the recaptcha check fails
      return response.status(429).json({
        message: 'Failed reCaptcha test',
      })
    }
  } catch (error) {
    return response.status(500).json({
      message: 'Error verifying reCaptcha',
    })
  }

    await next()
  }
}

module.exports = VerifyCaptcha
