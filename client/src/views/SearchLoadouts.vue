<template>
  <v-container fluid>
    <span class="bg"></span>
    <v-data-iterator :items="loadouts" :items-per-page="-1" :search="search" :sort-by="sortBy.toLowerCase()" :sort-desc="sortDesc"
      hide-default-footer>
      <template v-slot:header>
        <v-toolbar class="mb-1">
          <v-text-field v-model="search" clearable flat solo hide-details prepend-inner-icon="mdi-magnify" label="Search"></v-text-field>
          <v-spacer></v-spacer>
          <v-select v-model="gun" @change="setGunToIndexBy(gun), fetchLoadouts()" flat solo dense hide-details :items="gunNamesFilter"
            prepend-inner-icon="mdi-pistol" label="Gun">
            <template v-slot:prepend-item>
              <v-text-field class="pa-2" label="Search" @input="searchGunNames" clearable />
            </template>
          </v-select>
          <template>
            <v-spacer></v-spacer>
            <v-select v-model="sortBy" flat solo dense hide-details :items="keys" prepend-inner-icon="mdi-sort" label="Sort by"></v-select>
            <v-spacer></v-spacer>

            <v-btn-toggle v-model="sortDesc" mandatory>
              <v-btn medium depressed color="blue" :value="false">
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn medium depressed color="blue" :value="true">
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>

            <v-spacer></v-spacer>

          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">

        <v-row v-if="loading" class="fill-height ma-3" align="center" justify="center">
          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
        </v-row>

        <v-row v-else>
          <v-col v-for="loadout in props.items" :key="loadout.id" cols="12" sm="6" md="4" lg="3">
            <loadout-card :loadout="loadout"></loadout-card>
          </v-col>
        </v-row>

      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
  import {
    mapGetters,
    mapState,
    mapActions,
    mapMutations,
  } from 'vuex';
  import router from '../router';

  import LoadoutCard from "../components/LoadoutCard";

  export default {
    mounted() {
      this.fetchGuns();
      this.fetchLoadouts();
    },

    components: {
      LoadoutCard
    },

    methods: {
      ...mapActions('searchLoadouts', [
        'fetchLoadouts',
        'fetchGuns',
      ]),

      ...mapMutations('searchLoadouts', [
        'setGunToIndexBy',
        'setGunNamesFilter',
      ]),

      searchGunNames(val) {
        if (val) {
          this.setGunNamesFilter(this.gunNamesFilter.filter(gunName => gunName.toLowerCase().indexOf(val) !== -1));
        } else {
          this.setGunNamesFilter(this.gunNames);
        }
      },
    },

    computed: {
      filteredKeys() {
        return this.keys.filter(key => key !== 'Name');
      },

      ...mapState('searchLoadouts', [
        'loadouts',
        'loading',
        'guns',
        'gunNames',
        'gunNamesFilter',
      ]),
    },

    data() {
      return {
        transition: 'scale-transition',
        gun: '',

        search: '',
        filter: {},
        sortDesc: true,
        sortBy: 'votes',
        keys: [
          'Votes',
          'Name',
          'Ergonomics_Final',
          'Vertical_Recoil_Final',
          'Horizontal_Recoil_Final',
        ],
        dialog: false,
      };
    },
  };

</script>

<style scoped>
  .bg {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: url('../images/originalShells.png') no-repeat center center;
    background-size: cover;
    background-color: black;
    transform: scale(1);
  }

</style>
