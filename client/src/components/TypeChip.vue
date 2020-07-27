<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-chip label class="ma-1" color="red darken-1" v-on="on">
        <v-avatar left class="red darken-4">
          <v-icon>mdi-axis</v-icon>
        </v-avatar>
        <h3 class="font-weight-medium">{{ formattedValue }}</h3>
      </v-chip>
    </template>
    <h3 class="font-weight-medium">Type</h3>
  </v-tooltip>
</template>

<script>
export default {
  name: "chip",
  props: {
    value: String
  },

  computed: {
    formattedValue() {
      if(this.value) return this.camelCaseToSentenceCase(this.value);
    }
  },

  methods: {
    camelCaseToSentenceCase(text) {
      let result = text.replace( /([A-Z])/g, " $1" );
      let finalResult = result.charAt(0).toUpperCase() + result.slice(1);
      return finalResult;
    }
  }
};
</script>