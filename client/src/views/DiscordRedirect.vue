<template>
  <span class="bg"></span>
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
      }

      else {
        let url = process.env.VUE_APP_DISCORD_AUTH_URL;
        window.open(url,"_self")
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
    background: url("../images/backgrounds/pmcNight.png") no-repeat center center;
    background-size: cover;
    background-color: black;
    transform: scale(1);
  }

  a {
    text-decoration: none;
  }

</style>
