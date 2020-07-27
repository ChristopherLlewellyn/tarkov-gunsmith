<template>
  <v-card class="mx-auto" width="900" tile>
    <loadout-list-view-item 
      v-for="loadout in loadouts" 
      :key="loadout.id"
      :loadoutId="loadout.id"
      :gunImg="loadout.gun_img"
      :gunImgBig="loadout.gun_img_big"
      :loadoutName="loadout.name"
      :gunName="loadout.gun_name"
      :gunType="loadout.gun_type"
      :gunRPM="loadout.gun_rpm"
      :ergonomics="loadout.ergonomics_final"
      :horizontalRecoil="loadout.horizontal_recoil_final"
      :verticalRecoil="loadout.vertical_recoil_final"
      :marketPrice="loadout.market_price"
      :username="loadout.username"
      :caliber="loadout.gun_caliber"
      :createdAt="loadout.created_at"
      :votes="loadout.votes"
    ></loadout-list-view-item>
  </v-card>
</template>

<script>
  import LoadoutListViewItem from './LoadoutListViewItem';

  export default {
    name: "listView",
    props: {
      loadouts: Array
    },
    components: {
      LoadoutListViewItem
    }
  };

</script>
