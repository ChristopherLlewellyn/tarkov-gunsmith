<template>
  <v-container fluid>
    <span class="bg"></span>
    <v-row justify="center">
      <v-card class="mt-2 mb-4">
        <v-card-title class="justify-center">
          <h2>Search Loadouts</h2>
        </v-card-title>
      </v-card>
    </v-row>
    <v-data-iterator
      class="ml-8 mr-8"
      :items="loadouts"
      :items-per-page="-1"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <!-- Header -->
      <!-- DESKTOP VIEW (hide on small- screens) -->
      <template v-slot:header>
        <div class="d-none d-sm-block">
          <v-row justify="center">
            <v-toolbar flat max-width="900">
              <v-text-field
                v-model="search"
                clearable
                flat
                solo
                hide-details
                prepend-inner-icon="mdi-magnify"
                label="Loadout Name"
              ></v-text-field>

              <v-select
                class="ml-4 mr-4"
                v-model="sortBy"
                @change="fetchLoadouts"
                flat
                solo
                hide-details
                :items="keys"
                prepend-inner-icon="mdi-sort"
                label="Sort by"
              ></v-select>

              <v-btn-toggle class="ml-4 mr-4" v-model="sortDesc" @change="fetchLoadouts" mandatory>
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
              <loadouts-filter :gunNames="gunNamesFilter" @apply-filters="applyFilters"></loadouts-filter>
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
            <v-text-field
              v-model="search"
              clearable
              flat
              solo
              hide-details
              prepend-inner-icon="mdi-magnify"
              label="Loadout Name"
            ></v-text-field>
          </v-toolbar>

          <v-toolbar flat>
            <v-select
              class="ml-4 mr-4"
              v-model="sortBy"
              @change="fetchLoadouts"
              flat
              solo
              hide-details
              :items="keys"
              prepend-inner-icon="mdi-sort"
              label="Sort by"
            ></v-select>
          </v-toolbar>

          <v-toolbar flat>
            <v-spacer></v-spacer>

            <v-btn-toggle class="ml-4 mr-4" v-model="sortDesc" @change="fetchLoadouts" mandatory>
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

          <v-toolbar flat>
            <loadouts-filter :gunNames="gunNamesFilter" @apply-filters="applyFilters"></loadouts-filter>
          </v-toolbar>

          <v-toolbar flat v-if="Object.keys(filters).length > 0">
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

          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-icon class="mr-1">mdi-axis</v-icon>
            <span class="type-key">Type</span>

            <v-divider class="ml-2 mr-2" vertical></v-divider>

            <v-icon class="mr-1">mdi-bullet</v-icon>
            <span class="caliber-key">Caliber</span>

            <v-divider class="ml-2 mr-2" vertical></v-divider>

            <v-icon class="mr-1">mdi-hand</v-icon>
            <span class="ergonomics-key">Ergo</span>

            <v-divider class="ml-2 mr-2" vertical></v-divider>

            <v-icon class="mr-1">mdi-arrow-split-horizontal</v-icon>
            <span class="recoil-key">V-Recoil</span>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-toolbar flat>
            <v-spacer></v-spacer>
            <v-icon class="mr-1">mdi-arrow-split-vertical</v-icon>
            <span class="recoil-key">H-Recoil</span>

            <v-divider class="ml-2 mr-2" vertical></v-divider>

            <v-icon class="mr-1">mdi-chevron-triple-right</v-icon>
            <span class="rpm-key">RPM</span>

            <v-divider class="ml-2 mr-2" vertical></v-divider>

            <v-icon class="mr-1">mdi-currency-rub</v-icon>
            <span class="price-key">Flea Market Price</span>
            <v-spacer></v-spacer>
          </v-toolbar>
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

    <v-row v-if="loadMore" class="fill-height ma-3" align="center" justify="center">
      <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
    </v-row>

    <v-row class="justify-center" v-if="loadouts.length == 0 && !loading">
      <v-card>
        <h4 class="ma-2">No loadouts found</h4>
      </v-card>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
import router from "../router";

import LoadoutCard from "../components/LoadoutCard";
import LoadoutsFilter from "../components/LoadoutsFilter";
import LoadoutListView from "../components/LoadoutListView";
import SearchLoadoutStatKey from "../components/SearchLoadoutStatKey";

export default {
  metaInfo: {
    title: "Search",
    titleTemplate: "%s - Tarkov Gunsmith"
  },
  
  mounted() {
    this.scroll()
    this.setOffset(0);
    this.setNoMoreLoadouts(false);
    this.fetchGuns();
    this.fetchLoadouts();
  },

  components: {
    LoadoutCard,
    LoadoutsFilter,
    LoadoutListView,
    SearchLoadoutStatKey
  },

  methods: {
    ...mapActions("searchLoadouts", ["fetchLoadouts", "fetchGuns"]),

    ...mapGetters("searchLoadouts", [
      "getSortBy", 
      "getSortDesc", 
      "getOffset", 
      "getLimit"
    ]),

    ...mapMutations("searchLoadouts", [
      "setGunToIndexBy",
      "setGunNamesFilter",
      "setFilters",
      "setSortBy",
      "setSortDesc",
      "setOffset",
      "setNoMoreLoadouts"
    ]),

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

    applyFilters(filters) {
      this.setFilters(filters);
      this.fetchLoadouts();
    },

    loadMoreLoadouts() {
      let newOffset = this.getOffset() + this.getLimit();
      this.setOffset(newOffset);
      this.fetchLoadouts(true);
    },

    scroll() {
      window.onscroll = () => {
        let bottomOfWindow = Math.max(window.pageYOffset, document.documentElement.scrollTop, document.body.scrollTop) + window.innerHeight === document.documentElement.offsetHeight;

        if (bottomOfWindow && !this.noMoreLoadouts) {
          this.loadMoreLoadouts();
        }
      }
    }
  },

  computed: {
    filteredKeys() {
      return this.keys.filter(key => key !== "Name");
    },

    ...mapState("searchLoadouts", [
      "loadouts",
      "loading",
      "loadMore",
      "guns",
      "gunNames",
      "gunNamesFilter",
      "filters",
      "noMoreLoadouts"
    ]),

    sortBy: {
      get() {
        return this.getSortBy();
      },
      set(newSortBy) {
        return this.setSortBy(newSortBy);
      }
    },

    sortDesc: {
      get() {
        return this.getSortDesc();
      },
      set(newSortDesc) {
        return this.setSortDesc(newSortDesc);
      }
    }
  },

  data() {
    return {
      transition: "scale-transition",
      gun: "",
      viewMode: "list",

      search: "",
      filter: {},
      keys: [
        "Votes",
        "Name",
        "Ergonomics_Final",
        "Vertical_Recoil_Final",
        "Horizontal_Recoil_Final",
        "Market_Price"
      ],
      dialog: false
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

  .weapon-key {
    font-size: 16px;
    font-weight: bold;
    color: #5C6BC0;
  }

  .type-key {
    font-size: 16px;
    font-weight: bold;
    color: #F44336;
  }

  .caliber-key {
    font-size: 16px;
    font-weight: bold;
    color: #AB47BC;
  }

  .ergonomics-key {
    font-size: 16px;
    font-weight: bold;
    color: #66BB6A;
  }

  .recoil-key {
    font-size: 16px;
    font-weight: bold;
    color: #42A5F5;
  }

  .rpm-key {
    font-size: 16px;
    font-weight: bold;
    color: #795548;
  }

  .price-key {
    font-size: 16px;
    font-weight: bold;
    color: #26A69A;
  }
</style>
