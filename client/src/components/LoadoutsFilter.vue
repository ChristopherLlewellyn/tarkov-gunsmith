<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="800px">
      <!-- Open Dialog Button -->
      <template v-slot:activator="{ on }">
        <v-btn color="primary" v-on="on">
          <span>Filters</span>
          <v-icon right>mdi-filter</v-icon>
        </v-btn>
      </template>

      <!-- Dialog Content -->
      <v-card>
        <v-card-text>
          <v-container>
            <v-row>
              <!-- Gun -->
              <v-col cols="12">
                <v-autocomplete v-model="gun" :items="gunNames" label="Gun" clearable></v-autocomplete>
              </v-col>

              <!-- Price Range -->
              <v-col cols="12">
                <v-range-slider
                  v-model="priceRange"
                  label="Price Range"
                  color="blue"
                  :min="min"
                  :max="max"
                  step="10000"
                  ticks="always"
                  tick-size="2"
                  thumb-label="always"
                  :thumb-size="30"
                >
                  <template v-slot:thumb-label="{ value }">{{ (value / 1000) + "k" }}</template>
                </v-range-slider>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="red" text @click="dialog = false">
            <span>Close</span>
            <v-icon right>mdi-close</v-icon>
          </v-btn>
          <v-btn color="blue" text @click="dialog = false, applyFilters()">
            <span>Apply Filters</span>
            <v-icon right>mdi-check</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: {
    gunNames: Array
  },

  methods: {
    applyFilters(event) {
      let filters = {};
      filters.gun = this.gun;
      filters.priceRangeMin = this.priceRange[0];
      filters.priceRangeMax = this.priceRange[1];

      this.$emit("apply-filters", filters);
    }
  },

  data: () => ({
    gun: "",
    priceRange: [0, 0],

    // Price Range
    min: 0,
    max: 750000,

    dialog: false
  })
};
</script>
