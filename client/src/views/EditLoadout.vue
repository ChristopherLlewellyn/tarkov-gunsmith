<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      
      <v-flex xs12>
        <v-text-field v-on:input="setLoadoutName" prepend-icon="mdi-rename-box" label="Loadout name" class="pb-2 pt-2" single-line filled></v-text-field>
      </v-flex>

      <v-flex xs12 md4>
        <edit-weapon-selector></edit-weapon-selector>
      </v-flex>

      <v-flex xs12 md8>
        <edit-attachment-selector></edit-attachment-selector>
      </v-flex>

      <v-btn color="blue-grey darken-2" @click="editLoadout()">Publish</v-btn>

    </v-layout>
  </v-container>
</template>

<script>
  import {
    mapActions, 
    mapGetters,
    mapMutations,
  } from 'vuex'

  import router from '../router'
  import EditWeaponSelector from '@/components/EditWeaponSelector.vue'
  import EditAttachmentSelector from '@/components/EditAttachmentSelector.vue'

  export default {

    mounted() {
      if (!this.isSignedIn) {
        return router.push('/sign-in')
      }
      this.reset()
      this.setLoadoutId(this.$route.params.id)
      this.fillLoadoutDetails()
    },

    computed: {
      ...mapGetters('authentication', [
        'isSignedIn'
      ])
    },

    methods: {
      ...mapActions('editLoadout', [
        'fillLoadoutDetails',
        'editLoadout',
      ]),
      
      ...mapMutations('editLoadout', [
        'reset',
        'setLoadoutName',
        'setLoadoutId',
      ]),
    },

    components: {
      EditWeaponSelector,
      EditAttachmentSelector,
    },
  };

</script>
