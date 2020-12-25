'use strict'

const Database = use('Database')
const Gunbuild = use('App/Models/Gunbuild')
const Gun = use('App/Models/Gun')
const Attachment = use('App/Models/Attachment')

class GunbuildUpdaterService {
  async updateGunbuilds() {
    let ids = await Gunbuild.ids()

    let guns = await Gun.all()
    guns = guns.toJSON()

    let attachments = await Attachment.all()
    attachments = attachments.toJSON()

    for (let id of ids) {
      let gunbuild = await Gunbuild.find(id)

      let build = this.updateBuildTree(JSON.parse(gunbuild.build), guns, attachments)
      let all_items = this.updateAllItems(JSON.parse(gunbuild.all_items), guns, attachments)
      let weaponStatsCalculated = this.calculateWeaponStats(all_items)

      if (weaponStatsCalculated.error == true) {
        console.log(`Failed calculating gunbuild stats: Id = ${gunbuild.id}, Name = ${gunbuild.name}`)
        console.log(`Data in this gunbuild is somehow corrupt - deleting gunbuild`)
        console.log("\n")
        await gunbuild.delete();
      }

      else {
        gunbuild.build = JSON.stringify(build)
        gunbuild.all_items = JSON.stringify(all_items)
        gunbuild.horizontal_recoil_final = weaponStatsCalculated.horizontal_recoil
        gunbuild.vertical_recoil_final = weaponStatsCalculated.vertical_recoil
        gunbuild.ergonomics_final = weaponStatsCalculated.ergonomics
        gunbuild.market_price = weaponStatsCalculated.price
  
        await gunbuild.save()
      }
    }
  }

  updateBuildTree(node, guns, attachments) {
    // If kind = Firearm - update gun details
    if (node.kind == 'firearm') {
      // Find gun by bsg_id 
      let gun = guns.find(({
        bsg_id,
      }) => bsg_id === node.bsg_id);

      if (gun !== null && gun != undefined) {
        node.avg_24h_price = gun.avg_24h_price
        node.caliber = gun.caliber
        node.description = gun.description
        node.ergonomics = gun.ergonomics
        node.horizontal_recoil = gun.horizontal_recoil
        node.icon = gun.icon
        node.img = gun.img
        node.img_big = gun.img_big
        node.modified = gun.modified
        node.name = gun.name
        node.price = gun.price
        node.rpm = gun.rpm
        node.short_name = gun.short_name
        node.tarkov_market_link = gun.tarkov_market_link
        node.trader_name = gun.trader_name
        node.trader_price = gun.trader_price
        node.trader_price_cur = gun.trader_price_cur
        node.type = gun.type
        node.vertical_recoil = gun.vertical_recoil
        node.weight = gun.weight
        node.wiki_link = gun.wiki_link
      }
      else {
        console.log("updateBuildTree: Missing bsgID")
        console.log("Setting item to null.")
        node = null
      }
    }

    // If not a firearm, it must be an attachment - update attachment details
    else {
      // Find attachment by bsg_id 
      let attachment = attachments.find(({
        bsg_id,
      }) => bsg_id === node.bsg_id);

      if (attachment !== null && attachment != undefined) {
        // Update the attachment in the build tree with the attachment's new details
        node.accuracy_modifier = attachment.accuracy_modifier
        node.avg_24h_price = attachment.avg_24h_price
        node.compatibility = attachment.compatibility
        node.conflicts = attachment.conflicts
        node.description = attachment.description
        node.ergonomics_modifier = attachment.ergonomics_modifier
        node.icon = attachment.icon
        node.img = attachment.img
        node.img_big = attachment.img_big
        node.kind = attachment.kind
        node.modified = attachment.modified
        node.muzzle_velocity_modifier = attachment.muzzle_velocity_modifier
        node.name = attachment.name
        node.price = attachment.price
        node.recoil_modifier = attachment.recoil_modifier
        node.short_name = attachment.short_name
        node.tarkov_market_link = attachment.tarkov_market_link
        node.trader_name = attachment.trader_name
        node.trader_price = attachment.trader_price
        node.trader_price_cur = attachment.trader_price_cur
        node.type = attachment.type
        node.weight = attachment.weight
        node.wiki_link = attachment.wiki_link
      }
      else {
        console.log("updateBuildTree: Missing bsgID")
        console.log("Setting item to null.")
        node = null
      }
    }

    // Check for slots
    if (node != null && node.slots && node.slots != undefined) {
      for (let slot of Object.keys(node.slots)) {
        // Go deeper down the build tree
        if (node.slots[slot].selected && node.slots[slot].selected != undefined && node.slots[slot].selected.bsg_id !== undefined) {
          node.slots[slot].selected = this.updateBuildTree(node.slots[slot].selected, guns, attachments);
        }
        else if (node.slots[slot].selected && node.slots[slot].selected.bsg_id == undefined) {
          console.log(`This slot has a selected attachment with an undefined bsg_id. Item: ${node.name}, Slot: ${node.slots[slot].name}`)
        }
      }
    }

    // Return current node to the parent
    return node
  }

