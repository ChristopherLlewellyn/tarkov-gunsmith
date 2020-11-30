<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="800px">
      <!-- Open Dialog Button -->
      <template v-slot:activator="{ on }">
        <v-btn color="blue-grey darken-1" v-on="on">
          <span>Filter</span>
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
                <v-autocomplete v-model="gun" :items="gunNames" label="Gun" prepend-icon="mdi-pistol" clearable></v-autocomplete>
              </v-col>

              <!-- Caliber -->
              <v-col cols="12">
                <v-autocomplete v-model="caliber" :items="caliberNames" label="Caliber" prepend-icon="mdi-bullet" clearable></v-autocomplete>
              </v-col>

              <!-- Price Range -->
              <v-col cols="12">
                <v-range-slider
                  v-model="priceRange"
                  label="Price Range"
                  prepend-icon="mdi-currency-rub"
                  color="blue"
                  :min="min"
                  :max="max"
                  step="10000"
                  ticks="always"
                  tick-size="2"
                  thumb-label="always"
                  :thumb-size="30"
                >
                  <template v-slot:thumb-label="{ value }">{{ value / 1000 + "k" }}</template>
                </v-range-slider>
              </v-col>

              <v-col cols="12" align="center">
                <v-btn text color="blue" @click="resetFilters()">
                  <span>Reset Filters</span>
                  <v-icon right>mdi-refresh</v-icon>
                </v-btn>
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
          <v-btn color="green" text @click="(dialog = false), applyFilters()">
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
    gunNames: Array,
    caliberNames: Array
  },

  methods: {
    applyFilters(event) {
      let filters = {};
      filters.gun = this.gun;
      filters.caliber = this.caliber;
      filters.priceRangeMin = this.priceRange[0];
      filters.priceRangeMax = this.priceRange[1];

      this.$emit("apply-filters", filters);
    },

    resetFilters() {
      this.gun = "Any";
      this.caliber = "Any";
      this.priceRange = [0, 1500000];
    }
  },

  data: () => ({
    gun: "Any",
    priceRange: [0, 1500000],

    // caliber
    caliber: "Any",

    // Price Range
    min: 0,
    max: 1500000,

    dialog: false
  })
};
</script>
