<script>
import { computed } from "@vue/runtime-core";
import {
  getAssembly,
  users,
  loadStructure,
  loadCompleteNoteList,
} from "../javascript/data-utilities";

const Image_Path = "/src/images";

export default {
  data() {
    return {
      assembly: {},
      completeNodeList: [],
      layout: 0, // 0 list, 1 table
      structure: [],
    };
  },
  computed: {
    users() {
      return users;
    },
  },
  provide() {
    return {
      assembly: this.assembly,
      completeNodeList: computed(() => this.completeNodeList),
      layout: computed(() => this.layout),
    };
  },
  methods: {
    navProject() {
      this.$router.push(`/project/${this.assembly.projectNumber}`);
    },
    navHome() {
      this.$router.push(`/`);
    },
    getThumb(thumbName) {
      const imgUrl = new URL(`${Image_Path}/${thumbName}?url`, import.meta.url)
        .href;
      return imgUrl;
    },
  },
  async created() {
    console.log("project created");
    const projectNumber = this.$route.params.projectNumber;
    this.assembly = getAssembly(projectNumber);
    this.structure = await loadStructure(projectNumber);
    this.completeNodeList = loadCompleteNoteList(projectNumber, this.structure);
  },
};
</script>

<template>
  <div class="columns">
    <!-- Levt 3/4 Column -->
    <div class="column">
      <!-- Level Start-->
      <div class="level">
        <div class="level-left">
          <a class="button is-white" @click="navHome()">
            <strong>Projects</strong>
          </a>
          <p><strong>|</strong></p>
          <a class="button is-white" @click="navProject()">
            <strong>{{ assembly.name }}</strong>
          </a>
          <p v-if="$route.params.partNumber != null"><strong>|</strong></p>
          <a v-if="$route.params.partNumber != null" class="button is-white">
            <strong>Part</strong>
          </a>
        </div>
        <div v-if="false" class="level-center">
          <div class="level-item">
            <div class="buttons">
              <!--buttons -->
              <a class="button is-info">Upload</a>
              <a class="button">New Folder</a>
            </div>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <div
              v-if="$route.params.partNumber == null"
              class="field has-addons"
            >
              <!-- Table Icon -->
              <p class="control">
                <a
                  :class="['button', layout == 1 ? 'is-active' : '']"
                  @click="layout = 1"
                >
                  <span class="icon is-small">
                    <i class="fa fa-th-large"></i>
                  </span>
                </a>
              </p>
              <!-- List Icon -->
              <p class="control">
                <a
                  :class="['button', layout == 0 ? 'is-active' : '']"
                  @click="layout = 0"
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
      <!-- Level End -->

      <!-- Router View -->
      <router-view
        :assembly="assembly"
        :completeNodeList="completeNodeList"
        :structure="structure"
      ></router-view>
    </div>

    <!-- Card Start -->
    <div class="column is-one-quarter">
      <div class="card">
        <div class="card-content">
          <div class="level">
            <div class="level-left">
              <div class="level-item">
                <p>PROJECT MEMBERS (2)</p>
              </div>
            </div>
            <div class="level-left">
              <div class="level-item">
                <div class="button is-info">Invite</div>
              </div>
            </div>
          </div>
          <div class="media" v-for="memberId in [0, 1]" v-bind:key="memberId">
            <div class="media-left">
              <figure class="image is-48x48">
                <img
                  v-bind:src="getThumb(users[memberId].thumb)"
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
          </div>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item">View and Manage Members</a>
        </footer>
      </div>
    </div>
    <!-- Card End -->
  </div>
</template>

<style>
</style>
