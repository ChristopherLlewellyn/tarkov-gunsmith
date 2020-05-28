<template>
  <v-container>
    <span class="bg"></span>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6 lg4>
        <v-card>
          <v-toolbar color="#7289da">
            <v-spacer></v-spacer>
            <v-toolbar-title>
              <v-icon left>mdi-discord</v-icon>
              Authenticating with Discord</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-actions>
            <v-row class="fill-height ma-3" align="center" justify="center">
              <v-progress-circular indeterminate color="grey lighten-5"></v-progress-circular>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
  import HTTP from "../http";
  import {
    mapMutations,
    mapActions
  } from "vuex";

  export default {
    mounted() {
      if (this.$route.query.code) {
        let code = this.$route.query.code

        // Set auth details
        this.setSocialProvider('discord')
        this.setSocialToken(code)

        // Verify the Discord code and fetch an auth token from our API
        this.socialSignIn();
      } else {
        let url = process.env.VUE_APP_DISCORD_AUTH_URL;
        window.open(url, "_self")
      }
    },

    methods: {
      ...mapMutations("authentication", [
        "setSocialProvider",
        "setSocialToken",
      ]),
      ...mapActions("authentication", [
        "socialSignIn"
      ]),
    },
  };

</script>

<style scoped>
  .bg {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: url("../images/backgrounds/discord.jpg") no-repeat center center;
    background-size: cover;
    background-color: black;
    transform: scale(1);
  }

  a {
    text-decoration: none;
  }

</style>
