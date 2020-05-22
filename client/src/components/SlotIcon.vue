<template>
  <v-img class="ma-1" :src="source" :alt="slotName" max-height="60" max-width="60" contain lazy-src>
    <template v-slot:placeholder>
      <v-row class="fill-height ma-0" align="center" justify="center">
        <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
      </v-row>
    </template>
  </v-img>
</template>

<script>
export default {
  name: "slotIcon",
  props: {
    slotName: String
  },
  computed: {
    source() {
      if (this.slotName.toLowerCase().includes("barrel")) {
        return require("../images/attachments/barrel.svg");
      } else if (this.slotName.toLowerCase().includes("charge")) {
        return require("../images/attachments/charge.svg");
      } else if (this.slotName.toLowerCase().includes("foregrip")) {
        return require("../images/attachments/foregrip.svg");
      } else if (this.slotName.toLowerCase().includes("sightfront")) {
        return require("../images/attachments/frontsight.svg");
      } else if (this.slotName.toLowerCase().includes("gasblock")) {
        return require("../images/attachments/gas-block.svg");
      } else if (this.slotName.toLowerCase().includes("handguard")) {
        return require("../images/attachments/handguard.svg");
      } else if (this.slotName.toLowerCase().includes("mount")) {
        return require("../images/attachments/mount.svg");
      } else if (this.slotName.toLowerCase().includes("muzzle")) {
        return require("../images/attachments/muzzle.svg");
      } else if (this.slotName.toLowerCase().includes("pistolgrip")) {
        return require("../images/attachments/pistol-grip.svg");
      } else if (this.slotName.toLowerCase().includes("sightrear")) {
        return require("../images/attachments/rearsight.svg");
      } else if (this.slotName.toLowerCase().includes("receiver")) {
        return require("../images/attachments/receiver.svg");
      } else if (this.slotName.toLowerCase().includes("scope")) {
        return require("../images/attachments/scope.svg");
      } else if (this.slotName.toLowerCase().includes("stock")) {
        return require("../images/attachments/stock.svg");
      } else if (this.slotName.toLowerCase().includes("tactical")) {
        return require("../images/attachments/tactical-2.svg");
      } else {
        return require("../images/empty.png");
      }
    }
  }
};
</script>