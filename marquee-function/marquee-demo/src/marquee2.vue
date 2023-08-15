<template>
  <div class="marquee-container">
    <div class="marquee-content" ref="marqueeContent">
      <div class="marquee-track" ref="marqueeTrack">
        <div class="marquee-text">{{ text }}</div>
        <div class="marquee-text">{{ text }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      text: 'Marquee Text Example1231313',
      animationDuration: 10 // 调整需要的滚动时间
    };
  },
  mounted() {
    this.startMarquee();
  },
  methods: {
    startMarquee() {
      const marqueeContent = this.$refs.marqueeContent;
      const marqueeTrack = this.$refs.marqueeTrack;
      const trackWidth = marqueeTrack.offsetWidth;
      const containerWidth = marqueeContent.offsetWidth;

      if (trackWidth <= containerWidth) {
        return; // 内容适合容器，不需要滚动
      }

      const distance = trackWidth - containerWidth;
      const duration = this.animationDuration * (distance / containerWidth);

      marqueeTrack.style.animation = `marquee ${duration}s linear infinite`;
    }
  }
};
</script>

<style scoped>
.marquee-container {
  width: 100%;
  overflow: hidden;
}

.marquee-content {
  width: 100%;
  position: relative;
  overflow: hidden;
}

.marquee-track {
  display: inline-block;
  white-space: nowrap;
  animation: marquee linear infinite;
}

.marquee-text {
  display: inline-block;
  margin-right: 20px;
}

@keyframes marquee {
  from {
    transform: translateX(100%);
  }
  to {
    transform: translateX(-100%);
  }
}
</style>
