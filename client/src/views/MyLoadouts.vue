<template>

  <v-container fluid>
    <v-data-iterator :items="loadouts" :items-per-page.sync="itemsPerPage" :page="page" :search="search" :sort-by="sortBy.toLowerCase()"
      :sort-desc="sortDesc" hide-default-footer>
      <template v-slot:header>
        <v-toolbar class="mb-1">
          <v-text-field v-model="search" clearable flat solo hide-details prepend-inner-icon="mdi-magnify" label="Search"></v-text-field>
          <template v-if="$vuetify.breakpoint.mdAndUp">
            <v-spacer></v-spacer>
            <v-select v-model="sortBy" flat solo hide-details :items="keys" prepend-inner-icon="mdi-sort" label="Sort by"></v-select>
            <v-spacer></v-spacer>
            <v-btn-toggle v-model="sortDesc" mandatory>
              <v-btn large depressed color="blue" :value="false">
                <v-icon>mdi-arrow-up</v-icon>
              </v-btn>
              <v-btn large depressed color="blue" :value="true">
                <v-icon>mdi-arrow-down</v-icon>
              </v-btn>
            </v-btn-toggle>
          </template>
        </v-toolbar>
      </template>

      <template v-slot:default="props">
        <v-row>
          <v-col v-for="loadout in props.items" :key="loadout.id" cols="12" sm="6" md="4" lg="3">

            <v-skeleton-loader :loading="loading" :transition="transition" height="400" type="card">
              <v-card @click="'/loadouts/' + loadout.id">
                <v-toolbar>
                  {{ loadout.name }}
                </v-toolbar>
                <v-container fluid>
                  <v-img :src="loadout.gun_image" class="white--text align-end" height="120">
                    <v-card-title>{{ loadout.gun_name }}</v-card-title>
                  </v-img>
                </v-container>

                <v-divider></v-divider>

                <v-card-actions class="justify-center">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-chip class="mr-1 ml-1" color="red darken-1" v-on="on">
                        <v-avatar left class="red darken-4">
                          <v-icon>mdi-axis</v-icon>
                        </v-avatar>
                        {{ loadout.gun_type }}
                      </v-chip>
                    </template>
                    <span>Type</span>
                  </v-tooltip>

                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-chip class="mr-1 ml-1" color="brown" v-on="on">
                        <v-avatar left class="brown darken-4">
                          <v-icon>mdi-chevron-triple-right</v-icon>
                        </v-avatar>
                        {{ loadout.gun_rpm }}
                      </v-chip>
                    </template>
                    <span>RPM</span>
                  </v-tooltip>

                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-chip class="mr-1 ml-1" color="purple" v-on="on">
                        <v-avatar left class="purple darken-4">
                          <v-icon>mdi-bullet</v-icon>
                        </v-avatar>
                        {{ loadout.gun_calibre }}
                      </v-chip>
                    </template>
                    <span>Calibre</span>
                  </v-tooltip>
                </v-card-actions>


                <v-card-actions class="justify-center">
                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-chip class="mr-1 ml-1" color="green" v-on="on">
                        <v-avatar left class="green darken-4">
                          <v-icon>mdi-hand</v-icon>
                        </v-avatar>
                        {{ loadout.ergonomics_final }}
                      </v-chip>
                    </template>
                    <span>Ergonomics</span>
                  </v-tooltip>

                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-chip class="mr-1 ml-1" color="blue" v-on="on">
                        <v-avatar left class="blue darken-4">
                          <v-icon>mdi-arrow-split-horizontal</v-icon>
                        </v-avatar>
                        {{ loadout.vertical_recoil_final }}
                      </v-chip>
                    </template>
                    <span>Vertical Recoil</span>
                  </v-tooltip>

                  <v-tooltip bottom>
                    <template v-slot:activator="{ on }">
                      <v-chip class="mr-1 ml-1" color="blue" v-on="on">
                        <v-avatar left class="blue darken-4">
                          <v-icon>mdi-arrow-split-vertical</v-icon>
                        </v-avatar>
                        {{ loadout.horizontal_recoil_final }}
                      </v-chip>
                    </template>
                    <span>Horizontal Recoil</span>
                  </v-tooltip>
                </v-card-actions>

                <v-card-actions class="justify-center">
                  <span class="font-weight-light">Updated</span>
                  &nbsp;
                  <span class="font-weight-medium">{{ loadout.updated_at }}</span>
                </v-card-actions>

                <v-card-actions class="justify-center">
                  <v-btn class="ma-1" color="blue" :to="'/my-loadouts/edit/' + loadout.id">
                    <span>Edit</span>
                    <v-icon right>mdi-pencil</v-icon>
                  </v-btn>

                  <v-dialog v-model="dialog" width="400">
                    <template v-slot:activator="{ on }">
                      <v-btn class="ma-1" color="red" @click="setLoadoutToDelete(loadout.id)" v-on="on">
                        <span>Delete</span>
                        <v-icon right>mdi-delete</v-icon>
                      </v-btn>
                    </template>

                    <v-card class="grey darken-4">
                      <v-card-title class="headline justify-center grey darken-3" primary-title>
                        Delete loadout?
                      </v-card-title>

                      <v-card-actions class="justify-center">
                        <v-btn color="green" @click="deleteLoadout(), dialog = false">
                          <v-icon>mdi-check</v-icon>
                        </v-btn>

                        <v-btn color="red" @click="dialog = false">
                          <v-icon>mdi-cancel</v-icon>
                        </v-btn>

                      </v-card-actions>
                    </v-card>
                  </v-dialog>

                </v-card-actions>
              </v-card>

            </v-skeleton-loader>

          </v-col>
        </v-row>
      </template>

      <template v-slot:footer>
        <v-row class="ma-2" align="center" justify="center">
          <span class="white--text">Items per page</span>
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn dark text color="primary" class="ml-2" v-on="on">
                {{ itemsPerPage }}
                <v-icon>mdi-chevron-down</v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item v-for="(number, index) in itemsPerPageArray" :key="index" @click="updateItemsPerPage(number)">
                <v-list-item-title>{{ number }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-spacer></v-spacer>

          <span class="mr-4
              white--text">
            Page {{ page }} of {{ numberOfPages }}
          </span>
          <v-btn fab dark color="blue" class="mr-1" @click="formerPage">
            <v-icon>mdi-chevron-left</v-icon>
          </v-btn>
          <v-btn fab dark color="blue" class="ml-1" @click="nextPage">
            <v-icon>mdi-chevron-right</v-icon>
          </v-btn>
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

export default {
  mounted() {
    if (!this.isSignedIn) {
      return router.push('/sign-in');
    }
    this.fetchMyLoadouts();
  },

  methods: {
    ...mapActions('myLoadouts', [
      'fetchMyLoadouts',
      'deleteLoadout',
    ]),

    ...mapMutations('myLoadouts', [
      'setLoadoutToDelete',
    ]),

    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
  },

  computed: {
    numberOfPages() {
      return Math.ceil(this.loadouts.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter(key => key !== 'Name');
    },

    ...mapGetters('authentication', [
      'isSignedIn',
    ]),

    ...mapState('myLoadouts', [
      'loadouts',
      'loading',
    ]),
  },

  data() {
    return {
      transition: 'scale-transition',

      search: '',
      itemsPerPageArray: [8, 12, 16, 20],
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 8,
      sortBy: 'name',
      keys: [
        'Name',
        'Type',
        'Ergonomics_Final',
        'Vertical_Recoil_Final',
        'Horizontal_Recoil_Final',
      ],
      dialog: false,
    };
  },
};

</script>
