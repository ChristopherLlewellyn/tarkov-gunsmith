<template>
  <v-container>
    <span class="bg"></span>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6 lg4>
        <v-card class="pb-2 mt-2">
          <v-toolbar color="blue-grey">
            <v-spacer></v-spacer>
            <v-toolbar-title>Donate/Contact</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          
          <h2 class="text-center pt-2">Donate</h2>
          <v-card-text class="text-center">
            If you would like to donate, you can find my links down below:
          </v-card-text>

          <v-card-actions class="justify-center">
                <v-btn
                  class="mr-2"
                  rounded
                  color="white"
                  href="https://www.paypal.me/welshllama"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <v-icon left color="blue darken-2">mdi-credit-card-outline</v-icon>
                  <span class="blue--text text--darken-2 donate-button-text">Pay</span>
                  <span class="blue--text text--lighten-2 donate-button-text">Pal</span>
                </v-btn>

                <span>or</span>

                <v-btn class="ml-2" color="teal"
                  rounded
                  href="https://www.buymeacoffee.com/ChrisLlewellyn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span class="grey--text text--lighten-3 donate-button-text">☕ Buy me a coffee</span>
                </v-btn>
          </v-card-actions>        

          <v-card-text class="text-center">
            I really appreciate any and all donations - they really do help me create more tools for the Tarkov community!
          </v-card-text>

          <v-divider></v-divider>

          <h2 class="text-center pt-2">Contact</h2>
          <v-card-text class="text-center">
            If you'd like to get in contact with me for any reason:
          </v-card-text>

          <v-card-text class="justify-center text-center">
              <p>
                <v-icon class="mr-1" color="#7289da">mdi-discord</v-icon>MrWelshLlama#5896
                <v-icon class="mr-1" color="#FF4500">mdi-reddit</v-icon>Welshllama
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
      title: "Donate",
      titleTemplate: "%s - Tarkov Gunsmith"
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
    background: url("../images/backgrounds/customs7.png") no-repeat center center;
    background-size: cover;
    background-color: black;
    transform: scale(1);
  }

  a {
    text-decoration: none;
  }

  .donate-button-text {
      font-weight: bold;
  }

</style>
