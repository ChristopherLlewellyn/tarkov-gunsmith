<template>
  <v-container grid-list-xs>
    <v-layout row wrap>

      <v-container grid-list-xs>
        <v-flex xs12>
          <v-skeleton-loader :loading="loading" :transition="transition" type="text" width="300">
            <h1>{{ loadoutName }}</h1>
          </v-skeleton-loader>
          <v-divider></v-divider>
          <v-skeleton-loader :loading="loading" :transition="transition" type="text" width="300">
            <h3 class="font-weight-bold orange--text">
              <v-icon>mdi-account</v-icon>
              {{username}}
            </h3>
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
      ]),
    },

    methods: {
      ...mapActions('viewLoadout', [
        'fillLoadoutDetails',
      ]),

      ...mapMutations('viewLoadout', [
        'reset',
        'setLoadoutName',
        'setLoadoutId',
      ]),
    },

    data() {
      return {
        transition: 'scale-transition',
      };
    },
  };

</script>
