<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-chip label class="ma-1" color="blue" v-on="on">
        <v-avatar left class="blue darken-4">
          <v-icon>mdi-arrow-split-vertical</v-icon>
        </v-avatar>
        <h3 class="font-weight-medium">{{ value }}</h3>
      </v-chip>
    </template>
    <h3 class="font-weight-medium">Horizontal Recoil</h3>
  </v-tooltip>
</template>

<script>
export default {
  name: "chip",
  props: {
    value: Number
  }
};
</script>
