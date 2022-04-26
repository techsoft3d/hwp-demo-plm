<script>
import drillXml from "../model-data/__drill.asm.xml?raw"; 

export default {
  data() {
    return {
      assemblies: [
        {
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
        {
          projectNumber: "PR00002",
          name: "Moto X",
          assemblyFile: "_MOTO_X.asm",
          modeler: "Creo",
          status: "Complete",
          startDate: "Apr 23, 2016",
          endDate: "Nov 9, 2016",
          percentComplete: "100%",
          revision: "A",
          members: [0, 2],
        },
        {
          projectNumber: "PR00003",
          name: "Hammer Drill",
          assemblyFile: "__drill.asm",
          modeler: "Creo",
          status: "In Design",
          startDate: "Oct 2, 2017",
          endDate: "Feb 1, 2018",
          percentComplete: "52%",
          revision: "1",
          members: [0, 1],
        },
        {
          projectNumber: "PR00004",
          name: "Pump Assembly",
          assemblyFile: "874631_pump_assy_revb.asm.88",
          modeler: "Creo",
          status: "Complete",
          startDate: "Jun 12, 2017",
          endDate: "Jan 18, 2018",
          percentComplete: "100%",
          members: [0, 2],
        },
      ],
    };
  },
  methods: {
    load() {
      this.$router.push("/project");
    },
    loadProject(assembly) {
      this.completenodelist = [];
      this.currentView = "list";
      this.viewerVisibl = false;
      this.currentNod = {};
      this.currentNodeLis = [];
      this.usedInNodeLis = [];
      this.structure = [];
      this.revision = 1;
      this.viewNodeTable = true;
      this.viewInfo = false;
      this.usesView = 0;
      this.currentAssembly = {};

      this.masterAssembly = assembly.assemblyFile;
      this.currentAssembly = assembly;
      var model_name = this.masterAssembly.split(".");
      model_name = model_name[0].replace(" ", "_") + "";
      this.loadAssembly(model_name);
      this.communicatorLoaded = false;

      // Parse the xml
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.open(
        "GET",
        "/demos/product-lifecycle-management/model-data/" +
          this.masterAssembly.replace(" ", "-") +
          ".xml"
      );
      xmlhttp.setRequestHeader("Content-Type", "text/xml");

      xmlhttp.onload = function () {
        if (xmlhttp.status == 200) {
          parser = new DOMParser();
          xmlDoc = parser.parseFromString(xmlhttp.responseText, "text/xml");

          structure = [];
          x = xmlDoc.getElementsByTagName("ProductOccurence");
          for (i = 0; i < x.length; i++) {
            file_name = "";
            thumb_file = "";
            _modelBrowserName = "";
            if (x[i].getAttribute("FilePath") != null) {
              file_name = x[i]
                .getAttribute("FilePath")
                .split("\\")
                .pop()
                .split("/")
                .pop();
              thumb_file =
                "/demos/product-lifecycle-management/images/" +
                vm.masterAssembly.replace(" ", "_") +
                "/" +
                file_name.replace(" ", "_") +
                ".png";
              _modelBrowserName = x[i].getAttribute("Name");
            }

            id = parseInt(x[i].getAttribute("Id"));
            var _fileSize = Math.round(
              parseInt(x[i].getAttribute("FileSize")) / 1024
            );
            var _partNumber = x[i].getAttribute("PartNumber");

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
          root = {};
          searchName = vm.masterAssembly;
          found = false;
          for (i = 0; i < structure.length && !found; i++) {
            if (structure[i].name == searchName) {
              root = structure[i];
            }
          }

          vm.completenodelist.push(root);

          getAllChildren(structure, root).forEach(function (node) {
            vm.completenodelist.push(node);
          });

          buildTree(structure, root);
        }
      };

      xmlhttp.send();
      this.projectView = false;
    },
  },
  mounted() {
    console.log("home mounted");
    // console.log(drillXml);
  },
};
</script>

<template>
  <div id="project_list">
    <table>
      <tr>
        <th>Project Number</th>
        <th>Project Name</th>
        <th>Start Date</th>
        <th>End Date</th>
        <th>Status</th>
        <th>% Complete</th>
      </tr>
      <tr @click="load()" v-for="assembly in assemblies" v-bind:key="assembly.projectNumber">
        <td>{{ assembly.projectNumber }}</td>
        <td>{{ assembly.name }}</td>
        <td>{{ assembly.startDate }}</td>
        <td>{{ assembly.endDate }}</td>
        <td>{{ assembly.status }}</td>
        <td>{{ assembly.percentComplete }}</td>
      </tr>
    </table>
    <br />
    <div class="buttons is-right">
      <a
        class="button is-info"
        @click="alert('This feature is not yet implemented')"
        >Create New...</a
      >
    </div>

    <br />

    <table>
      <tr>
        <th>Ticket</th>
        <th>Title</th>
        <th>Priority</th>
        <th>Assignee</th>
        <th>Status</th>
      </tr>
      <!--<tr v-for="(changeOrder, index) in activeEco(ecos)" @click="eco=ecos[index]; ecoVisible=true">-->
      <!-- <tr
        v-for="(changeOrder, index) in users[currentUser].tickets"
        @click="
          eco = users[currentUser].tickets[index];
          ecoVisible = true;
        "
      >
        <div>
          <td>{{ changeOrder.Ticket }}</td>
          <td>{{ changeOrder.Title }}</td>
          <td>{{ changeOrder.Priority }}</td>
          <td>{{ changeOrder.Assignee }}</td>
          <td>{{ changeOrder.Status }}</td>
        </div>
      </tr> -->
    </table>
    <br />
    <div class="buttons is-right">
      <a
        class="button is-info"
        @click="
          eco.Status = 'New';
          ecoVisible = true;
        "
        >Create New...</a
      >
    </div>
  </div>
</template>
