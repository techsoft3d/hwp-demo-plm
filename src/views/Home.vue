<script>
import { assemblies, tickets, getUser } from "../javascript/data-utilities.js";

export default {
  data() {
    return {
      tickets: tickets,
      getUser: getUser,
      assemblies: assemblies,
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
        v-for="assembly in assemblies"
        v-bind:key="assembly.projectNumber"
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
      <tr v-for="ticket in tickets" v-bind:key="ticket.id">
          <td>{{ ticket.id }}</td>
          <td>{{ ticket.title }}</td>
          <td>{{ ticket.priority }}</td>
          <td>{{ getUser(ticket.assigneeId).name }}</td>
          <td>{{ ticket.status }}</td>
      </tr>
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
