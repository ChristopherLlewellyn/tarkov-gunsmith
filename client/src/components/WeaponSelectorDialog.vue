<template>
  <v-dialog v-model="dialog" scrollable max-width="600px">
    <template v-slot:activator="{ on }">
      <v-btn v-on="on" color="blue-grey darken-4">Change Weapon</v-btn>
    </template>

    <v-container fluid>
      <v-row dense>
        <v-col v-for="card in cards" :key="card.title" :cols="card.flex">
          <v-hover v-slot:default="{ hover }">
            <v-card @click="setWeaponTitle(card.title), setWeaponSrc(card.src), dialog=false" :elevation="hover ? 16 : 0">
              <v-img :src="card.src" class="white--text align-end" gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)" height="200px">
                <v-card-title v-text="card.title"></v-card-title>
              </v-img>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </v-container>

  </v-dialog>
</template>

<script>
import { mapMutations } from 'vuex'

  export default {

    methods: {
      ...mapMutations('createLoadout', [
        'setWeaponTitle',
        'setWeaponSrc',
      ]),
    },

    data: () => ({
      dialog: false,

      cards: [{
          title: 'ADAR 2-15',
          src: 'https://gamepedia.cursecdn.com/escapefromtarkov_gamepedia/3/3c/ADAR2-15Image.png?version=5ce4ce8faa56a1c54bdb1cbab889f0d0',
          flex: 12
        },
        {
          title: 'AK-101',
          src: 'https://gamepedia.cursecdn.com/escapefromtarkov_gamepedia/3/31/AK101_Image.png?version=a01dcd5098ed49a7dc1c3dee5c66be39',
          flex: 12
        },
        {
          title: 'AK-102',
          src: 'https://gamepedia.cursecdn.com/escapefromtarkov_gamepedia/c/ca/Ak102image.png?version=124ac9183253872c8b8231562cb35405',
          flex: 12
        },
      ],
    }),
  };

</script>
