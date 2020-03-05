<template>
  <v-container grid-list-xs>
    <span class="bg"></span>
    <v-layout row wrap>

      <v-container grid-list-xs>
        <v-flex xs12>
          <!-- Loadout Title -->
          <v-skeleton-loader :loading="loading" :transition="transition" type="text" width="300">
            <h1>{{ loadoutName }}</h1>
          </v-skeleton-loader>

          <v-divider></v-divider>

          <!-- User and Votes -->
          <v-skeleton-loader :loading="loading" :transition-group="transition" type="text" width="300">
            <v-layout row wrap>
              <!-- Username -->
              <v-card outlined class="d-flex flex-row ma-2 align-center">
                <h3 class="font-weight-bold orange--text d-flex flex-row ma-2">
                  <v-icon class="pr-2">mdi-account</v-icon>
                  {{ username }}
                </h3>
              </v-card>

              <!-- Updated -->
              <v-card outlined class="d-flex flex-row ma-2 align-center">
                <h4 class="font-weight-medium grey--text d-flex flex-row ma-2">
                  <v-icon class="pr-2">mdi-update</v-icon>
                  {{ updated }}
                </h4>
              </v-card>

              <!-- Votes -->
              <v-card outlined class="d-flex flex-row ma-2 align-center">



                <v-dialog v-model="upvoteDialog" width="400">
                  <template v-slot:activator="{ on }">
                    <v-btn small icon color="green" class="ma-2" :disabled="votingDisabled" v-on="on">
                      <v-icon>mdi-thumb-up</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-toolbar dense color="blue darken-1">
                      <v-icon left>mdi-information-outline</v-icon>
                      Please verify that you're not a robot
                    </v-toolbar>
                    <v-card-actions class="justify-center">
                      <vue-recaptcha @verify="onVerifyUpvote" @expired="onExpired" :sitekey="sitekey" :theme="recaptchaTheme">
                      </vue-recaptcha>
                    </v-card-actions>
                  </v-card>
                </v-dialog>

                <template v-if="votes < 0">
                  <h4 class="ma-2 red--text">{{ votes }}</h4>
                </template>

                <template v-else-if="votes > 0">
                  <h4 class="ma-2 green--text">{{ votes }}</h4>
                </template>

                <template v-else>
                  <h4 class="ma-2 grey--text">{{ votes }}</h4>
                </template>

                <v-dialog v-model="downvoteDialog" width="400">
                  <template v-slot:activator="{ on }">
                    <v-btn small icon color="red" class="ma-2" :disabled="votingDisabled" v-on="on">
                      <v-icon>mdi-thumb-down</v-icon>
                    </v-btn>
                  </template>
                  <v-card>
                    <v-toolbar dense color="blue darken-1">
                      <v-icon left>mdi-information-outline</v-icon>
                      Please verify that you're not a robot
                    </v-toolbar>
                    <v-card-actions class="justify-center">
                      <vue-recaptcha @verify="onVerifyDownvote" @expired="onExpired" :sitekey="sitekey" :theme="recaptchaTheme">
                      </vue-recaptcha>
                    </v-card-actions>
                  </v-card>
                </v-dialog>
              </v-card>
            </v-layout>
          </v-skeleton-loader>
        </v-flex>
      </v-container>

      <v-flex xs12 md4>
        <view-weapon></view-weapon>
      </v-flex>

      <v-flex xs12 md8>
        <view-attachments></view-attachments>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  import {
    mapActions,
    mapGetters,
    mapMutations,
    mapState,
  } from 'vuex';
  import VueRecaptcha from 'vue-recaptcha';

  import router from '../router';
  import ViewAttachments from '@/components/ViewAttachments.vue';
  import ViewWeapon from '@/components/ViewWeapon.vue';

  export default {
    components: {
      ViewAttachments,
      ViewWeapon,
      VueRecaptcha,
    },

    mounted() {
      this.reset();
      this.setLoadoutId(this.$route.params.id);
      this.fillLoadoutDetails();
    },

    computed: {
      ...mapState('viewLoadout', [
        'loadoutName',
        'username',
        'loading',
        'votes',
        'updated',
      ]),
    },

    methods: {
      ...mapActions('viewLoadout', [
        'fillLoadoutDetails',
        'upvote',
        'downvote',
      ]),

      ...mapMutations('viewLoadout', [
        'reset',
        'setLoadoutName',
        'setLoadoutId',
        'setCaptcha',
      ]),

      onVerifyDownvote: function (token) {
        this.setCaptcha(token);
        this.downvote();
        this.downvoteDialog = false;
        this.votingDisabled = true;
      },
      onVerifyUpvote: function (token) {
        this.setCaptcha(token);
        this.upvote();
        this.upvoteDialog = false;
        this.votingDisabled = true;
      },
      onExpired: function () {
        this.resetRecaptcha();
      },
      resetRecaptcha() {
        this.$refs.recaptcha.reset() // Direct call reset method
      },
    },

    data() {
      return {
        transition: 'scale-transition',
        votingDisabled: false,
        upvoteDialog: false,
        downvoteDialog: false,
        sitekey: process.env.VUE_APP_RECAPTCHASITEKEYV2,
        recaptchaTheme: "dark",
      };
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
    background: url('../images/pmcReload.png') no-repeat center center;
    background-size: cover;
    background-color: black;
    transform: scale(1);
  }

  a {
    text-decoration: none;
  }

</style>
