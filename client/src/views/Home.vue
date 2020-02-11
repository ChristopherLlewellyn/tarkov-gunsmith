<template>
  <v-container grid-list-xs>
    <v-layout row wrap>
      
      <v-flex xs12>
        <v-text-field prepend-icon="mdi-rename-box" label="Loadout name" class="pb-2 pt-2" single-line filled></v-text-field>
      </v-flex>

      <v-flex xs12 md4>
        <weapon-selector></weapon-selector>
      </v-flex>

      <v-flex xs12 md8>
        <attachment-selector></attachment-selector>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
import WeaponSelector from '@/components/WeaponSelector.vue'
import AttachmentSelector from '@/components/AttachmentSelector.vue'

  export default {
    components: {
      WeaponSelector,
      AttachmentSelector,
    },
  };

</script>
