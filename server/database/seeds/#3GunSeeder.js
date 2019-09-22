'use strict'

/*
|--------------------------------------------------------------------------
| GunSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const XLSX = require('xlsx')

class GunSeeder {
  async run () {
    const workbook = XLSX.readFile('Database/Seeds/seeds.xlsx')
    let guns = XLSX.utils.sheet_to_json(workbook.Sheets['Guns']) //json object
    
    for (var gun in guns) {
      const newGun = await Factory.model('App/Models/Gun').create(guns[gun])
    }
  }
}

module.exports = GunSeeder
