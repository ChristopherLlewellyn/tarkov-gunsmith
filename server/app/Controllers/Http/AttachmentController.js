'use strict'
const Attachment = use('App/Models/Attachment')

class AttachmentController {

  // return all attachments
  async index({ response }) {
    const attachments = await Attachment.all()

    response.status(200).json({
      message: 'Here is every attachment',
      attachments
    })
  }

}

module.exports = AttachmentController
