<template>
  <!-- 可以传数组的文字滚动,好使!!! -->
  <div class="scrolling-text">
    <div class="text-container" :style="{ animationDuration: duration }">
      <span v-for="(text, index) in texts" :key="index">{{ text }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "ScrollingText",
  props: {
    texts: {
      type: Array,
      required: true,
    },
    speed: {
      type: Number,
      default: 20,
    },
  },
  computed: {
    duration() {
      return `${this.texts.length * this.speed}s`;
    },
  },
};
</script>

<style scoped>
.scrolling-text {
  overflow: hidden;
  width: 30%;
  background-color: tomato;
}

.text-container {
  display: inline-block;
  white-space: nowrap;
  animation: scroll linear infinite;
}

@keyframes scroll {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
}
</style>
