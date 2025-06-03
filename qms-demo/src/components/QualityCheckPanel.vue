<template>
  <div class="quality-check-panel">
    <div
      class="main-panel"
      v-if="currentImage"
    >
      <div class="image-wrapper">
        <div class="left-sidebar">
          <div
            class="vertical-btn"
            v-for="text in ['卷帘', '抽样', '问题点位', '质检报告']"
            :key="text"
          >
            {{text}}
          </div>
        </div>
        <div class="image-viewer">
          <!-- 影像选择 -->
          <div class="image-viewer-toolbar">
            <button>融合后影像</button>
            <button>全色</button>
            <button>多光谱</button>
          </div>
          <hr />
          <!-- 影像区域 -->
          <div class="image-viewer-box">
            <img
              :src="currentImage.imageUrl"
              class="main-image"
              alt="影像图"
            />
          </div>
        </div>
      </div>
      <!-- 影像信息区 -->
      <div class="image-message">
        <div class="image-info">
          <div class="card-header">影像信息</div>
          <el-descriptions
            :column="2"
            size="small"
            border
          >
            <el-descriptions-item label="影像名称">{{ currentImage.name }}</el-descriptions-item>
            <el-descriptions-item label="时间">{{ currentImage.time }}</el-descriptions-item>
            <el-descriptions-item label="分辨率">{{ currentImage.resolution }}</el-descriptions-item>
            <el-descriptions-item label="云量">{{ currentImage.cloud }}</el-descriptions-item>
          </el-descriptions>
        </div>

        <div class="check-form">
          <div class="card-header">图面质检</div>
          <el-form
            :model="form"
            label-width="140px"
          >
            <el-form-item label="是否存在质量问题">
              <el-radio-group v-model="form.hasProblem">
                <el-radio :value="true">是</el-radio>
                <el-radio :value="false">否</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="问题备注">
              <el-input
                type="textarea"
                v-model="form.remark"
              />
            </el-form-item>
          </el-form>
          <el-button
            type="default"
            @click="handlePrev"
            v-if="showPrevButton"
          >上一景</el-button>
          <el-button
            type="primary"
            @click="handleNext"
            v-if="showNextButton"
          >下一景</el-button>
        </div>
      </div>

    </div>

    <div
      v-else
      class="no-image"
    >请选择影像进行查看</div>
    <div class="blank"></div>
    <div class="sidebar">
      <div class="submit-quality-result">
        <div class="quality-progress">
          质检进度:100/200
        </div>
        <div class="pass-num">合格 185 景</div>
        <div class="submit-area"> <el-button type="primary">提交</el-button> </div>
      </div>
      <ImageList
        title="已质检影像"
        :list="pagedChecked"
        :selectedId="selectedId"
        :isChecked="true"
        @select="handleSelect"
      />
      <el-pagination
        layout="prev, pager, next"
        :total="checkedList.length"
        :page-size="pageSize"
        v-model:current-page="checkedPage"
        size="small"
      />
      <ImageList
        title="未质检影像"
        :list="pagedUnchecked"
        :selectedId="selectedId"
        :isChecked="false"
        @select="handleSelect"
      />
      <el-pagination
        layout="prev, pager, next"
        :total="uncheckedList.length"
        :page-size="pageSize"
        v-model:current-page="uncheckedPage"
        size="small"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, nextTick } from "vue";

import ImageList from "@/components/ImageList.vue";
import {
  getUncheckedList,
  getImageDetail,
  saveImageCheck,
} from "./api/imageCheck";

const pageSize = 5;
const uncheckedList = ref([]);
const checkedList = ref([]);
const selectedId = ref(null);
const currentImage = ref(null);
const form = ref({ hasProblem: false, remark: "" });
const uncheckedPage = ref(1);
const checkedPage = ref(1);

const pagedUnchecked = computed(() => {
  const start = (uncheckedPage.value - 1) * pageSize;
  return uncheckedList.value.slice(start, start + pageSize);
});
const pagedChecked = computed(() => {
  const start = (checkedPage.value - 1) * pageSize;
  return checkedList.value.slice(start, start + pageSize);
});

const handleSelect = async (item) => {
  selectedId.value = item.id;
  try {
    const detail = await getImageDetail(item.id);
    currentImage.value = detail || { ...mockImageDetail, id: item.id };
  } catch (e) {
    console.warn("getImageDetail 接口异常，使用模拟数据");
    currentImage.value = { ...mockImageDetail, id: item.id };
  }
  form.value = {
    hasProblem: currentImage.value.hasProblem ?? false,
    remark: currentImage.value.remark ?? "",
  };
};

// 下一景
const handleNext = async () => {
  if (!selectedId.value) return;

  try {
    await saveImageCheck(selectedId.value, form.value);
  } catch (e) {
    console.warn("saveImageCheck 保存失败，跳过处理");
  }

  // 判断当前在哪个列表中
  const idxUn = uncheckedList.value.findIndex((i) => i.id === selectedId.value);
  const idxChk = checkedList.value.findIndex((i) => i.id === selectedId.value);

  if (idxUn !== -1) {
    // 当前在未质检列表
    const [moved] = uncheckedList.value.splice(idxUn, 1);
    checkedList.value.push(moved);

    if (uncheckedList.value.length > 0) {
      const nextIdx = Math.min(idxUn, uncheckedList.value.length - 1);
      const next = uncheckedList.value[nextIdx];
      uncheckedPage.value = Math.floor(nextIdx / pageSize) + 1;
      await nextTick(); // 确保分页变动渲染完成
      await handleSelect(next);
    } else {
      selectedId.value = null;
      currentImage.value = null;
    }
  } else if (idxChk !== -1) {
    // 当前在已质检列表
    const next = checkedList.value[idxChk + 1] || uncheckedList.value[0];
    if (next) {
      const isInUnchecked = uncheckedList.value.some((i) => i.id === next.id);
      const list = isInUnchecked ? uncheckedList.value : checkedList.value; // 这里加 .value
      const idx = list.findIndex((i) => i.id === next.id);
      const pageNum = Math.floor(idx / pageSize) + 1;

      selectedId.value = next.id;

      if (isInUnchecked) {
        uncheckedPage.value = pageNum;
      } else {
        if (checkedPage.value !== pageNum) {
          checkedPage.value = pageNum;
          await nextTick();
        }
      }

      await handleSelect(next);
    }
  }
};

