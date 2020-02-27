<template>
  <v-app>
    <navbar></navbar>

    <v-content>
      <router-view id="main"></router-view>
      <app-footer></app-footer>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue';
import AppFooter from '@/components/Footer.vue';

export default {
  name: 'App',
  components: {
    Navbar,
    AppFooter,
  },
  data: () => ({
    //
  }),
};
</script>

<style>
  html { overflow-y: auto }
  #main { overflow: auto; padding-bottom: 150px}
</style>