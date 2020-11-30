<template>
  <v-container>
    <span class="bg"></span>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6 lg4>
        <v-card>
          <v-toolbar color="blue-grey">
            <v-spacer></v-spacer>
            <v-toolbar-title>Privacy Policy</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <h2 class="mb-2">Cookies</h2>
            <p>
              Tarkov-Gunsmith makes use of cookies to save and retrieve information about your visit to our site. Cookies are small files of software which save and retrieve information about your visit to a website or application. They reside in your internet browser to help remember your preferences and previous activity. You can find more information about cookies at <a href="https://www.allaboutcookies.org" target="_blank">www.allaboutcookies.org</a> and <a href="https://www.youronlinechoices.eu" target="_blank">www.youronlinechoices.eu</a>.
            </p>
            <p>
              Cookies currently used on our site identify you as an anonymized number. We use cookies and log files to analyze trends, track users movements around the website, and gather demographic information about our user base. We may receive anonymized reports based on the use of these technologies by our partners (e.g. Google Analytics) on an aggregated basis.
            </p>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  metaInfo: {
    title: "Privacy Policy",
    titleTemplate: "%s - Tarkov Gunsmith"
  }
}
</script>

<style scoped>
  .bg {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: url("../images/backgrounds/customs7.png") no-repeat center center;
    background-size: cover;
    background-color: black;
    transform: scale(1);
  }

  a {
    text-decoration: none;
  }

</style>
