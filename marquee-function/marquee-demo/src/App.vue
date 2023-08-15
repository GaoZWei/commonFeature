<template>
  <!-- <Marquee1 :text="text" />
  <Marquee2 :text="text" /> -->
  <marqueeArr :texts="[text]" :speed="10" />
  <marqueeSetTimeout />
  <marqueeText :text="text" :duration="15" :width="300" :height="50" />
  <notice />
</template>

<script>
// import Marquee1 from "./marquee1.vue";
// import Marquee2 from "./marquee2.vue";
import marqueeArr from "./components/marqueeArr.vue";
import marqueeSetTimeout from "./components/marqueeSetTimeout.vue";
import marqueeText from "./components/marqueeText.vue";
import notice from "./components/notice.vue";

export default {
  components: {
    // Marquee1,
    // Marquee2,
    marqueeArr,
    marqueeSetTimeout,
    marqueeText,
    notice,
  },
  data() {
    return {
      text: "海外徒闻更九州，他生未卜此生休。 空闻虎旅传宵柝，无复鸡人报晓筹。 此日六军同驻马，当时七夕笑牵牛。 如何四纪为天子，不及卢家有莫愁。",
    };
  },
};
</script>
