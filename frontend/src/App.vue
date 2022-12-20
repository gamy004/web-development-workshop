<template>
  <div id="app">
    <nav-bar />

    <b-container fluid>
      <router-view />
    </b-container>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";

export default {
  name: "App",

  components: {
    NavBar,
  },
};
</script>

<style lang="scss">
@import "./assets/ui-fort/bamburgh.scss";
</style>
