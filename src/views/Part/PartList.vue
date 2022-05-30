<script>
import { getImageUrl } from "../../javascript/paths";

export default {
  props: ["assembly", "completeNodeList", "structure"],
  inject: ["layout"], // 0 list, 1 table
  data() {
    return {};
  },
  methods: {
    getRevision(node) {
      if (this.assembly.revision != undefined) {
        return this.assembly.revision;
      } else if (node.name.toLowerCase().includes("reva")) {
        return "A";
      } else if (node.name.toLowerCase().includes("revb")) {
        return "B";
      }
      return "A";
    },
    getThumb: getImageUrl,
    load(partNumber) {
      this.$router.push(
        `/project/${this.assembly.projectNumber}/part/${partNumber}`
      );
    },
  },
  mounted() {
    console.log("project list mounted");
  },
};
</script>

<template>
  <!-- List Start -->
  <div id="file_list" v-show="layout == 0">
    <table>
      <tr>
        <th>Name</th>
        <th>Part #</th>
        <th>Revision</th>
        <th>Owner</th>
        <th>Type</th>
        <th>Size</th>
        <th>Last Updated</th>
      </tr>
      <tr
        v-for="(node, index) in completeNodeList"
        v-bind:key="index"
        @click="load(node.partnumber)"
      >
        <td>{{ node.modelBrowserName }}</td>
        <td>{{ node.partnumber }}</td>
        <td>{{ getRevision(node) }}</td>
        <td>Jonathan Girroir</td>
        <td>{{ assembly.modeler }}</td>
        <td>{{ node.filesize }} Kb</td>
        <td>Oct 25</td>
      </tr>
    </table>
  </div>
  <div id="file_table" v-show="layout == 1">
    <div class="columns is-multiline">
      <!-- <div v-for="i in 4" class="column is-one-quarter"> -->
      <div
        v-for="(node, index) in completeNodeList"
        class="column is-one-quarter"
        v-bind:key="index"
        @click="load(node.partnumber)"
      >
        <div class="box">
          <figure class="image">
            <img v-bind:src="getThumb(node.thumb)" />
          </figure>
          <div class="has-text-centered">{{ node.name }}</div>
        </div>
      </div>
    </div>
    <!-- </div> -->
  </div>
  <!-- List End  -->
</template>

<style>

#file_table .box {
  cursor: pointer;
}

</style>
