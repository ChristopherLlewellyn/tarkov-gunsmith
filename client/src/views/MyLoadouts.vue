<template>
  <v-container fluid>
    <span class="bg"></span>
    <v-row justify="center">
      <v-card class="mt-2 mb-4">
        <v-card-title class="justify-center">
          <h2>My Loadouts</h2>
        </v-card-title>
      </v-card>
    </v-row>
    <v-data-iterator
      class="ml-8 mr-8"
      :items="loadouts"
      :items-per-page.sync="itemsPerPage"
      :page="page"
      :search="search"
      :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc"
      hide-default-footer
    >
      <template v-slot:header>
        <v-toolbar class="mb-1">
          <v-text-field
            v-model="search"
            clearable
            flat
            solo
            hide-details
            prepend-inner-icon="mdi-magnify"
            label="Search"
          ></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select
              v-model="sortBy"
              flat
              solo
              hide-details
              :items="keys"
              prepend-inner-icon="mdi-sort"
              label="Sort by"
            ></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle v-model="sortDesc" mandatory>
              <v-btn medium depressed color="blue-grey darken-1" :value="false">
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn medium depressed color="blue-grey darken-1" :value="true">
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col v-for="loadout in props.items" :key="loadout.id" cols="12" sm="6" md="4" lg="3">
            <v-skeleton-loader
              :loading="loading"
              :transition-group="transition"
              height="400"
              type="card"
            >
              <loadout-card :loadout="loadout">
              </loadout-card>

              <v-card tile>
                <v-card-actions class="justify-center">
                  <v-btn class="ma-1" color="blue" :to="'/my-loadouts/edit/' + loadout.id">
                    <span>Edit</span>
                    <v-icon right>mdi-pencil</v-icon>
                  </v-btn>

                  <template>
                    <v-btn class="ma-1" color="red" @click="deleteItem(loadout.id)">
                      <span>Delete</span>
                      <v-icon right>mdi-delete</v-icon>
                    </v-btn>
                  </template>
                </v-card-actions>
              </v-card>
            </v-skeleton-loader>
          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row class="ma-2" align="center" justify="center">
          <v-card outlined>
            <span class="font-weight-medium grey--text ma-2">Items per page</span>
          </v-card>

          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn dark text color="primary" class="ml-2" v-on="on">
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(number, index) in itemsPerPageArray"
                :key="index"
                @click="updateItemsPerPage(number)"
              >
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <v-card class="mr-4" outlined>
            <span class="font-weight-medium grey--text ma-2">Page {{ page }} of {{ numberOfPages }}</span>
          </v-card>
          <v-btn fab small dark color="blue" class="mr-1" @click="formerPage">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab small dark color="blue" class="ml-1" @click="nextPage">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
        </v-row>
      </template>
    </v-data-iterator>
  </v-container>
</template>

<script>
import { mapGetters, mapState, mapActions, mapMutations } from "vuex";
import router from "../router";

import ErgonomicsChip from "../components/ErgonomicsChip";
import HorizontalRecoilChip from "../components/HorizontalRecoilChip";
import VerticalRecoilChip from "../components/VerticalRecoilChip";
import CaliberChip from "../components/CaliberChip";
import PriceChip from "../components/PriceChip";
import LoadoutCard from "../components/LoadoutCard";

export default {
  metaInfo: {
    title: "My Loadouts",
    titleTemplate: "%s - Tarkov Gunsmith"
  },
  
  mounted() {
    if (!this.isSignedIn) {
      return router.push("/sign-in");
    }
    this.fetchMyLoadouts();
  },

  components: {
    ErgonomicsChip,
    HorizontalRecoilChip,
    VerticalRecoilChip,
    CaliberChip,
    PriceChip,
    LoadoutCard
  },

  methods: {
    ...mapActions("myLoadouts", ["fetchMyLoadouts", "deleteLoadout"]),

    ...mapMutations("myLoadouts", ["setLoadoutToDelete"]),

    deleteItem(id) {
      this.setLoadoutToDelete(id);
      confirm("Are you sure you want to delete this loadout?") &&
        this.deleteLoadout();
    },

    viewLoadoutCard(id) {
      router.push(`/loadout/${id}`);
    },

    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    }
  },

  computed: {
    numberOfPages() {
      return Math.ceil(this.loadouts.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter(key => key !== "Name");
    },

    ...mapGetters("authentication", ["isSignedIn"]),

    ...mapState("myLoadouts", ["loadouts", "loading"])
  },

  data() {
    return {
      transition: "scale-transition",

      search: "",
      itemsPerPageArray: [8, 12, 16, 20],
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 8,
      sortBy: "name",
      keys: [
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
  background: url("../images/backgrounds/customs11.png") no-repeat center center;
  background-size: cover;
  background-color: black;
  transform: scale(1);
}
</style>