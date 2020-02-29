'use strict'

const Gunbuild = use('App/Models/Gunbuild')
const VoteCount = use('App/Models/VoteCount')
const Database = use('Database')
const AuthService = use('App/Services/AuthService')

class GunbuildController {

  // return all gunbuilds
  async index({ response }) {
    const gunbuilds = await Database.raw(`
      SELECT 
      user.username, 
      gunbuild.*, 
      gun.name AS gun_name, gun.image AS gun_image, gun.calibre AS gun_calibre, gun.rpm AS gun_rpm, gun.type AS gun_type,
      votecount.votes

      FROM Gunbuilds AS gunbuild 

      INNER JOIN Guns AS gun 
      ON gunbuild.gun_id = gun.id

      INNER JOIN Users AS user
      ON user.id = gunbuild.user_id
      
      INNER JOIN vote_counts AS votecount
      ON votecount.gunbuild_id = gunbuild.id
      `)

    gunbuilds.pop() // clean up junk from RAW query

    response.status(200).json({
      message: 'Here is every gunbuild',
      data: gunbuilds
    })
  }

  // return all gunbuilds for logged in user
  async indexMine({ auth, response }) {
    const user = await auth.getUser()
    const gunbuilds = await Database.raw(`
      SELECT 
      user.username, 
      gunbuild.*, 
      gun.name AS gun_name, gun.image AS gun_image, gun.calibre AS gun_calibre, gun.rpm AS gun_rpm, gun.type AS gun_type,
      votecount.votes

      FROM Gunbuilds AS gunbuild 

      INNER JOIN Guns AS gun 
      ON gunbuild.gun_id = gun.id

      INNER JOIN Users AS user
      ON user.id = gunbuild.user_id

      INNER JOIN vote_counts AS votecount
      ON votecount.gunbuild_id = gunbuild.id

      WHERE gunbuild.user_id = ${user.id}
      `)

    gunbuilds.pop() // clean up junk from RAW query

    response.status(200).json({
      message: 'Here is every gunbuild for this user',
      data: gunbuilds
    })
  }

  // return all gunbuilds by gun
  async indexByGun({ response, params: { id } }) {
    const gunbuilds = await Database.raw(`
      SELECT 
      user.username,
      gunbuild.*, 
      gun.name AS gun_name, gun.image AS gun_image, gun.calibre AS gun_calibre, gun.rpm AS gun_rpm, gun.type AS gun_type,
      votecount.votes

      FROM Gunbuilds AS gunbuild 

      INNER JOIN Guns AS gun 
      ON gunbuild.gun_id = gun.id

      INNER JOIN Users AS user
      ON user.id = gunbuild.user_id

      INNER JOIN vote_counts AS votecount
      ON votecount.gunbuild_id = gunbuild.id

      WHERE gunbuild.gun_id = ${id}
      `)

    gunbuilds.pop() // clean up junk from RAW query

    response.status(200).json({
      message: `Here is every gunbuild for gun ${id}`,
      data: gunbuilds
    })
  }

  // return one gunbuild with attachments and username
  async show({ response, params: { id } }) {
    const gunbuild = await Gunbuild
      .query()
      .with('attachments')
      .with('voteCount')
      .where('id', id)
      .fetch()
    
    const gun = await Database.raw(
      `SELECT gun.* FROM Guns AS gun INNER JOIN Gunbuilds AS gunbuild ON gunbuild.gun_id = gun.id WHERE gunbuild.id = ${id}`
    )
    gun.pop() // clean up junk from RAW query

    const user = await Database.raw(
      `SELECT user.username FROM Users AS user INNER JOIN Gunbuilds AS gunbuild ON gunbuild.user_id = user.id WHERE gunbuild.id = ${id}`
      )
    user.pop() // clean up junk from RAW query
    
    response.status(200).json({
      message: 'Here is your gunbuild',
      gunbuild,
      gun,
      user
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
