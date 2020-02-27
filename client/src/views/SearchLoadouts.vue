<template>
  <v-container fluid>
  <span class="bg"></span>
    <search-loadouts></search-loadouts>
  </v-container>
</template>

<script>
import SearchLoadouts from '@/components/SearchLoadouts.vue';

export default {
  components: {
    SearchLoadouts,
  },
};

</script>

<style scoped>
  .bg {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: url('../images/originalShells.png') no-repeat center center;
    background-size: cover;
    background-color: black;
    transform: scale(1);
  }
</style>
