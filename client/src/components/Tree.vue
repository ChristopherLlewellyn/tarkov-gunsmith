<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <div class="tree">
          <v-card>
            <v-card-title class="blue-grey darken-2 justify-center">
              <v-icon class="pr-2" large>mdi-pine-tree</v-icon>
              Build Tree for {{treeData.short_name ? treeData.short_name : 'Missing name'}}
              <v-img class="ml-3" :src="treeData.img ? treeData.img : null" max-height="60" max-width="60" contain></v-img>
            </v-card-title>
            <v-container fluid>
              <node-tree-create v-if="treeType == 'create'" :node="treeData" :availableAttachments="availableAttachments"></node-tree-create>
              <node-tree-edit v-if="treeType == 'edit'" :node="treeData" :availableAttachments="availableAttachments"></node-tree-edit>
              <node-tree-view v-if="treeType == 'view'" :node="treeData"></node-tree-view>
            </v-container>
          </v-card>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  // Import NodeTree types here
  import NodeTreeCreate from './NodeTreeCreate';
    import NodeTreeEdit from './NodeTreeEdit';
  import NodeTreeView from './NodeTreeView';

  export default {
    props: {
      treeData: Object,
      availableAttachments: Array,
      selectedAttachments: Array,
      treeType: String
    },
    components: {
      NodeTreeCreate,
      NodeTreeEdit,
      NodeTreeView,
    },
  };

</script>

<style>
  .tree-list ul {
    padding-left: 16px;
    margin: 6px 0;
  }

</style>
