<template>
  <div class="exampleContent">
    <div class="marquee">
      <div
        class="marquee-wrapper"
        ref="wrapper"
        :style="{ height: `${height}px`, width: `${width}px` }"
      >
        <div
          class="marquee-text"
          ref="text"
          :style="{
            left: textLeft,
            transition: textTransition,
            fontSize: `${fontSize}px`,
            lineHeight: `${height}px`,
          }"
        >
          {{ text }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "FeMarquee",
  props: {
    text: {
      type: String,
      default:
        "海外徒闻更九州，他生未卜此生休。 空闻虎旅传宵柝，无复鸡人报晓筹。 此日六军同驻马，当时七夕笑牵牛。 如何四纪为天子，不及卢家有莫愁。",
    },
    width: {
      type: Number,
      default: 200,
    },
    height: {
      type: Number,
      default: 50,
    },
    fontSize: {
      type: Number,
      default: 25,
    },
  },
  data() {
    return {
      textLeft: "",
      textTransition: "",
    };
  },
  methods: {
    // 跑马灯
    marquee() {
      const _this = this;
      const wrapperWidth = this.$refs.wrapper.clientWidth; // 容器的总宽度
      const textWidth = this.$refs.text.clientWidth; // 文本的总宽度
      const transTime = textWidth / 50; // 根据文本宽度设置过渡时间
      const againTime = transTime * 1000 + 1000; // 重新开始滚动时间计算(动态)
      this.textLeft = wrapperWidth + "px"; // 开始滚动前设定文本在容器最右侧以外

      setTimeout(() => {
        textRoll();
      }, 0);

      function textRoll() {
        _this.textTransition = "left " + transTime + "s linear"; // 滚动前绑定过渡属性
        _this.textLeft = -textWidth + "px"; // 向容器最左移动
        setTimeout(() => {
          // 还原文本位置
          _this.textTransition = "none"; // 还原前需清除过渡
          _this.textLeft = wrapperWidth + "px";
          setTimeout(() => {
            textRoll();
          }, 0);
        }, againTime);
      }
    },
  },
  mounted() {
    this.marquee();
  },
};
</script>

<style>
.exampleContent {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.marquee {
  display: flex;
  background-image: url("./assets/lunbo-bg.png");
  background-size: 100% 100%;
  align-items: center;
  /* padding: 0 50px; */
}

.marquee-wrapper {
  position: relative;
  flex: 1;
  margin: 0 50px;
  overflow: hidden;
}

.marquee-text {
  position: absolute;
  color: yellow;
  white-space: nowrap;
}
</style>
