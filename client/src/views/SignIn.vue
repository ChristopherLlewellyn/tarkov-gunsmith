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
          <v-card-actions class="justify-center">
            <GoogleLogin :params="googleParams" :renderParams="googleRenderParams" :onSuccess="onGoogleSuccess" :onFailure="onGoogleFailure"></GoogleLogin>
          </v-card-actions>
          <v-divider></v-divider>
          <v-card-text class="text-center">
            <b>Or</b>
          </v-card-text>
          <v-card-text>
            <v-form class="text-center">
              <v-text-field v-model="email" label="Email" placeholder="Email" prepend-icon="mdi-email" :value="signInEmail"></v-text-field>
              <v-text-field v-model="password" label="Password" placeholder="Password" type="password" prepend-icon="mdi-lock"
                :value="signInPassword"></v-text-field>
              <router-link to="/reset-password">
                <span class="font-weight-bold">Forgot password</span>
              </router-link>
            </v-form>

            <v-alert type="error" :value="signInError">{{ signInError }}</v-alert>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="recaptchaSignIn" :loading="loading">
              <span>Sign In</span>
              <v-icon right>mdi-login</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>

          <v-card-text class="text-center">
            <span class="font-weight-medium">
              Don't have an account?
              <router-link to="/sign-up">
                <span class="font-weight-bold">Sign up</span>
              </router-link>
            </span>

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
    mapActions
  } from "vuex";
  import GoogleLogin from 'vue-google-login';

  export default {
    mounted() {
      (this.email = this.signInEmail), (this.password = this.signInPassword);
    },
    data: () => ({
      email: "",
      password: "",

      googleParams: {
        client_id: "228755433678-3jngo1n8o3us6su2p2duvakecopnkffr.apps.googleusercontent.com"
      },
      // only needed if you want to render the button with the google ui
      googleRenderParams: {
        width: 150,
      }
    }),
    components: {
      GoogleLogin
    },
    computed: {
      ...mapState("authentication", [
        "signInEmail",
        "signInPassword",
        "signInError",
        "loading"
      ])
    },
    methods: {
      ...mapMutations("authentication", [
        "setSignInEmail",
        "setSignInPassword",
        "setCaptcha",
        "setSocialProvider",
        "setSocialEmail",
        "setSocialToken"
      ]),
      ...mapActions("authentication", [
        "signIn",
        "socialSignIn"
      ]),

      async recaptchaToken() {
        return new Promise(resolve => {
          grecaptcha.ready(async () => {
            const token = await grecaptcha.execute(
              process.env.VUE_APP_RECAPTCHASITEKEY, {
                action: "login"
              }
            );
            resolve(token);
          });
        });
      },

      async recaptchaSignIn() {
        const token = await this.recaptchaToken();
        this.setCaptcha(token);
        this.setSignInEmail(this.email);
        this.setSignInPassword(this.password);
        this.signIn();
      },

      async onGoogleSuccess(googleUser) {
        // Get user's access token from the successful sign in response
        let googleToken = googleUser.getAuthResponse().id_token;

        // Set the provider name and the user's access token in the authentication store
        this.setSocialProvider('google')
        this.setSocialToken(googleToken);

        // Sign in (verify Google token and receive our own API's auth token, like we would with a regular sign in)
        this.socialSignIn();
      },

      onGoogleFailure() {
        console.log('Google sign in failed');
      },
    }
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
