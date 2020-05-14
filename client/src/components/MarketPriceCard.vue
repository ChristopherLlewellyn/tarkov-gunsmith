<template>
  <v-card outlined class="ma-1">
    <v-card-title class="justify-center pa-0 ma-0">
      <h5>Flea Market</h5>
    </v-card-title>
    <v-card-actions class="justify-center">
      <v-img class="ma-1" :src="image" alt="Flea market image" max-height="60" max-width="60" contain lazy-src>
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </v-card-actions>

    <v-divider></v-divider>

    <v-card-actions class="justify-center">
      <price-chip :value="marketPrice" currency="₽" source="Flea Market"></price-chip>
    </v-card-actions>
  </v-card>
</template>

<script>
  import PriceChip from './PriceChip';

  export default {
    name: "marketPriceCard",
    props: {
      marketPrice: Number,
    },
    components: {
      PriceChip
    },
    computed: {
      image() {
        return require("../images/market-icon.png")
      }
    },
  };

</script>
