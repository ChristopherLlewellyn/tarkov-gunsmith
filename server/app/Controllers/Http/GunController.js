'use strict'
const Gun = use('App/Models/Gun')
const Database = use('Database')

class GunController {

  // return all guns
  async index({ response }) {
    const guns = await Gun.all()
    const defaultAttachments = await Database.table('default_attachments')

    response.status(200).json({
      message: 'Here is every gun',
      data: 
        { 
          guns, 
          defaultAttachments, 
        }
    })
  }

}

module.exports = GunController
