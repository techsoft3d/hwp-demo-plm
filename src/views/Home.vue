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
    load(projectNumber) {
      console.log(projectNumber);
      this.$router.push(`/project/${projectNumber}`);
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
      <tr 
        v-for="assembly in assemblies" v-bind:key="assembly.projectNumber"
        @click="load(assembly.projectNumber)"
        >
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
      <a class="button is-info">Create New...</a>
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
      <a class="button is-info"> Create New... </a>
    </div>
  </div>
</template>

<style>
tr {
  cursor: pointer;
}
</style>
