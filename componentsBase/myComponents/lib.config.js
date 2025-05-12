import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// 打包组件库配置
export default defineConfig({
  build: {
    lib: {
      entry: "./package/myui/index.js",
      name: "myui",
    },
    outDir: "lib",
  },
  plugins: [vue()],
});
