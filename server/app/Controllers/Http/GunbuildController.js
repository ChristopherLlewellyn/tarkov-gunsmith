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
      data: gunbuilds
    })
  }

  // return all gunbuilds for logged in user
  async indexMine({ auth, response }) {
    const user = await auth.getUser()
    const gunbuilds = await GunbuildService.indexByUser(user.id)

    response.status(200).json({
      message: 'Here is every gunbuild for this user',
      data: gunbuilds
    })
  }

  // return all gunbuilds by gun
  async indexByGun({ response, params: { id } }) {
    const gunbuilds = await GunbuildService.indexByGun(id)

    response.status(200).json({
      message: `Here is every gunbuild for gun ${id}`,
      data: gunbuilds
    })
  }

  // return one gunbuild with attachments and username
  async show({ response, params: { id } }) {
    const gunbuild = await GunbuildService.show(id)
    
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
      ergonomics_final,
      attachments
      } 
      = request.all()

    const gunbuild = await user.gunbuilds().create({
      gun_id, 
      name,
      horizontal_recoil_final,
      vertical_recoil_final,
      ergonomics_final
    })

    const voteCount = await VoteCount.create({gunbuild_id: gunbuild.id, votes: 0})

    const attachmentIds = []
    for (var i = 0; i < attachments.length; i++) {
      attachmentIds.push(attachments[i].id)
    }
    const gunbuildAttachments = await gunbuild.attachments().attach(attachmentIds, row => {
      row.quantity = attachments.filter(attachment => attachment.id === row.attachment_id).length
    })
    
    response.status(201).json({
      message: 'Successfully created a new gunbuild',
      data: { gunbuild, gunbuildAttachments, voteCount }
    })
  }

  // update a gunbuild (requires authentication and permission)
  async update({ auth, request, response, params: { id } }) {
    const user = await auth.getUser()
    const gunbuild = request.gunbuild
    AuthService.verifyPermission(gunbuild, user)

    const { 
      gun_id, 
      name,
      horizontal_recoil_final,
      vertical_recoil_final,
      ergonomics_final,
      attachments
    } = request.post()

    gunbuild.merge({
      gun_id:                  gun_id,
      name:                    name,
      horizontal_recoil_final: horizontal_recoil_final,
      vertical_recoil_final:   vertical_recoil_final,
      ergonomics_final:        ergonomics_final
    })

    await gunbuild.save()

    const attachmentIds = []
    for (var i = 0; i < attachments.length; i++) {
      attachmentIds.push(attachments[i].id)
    }
    await gunbuild.attachments().detach()
    const gunbuildAttachments = await gunbuild.attachments().attach(attachmentIds, row => {
      row.quantity = attachments.filter(attachment => attachment.id === row.attachment_id).length
    })

    response.status(200).json({
      message: 'Successfully updated this gunbuild',
      data: { gunbuild, gunbuildAttachments }
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
