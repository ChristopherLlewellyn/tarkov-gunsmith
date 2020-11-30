<template>
  <v-container fluid>
    <span class="bg"></span>
    <v-row justify="center">
      <v-card class="mt-2 mb-4 text-center">
        <v-card-title class="justify-center">
          <h2>Virion's Loadouts</h2>
        </v-card-title>
        <v-card-text>Virion's loadouts are high quality, featuring a variety of best-in-slot and budget weapon builds complete with optimal ammunition choices.</v-card-text>
      </v-card>
    </v-row>
    <v-data-iterator class="ml-8 mr-8" :items="loadouts" :items-per-page="-1" :search="search" :sort-by="sortBy.toLowerCase()" :sort-desc="sortDesc"
      hide-default-footer>
      <!-- Header -->
      <!-- DESKTOP VIEW (hide on small- screens) -->
      <template v-slot:header>
        <div class="d-none d-sm-block">
          <v-row justify="center">
            <v-toolbar flat max-width="900">
              <v-text-field v-model="search" clearable flat solo hide-details prepend-inner-icon="mdi-magnify" label="Loadout Name"></v-text-field>

              <v-select class="ml-4 mr-4" v-model="sortBy" flat solo hide-details :items="keys" prepend-inner-icon="mdi-sort" label="Sort by">
              </v-select>

              <v-btn-toggle class="ml-4 mr-4" v-model="sortDesc" mandatory>
                <v-btn medium depressed color="blue-grey darken-1" :value="false">
                  <v-icon>mdi-arrow-up</v-icon>
                </v-btn>
                <v-btn medium depressed color="blue-grey darken-1" :value="true">
                  <v-icon>mdi-arrow-down</v-icon>
                </v-btn>
              </v-btn-toggle>

              <v-btn-toggle class="ml-4 mr-4" v-model="viewMode" mandatory>
                <v-btn medium depressed color="blue-grey darken-1" value="list">
                  <v-icon>mdi-view-list</v-icon>
                </v-btn>
                <v-btn medium depressed color="blue-grey darken-1" value="grid">
                  <v-icon>mdi-view-grid</v-icon>
                </v-btn>
              </v-btn-toggle>
            </v-toolbar>
          </v-row>

          <v-row justify="center">
            <v-toolbar flat max-width="900">
              <loadouts-filter :gunNames="gunNames" @apply-filters="applyFilters"></loadouts-filter>
            </v-toolbar>
          </v-row>

          <v-row justify="center">
            <v-toolbar max-width="900" flat v-if="Object.keys(filters).length > 0">
              <v-spacer></v-spacer>
              <v-chip label class="ml-1 mr-1 indigo" v-if="filters.gun">
                <v-avatar left class="indigo darken-4">
                  <v-icon>mdi-pistol</v-icon>
                </v-avatar>
                {{ filters.gun }}
              </v-chip>
              <v-chip label class="ml-1 mr-1 teal" v-if="filters.priceRangeMin !== null && filters.priceRangeMax !== null">
                <v-avatar left class="teal darken-4">
                  <v-icon>mdi-currency-rub</v-icon>
                </v-avatar>
                {{ filters.priceRangeMin }} - {{ filters.priceRangeMax }}
              </v-chip>
              <v-spacer></v-spacer>
            </v-toolbar>
          </v-row>

          <v-row justify="center">
            <search-loadout-stat-key></search-loadout-stat-key>
          </v-row>
        </div>

        <!-- MOBILE VIEW (hide on medium+ screens) -->
        <div class="d-sm-none">
          <v-toolbar flat>
            <v-text-field v-model="search" clearable flat solo hide-details prepend-inner-icon="mdi-magnify" label="Loadout Name"></v-text-field>
          </v-toolbar>

          <v-toolbar flat>
            <v-select class="ml-4 mr-4" v-model="sortBy" flat solo hide-details :items="keys" prepend-inner-icon="mdi-sort" label="Sort by">
            </v-select>
          </v-toolbar>

          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-btn-toggle class="ml-4 mr-4" v-model="sortDesc" mandatory>
              <v-btn medium depressed color="blue-grey darken-1" :value="false">
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn medium depressed color="blue-grey darken-1" :value="true">
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>

            <v-btn-toggle class="ml-4 mr-4" v-model="viewMode" mandatory>
              <v-btn medium depressed color="blue-grey darken-1" value="list">
                <v-icon>mdi-view-list</v-icon>
              </v-btn>
              <v-btn medium depressed color="blue-grey darken-1" value="grid">
                <v-icon>mdi-view-grid</v-icon>
              </v-btn>
            </v-btn-toggle>
            <v-spacer></v-spacer>
          </v-toolbar>

          <search-loadout-stat-key></search-loadout-stat-key>
        </div>
      </template>

      <!-- Content -->
      <template v-slot:default="props">
        <v-row v-if="loading" class="fill-height ma-3" align="center" justify="center">
          <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
        </v-row>

        <v-row v-else>
          <loadout-list-view v-if="viewMode == 'list'" :loadouts="props.items" class="mt-2"></loadout-list-view>

          <template v-else-if="viewMode == 'grid'">
            <v-col v-for="loadout in props.items" :key="loadout.id" cols="12" sm="6" md="4" lg="3">
              <loadout-card :loadout="loadout"></loadout-card>
            </v-col>
          </template>
        </v-row>
      </template>
    </v-data-iterator>

    <v-row class="justify-center" v-if="loadouts.length == 0 && !loading">
      <v-card>
        <h4 class="ma-2">No loadouts found</h4>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
  import HTTP from "../http";
  import router from "../router";
  import LoadoutCard from "../components/LoadoutCard";
  import LoadoutListView from "../components/LoadoutListView";
  import SearchLoadoutStatKey from "../components/SearchLoadoutStatKey";
  import LoadoutsFilter from "../components/LoadoutsFilter";

  export default {
    metaInfo: {
      title: "Virion's Loadouts",
      titleTemplate: "%s - Tarkov Gunsmith"
    },

    mounted() {
      this.fetchVirionsLoadouts();
      this.fetchGuns();
    },

    components: {
      LoadoutCard,
      LoadoutListView,
      SearchLoadoutStatKey,
      LoadoutsFilter
    },

    methods: {
      fetchVirionsLoadouts() {
        return HTTP().get('/gunbuilds?username=virion', {
          params: {
            gun: this.filters.gun,
            priceRangeMin: this.filters.priceRangeMin,
            priceRangeMax: this.filters.priceRangeMax,
          }
        })
          .then(({
            data
          }) => {
            let loadouts = data.gunbuilds
            
            // Format the dates for display
            for (let loadout of loadouts) {
              loadout.created_at = this.formatDate(loadout.created_at);
            }

            this.loadouts = loadouts;
            this.loading = false;
          })
      },

      fetchGuns() {
        return HTTP().get('/guns')
          .then(({ data }) => {
            let guns = data.guns;
            let gunList = [];
            for (let i = 0; i < guns.length; i++) {
              let gun = guns[i].name;
              gunList.push(gun);
            }
            gunList.unshift('Any');
            this.gunNames = gunList;
          });
      },

      applyFilters(filters) {
        // Need to perform a clone in order to avoid "do not mutate outside the store"
        this.filters = Object.assign(filters);
        this.loading = true;
        this.fetchVirionsLoadouts();
      },

      formatDate(date) {
        const options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        };
        let dateNew = new Date(date);
        dateNew = dateNew.toLocaleDateString(undefined, options);

        return dateNew;
      },

      searchGunNames(val) {
        if (val) {
          this.setGunNamesFilter(
            this.gunNamesFilter.filter(
              gunName => gunName.toLowerCase().indexOf(val) !== -1
            )
          );
        } else {
          this.setGunNamesFilter(this.gunNames);
        }
      },
    },

    computed: {
      filteredKeys() {
        return this.keys.filter(key => key !== "Name");
      },
    },

    data() {
      return {
        loadouts: [],
        gunNames: [],
        loading: true,
        viewMode: 'list',
        search: "",
        filter: {},
        filters: {
          gun: 'Any',
          priceRangeMin: 0,
          priceRangeMax: 1500000
        },
        sortDesc: true,
        sortBy: "votes",
        keys: [
          "Votes",
          "Name",
          "Ergonomics_Final",
          "Vertical_Recoil_Final",
          "Horizontal_Recoil_Final",
          "Market_Price"
        ],
        transition: "scale-transition"
      };
    }
  };

</script>

<style scoped>
  .bg {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: url("../images/backgrounds/customs11.png") no-repeat center center;
    background-size: cover;
    background-color: black;
    transform: scale(1);
  }

</style>
