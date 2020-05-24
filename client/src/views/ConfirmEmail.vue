<template>
  <v-container>
    <span class="bg"></span>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar color="blue-grey">
            <v-spacer></v-spacer>
            <v-toolbar-title>Confirm Email</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form></v-form>
            <v-alert type="error" :value="error">{{ error }}</v-alert>
            <v-alert type="success" :value="success">{{ success }}</v-alert>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import HTTP from "../http";

export default {
  mounted() {
    this.token = this.$route.params.token;
    this.confirmEmail();
  },

  methods: {
    confirmEmail() {
      this.error = null;
      return HTTP()
        .get(`auth/register/confirm/${this.token}`)
        .then(({ data }) => {
          this.error = null;
          this.success = data.message;
        })
        .catch(error => {
          this.success = null;
          this.error = "Failed to confirm email. Token may not exist";
        });
    }
  },

  data: () => ({
    token: null,

    success: null,
    error: null
  })
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
