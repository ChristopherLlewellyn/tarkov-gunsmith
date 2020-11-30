<template>
  <v-container class="relative" grid-list-xs>
    <span class="bg"></span>
    <v-layout row wrap>
      <!-- Error Snackbar -->
      <v-snackbar v-model="showSnackbar" multi-line top color="error">
        <h3>{{ error }}</h3>
        <v-btn text @click="showSnackbar = false, setSnackbar(false)">Close</v-btn>
      </v-snackbar>

      <v-snackbar v-model="notSignedInSnackbar" :timeout="0" color="blue darken-2" class="mb-6">
        <v-icon left>mdi-information-outline</v-icon>
        <h3>Sign in to publish your loadout</h3>
          <v-btn
            color="white"
            text
            @click="notSignedInSnackbar = false"
          >
            Close
          </v-btn>
      </v-snackbar>

      <!-- Floating Info Panel -->
      <floating-build-info-panel
        v-if="showBuildInfoPanel"
        :loading="(weaponsLoading || attachmentsLoading) ? true : false"
        :conflicts="conflicts"
        :calculatedErgonomics="calculatedErgonomics"
        :calculatedVerticalRecoil="calculatedVerticalRecoil"
        :calculatedHorizontalRecoil="calculatedHorizontalRecoil"
        :calculatedWeight="calculatedWeight"
        :market_price="market_price"
      ></floating-build-info-panel>

      <!-- Loadout Title -->
      <v-flex xs12 v-if="isSignedIn">
        <v-text-field
          v-model="loadoutName"
          :rules="rules"
          prepend-icon="mdi-rename-box"
          label="Loadout name"
          class="pb-2 pt-2"
          single-line
          filled
        ></v-text-field>
      </v-flex>

      <!-- Weapon Selector -->
      <v-flex xs12>
        <weapon-selector v-observe-visibility="weaponSelectorVisibilityChanged"></weapon-selector>
        <v-divider></v-divider>
        <v-layout v-if="isSignedIn" column align-center>
          <v-btn
            class="justify-center"
            color="green"
            :disabled="publishDisabled"
            @click="recaptchaCreateLoadout()"
          >
            <span>Publish</span>
            <v-icon right>mdi-publish</v-icon>
          </v-btn>
        </v-layout>
      </v-flex>

      <!-- Conflicts -->
      <v-flex xs12>
        <conflicts-panel
          class="mt-2"
          :loading="(weaponsLoading || attachmentsLoading) ? true : false"
          :conflicts="conflicts"
        ></conflicts-panel>
      </v-flex>

      <!-- Description -->
      <v-flex xs12 v-if="isSignedIn">
        <v-card class="ma-3">
          <v-card-title class="blue-grey darken-2 justify-center">
            <v-icon class="pr-2" large>mdi-card-text</v-icon>
            Description
          </v-card-title>
          <v-card-actions>
            <tiptap-editor :disabled="false" :data="loadoutDescription" @update-description="updateDescription"></tiptap-editor>
          </v-card-actions>
        </v-card>
      </v-flex>

      <!-- Build Tree -->
      <template>
        <v-flex xs12 v-observe-visibility="buildTreeVisibilityChanged">
          <template v-if="weaponsLoading || attachmentsLoading" class="ma-4">
            <v-card>
              <v-card-title class="blue-grey darken-2 justify-center">
                <v-icon class="pr-2" large>mdi-pine-tree</v-icon>Build Tree
              </v-card-title>
              <v-row class="fill-height ma-0" align="center" justify="center">
                <v-progress-circular class="mt-4 mb-4" indeterminate color="grey lighten-5"></v-progress-circular>
              </v-row>
            </v-card>
          </template>

          <template v-if="!weaponsLoading && !attachmentsLoading">
            <tree
              v-if="!weaponsLoading && !attachmentsLoading"
              treeType="create"
              :tree-data="weapon"
              :availableAttachments="availableAttachments"
              class="mt-2"
            ></tree>
          </template>
        </v-flex>
      </template>

      <!-- Build List Table -->
      <v-flex xs12>
        <build-list-table v-if="!weaponsLoading && !attachmentsLoading" :items="allItems"></build-list-table>
      </v-flex>
    </v-layout>
  
  </v-container>
