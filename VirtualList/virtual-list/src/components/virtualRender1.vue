<template>
  <!-- <div class="wrapper">
    虚拟列表:只渲染视口的区域,加空的盒子,撑开区域(滚动条) -->
  <div
    class="virtualList"
    ref="virtualListId"
    @scroll="handleScroll"
  >
    <!-- 空盒子:所有数据的高度 -->
    <div :style="{height:totalList.length*height+'px'}"></div>
    <!-- 渲染的内容 -->
    <div
      class="container"
      :style="{top:scrollTop+'px'}"
    >
      <div
        class='dataItem'
        v-for="(item,index) in needRenderList"
        :key="index"
      >{{item}}</div>
    </div>
  </div>
  <!-- </div> -->

</template>

<script>
export default {
  name: "virtualRender",
  data() {
    return {
      start: 0,
      size: 10,
      height: 40, //每个元素的高度
      totalList: [],
      scrollTop: 0,
    };
  },
  mounted() {
    for (let i = 0; i < 100000; i++) {
      this.totalList.push("这是第" + i + "条数据");
    }
    //显示区域整体高度
    this.$refs.virtualListId.style.height = this.size * this.height + "px";
  },
  computed: {
    needRenderList() {
      return this.totalList.slice(this.start, this.start + this.size);
    },
  },
  methods: {
    handleScroll() {
      this.scrollTop = this.$refs.virtualListId.scrollTop;
      this.start = this.scrollTop / this.height;
    },
  },
};
//空盒子撑开空间,滚动scroll的时候,进行scrollTop计算,得出渲染的start,对应计算属性得到对应的列表
</script>

<style scoped>
.virtualList {
  overflow: auto;
  position: relative;
  width: 200px;
}
.container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}
</style>
