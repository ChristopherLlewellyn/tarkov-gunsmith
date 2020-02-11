<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card tile color="grey darken-4">
        <v-card-title class="blue-grey darken-2">Weapon</v-card-title>
        <v-container fluid>
          <v-img v-if="weapon.src !== null" :src="weapon.src" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
            max-height="180">
            <v-card-title v-if="weapon.title !== null">{{weapon.title}}</v-card-title>
          </v-img>
        </v-container>
        <v-card-actions class="justify-center">
          <weapon-selector-dialog></weapon-selector-dialog>
        </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import { mapState } from 'vuex'
  import WeaponSelectorDialog from './WeaponSelectorDialog.vue'

  export default {
    components: {
      WeaponSelectorDialog,
    },

    computed: {
      ...mapState('createLoadout', [
        'weapon',
      ]),
    },
  };

</script>
