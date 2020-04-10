<template>
  <v-container>
    <v-layout row wrap>
      <v-flex xs12>
        <div class="tree">
          <v-card>
            <v-card-title class="blue-grey darken-2">Build Tree</v-card-title>
              <v-container fluid>
                <node-tree :node="treeData"></node-tree>
              </v-container>
            </v-card-title>
          </v-card>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import NodeTree from './NodeTree';

export default {
  props: {
    treeData: Object,
  },
  components: {
    NodeTree,
  },
};
</script>

<style>
.tree-list ul {
  padding-left: 16px;
  margin: 6px 0;
}
</style>