</template>

<script>
import { mapActions, mapGetters, mapMutations, mapState } from "vuex";

import router from "../router";
import WeaponSelector from "@/components/WeaponSelector.vue";
import BuildListTable from "@/components/BuildListTable.vue";
import Tree from "@/components/Tree.vue";
import ConflictsPanel from "@/components/ConflictsPanel.vue";
import FloatingBuildInfoPanel from "@/components/FloatingBuildInfoPanel.vue";
import TiptapEditor from "@/components/TiptapEditor.vue";

export default {
  metaInfo: {
    title: "Create Loadout",
    titleTemplate: "%s - Tarkov Gunsmith"
  },
  
  mounted() {
    if(!this.isSignedIn) {
      this.notSignedInSnackbar = true;
    }
    this.reset();
    this.fetchAttachments();
    this.fetchWeapons();
  },

  computed: {
    ...mapGetters("authentication", ["isSignedIn"]),

    ...mapState("createLoadout", [
      "weapon",
      "calculatedErgonomics",
      "calculatedHorizontalRecoil",
      "calculatedVerticalRecoil",
      "market_price",
      "calculatedWeight",
      "error",
      "availableAttachments",
      "weaponsLoading",
      "attachmentsLoading",
      "availableWeapons",
      "allItems",
      "conflicts",
      "snackbar"
    ]),

    publishDisabled() {
      if (this.conflicts.length > 0) {
        return true;
      }
      return false;
    }
  },

  watch: {
    snackbar(newValue) {
      this.showSnackbar = newValue;
    },
    showSnackbar(newValue) {
      this.setSnackbar(newValue);
    }
  },

  methods: {
    ...mapActions("createLoadout", [
      "createLoadout",
      "fetchWeapons",
      "fetchAttachments"
    ]),

    ...mapMutations("createLoadout", [
      "setLoadoutName",
      "setLoadoutDescription",
      "reset",
      "setSnackbar",
      "setCaptcha"
    ]),

    weaponSelectorVisibilityChanged(isVisible, entry) {
      this.weaponSelectorVisibility = isVisible;
      if (isVisible) {
        this.showBuildInfoPanel = false;
      } else {
        this.showBuildInfoPanel = true;
      }
    },

    buildTreeVisibilityChanged(isVisible, entry) {
      this.buildTreeVisible = isVisible;
      if (this.buildTreeVisible == false) {
        this.showBuildInfoPanel = false;
      } else if (this.buildTreeVisible == true && !this.weaponSelectorVisibility == true) {
        this.showBuildInfoPanel = true;
      }
    },

    updateDescription(newDescription) {
      this.loadoutDescription = newDescription;
    },

    async recaptchaToken() {
      return new Promise(resolve => {
        grecaptcha.ready(async () => {
          const token = await grecaptcha.execute(
            process.env.VUE_APP_RECAPTCHASITEKEY,
            {
              action: "CreateLoadout"
            }
          );
          resolve(token);
        });
      });
    },

    async recaptchaCreateLoadout() {
      const token = await this.recaptchaToken();
      this.setCaptcha(token);
      this.setLoadoutName(this.loadoutName);
      this.setLoadoutDescription(this.loadoutDescription);
      this.createLoadout();
    }
  },

  components: {
    WeaponSelector,
    Tree,
    BuildListTable,
    ConflictsPanel,
    FloatingBuildInfoPanel,
    TiptapEditor
  },

  data: () => ({
    loadoutName: "",
    loadoutDescription: "",
    showSnackbar: false,
    notSignedInSnackbar: false,
    showBuildInfoPanel: false,
    weaponSelectorVisibility: true,
    buildTreeVisible: false,
    rules: [
      value => !!value || "Required.",
      value => (value && value.length <= 45) || "Max 45 characters"
    ]
  })
};
</script>

<style scoped>
.bg {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  background: url("../images/backgrounds/labs4.png") no-repeat center center;
  background-size: cover;
  background-color: black;
  transform: scale(1);
}

.relative {
  position: relative;
}
</style>
