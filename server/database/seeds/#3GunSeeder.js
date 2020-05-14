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
const Database = use('Database')
const TarkovDatabaseService = use('App/Services/TarkovDatabaseService')
const TarkovMarketService = use('App/Services/TarkovMarketService')

class GunSeeder {
  async run () {

    // A JWT auth token is required to make calls to the Tarkov-Database API
    let token = await TarkovDatabaseService.getNewAuthToken()
    let guns = await TarkovDatabaseService.getItemsByKind(token, 'firearm')

    // Tarkov-Market has additional data that we want, such as market prices, trader prices and images
    // Can't get items by kind like with Tarkov-Database, so we have to get every item and filter the data
    let tarkovMarketItems = await TarkovMarketService.getAllItems()

    // Find and merge the Tarkov-Market data into our list of guns
    for (let i in guns) {
      let index = tarkovMarketItems.findIndex( ({ bsgId }) => bsgId === guns[i]._id )

      // If the gun is found...
      if ( !(index === -1) ) {
        guns[i].avg24hPrice =       tarkovMarketItems[index].avg24hPrice
        guns[i].traderName =        tarkovMarketItems[index].traderName
        guns[i].traderPrice =       tarkovMarketItems[index].traderPrice
        guns[i].traderPriceCur =    tarkovMarketItems[index].traderPriceCur
        guns[i].icon =              tarkovMarketItems[index].icon
        guns[i].img =               tarkovMarketItems[index].img
        guns[i].imgBig =            tarkovMarketItems[index].imgBig
        guns[i].tarkovMarketLink =  tarkovMarketItems[index].link
        guns[i].wikiLink =          tarkovMarketItems[index].wikiLink
      }
    }

    // Clear gun table before seeding (cascades to other tables e.g. gunbuilds)
    await Database.table('guns').del()

    for (let i in guns) {
      // All JSON objects need to be stringified before they can be inserted into the database
      guns[i].slots = JSON.stringify(guns[i].slots)
      
      const newGun = await Factory.model('App/Models/Gun').create(guns[i])
    }
  }
}

module.exports = GunSeeder
