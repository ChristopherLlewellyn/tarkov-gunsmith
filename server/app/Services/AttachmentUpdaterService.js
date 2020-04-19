'use strict'

const Factory = use('Factory')
const Attachment = use('App/Models/Attachment')
const TarkovDatabaseService = use('App/Services/TarkovDatabaseService')
const TarkovMarketService = use('App/Services/TarkovMarketService')

// This service updates the 'attachments' database table by fetching data from Tarkov-Database and Tarkov-Market
// It adds any new attachments and updates all the data of existing attachments
// This service was primarily made for the 'AttachmentUpdater' automatic task 

class AttachmentUpdaterService {

  // Adds new attachments that don't already exist in the database
  async getNewAttachments() {
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

    for (let i in attachments) {
      // Check if attachment already exists in the database
      let attachment = await Attachment.findBy('bsg_id', attachments[i]._id)

      // If attachment doesn't already exist, add it to the database
      if (!attachment) {
        // JSON values must be stringified before being added to the database
        attachments[i].slots = JSON.stringify(attachments[i].slots)
        attachments[i].compatibility = JSON.stringify(attachments[i].compatibility)
        attachments[i].conflicts = JSON.stringify(attachments[i].conflicts)

        const newAttachment = await Factory.model('App/Models/Attachment').create(attachments[i])
      }   
    }
  }

  // Update data of all attachments that already exist in the database
  async updateExistingAttachments() {
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

    // Find each attachment record and merge the new data from Tarkov-Database
    for (let i in attachments) {
      // JSON values must be stringified before being added to the database
      attachments[i].slots = JSON.stringify(attachments[i].slots)
      attachments[i].compatibility = JSON.stringify(attachments[i].compatibility)
      attachments[i].conflicts = JSON.stringify(attachments[i].conflicts)

      await Attachment.query().where('bsg_id', attachments[i]._id)
        .update({
          // Tarkov-Database data
          name:                       attachments[i].name,
          type:                       attachments[i].type,
          recoil_modifier:            attachments[i].recoil,
          ergonomics_modifier:        attachments[i].ergonomics,
          accuracy_modifier:          attachments[i].accuracy,
          muzzle_velocity_modifier:   attachments[i].velocity,
          bsg_id:                     attachments[i]._id,
          short_name:                 attachments[i].shortName,
          description:                attachments[i].description,
          price:                      attachments[i].price,
          weight:                     attachments[i].weight,
          modified:                   attachments[i]._modified,
          kind:                       attachments[i]._kind,
          slots:                      attachments[i].slots,
          compatibility:              attachments[i].compatibility,
          conflicts:                  attachments[i].conflicts,
          // Tarkov-Market data
          avg_24h_price:              attachments[i].avg24hPrice,
          trader_name:                attachments[i].traderName,
          trader_price:               attachments[i].traderPrice,
          trader_price_cur:           attachments[i].traderPriceCur,
          icon:                       attachments[i].icon,
          img:                        attachments[i].img,
          img_big:                    attachments[i].imgBig,
          tarkov_market_link:         attachments[i].tarkovMarketLink,
          wiki_link:                  attachments[i].wikiLink
        })
    }
  }
}

module.exports = new AttachmentUpdaterService()
