import Vue from "vue"
import App from "./App.vue"
import router from "./router"
import store from "./store"
import ElementUI from "element-ui"
import 'element-ui/lib/theme-chalk/index.css'
import "./router/router-config"  // 路由守卫，做动态路由的地方

Vue.config.productionTip = false
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app")