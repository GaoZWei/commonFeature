<template>
  <!-- 组件封装&使用 -->
  <div>
    <MyButton
      label="提交"
      type="primary"
      size="large"
      :disabled="isSubmitting"
      @click="handleSubmit"
    />
    <MyButton
      type="success"
      @click="showSuccess"
    >成功按钮</MyButton>
    <MyButton
      type="danger"
      size="small"
    >小的危险按钮</MyButton>
  </div>
</template>

<script>
import MyButton from "./components/MyButton.vue";

export default {
  components: { MyButton },
  data() {
    return {
      isSubmitting: false,
    };
  },
  methods: {
    handleSubmit() {
      this.isSubmitting = true;
      setTimeout(() => {
        this.isSubmitting = false;
        alert("提交成功");
      }, 2000);
    },
    showSuccess() {
      alert("成功按钮点击");
    },
  },
};
</script>
