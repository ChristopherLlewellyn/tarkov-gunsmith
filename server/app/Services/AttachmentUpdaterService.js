'use strict'

const Database = use('Database')
const Attachment = use('App/Models/Attachment')
const TarkovDatabaseService = use('App/Services/TarkovDatabaseService')
const TarkovLensService = use('App/Services/TarkovLensService')

// This service updates the 'attachments' database table by fetching data from Tarkov-Database and TarkovLens
// It adds any new attachments and updates all the data of existing attachments
// This service was primarily made for the 'AttachmentUpdater' automatic task 

class AttachmentUpdaterService {

  // Adds new attachments that don't already exist in the database
  async getNewAttachments() {
    // A JWT auth token is required to make calls to the Tarkov-Database API
    let token = await TarkovDatabaseService.getNewAuthToken()
    let attachments = await TarkovDatabaseService.getModifications(token)

    // TarkovLens has additional data that we want, such as market prices and images
    let tarkovLensItems = await TarkovLensService.getItemsBasicInfo()

    // Find and merge the TarkovLens data into our list of attachments
    for (let i in attachments) {
      let index = tarkovLensItems.findIndex( ({ _id }) => _id === attachments[i]._id )

      // If the attachment is found...
      if ( !(index === -1) ) {
        attachments[i].avg24hPrice =       tarkovLensItems[index].avg24hPrice
        attachments[i].traderName =        null // not used
        attachments[i].traderPrice =       null // not used
        attachments[i].traderPriceCur =    null // not used
        attachments[i].icon =              tarkovLensItems[index].icon
        attachments[i].img =               tarkovLensItems[index].img
        attachments[i].imgBig =            tarkovLensItems[index].imgBig
        attachments[i].tarkovMarketLink =  null // not used
        attachments[i].wikiLink =          tarkovLensItems[index].wikiLink
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

        try {
          const newAttachment = await Database.table('attachments').insert({
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
            slots:                      attachments[i].slots ? attachments[i].slots : '{}',
            compatibility:              attachments[i].compatibility,
            conflicts:                  attachments[i].conflicts ? attachments[i].conflicts : '{}',
            // TarkovLens data
            avg_24h_price:              attachments[i].avg24hPrice,
            trader_name:                null, // not used
            trader_price:               null, // not used
            trader_price_cur:           null, // not used
            icon:                       attachments[i].icon,
            img:                        attachments[i].img,
            img_big:                    attachments[i].imgBig,
            tarkov_market_link:         null, // not used
            wiki_link:                  attachments[i].wikiLink
          })
        } catch (err) {
          console.log(`\nError creating new attachment '${attachments[i].name}' with Factory (AttachmentUpdaterService). See error below:`)
          console.log(err + '\n')
        }
      }   
    }
  }

  // Update data of all attachments that already exist in the database
  async updateExistingAttachments() {
    // A JWT auth token is required to make calls to the Tarkov-Database API
    let token = await TarkovDatabaseService.getNewAuthToken()
    let attachments = await TarkovDatabaseService.getModifications(token)

    // TarkovLens has additional data that we want, such as market prices and images
    let tarkovLensItems = await TarkovLensService.getItemsBasicInfo()

    // Find and merge the TarkovLens data into our list of attachments
    for (let i in attachments) {
      let index = tarkovLensItems.findIndex( ({ _id }) => _id === attachments[i]._id )

      // If the attachment is found...
      if ( !(index === -1) ) {
        attachments[i].avg24hPrice =       tarkovLensItems[index].avg24hPrice
        attachments[i].traderName =        null // not used
        attachments[i].traderPrice =       null // not used
        attachments[i].traderPriceCur =    null // not used
        attachments[i].icon =              tarkovLensItems[index].icon
        attachments[i].img =               tarkovLensItems[index].img
        attachments[i].imgBig =            tarkovLensItems[index].imgBig
        attachments[i].tarkovMarketLink =  null // not used
        attachments[i].wikiLink =          tarkovLensItems[index].wikiLink
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
          slots:                      attachments[i].slots ? attachments[i].slots : '{}',
          compatibility:              attachments[i].compatibility,
          conflicts:                  attachments[i].conflicts ? attachments[i].conflicts : '{}',
          // TarkovLens data
          avg_24h_price:              attachments[i].avg24hPrice,
          trader_name:                null, // not used
          trader_price:               null, // not used
          trader_price_cur:           null, // not used
          icon:                       attachments[i].icon,
          img:                        attachments[i].img,
          img_big:                    attachments[i].imgBig,
          tarkov_market_link:         null, // not used
          wiki_link:                  attachments[i].wikiLink
        })
    }
  }
}

module.exports = new AttachmentUpdaterService()
