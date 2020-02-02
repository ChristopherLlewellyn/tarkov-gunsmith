<!-- Template -->
<template>
  <nav>
    <!-- Side navigation drawer -->
    <v-navigation-drawer
      app
      v-model="drawer"
      clipped
    >
      <v-list nav dense>

        <v-list-item
          v-for="item in items"
          :key="item.title"
          link
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
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>
        <span class="font-weight-light">Tarkov</span>
        <span>Armory</span>
      </v-toolbar-title>
      <v-spacer />
      <v-btn>
        <span>Sign In</span>
        <v-icon right>mdi-login</v-icon>
      </v-btn>
    </v-app-bar>
  </nav>
</template>


<!-- Script -->
<script>
export default {
  data() {
    return {
      drawer: false,
      items: [
        { title: 'Loadouts', icon: 'mdi-pistol' },
        { title: 'Create Loadout', icon: 'mdi-hammer' },
        { title: 'Account', icon: 'mdi-account' },
      ],
    };
  },
};
</script>
