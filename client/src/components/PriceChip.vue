<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-chip class="ma-1" color="teal" v-on="on">
        <v-avatar left class="teal darken-4">
          <v-icon>{{icon}}</v-icon>
        </v-avatar>
        <h3 class="font-weight-medium">{{ value }}</h3>
      </v-chip>
    </template>
    <h3 class="font-weight-medium">{{source}} Price</h3>
  </v-tooltip>
</template>

<script>
  export default {
    name: "priceChip",
    props: {
      value: Number,
      currency: String,
      source: String
    },
    computed: {
      icon() {
        switch (this.currency) {
          case "₽":
            return "mdi-currency-rub"
            break;

          case "$":
            return "mdi-currency-usd"
            break;
            
          case "€":
            return "mdi-currency-eur"
            break;
          
          default:
            return "mdi-help"
        }
      }
    }
  };
</script>