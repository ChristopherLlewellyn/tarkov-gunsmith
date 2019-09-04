'use strict'

/*
|--------------------------------------------------------------------------
| SlotSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const XLSX = require('xlsx')

class SlotSeeder {
  async run () {
    const workbook = XLSX.readFile('Database/Seeds/seeds.xlsx')
    let slots = XLSX.utils.sheet_to_json(workbook.Sheets['Slots']) //json object
    
    for (var slot in slots) {
      const newSlot = await Factory.model('App/Models/Slot').create(slots[slot])
    }
  }
}

module.exports = SlotSeeder
