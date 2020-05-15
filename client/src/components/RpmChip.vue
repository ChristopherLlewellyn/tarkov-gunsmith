<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-chip label class="ma-1" color="brown" v-on="on">
        <v-avatar left class="brown darken-4">
          <v-icon>mdi-chevron-triple-right</v-icon>
        </v-avatar>
        <h3 class="font-weight-medium">{{ value }}</h3>
      </v-chip>
    </template>
    <h3 class="font-weight-medium">RPM</h3>
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