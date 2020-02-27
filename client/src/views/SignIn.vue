<template>
  <v-container>
  <span class="bg"></span>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar color="blue-grey">
            <v-spacer></v-spacer>
            <v-toolbar-title>Sign In</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field v-on:input="setSignInEmail" label="Email" placeholder="Email" prepend-icon="mdi-email" :value="signInEmail">
              </v-text-field>
              <v-text-field v-on:input="setSignInPassword" label="Password" placeholder="Password" type="password" prepend-icon="mdi-lock"
                :value="signInPassword">
              </v-text-field>
            </v-form>
            <v-alert type="error" :value="signInError">{{ signInError }}</v-alert>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="recaptchaSignIn">
              <span>Sign In</span>
              <v-icon right>mdi-login</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>

          <v-card-text class="text-center">
            <span class="font-weight-medium">Don't have an account? <a href="#/sign-up" color="white" class="font-weight-bold"
                style="text-decoration:none;">Sign up</a></span>

            <v-divider class="mb-3 mt-2"></v-divider>

            <span class="caption">
              This site is protected by reCAPTCHA and the Google
              <a href="https://policies.google.com/privacy">Privacy Policy</a> and
              <a href="https://policies.google.com/terms">Terms of Service</a> apply.
            </span>
          </v-card-text>

        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
  import {
    mapState,
    mapMutations,
    mapActions,
  } from 'vuex';

  export default {
    computed: {
      ...mapState('authentication', [
        'signInEmail',
        'signInPassword',
        'signInError',
      ]),
    },
    methods: {
      ...mapMutations('authentication', [
        'setSignInEmail',
        'setSignInPassword',
        'setCaptcha'
      ]),
      ...mapActions('authentication', [
        'signIn',
      ]),

      async recaptchaToken() {
        return new Promise((resolve) => {
          grecaptcha.ready(async () => {
            const token = await grecaptcha.execute(process.env.VUE_APP_RECAPTCHASITEKEY, {
              action: 'login'
            });
            resolve(token);
          });
        });
      },

      async recaptchaSignIn() {
        const token = await this.recaptchaToken();
        this.setCaptcha(token);
        this.signIn();
      }
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
    background: url('../images/pmcNight.png') no-repeat center center;
    background-size: cover;
    background-color: black;
    transform: scale(1);
  }
</style>
