<template>
  <v-container fluid grid-list-lg>
    <v-flex>
      <v-text-field v-model="search" prepend-icon="mdi-search" label="Search" class="pb-2 pt-2" single-line filled></v-text-field>
    </v-flex>

    <v-layout class="pl-12" row wrap>

      <v-flex v-for="loadout in filteredLoadouts">
        <v-card color="grey darken-4" width="450">
          <v-toolbar color="blue-grey">
            {{ loadout.name }}
          </v-toolbar>
          <v-container fluid>
            <v-img :src="loadout.gun_image" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="120">
              <v-card-title>{{ loadout.gun_name }}</v-card-title>
            </v-img>
          </v-container>

          <v-divider></v-divider>

          <v-card-actions class="justify-center">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-chip class="ma-2" color="red darken-1" v-on="on">
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
                <v-chip class="ma-2" color="brown" v-on="on">
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
                <v-chip class="ma-2" color="purple" v-on="on">
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
                <v-chip class="ma-2" color="green" v-on="on">
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
                <v-chip class="ma-2" color="blue" v-on="on">
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
                <v-chip class="ma-2" color="blue" v-on="on">
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
            <span class="font-weight-light">Loadout by</span>
            &nbsp;
            <span class="font-weight-bold orange--text">{{ loadout.username }}</span>
            <span class="font-weight-light">,</span>
            &nbsp;
            <span class="font-weight-light">updated</span>
            &nbsp;
            <span class="font-weight-medium">{{ loadout.updated_at }}</span>
          </v-card-actions>

          <v-card-actions class="justify-center">
            <v-btn color="blue">
              <span>Edit</span>
              <v-icon right>mdi-pencil</v-icon>
            </v-btn>
          </v-card-actions>

        </v-card>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  import {
    mapGetters,
    mapState,
    mapActions
  } from 'vuex'

  import router from '../router'

  export default {
    mounted() {
      if (!this.isSignedIn) {
        return router.push('/sign-in')
      }
      this.fetchMyLoadouts()
    },

    methods: {
      ...mapActions('myLoadouts', [
        'fetchMyLoadouts',
      ])
    },

    computed: {
      ...mapGetters('authentication', [
        'isSignedIn'
      ]),

      ...mapState('myLoadouts', [
        'loadouts',
      ]),

      filteredLoadouts: function () {
        return this.loadouts.filter((loadout) => {
          if (loadout.name != null) {
            return loadout.name.toLowerCase().match(this.search.toLowerCase());
          }

          return ''.match(this.search.toLowerCase())
        })
      }
    },

    data() {
      return {
        search: '',
      }
    }
  };

</script>
