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
const TarkovLensService = use('App/Services/TarkovLensService')

class AttachmentSeeder {
  async run () {
    // A JWT auth token is required to make calls to the Tarkov-Database API
    let token = await TarkovDatabaseService.getNewAuthToken()
    let attachments = await TarkovDatabaseService.getModifications(token)

    // TarkovLens has additional data that we want, such as market prices and images
    let tarkovLensService = await TarkovLensService.getItemsBasicInfo()

    // Find and merge the TarkovLens data into our list of attachments
    for (let i in attachments) {
      let index = tarkovLensService.findIndex( ({ _id }) => _id === attachments[i]._id )

      // If the attachment is found...
      if ( !(index === -1) ) {
        attachments[i].avg24hPrice =       tarkovLensService[index].avg24hPrice
        attachments[i].traderName =        null // not used
        attachments[i].traderPrice =       null // not used
        attachments[i].traderPriceCur =    null // not used
        attachments[i].icon =              tarkovLensService[index].icon
        attachments[i].img =               tarkovLensService[index].img
        attachments[i].imgBig =            tarkovLensService[index].imgBig
        attachments[i].tarkovMarketLink =  null // not used
        attachments[i].wikiLink =          tarkovLensService[index].wikiLink
      }
    }

    // Clear attachments table before seeding
    await Database.table('attachments').del()
    
    for (let i in attachments) {
      // All JSON objects need to be stringified before they can be inserted into the database
      attachments[i].slots = JSON.stringify(attachments[i].slots)
      attachments[i].compatibility = JSON.stringify(attachments[i].compatibility)
      attachments[i].conflicts = JSON.stringify(attachments[i].conflicts)
      
      try {
        const newAttachment = await Factory.model('App/Models/Attachment').create(attachments[i])
      } catch (err) {
        console.log(`\nError creating new attachment '${attachments[i].name}' with Factory (AttachmentSeeder). See error below:`)
        console.log(err + '\n')
      }
    }
  }
}

module.exports = AttachmentSeeder
