<template>
  <div class="node-tree">
    <template v-if="node.slot">
      <v-sheet color="green" class="pl-1">
        <v-card class="mt-2 grey darken-3">
          <v-expansion-panels hover v-model="panel">
            <v-expansion-panel>

              <v-expansion-panel-header hide-actions>
                {{ node.slot }}
                <template v-if="node.selected">
                  <v-img class="ml-4" :src="node.selected.image" :alt="node.selected.name" max-height="60" max-width="175" contain></v-img>
                  <span class="ml-2">{{ node.selected.name }}</span>
                </template>
                <template v-else>
                  <v-img src="../images/empty.png" alt="No attachment" max-height="60" max-width="175" contain></v-img>
                </template>
              </v-expansion-panel-header>

              <v-expansion-panel-content color="grey darken-3">
                <template>
                  <v-tooltip bottom color="grey darken-4">
                    <template v-slot:activator="{ on }">
                      <v-img class="mt-4 pointer" v-on="on" @click="selectAttachment('none'), closePanel()" src="../images/empty.png" alt="None"
                        max-height="60" max-width="150" contain></v-img>
                    </template>
                    <v-card color="grey darken-4" flat>
                      <v-card-title>None</v-card-title>
                    </v-card>
                  </v-tooltip>
                </template>
                <template v-for="attachment in node.compatibleAttachments">
                  <v-tooltip bottom color="grey darken-4">
                    <template v-slot:activator="{ on }">
                      <v-img class="mt-3 pointer" v-on="on" @click="selectAttachment(attachment.name), closePanel()" :src="attachment.image"
                        :alt="attachment.name" max-height="60" max-width="150" contain></v-img>
                    </template>
                    <v-card color="grey darken-4" flat>
                      <v-card-title>{{ attachment.name }}</v-card-title>
                      <v-card-actions class="justify-center">
                        <ergonomics-chip v-if="attachment.ergonomics" class="ml-1 mr-1" :value="attachment.ergonomics"></ergonomics-chip>
                        <recoil-modifier-chip v-if="attachment.recoil" class="ml-1 mr-1" :value="attachment.recoil"></recoil-modifier-chip>
                      </v-card-actions>
                    </v-card>
                  </v-tooltip>
                </template>
              </v-expansion-panel-content>

            </v-expansion-panel>
          </v-expansion-panels>
          <template v-if="node.selected">
            <v-toolbar v-if="node.selected.slots" dense class="blue darken-3">Attachments fitting on {{ node.selected.name }}</v-toolbar>
            <ul v-if="node.selected.slots && node.selected.slots.length">
              <node v-for="child in node.selected.slots" :node="child"></node>
            </ul>
          </template>
        </v-card>
      </v-sheet>
    </template>

    <ul v-if="node.slots && node.slots.length">
      <node v-for="child in node.slots" :node="child"></node>
    </ul>

  </div>
</template>

<script>
  import ErgonomicsChip from "./ErgonomicsChip";
  import HorizontalRecoilChip from "./HorizontalRecoilChip";
  import VerticalRecoilChip from "./VerticalRecoilChip";
  import RecoilModifierChip from "./RecoilModifierChip";

  export default {
    name: "node",
    props: {
      node: Object
    },
    components: {
      ErgonomicsChip,
      HorizontalRecoilChip,
      VerticalRecoilChip,
      RecoilModifierChip
    },
    methods: {
      selectAttachment: function (attachmentName) {
        let attachment = this.attachments.find(({
          name
        }) => name === attachmentName);

        this.node.selected = attachment;
        this.$forceUpdate();
      },
      closePanel: function () {
        this.panel = undefined;
      }
    },
    data: () => ({
      panel: 1,
      attachments: [{
          name: "SR-25 Upper",
          image: "https://gamepedia.cursecdn.com/escapefromtarkov_gamepedia/0/0e/Upper_receiver_KAC_7.62x51_for_SR-25_rifle_icon.png?version=f852255212d6f3be7ebc57e880731309",
          ergonomics: 5,
          slots: [{
            slot: "Barrel",
            compatibleAttachments: [{
              name: `16" barrel for SR-25 and compatible 7.62x51`,
              image: "https://gamepedia.cursecdn.com/escapefromtarkov_gamepedia/5/5a/16_INCH_SR-25_BARREL_ICON.png?version=8831fe6d71832a095e4b5d4f5676118b",
              ergonomics: -5,
              recoil: -5
            }]
          }]
        },
        {
          name: `16" barrel for SR-25 and compatible 7.62x51`,
          image: "https://gamepedia.cursecdn.com/escapefromtarkov_gamepedia/5/5a/16_INCH_SR-25_BARREL_ICON.png?version=8831fe6d71832a095e4b5d4f5676118b",
          ergonomics: -5,
          recoil: -5,
          slots: [{
            slot: "Muzzle",
            compatibleAttachments: [{
              name: `Daniel Defence Wave Muzzle Brake 7.62x51`,
              image: "https://gamepedia.cursecdn.com/escapefromtarkov_gamepedia/0/05/Wave_MB_7.62.png?version=a996fac7b996ccb2e7c54ffde5939dbc",
              recoil: -7
            }]
          }]
        },
        {
          name: "Colt A2 AR-15 pistol grip",
          image: "https://gamepedia.cursecdn.com/escapefromtarkov_gamepedia/7/7e/A2m4standard.png?version=5469f79c3bb903f063f02b3fe27e2d34",
          ergonomics: 5
        },
        {
          name: `Daniel Defence Wave Muzzle Brake 7.62x51`,
          image: "https://gamepedia.cursecdn.com/escapefromtarkov_gamepedia/0/05/Wave_MB_7.62.png?version=a996fac7b996ccb2e7c54ffde5939dbc",
          recoil: -7,
          slots: [{
            slot: "Muzzle",
            compatibleAttachments: [{
              name: `Daniel Defence Wave QD Sound Suppressor`,
              image: "https://gamepedia.cursecdn.com/escapefromtarkov_gamepedia/2/24/Wave_QD_Silencer_Icon.png?version=46687251d52b18d7d22119391234d9b2",
              ergonomics: -7,
              recoil: -7
            }]
          }]
        },
        {
          name: `Daniel Defence Wave QD Sound Suppressor`,
          image: "https://gamepedia.cursecdn.com/escapefromtarkov_gamepedia/2/24/Wave_QD_Silencer_Icon.png?version=46687251d52b18d7d22119391234d9b2",
          ergonomics: -7,
          recoil: -7
        },
        {
          name: "Ambi SR-25",
          image: "https://gamepedia.cursecdn.com/escapefromtarkov_gamepedia/e/ee/KAC_Ambidextrous_Charging_Handle_for_AR-10_icon.png?version=ef290fe68aca1e081f9f57ea641a5214",
          ergonomics: 1
        }
      ]
    })
  };
</script>

<style scoped>
  .pointer {
    cursor: pointer;
  }
</style>