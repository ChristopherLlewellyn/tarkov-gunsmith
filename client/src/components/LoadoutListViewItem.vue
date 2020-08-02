<template>
  <div class="item-container pl-4 pr-4">
    <a :href="`/loadout/${loadoutId}`">
      <v-row align="center">
        <v-col cols="4">
          <v-col align="center">
              <v-sheet height="100" color="black" class="pl-1 pr-1">
                <v-img :src="gunImgBig ? gunImgBig : null" class="white--text align-end pt-12"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" max-height="100" contain>
                </v-img>
              </v-sheet>
            <!--
            <v-avatar tile size="90" class="mb-1">
              <img :src="gunImg ? gunImg : null" alt="gun image">
            </v-avatar>
            -->
            <span class="weapon-subtitle ml-2">{{ gunName ? gunName : 'Unknown gun name' }}</span>
          </v-col>
          <v-icon class="mr-1 ml-2">mdi-axis</v-icon>
          <span class="type-subtitle ml-2">{{ gunTypeFormatted ? gunTypeFormatted : 'Unknown gun type' }}</span>
          <br>
          <v-icon class="mr-1 ml-2">mdi-bullet</v-icon>
          <span class="caliber-subtitle ml-2">{{ caliber ? caliber : '?' }}</span>
        </v-col>

        <v-col cols="4">
          <h4 class="loadout-title">{{ loadoutName ? loadoutName : 'Unknown loadout name' }}</h4>
          <br>
          <span class="default-subtitle">By </span>
          <span class="username-subtitle">{{ username ? username : '?' }}</span>
          <br>
          <span class="default-subtitle">Created </span>
          <span class="date-subtitle">{{ createdAt ? createdAt : '?' }}</span>
        </v-col>

        <v-col align="center" justify="center">
          <v-row align="center" justify="center">
            <v-icon>mdi-hand</v-icon>
            <span class="ergonomics-text ml-2">{{ ergonomics ? ergonomics : '?' }}</span>
          </v-row>
          <v-row align="center" justify="center">
            <v-icon>mdi-arrow-split-horizontal</v-icon>
            <span class="recoil-text ml-2">{{ verticalRecoil ? verticalRecoil : '?' }}</span>
          </v-row>
          <v-row align="center" justify="center">
            <v-icon>mdi-arrow-split-vertical</v-icon>
            <span class="recoil-text ml-2">{{ horizontalRecoil ? horizontalRecoil : '?' }}</span>
          </v-row>
          <v-row align="center" justify="center">
            <v-icon>mdi-chevron-triple-right</v-icon>
            <span class="rpm-text ml-2">{{ gunRPM ? gunRPM : '?' }}</span>
          </v-row>

          <v-divider class="mt-2 mb-2"></v-divider>

          <v-row align="center" justify="center">
            <v-icon>mdi-currency-rub</v-icon>
            <span class="price-text ml-2">{{ marketPrice ? marketPrice : '?' }}</span>
          </v-row>
        </v-col>

        <v-col align="center" justify="center">
          <v-row align="center" justify="center">
            <template v-if="votes < 0">
              <v-icon color="red">mdi-thumb-down</v-icon>
              <span class="negative-vote-text ml-2">{{ votes }}</span>
            </template>

            <template v-else-if="votes > 0">
              <v-icon color="green">mdi-thumb-up</v-icon>
              <span class="positive-vote-text ml-2">{{ votes }}</span>
            </template>

            <template v-else>
              <v-icon color="grey">mdi-thumbs-up-down</v-icon>
              <span class="neutral-vote-text ml-2">{{ votes }}</span>
            </template>
          </v-row>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-divider></v-divider>
    </a>
  </div>
</template>

<script>
  import ErgonomicsChip from './ErgonomicsChip';
  import VerticalRecoilChip from './VerticalRecoilChip';
  import HorizontalRecoilChip from './HorizontalRecoilChip';
  import PriceChip from './PriceChip';
  import CaliberChip from './CaliberChip';

  export default {
    name: "listViewItem",
    props: {
      loadoutId: Number,
      gunImg: String,
      gunImgBig: String,
      gunName: String,
      gunType: String,
      gunRPM: Number,
      loadoutName: String,
      ergonomics: Number,
      horizontalRecoil: Number,
      verticalRecoil: Number,
      marketPrice: Number,
      username: String,
      caliber: String,
      createdAt: String,
      votes: Number
    },
    components: {
      ErgonomicsChip,
      VerticalRecoilChip,
      HorizontalRecoilChip,
      PriceChip,
      CaliberChip
    },

    computed: {
      gunTypeFormatted() {
        if (this.gunType) return this.camelCaseToSentenceCase(this.gunType);
      }
    },

    methods: {
      camelCaseToSentenceCase(text) {
        let result = text.replace(/([A-Z])/g, " $1");
        let finalResult = result.charAt(0).toUpperCase() + result.slice(1);
        return finalResult;
      }
    },
  };

</script>

<style scoped>
  a {
    color: inherit;
    text-decoration: inherit;
  }

  .item-container:hover {
    background-color: #424242;
    cursor: pointer;
  }

  .loadout-title {
    color: #FFFFFF;
  }

  .weapon-subtitle {
    font-size: 14px;
    font-weight: bold;
    color: #5C6BC0;
  }

  .type-subtitle {
    font-size: 14px;
    font-weight: bold;
    color: #F44336;
  }

  .caliber-subtitle {
    font-size: 14px;
    font-weight: bold;
    color: #AB47BC;
  }

  .username-subtitle {
    font-size: 14px;
    font-weight: bold;
    color: #FF9800;
  }

  .date-subtitle {
    font-size: 14px;
    font-weight: bold;
    color: #9E9E9E;
  }

  .ergonomics-text {
    font-size: 20px;
    font-weight: bold;
    color: #66BB6A;
  }

  .recoil-text {
    font-size: 20px;
    font-weight: bold;
    color: #42A5F5;
  }

  .rpm-text {
    font-size: 20px;
    font-weight: bold;
    color: #795548;
  }

  .price-text {
    font-size: 20px;
    font-weight: bold;
    color: #26A69A;
  }

  .default-subtitle {
    font-size: 14px;
    font-weight: bold;
    color: #9E9E9E;
  }

  .positive-vote-text {
    font-size: 18px;
    font-weight: bold;
    color: #4CAF50;
  }

  .neutral-vote-text {
    font-size: 18px;
    font-weight: bold;
    color: #9E9E9E;
  }

  .negative-vote-text {
    font-size: 18px;
    font-weight: bold;
    color: #F44336;
  }

</style>
