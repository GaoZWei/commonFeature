<template>
  <!-- 空盒子撑开空间,滚动scroll的时候,进行scrollTop计算,得出渲染的start,对应计算属性得到对应的列表 -->
  <div
    class="outer"
    ref="renderListId"
    @scroll="handleScroll"
  >
    <div
      class="blank"
      :style="{height:totalList.length*height+'px'}"
    ></div>
    <div
      class="container"
      :style="{top:scrollTop+'px'}"
    >
      <div
        v-for="(item,index) in renderList"
        :key="index"
      >{{item}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "virtualRender",
  data() {
    return {
      start: 0,
      size: 20,
      height: 40,
      scrollTop: 0,
      totalList: [],
    };
  },
  computed: {
    renderList() {
      return this.totalList.slice(this.start, this.start + this.size);
    },
  },
  mounted() {
    for (let i = 0; i < 10000; i++) {
      this.totalList.push("这是第" + i + "条数据");
    }
    this.$refs.renderListId.style.height = this.size * this.height+'px';
  },
  methods: {
    handleScroll() {
      this.scrollTop = this.$refs.renderListId.scrollTop
      this.start=this.scrollTop/this.height
    },
  },
};
</script>

<style scoped>
.outer {
  position: relative;
  overflow: auto;
  width: 200px;
}
.container {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
}
</style>
