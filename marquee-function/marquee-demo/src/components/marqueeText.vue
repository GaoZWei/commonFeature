<template>
  <!-- 文字滚动效果的实现 -->
  <div class="marquee" :style="{ height: `${height}px`, width: `${width}px` }">
    <div
      class="marquee-wrapper"
      :style="{ height: `${height}px`, margin: `0 ${width / 10}px` }"
    >
      <div
        class="marquee-text"
        :style="{
          animationDuration: `${duration}s`,
          fontSize: `${fontSize}px`,
        }"
      >
        {{ text }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FeMarquee",
  props: {
    width: {
      type: Number,
      default: 200,
    },
    height: {
      type: Number,
      default: 50,
    },
    text: {
      type: String,
      default: "文字滚动的内容",
    },
    fontSize: {
      type: Number,
      default: 25,
    },
    duration: {
      type: Number,
      default: 20,
    },
  },
  // computed: {
  //   duration() {
  //     return `${this.duration}s`;
  //   },
  // },
  created() {
    let style = document.createElement("style");
    style.setAttribute("type", "text/css");
    document.head.appendChild(style);
    let sheet = style.sheet;
    sheet.insertRule(
      `@keyframes marquee{
  			from {
			     transform: translateX(${this.width}px)
  			}
 			 to {
 		       transform: translateX(-100%);
			}`,
      0
    );
  },
};
</script>

<style scoped>
.marquee {
  background-image: url("../assets/lunbo-bg.png");
  background-size: 100% 100%;
}
.marquee-wrapper {
  display: flex;
  align-items: center;
  overflow: hidden;
}
.marquee-text {
  color: yellow;
  white-space: nowrap;
  animation: marquee linear infinite;
}

/* @keyframes scroll {
  0% {
    transform: translateX(100%);
  }
  100% {
    transform: translateX(-100%);
  }
} */
</style>
