<template>
  <v-tooltip bottom color="grey darken-4">
    <template v-slot:activator="{ on }">
      <v-icon large class="pointer" v-on="on" color="red">mdi-alert-outline</v-icon>
    </template>
    <v-card color="grey darken-4" flat>
      <v-card-title class="justify-center pa-0">
        <h5>Conflict</h5>
      </v-card-title>
      <v-divider></v-divider>
      <v-card-actions v-for="(conflict, i) in conflicts" :key="i" class="justify-center">
        <h3 class="font-weight-medium red--text">{{conflict.short_name}}</h3>
      </v-card-actions>
    </v-card>
  </v-tooltip>
</template>

<script>
  export default {
    name: "conflictsIcon",
    props: {
      conflicts: Array
    },
  };

</script>

<style scoped>
  .pointer {
    cursor: pointer;
  }

</style>
