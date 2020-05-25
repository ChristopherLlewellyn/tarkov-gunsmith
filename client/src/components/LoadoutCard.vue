<template>
  <v-lazy v-model="isActive" transition="fade-transition">
    <v-card :to="`/loadout/${loadout.id}`" tile>
      <v-toolbar>
        {{ loadout.name }}
        <v-spacer></v-spacer>
        <v-card outlined class="d-flex flex-row ma-2">
          <template v-if="loadout.votes < 0">
            <v-icon color="red" class="ma-2">mdi-thumb-down</v-icon>
            <h4 class="ma-2 red--text">{{ loadout.votes }}</h4>
          </template>

          <template v-else-if="loadout.votes > 0">
            <v-icon color="green" class="ma-2">mdi-thumb-up</v-icon>
            <h4 class="ma-2 green--text">{{ loadout.votes }}</h4>
          </template>

          <template v-else>
            <v-icon color="grey" class="ma-2">mdi-thumbs-up-down</v-icon>
            <h4 class="ma-2 grey--text">{{ loadout.votes }}</h4>
          </template>
        </v-card>
      </v-toolbar>

      <v-container fluid>
        <v-sheet height="120" color="black">
          <v-img
          :src="loadout.gun_img_big ? loadout.gun_img_big : ''"
          class="white--text align-end pt-12"
          gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
          max-height="120"
          contain
        >
          <v-card-title>{{ loadout.gun_name }}</v-card-title>
        </v-img>
        </v-sheet>
      </v-container>

      <v-divider></v-divider>

      <v-card-actions class="justify-center">
        <caliber-chip :value="loadout.gun_caliber"></caliber-chip>
      </v-card-actions>

      <v-card-actions class="justify-center">
        <ergonomics-chip class="ma-2" :value="loadout.ergonomics_final"></ergonomics-chip>
        <vertical-recoil-chip class="ma-2" :value="loadout.vertical_recoil_final"></vertical-recoil-chip>
        <horizontal-recoil-chip class="ma-2" :value="loadout.horizontal_recoil_final"></horizontal-recoil-chip>
      </v-card-actions>

      <v-card-actions class="justify-center">
        <price-chip class="ma-2" :value="loadout.market_price" currency="₽" source="Flea Market"></price-chip>
      </v-card-actions>

      <v-card-actions class="justify-center">
        <span class="font-weight-light">Created</span>
        &nbsp;
        <span class="font-weight-medium">{{ loadout.created_at }}</span>
      </v-card-actions>

      <v-card-actions class="justify-center">
        <span class="font-weight-light">Loadout by</span>
        &nbsp;
        <span class="font-weight-bold orange--text">{{ loadout.username }}</span>
      </v-card-actions>
    </v-card>
  </v-lazy>
</template>

<script>
import ErgonomicsChip from "./ErgonomicsChip";
import HorizontalRecoilChip from "./HorizontalRecoilChip";
import VerticalRecoilChip from "./VerticalRecoilChip";
import CaliberChip from "./CaliberChip";
import PriceChip from "./PriceChip";

export default {
  name: "card",
  props: {
    loadout: Object
  },
  components: {
    ErgonomicsChip,
    HorizontalRecoilChip,
    VerticalRecoilChip,
    CaliberChip,
    PriceChip
  },
  data: () => ({
    isActive: false
  })
};
</script>
