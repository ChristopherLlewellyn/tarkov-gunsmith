<template>
  <v-container>
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
              <v-text-field v-on:input="setSignInEmail" label="Email" placeholder="Email" prepend-icon="mdi-email" :value="signInEmail"></v-text-field>
              <v-text-field v-on:input="setSignInPassword" label="Password" placeholder="Password" type="password" prepend-icon="mdi-lock" :value="signInPassword">
              </v-text-field>
            </v-form>
            <v-alert type="error" :value="signInError">{{ signInError }}</v-alert>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="signIn">
              <span>Sign In</span>
              <v-icon right>mdi-login</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
          
          <v-card-text class="text-center">
            <span class="font-weight-medium">Don't have an account? <a href="#/sign-up" color="white" class="font-weight-bold"
                style="text-decoration:none;">Sign up</a></span>
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
      ]),
      ...mapActions('authentication', [
        'signIn',
      ])
    },

    data() {
      return {
        
      }
    }
  };

</script>
