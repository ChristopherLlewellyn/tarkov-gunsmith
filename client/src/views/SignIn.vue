<template>
  <v-container>
    <span class="bg"></span>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6 lg4>
        <v-card class="elevation-12">
          <v-toolbar color="blue-grey">
            <v-spacer></v-spacer>
            <v-toolbar-title>Sign In</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form class="text-center">
              <v-text-field v-model="email" label="Email" placeholder="Email" prepend-icon="mdi-email" :value="signInEmail"></v-text-field>
              <v-text-field v-model="password" label="Password" placeholder="Password" type="password" prepend-icon="mdi-lock"
                :value="signInPassword"></v-text-field>
              <router-link to="/reset-password">
                <span class="font-weight-bold">Forgot password</span>
              </router-link>
            </v-form>

            <v-alert class="mt-4" type="error" :value="signInError">{{ signInError }}</v-alert>
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

            <v-card-text class="text-center">
              <b>Or</b>
            </v-card-text>

            <v-card-actions class="justify-center">
              <v-btn color="#7289da" to="/discord-redirect">
                <v-icon left>mdi-discord</v-icon>
                <b>Sign in with Discord</b>
              </v-btn>
            </v-card-actions>
            
            <v-card-actions class="justify-center">
              <google-sign-in type="sign-in"></google-sign-in>
            </v-card-actions>

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
  import GoogleSignIn from "@/components/GoogleSignIn.vue";

  export default {
    metaInfo: {
      title: "Sign In",
      titleTemplate: "%s - Tarkov Gunsmith"
    },

    mounted() {
      (this.email = this.signInEmail), (this.password = this.signInPassword);
      this.setSignInError(null);
    },
    data: () => ({
      email: "",
      password: "",
    }),
    components: {
      GoogleSignIn
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
        "setSignInError"
      ]),
      ...mapActions("authentication", [
        "signIn",
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
