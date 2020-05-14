'use strict'

const Database = use('Database')
const Gunbuild = use('App/Models/Gunbuild')
const Gun = use('App/Models/Gun')
const User = use('App/Models/User')

class GunbuildService {

  async index() {
    let gunbuilds = await Database
      .select(
        "users.username",

        "gunbuilds.*",

        "guns.name AS gun_name",
        "guns.img AS gun_img",
        "guns.img_big AS gun_img_big",
        "guns.caliber AS gun_caliber",
        "guns.rpm AS gun_rpm",
        "guns.type AS gun_type",

        "vote_counts.votes"
      )
      .from("gunbuilds")
      .innerJoin("guns", "guns.id", "gunbuilds.gun_id")
      .innerJoin("users", "users.id", "gunbuilds.user_id")
      .innerJoin("vote_counts", "vote_counts.gunbuild_id", "gunbuilds.id")

    return gunbuilds
  }

  async indexByUser(id) {
    let gunbuilds = await Database
      .select(
        "users.username",
        "gunbuilds.*",
        "guns.name AS gun_name",
        "guns.img AS gun_img",
        "guns.img_big AS gun_img_big",
        "guns.caliber AS gun_caliber",
        "guns.rpm AS gun_rpm",
        "guns.type AS gun_type",
        "vote_counts.votes"
      )
      .from("gunbuilds")
      .innerJoin("guns", "guns.id", "gunbuilds.gun_id")
      .innerJoin("users", "users.id", "gunbuilds.user_id")
      .innerJoin("vote_counts", "vote_counts.gunbuild_id", "gunbuilds.id")
      .where("gunbuilds.user_id", id)

    return gunbuilds
  }

  async indexByGun(id) {
    let gunbuilds = await Database
      .select(
        "users.username",
        "gunbuilds.*",
        "guns.name AS gun_name",
        "guns.img AS gun_img",
        "guns.img_big AS gun_img_big",
        "guns.caliber AS gun_caliber",
        "guns.rpm AS gun_rpm",
        "guns.type AS gun_type",
        "vote_counts.votes"
      )
      .from("gunbuilds")
      .innerJoin("guns", "guns.id", "gunbuilds.gun_id")
      .innerJoin("users", "users.id", "gunbuilds.user_id")
      .innerJoin("vote_counts", "vote_counts.gunbuild_id", "gunbuilds.id")
      .where("gunbuilds.gun_id", id)
      
    return gunbuilds
  }

  async show(id) {
    let gunbuild = await Gunbuild
      .query()
      .with('voteCount')
      .where('id', id)
      .fetch()
    gunbuild = gunbuild.toJSON()
    gunbuild = gunbuild[0]

    let gun = await Gun
      .query()
      .where("id", gunbuild.gun_id)
      .fetch()
    gun = gun.toJSON()
    gun = gun[0]

    let user = await User
      .query()
      .select("username")
      .where("id", gunbuild.user_id)
      .fetch()
    user = user.toJSON()
    user = user[0]
    

    return { gunbuild, gun, user }
  }  
}

module.exports = new GunbuildService()
