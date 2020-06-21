<template>
  <div class="node-tree">
    <!-- Checking that the node is not a firearm -->
    <template v-if="node.kind !== 'firearm'">
      <v-sheet color="blue" class="pl-1">
        <v-card class="mt-2 grey darken-3">
          <v-expansion-panels hover v-model="panel">
            <v-expansion-panel>
              <!-- Unexpanded dropdown - displays selected attachment -->
              <v-expansion-panel-header hide-actions>
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
                        :bsgId="node.selected.bsg_id"
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

              <!-- Expanded dropdown - displays compatible attachments -->
              <v-expansion-panel-content color="grey darken-3">
                <!-- Display compatible attachments in a grid - grid responds to screen size -->
                <v-card class="mt-4">
                  <v-container fluid grid-list-md>
                    <!-- xs = 600px full screen (12) -->
                    <!-- md = 600px or more. -->
                    <v-layout row wrap>
                      <!-- "None" attachment option (shows tooltip on hover) -->
                      <v-flex xs6 sm3 md2 lg1>
                        <template>
                          <v-tooltip bottom color="grey darken-4">
                            <template v-slot:activator="{ on }">
                              <v-img
                                class="ma-2 pointer"
                                v-on="on"
                                @click="selectAttachment('none'), closePanel()"
                                :src="emptySelection"
                                alt="None"
                                max-height="60"
                                max-width="150"
                                contain
                              >
                                <template v-slot:placeholder>
                                  <v-row class="fill-height ma-0" align="center" justify="center">
                                    <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
                                  </v-row>
                                </template>
                              </v-img>
                            </template>
                            <v-card color="grey darken-4" flat>
                              <v-card-title class="justify-center pa-0">
                                <h5>None</h5>
                              </v-card-title>
                            </v-card>
                          </v-tooltip>
                        </template>
                      </v-flex>
                      <!-- List of compatible attachment options (shows tooltip on hover) -->
                      <v-flex
                        xs6
                        sm3
                        md2
                        lg1
                        v-for="(attachment, index) in compatibleAttachments"
                        :key="index + guid()"
                      >
                        <attachment-image
                          v-if="attachment"
                          @handle-click="handleSelection"
                          :imgUrl="attachment.img"
                          :name="attachment.name"
                          :bsgId="attachment.bsg_id"
                          :ergonomicsModifier="attachment.ergonomics_modifier"
                          :recoilModifier="attachment.recoil_modifier"
                          :weight="attachment.weight"
                          :marketPrice="attachment.avg_24h_price"
                          :traderName="attachment.trader_name"
                          :traderPrice="attachment.trader_price"
                          :traderCurrency="attachment.trader_price_cur"
                        ></attachment-image>
                      </v-flex>
                    </v-layout>
                  </v-container>
                </v-card>
              </v-expansion-panel-content>
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
                  :key="index + guid()"
                  :node="child"
                  :availableAttachments="availableAttachments"
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
        :availableAttachments="availableAttachments"
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
    availableAttachments: Array,
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
  methods: {
    ...mapMutations("editLoadout", [
      "refreshAllItems",
      "addItem",
      "removeItem",
      "calculateWeaponStats",
      "setConflicts"
    ]),
    recalculateAllItems(node) {
      if (node.slots && node.slots != undefined) {
        for (let slot of Object.keys(node.slots)) {
          if (
            node.slots[slot].selected &&
            node.slots[slot].selected != undefined
          ) {
            this.addItem(node.slots[slot].selected);
            this.recalculateAllItems(node.slots[slot].selected);
          }
        }
      }
    },
    removeRelatedAttachments(node) {
      if (node.slots && node.slots != undefined) {
        for (let slot of Object.keys(node.slots)) {
          if (
            node.slots[slot].selected &&
            node.slots[slot].selected != undefined
          ) {
            this.removeItem(node.slots[slot].selected);
            this.removeRelatedAttachments(node.slots[slot].selected);
          }
        }
      }
    },
    addRelatedAttachments(node) {
      if (node.slots && node.slots != undefined) {
        for (let slot of Object.keys(node.slots)) {
          if (
            node.slots[slot].selected &&
            node.slots[slot].selected != undefined
          ) {
            this.addItem(node.slots[slot].selected);
            this.addRelatedAttachments(node.slots[slot].selected);
          }
        }
      }
    },
    selectAttachment(bsgId) {
      // Find the attachment we want to remove in the list of available attachments
      // If the attachment isn't found, it returns undefined
      const attachment = this.availableAttachments.find(
        ({ bsg_id }) => bsg_id === bsgId
      );

      // Update the build tree with the newly selected attachment, or 'undefined' if 'none' was selected
      if (
        this.node.selected &&
        this.node.selected != undefined &&
        attachment != undefined
      ) {
        if (this.node.selected.bsg_id !== attachment.bsg_id) {
          this.removeRelatedAttachments(this.node.selected);
          this.removeItem(this.node.selected);
          this.node.selected = JSON.parse(JSON.stringify(attachment));
          this.addItem(this.node.selected);
          this.addRelatedAttachments(this.node.selected);
          this.calculateWeaponStats();
        }
      } else {
        if (attachment == undefined) {
          this.node.selected = undefined;
        } else {
          this.node.selected = JSON.parse(JSON.stringify(attachment));
        }
        this.refreshAllItems();
        this.recalculateAllItems(this.weapon);
        this.calculateWeaponStats();
      }
      this.setConflicts();
      this.$forceUpdate();
    },
    closePanel() {
      this.panel = undefined;
    },
    handleSelection(bsgId) {
      this.selectAttachment(bsgId);
      this.closePanel();
    },
    guid() {
      return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
        (
          c ^
          (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
        ).toString(16)
      );
    }
  },
  computed: {
    ...mapState("editLoadout", ["weapon"]),
    compatibleAttachments() {
      let listOfCompatibleAttachments = [];
      let types = Object.values(this.node.filter);
      for (const type of types) {
        for (const id of type) {
          let attachment = this.availableAttachments.find(
            ({ bsg_id }) => bsg_id === id
          );
          listOfCompatibleAttachments.push(attachment);
        }
      }
      return listOfCompatibleAttachments;
    },
    slots() {
      if (!this.node.slots) {
        return;
      }
      return Object.values(this.node.slots);
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
.pointer {
  cursor: pointer;
}
</style>
