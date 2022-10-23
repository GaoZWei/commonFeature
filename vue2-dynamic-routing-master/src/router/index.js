import Vue from "vue"
import VueRouter from "vue-router"
import Layout from "../layout"

Vue.use(VueRouter)

const routes = [
  { name: "login", path: "/login", meta: { title: "login" }, component: () => import("../views/login/index"), hidden: true },
//   { name: "/", path: "/", component: Layout, redirect: "/index", hidden: false, children: [
//       { name: "index", path: "/index", meta: { title: "index" }, component: () => import("../views/index/index") },
//   ]},
//   { name: "/form", path: "/form", component: Layout, redirect: "/form/index", hidden: false, children: [
//       { name: "/form/index", path: "/form/index", meta: { title: "form" }, component: () => import("../views/form/index") }
//   ]},
//   { name: "/example", path: "/example", component: Layout, redirect: "/example/tree", meta: { title: "example" }, hidden: false, children: [
// 	  { name: "/tree", path: "/example/tree", meta: { title: "tree" }, component: () => import("../views/tree/index") },
// 	  { name: "/copy", path: "/example/copy", meta: { title: "copy" }, component: () => import("../views/tree/copy") }
//   ] },
//   { name: "/table", path: "/table", component: Layout, redirect: "/table/index", hidden: false, children: [
// 	  { name: "/table/index", path: "/table/index", meta: { title: "table" }, component: () => import("../views/table/index") }
//   ] },
//   { name: "/admin", path: "/admin", component: Layout, redirect: "/admin/index", hidden: false, children: [
// 	{ name: "/admin/index", path: "/admin/index", meta: { title: "admin" }, component: () => import("../views/admin/index") }
// ] },
// { name: "/people", path: "/people", component: Layout, redirect: "/people/index", hidden: false, children: [
// 	{ name: "/people/index", path: "/people/index", meta: { title: "people" }, component: () => import("../views/people/index") }
// ] }
]

const router = new VueRouter({ routes })

export default router
// http://openapi.baidu.com/oauth/2.0/authorize?response_type=code&client_id=dAXQGopA0OkpQjyIeH34DZDp&redirect_uri=www.baidu.com&scope=basic&display=popup
// http://openapi.baidu.com/oauth/2.0/token?grant_type=authorization_code&code={CODE}&client_id=dAXQGopA0OkpQjyIeH34DZDp&client_secret={CLIENT_SECRET}&redirect_uri=oob