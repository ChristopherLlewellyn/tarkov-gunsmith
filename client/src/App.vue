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
import Navbar from "@/components/Navbar.vue";
import AppFooter from "@/components/Footer.vue";

export default {
  name: "App",
  components: {
    Navbar,
    AppFooter
  },
  beforeCreate() {
    this.$store.dispatch("initialiseStore");
  },
  data: () => ({
    //
  }),
  watch: {
    $route(to, from) {
      document.title = to.meta.title || "Tarkov Armory";
    }
  }
};
</script>

<style lang="scss">
html {
  overflow-y: auto;
}
#main {
  overflow: auto;
  padding-bottom: 150px;
}

@font-face {
  font-family: Bender;
  src: url(assets/fonts/Bender.ttf) format("truetype");
}
@font-face {
  font-family: Bender-Bold;
  src: url(assets/fonts/Bender-Bold.ttf) format("truetype");
}
@font-face {
  font-family: Bender-Light;
  src: url(assets/fonts/Bender-Light.ttf) format("truetype");
}

$body-font-family: "Bender";
$bold-font: "Bender-Bold";
$light-font: "Bender-Light";
.v-application {
  font-family: $body-font-family, sans-serif !important;
  .font-weight-medium {
    font-family: $bold-font, sans-serif !important;
  }
  .font-weight-bold {
    font-family: $bold-font, sans-serif !important;
  }
  .font-weight-light {
    font-family: $light-font, sans-serif !important;
  }
}
</style>
