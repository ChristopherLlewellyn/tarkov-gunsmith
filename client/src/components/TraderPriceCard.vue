<template>
  <v-card outlined class="ma-1">
    <v-card-title class="justify-center pa-0 ma-0">
      <h5>{{traderName}}</h5>
    </v-card-title>
    <v-card-actions class="justify-center">
      <trader-portrait :traderName="traderName"></trader-portrait>
    </v-card-actions>

    <v-divider></v-divider>

    <v-card-actions class="justify-center">
      <price-chip :value="traderPrice" :currency="traderCurrency" source="Trader"></price-chip>
    </v-card-actions>
  </v-card>
</template>

<script>
  import TraderPortrait from './TraderPortrait';
  import PriceChip from './PriceChip';

  export default {
    name: "traderPriceCard",
    props: {
      traderName: String,
      traderPrice: Number,
      traderCurrency: String
    },
    components: {
      TraderPortrait,
      PriceChip
    },
  };
</script>