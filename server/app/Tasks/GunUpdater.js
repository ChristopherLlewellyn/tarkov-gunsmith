'use strict'

const Task = use('Task')
const GunUpdaterService = use("App/Services/GunUpdaterService")

class GunUpdater extends Task {
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
    console.log("Gun Updater Task waiting...")
    return '0 * * * *'
  }

  async handle () {
    console.log("Starting Gun Updater Task...")

    try {
      await GunUpdaterService.getNewGuns()
      await GunUpdaterService.updateExistingGuns()
    } catch (e) {
      console.log("Error running Gun Updater task. ", e)
    }

    console.log("Completed Gun Updater Task.")
  }
}

module.exports = GunUpdater
