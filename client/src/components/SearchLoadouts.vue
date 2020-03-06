<template>
  <div>
    <!-- CARD VIEW -->
    <v-container fluid v-if="layout === 'cards'">
      <v-data-iterator :items="loadouts" :items-per-page.sync="itemsPerPage" :page="page" :search="search" :sort-by="sortBy.toLowerCase()"
        :sort-desc="sortDesc" hide-default-footer>
        <template v-slot:header>
          <v-toolbar class="mb-1">
            <v-text-field v-model="search" clearable flat solo hide-details prepend-inner-icon="mdi-magnify" label="Search"></v-text-field>
            <v-spacer></v-spacer>
            <v-select v-model="gun" @change="setGunToIndexBy(gun), fetchLoadouts()" flat solo hide-details :items="gunNamesFilter"
              prepend-inner-icon="mdi-pistol" label="Gun">
              <template v-slot:prepend-item>
                <v-text-field class="pa-2" label="Search" @input="searchGunNames" />
              </template>
            </v-select>
            <template>
              <v-spacer></v-spacer>
              <v-select v-model="sortBy" flat solo hide-details :items="keys" prepend-inner-icon="mdi-sort" label="Sort by"></v-select>
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

              <v-btn-toggle v-model="layout" mandatory>
                <v-btn medium depressed color="blue" :value="'cards'">
                  <v-icon>mdi-view-grid</v-icon>
                </v-btn>
                <v-btn medium depressed color="blue" :value="'table'">
                  <v-icon>mdi-table-of-contents</v-icon>
                </v-btn>
              </v-btn-toggle>

            </template>
          </v-toolbar>
        </template>

        <template v-slot:default="props">
          <v-row>
            <v-col v-for="loadout in props.items" :key="loadout.id" cols="12" sm="6" md="6" lg="3">

              <v-skeleton-loader :loading="loading" :transition="transition" height="400" type="card">
                <v-card>
                  <v-toolbar @click="viewLoadoutCard(loadout.id)" style="cursor:pointer">
                    {{ loadout.name }}
                    <v-spacer></v-spacer>
                    <v-card outlined class="d-flex flex-row ma-2">
                      <template v-if="loadout.votes < 0">
                        <v-icon color="red" class="ma-2">mdi-thumb-down</v-icon>
                        <h4 class="ma-2 red--text">{{ loadout.votes }}</h4>
                      </template>

                      <template v-else-if="loadout.votes > 0">
                        <v-icon color="green" class="ma-2">mdi-thumb-up</v-icon>
                        <h4 class="ma-2 green--text">{{ loadout.votes }}</h4>
                      </template>

                      <template v-else>
                        <v-icon color="grey" class="ma-2">mdi-thumbs-up-down</v-icon>
                        <h4 class="ma-2 grey--text">{{ loadout.votes }}</h4>
                      </template>
                    </v-card>
                  </v-toolbar>

                  <v-container fluid>
                    <v-img @click="viewLoadoutCard(loadout.id)" style="cursor:pointer" :src="loadout.gun_image" class="white--text align-end"
                      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="120">
                      <v-card-title>{{ loadout.gun_name }}</v-card-title>
                    </v-img>
                  </v-container>

                  <v-divider></v-divider>

                  <v-card-actions class="justify-center">

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
                    <span class="font-weight-light">Loadout by</span>
                    &nbsp;
                    <span class="font-weight-bold orange--text">{{ loadout.username }}</span>
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
                <v-list-item v-for="(number, index) in itemsPerPageArray" :key="index" @click="updateItemsPerPage(number)">
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

    <!-- TABLE VIEW -->
    <v-container fluid v-if="layout === 'table'">
      <v-toolbar flat>
        <v-text-field v-model="search" clearable flat solo hide-details prepend-inner-icon="mdi-magnify" label="Search"></v-text-field>
        </v-text-field>
        <v-spacer></v-spacer>
        <v-select v-model="gun" @change="setGunToIndexBy(gun), fetchLoadouts()" flat dense solo hide-details :items="gunNamesFilter"
          prepend-inner-icon="mdi-pistol" label="Gun">
          <template v-slot:prepend-item>
            <v-text-field dense class="pa-2" label="Search" @input="searchGunNames" />
          </template>
        </v-select>

        <v-spacer></v-spacer>

        <v-btn-toggle v-model="layout" mandatory>
          <v-btn medium depressed color="blue" :value="'cards'">
            <v-icon>mdi-view-grid</v-icon>
          </v-btn>
          <v-btn medium depressed color="blue" :value="'table'">
            <v-icon>mdi-table-of-contents</v-icon>
          </v-btn>
        </v-btn-toggle>

      </v-toolbar>
      <v-skeleton-loader :loading="loading" :transition="transition" type="table-tbody">
        <v-data-table :headers="headers" :items="loadouts" :search="search" @click:row="viewLoadoutTable" :items-per-page="10" class="elevation-1"
          style="cursor:pointer">

          <template v-slot:item.image="{ item }">
            <div class="pt-1 pb-1 pl-1 pr-1">
              <v-img :src="item.gun_image" alt="No image" max-height="125" max-width="300" contain class="align-end">
                <p class="pl-2">{{ item.gun_name }}</p>
              </v-img>
            </div>
          </template>

          <template v-slot:item.name="{ item }">
            <span class="font-weight-medium">{{ item.name }}</span>
          </template>

          <template v-slot:item.ergonomics_final="{ item }">
            <v-chip color="green">
              <v-avatar left class="green darken-4">
                <v-icon>mdi-hand</v-icon>
              </v-avatar>
              {{ item.ergonomics_final }}
            </v-chip>
          </template>

          <template v-slot:item.horizontal_recoil_final="{ item }">
            <v-chip color="blue">
              <v-avatar left class="blue darken-4">
                <v-icon>mdi-arrow-split-vertical</v-icon>
              </v-avatar>
              {{ item.horizontal_recoil_final }}
            </v-chip>
          </template>

          <template v-slot:item.vertical_recoil_final="{ item }">
            <v-chip color="blue">
              <v-avatar left class="blue darken-4">
                <v-icon>mdi-arrow-split-horizontal</v-icon>
              </v-avatar>
              {{ item.vertical_recoil_final }}
            </v-chip>
          </template>

          <template v-slot:item.gun_calibre="{ item }">
            <v-chip color="purple">
              <v-avatar left class="purple darken-4">
                <v-icon>mdi-bullet</v-icon>
              </v-avatar>
              {{ item.gun_calibre }}
            </v-chip>
          </template>

          <template v-slot:item.username="{ item }">
            <span class="font-weight-bold orange--text">{{ item.username }}</span>
          </template>

          <template v-slot:item.updated_at="{ item }">
            <span class="font-weight-medium">{{ item.updated_at }}</span>
          </template>

          <template v-slot:item.votes="{ item }">
            <v-card outlined class="d-flex flex-row ma-2 justify-center">
              <template v-if="item.votes < 0">
                <v-icon color="red" class="ma-2">mdi-thumb-down</v-icon>
                <h4 class="ma-2 red--text">{{ item.votes }}</h4>
              </template>

              <template v-else-if="item.votes > 0">
                <v-icon color="green" class="ma-2">mdi-thumb-up</v-icon>
                <h4 class="ma-2 green--text">{{ item.votes }}</h4>
              </template>

              <template v-else>
                <v-icon color="grey" class="ma-2">mdi-thumbs-up-down</v-icon>
                <h4 class="ma-2 grey--text">{{ item.votes }}</h4>
              </template>
            </v-card>
          </template>
        </v-data-table>
      </v-skeleton-loader>
    </v-container>
  </div>
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
    this.fetchGuns();
    this.fetchLoadouts();
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

    viewLoadoutCard(id) {
      router.push(`/loadout/${id}`);
    },

    viewLoadoutTable(item) {
      router.push(`/loadout/${item.id}`);
    },

    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },

    searchGunNames(val) {
      if (val) {
        this.setGunNamesFilter(this.gunNamesFilter.filter(gunName => gunName.toLowerCase().indexOf(val) !== -1));
      } else {
        this.setGunNamesFilter(this.gunNames);
      }
    },
  },

  computed: {
    numberOfPages() {
      return Math.ceil(this.loadouts.length / this.itemsPerPage);
    },
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
      layout: 'cards',
      transition: 'scale-transition',
      gun: '',

      search: '',
      itemsPerPageArray: [8, 12, 16, 20],
      filter: {},
      sortDesc: false,
      page: 1,
      itemsPerPage: 8,
      sortBy: 'name',
      keys: [
        'Name',
        'Ergonomics_Final',
        'Vertical_Recoil_Final',
        'Horizontal_Recoil_Final',
      ],
      dialog: false,

      headers: [{
        text: 'Image',
        value: 'image',
        sortable: false,
        filterable: false,
      },
      {
        text: 'Name',
        value: 'name',
      },
      {
        text: 'Ergonomics',
        value: 'ergonomics_final',
      },
      {
        text: 'Vertical Recoil',
        value: 'vertical_recoil_final',
      },
      {
        text: 'Horizontal Recoil',
        value: 'horizontal_recoil_final',
      },
      {
        text: 'Calibre',
        value: 'gun_calibre',
      },
      {
        text: 'By User',
        value: 'username',
      },
      {
        text: 'Updated',
        value: 'updated_at',
      },
      {
        text: 'Rating',
        value: 'votes',
      },
      ],
    };
  },
};

</script>
