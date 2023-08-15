<template>
  <div class="scroll-container" ref="scrollContainer">
    <div class="scroll-text" ref="scrollText1">{{ text }}</div>
    <!-- <div class="scroll-text" ref="scrollText2">{{ text }}</div> -->
  </div>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      required: true,
    },
  },
  mounted() {
    const container = this.$refs.scrollContainer;
    const text1 = this.$refs.scrollText1;
    const text2 = this.$refs.scrollText2;

    const containerWidth = container.offsetWidth;
    console.log("containerWidth--", containerWidth);
    const textWidth = text1.offsetWidth;
    console.log("textWidth--", textWidth);

    // if (textWidth > containerWidth) {
    const animationDuration = textWidth / 50; // adjust the speed here
    // const delayDuration = animationDuration / 2; // adjust the delay here

    text1.style.animation = `scroll-text ${animationDuration}s linear 0s infinite`;
    // text2.style.animation = `scroll-text ${animationDuration}s linear ${delayDuration}s infinite`;
    // }
  },
};
</script>

<style scoped>
.scroll-container {
  position: absolute;
  left: 50%;
  top: 50%;
  background-color: yellow;
  width: 20%;
  overflow: hidden;
  display: flex;
}

.scroll-text {
  display: inline-block;
  white-space: nowrap;
  animation-name: none;
}

@keyframes scroll-text {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(-100%);
  }
}
</style>
