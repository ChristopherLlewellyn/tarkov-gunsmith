'use strict'

// Database
const Database = use('Database')

// Models
const Gunbuild = use('App/Models/Gunbuild')
const VoteCount = use('App/Models/VoteCount')

// Services
const AuthService = use('App/Services/AuthService')
const GunbuildService = use('App/Services/GunbuildService')

class GunbuildController {

  // return all gunbuilds
  async index({ response }) {
    const gunbuilds = await GunbuildService.index()

    response.status(200).json({
      message: 'Here is every gunbuild',
      gunbuilds
    })
  }

  // return all gunbuilds for logged in user
  async indexMine({ auth, response }) {
    const user = await auth.getUser()
    const gunbuilds = await GunbuildService.indexByUser(user.id)

    response.status(200).json({
      message: 'Here is every gunbuild for this user',
      gunbuilds
    })
  }

  // return all gunbuilds by gun
  async indexByGun({ response, params: { id } }) {
    const gunbuilds = await GunbuildService.indexByGun(id)

    response.status(200).json({
      message: `Here is every gunbuild for gun ${id}`,
      gunbuilds
    })
  }

  // return one gunbuild with attachments and username
  async show({ response, params: { id } }) {
    const gunbuild = await GunbuildService.show(id)
    
    response.status(200).json({
      message: 'Here is your gunbuild',
      gunbuild
    })
  }

  // create a new gunbuild (requires authentication)
  async create({ auth, request, response }) {
    const user = await auth.getUser()
    let {  
      gun_id, 
      name,
      horizontal_recoil_final,
      vertical_recoil_final,
      ergonomics_final,
      build,
      all_items,
      market_price
      } 
      = request.all()
    
    // JSON columns need to be stringified before going to the database
    build = JSON.stringify(build)
    all_items = JSON.stringify(all_items)

    const gunbuild = await user.gunbuilds().create({
      gun_id, 
      name,
      horizontal_recoil_final,
      vertical_recoil_final,
      ergonomics_final,
      build,
      all_items,
      market_price
    })

    const voteCount = await VoteCount.create({
      gunbuild_id: gunbuild.id,
      votes: 0
    })
    
    response.status(201).json({
      message: 'Successfully created a new gunbuild',
      gunbuild,
      voteCount
    })
  }

  // update a gunbuild (requires authentication and permission)
  async update({ auth, request, response, params: { id } }) {
    const user = await auth.getUser()
    const gunbuild = request.gunbuild
    AuthService.verifyPermission(gunbuild, user)

    let { 
      gun_id, 
      name,
      horizontal_recoil_final,
      vertical_recoil_final,
      ergonomics_final,
      build,
      all_items,
      market_price
    } = request.post()

    // JSON columns need to be stringified before going to the database
    build = JSON.stringify(build)
    all_items = JSON.stringify(all_items)

    gunbuild.merge({
      gun_id:                  gun_id,
      name:                    name,
      horizontal_recoil_final: horizontal_recoil_final,
      vertical_recoil_final:   vertical_recoil_final,
      ergonomics_final:        ergonomics_final,
      build:                   build,
      all_items:               all_items,
      market_price:            market_price
    })

    await gunbuild.save()

    response.status(200).json({
      message: 'Successfully updated this gunbuild',
      gunbuild
    })
  }

  // delete a gunbuild (requires authentication and permission)
  async delete({ request, auth, response, params: { id } }) {
    const user = await auth.getUser()
    const gunbuild = request.gunbuild
    AuthService.verifyPermission(gunbuild, user)

    await gunbuild.delete()

    response.status(200).json({
      message: 'Successfully deleted this gunbuild',
      data: gunbuild
    })
  }

  // vote for a gunbuild (+1 or -1)
  async vote({ request, response, params: { id } }) {
    const gunbuild = await Gunbuild.find(id)
    const voteCount = await gunbuild.voteCount().fetch()

    if (request.body.vote > 0) {
      voteCount.votes += 1
    }

    else {
      voteCount.votes -= 1
    }

    await voteCount.save()

    response.status(200).json({
      message: 'Successfully voted on this gunbuild',
      data: gunbuild, voteCount
    })
  }

}

module.exports = GunbuildController
