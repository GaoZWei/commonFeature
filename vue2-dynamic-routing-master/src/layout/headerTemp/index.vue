<template>
    <div class="header-temp-container">
        <div class="userInfo">
            <el-image :src="userInfo.avatar" class="eImage"></el-image>
            <el-dropdown @command="handleLogout">
                <div class="detail user-link">
                    <span>{{ userInfo.name }}</span>
                    <span>{{ userInfo.desc }}</span>
                    <i class="el-icon--right"></i>
                </div>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="logout">退出</el-dropdown-item>
                    </el-dropdown-menu>
                    </template>
            </el-dropdown>
        </div>
    </div>
</template>
<script>
import { Message } from "element-ui"
export default {
    name: "header-temp-container",
    data() {
        return {
            userInfo: JSON.parse(window.localStorage.getItem("userInfo"))
        }
    },
    methods: {
        // 退出登录
        handleLogout(key) {
            if(key == "logout") {
                window.localStorage.removeItem("userInfo")
                Message({ type: 'success', message: "退出登录", showClose: true, duration: 3000 })
                this.$router.replace({ path: "/login" })
                location.reload()  //刷新页面,清理菜单内容
            }
        }
    }
}
</script>
<style scoped>
.header-temp-container{border-bottom: 1px solid #ddd; width: 100%;height: 60px;}
.userInfo{display: flex;flex-direction: row;align-items: center;justify-content: flex-end;height: 100%;margin-right: 20px;}
.eImage{width: 40px;height: 40px;border-radius: 50%;margin-right: 10px;}
.detail{display: flex;flex-direction: column;align-items: flex-start;justify-content: space-around;}
</style>