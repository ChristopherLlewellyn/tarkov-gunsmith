<template>
  <v-app>
    <span class="bg"></span>
    <navbar></navbar>

    <v-content>
      <router-view></router-view>
    </v-content>

  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar.vue';

export default {
  name: 'App',
  components: {
    Navbar,
  },
  data: () => ({
    //
  }),
};
</script>

<style>
  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: url( 'https://trello-backgrounds.s3.amazonaws.com/SharedBackground/2560x1628/9617eb89697804b949afd38968b95716/photo-1517651468335-5164984ba2c5') no-repeat center center;
    background-size: cover;
    background-color: black;
    transform: scale(1.1);
  }
</style>
