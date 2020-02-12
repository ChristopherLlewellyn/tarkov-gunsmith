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
    image:                    data.image,
    name:                     data.name,
    type:                     data.type,
    horizontal_recoil_base:   data.horizontal_recoil_base,
    vertical_recoil_base:     data.vertical_recoil_base,
    ergonomics_base:          data.ergonomics_base,
    rpm:                      data.rpm,
    calibre:                  data.calibre,
  }
})

Factory.blueprint('App/Models/Attachment', (faker, i, data) => {
  return {
    name:                       data.name,
    type:                       data.type,
    recoil_modifier:            data.recoil_modifier,
    ergonomics_modifier:        data.ergonomics_modifier,
    accuracy_modifier:          data.accuracy_modifier,
    muzzle_velocity_modifier:   data.muzzle_velocity_modifier,
    image:                      data.image
  }
})
