'use strict'
const Database = use('Database')

class AttachmentController {

  // return all attachments
  async index({ response }) {
    const attachments = await Database
      .raw(
        `Select a.name,a.recoil_modifier,a.ergonomics_modifier,a.accuracy_modifier,a.muzzle_velocity_modifier,a.image, s.name 
        as type 
        from attachments a 
        join slots s 
        on s.id = a.slot_id`)

    attachments.splice(1, 1) // a raw database query returns two objects, the 2nd object is some driver information which we don't want, so remove it

    response.status(200).json({
      message: 'Here is every attachment',
      data: attachments
    })
  }

}

module.exports = AttachmentController
