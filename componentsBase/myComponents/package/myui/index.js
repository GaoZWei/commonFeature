import component1 from "./component1/component1.vue";
import test2 from "./test2/test2.vue";

//按需引入
export { component1, test2 };

let obj = { component1, test2 };
//全局引入支持.use方法,use执行install方法
export default {
  install(vue) {
    Object.keys(obj).forEach((key) => {
      vue.component(key, obj[key]);
    });
  },
};
