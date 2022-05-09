<script>
import { computed } from "@vue/runtime-core";
import { getAllChildren } from "../javascript/node-utilities";
import { getAssembly, users } from "../javascript/data-utilities";

const Image_Path = "../images";
const Model_Data_Path = "../model-data";

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
      // structure: computed(() => this.structure),
      layout: computed(() => this.layout),
    };
  },
  methods: {
    async loadProject() {
      let completeNodeList = [];
      let masterAssembly = this.assembly.assemblyFile;

      // Parse the xml
      let xml = await import(
        /* @vite-ignore */
        `${Model_Data_Path}/${masterAssembly.replace(" ", "-")}.xml?raw`
      );
      xml = xml.default;

      let parser = new DOMParser();
      let xmlDoc = parser.parseFromString(xml, "text/xml");

      let structure = [];
      let x = xmlDoc.getElementsByTagName("ProductOccurence");
      for (let i = 0; i < x.length; i++) {
        let file_name = "";
        let thumb_file = "";
        let _modelBrowserName = "";
        if (x[i].getAttribute("FilePath") != null) {
          file_name = x[i]
            .getAttribute("FilePath")
            .split("\\")
            .pop()
            .split("/")
            .pop();
          thumb_file =
            masterAssembly.replace(" ", "_") +
            "/" +
            file_name.replace(" ", "_") +
            ".png";
          _modelBrowserName = x[i].getAttribute("Name");
        }

        const id = parseInt(x[i].getAttribute("Id"));
        const _fileSize = Math.round(
          parseInt(x[i].getAttribute("FileSize")) / 1024
        );
        const _partNumber = x[i].getAttribute("PartNumber");

        structure[id] = {
          children: [],
          parents: [],
          name: file_name,
          thumb: thumb_file,
          modelBrowserName: _modelBrowserName,
          filesize: _fileSize,
          partnumber: _partNumber,
        };

        if (x[i].getAttribute("Children") != null) {
          structure[id].children = x[i]
            .getAttribute("Children")
            .split(" ")
            .map(function (item) {
              return parseInt(item, 10);
            });
        } else if (x[i].getAttribute("InstanceRef") != null) {
          structure[id].children.push(
            parseInt(x[i].getAttribute("InstanceRef"), 10)
          );
        } else {
          structure[id].children = null;
        }
      }

      // find the root node
      let root = {};
      const searchName = masterAssembly;
      let found = false;
      for (let i = 0; i < structure.length && !found; i++) {
        if (structure[i].name == searchName) {
          root = structure[i];
        }
      }

      completeNodeList.push(root);

      getAllChildren(structure, root).forEach(function (node) {
        completeNodeList.push(node);
      });

      this.completeNodeList = completeNodeList;
      this.structure = structure;
    },
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
    await this.loadProject();
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
