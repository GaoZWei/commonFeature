import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import myui from "myui";

// 全局组件库
createApp(App).use(myui).mount("#app");
