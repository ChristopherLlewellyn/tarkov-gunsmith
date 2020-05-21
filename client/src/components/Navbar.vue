<template>
  <nav>
    <!-- Toolbar -->
    <v-app-bar app clipped-left class="grey darken-4">
      <router-link to="/">
        <v-img
          :src="require('../images/logo1-transparent-thick.svg')"
          class="ml-2"
          max-height="55"
          max-width="55"
          contain
        ></v-img>
      </router-link>
      <v-toolbar-title>
        <router-link to="/">
          <span class="font-weight-light ml-1">Tarkov</span>
          <span>Armory</span>
        </router-link>
      </v-toolbar-title>
      <v-spacer />

      <!-- Desktop View -->
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn v-for="item in notRequiresSignIn" :key="item.title" :to="item.route" text>
          <v-icon left>{{ item.icon }}</v-icon>
          {{
          item.title
          }}
        </v-btn>

        <template v-if="!isSignedIn">
          <v-tooltip v-for="item in requiresSignIn" :key="item.title" bottom>
            <template v-slot:activator="{ on }">
              <v-btn class="default grey--text" text v-on="on">
                <v-icon color="grey darken-1" left>{{ item.icon }}</v-icon>
                {{
                item.title
                }}
              </v-btn>
            </template>
            <span>Sign in to access this feature</span>
          </v-tooltip>
        </template>

        <template v-if="isSignedIn">
          <v-btn v-for="item in requiresSignIn" :key="item.title" :to="item.route" text>
            <v-icon left>{{ item.icon }}</v-icon>
            {{
            item.title
            }}
          </v-btn>
        </template>

        <v-btn color="blue-grey darken-2" v-if="!isSignedIn" to="/sign-in">
          <span>Sign In</span>
          <v-icon right>mdi-login</v-icon>
        </v-btn>

        <v-btn color="blue-grey darken-2" v-if="isSignedIn" @click="signOut">
          <span>Sign Out</span>
          <v-icon right>mdi-logout</v-icon>
        </v-btn>
      </v-toolbar-items>

      <!-- Mobile View -->
      <v-menu class="hidden-md-and-up" offset-y>
        <template v-slot:activator="{ on }">
          <v-btn class="hidden-md-and-up mr-1" icon v-on="on">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-for="item in notRequiresSignIn" :key="item.title" link :to="item.route">
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <template v-if="!isSignedIn">
            <v-list-item inactive v-for="item in requiresSignIn" :key="item.title" link>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-list-item-icon v-on="on">
                    <v-icon color="grey">{{ item.icon }}</v-icon>
                  </v-list-item-icon>

                  <v-list-item-content v-on="on">
                    <v-list-item-title class="grey--text">{{ item.title }}</v-list-item-title>
                  </v-list-item-content>
                </template>
                <span>Sign in to access this feature</span>
              </v-tooltip>
            </v-list-item>
          </template>

          <template v-if="isSignedIn">
            <v-list-item v-for="item in requiresSignIn" :key="item.title" link :to="item.route">
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title>{{ item.title }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>

          <v-list-item class="action" v-if="!isSignedIn" link to="/sign-in">
            <v-list-item-icon>
              <v-icon>mdi-login</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>
                <span>Sign In</span>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>

          <v-list-item class="action" v-if="isSignedIn" link @click="signOut">
            <v-list-item-icon>
              <v-icon>mdi-logout</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
              <v-list-item-title>Sign Out</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
  </nav>
</template>


<!-- Script -->
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters("authentication", ["isSignedIn"])
  },

  methods: {
    ...mapActions("authentication", ["signOut"])
  },

  data() {
    return {
      drawer: false,
      notRequiresSignIn: [
        {
          title: "Search Loadouts",
          icon: "mdi-crosshairs",
          route: "/"
        }
      ],
      requiresSignIn: [
        {
          title: "My Loadouts",
          icon: "mdi-pistol",
          route: "/my-loadouts"
        },
        {
          title: "Create Loadout",
          icon: "mdi-hammer",
          route: "/create-loadout"
        }
      ]
    };
  }
};
</script>

<style scoped>
.action {
  background: #455a64;
}
.default {
  cursor: default;
}

a {
  color: inherit !important;
  text-decoration: none;
}
</style>