<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-chip label class="ma-1" color="green" v-on="on">
        <v-avatar left class="green darken-4">
          <v-icon>mdi-hand</v-icon>
        </v-avatar>
        <h3 class="font-weight-medium">{{ value }}</h3>
      </v-chip>
    </template>
    <h3 class="font-weight-medium">Ergonomics</h3>
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
