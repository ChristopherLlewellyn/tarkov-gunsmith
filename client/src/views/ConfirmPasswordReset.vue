<template>
  <v-container>
    <span class="bg"></span>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar color="blue-grey">
            <v-spacer></v-spacer>
            <v-toolbar-title>Reset Password</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field
                v-model="email"
                label="Email"
                placeholder="Email"
                prepend-icon="mdi-email"
              ></v-text-field>

              <v-text-field
                v-model="password"
                label="Password"
                placeholder="Password"
                prepend-icon="mdi-lock"
                type="password"
                autocomplete="new-password"
              ></v-text-field>

              <v-text-field
                v-model="password_confirmation"
                label="Confirm Password"
                placeholder="Confirm Password"
                prepend-icon="mdi-lock-question"
                type="password"
                autocomplete="new-password"
              ></v-text-field>
            </v-form>

            <v-card-actions v-if="loading" class="justify-center">
              <v-progress-circular v-if="loading" color="primary" indeterminate></v-progress-circular>
            </v-card-actions>

            <v-alert type="error" :value="resetError">{{ resetError }}</v-alert>
            <v-alert type="success" :value="resetSuccess">{{ resetSuccess }}</v-alert>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="recaptchaPasswordReset">
              <span>Reset Password</span>
              <v-icon right>mdi-lock-reset</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>

          <v-card-text class="text-center">
            <v-divider class="mb-3 mt-2"></v-divider>

            <span class="caption">
              This site is protected by reCAPTCHA and the Google
              <a
                href="https://policies.google.com/privacy"
              >Privacy Policy</a> and
              <a href="https://policies.google.com/terms">Terms of Service</a> apply.
            </span>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
import HTTP from "../http";

export default {
  metaInfo: {
    title: "Confirm",
    titleTemplate: "%s - Tarkov Gunsmith"
  },
  
  mounted() {
    this.token = this.$route.params.token;
  },

  methods: {
    confirmPasswordReset(email) {
      this.resetError = null;
      this.loading = true;
      return HTTP()
        .post("auth/password/reset", {
          email: this.email,
          password: this.password,
          password_confirmation: this.password_confirmation,
          token: this.token,
          captcha: this.captcha
        })
        .then(({ data }) => {
          this.resetError = null;
          this.loading = false;
          this.resetSuccess = data.message;
        })
        .catch(error => {
          this.resetSuccess = null;
          this.loading = false;

          if (error.response.status == "404") {
            this.resetError = error.response.data.message;
          } else {
            this.resetError = error.response.data[0].message; // message from response body
          }
        });
    },

    async recaptchaToken() {
      return new Promise(resolve => {
        grecaptcha.ready(async () => {
          const token = await grecaptcha.execute(
            process.env.VUE_APP_RECAPTCHASITEKEY,
            {
              action: "resetpassword"
            }
          );
          resolve(token);
        });
      });
    },

    async recaptchaPasswordReset() {
      const token = await this.recaptchaToken();
      this.captcha = token;
      this.confirmPasswordReset();
    }
  },

  data: () => ({
    email: null,
    password: null,
    password_confirmation: null,
    token: null,

    resetSuccess: null,
    resetError: null,
    captcha: null,
    loading: false
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
  background: url("../images/backgrounds/customs5.png") no-repeat center center;
  background-size: cover;
  background-color: black;
  transform: scale(1);
}

a {
  text-decoration: none;
}
</style>
