<script setup>
import HelloWorld from "./components/HelloWorld.vue";
import { component1 } from "myui"; //按需引入
</script>

<template>
  <div>组件库:</div>
  <hr />
  <!-- <HelloWorld msg="Vite + Vue" /> -->
  按需引入:
  <component1 />
  <hr />
  全局引入:
  <test2 />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
