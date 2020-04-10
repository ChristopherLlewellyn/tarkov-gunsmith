<template>
  <v-container grid-list-xs>
  <span class="bg"></span>
    <v-layout row wrap>

      <v-flex xs12>
        <v-text-field v-on:input="setLoadoutName" :rules="rules" prepend-icon="mdi-rename-box" label="Loadout name" class="pb-2 pt-2" single-line filled></v-text-field>
      </v-flex>

      <v-flex xs12>
        <v-alert type="error" :value="titleError">{{ titleError }}</v-alert>
      </v-flex>

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

      <v-flex xs12>
        <tree :tree-data="build" class="mt-2"></tree>
      </v-flex>

      <v-flex xs12>
        <attachment-selector></attachment-selector>
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
import AttachmentSelector from '@/components/AttachmentSelector.vue';
import Tree from '@/components/Tree.vue';

export default {
  mounted() {
    if (!this.isSignedIn) {
      return router.push('/sign-in');
    }
    this.fetchAttachments();
    this.fetchWeapons();
  },

  computed: {
    ...mapGetters('authentication', [
      'isSignedIn',
    ]),

    ...mapState('createLoadout', [
      'titleError',
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
    ]),
  },

  components: {
    WeaponSelector,
    AttachmentSelector,
    Tree
  },

  data: () => ({
    rules: [
      value => !!value || 'Required.',
      value => (value && value.length <= 45) || 'Max 45 characters',
    ],
    build: {
      _id: '574d967124597745970e7c94',
      name: 'Simonov Semi-Automatic Carbine SKS 7.62x39',
      shortName: 'SKS',
      description: "Soviet semi-automatic carbine designed by Sergei Simonov for 7.62x39 cartridge and known abroad as SKS-45. Immensely popular both in CIS countries and in the West, this weapon is still in active service in some countries in form of various copies and modifications. This particular specimen comes from extended storage warehouses of Tula Arms Plant and haven't yet undergo the civilian weapon normalization procedure.",
      price: 19331,
      weight: 2.627,
      maxStack: 1,
      rarity: 'rare',
      grid: {
        color: {
          r: 0,
          g: 0,
          b: 0,
          a: 1,
        },
        height: 1,
        width: 4,
      },
      _modified: 1571536468,
      _kind: 'firearm',
      type: 'primary',
      class: 'assaultCarbine',
      caliber: '7.62x39mm',
      rof: 40,
      action: 'gas',
      modes: [
        'single',
      ],
      velocity: 0,
      effectiveDist: 400,
      ergonomics: 40,
      foldRectractable: false,
      recoilVertical: 182,
      recoilHorizontal: 400,
      slots: {
        magazine: {
          filter: {
            magazine: [
              '5c90c3622e221601da359851',
              '5c90c3622e221601da359851',
              '5c90c3622e221601da359851',
            ],
          },
          required: false,
        },
        muzzle: {
          filter: {
            modificationMuzzle: [
              '5c90c3622e221601da359851',
            ],
          },
          required: false,
        },
        sightRear: {
          filter: {
            modificationSight: [
              '5c90c3622e221601da359851',
            ],
          },
          required: false,
        },
        stock: {
          filter: {
            modificationStock: [
              '5c90c3622e221601da359851',
              '5c90c3622e221601da359851',
              '5c90c3622e221601da359851',
            ],
          },
          required: true,
        },
      },
    },
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
