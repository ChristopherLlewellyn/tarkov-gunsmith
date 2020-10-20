<template>
    <v-card class="floating-panel" width="400" outlined>
      <v-sheet color="blue" class="pl-1">
        <v-sheet>
          <conflicts-panel
            :loading="loading"
            :conflicts="conflicts"
            :hideTitle="true"
          ></conflicts-panel>
          <v-card-actions class="justify-center">
            <ergonomics-chip class="ma-2" :value="calculatedErgonomics"></ergonomics-chip>
            <vertical-recoil-chip class="ma-2" :value="calculatedVerticalRecoil"></vertical-recoil-chip>
            <horizontal-recoil-chip class="ma-2" :value="calculatedHorizontalRecoil"></horizontal-recoil-chip>
          </v-card-actions>

          <v-divider></v-divider>

          <v-card-actions class="justify-center">
            <weight-chip :value="calculatedWeight"></weight-chip>
            <price-chip class="ma-2" :value="market_price" currency="₽" source="Flea Market"></price-chip>
          </v-card-actions>
        </v-sheet>
      </v-sheet>
    </v-card>
</template>

<script>
import ConflictsPanel from "@/components/ConflictsPanel.vue";
import ErgonomicsChip from "./ErgonomicsChip";
import HorizontalRecoilChip from "./HorizontalRecoilChip";
import VerticalRecoilChip from "./VerticalRecoilChip";
import PriceChip from "./PriceChip";
import WeightChip from "./WeightChip";

export default {
  name: "floating-build-info-panel",
  components: {
    ConflictsPanel,
    ErgonomicsChip,
    HorizontalRecoilChip,
    VerticalRecoilChip,
    PriceChip,
    WeightChip
  },
  props: {
    calculatedErgonomics: Number,
    calculatedVerticalRecoil: Number,
    calculatedHorizontalRecoil: Number,
    market_price: Number,
    calculatedWeight: Number,
    conflicts: Array,
    loading: Boolean
  }
}
</script>

<style scoped>
.floating-panel {
  position: fixed;
  right: 10%;
  top: 20%;
  z-index: 999;
}
</style>