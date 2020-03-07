<template>
  <v-dialog v-model="dialog">
    <template v-slot:activator="{ on }">
      <v-btn color="primary" class="pb-2 pt-2 pl-2 pr-2" v-on="on">Add Attachment</v-btn>
    </template>
    <v-card>
      <v-toolbar flat>
        <v-text-field v-model="search" prepend-icon="mdi-magnify" label="Search attachments" class="pb-2 pt-2" single-line hide-details clearable>
        </v-text-field>
      </v-toolbar>
      <v-data-table :headers="headers" :items="availableAttachments" :search="search" :items-per-page="5" class="elevation-1">
        <template v-slot:item.image="{ item }">
          <div class="pt-1 pb-1 pl-1 pr-1">
            <v-img :src="item.image" alt="No image" max-height="75" max-width="175" contain></v-img>
          </div>
        </template>
        <template v-slot:item.action="{ item }">
          <v-btn color="green" @click="addAttachment(item), updateAlert(item.name), calculateWeaponStats()">
            Add
            <v-icon right>mdi-plus-circle-outline</v-icon>
          </v-btn>
        </template>
      </v-data-table>
      <v-alert type="info" :value="alert">{{ alert }}</v-alert>
    </v-card>
  </v-dialog>
</template>

<script>
import {
  mapState,
  mapMutations,
  mapActions,
} from 'vuex';
import HTTP from '../http';

export default {

  methods: {
    ...mapMutations('editLoadout', [
      'addAttachment',
      'updateAlert',
      'calculateWeaponStats',
    ]),

    ...mapActions('editLoadout', [
      'fetchAttachments',
    ]),
  },

  computed: {
    ...mapState('editLoadout', [
      'alert',
      'availableAttachments',
    ]),
  },

  data: () => ({
    dialog: false,
    search: '',

    headers: [{
      text: 'Image',
      value: 'image',
      sortable: false,
      filterable: false,
    },
    {
      text: 'Name',
      value: 'name',
    },
    {
      text: 'Type',
      value: 'type',
    },
    {
      text: 'Ergonomics',
      value: 'ergonomics_modifier',
    },
    {
      text: 'Recoil (%)',
      value: 'recoil_modifier',
    },
    {
      text: '',
      value: 'action',
      sortable: false,
    },
    ],
  }),
};

</script>
