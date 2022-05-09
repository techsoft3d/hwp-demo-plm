<script>
import drillXml from "../model-data/__drill.asm.xml?raw";
import { assemblies, getAssembly, getUser } from "../javascript/data-utilities.js";

export default {
  computed: {
    assemblies() {
      return assemblies;
    }
  },
  methods: {
    load(projectNumber) {
      console.log(projectNumber);
      this.$router.push(`/project/${projectNumber}`);
    },
  },
  mounted() {
    console.log("home mounted");
    console.log(getAssembly("PR00003"));
    console.log(getUser(2));
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
