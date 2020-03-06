'use strict'

/*
|--------------------------------------------------------------------------
| DefaultAttachmentsSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const XLSX = require('xlsx')

class DefaultAttachmentsSeeder {
  async run () {
    const workbook = XLSX.readFile(process.cwd() + '/database/seeds/seeds.xlsx')
    let defaultAttachments = XLSX.utils.sheet_to_json(workbook.Sheets['DefaultAttachments']) //json object
    
    for (var row in defaultAttachments) {
      const newDefaultAttachment = await Factory.get('default_attachments').create(defaultAttachments[row])
    }
  }
}

module.exports = DefaultAttachmentsSeeder
