<template>
  <div class="node-tree">
    <template v-if="node._kind !== 'firearm'">
      <v-sheet color="green" class="pl-1">
        <v-card class="mt-2 grey darken-3">
          <v-expansion-panels hover v-model="panel">
            <v-expansion-panel>

              <v-expansion-panel-header hide-actions>
                {{ slotName }}
                <template v-if="node.selected">
                  <v-img class="ml-4" :src="node.selected.image" :alt="node.selected.name" max-height="40" max-width="175" contain></v-img>
                  <span class="ml-2">{{ node.selected.name }}</span>
                </template>
                <template v-else>
                  <v-img src="../images/empty.png" alt="No attachment" max-height="40" max-width="175" contain></v-img>
                </template>
              </v-expansion-panel-header>

              <v-expansion-panel-content color="grey darken-3">
                <template>
                  <v-tooltip bottom color="grey darken-4">
                    <template v-slot:activator="{ on }">
                      <v-img class="mt-4 pointer" v-on="on" @click="selectAttachment('none'), closePanel()" src="../images/empty.png" alt="None"
                        max-height="40" max-width="150" contain></v-img>
                    </template>
                    <v-card color="grey darken-4" flat>
                      <v-card-title>None</v-card-title>
                    </v-card>
                  </v-tooltip>
                </template>
                <template v-for="attachment in compatibleAttachments">
                  <v-tooltip bottom color="grey darken-4">
                    <template v-slot:activator="{ on }">
                      <v-img class="mt-3 pointer" v-on="on" @click="selectAttachment(attachment.name), closePanel()" src="../images/empty.png"
                        :alt="attachment.name" max-height="40" max-width="150" contain></v-img>
                    </template>
                    <v-card color="grey darken-4" flat>
                      <v-card-title>{{ attachment.name }}</v-card-title>
                      <v-card-actions class="justify-center">
                        <ergonomics-chip class="ml-1 mr-1" :value="attachment.ergonomics ? attachment.ergonomics : 0"></ergonomics-chip>
                        <recoil-modifier-chip class="ml-1 mr-1" :value="attachment.recoil ? attachment.recoil : 0"></recoil-modifier-chip>
                      </v-card-actions>
                    </v-card>
                  </v-tooltip>
                </template>
              </v-expansion-panel-content>

            </v-expansion-panel>
          </v-expansion-panels>
          <template v-if="node.selected">
            <v-toolbar v-if="node.selected.slots" dense class="blue darken-3">Attachments fitting on {{ node.selected.name }}</v-toolbar>
            <ul v-if="node.selected.slots">
              <node v-for="child in node.selected.slots" :node="child"></node>
            </ul>
          </template>
        </v-card>
      </v-sheet>
    </template>

    <ul v-if="node.slots">
      <node v-for="child in slots" :node="child"></node>
    </ul>

  </div>
</template>

<script>
import ErgonomicsChip from './ErgonomicsChip';
import HorizontalRecoilChip from './HorizontalRecoilChip';
import VerticalRecoilChip from './VerticalRecoilChip';
import RecoilModifierChip from './RecoilModifierChip';

export default {
  name: 'node',
  props: {
    node: Object,
  },
  components: {
    ErgonomicsChip,
    HorizontalRecoilChip,
    VerticalRecoilChip,
    RecoilModifierChip,
  },
  methods: {
    selectAttachment(attachmentName) {
      const attachment = this.attachments.find(({
        name,
      }) => name === attachmentName);

      this.node.selected = attachment;
      this.$forceUpdate();
    },
    closePanel() {
      this.panel = undefined;
    },
  },
  computed: {
    compatibleAttachments() {
      let listOfCompatibleAttachments = [];
      let types = Object.values(this.node.filter);
      for (const type of types) {
        for (const id of type) {
          let attachment = this.attachments.find(({
            _id,
          }) => _id === id);
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
    slotName() {
      if (!this.node.filter) {
        return;
      }
      return Object.keys(this.node.filter)[0];
    }
  },
  data: () => ({
    panel: 1,
    attachments: [{
      _id: '5c90c3622e221601da359851',
      name: 'B-13V rail platform above reciever "Classic"',
      shortName: 'B-13V',
      description: 'The B-13 rail platform above receiver mounts on the standard Dovetail joint located on the PP-19-01 "Vityaz". Provides a platform for sighting devices.',
      price: 7600,
      weight: 0.158,
      maxStack: 1,
      rarity: 'none',
      grid: {
        color: {
          r: 28,
          g: 65,
          b: 86,
          a: 1,
        },
        height: 1,
        width: 1,
      },
      _modified: 1571536473,
      _kind: 'modificationMount',
      ergonomics: 0,
      raidModdable: 1,
      gridModifier: {
        height: 0,
        width: 0,
      },
      slots: {
        scope_00: {
          filter: {
            modificationMount: [
              '5c90c3622e221601da359851',
            ],
            modificationSight: [
              '5c90c3622e221601da359851',
            ],
          },
          required: false,
        },
      },
      compatibility: {
        firearm: [
          '57838ad32459774a17445cd2',
          '576165642459773c7a400233',
          '5c46fbd72e2216398b5a8c9c',
          '5839a40f24597726f856b511',
          '5ac66cb05acfc40198510a10',
          '5c501a4d2e221602b412b540',
          '57c44b372459772d2b39b8ce',
          '5a0ec13bfcdbcb00165aa685',
          '5ac4cd105acfc40016339859',
          '5ac66d725acfc43b321d4b60',
          '5ab8e9fcd8ce870019439434',
          '5644bd2b4bdc2d3b4c8b4572',
          '59984ab886f7743e98271174',
          '5ac66d2e5acfc43b321d4b53',
          '583990e32459771419544dd2',
          '5ac66d9b5acfc4001633997a',
          '5abcbc27d8ce8700182eceeb',
          '5ac66d015acfc400180ae6e4',
        ],
      },
      conflicts: {
        modificationMount: [
          '5648b6ff4bdc2d3d1c8b4581',
        ],
        modificationReceiver: [
          '59985a6c86f77414ec448d17',
        ],
        modificationSight: [
          '5c82342f2e221644f31c060e',
          '576fd4ec2459777f0b518431',
          '5c82343a2e221644f31c0611',
        ],
      },
    }],
  }),
};

</script>

<style scoped>
  .pointer {
    cursor: pointer;
  }

</style>
