<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" color="blue-grey darken-4">Change Weapon</v-btn>
    </template>

    <v-card>
      <v-toolbar flat>
        <v-text-field v-model="search" prepend-icon="mdi-magnify" label="Search table" class="pb-2 pt-2" single-line hide-details>
        </v-text-field>
      </v-toolbar>
      <v-data-table :headers="headers" :items="availableWeapons" :search="search" :items-per-page="5" class="elevation-1">
        <template v-slot:item.image="{ item }">
          <div class="pt-1 pb-1 pl-1 pr-1">
            <v-img :src="item.image" alt="No image" max-height="125" max-width="300" contain></v-img>
          </div>
        </template>

        <template v-slot:item.ergonomics_base="{ item }">
          <v-chip color="green">
            <v-avatar left class="green darken-4">
              <v-icon>mdi-hand</v-icon>
            </v-avatar>
            {{ item.ergonomics_base }}
          </v-chip>
        </template>

        <template v-slot:item.horizontal_recoil_base="{ item }">
          <v-chip color="blue">
                <v-avatar left class="blue darken-4">
                  <v-icon>mdi-arrow-split-vertical</v-icon>
                </v-avatar>
                {{ item.horizontal_recoil_base }}
              </v-chip>
        </template>

        <template v-slot:item.vertical_recoil_base="{ item }">
          <v-chip color="blue">
                <v-avatar left class="blue darken-4">
                  <v-icon>mdi-arrow-split-horizontal</v-icon>
                </v-avatar>
                {{ item.vertical_recoil_base }}
              </v-chip>
        </template>

        <template v-slot:item.rpm="{ item }">
          <v-chip color="brown">
                <v-avatar left class="brown darken-4">
                  <v-icon>mdi-chevron-triple-right</v-icon>
                </v-avatar>
                {{ item.rpm }}
              </v-chip>
        </template>

        <template v-slot:item.calibre="{ item }">
          <v-chip color="purple">
                <v-avatar left class="purple darken-4">
                  <v-icon>mdi-bullet</v-icon>
                </v-avatar>
                {{ item.calibre }}
              </v-chip>
        </template>

        <template v-slot:item.type="{ item }">
          <v-chip color="red darken-1">
                <v-avatar left class="red darken-4">
                  <v-icon>mdi-axis</v-icon>
                </v-avatar>
                {{ item.type }}
              </v-chip>
        </template>

        <template v-slot:item.action="{ item }">
          <v-btn color="green" @click="setWeapon(item), calculateWeaponStats(), dialog=false">
            <v-icon>mdi-plus-circle-outline</v-icon>
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
    mapState
  } from 'vuex'

  export default {
    mounted() {
      this.fetchWeapons()
    },

    methods: {
      ...mapMutations('createLoadout', [
        'setWeapon',
        'calculateWeaponStats',
      ]),

      ...mapActions('createLoadout', [
        'fetchWeapons',
      ]),
    },

    computed: {
      ...mapState('createLoadout', [
        'availableWeapons',
      ]),
    },

    data: () => ({
      dialog: false,

      search: '',

      headers: [{
          text: 'Image',
          value: 'image',
          sortable: false,
          filterable: false
        },
        {
          text: 'Name',
          value: 'name'
        },
        {
          text: 'Type',
          value: 'type'
        },
        {
          text: 'Ergonomics',
          value: 'ergonomics_base'
        },
        {
          text: 'Vertical Recoil',
          value: 'vertical_recoil_base'
        },
        {
          text: 'Horizontal Recoil',
          value: 'horizontal_recoil_base'
        },
        {
          text: 'RPM',
          value: 'rpm'
        },
        {
          text: 'Calibre',
          value: 'calibre'
        },
        {
          text: '',
          value: 'action',
          sortable: false
        },
      ],
    }),
  };

</script>
