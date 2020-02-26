<template>
  <v-container grid-list-xs>
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
                <v-btn small icon color="green" class="ma-2" :disabled="votingDisabled" @click="recaptchaUpvote(), votingDisabled=true">
                  <v-icon>mdi-thumb-up</v-icon>
                </v-btn>
                <template v-if="votes < 0">
                  <h4 class="ma-2 red--text">{{ votes }}</h4>
                </template>

                <template v-else-if="votes > 0">
                  <h4 class="ma-2 green--text">{{ votes }}</h4>
                </template>

                <template v-else>
                  <h4 class="ma-2 grey--text">{{ votes }}</h4>
                </template>
                <v-btn small icon color="red" class="ma-2" :disabled="votingDisabled" @click="recaptchaDownvote(), votingDisabled=true">
                  <v-icon>mdi-thumb-down</v-icon>
                </v-btn>
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

  import router from '../router';
  import ViewAttachments from '@/components/ViewAttachments.vue';
  import ViewWeapon from '@/components/ViewWeapon.vue';

  export default {
    components: {
      ViewAttachments,
      ViewWeapon,
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

      async recaptchaToken() {
        return new Promise((resolve) => {
          grecaptcha.ready(async () => {
            const token = await grecaptcha.execute(process.env.VUE_APP_RECAPTCHASITEKEY, {
              action: 'vote'
            });
            resolve(token);
          });
        });
      },

      async recaptchaUpvote() {
        const token = await this.recaptchaToken();
        this.setCaptcha(token);
        this.upvote();
      },

      async recaptchaDownvote() {
        const token = await this.recaptchaToken();
        this.setCaptcha(token);
        this.downvote();
      },
    },

    data() {
      return {
        transition: 'scale-transition',
        votingDisabled: false,
      };
    },
  };

</script>
