<template>
  <div id="app">
    <!-- <blockList /> -->
    <virtualRender />
  </div>
</template>

<script>
import virtualRender from "./components/virtualRender.vue";
// import blockList from "./components/blockList.vue";

export default {
  name: "App",
  components: {
    // blockList,
    virtualRender,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
