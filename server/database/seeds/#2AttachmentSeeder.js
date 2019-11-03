'use strict'

/*
|--------------------------------------------------------------------------
| AttachmentSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const XLSX = require('xlsx')
const Slot = use('App/Models/Slot')

class AttachmentSeeder {
  async run () {
    const workbook = XLSX.readFile('Database/Seeds/seeds.xlsx')
    let attachments = XLSX.utils.sheet_to_json(workbook.Sheets['Attachments']) //json object
    
    for (var row in attachments) {
      const slot = await Slot.findBy('name', attachments[row].slot)
      attachments[row].slotId = slot.id
      const newAttachment = await Factory.model('App/Models/Attachment').create(attachments[row])
    }
  }
}

module.exports = AttachmentSeeder
