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
    var before = new Date();
    var date = before.getFullYear()+'-'+(before.getMonth()+1)+'-'+before.getDate();
    var time = before.getHours() + ":" + before.getMinutes() + ":" + before.getSeconds();
    var dateTime = date+' '+time;

    console.log("Starting Attachment Updater Task at " + dateTime)
    
    try {
      await AttachmentUpdaterService.getNewAttachments()
      await AttachmentUpdaterService.updateExistingAttachments()
    } catch (e) {
      console.log("Error running Attachment Updater task. ", e)
    }

    var after = new Date();
    date = after.getFullYear()+'-'+(after.getMonth()+1)+'-'+after.getDate();
    time = after.getHours() + ":" + after.getMinutes() + ":" + after.getSeconds();
    dateTime = date+' '+time;
    console.log("Completed Attachment Updater Task at " + dateTime)
  }
}

module.exports = AttachmentUpdater
