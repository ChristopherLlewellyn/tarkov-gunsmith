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
    password: await Hash.make(faker.password())
  }
})

Factory.blueprint('App/Models/Gun', (faker, i, data) => {
  return {
    name:                     data.name,
    type:                     data.type,
    horizontal_recoil_base:   data.horizontal_recoil_base,
    vertical_recoil_base:     data.vertical_recoil_base,
    ergonomics_base:          data.ergonomics_base,
    rpm:                      data.rpm,
    calibre:                  data.calibre,
    effective_range:          data.effective_range
  }
})

Factory.blueprint('App/Models/Slot', (faker, i, data) => {
  return {
    name: data.name
  }
})

Factory.blueprint('App/Models/Attachment', async (faker, i, data) => {
  return {
    name:                 data.name,
    slot_id:              data.slotId,
    recoil_modifier:      data.recoil,
    ergonomics_modifier:  data.ergonomics
  }
})
