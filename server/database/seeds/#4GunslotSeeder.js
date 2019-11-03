'use strict'

/*
|--------------------------------------------------------------------------
| GunslotSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Database = use('Database')
const XLSX = require('xlsx')
const Gun = use('App/Models/Gun')
const Slot = use('App/Models/Slot')

class GunslotSeeder {
  async run () {
    const workbook = XLSX.readFile('Database/Seeds/seeds.xlsx')
    let gunSlots = XLSX.utils.sheet_to_json(workbook.Sheets['GunSlots']) //json object
    
    for (var row in gunSlots) {
      const gun = await Gun.findBy('name', gunSlots[row].gun)
      const slot = await Slot.findBy('name', gunSlots[row].slot)

      /* We insert directly to the database rather than using a factory blueprint
      because blueprints don't work properly with pivot tables */ 
      await Database.table('gun_slot')
        .insert([{ 
          gun_id: gun.id, 
          slot_id: slot.id
        }])
    }
  }
}

module.exports = GunslotSeeder
