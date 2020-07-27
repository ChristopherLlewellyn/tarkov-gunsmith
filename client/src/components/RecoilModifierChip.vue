<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-badge overlap bordered right :color="badgeColor" :icon="badgeIcon">
        <v-chip label class="ma-1" color="blue" v-on="on">
        <v-avatar left class="blue darken-4">
          <v-icon>mdi-arrow-all</v-icon>
        </v-avatar>
        <h3 class="font-weight-medium">{{ value }}%</h3>
      </v-chip>
      </v-badge>
    </template>
    <h3 class="font-weight-medium">Recoil Modifier</h3>
  </v-tooltip>
</template>

<script>
export default {
  name: "chip",
  props: {
    value: Number
  },
  computed: {
    badgeColor() {
      if (this.value < 0) {
        return "green"
      }
      else if (this.value > 0) {
        return "red"
      }
      else {
        return "grey"
      }
    },
    badgeIcon() {
      if (this.value < 0) {
        return "mdi-chevron-up"
      }
      else if (this.value > 0) {
        return "mdi-chevron-down"
      }
      else {
        return "mdi-minus"
      }
    }
  }
};
</script>
