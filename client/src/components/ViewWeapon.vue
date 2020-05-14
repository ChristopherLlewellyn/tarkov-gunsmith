<template>
  <v-container>
    <v-layout row wrap column align-center>
      <v-flex xs12>
        <v-card>
          <v-card-title class="blue-grey darken-2 justify-center">
            <v-icon class="pr-2" large>mdi-pistol</v-icon>
            Weapon
          </v-card-title>
          <v-container fluid>
            <v-skeleton-loader :loading="loading" :transition="transition" max-height="180" type="image">
              <v-img v-if="weapon.img_big !== null" :src="weapon.img_big" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                max-height="180">
                <v-card-title v-if="weapon.name !== null">{{weapon.name}}</v-card-title>
              </v-img>
            </v-skeleton-loader>
          </v-container>

          <v-divider></v-divider>

          <v-card-actions class="justify-center">
            <type-chip :value="weapon.type"></type-chip>
            <rpm-chip :value="weapon.rpm"></rpm-chip>
            <caliber-chip :value="weapon.caliber"></caliber-chip>
          </v-card-actions>

          <v-divider></v-divider>

          <v-card-actions class="justify-center">
            <ergonomics-chip class="ma-2" :value="calculatedErgonomics"></ergonomics-chip>
            <vertical-recoil-chip class="ma-2" :value="calculatedVerticalRecoil"></vertical-recoil-chip>
            <horizontal-recoil-chip class="ma-2" :value="calculatedHorizontalRecoil"></horizontal-recoil-chip>
          </v-card-actions>

        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import {
    mapState,
  } from 'vuex';
  import TypeChip from './TypeChip';
  import ErgonomicsChip from "./ErgonomicsChip";
  import HorizontalRecoilChip from "./HorizontalRecoilChip";
  import VerticalRecoilChip from "./VerticalRecoilChip";
  import RpmChip from "./RpmChip";
  import CaliberChip from "./CaliberChip";

  export default {
    computed: {
      ...mapState('viewLoadout', [
        'weapon',
        'weaponStatsCalculated',
        'loading',
        'calculatedErgonomics',
        'calculatedHorizontalRecoil',
        'calculatedVerticalRecoil',
      ]),
    },

    data() {
      return {
        transition: 'scale-transition',
      };
    },

    components: {
      TypeChip,
      ErgonomicsChip,
      HorizontalRecoilChip,
      VerticalRecoilChip,
      RpmChip,
      CaliberChip
    }
  };
</script>