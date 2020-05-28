<template>
  <google-login class="google-login" :params="googleParams" :onSuccess="onGoogleSuccess" :onFailure="onGoogleFailure">
    <v-btn color="red darken-3" :loading="loading">
      <v-icon left>mdi-google</v-icon>
      <b>Sign in with Google</b>
    </v-btn>
  </google-login>
</template>

<script>
  import {
    mapMutations,
    mapActions
  } from "vuex";
  import GoogleLogin from 'vue-google-login';

  export default {
    name: "googleSignIn",
    props: {
      type: String,
    },
    components: {
      GoogleLogin
    },

    data: () => ({
      googleParams: {
        client_id: process.env.VUE_APP_GOOGLE_CLIENT_ID
      },
      loading: false
    }),

    methods: {
      ...mapMutations("authentication", [
        "setSocialProvider",
        "setSocialToken",
        "setSignInError",
        "setSignUpError"
      ]),
      ...mapActions("authentication", [
        "socialSignIn"
      ]),

      async onGoogleSuccess(googleUser) {
        this.loading = true;
        
        // Get user's access token from the successful sign in response
        let googleToken = googleUser.getAuthResponse().id_token;

        // Set the provider name and the user's access token in the authentication store
        this.setSocialProvider('google')
        this.setSocialToken(googleToken);

        // Sign in (verify Google token and receive our own API's auth token, like we would with a regular sign in)
        this.socialSignIn();
      },

      onGoogleFailure() {
        if (this.type == 'sign-in') {
          this.setSignInError('Google sign in failed')
        } else if (this.type == 'sign-up') {
          this.setSignUpError('Google sign in failed')
        } else {
          console.log('Google sign in failed')
        }
      },
    }

  };

</script>
