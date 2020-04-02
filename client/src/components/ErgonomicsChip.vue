<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-chip class="ma-1" color="green" v-on="on">
        <v-avatar left class="green darken-4">
          <v-icon>mdi-hand</v-icon>
        </v-avatar>
        <h3 class="font-weight-medium">{{ value }}</h3>
      </v-chip>
    </template>
    <span class="font-weight-medium">Ergonomics</span>
  </v-tooltip>
</template>

<script>
  export default {
    name: "chip",
    props: {
      value: Number
    },
  };
</script>