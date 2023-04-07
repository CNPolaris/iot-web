<template>
  <div class="header">
    <!-- 折叠按钮 -->
    <div class="collapse-btn" @click="collapseChage">
      <i v-if="!sidebar.collapse" class="el-icon-s-fold" />
      <i v-else class="el-icon-s-unfold" />
    </div>
    <div class="logo">元理云IOT</div>
    <div class="project">
      <el-select v-model="curRegion" @change="handleSelectChange">
        <el-option v-for="item in serveList" :key="item.id" :label="item.name" :value="item.id" />
      </el-select>
      <div class="text">
        <a href="/#/project">我的项目</a>
      </div>
    </div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 消息中心 -->
        <!-- <div class="btn-bell">
                    <el-tooltip effect="dark" :content="message?`有${message}条未读消息`:`消息中心`" placement="bottom">
                        <router-link to="/tabs">
                            <i class="el-icon-bell"></i>
                        </router-link>
                    </el-tooltip>
                    <span class="btn-bell-badge" v-if="message"></span>
                </div> -->
        <!-- 用户头像 -->
        <div class="user-avator">
          <img :src="avatar" />
        </div>
        <!-- 用户名下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            <!-- {{username}} -->
            <i class="el-icon-caret-bottom" />
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <!-- <a href="https://github.com/CNPolaris/vue-manage-system" target="_blank">
                                <el-dropdown-item>项目仓库</el-dropdown-item>
                            </a>
                            <el-dropdown-item command="user">个人中心</el-dropdown-item> -->
              <el-dropdown-item divided command="loginOut">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { onMounted, ref } from "vue"
import { useSidebarStore } from "@/stores/sidebar"
import { useRouter } from "vue-router"
import avatar from "../assets/img/img.png"
import { getEmail, removeEmail, removeToKen, removeRole, setCurRegion } from "@/utils/cache/cookies"
import { getServeAddressList } from "@/api/serve"
import { ServeAddressItemResp } from "@/api/serve/types/serve"
import { ElMessage } from "element-plus"
export default {
  setup() {
    const username = getEmail()
    // const avatar = localStorage.getItem("ms_avatar");
    const message = 2

    const sidebar = useSidebarStore()
    // 服务器列表
    const serveList = ref<ServeAddressItemResp[]>([])
    const curRegion = ref("")
    const handleGetServe = () => {
      getServeAddressList().then((res) => {
        if (res.code === 200) {
          serveList.value = res.data.list
          curRegion.value = res.data.list[0].id as unknown as string
          setCurRegion(curRegion.value)
        } else {
          ElMessage.error(res.message)
        }
      })
    }
    handleGetServe()
    // 选择事件
    const handleSelectChange = () => {
      setCurRegion(curRegion.value)
      router.push("/project")
    }
    // 侧边栏折叠
    const collapseChage = () => {
      sidebar.handleCollapse()
    }
    onMounted(() => {
      if (document.body.clientWidth < 1500) {
        collapseChage()
      }
    })

    // 用户名下拉菜单选择事件
    const router = useRouter()
    const handleCommand = (command: string) => {
      if (command == "loginOut") {
        router.push("/login")
        removeEmail()
        removeRole()
        removeToKen()
      } else if (command == "user") {
        router.push("/user")
      }
    }

    const hanlderMyProjects = () => {
      router.push("/project")
    }

    return {
      sidebar,
      username,
      avatar,
      message,
      curRegion,
      serveList,
      handleSelectChange,
      collapseChage,
      handleCommand,
      hanlderMyProjects
    }
  }
}
</script>
<style scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 70px;
  font-size: 22px;
  color: #fff;
}
.collapse-btn {
  float: left;
  padding: 0 21px;
  cursor: pointer;
  line-height: 70px;
}
.header .logo {
  float: left;
  width: 110px;
  line-height: 70px;
}
.header .project {
  float: left;
  margin: 0 10px 0 20px;
  font-size: 14px;
  line-height: 70px;
}
.header .text {
  display: inline-block;
  margin: 0 15px 0 0;
}
.header a {
  color: rgb(243, 240, 240);
  text-decoration: none;
}
.header a:hover {
  color: #6690cf;
  text-decoration: none;
}
.header a:active {
  color: #6690cf;
  text-decoration: none;
}

.header-right {
  float: right;
  padding-right: 50px;
}
.header-user-con {
  display: flex;
  height: 70px;
  align-items: center;
}
.btn-fullscreen {
  transform: rotate(45deg);
  margin-right: 5px;
  font-size: 24px;
}
.btn-bell,
.btn-fullscreen {
  position: relative;
  width: 30px;
  height: 30px;
  text-align: center;
  border-radius: 15px;
  cursor: pointer;
}
.btn-bell-badge {
  position: absolute;
  right: 0;
  top: -2px;
  width: 8px;
  height: 8px;
  border-radius: 4px;
  background: #f56c6c;
  color: #fff;
}
.btn-bell .el-icon-bell {
  color: #fff;
}
.user-name {
  margin-left: 10px;
}
.user-avator {
  margin-left: 20px;
}
.user-avator img {
  display: block;
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
