 <template>
  <div class="image-list">
    <div class="list-title">{{ title }}</div>

    <el-table
      ref="tableRef"
      :data="list"
      height="100%"
      highlight-current-row
      :row-class-name="getRowClassName"
      @row-click="handleClick"
    >
      <el-table-column
        prop="id"
        label="序号"
      />
      <el-table-column
        prop="name"
        label="名称"
      />
      <el-table-column
        prop="time"
        label="时间"
      />
      <el-table-column
        v-if="isChecked"
        prop="hasProblem"
        label="是否合格"
        :formatter="formatStatus"
      />
      <el-table-column
        label="操作"
        width="150"
      >
        <template #default="{ row }">
          <el-button
            size="small"
            type="success"
            @click.stop="previewImage(row)"
          >
            预览
          </el-button>
          <el-button
            size="small"
            type="primary"
            @click.stop="handleClick(row)"
          >跳转</el-button>

        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script setup>
import { ElMessage } from "element-plus";
import { watch, ref } from "vue";
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

const getRowClassName = ({ row }) => {
  return row.id === props.selectedId ? "selected-row" : "";
};

const formatStatus = (row) => {
  return row.hasProblem ? "不合格" : "合格";
};

const previewImage = (item) => {
  if (item.imageUrl) {
    window.open(item.imageUrl, "_blank");
  } else {
    ElMessage.warning("该项没有可预览的图片");
  }
};

const tableRef = ref(null);

watch(
  () => props.selectedId,
  (newVal) => {
    if (tableRef.value) {
      const targetRow = props.list.find((item) => item.id === newVal);
      tableRef.value.setCurrentRow(targetRow || null); // ✅ 设置高亮行
    }
  },
  { immediate: true }
);
</script>
<style scoped lang="less">
.image-list {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  .list-title {
    text-align: center;
    font-weight: bold;
    background: rgb(211, 211, 211);
    padding: 8px;
  }

  :deep(.selected-row) {
    background-color: #e6f7ff !important;
  }
}
</style> 