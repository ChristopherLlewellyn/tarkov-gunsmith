<template>
  <v-container>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card class="elevation-12">
          <v-toolbar color="blue-grey">
            <v-spacer></v-spacer>
            <v-toolbar-title>Sign Up</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>
          <v-card-text>
            <v-form>
              <v-text-field v-on:input="setSignUpEmail" label="Email" placeholder="Email" prepend-icon="mdi-email" :value="signUpEmail">
              </v-text-field>
              <v-text-field v-on:input="setSignUpUsername" label="Username" placeholder="Username" type="text" prepend-icon="mdi-account"
                :value="signUpUsername"></v-text-field>
              <v-text-field v-on:input="setSignUpPassword" label="Password" placeholder="Password" type="password" autocomplete="new-password"
                prepend-icon="mdi-lock" :value="signUpPassword">
              </v-text-field>
            </v-form>
            <v-alert type="error" :value="signUpError">{{ signUpError }}</v-alert>
            <v-alert type="success" :value="signUpSuccess">{{ signUpSuccess }}</v-alert>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="register">
              <span>Sign Up</span>
              <v-icon right>mdi-clipboard-check</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
          <v-card-text class="text-center">
            <span class="font-weight-medium">Already have an account? <a href="#/sign-in" color="white" class="font-weight-bold"
                style="text-decoration:none;">Sign In</a></span>
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
      'signUpEmail',
      'signUpPassword',
      'signUpUsername',
      'signUpError',
      'signUpSuccess',
    ]),
  },
  methods: {
    ...mapMutations('authentication', [
      'setSignUpEmail',
      'setSignUpPassword',
      'setSignUpUsername',
    ]),
    ...mapActions('authentication', [
      'register',
    ]),
  },
  data() {
    return {

    };
  },
};

</script>
