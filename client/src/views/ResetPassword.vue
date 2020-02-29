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
              <v-text-field v-model="resetEmail" label="Email" placeholder="Email" prepend-icon="mdi-email">
              </v-text-field>
            </v-form>
            <v-alert type="error" :value="resetError">{{ resetError }}</v-alert>
            <v-alert type="success" :value="resetSuccess">{{ resetSuccess }}</v-alert>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="recaptchaPasswordReset">
              <span>Send Reset Link</span>
              <v-icon right>mdi-email</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>

          <v-card-text class="text-center">
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
import HTTP from '../http';

export default {
  computed: {

  },
  methods: {

    sendPasswordReset(email) {
      this.resetError = null;
      return HTTP().post('auth/password/email', {
        email: this.resetEmail,
        captcha: this.captcha,
      })
        .then(({ data }) => {
          this.resetError = null;
          this.resetSuccess = data.message;
        })
        .catch((error) => {
          this.resetSuccess = null;
          this.resetError = error.response.data.message; // message from response body
        });
    },

    async recaptchaToken() {
      return new Promise((resolve) => {
        grecaptcha.ready(async () => {
          const token = await grecaptcha.execute(process.env.VUE_APP_RECAPTCHASITEKEY, {
            action: 'resetpassword',
          });
          resolve(token);
        });
      });
    },

    async recaptchaPasswordReset() {
      const token = await this.recaptchaToken();
      this.captcha = token;
      this.sendPasswordReset();
    },
  },

  data: () => ({
    resetEmail: null,
    resetSuccess: null,
    resetError: null,
    captcha: null,
  })
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


  a {
    text-decoration: none;
  }

</style>
