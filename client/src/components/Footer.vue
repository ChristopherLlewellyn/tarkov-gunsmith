<template>
  <div>
    <!-- DESKTOP VIEW (hide on small screens) -->
    <div id="large" class="d-none d-sm-block">
      <v-footer color="grey darken-4" padless absolute>
        <v-row class="ml-1 mr-1">
          <v-col class="text-center">
            <v-card color="grey darken-4" outlined>
              <v-card-title class="justify-center">Game Data</v-card-title>
              <v-card-text>
                Data and assets are sourced from
                <a
                  href="https://tarkov-database.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >Tarkov-Database</a> and
                <a
                  href="https://tarkov-market.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >Tarkov-Market</a> and are automatically kept up to date.
              </v-card-text>
            </v-card>
          </v-col>

          <v-col class="text-center">
            <v-card color="grey darken-4" outlined>
              <v-card-title class="justify-center">
                <v-img
                  max-width="60"
                  max-height="60"
                  :src="require('../images/logo1-transparent-thick.svg')"
                ></v-img>
                <span class="font-weight-light">Tarkov</span>
                <span>Gunsmith</span>
                &nbsp;
                {{ new Date().getFullYear() }}
              </v-card-title>
              <v-card-text class="justify-center">Version {{ version }}</v-card-text>
              <v-card-text>
                <router-link to="/privacy-policy">
                  <span>Privacy Policy</span>
                </router-link>
              </v-card-text>
            </v-card>
          </v-col>

          <v-col class="text-center">
            <v-card color="grey darken-4" outlined>
              <v-card-title class="justify-center">❤️ Support Me ❤️</v-card-title>
              <v-card-text
                class="justify-center"
              >If you like this project, and would like to support me.</v-card-text>
              <v-card-actions class="justify-center">
                <v-btn
                  class="mr-2"
                  rounded
                  color="amber lighten-1"
                  href="https://www.paypal.me/welshllama"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <b class="black--text">Donate</b>
                </v-btn>

                <span>or</span>

                <v-btn class="ml-2" color="teal"
                  rounded
                  href="https://www.buymeacoffee.com/ChrisLlewellyn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <b class="grey--text text--lighten-3">☕ Buy me a coffee</b>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-footer>
    </div>

    <!-- MOBILE VIEW (hide on medium+ screens) -->
    <div id="small" class="d-sm-none">
      <v-footer class="pb-2" color="grey darken-4" padless absolute>
        <v-row class="ml-1 mr-1 justify-center">
          <v-card color="grey darken-4" outlined>
            <v-card-title class="justify-center">Game Data</v-card-title>
            <v-card-text>
              Data and assets are sourced from
              <a
                href="https://tarkov-database.com/"
                target="_blank"
                rel="noopener noreferrer"
              >Tarkov-Database</a> and
              <a
                href="https://tarkov-market.com/"
                target="_blank"
                rel="noopener noreferrer"
              >Tarkov-Market</a> and are automatically kept up to date.
            </v-card-text>
          </v-card>
        </v-row>

        <v-row class="justify-center text-center">
          <v-card color="grey darken-4" outlined>
            <v-card-title class="justify-center">
              <v-img
                max-width="60"
                max-height="60"
                :src="require('../images/logo1-transparent-thick.svg')"
              ></v-img>
              <span class="font-weight-light">Tarkov</span>
              <span>Gunsmith</span>
              &nbsp;
              {{ new Date().getFullYear() }}
            </v-card-title>
            <v-card-text>Version {{ version }}</v-card-text>
            <v-card-text>
              <router-link to="/privacy-policy">
                <span>Privacy Policy</span>
              </router-link>
            </v-card-text>
          </v-card>
        </v-row>

        <v-row class="justify-center">
          <v-card color="grey darken-4" outlined>
            <v-card-title class="justify-center">❤️ Support Me ❤️</v-card-title>
            <v-card-text
              class="justify-center"
            >If you like this project, and would like to support me.</v-card-text>
            <v-card-actions class="justify-center">
              <v-btn
                class="mr-2"
                rounded
                color="amber lighten-1"
                href="https://www.paypal.me/welshllama"
                target="_blank"
                rel="noopener noreferrer"
              >
                <b class="black--text">Donate</b>
              </v-btn>

              <span>or</span>

                <v-btn class="ml-2" color="teal"
                  rounded
                  href="https://www.buymeacoffee.com/ChrisLlewellyn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <b class="grey--text text--lighten-3">☕ Buy me a coffee</b>
                </v-btn>
            </v-card-actions>
          </v-card>
        </v-row>
      </v-footer>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  computed: mapState(["version"])
};
</script>

<style scoped>
a {
  text-decoration: none;
}

#large {
  overflow: auto;
  padding-top: 250px;
}

#small {
  overflow: auto;
  padding-top: 500px;
}
</style>
