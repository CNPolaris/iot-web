<template>
  <div class="header">
    <div class="logo">元理云IOT</div>
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
            <!-- {{email}} -->
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

  <div>
    <el-row>
      <el-col :span="1" />
      <el-col :span="20">
        <div class="p-header" style="margin-top: 10px">
          <h3 class="p-title">我创建的项目</h3>
          <div class="p-actions">
            <el-button type="primary" @click="dialogVisible = true">创建项目</el-button>
          </div>
        </div>
        <el-row :gutter="20" style="margin-top: 20px">
          <el-col :span="24">
            <el-row :gutter="30" class="mgb20">
              <el-col :span="6" v-for="item in tableData" :key="item.id" style="padding-top: 10px">
                <el-card
                  shadow="hover"
                  :body-style="{ padding: '0px' }"
                  @click="handleChoiceProject(item.id, item.projectKey)"
                >
                  <div class="grid-content grid-con-2">
                    <!-- <i class="grid-con-icon"></i> -->
                    <div class="grid-cont-right">
                      <div>{{ item.name }}</div>
                      <div class="ptext">
                        网关：{{ item.gatewayCount }}
                        <span class="spilt">|</span>
                        成员：{{ item.userCount }}
                      </div>
                      <div>创建时间：{{ item.createTime }}</div>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="1" />
    </el-row>
  </div>
  <el-dialog v-model="dialogVisible" title="创建项目">
    <el-form :model="createProjectForm" :rules="rules">
      <el-form-item prop="name" label="项目名称">
        <el-input v-model="createProjectForm.name" autocomplete="off" />
      </el-form-item>
      <el-form-item prop="describe" label="项目描述">
        <el-input v-model="createProjectForm.describes" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleCreateProject">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
import avatar from "@/assets/img/img.png"
import { ElMessage } from "element-plus"
import { getEmail, removeEmail, removeToKen, removeRole } from "@/utils/cache/cookies"
import { setNowProject, setNowProjectKey } from "@/utils/cache/localStorage"
import { getMyProjectApi, createProjectApi } from "@/api/project/index"
import { type IGetProjectDataApi } from "@/api/project/index"
import { type ICreateProjectRequestData } from "@/api/project/types/project"
export default {
  name: "ProjectIndex",
  setup() {
    const email = ref(getEmail())
    const router = useRouter()
    const tableData = ref<any[]>([])
    const dialogVisible = ref(false)
    const getProjectForm: IGetProjectDataApi = reactive({
      page: 1,
      limit: 10
    })
    const createProjectForm: ICreateProjectRequestData = reactive({
      name: "",
      describes: ""
    })
    const rules = {
      name: [{ required: true, message: "请输入项目名称", trigger: "blur" }],
      describes: [{ required: true, message: "请输入项目描述", trigger: "blur" }]
    }
    const handleCommand = (command: string) => {
      if (command === "loginOut") {
        removeEmail()
        removeRole()
        removeToKen()
        router.push("/login")
      } else if (command === "user") {
        router.push("/user")
      }
    }

    const handleChoiceProject = (id: string, projectKey: string) => {
      setNowProject(id)
      setNowProjectKey(projectKey)
      router.push("/dashboard")
    }
    const validProjectForm = () => {
      if (createProjectForm.name && createProjectForm.describe) {
        return true
      } else {
        return false
      }
    }
    const handleCreateProject = () => {
      if (validProjectForm()) {
        createProjectApi(createProjectForm).then((res: any) => {
          if (res.code == 200) {
            ElMessage.success(res.message)
            dialogVisible.value = false
            getMyProjects()
          } else {
            ElMessage.error("创建项目失败")
          }
        })
      } else {
        ElMessage.warning("项目名和描述不能为空")
      }
    }
    const getMyProjects = () => {
      getMyProjectApi(getProjectForm).then((re) => {
        tableData.value = re.data
      })
    }

    getMyProjects()

    return {
      avatar,
      email,
      tableData,
      dialogVisible,
      createProjectForm,
      rules,
      handleCreateProject,
      handleCommand,
      handleChoiceProject
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
.header .logo {
  float: left;
  width: 250px;
  line-height: 70px;
  padding-left: 25px;
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
.el-row {
  margin-bottom: 20px;
}
.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
}
.grid-cont-right {
  flex: 1;
  text-align: center;
  font-size: 14px;
  color: #999;
}
.grid-num {
  font-size: 30px;
  font-weight: bold;
}
.grid-con-icon {
  font-size: 50px;
  width: 100px;
  height: 100px;
  text-align: center;
  line-height: 100px;
  color: #fff;
}
.grid-con-1 .grid-con-icon {
  background: rgb(45, 140, 240);
}
.grid-con-1 .grid-num {
  color: rgb(45, 140, 240);
}
.grid-con-2 .grid-con-icon {
  background: rgb(100, 213, 114);
}
.grid-con-2 .grid-num {
  color: rgb(45, 140, 240);
}
.grid-con-3 .grid-con-icon {
  background: rgb(242, 94, 67);
}
.grid-con-3 .grid-num {
  color: rgb(242, 94, 67);
}
.user-info {
  display: flex;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 2px solid #ccc;
  margin-bottom: 20px;
}
.user-info-cont {
  padding-left: 50px;
  flex: 1;
  font-size: 14px;
  color: #999;
}
.user-info-cont div:first-child {
  font-size: 30px;
  color: #222;
}
.user-info-list {
  font-size: 14px;
  color: #999;
  line-height: 25px;
}
.user-info-list span {
  margin-left: 70px;
}
.mgb20 {
  margin-bottom: 20px;
}
.todo-item {
  font-size: 14px;
}
.todo-item-del {
  text-decoration: line-through;
  color: #999;
}
.schart {
  width: 100%;
  height: 300px;
}
.p-header {
  position: relative;
  padding: 0 0 20px 0;
}
.p-header .p-title {
  margin: 0;
  padding: 0;
  font-size: 28px;
  line-height: 40px;
  height: 40px;
  font-weight: 400;
  color: #1f2f3d;
}
.p-header .p-actions {
  position: absolute;
  right: 0;
  top: 0;
}
.ptext {
  margin: 10px 0 0 0;
  font-size: 13px;
  line-height: 20px;
  color: #888;
}
.split {
  margin: 0 10px;
  color: #ccc;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
