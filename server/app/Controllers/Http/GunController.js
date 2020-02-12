'use strict'
const Gun = use('App/Models/Gun')

class GunController {

  // return all guns
  async index({ response }) {
    const guns = await Gun.all()

    response.status(200).json({
      message: 'Here is every gun',
      data: guns
    })
  }

}

module.exports = GunController
