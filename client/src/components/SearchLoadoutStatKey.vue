<template>
  <div>
    <!-- Desktop View -->
    <div class="d-none d-sm-block">
      <v-toolbar flat width="900">
        <v-spacer></v-spacer>
        <v-icon class="mr-1">mdi-axis</v-icon>
        <span class="type-key">Type</span>

        <v-divider class="ml-2 mr-2" vertical></v-divider>

        <v-icon class="mr-1">mdi-bullet</v-icon>
        <span class="caliber-key">Caliber</span>

        <v-divider class="ml-2 mr-2" vertical></v-divider>

        <v-icon class="mr-1">mdi-hand</v-icon>
        <span class="ergonomics-key">Ergo</span>

        <v-divider class="ml-2 mr-2" vertical></v-divider>

        <v-icon class="mr-1">mdi-arrow-split-horizontal</v-icon>
        <span class="recoil-key">V-Recoil</span>

        <v-divider class="ml-2 mr-2" vertical></v-divider>

        <v-icon class="mr-1">mdi-arrow-split-vertical</v-icon>
        <span class="recoil-key">H-Recoil</span>

        <v-divider class="ml-2 mr-2" vertical></v-divider>

        <v-icon class="mr-1">mdi-chevron-triple-right</v-icon>
        <span class="rpm-key">RPM</span>

        <v-divider class="ml-2 mr-2" vertical></v-divider>

        <v-icon class="mr-1">mdi-currency-rub</v-icon>
        <span class="price-key">Flea Market Price</span>
        <v-spacer></v-spacer>
      </v-toolbar>
    </div>

    <!-- Mobile View -->
    <div class="d-sm-none">
      <v-toolbar flat>
        <v-spacer></v-spacer>
        <v-icon class="mr-1">mdi-axis</v-icon>
        <span class="type-key">Type</span>

        <v-divider class="ml-2 mr-2" vertical></v-divider>

        <v-icon class="mr-1">mdi-bullet</v-icon>
        <span class="caliber-key">Caliber</span>

        <v-divider class="ml-2 mr-2" vertical></v-divider>

        <v-icon class="mr-1">mdi-hand</v-icon>
        <span class="ergonomics-key">Ergo</span>

        <v-divider class="ml-2 mr-2" vertical></v-divider>

        <v-icon class="mr-1">mdi-arrow-split-horizontal</v-icon>
        <span class="recoil-key">V-Recoil</span>
        <v-spacer></v-spacer>
      </v-toolbar>

      <v-toolbar flat>
        <v-spacer></v-spacer>
        <v-icon class="mr-1">mdi-arrow-split-vertical</v-icon>
        <span class="recoil-key">H-Recoil</span>

        <v-divider class="ml-2 mr-2" vertical></v-divider>

        <v-icon class="mr-1">mdi-chevron-triple-right</v-icon>
        <span class="rpm-key">RPM</span>

        <v-divider class="ml-2 mr-2" vertical></v-divider>

        <v-icon class="mr-1">mdi-currency-rub</v-icon>
        <span class="price-key">Flea Market Price</span>
        <v-spacer></v-spacer>
      </v-toolbar>
    </div>
  </div>
</template>

<script>
  export default {
    name: "searchLoadoutStatKey",
  };

</script>

<style scoped>
  .weapon-key {
    font-size: 16px;
    font-weight: bold;
    color: #5C6BC0;
  }

  .type-key {
    font-size: 16px;
    font-weight: bold;
    color: #F44336;
  }

  .caliber-key {
    font-size: 16px;
    font-weight: bold;
    color: #AB47BC;
  }

  .ergonomics-key {
    font-size: 16px;
    font-weight: bold;
    color: #66BB6A;
  }

  .recoil-key {
    font-size: 16px;
    font-weight: bold;
    color: #42A5F5;
  }

  .rpm-key {
    font-size: 16px;
    font-weight: bold;
    color: #795548;
  }

  .price-key {
    font-size: 16px;
    font-weight: bold;
    color: #26A69A;
  }

</style>
