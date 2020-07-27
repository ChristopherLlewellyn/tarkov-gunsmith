<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-badge :value="showBadge" overlap bordered right :color="badgeColor" :icon="badgeIcon">
        <v-chip label class="ma-1" color="green" v-on="on">
          <v-avatar left class="green darken-4">
            <v-icon>mdi-hand</v-icon>
          </v-avatar>
          <h3 class="font-weight-medium">{{ value }}</h3>
        </v-chip>
      </v-badge>
    </template>
    <h3 class="font-weight-medium">Ergonomics</h3>
  </v-tooltip>
</template>

<script>
export default {
  name: "chip",
  props: {
    value: Number,
    showBadge: Boolean
  },
  computed: {
    badgeColor() {
      if (this.value < 0) {
        return "red"
      }
      else if (this.value > 0) {
        return "green"
      }
      else {
        return "grey"
      }
    },
    badgeIcon() {
      if (this.value < 0) {
        return "mdi-chevron-down"
      }
      else if (this.value > 0) {
        return "mdi-chevron-up"
      }
      else {
        return "mdi-minus"
      }
    }
  }
};
</script>
