<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-chip class="ma-1" color="red darken-1" v-on="on">
        <v-avatar left class="red darken-4">
          <v-icon>mdi-axis</v-icon>
        </v-avatar>
        <h3 class="font-weight-medium">{{ value }}</h3>
      </v-chip>
    </template>
    <span class="font-weight-medium">Type</span>
  </v-tooltip>
</template>

<script>
  export default {
    name: "chip",
    props: {
      value: String
    },
  };
</script>