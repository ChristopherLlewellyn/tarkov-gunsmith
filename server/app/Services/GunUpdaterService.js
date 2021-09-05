'use strict'

const Database = use('Database')
const Gun = use('App/Models/Gun')
const TarkovDatabaseService = use('App/Services/TarkovDatabaseService')
const TarkovLensService = use('App/Services/TarkovLensService')

// This service updates the 'guns' database table by fetching data from Tarkov-Database and TarkovLens
// It adds any new guns and updates all the data of existing guns
// This service was primarily made for the 'GunUpdater' automatic task 

class GunUpdaterService {

  // Adds new guns that don't already exist in the database
  async getNewGuns() {
    // A JWT auth token is required to make calls to the Tarkov-Database API
    let token = await TarkovDatabaseService.getNewAuthToken()
    let guns = await TarkovDatabaseService.getItemsByKind(token, 'firearm')

    // TarkovLens has additional data that we want, such as market prices and images
    let tarkovLensGuns = await TarkovLensService.getItemsByKind("firearm")

    // Find and merge the TarkovLens data into our list of guns
    for (let i in guns) {
      let index = tarkovLensGuns.findIndex(x => x._id === guns[i]._id)
      if (guns[i].name.includes("Mutant")) {
        console.log(guns[i].name)
        console.log(guns[i]._id)
        console.log(index)
      }

      // If the gun is found...
      if ( !(index === -1) ) {
        guns[i].avg24hPrice =       tarkovLensGuns[index].avg24hPrice
        guns[i].traderName =        null // not used
        guns[i].traderPrice =       null // not used
        guns[i].traderPriceCur =    null // not used
        guns[i].icon =              tarkovLensGuns[index].icon
        guns[i].img =               tarkovLensGuns[index].img
        guns[i].imgBig =            tarkovLensGuns[index].imgBig
        guns[i].tarkovMarketLink =  null // not used
        guns[i].wikiLink =          tarkovLensGuns[index].wikiLink
      }
    }

    for (let i in guns) {
      // Check if gun already exists in the database
      let gun = await Gun.findBy('bsg_id', guns[i]._id)

      // If gun doesn't already exist, add it to the database
      if (!gun) {
        // JSON values must be stringified before being added to the database
        guns[i].slots = JSON.stringify(guns[i].slots)
        const gunToCreate = JSON.parse(JSON.stringify(guns[i]))
        try {
          const newGun = await Database.table('guns').insert({
            // Tarkov-Database data
            name:                     gunToCreate.name,
            type:                     gunToCreate.class,
            horizontal_recoil:        gunToCreate.recoilHorizontal,
            vertical_recoil:          gunToCreate.recoilVertical,
            ergonomics:               gunToCreate.ergonomics,
            rpm:                      gunToCreate.rof,
            caliber:                  gunToCreate.caliber,
            short_name:               gunToCreate.shortName,
            description:              gunToCreate.description,
            price:                    gunToCreate.price,
            weight:                   gunToCreate.weight,
            modified:                 gunToCreate._modified,
            kind:                     gunToCreate._kind,
            slots:                    gunToCreate.slots,
            bsg_id:                   gunToCreate._id,
            // TarkovLens data
            avg_24h_price:            gunToCreate.avg24hPrice,
            trader_name:              gunToCreate.traderName,
            trader_price:             gunToCreate.traderPrice,
            trader_price_cur:         gunToCreate.traderPriceCur,
            icon:                     gunToCreate.icon,
            img:                      gunToCreate.img,
            img_big:                  gunToCreate.imgBig,
            tarkov_market_link:       gunToCreate.tarkovMarketLink,
            wiki_link:                gunToCreate.wikiLink
          })

        } catch (err) {
          console.log(`\nError creating new gun '${gunToCreate.name}' with Factory (GunUpdaterService). See error below:`)
          console.log(err + '\n')
        }
      }   
    }
  }

  // Update data of all guns that already exist in the database
  async updateExistingGuns() {
    // A JWT auth token is required to make calls to the Tarkov-Database API
    let token = await TarkovDatabaseService.getNewAuthToken()
    let guns = await TarkovDatabaseService.getItemsByKind(token, 'firearm')

    // TarkovLens has additional data that we want, such as market prices and images
    let tarkovLensItems = await TarkovLensService.getItemsByKind("firearm")

    // Find and merge the TarkovLens data into our list of guns
    for (let i in guns) {
      let index = tarkovLensItems.findIndex(x => x._id === guns[i]._id)

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

    // Find each gun record and merge the new data from Tarkov-Database
    for (let i in guns) {
      // JSON values must be stringified before being added to the database
      guns[i].slots = JSON.stringify(guns[i].slots)

      await Gun.query().where('bsg_id', guns[i]._id)
        .update({
          // Tarkov-Database data
          name:                     guns[i].name,
          type:                     guns[i].class,
          horizontal_recoil:        guns[i].recoilHorizontal,
          vertical_recoil:          guns[i].recoilVertical,
          ergonomics:               guns[i].ergonomics,
          rpm:                      guns[i].rof,
          caliber:                  guns[i].caliber,
          short_name:               guns[i].shortName,
          description:              guns[i].description,
          price:                    guns[i].price,
          weight:                   guns[i].weight,
          modified:                 guns[i]._modified,
          kind:                     guns[i]._kind,
          slots:                    guns[i].slots,
          bsg_id:                   guns[i]._id,
          // TarkovLens data
          avg_24h_price:            guns[i].avg24hPrice,
          trader_name:              guns[i].traderName,
          trader_price:             guns[i].traderPrice,
          trader_price_cur:         guns[i].traderPriceCur,
          icon:                     guns[i].icon,
          img:                      guns[i].img,
          img_big:                  guns[i].imgBig,
          tarkov_market_link:       guns[i].tarkovMarketLink,
          wiki_link:                guns[i].wikiLink
        })
    }
  }
}

module.exports = new GunUpdaterService()
