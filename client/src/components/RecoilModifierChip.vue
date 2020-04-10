<template>
  <v-chip color="blue">
    <v-avatar left class="blue darken-4">
      <v-icon>mdi-arrow-all</v-icon>
    </v-avatar>
    <h3 class="font-weight-medium">{{ value }}</h3>
  </v-chip>
</template>

<script>
export default {
  name: 'chip',
  props: {
    value: Number,
  },
};

</script>
