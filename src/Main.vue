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

.container {
  overflow: visible;
}
</style>
