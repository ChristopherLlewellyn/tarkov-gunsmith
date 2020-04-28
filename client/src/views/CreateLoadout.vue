<template>
  <v-container grid-list-xs>
    <span class="bg"></span>
    <v-layout row wrap>

      <!-- Loadout Title -->
      <v-flex xs12>
        <v-text-field v-on:input="setLoadoutName" :rules="rules" prepend-icon="mdi-rename-box" label="Loadout name" class="pb-2 pt-2" single-line
          filled></v-text-field>
      </v-flex>

      <v-flex xs12>
        <v-alert type="error" :value="titleError">{{ titleError }}</v-alert>
      </v-flex>

      <!-- Weapon Selector -->
      <v-flex xs12>
        <weapon-selector></weapon-selector>
        <v-divider></v-divider>
        <v-layout column align-center>
          <v-btn class="justify-center" color="blue-grey" @click="createLoadout()">
            <span>Publish</span>
            <v-icon right>mdi-publish</v-icon>
          </v-btn>
        </v-layout>
      </v-flex>

      <!-- Build Tree -->
      <v-flex xs12>
        <template v-if="weaponsLoading || attachmentsLoading" class="ma-4">
          <v-card>
            <v-card-title class="blue-grey darken-2">Build tree</v-card-title>
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular class="mt-4 mb-4" indeterminate color="grey lighten-5"></v-progress-circular>
            </v-row>
          </v-card>
        </template>

        <template v-if="!weaponsLoading && !attachmentsLoading">
          <tree v-if="!weaponsLoading && !attachmentsLoading" treeType='create' :tree-data="weapon" :availableAttachments="availableAttachments"
            :selectedAttachments="selectedAttachments" class="mt-2"></tree>
        </template>
      </v-flex>

      <!-- Summary Table -->
      <v-flex xs12>
        <build-list-table v-if="!weaponsLoading && !attachmentsLoading" :items="allItems"></build-list-table>
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
  import WeaponSelector from '@/components/WeaponSelector.vue';
  import BuildListTable from '@/components/BuildListTable.vue';
  import Tree from '@/components/Tree.vue';

  export default {
    mounted() {
      if (!this.isSignedIn) {
        return router.push('/sign-in');
      }
      this.reset();
      this.fetchAttachments();
      this.fetchWeapons();
    },

    computed: {
      ...mapGetters('authentication', [
        'isSignedIn',
      ]),

      ...mapState('createLoadout', [
        'weapon',
        'titleError',
        'availableAttachments',
        'weaponsLoading',
        'attachmentsLoading',
        'selectedAttachments',
        'availableWeapons',
        'allItems',
      ]),
    },

    methods: {
      ...mapActions('createLoadout', [
        'createLoadout',
        'fetchWeapons',
        'fetchAttachments',
      ]),

      ...mapMutations('createLoadout', [
        'setLoadoutName',
        'reset',
      ]),
    },

    components: {
      WeaponSelector,
      Tree,
      BuildListTable
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
    background: url('../images/pmc1.png') no-repeat center center;
    background-size: cover;
    background-color: black;
    transform: scale(1);
  }

</style>
