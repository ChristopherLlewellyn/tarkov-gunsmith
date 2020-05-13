<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <!-- Shown if loading -->
        <v-card v-if="loading">
          <v-card-title class="blue-grey darken-2 justify-center">
            <v-icon class="pr-2" large>mdi-help-circle-outline</v-icon>
            Conflicts
          </v-card-title>
          <v-card-actions class="pa-4">
            <v-row class="fill-height ma-0" align="center" justify="center">
              <v-progress-circular class="mt-4 mb-4" indeterminate color="grey lighten-5"></v-progress-circular>
            </v-row>
          </v-card-actions>
        </v-card>

        <!-- Shown if not loading -->
        <v-card v-else>
          <v-card-title class="blue-grey darken-2 justify-center">
            <v-icon v-if="Object.keys(conflicts).length > 0" class="pr-2" large color="red">mdi-close-circle-outline</v-icon>
            <v-icon v-else class="pr-2" large color="green">mdi-check-circle-outline</v-icon>
            Conflicts
          </v-card-title>
          <v-card-actions v-if="Object.keys(conflicts).length > 0" v-for="(conflict, i) in conflicts" :key="i" class="pa-4">
            <v-layout row wrap class="justify-center">
              <v-icon class="pr-2" large color="red">mdi-alert-outline</v-icon>
              <h3 class="mt-1">Conflict between</h3>
              &nbsp;
              <h3 class="red--text mt-1">{{ conflict.conflictingItemA }}</h3>
              &nbsp;
              <h3 class="mt-1">and</h3>
              &nbsp;
              <h3 class="red--text mt-1">{{ conflict.conflictingItemB }}</h3>
            </v-layout>
          </v-card-actions>

          <v-card-actions v-if="Object.keys(conflicts).length == 0" class="pa-4 justify-center">
            <h3 class="green--text">No conflicts detected.</h3>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    props: {
      loading: Boolean,
      conflicts: Array
    },
    components: {

    },
  };

</script>
