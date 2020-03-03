<template>
  <v-footer padless absolute>
    <v-card flat tile class="text-center" width="100%">
      <v-card-text>
        <span class="font-weight-light">Tarkov</span>
        <span>Armory</span>
        &nbsp;
        {{ new Date().getFullYear() }}
        <v-spacer></v-spacer>
        All in-game data and assets have been acquired either by observation or from the official
        <a href="https://escapefromtarkov.gamepedia.com/Escape_from_Tarkov_Wiki">Escape from Tarkov Wiki</a>
        and no third-party software has been used to mine data in any way.
      </v-card-text>
    </v-card>
  </v-footer>
</template>

<style scoped>
  a {
    text-decoration: none;
  }

</style>
