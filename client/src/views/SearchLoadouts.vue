<template>
  <v-container fluid>
    <span class="bg"></span>
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
      <!-- Hide on small- screens -->
      <template v-slot:header>
        <div class="d-none d-sm-block">
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

            <v-select
              class="ml-4 mr-4"
              v-model="sortBy"
              flat
              solo
              hide-details
              :items="keys"
              prepend-inner-icon="mdi-sort"
              label="Sort by"
            ></v-select>

            <v-btn-toggle class="ml-4 mr-4" v-model="sortDesc" mandatory>
              <v-btn medium depressed color="blue" :value="false">
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn medium depressed color="blue" :value="true">
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </v-toolbar>

          <v-toolbar flat>
            <loadouts-filter :gunNames="gunNamesFilter" @apply-filters="applyFilters"></loadouts-filter>
          </v-toolbar>
        </div>

        <!-- Hide on medium+ screens -->
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
            <v-btn-toggle class="ml-4 mr-4" v-model="sortDesc" mandatory>
              <v-btn medium depressed color="blue" :value="false">
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn medium depressed color="blue" :value="true">
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-toolbar flat>
            <loadouts-filter :gunNames="gunNamesFilter" @apply-filters="applyFilters"></loadouts-filter>
          </v-toolbar>
        </div>
      </template>

      <!-- Content -->
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
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
import router from "../router";

import LoadoutCard from "../components/LoadoutCard";
import LoadoutsFilter from "../components/LoadoutsFilter";

export default {
  mounted() {
    this.fetchGuns();
    this.fetchLoadouts();
  },

  components: {
    LoadoutCard,
    LoadoutsFilter
  },

  methods: {
    ...mapActions("searchLoadouts", ["fetchLoadouts", "fetchGuns"]),

    ...mapMutations("searchLoadouts", [
      "setGunToIndexBy",
      "setGunNamesFilter",
      "setFilters"
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
    }
  },

  computed: {
    filteredKeys() {
      return this.keys.filter(key => key !== "Name");
    },

    ...mapState("searchLoadouts", [
      "loadouts",
      "loading",
      "guns",
      "gunNames",
      "gunNamesFilter"
    ])
  },

  data() {
    return {
      transition: "scale-transition",
      gun: "",

      search: "",
      filter: {},
      sortDesc: true,
      sortBy: "votes",
      keys: [
        "Votes",
        "Name",
        "Ergonomics_Final",
        "Vertical_Recoil_Final",
        "Horizontal_Recoil_Final"
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
  background: url("../images/originalShells.png") no-repeat center center;
  background-size: cover;
  background-color: black;
  transform: scale(1);
}
</style>
