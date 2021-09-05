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
const TarkovLensService = use('App/Services/TarkovLensService')

class GunSeeder {
  async run () {

    // A JWT auth token is required to make calls to the Tarkov-Database API
    let token = await TarkovDatabaseService.getNewAuthToken()
    let guns = await TarkovDatabaseService.getItemsByKind(token, 'firearm')

    // TarkovLens has additional data that we want, such as market prices and images
    let tarkovLensItems = await TarkovLensService.getItemsBasicInfo()

    // Find and merge the TarkovLens data into our list of guns
    for (let i in guns) {
      let index = tarkovLensItems.findIndex( ({ _id }) => _id === guns[i]._id )

      // If the gun is found...
      if ( !(index === -1) ) {
        guns[i].avg24hPrice =       tarkovLensItems[index].avg24hPrice
        guns[i].traderName =        null // not used
        guns[i].traderPrice =       null // not used
        guns[i].traderPriceCur =    null // not used
        guns[i].icon =              tarkovLensItems[index].icon
        guns[i].img =               tarkovLensItems[index].img
        guns[i].imgBig =            tarkovLensItems[index].imgBig
        guns[i].tarkovMarketLink =  null // not used
        guns[i].wikiLink =          tarkovLensItems[index].wikiLink
      }
    }

    // Clear gun table before seeding (cascades to other tables e.g. gunbuilds)
    await Database.table('guns').del()

    for (let i in guns) {
      // All JSON objects need to be stringified before they can be inserted into the database
      guns[i].slots = JSON.stringify(guns[i].slots)
      
      try {
        const newGun = await Factory.model('App/Models/Gun').create(guns[i])
      } catch (err) {
        console.log(`\nError creating new gun '${guns[i].name}' with Factory (GunSeeder). See error below:`)
        console.log(err + '\n')
      }
    }
  }
}

module.exports = GunSeeder
