'use strict'

const Database = use('Database')
const Gunbuild = use('App/Models/Gunbuild')
const Gun = use('App/Models/Gun')
const User = use('App/Models/User')

class GunbuildService {

  // This function accepts request params for querying data
  async index(query) {
    let gunbuilds = await Database
      .select(
        "users.username",

        "gunbuilds.id",
        "gunbuilds.user_id",
        "gunbuilds.gun_id",
        "gunbuilds.name",
        "gunbuilds.horizontal_recoil_final",
        "gunbuilds.vertical_recoil_final",
        "gunbuilds.ergonomics_final",
        "gunbuilds.created_at",
        "gunbuilds.updated_at",
        "gunbuilds.market_price",

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

      //* Parameters in the GET request are applied to the query in .modify below
      .modify(function (queryBuilder) {
        if (query.gun && query.gun != 'Any' && query.gun != '') {
          queryBuilder.where('guns.name', query.gun)
        }

        if (query.priceRangeMin && query.priceRangeMax) {
          queryBuilder.whereBetween('market_price', [query.priceRangeMin, query.priceRangeMax])
        }

        if (query.username) {
          queryBuilder.where('users.username', query.username)
        }

        //* Limit and Offset here
        if (query.offset) {
          queryBuilder.offset(parseInt(query.offset, 10))
        }

        if(query.limit) {
          queryBuilder.limit(query.limit)
        }

        //* Order by and direction (desc/asc)
        if(query.orderBy && query.orderByDirection) {
          queryBuilder.orderBy(query.orderBy, query.orderByDirection)
          // We use a second order by to prevent duplication - see the following for an explanation:
          // https://stackoverflow.com/questions/2077803/paging-in-sql-with-limit-offset-sometimes-results-in-duplicates-on-different-pag
          queryBuilder.orderBy('id', 'asc')
        }
      })

    return gunbuilds
  }

  async indexByUser(id) {
    let gunbuilds = await Database
      .select(
        "users.username",

        "gunbuilds.id",
        "gunbuilds.user_id",
        "gunbuilds.gun_id",
        "gunbuilds.name",
        "gunbuilds.horizontal_recoil_final",
        "gunbuilds.vertical_recoil_final",
        "gunbuilds.ergonomics_final",
        "gunbuilds.created_at",
        "gunbuilds.updated_at",
        "gunbuilds.market_price",

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


    return {
      gunbuild,
      gun,
      user
    }
  }
}

module.exports = new GunbuildService()
