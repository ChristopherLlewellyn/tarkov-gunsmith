<template>
  <v-container>
    <span class="bg"></span>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md6 lg4>
        <v-card>
          <v-toolbar color="blue-grey">
            <v-spacer></v-spacer>
            <v-toolbar-title>Account</v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>

          <v-card-text class="text-center">
            <v-row>
              <v-col>
                <v-row class="justify-center">
                  <v-icon color="grey" left>mdi-account</v-icon>
                  <h3>Username</h3>
                </v-row>
              </v-col>

              <v-col>
                <h3 class="orange--text">{{ userDetails.username }}</h3>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-text class="text-center">
            <v-row>
              <v-col>
                <v-row class="justify-center">
                  <v-icon color="grey" left>mdi-email</v-icon>
                  <h3>Email</h3>
                </v-row>
              </v-col>

              <v-col>
                <h3 class="white--text">{{ userDetails.email }}</h3>
              </v-col>
            </v-row>
          </v-card-text>

          <v-card-text class="text-center">
            <v-row>
              <v-col>
                <v-row class="justify-center">
                  <v-icon color="grey" left>mdi-update</v-icon>
                  <h3>Created</h3>
                </v-row>
              </v-col>

              <v-col>
                <h3 class="white--text">{{ userDetails.created }}</h3>
              </v-col>
            </v-row>
          </v-card-text>

          <v-divider></v-divider>

          <v-card-text class="text-center">
            <h3>Change Username</h3>
          </v-card-text>

          <v-card-actions class="ml-2 mr-2">
            <v-text-field v-model="changeUsernameValue" label="Username" placeholder="New Username" type="text" prepend-icon="mdi-account">
            </v-text-field>
            <v-btn class="ma-4" color="blue-grey darken-2" @click="changeUsername(changeUsernameValue)">Change Username</v-btn>
          </v-card-actions>

          <v-card-actions class="justify-center">
            <v-alert :type="changeUsernameAlertType" :value="changeUsernameAlert">{{ changeUsernameAlertMessage }}</v-alert>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>


<script>
  import HTTP from "../http";
  import router from "../router";
  import {
    mapActions,
    mapGetters,
    mapMutations,
    mapState
  } from "vuex";

  export default {
    metaInfo: {
      title: "Account",
      titleTemplate: "%s - Tarkov Gunsmith"
    },
    
    mounted() {
      if (!this.isSignedIn) {
        return router.push("/sign-in");
      } else {
        this.getProfileData();
      }
    },

    data: () => ({
      userDetails: {
        username: '',
        email: '',
        created: '',
      },
      changeUsernameValue: '',
      changeUsernameAlertType: 'info',
      changeUsernameAlert: false,
      changeUsernameAlertMessage: '',
    }),

    computed: {
      ...mapGetters("authentication", ["isSignedIn"]),
    },

    methods: {
      getProfileData() {
        return HTTP().get('/auth/profile')
          .then(({
            data
          }) => {
            this.userDetails.username = data.profile.username;
            this.userDetails.email = data.profile.email;
            this.userDetails.created = this.formatDate(data.profile.created);
          })
      },

      formatDate(date) {
        const options = {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        };
        let dateNew = new Date(date);
        dateNew = dateNew.toLocaleDateString(undefined, options);

        return dateNew;
      },

      changeUsername(username) {
        this.changeUsernameAlert = false;
        return HTTP().patch('/auth/change-username', {
            username: username
          })
          .then(({
            data
          }) => {
            // Show success message
            this.changeUsernameAlertType = 'success'
            this.changeUsernameAlertMessage = data.message;
            this.changeUsernameAlert = true;

            // Update username on profile display
            this.userDetails.username = username;
          })
          .catch((error) => {
            // Validation error
            if (error.response.status == '400') {
              this.changeUsernameAlertType = 'error'
              this.changeUsernameAlertMessage = error.response.data[0].message;
              this.changeUsernameAlert = true;

            }
            // Too many requests
            else if (error.response.status == '429') {
              this.changeUsernameAlertType = 'error'
              this.changeUsernameAlertMessage = error.response.data.error.message;
              this.changeUsernameAlert = true;
            }
            // Profanity filter
            else if (error.response.status == '422') {
              this.changeUsernameAlertType = 'error'
              this.changeUsernameAlertMessage = error.response.data.message;
              this.changeUsernameAlert = true;
            } else {

            }
          });
      }
    },
  };

</script>

<style scoped>
  .bg {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    left: 0;
    background: url("../images/backgrounds/customs7.png") no-repeat center center;
    background-size: cover;
    background-color: black;
    transform: scale(1);
  }

  a {
    text-decoration: none;
  }

</style>
