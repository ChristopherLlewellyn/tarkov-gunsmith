<template>
  <v-tooltip bottom color="grey darken-4">
    <template v-slot:activator="{ on }">
      <v-img class="ml-4 pointer" v-on="on" v-on:error="onImgError" :src="img ? img : noImage" :alt="name ? name : 'Missing name'" max-height="60"
        max-width="175" contain>
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </template>
    <!-- On attachment hover, display this -->
    <v-card color="grey darken-4" flat>
      <v-card-title class="justify-center pa-0">
        <h5>{{ name ? name : 'Missing name' }}</h5>
      </v-card-title>
      <!-- Attachment Properties -->
      <v-card-actions class="justify-center">
        <ergonomics-chip v-if="ergonomics" class="ml-1 mr-1" :value="ergonomics">
        </ergonomics-chip>

        <vertical-recoil-chip v-if="verticalRecoil" class="ml-1 mr-1" :value="verticalRecoil">
        </vertical-recoil-chip>

        <horizontal-recoil-chip v-if="horizontalRecoil" class="ml-1 mr-1" :value="horizontalRecoil">
        </horizontal-recoil-chip>

        <weight-chip v-if="weight" class="ml-1 mr-1" :value="weight">
        </weight-chip>
      </v-card-actions>

      <v-divider></v-divider>

      <!-- Attachments Prices -->
      <v-card-actions class="justify-center">
        <market-price-card :marketPrice="marketPrice ? marketPrice : 0"></market-price-card>

        <trader-price-card :traderName="traderName ? traderName : 'Unknown'" :traderPrice="traderPrice ? traderPrice : 0"
          :traderCurrency="traderCurrency ? traderCurrency : '?'"></trader-price-card>
      </v-card-actions>
    </v-card>
  </v-tooltip>
</template>

<script>
  import ErgonomicsChip from './ErgonomicsChip';
  import VerticalRecoilChip from './VerticalRecoilChip';
  import HorizontalRecoilChip from './HorizontalRecoilChip';
  import WeightChip from './WeightChip';
  import TraderPriceCard from './TraderPriceCard';
  import MarketPriceCard from './MarketPriceCard';

  export default {
    name: "weaponImage",
    props: {
      imgUrl: String,
      name: String,
      ergonomics: Number,
      verticalRecoil: Number,
      horizontalRecoil: Number,
      weight: Number,
      marketPrice: Number,
      traderName: String,
      traderPrice: Number,
      traderCurrency: String
    },
    components: {
      ErgonomicsChip,
      VerticalRecoilChip,
      HorizontalRecoilChip,
      WeightChip,
      TraderPriceCard,
      MarketPriceCard
    },
    computed: {
      img() {
        let image = this.imgError ? this.noImage : this.imgUrl;
        return image;
      }
    },
    watch: {
      imgUrl: function() {
        this.imgError = false;
      }
    },
    methods: {
      onImgError() {
        this.imgError = true;
      }
    },
    data: () => ({
      imgError: false,
      noImage: require("../images/no-image-attachment.png"),
    }),
  };

</script>

<style scoped>
  .pointer {
    cursor: pointer;
  }

</style>