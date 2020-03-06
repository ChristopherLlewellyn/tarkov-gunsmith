<template>
  <v-container grid-list-xs>
  <span class="bg"></span>
    <v-layout row wrap>

      <v-flex xs12>
        <v-text-field v-model="name" :rules="rules" prepend-icon="mdi-rename-box" label="Loadout name" class="pb-2 pt-2" single-line filled></v-text-field>
      </v-flex>

      <v-flex xs12>
        <v-alert dismissible type="error" :value="titleError">{{ titleError }}</v-alert>
      </v-flex>

      <v-flex xs12 md4>
        <edit-weapon-selector></edit-weapon-selector>
        <v-divider></v-divider>
        <v-layout column align-center>
          <v-btn class="justify-center" color="blue-grey" @click="editLoadout()">
            <span>Publish</span>
            <v-icon right>mdi-publish</v-icon>
          </v-btn>
        </v-layout>
      </v-flex>

      <v-flex xs12 md8>
        <edit-attachment-selector></edit-attachment-selector>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import {
  mapActions,
  mapGetters,
  mapMutations,
  mapState,
} from 'vuex';

import router from '../router';
import EditWeaponSelector from '@/components/EditWeaponSelector.vue';
import EditAttachmentSelector from '@/components/EditAttachmentSelector.vue';

export default {

  mounted() {
    if (!this.isSignedIn) {
      return router.push('/sign-in');
    }
    this.reset();
    this.fetchAttachments();
    this.fetchWeapons();
    this.setLoadoutId(this.$route.params.id);
    this.fillLoadoutDetails();
  },

  computed: {
    name: {
      get() {
        return this.loadoutName;
      },
      set(name) {
        this.setLoadoutName(name);
      },
    },

    ...mapGetters('authentication', [
      'isSignedIn',
    ]),

    ...mapState('editLoadout', [
      'loadoutName',
      'titleError',
    ]),
  },

  methods: {
    ...mapActions('editLoadout', [
      'fillLoadoutDetails',
      'editLoadout',
      'fetchAttachments',
      'fetchWeapons',
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

  data: () => ({
    rules: [
      value => !!value || 'Required.',
      value => (value && value.length <= 45) || 'Max 45 characters',
    ],
  }),
};

</script>

<style scoped>
  .bg {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: url('../images/pmcAiming2.png') no-repeat center center;
    background-size: cover;
    background-color: black;
    transform: scale(1);
  }
</style>
