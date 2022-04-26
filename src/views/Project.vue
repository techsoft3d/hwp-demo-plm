<script>
export default {
  data() {
    return {
      assembly: {
        projectNumber: "PR00001",
        name: "Micro Engine",
        assemblyFile: "_micro_engine.CATProduct",
        modeler: "Catia",
        status: "In Design",
        startDate: "Aug 26, 2017",
        endDate: "Dec 18, 2017",
        percentComplete: "75%",
        revision: "1",
        members: [0, 1],
      },
    };
  },
  methods: {
    async loadProject(assembly) {
      // this.completenodelist = [];
      // this.currentView = "list";
      // this.viewerVisibl = false;
      // this.currentNod = {};
      // this.currentNodeLis = [];
      // this.usedInNodeLis = [];
      // this.structure = [];
      // this.revision = 1;
      // this.viewNodeTable = true;
      // this.viewInfo = false;
      // this.usesView = 0;
      // this.currentAssembly = {};

      let masterAssembly = this.assembly.assemblyFile;
      // this.currentAssembly = assembly;
      var model_name = masterAssembly.split(".");
      model_name = model_name[0].replace(" ", "_") + "";
      // this.loadAssembly(model_name);
      // this.communicatorLoaded = false;

      // Parse the xml
      // let xml = await import(`../model-data/${masterAssembly.replace("", "-")}.xml?raw`);
      let xml = await import("../model-data/_micro-engine.CATProduct.xml?raw");
      xml = xml.default;

      // let parser = new DOMParser();
      // let xmlDoc = parser.parseFromString(xml, "text/xml");

      // let structure = [];
      // let x = xmlDoc.getElementsByTagName("ProductOccurence");
      // for (let i = 0; i < x.length; i++) {
      //   let file_name = "";
      //   let thumb_file = "";
      //   let _modelBrowserName = "";
      //   if (x[i].getAttribute("FilePath") != null) {
      //     let file_name = x[i]
      //       .getAttribute("FilePath")
      //       .split("\\")
      //       .pop()
      //       .split("/")
      //       .pop();
      //     let thumb_file =
      //       "/demos/product-lifecycle-management/images/" +
      //       masterAssembly.replace(" ", "_") +
      //       "/" +
      //       file_name.replace(" ", "_") +
      //       ".png";
      //     let _modelBrowserName = x[i].getAttribute("Name");
      //   }

      //   const id = parseInt(x[i].getAttribute("Id"));
      //   const _fileSize = Math.round(
      //     parseInt(x[i].getAttribute("FileSize")) / 1024
      //   );
      //   const _partNumber = x[i].getAttribute("PartNumber");

      //   structure[id] = {
      //     children: [],
      //     parents: [],
      //     name: file_name,
      //     thumb: thumb_file,
      //     modelBrowserName: _modelBrowserName,
      //     filesize: _fileSize,
      //     partnumber: _partNumber,
      //   };

      //   if (x[i].getAttribute("Children") != null) {
      //     structure[id].children = x[i]
      //       .getAttribute("Children")
      //       .split(" ")
      //       .map(function (item) {
      //         return parseInt(item, 10);
      //       });
      //   } else if (x[i].getAttribute("InstanceRef") != null) {
      //     structure[id].children.push(
      //       parseInt(x[i].getAttribute("InstanceRef"), 10)
      //     );
      //   } else {
      //     structure[id].children = null;
      //   }
      // }

      // // find the root node
      // root = {};
      // searchName = vm.masterAssembly;
      // found = false;
      // for (i = 0; i < structure.length && !found; i++) {
      //   if (structure[i].name == searchName) {
      //     root = structure[i];
      //   }
      // }

      // vm.completenodelist.push(root);

      // getAllChildren(structure, root).forEach(function (node) {
      //   vm.completenodelist.push(node);
      // });

      // buildTree(structure, root);

      // xmlhttp.send();
      // this.projectView = false;
    },
  },
  mounted() {
    console.log("project mounted");
  },
};
</script>

<template>
  <div class="columns">
    <div class="column is-three-quarters">
      <!-- Level Start-->
      <div class="level">
        <div class="level-left">
          <a class="button is-white">
            <strong>Projects</strong>
          </a>
          <p><strong>|</strong></p>
          <a class="button is-white">
            <strong>{{ assembly.name }}</strong>
          </a>
          <p><strong>|</strong></p>
          <a class="button is-white">
            <strong></strong>
          </a>
        </div>
        <div class="level-center">
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
            <div class="field has-addons">
              <p class="control">
                <a :class="['button']">
                  <span class="icon is-small">
                    <i class="fa fa-th-large"></i>
                  </span>
                </a>
              </p>
              <p class="control">
                <a :class="['button']">
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

      <!-- List Start -->
      <div id="file_list">
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
      <div id="file_table">
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
      <!-- List End  -->
    </div>

    <!-- Card Start -->
    <div class="column">
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
    <!-- Card End -->
  </div>
</template>

<style>
@import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
</style>
