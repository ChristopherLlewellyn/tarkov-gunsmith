<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" color="blue-grey darken-4">
        <span>Change Weapon</span>
        <v-icon right>mdi-swap-horizontal</v-icon>
      </v-btn>
    </template>

    <v-card>
      <v-toolbar flat>
        <v-text-field v-model="search" prepend-icon="mdi-magnify" label="Search weapons" class="pb-2 pt-2" single-line hide-details clearable>
        </v-text-field>
      </v-toolbar>
      <v-data-table :headers="headers" :items="availableWeapons" :search="search" :items-per-page="5" class="elevation-1">
        <template v-slot:item.img_big="{ item }">
          <div class="pt-1 pb-1 pl-1 pr-1">
            <v-img :src="item.img_big" alt="No image" max-height="125" max-width="300" contain></v-img>
          </div>
        </template>

        <template v-slot:item.ergonomics="{ item }">
          <ergonomics-chip class="ma-2" :value="item.ergonomics"></ergonomics-chip>
        </template>

        <template v-slot:item.horizontal_recoil="{ item }">
          <horizontal-recoil-chip class="ma-2" :value="item.horizontal_recoil"></horizontal-recoil-chip>
        </template>

        <template v-slot:item.vertical_recoil="{ item }">
          <vertical-recoil-chip class="ma-2" :value="item.vertical_recoil"></vertical-recoil-chip>
        </template>

        <template v-slot:item.rpm="{ item }">
          <rpm-chip :value="item.rpm"></rpm-chip>
        </template>

        <template v-slot:item.caliber="{ item }">
          <caliber-chip :value="item.caliber"></caliber-chip>
        </template>

        <template v-slot:item.type="{ item }">
          <type-chip :value="item.type"></type-chip>
        </template>

        <template v-slot:item.action="{ item }">
          <v-btn color="green" @click="setWeapon(item), refreshAllItems(), recalculateItems(), calculateWeaponStats(), dialog=false">
            Add
            <v-icon right>mdi-plus-circle-outline</v-icon>
          </v-btn>
        </template>
      </v-data-table>
    </v-card>

  </v-dialog>
</template>

<script>
  import {
    mapMutations,
    mapActions,
    mapState,
  } from 'vuex';
  import TypeChip from './TypeChip';
  import ErgonomicsChip from "./ErgonomicsChip";
  import HorizontalRecoilChip from "./HorizontalRecoilChip";
  import VerticalRecoilChip from "./VerticalRecoilChip";
  import RpmChip from "./RpmChip";
  import CaliberChip from "./CaliberChip";

  export default {

    methods: {
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

      recalculateItems() {
        this.recalculateAllItems(this.weapon);
      },

      ...mapMutations('createLoadout', [
        'setWeapon',
        'calculateWeaponStats',
        'refreshAllItems',
        'addItem'
      ]),

      ...mapActions('createLoadout', [
        'fetchWeapons',
      ]),
    },

    computed: {
      ...mapState('createLoadout', [
        'availableWeapons',
        'weapon'
      ]),
    },

    components: {
      TypeChip,
      ErgonomicsChip,
      HorizontalRecoilChip,
      VerticalRecoilChip,
      RpmChip,
      CaliberChip
    },

    data: () => ({
      dialog: false,

      search: '',

      headers: [{
          text: 'Image',
          value: 'img_big',
          sortable: false,
          filterable: false,
        },
        {
          text: 'Short Name',
          value: 'short_name',
        },
        {
          text: 'Full Name',
          value: 'name',
        },
        {
          text: 'Type',
          value: 'type',
        },
        {
          text: 'Ergonomics',
          value: 'ergonomics',
        },
        {
          text: 'Vertical Recoil',
          value: 'vertical_recoil',
        },
        {
          text: 'Horizontal Recoil',
          value: 'horizontal_recoil',
        },
        {
          text: 'RPM',
          value: 'rpm',
        },
        {
          text: 'Caliber',
          value: 'caliber',
        },
        {
          text: '',
          value: 'action',
          sortable: false,
        },
      ],
    }),
  };
</script>