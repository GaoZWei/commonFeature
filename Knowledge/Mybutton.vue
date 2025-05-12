<template>
  <button
    :class="['my-button', type, size]"
    :disabled="disabled"
    @click="handleClick"
  >
    <slot>{{ label }}</slot>
  </button>
</template>

<script>
export default {
  name: "MyButton",
  props: {
    label: {
      type: String,
      default: "按钮",
    },
    type: {
      type: String,
      default: "primary", // 按钮类型：primary, success, danger
      validator: (value) => ["primary", "success", "danger"].includes(value),
    },
    size: {
      type: String,
      default: "medium", // 按钮大小：small, medium, large
      validator: (value) => ["small", "medium", "large"].includes(value),
    },
    disabled: {
      type: Boolean,
      default: false, // 是否禁用
    },
  },
  emits: ["click"], // 声明该组件会触发哪些事件
  methods: {
    handleClick(event) {
      if (!this.disabled) {
        this.$emit("click", event); // 触发父组件绑定的事件  触发 `click` 事件，传递原生事件对象
      }
    },
  },
};
</script>

<style scoped>
.my-button {
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
  font-size: 14px;
}

.my-button.primary {
  background-color: #409eff;
  color: #fff;
}

.my-button.success {
  background-color: #67c23a;
  color: #fff;
}

.my-button.danger {
  background-color: #f56c6c;
  color: #fff;
}

.my-button.small {
  padding: 4px 8px;
  font-size: 12px;
}

.my-button.large {
  padding: 12px 24px;
  font-size: 16px;
}

.my-button:disabled {
  background-color: #dcdcdc;
  cursor: not-allowed;
}
</style>
