<template>
  <div class="image-list">
    <div class="list-title">{{ title }}</div>

    <div class="list-container">
      <div
        v-for="item in list"
        :key="item.id"
        :class="['list-item', { selected: selectedId === item.id }]"
        @click="handleClick(item)"
      >
        <div class="info">
          <div class="name">{{ item.name }}</div>
          <div class="time">{{ item.time }}</div>
        </div>
        <!-- 新增状态 -->
        <div
          class="status"
          :class="item.hasProblem ? 'failed' : 'passed'"
          v-if="isChecked"
        >
          {{ item.hasProblem ? '不合格' : '合格' }}
        </div>
        <el-button
          size="small"
          type="primary"
          @click.stop="handleClick(item)"
        >跳转</el-button>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  title: String,
  list: Array,
  selectedId: String,
  isChecked: Boolean,
});

const emit = defineEmits(["select"]);

const handleClick = (item) => {
  emit("select", item);
};
</script>

<style scoped lang="less">
.image-list {
  display: flex;
  flex-direction: column;
  height: 100%;

  .list-title {
    display: flex;
    justify-content: center;
    background: rgb(211, 211, 211);
    font-weight: bold;
  }

  .list-container {
    flex: 1;
    overflow-y: auto;

    .list-item {
      display: flex;
      justify-content: space-between;
      padding: 8px;
      border-bottom: 1px solid #eee;
      cursor: pointer;

      &.selected {
        background-color: #e6f7ff;
      }

      &:hover {
        background-color: #f5f7fa;
      }

      .info {
        .sequenceId {
        }
        .name {
          font-weight: 500;
        }

        .time {
          font-size: 12px;
          color: #999;
        }
      }

      .status {
        width: 60px;
        text-align: right;
        font-weight: bold;
        &.passed {
          color: #2ecc71;
        }
        &.failed {
          color: red;
        }
      }
    }
  }
}
</style> 