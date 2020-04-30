<template>
  <div class="node-tree">
    <!-- Checking that the node is not a firearm (or magazine, because we don't care about magazines) -->
    <template v-if="node.kind !== 'firearm' && slotName !== 'magazine'">
      <v-sheet color="green" class="pl-1">
        <v-card class="mt-2 grey darken-3">
          <v-expansion-panels hover v-model="panel">
            <v-expansion-panel>
              <!-- Unexpanded dropdown - displays selected attachment -->
              <v-expansion-panel-header hide-actions>
                {{ slotName ? slotName : 'Slot name missing' }}
                <template v-if="node.selected">
                  <attachment-image :imgUrl="node.selected.img" :name="node.selected.name" :ergonomicsModifier="node.selected.ergonomics_modifier"
                    :recoilModifier="node.selected.recoil_modifier" :weight="node.selected.weight" :marketPrice="node.selected.price"
                    :traderName="node.selected.trader_name" :traderPrice="node.selected.trader_price"
                    :traderCurrency="node.selected.trader_price_cur">
                  </attachment-image>
                  <span class="ml-2">{{ node.selected.short_name ? node.selected.short_name : 'Missing name' }}</span>
                </template>
                <template v-else>
                  <v-img :src="emptySelection" alt="No attachment" max-height="60" max-width="175" contain></v-img>
                </template>
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
                              <v-img class="ma-2 pointer" v-on="on" @click="selectAttachment('none'), closePanel()" :src="emptySelection" alt="None"
                                max-height="60" max-width="150" contain>
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
                      <v-flex xs6 sm3 md2 lg1 v-for="(attachment, index) in compatibleAttachments" :key="'C' + index">
                        <attachment-image @handle-click="handleSelection" :imgUrl="attachment.img" :name="attachment.name"
                          :ergonomicsModifier="attachment.ergonomics_modifier" :recoilModifier="attachment.recoil_modifier"
                          :weight="attachment.weight" :marketPrice="attachment.avg_24h_price" :traderName="attachment.trader_name"
                          :traderPrice="attachment.trader_price" :traderCurrency="attachment.trader_price_cur">
                        </attachment-image>
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
              <v-toolbar dense class="blue darken-3">Attachments fitting on {{ node.selected.short_name ? node.selected.short_name : 'missing name' }}
              </v-toolbar>
              <ul>
                <node v-for="(child, index) in Object.values(node.selected.slots)" :key="'B' + index" :node="child" :availableAttachments="availableAttachments"
                  :slotName="Object.keys(node.selected.slots)[index]"></node>
              </ul>
            </template>
          </template>

        </v-card>
      </v-sheet>
    </template>

    <!-- If the node is of kind 'firearm' then we just render the firearm's slots -->
    <ul v-if="node.slots && node.slots !== undefined">
      <node v-for="(child, index) in slots" :key="'A' + index" :node="child" :availableAttachments="availableAttachments"
        :slotName="Object.keys(node.slots)[index]"></node>
    </ul>

  </div>
</template>

<script>
  import {
    mapMutations,
    mapState
  } from 'vuex';

  import ErgonomicsChip from './ErgonomicsChip';
  import HorizontalRecoilChip from './HorizontalRecoilChip';
  import VerticalRecoilChip from './VerticalRecoilChip';
  import RecoilModifierChip from './RecoilModifierChip';
  import WeightChip from './WeightChip';
  import TraderPriceCard from './TraderPriceCard';
  import MarketPriceCard from './MarketPriceCard';
  import AttachmentImage from './AttachmentImage';

  export default {
    name: 'node',
    props: {
      node: Object,
      availableAttachments: Array,
      slotName: String,
    },
    components: {
      ErgonomicsChip,
      HorizontalRecoilChip,
      VerticalRecoilChip,
      RecoilModifierChip,
      WeightChip,
      TraderPriceCard,
      MarketPriceCard,
      AttachmentImage
    },
    methods: {
      ...mapMutations('editLoadout', [
        'refreshAllItems',
        'addItem',
        'calculateWeaponStats'
      ]),
      recalculateAllItems(node) {
        if (node.slots && node.slots != undefined) {
          for (let slot of Object.keys(node.slots)) {
            if (node.slots[slot].selected && node.slots[slot].selected != undefined) {
              this.addItem(node.slots[slot].selected)
              this.recalculateAllItems(node.slots[slot].selected);
            }
          }
        }
      },
      selectAttachment(attachmentName) {
        // Find the attachment we want to remove in the list of available attachments
        // If the attachment isn't found, it returns undefined
        const attachment = this.availableAttachments.find(({
          name,
        }) => name === attachmentName);

        // Update the build tree with the newly selected attachment, or 'undefined' if 'none' was selected
        this.node.selected = attachment;

        this.refreshAllItems();
        this.recalculateAllItems(this.weapon);
        this.calculateWeaponStats();

        this.$forceUpdate();
      },
      closePanel() {
        this.panel = undefined;
      },
      handleSelection(attachmentName) {
        this.selectAttachment(attachmentName);
        this.closePanel();
      }
    },
    computed: {
      ...mapState('editLoadout', [
        'weapon',
      ]),
      compatibleAttachments() {
        let listOfCompatibleAttachments = [];
        let types = Object.values(this.node.filter);
        for (const type of types) {
          for (const id of type) {
            let attachment = this.availableAttachments.find(({
              bsg_id,
            }) => bsg_id === id);
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
      },
    },
    data: () => ({
      panel: 1,
      noImage: require("../images/no-image-attachment.png"),
      emptySelection: require("../images/empty.png")
    }),
  };

</script>

<style scoped>
  .pointer {
    cursor: pointer;
  }

</style>
