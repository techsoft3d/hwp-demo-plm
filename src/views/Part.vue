<template>
  <div id="info" v-show="viewInfo" class="node_display">
        <div class="row list-group">
          <div class="columns">
            <div class="column is-one-third">
              <div class="box" @click="loadFile3(currentNode)">
                <figure class="image">
                  <img v-bind:src="currentNode.thumb" />
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
                <a class="button is-info" @click="loadFile3(currentNode)"
                  >View</a
                >
                <a
                  v-show="currentNodeList.length > 1"
                  class="button"
                  @click="downloadBom()"
                  >Generate BOM</a
                >
              </div>
            </div>
          </div>
        </div>

        <div class="tabs">
          <ul>
            <li :class="[!usesView ? 'is-active' : '']">
              <a @click="setUsesView(0)">
                <span>Uses</span>
              </a>
            </li>
            <li :class="[usesView ? 'is-active' : '']">
              <a @click="setUsesView(1)">
                <span>Used In</span>
              </a>
            </li>
          </ul>
        </div>
        <div class="row list-group" v-show="usesView === 0">
          <div class="columns">
            <div v-for="i in 4" class="column is-one-quarter">
              <div
                v-for="(node, index) in currentNodeList"
                v-if="index % 4 === i - 1"
                class="box"
                @click="viewPartInfo(node)"
              >
                <figure class="image">
                  <img v-bind:src="node.thumb" />
                </figure>
                <center>{{ node.name }}</center>
              </div>
            </div>
          </div>
        </div>
        <div class="row list-group" v-show="usesView === 1">
          <div class="columns">
            <div v-for="i in 4" class="column is-one-quarter">
              <div
                v-for="(node, index) in usedInNodeList"
                v-if="index % 4 === i - 1"
                class="box"
                @click="viewPartInfo(node)"
              >
                <figure class="image">
                  <img v-bind:src="node.thumb" />
                </figure>
                <center>{{ node.name }}</center>
              </div>
            </div>
          </div>
        </div>
      </div>
</template>