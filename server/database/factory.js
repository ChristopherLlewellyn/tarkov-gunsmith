'use strict'

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use('Factory')
const Hash = use('Hash')

Factory.blueprint('App/Models/User', async (faker) => {
  return {
    username: faker.username(),
    email: faker.email(),
    password: await Hash.make(faker.password()),
    is_active: 1
  }
})

Factory.blueprint('App/Models/Gun', (faker, i, data) => {
  return {
    // Tarkov-Database data
    name:                     data.name,
    type:                     data.class,
    horizontal_recoil:        data.recoilHorizontal,
    vertical_recoil:          data.recoilVertical,
    ergonomics:               data.ergonomics,
    rpm:                      data.rof,
    caliber:                  data.caliber,
    short_name:               data.shortName,
    description:              data.description,
    price:                    data.price,
    weight:                   data.weight,
    modified:                 data._modified,
    kind:                     data._kind,
    slots:                    data.slots,
    bsg_id:                   data._id,
    // TarkovLens data
    avg_24h_price:        data.avg24hPrice,
    trader_name:          data.traderName,
    trader_price:         data.traderPrice,
    trader_price_cur:     data.traderPriceCur,
    icon:                 data.icon,
    img:                  data.img,
    img_big:              data.imgBig,
    tarkov_market_link:   data.tarkovMarketLink,
    wiki_link:            data.wikiLink
  }
})

Factory.blueprint('App/Models/Attachment', (faker, i, data) => {
  return {
    // Tarkov-Database data
    name:                       data.name,
    type:                       data.type,
    recoil_modifier:            data.recoil,
    ergonomics_modifier:        data.ergonomics,
    accuracy_modifier:          data.accuracy,
    muzzle_velocity_modifier:   data.velocity,
    bsg_id:                     data._id,
    short_name:                 data.shortName,
    description:                data.description,
    price:                      data.price,
    weight:                     data.weight,
    modified:                   data._modified,
    kind:                       data._kind,
    slots:                      data.slots,
    compatibility:              data.compatibility,
    conflicts:                  data.conflicts,
    // TarkovLens data
    avg_24h_price:          data.avg24hPrice,
    trader_name:            data.traderName,
    trader_price:           data.traderPrice,
    trader_price_cur:       data.traderPriceCur,
    icon:                   data.icon,
    img:                    data.img,
    img_big:                data.imgBig,
    tarkov_market_link:     data.tarkovMarketLink,
    wiki_link:              data.wikiLink
  }
})
