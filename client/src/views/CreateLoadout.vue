<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      
      <v-flex xs12>
        <v-text-field prepend-icon="mdi-rename-box" label="Loadout name" class="pb-2 pt-2" single-line filled></v-text-field>
      </v-flex>

      <v-flex xs12 md4>
        <weapon-selector></weapon-selector>
      </v-flex>

      <v-flex xs12 md8>
        <attachment-selector></attachment-selector>
      </v-flex>

      <v-btn color="blue-grey darken-2" @click="createLoadout">Publish</v-btn>

    </v-layout>
  </v-container>
</template>

<script>
  import {
    mapActions, 
    mapGetters
  } from 'vuex'

  import router from '../router'
  import WeaponSelector from '@/components/WeaponSelector.vue'
  import AttachmentSelector from '@/components/AttachmentSelector.vue'

  export default {
    mounted() {
      if (!this.isSignedIn) {
        return router.push('/sign-in')
      }
    },

    computed: {
      ...mapGetters('authentication', [
        'isSignedIn'
      ])
    },

    methods: {
      ...mapActions('createLoadout', [
        'createLoadout',
      ]),
    },

    components: {
      WeaponSelector,
      AttachmentSelector,
    },
  };

</script>
