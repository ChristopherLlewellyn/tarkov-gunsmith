'use strict'
const Gun = use('App/Models/Gun')
const Database = use('Database')

class GunController {

  // return all guns
  async index({ response }) {
    const guns = await Gun
      .query()
      .select('*')
      .orderBy('short_name', 'asc')
      .fetch()

    response.status(200).json({
      message: 'Here is every gun',
      guns
    })
  }

}

module.exports = GunController
