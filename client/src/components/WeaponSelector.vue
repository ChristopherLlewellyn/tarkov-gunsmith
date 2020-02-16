<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card color="grey darken-4">
          <v-card-title class="blue-grey darken-2">Weapon</v-card-title>
          <v-container fluid>
            <v-img v-if="weapon.src !== null" :src="weapon.src" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              max-height="180">
              <v-card-title v-if="weapon.name !== null">{{weapon.name}}</v-card-title>
            </v-img>
          </v-container>
          <v-card-actions class="justify-center">
            <weapon-selector-dialog></weapon-selector-dialog>
          </v-card-actions>

          <v-divider></v-divider>
          <v-card-actions class="justify-center">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-chip class="ma-2" color="red darken-1" v-on="on">
                  <v-avatar left class="red darken-4">
                    <v-icon>mdi-axis</v-icon>
                  </v-avatar>
                  {{ weapon.type }}
                </v-chip>
              </template>
              <span>Type</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-chip class="ma-2" color="brown" v-on="on">
                  <v-avatar left class="brown darken-4">
                    <v-icon>mdi-chevron-triple-right</v-icon>
                  </v-avatar>
                  {{ weapon.rpm }}
                </v-chip>
              </template>
              <span>RPM</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-chip class="ma-2" color="purple" v-on="on">
                  <v-avatar left class="purple darken-4">
                    <v-icon>mdi-bullet</v-icon>
                  </v-avatar>
                  {{ weapon.calibre }}
                </v-chip>
              </template>
              <span>Calibre</span>
            </v-tooltip>
          </v-card-actions>

          <v-divider></v-divider>

          <v-card-actions class="justify-center">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-chip class="ma-2" color="green" v-on="on">
                  <v-avatar left class="green darken-4">
                    <v-icon>mdi-hand</v-icon>
                  </v-avatar>
                  {{ weaponStatsCalculated.ergonomics }}
                </v-chip>
              </template>
              <span>Ergonomics</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-chip class="ma-2" color="blue" v-on="on">
                  <v-avatar left class="blue darken-4">
                    <v-icon>mdi-arrow-split-horizontal</v-icon>
                  </v-avatar>
                  {{ weaponStatsCalculated.vertical_recoil }}
                </v-chip>
              </template>
              <span>Vertical Recoil</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-chip class="ma-2" color="blue" v-on="on">
                  <v-avatar left class="blue darken-4">
                    <v-icon>mdi-arrow-split-vertical</v-icon>
                  </v-avatar>
                  {{ weaponStatsCalculated.horizontal_recoil }}
                </v-chip>
              </template>
              <span>Horizontal Recoil</span>
            </v-tooltip>
          </v-card-actions>

        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {
    mapState
  } from 'vuex'
  import WeaponSelectorDialog from './WeaponSelectorDialog.vue'

  export default {
    components: {
      WeaponSelectorDialog,
    },

    computed: {
      ...mapState('createLoadout', [
        'weapon',
        'weaponStatsCalculated',
      ]),
    },
  };

</script>
