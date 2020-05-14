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
const Database = use('Database')
const TarkovDatabaseService = use('App/Services/TarkovDatabaseService')
const TarkovMarketService = use('App/Services/TarkovMarketService')

class AttachmentSeeder {
  async run () {
    // A JWT auth token is required to make calls to the Tarkov-Database API
    let token = await TarkovDatabaseService.getNewAuthToken()
    let attachments = await TarkovDatabaseService.getModifications(token)

    // Tarkov-Market has additional data that we want, such as market prices, trader prices and images
    // Can't get items by kind like with Tarkov-Database, so we have to get every item and filter the data
    let tarkovMarketItems = await TarkovMarketService.getAllItems()

    // Find and merge the Tarkov-Market data into our list of attachments
    for (let i in attachments) {
      let index = tarkovMarketItems.findIndex( ({ bsgId }) => bsgId === attachments[i]._id )

      // If the attachment is found...
      if ( !(index === -1) ) {
        attachments[i].avg24hPrice =       tarkovMarketItems[index].avg24hPrice
        attachments[i].traderName =        tarkovMarketItems[index].traderName
        attachments[i].traderPrice =       tarkovMarketItems[index].traderPrice
        attachments[i].traderPriceCur =    tarkovMarketItems[index].traderPriceCur
        attachments[i].icon =              tarkovMarketItems[index].icon
        attachments[i].img =               tarkovMarketItems[index].img
        attachments[i].imgBig =            tarkovMarketItems[index].imgBig
        attachments[i].tarkovMarketLink =  tarkovMarketItems[index].link
        attachments[i].wikiLink =          tarkovMarketItems[index].wikiLink
      }
    }

    // Clear attachments table before seeding
    await Database.table('attachments').del()
    
    for (let i in attachments) {
      // All JSON objects need to be stringified before they can be inserted into the database
      attachments[i].slots = JSON.stringify(attachments[i].slots)
      attachments[i].compatibility = JSON.stringify(attachments[i].compatibility)
      attachments[i].conflicts = JSON.stringify(attachments[i].conflicts)
      
      const newAttachment = await Factory.model('App/Models/Attachment').create(attachments[i])
    }
  }
}

module.exports = AttachmentSeeder
