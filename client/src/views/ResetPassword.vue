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
                v-model="resetEmail"
                label="Email"
                placeholder="Email"
                prepend-icon="mdi-email"
              ></v-text-field>
            </v-form>

            <v-alert type="error" :value="resetError">{{ resetError }}</v-alert>
            <v-alert type="success" :value="resetSuccess">{{ resetSuccess }}</v-alert>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="recaptchaPasswordReset" :loading="loading">
              <span>Send Reset Link</span>
              <v-icon right>mdi-email</v-icon>
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
    title: "Reset Password",
    titleTemplate: "%s - Tarkov Gunsmith"
  },
  
  computed: {},
  methods: {
    sendPasswordReset(email) {
      this.resetError = null;
      this.loading = true;
      return HTTP()
        .post("auth/password/email", {
          email: this.resetEmail,
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
          if (error.response.data.message) {
            this.resetError = error.response.data.message;
          } else {
            this.resetError = error.response.data[0].message;
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
      this.sendPasswordReset();
    }
  },

  data: () => ({
    resetEmail: null,
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
