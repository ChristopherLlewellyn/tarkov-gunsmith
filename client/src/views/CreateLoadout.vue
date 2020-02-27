<template>
  <v-container grid-list-xs>
  <span class="bg"></span>
    <v-layout row wrap>

      <v-flex xs12>
        <v-text-field v-on:input="setLoadoutName" :rules="rules" prepend-icon="mdi-rename-box" label="Loadout name" class="pb-2 pt-2" single-line filled></v-text-field>
      </v-flex>

      <v-flex xs12>
        <v-alert dismissible type="error" :value="titleError">{{ titleError }}</v-alert>
      </v-flex>

      <v-flex xs12 md4>
        <weapon-selector></weapon-selector>
      </v-flex>

      <v-flex xs12 md8>
        <attachment-selector></attachment-selector>
      </v-flex>

      <v-btn color="blue-grey darken-2" @click="createLoadout()">Publish</v-btn>

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
import WeaponSelector from '@/components/WeaponSelector.vue';
import AttachmentSelector from '@/components/AttachmentSelector.vue';

export default {
  mounted() {
    if (!this.isSignedIn) {
      return router.push('/sign-in');
    }
  },

  computed: {
    ...mapGetters('authentication', [
      'isSignedIn',
    ]),

    ...mapState('createLoadout', [
      'titleError',
    ])
  },

  methods: {
    ...mapActions('createLoadout', [
      'createLoadout',
    ]),

    ...mapMutations('createLoadout', [
      'setLoadoutName',
    ]),
  },

  components: {
    WeaponSelector,
    AttachmentSelector,
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
    position: absolute;
    top: 0;
    left: 0;
    background: url('../images/pmc1.png') no-repeat center center;
    background-size: cover;
    background-color: black;
    transform: scale(1);
  }
</style>
