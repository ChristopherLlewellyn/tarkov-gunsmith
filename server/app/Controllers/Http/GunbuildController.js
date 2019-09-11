'use strict'

const Gunbuild = use('App/Models/Gunbuild')
const Gun = use('App/Models/Gun')
const AuthService = use('App/Services/AuthService')

class GunbuildController {

  // return all gunbuilds
  async index({ response }) {
    const gunbuilds = await Gunbuild.all()

    response.status(200).json({
      message: 'Here is every gunbuild',
      data: gunbuilds
    })
  }

  // return one gunbuild
  async show({ request, response, params: { id } }) {
    const gunbuild = request.gunbuild
    
    response.status(200).json({
      message: 'Here is your gunbuild',
      data: gunbuild
    })
  }

  // create a new gunbuild (requires authentication)
  async create({ auth, request, response }) {
    const user = await auth.getUser()
    const {  
      gun_id, 
      name,
      horizontal_recoil_final,
      vertical_recoil_final,
      ergonomics_final
      } 
      = request.all()

    const gunbuild = await user.gunbuilds().create({
      gun_id, 
      name,
      horizontal_recoil_final,
      vertical_recoil_final,
      ergonomics_final
    })
    
    response.status(201).json({
      message: 'Successfully created a new gunbuild',
      data: gunbuild
    })
  }

  // update a gunbuild (requires authentication)
  async update({ auth, request, response, params: { id } }) {
    const user = await auth.getUser()
    const gunbuild = request.gunbuild
    AuthService.verifyPermission(gunbuild, user)

    const { 
      gun_id, 
      name,
      horizontal_recoil_final,
      vertical_recoil_final,
      ergonomics_final
    } = request.post()

    gunbuild.merge({
      gun_id:                  gun_id,
      name:                    name,
      horizontal_recoil_final: horizontal_recoil_final,
      vertical_recoil_final:   vertical_recoil_final,
      ergonomics_final:        ergonomics_final
    })

    await gunbuild.save()

    response.status(200).json({
      message: 'Successfully updated this gunbuild',
      data: gunbuild
    })
  }

  // delete a gunbuild (requires authentication)
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

}

module.exports = GunbuildController
