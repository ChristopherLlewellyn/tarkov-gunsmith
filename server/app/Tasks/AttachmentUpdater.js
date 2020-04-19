'use strict'

const Task = use('Task')
const AttachmentUpdaterService = use("App/Services/AttachmentUpdaterService")

class AttachmentUpdater extends Task {
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
    console.log("Attachment Updater Task waiting...")
    return '0 * * * *'
  }

  async handle () {
    console.log("Starting Attachment Updater Task...")
    
    try {
      await AttachmentUpdaterService.getNewAttachments()
      await AttachmentUpdaterService.updateExistingAttachments()
    } catch (e) {
      console.log("Error running Attachment Updater task. ", e)
    }

    console.log("Completed Attachment Updater Task.")
  }
}

module.exports = AttachmentUpdater
