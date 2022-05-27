<script>
import { getAllChildren, getAllAncestors } from "../../javascript/node-utilities";
import { Image_Path } from "../../javascript/paths";

export default {
  props: ["assembly", "completeNodeList", "structure"],
  data() {
    return {
      usesView: 0, // 0 is "Uses", 1 is "Used In"
    };
  },
  computed: {
    currentNode() {
      const partNumber = this.$route.params.partNumber;
      let result = {
        children: [2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
        filesize: 134,
        modelBrowserName: "Product1",
        name: "_micro engine.CATProduct",
        parents: [],
        partnumber: "00413099",
        thumb: "_micro_engine.CATProduct/_micro_engine.CATProduct.png",
      };

      for (let i = 0; i < this.completeNodeList.length; i++) {
        if (this.completeNodeList[i].partnumber == partNumber) {
          result = this.completeNodeList[i];
        }
      }

      return result;
    },
    usesNodeList() {
      if (this.structure.length > 0) {
        let children = getAllChildren(this.structure, this.currentNode);
        children = children.filter(node => {
          return node.partnumber != null;
        });
        return children;
      }
      return [];
    },
    usedInNodeList() {
      let ancestors = getAllAncestors(this.structure, this.currentNode);
      return ancestors;
    }
  },
  methods: {
    getThumb(thumbName) {
      const imgUrl = `${Image_Path}/${thumbName}`;
      return imgUrl;
    },
    load(partNumber) {
      this.$router.push(
        `/project/${this.assembly.projectNumber}/part/${partNumber}`
      );
    },
    viewModel() {
      const partNumber = this.$route.params.partNumber;
      const projectNumber = this.$route.params.projectNumber;
      this.$router.push(
        `/model/${projectNumber}/${partNumber}`
      );
    }
  },
  created() {
    console.log("part detail created");
  },
};
</script>

<template>
  <div id="info" class="node_display">
    <div class="row list-group">
      <div class="columns">
        <div class="column is-one-third">
          <div class="box">
            <figure class="image">
              <img v-bind:src="getThumb(currentNode.thumb)" />
            </figure>
          </div>
        </div>
        <div class="column">
          <p><strong>Part Number:</strong> {{ currentNode.partnumber }}</p>
          <p><strong>Revision:</strong> 1</p>
          <p><strong>Owner:</strong> Jonathan Girroir</p>
          <p><strong>Type:</strong> Catia V5</p>
          <p><strong>Size:</strong> {{ currentNode.filesize }} Kb</p>
          <p><strong>Last Updated:</strong> Oct 25</p>
          <br />
          <div class="buttons">
            <a class="button is-info" @click="viewModel()">View</a>
            <a class="button">Generate BOM</a>
          </div>
        </div>
      </div>
    </div>

    <div class="tabs">
      <ul>
        <li :class="[usesView == 0 ? 'is-active' : '']">
          <a @click="usesView = 0">
            <span>Uses</span>
          </a>
        </li>
        <li :class="[usesView == 1 ? 'is-active' : '']">
          <a @click="usesView = 1">
            <span>Used In</span>
          </a>
        </li>
      </ul>
    </div>
    <!-- Uses View -->
    <div v-show="usesView === 0">
      <div class="columns is-multiline is-2-desktop">
        <div
          v-for="(node, index) in usesNodeList"
          class="column is-one-quarter"
          :key="index"
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
    </div>
    <!-- Uses View End -->

    <!-- Used In View -->
    <div v-show="usesView === 1">
      <div class="columns">
        <div
          v-for="(node, index) in usedInNodeList"
          class="column is-one-quarter"
          :key="index"
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
    </div>
    <!-- Used In View End -->
  </div>
</template>

<style>
</style>