<template>
  <div class="wrapper">
    <p>分片渲染:每次渲染一部分</p>
    <div
      v-for="(item,index) in dealList"
      :key="index"
    >{{item}}</div>
  </div>
</template>

<script>
export default {
  name: "virtualList",
  data() {
    return {
      start: 0,
      size: 20,
      originList: [],
      dealList: [],
    };
  },
  mounted() {
    for (let i = 0; i < 10000; i++) {
      this.originList.push("这是第" + i + "条数据");
    }
    this.load();
  },
  methods: {
    load() {
      var tmpList = this.originList.slice(this.start, this.start + this.size);
      if (tmpList && tmpList.length > 0) {
        setTimeout(() => {
          this.dealList=[...this.dealList,...tmpList]
        //   this.dealList.push(tmpList)
          this.start = this.start + this.size;
          this.load();
        }, 100);
      }
    },
  },
};
</script>

<style>
</style>