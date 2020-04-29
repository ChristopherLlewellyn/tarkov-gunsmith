'use strict'

const Task = use('Task')
const GunbuildUpdaterService = use("App/Services/GunbuildUpdaterService")

class GunbuildUpdater extends Task {
  static get schedule () {
    /*
      *    *    *    *    *    *
      ┬    ┬    ┬    ┬    ┬    ┬
      │    │    │    │    │    │
      │    │    │    │    │    └ day of week (0 - 7) (0 or 7 is Sun)
      │    │    │    │    └───── month (1 - 12)
      │    │    │    └────────── day of month (1 - 31)
      │    │    └─────────────── hour (0 - 23)
      │    └──────────────────── minute (0 - 59) 
      └───────────────────────── second (0 - 59, OPTIONAL) 
    */
    console.log("Gunbuild Updater Task waiting...")
    return '2 * * * *'
  }

  async handle () {
    console.log("Starting Gunbuild Updater Task...")

    try {
      await GunbuildUpdaterService.updateGunbuilds()
    } catch (e) {
      console.log("Error running Gunbuild Updater task. ", e)
    }

    console.log("Completed Gunbuild Updater Task.")
  }
}

module.exports = GunbuildUpdater
