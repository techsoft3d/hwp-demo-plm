<script>
export default {
  data() {
    return {
      users: [
        {
          id: 0,
          name: "Jonathan Girroir",
          email: "jonathan@plm3d.com",
          title: "Engineering Manager",
          thumb: "jonathan.png",
          tickets: [],
        },
        {
          id: 1,
          name: "Dave Opsahl",
          email: "dave@plm3d.com",
          title: "Design Engineer",
          thumb: "dave.png",
          tickets: [],
        },
        {
          id: 2,
          name: "Gavin Bridgeman",
          email: "gavin@plm3d.com",
          title: "Design Engineer",
          thumb: "gavin.png",
          tickets: [],
        },
      ],
    };
  },
  provide() {
    return {
      users: this.users,
    };
  },
  methods: {
    getThumb(thumbName) {
      const imgUrl = new URL(`./images/${thumbName}?url`, import.meta.url).href;
      return imgUrl;
    },
  },
};
</script>

<template>
  <div class="container">
    <router-view name="TopBar"> </router-view>

    <router-view></router-view>
  </div>
</template>

<style>
@import "./stylesheets/style.css";
@import "./stylesheets/bulma.css";
@import url("https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");
</style>
