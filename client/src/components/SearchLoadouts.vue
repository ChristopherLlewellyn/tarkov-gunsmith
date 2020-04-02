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
                <v-card :href="`/#/loadout/${loadout.id}`" tile>
                  <v-toolbar>
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
                    <v-img :src="loadout.gun_image" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="120">
                      <v-card-title>{{ loadout.gun_name }}</v-card-title>
                    </v-img>
                  </v-container>

                  <v-divider></v-divider>

                  <v-card-actions class="justify-center">
                    <caliber-chip :value="loadout.gun_calibre"></caliber-chip>
                  </v-card-actions>

                  <v-card-actions class="justify-center">
                    <ergonomics-chip class="ma-2" :value="loadout.ergonomics_final"></ergonomics-chip>
                    <vertical-recoil-chip class="ma-2" :value="loadout.vertical_recoil_final"></vertical-recoil-chip>
                    <horizontal-recoil-chip class="ma-2" :value="loadout.horizontal_recoil_final"></horizontal-recoil-chip>
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
            <v-text-field dense class="pa-2" label="Search" @input="searchGunNames" clearable />
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
        <v-data-table :headers="headers" :items="loadouts" :search="search" sortBy="votes" sortDesc @click:row="viewLoadoutTable" :items-per-page="10"
          class="elevation-1">

          <template v-slot:body="{ items }">
            <tbody>
              <tr style="cursor: pointer;" v-for="item in items" :key="item.id" @click="viewLoadoutTable(item)">
                <td>
                  <a :href="`/#/loadout/${item.id}`" class="white">
                    <div class="pt-1 pb-1 pl-1 pr-1">
                      <v-img :src="item.gun_image" alt="No image" max-height="125" max-width="300" contain class="align-end">
                        <p class="pl-2 white--text font-weight-medium">{{ item.gun_name }}</p>
                      </v-img>
                    </div>
                  </a>
                </td>

                <td>
                  <a :href="`/#/loadout/${item.id}`">
                    <span class="white--text">{{ item.name }}</span>
                  </a>
                </td>

                <td>
                  <a :href="`/#/loadout/${item.id}`">
                    <ergonomics-chip class="ma-2" :value="item.ergonomics_final"></ergonomics-chip>
                  </a>
                </td>

                <td>
                  <a :href="`/#/loadout/${item.id}`">
                    <vertical-recoil-chip class="ma-2" :value="item.vertical_recoil_final"></vertical-recoil-chip>
                  </a>
                </td>

                <td>
                  <a :href="`/#/loadout/${item.id}`">
                    <horizontal-recoil-chip class="ma-2" :value="item.horizontal_recoil_final"></horizontal-recoil-chip>
                  </a>
                </td>

                <td>
                  <a :href="`/#/loadout/${item.id}`">
                    <caliber-chip class="ma-2" :value="item.gun_calibre"></caliber-chip>
                  </a>
                </td>

                <td>
                  <a :href="`/#/loadout/${item.id}`">
                    <span class="font-weight-bold orange--text">{{ item.username }}</span>
                  </a>
                </td>

                <td>
                  <a :href="`/#/loadout/${item.id}`">
                    <span class="font-weight-medium white--text">{{ item.updated_at }}</span>
                  </a>
                </td>

                <td>
                  <a :href="`/#/loadout/${item.id}`">
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
                  </a>
                </td>
              </tr>
            </tbody>
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

  import ErgonomicsChip from "./ErgonomicsChip";
  import HorizontalRecoilChip from "./HorizontalRecoilChip";
  import VerticalRecoilChip from "./VerticalRecoilChip";
  import CaliberChip from "./CaliberChip";

  export default {
    mounted() {
      this.fetchGuns();
      this.fetchLoadouts();
    },

    components: {
      ErgonomicsChip,
      HorizontalRecoilChip,
      VerticalRecoilChip,
      CaliberChip
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
        sortDesc: true,
        page: 1,
        itemsPerPage: 8,
        sortBy: 'votes',
        keys: [
          'Votes',
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

<style scoped>
  a {
    text-decoration: none;
  }
</style>