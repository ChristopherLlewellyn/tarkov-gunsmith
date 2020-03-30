<template>
  <v-chip color="green">
    <v-avatar left class="green darken-4">
      <v-icon>mdi-hand</v-icon>
    </v-avatar>
    <h3 class="font-weight-medium">{{ value }}</h3>
  </v-chip>
</template>

<script>
  export default {
    name: "chip",
    props: {
      value: Number
    },
  };

</script>