  updateAllItems(allItems, guns, attachments) {
    for (let item of allItems) {
      // // Item is a Firearm - update firearm details
      if (item.kind == 'firearm') {
        let gun = guns.find(({
          bsg_id,
        }) => bsg_id === item.bsg_id);

        if (gun !== null && gun !== undefined) {
          item.avg_24h_price = gun.avg_24h_price
          item.caliber = gun.caliber
          item.description = gun.description
          item.ergonomics = gun.ergonomics
          item.horizontal_recoil = gun.horizontal_recoil
          item.icon = gun.icon
          item.img = gun.img
          item.img_big = gun.img_big
          item.modified = gun.modified
          item.name = gun.name
          item.price = gun.price
          item.rpm = gun.rpm
          item.short_name = gun.short_name
          item.tarkov_market_link = gun.tarkov_market_link
          item.trader_name = gun.trader_name
          item.trader_price = gun.trader_price
          item.trader_price_cur = gun.trader_price_cur
          item.type = gun.type
          item.vertical_recoil = gun.vertical_recoil
          item.weight = gun.weight
          item.wiki_link = gun.wiki_link
        }
        else {
          console.log("updateAllItems: Missing bsgID")
          console.log("Setting item to null.")
          item = null
        }
      }

      // Item is an Attachment - update attachment details
      else {
        // Find attachment by bsg_id 
        let attachment = attachments.find(({
          bsg_id,
        }) => bsg_id === item.bsg_id);

        if (attachment !== null && attachment !== undefined) {
          // Update the attachment in the build tree with the attachment's new details
          item.accuracy_modifier = attachment.accuracy_modifier
          item.avg_24h_price = attachment.avg_24h_price
          item.compatibility = attachment.compatibility
          item.conflicts = attachment.conflicts
          item.description = attachment.description
          item.ergonomics_modifier = attachment.ergonomics_modifier
          item.icon = attachment.icon
          item.img = attachment.img
          item.img_big = attachment.img_big
          item.kind = attachment.kind
          item.modified = attachment.modified
          item.muzzle_velocity_modifier = attachment.muzzle_velocity_modifier
          item.name = attachment.name
          item.price = attachment.price
          item.recoil_modifier = attachment.recoil_modifier
          item.short_name = attachment.short_name
          item.tarkov_market_link = attachment.tarkov_market_link
          item.trader_name = attachment.trader_name
          item.trader_price = attachment.trader_price
          item.trader_price_cur = attachment.trader_price_cur
          item.type = attachment.type
          item.weight = attachment.weight
          item.wiki_link = attachment.wiki_link
        }
        else {
          console.log("updateAllItems: Missing bsgID")
          console.log("Setting item to null.")
          item = null
        }
      }
    }

    // Remove nulls
    for (var i = 0; i < allItems.length; i++) {
      if (allItems[i] == null) {
        allItems.splice(i, 1)
      }
    }

    return allItems
  }

  calculateWeaponStats(allItems) {
    let weapon = allItems[0]

    if (weapon == null || weapon == undefined) {
      let defaultStats = {
        error: true
      }
      return defaultStats
    }

    let ergonomics = weapon.ergonomics
    let horizontal_recoil = weapon.horizontal_recoil
    let vertical_recoil = weapon.vertical_recoil
    let price = 0
    let recoil_reduction = 0

    for (let attachment of allItems) {
      if (attachment.ergonomics_modifier && attachment.ergonomics_modifier !== null) {
        ergonomics += attachment.ergonomics_modifier
      }

      if (attachment.recoil_modifier && attachment.recoil_modifier !== null) {
        recoil_reduction += attachment.recoil_modifier
      }

      if (attachment.price && attachment.price !== null) {
        price += attachment.avg_24h_price
      }
    }
    
    horizontal_recoil = Math.round(weapon.horizontal_recoil * ((100 + recoil_reduction) / 100))
    vertical_recoil = Math.round(weapon.vertical_recoil * ((100 + recoil_reduction) / 100))

    let calculatedWeaponStats = {
      ergonomics: ergonomics,
      horizontal_recoil: horizontal_recoil,
      vertical_recoil: vertical_recoil,
      price: price,
      error: false
    }

    return calculatedWeaponStats
  }
}

module.exports = new GunbuildUpdaterService()
