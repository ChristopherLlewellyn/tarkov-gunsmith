<template>
  <div class="node-tree">
    <!-- Checking that the node is not a firearm (or magazine, because we don't care about magazines) -->
    <template v-if="node.kind !== 'firearm' && slotName !== 'magazine'">
      <v-sheet color="blue" class="pl-1">
        <v-card class="mt-2 grey darken-3">
          <v-expansion-panels v-model="panel" hover readonly>
            <v-expansion-panel>
              <!-- Unexpanded dropdown - displays selected attachment -->
              <v-expansion-panel-header hide-actions class="default-cursor">
                <v-row>
                  <slot-icon :slotName="slotName"></slot-icon>
                  <h4
                    class="ml-2 mt-5 mr-2"
                  >{{ slotName ? slotName.toUpperCase().split('_')[0] : 'Slot name missing' }}</h4>
                  <template v-if="node.selected">
                    <v-row>
                      <attachment-image
                        :imgUrl="node.selected.img"
                        :name="node.selected.name"
                        :ergonomicsModifier="node.selected.ergonomics_modifier"
                        :recoilModifier="node.selected.recoil_modifier"
                        :weight="node.selected.weight"
                        :marketPrice="node.selected.avg_24h_price"
                        :traderName="node.selected.trader_name"
                        :traderPrice="node.selected.trader_price"
                        :traderCurrency="node.selected.trader_price_cur"
                      ></attachment-image>
                      <h4
                        class="ml-4 mr-4 mt-5"
                      >{{ node.selected.short_name ? node.selected.short_name : 'Missing name' }}</h4>
                    </v-row>
                  </template>
                  <template v-else>
                    <v-img
                      :src="emptySelection"
                      alt="No attachment"
                      max-height="60"
                      max-width="175"
                      contain
                    ></v-img>
                  </template>
                </v-row>
              </v-expansion-panel-header>
            </v-expansion-panel>
          </v-expansion-panels>

          <!-- If an attachment has been selected, create another node (dropdown) for that attachment's available slots (if it has any) -->
          <template v-if="node.selected">
            <template v-if="Object.keys(node.selected.slots).length !== 0">
              <!-- Checking the attachment has any slots -->
              <v-toolbar
                dense
                class="blue darken-3"
              >Attachments fitting on {{ node.selected.short_name ? node.selected.short_name : 'missing name' }}</v-toolbar>
              <ul>
                <node
                  v-for="(child, index) in Object.values(node.selected.slots)"
                  :key="'B' + index"
                  :node="child"
                  :slotName="Object.keys(node.selected.slots)[index]"
                ></node>
              </ul>
            </template>
          </template>
        </v-card>
      </v-sheet>
    </template>

    <!-- If the node is of kind 'firearm' then we just render the firearm's slots -->
    <ul v-if="node.slots && node.slots !== undefined">
      <node
        v-for="(child, index) in slots"
        :key="index + guid()"
        :node="child"
        :slotName="Object.keys(node.slots)[index]"
      ></node>
    </ul>
  </div>
</template>

<script>
import { mapMutations, mapState } from "vuex";

import ErgonomicsChip from "./ErgonomicsChip";
import HorizontalRecoilChip from "./HorizontalRecoilChip";
import VerticalRecoilChip from "./VerticalRecoilChip";
import RecoilModifierChip from "./RecoilModifierChip";
import WeightChip from "./WeightChip";
import TraderPriceCard from "./TraderPriceCard";
import MarketPriceCard from "./MarketPriceCard";
import AttachmentImage from "./AttachmentImage";
import SlotIcon from "./SlotIcon";

export default {
  name: "node",
  props: {
    node: Object,
    slotName: String
  },
  components: {
    ErgonomicsChip,
    HorizontalRecoilChip,
    VerticalRecoilChip,
    RecoilModifierChip,
    WeightChip,
    TraderPriceCard,
    MarketPriceCard,
    AttachmentImage,
    SlotIcon
  },
  computed: {
    slots() {
      if (!this.node.slots) {
        return;
      }
      return Object.values(this.node.slots);
    }
  },
  methods: {
    guid() {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      );
    }
  },
  data: () => ({
    panel: 1,
    noImage: require("../images/no-image-attachment.png"),
    emptySelection: require("../images/empty.png")
  })
};
</script>

<style scoped>
.default-cursor {
  cursor: default;
}
</style>
