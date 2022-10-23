import router from "./index"
import Layout from "../layout/index"
import NProgress from 'nprogress' // progress bar

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const filterRoutes = ["/login"]   // 需要过滤掉的路由
router.beforeEach((to, from, next) => {
    // start progress bar
    NProgress.start()

    // 获取路由 meta 中的title，并设置给页面标题
    document.title = "动态路由(" + to.meta.title + ")"
    
    // 判断路由指向是否在需要过滤的路由地址数组里
    // 如果在，则直接跳进页面，无需判断
    if(filterRoutes.indexOf(to.path) !== -1) {
        next()
        return false
    }
    if(router.options.routes.length == 1) {
        // 获取token和原始路由数组
        const userInfo = JSON.parse(window.localStorage.getItem('userInfo')) ?? ""
        // console.log(userInfo) //userInfo存的是用户和路由的信息
        // 当token和原始路由都存在的时候
        if(userInfo.token && userInfo.routes) onFilterRoutes(to, next, userInfo.routes)  // 执行路由过滤和跳转
        else next({ path: "/login", replace: true })
    } else next()
})

router.afterEach(() => {
    // finish progress bar
    NProgress.done()
})

// 路由拼接
function loadView(view) {
    return () => import(`@/views/${ view }`)
}

// 路由过滤和跳转
async function onFilterRoutes(to, next, e) {
    const routes = await filterASyncRoutes(e)    // 路由过滤
    routes.sort((a, b) => a['id'] - b['id'])
    routes.forEach(item => {
        router.options.routes.push(item)
        router.addRoute(item)
    })
    // console.log(routes)

    next({ ...to, replace: true })
}

// 路由过滤   遍历路由 转换为组件对象和路径
function filterASyncRoutes(data) {
    const routes = data.filter(item => {
        if(item["component"] === "Layout") item.component = Layout
        else item["component"] = loadView(item["component"])
        // 路由递归，转换组件对象和路径
        if(item["children"] && item["children"].length > 0) item["children"] = filterASyncRoutes(item.children)
        return true
    })
    return routes
}