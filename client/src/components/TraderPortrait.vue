<template>
  <v-tooltip bottom>
    <template v-slot:activator="{ on }">
      <v-img class="ma-1" v-on="on" :src="portrait" :alt="traderName" max-height="60" max-width="60" contain lazy-src>
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0" align="center" justify="center">
            <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
          </v-row>
        </template>
      </v-img>
    </template>
    <h3 class="font-weight-medium">{{ traderName ? traderName : 'Unknown' }}</h3>
  </v-tooltip>
</template>

<script>
  export default {
    name: "traderPortrait",
    props: {
      traderName: String,
    },
    computed: {
      portrait() {
        switch (this.traderName) {
          case "Fence":
            return require("../images/traders/fence-portrait.png")
            break;

          case "Jaeger":
            return require("../images/traders/jaeger-portrait.png")
            break;

          case "Mechanic":
            return require("../images/traders/mechanic-portrait.png")
            break;

          case "Peacekeeper":
            return require("../images/traders/peacekeeper-portrait.png")
            break;

          case "Prapor":
            return require("../images/traders/prapor-portrait.png")
            break;

          case "Ragman":
            return require("../images/traders/ragman-portrait.png")
            break;

          case "Skier":
            return require("../images/traders/skier-portrait.png")
            break;

          case "Therapist":
            return require("../images/traders/therapist-portrait.png")
            break;

          default:
            return require("../images/traders/unknown-portrait.png")
        }
      }
    }
  };

</script>