// 上一景
const handlePrev = async () => {
  if (!selectedId.value) return;

  // 判断当前在哪个列表中
  const idxUn = uncheckedList.value.findIndex((i) => i.id === selectedId.value);
  const idxChk = checkedList.value.findIndex((i) => i.id === selectedId.value);

  if (idxUn !== -1) {
    // 当前在未质检列表
    if (idxUn > 0) {
      const prev = uncheckedList.value[idxUn - 1];
      uncheckedPage.value = Math.floor((idxUn - 1) / pageSize) + 1;
      await handleSelect(prev);
    }
  } else if (idxChk !== -1) {
    // 当前在已质检列表
    if (idxChk > 0) {
      const prev = checkedList.value[idxChk - 1];
      checkedPage.value = Math.floor((idxChk - 1) / pageSize) + 1;
      await handleSelect(prev);
    }
  }
};
// 显示下一景按钮
const showNextButton = computed(() => {
  return (
    selectedId.value &&
    (uncheckedList.value.length > 0 || checkedList.value.length > 1)
  );
});
// 显示下一景按钮
const showPrevButton = computed(() => {
  return (
    selectedId.value &&
    (uncheckedList.value.length > 1 || checkedList.value.length > 1)
  );
});

const mockImageList = Array.from({ length: 20 }, (_, i) => ({
  id: `${i + 1}`,
  name: `Mock_Image_${i + 1}`,
  time: `2025-05-25 10:${String(i).padStart(2, "0")}`,
}));

const mockImageDetail = {
  id: "1",
  name: "Mock_Detail_Image",
  time: "2025-05-25 16:00:53",
  resolution: "8m",
  cloud: "5%",
  imageUrl: "https://placehold.co/800x400?text=主影像",
};

onMounted(async () => {
  try {
    const list = await getUncheckedList();
    uncheckedList.value = list.length ? list : mockImageList;
  } catch (e) {
    uncheckedList.value = mockImageList;
  }
  // 默认选中未质检第一个
  if (uncheckedList.value.length > 0) {
    handleSelect(uncheckedList.value[0]);
  }
});
</script>


<style lang="less" scoped>
.quality-check-panel {
  display: flex;
  width: 100%;
  height: 100%;
  padding: 16px;
  box-sizing: border-box;

  .main-panel {
    flex: 4;
    // padding-left: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    border: 1px solid #999;

    .image-wrapper {
      display: flex;

      .left-sidebar {
        width: 100px;
        padding: 16px 0;
        background-color: #fff;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 12px;
        border-right: 1px solid #ccc;

        .vertical-btn {
          width: 40px;
          height: 100px;
          background-color: #409eff;
          color: #fff;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          cursor: pointer;
          user-select: none;

          writing-mode: vertical-rl; /* 文字竖直，从右到左排列 */
          /* 如果想从左到右排列用 vertical-lr */
          // text-orientation: upright; /* 文字保持直立，不旋转 */
          letter-spacing: 5px;
          font-weight: bold;
        }
      }
      .image-viewer {
        flex: 1;
        border: 1px solid #ccc;
        padding: 12px;

        .image-viewer-toolbar {
          display: inline-flex;
          border: 1px solid #ccc;
          margin-bottom: 12px;

          button {
            padding: 8px 16px;
            border: none;
            border-right: 1px solid #ccc;
            background-color: #fff;
            cursor: pointer;

            &:last-child {
              border-right: none;
            }

            &:hover {
              background-color: #e0e0e0;
            }
          }
        }

        .image-viewer-box {
          img.main-image {
            width: 100%;
            max-height: 400px;
            object-fit: contain;
            border: 1px solid #ccc;
          }
        }
      }
    }

    .image-message {
      display: flex;

      .image-info {
        flex: 1;
        padding: 10px;
        border: 1px solid #ccc;
        border-bottom: none;
      }

      .check-form {
        flex: 1;
        padding: 10px;
        border: 1px solid #ccc;
        border-left: none;

        .el-form-item {
          margin-bottom: 16px;
        }

        .el-button {
          margin-right: 8px;
        }
      }
    }
  }

  .no-image {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #999;
    font-size: 16px;
  }

  .blank {
    width: 20px;
  }

  .sidebar {
    flex: 2;
    display: flex;
    flex-direction: column;
    gap: 8px;
    .submit-quality-result {
      display: flex;
      .quality-progress {
        flex: 1;
      }
      .pass-num {
        flex: 1;
      }
      .submit-quality-result {
        flex: 1;
      }
    }
  }
  .card-header {
    font-weight: bold;
    margin-bottom: 8px;
  }
}
</style>
