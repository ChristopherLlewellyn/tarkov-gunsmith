<!-- Template -->
<template>
  <nav>
    <!-- Side navigation drawer -->
    <v-navigation-drawer
      app
      v-model="drawer"
      clipped
      class="grey darken-4"
    >
      <v-list nav>

        <v-list-item
          v-for="item in notRequiresSignIn"
          :key="item.title"
          link
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>

        </v-list-item>

        <v-list-item
          v-for="item in requiresSignIn"
          v-if="isSignedIn"
          :key="item.title"
          link
          :to="item.route"
        >
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>

        </v-list-item>

      </v-list>
    </v-navigation-drawer>

    <!-- Toolbar -->
    <v-app-bar
      app
      clipped-left
      class="grey darken-4"
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        <span class="font-weight-light">Tarkov</span>
        <span>Armory</span>
      </v-toolbar-title>
      <v-spacer />
      <v-btn color="blue-grey darken-2" v-if="!isSignedIn" to="/sign-in">
        <span>Sign In</span>
        <v-icon right>mdi-login</v-icon>
      </v-btn>
      <v-btn color="blue-grey darken-2" v-if="isSignedIn" @click="signOut">
        <span>Sign Out</span>
        <v-icon right>mdi-logout</v-icon>
      </v-btn>
    </v-app-bar>
  </nav>
</template>


<!-- Script -->
<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  computed: {
    ...mapGetters('authentication', [
      'isSignedIn'
    ]),
  },

  methods: {
    ...mapActions('authentication', [
      'signOut',
    ]),
  },

  data() {
    return {
      drawer: false,
      notRequiresSignIn: [
        { title: 'Loadouts', icon: 'mdi-pistol', route:'/' },
      ],
      requiresSignIn: [
        { title: 'Create Loadout', icon: 'mdi-hammer', route:null },
        { title: 'Account', icon: 'mdi-account', route:null },
      ]
    };
  },
};
</script>
