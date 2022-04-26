<script>
import drillXml from "../model-data/__drill.asm.xml?raw";

export default {
  mounted() {
    console.log("project mounted");
  },
};
</script>

<template>
  <div class="columns">
    <div class="column is-three-quarters">
      <!--class="row list-group">-->
      <div class="level">
        <div class="level-left">
          <a class="button is-white" @click="projectView = true">
            <strong>Projects</strong></a
          >
          <p><strong>|</strong></p>
          <a class="button is-white" @click="onBack()">
            <strong>{{ currentAssembly.name }}</strong>
          </a>
          <p v-show="viewInfo"><strong>|</strong></p>
          <a class="button is-white" v-show="viewInfo">
            <strong>{{ currentNode.modelBrowserName }}</strong>
          </a>
        </div>
        <div class="level-center" v-show="!viewInfo">
          <div class="level-item">
            <div class="buttons">
              <!--buttons -->
              <a class="button is-info">Upload</a>
              <a class="button">New Folder</a>
            </div>
          </div>
        </div>
        <div class="level-right" v-show="!viewInfo">
          <div class="level-item">
            <div class="field has-addons">
              <p class="control" @click="toggleView()">
                <a
                  :class="[
                    'button',
                    currentView === 'table' ? 'is-active' : '',
                  ]"
                >
                  <span class="icon is-small">
                    <i class="fa fa-th-large"></i>
                  </span>
                </a>
              </p>
              <p class="control" @click="toggleView()">
                <a
                  :class="['button', currentView === 'list' ? 'is-active' : '']"
                >
                  <span class="icon is-small">
                    <i class="fa fa-th-list"></i>
                  </span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
      <div id="file_list" v-show="currentView == 'list' && !viewInfo">
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
          <!-- <tr
            v-for="(node, index) in completenodelist"
            @click="viewPartInfo(node)"
          >
            <td>{{ node.modelBrowserName }}</td>
            <td>{{ node.partnumber }}</td>
            <td>{{ getRevision(node) }}</td>
            <td>Jonathan Girroir</td>
            <td>{{ currentAssembly.modeler }}</td>
            <td>{{ node.filesize }} Kb</td>
            <td>Oct 25</td>
          </tr> -->
        </table>
      </div>
      <div id="file_table" v-show="currentView == 'table' && !viewInfo">
        <!--class="row list-group">-->
        <!-- <div class="columns">
          <div v-for="i in 4" class="column is-one-quarter">
            <div
              v-for="(node, index) in completenodelist"
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
        </div> -->
      </div>
    </div>

    <div class="column">
      <div class="card">
        <div class="card-content">
          <div class="level">
            <div class="level-left">
              <div class="level-item">
                <P>PROJECT MEMBERS (2)</P>
              </div>
            </div>
            <div class="level-left">
              <div class="level-item">
                <div class="button is-info">Invite</div>
              </div>
            </div>
          </div>
          <!-- <div class="media" v-for="memberId in currentAssembly.members">
            <div class="media-left">
              <figure class="image is-48x48">
                <img
                  v-bind:src="users[memberId].thumb"
                  alt="Placeholder image"
                />
              </figure>
            </div>
            <div class="media-content">
              <p class="title is-4">{{ users[memberId].name }}</p>
              <p class="subtitle is-6">
                {{ users[memberId].title }}<br />{{ users[memberId].email }}
              </p>
            </div>
          </div> -->
        </div>
        <footer class="card-footer">
          <a href="#" class="card-footer-item">View and Manage Members</a>
        </footer>
      </div>
    </div>
  </div>
</template>

<style>
</style>
