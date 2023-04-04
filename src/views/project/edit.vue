<template>
  <div class="mbody">
    <div>
      <div class="mbcontainer comm-mb1">
        <div class="mb-header">
          <h3 class="htitle">项目设置</h3>
        </div>
        <div class="mb-ddetail">
          <el-tabs v-model="activeName">
            <el-tab-pane label="概要" name="overview">
              <el-row>
                <el-col xl="24" xs="24" sm="12">
                  <el-card>
                    <template #header>
                      <div class="card-header">
                        <span>基本信息</span>
                      </div>
                    </template>
                    <div>
                      <el-row style="margin-left: -5px; margin-right: -5px">
                        <el-col>
                          <div class="bitem">
                            <span class="btitle"> 项目 ID </span>
                            <span class="btips" />
                            <div class="baction">
                              <span>{{ projectDetail.id }}</span>
                            </div>
                          </div>
                        </el-col>
                        <el-col>
                          <div class="bitem">
                            <span class="btitle"> 项目名称 </span>
                            <span class="btips" />
                            <div class="baction">
                              <span>{{ projectDetail.name }}</span>
                              <el-button type="text" size="small" style="margin-left: 10px">编辑</el-button>
                            </div>
                          </div>
                        </el-col>
                        <el-col>
                          <div class="bitem">
                            <span class="btitle"> 项目描述 </span>
                            <span class="btips" />
                            <div class="baction">
                              <span>{{ projectDetail.describes }}</span>
                              <el-button type="text" size="small" style="margin-left: 10px">编辑</el-button>
                            </div>
                          </div>
                        </el-col>
                        <el-col>
                          <div class="bitem">
                            <span class="btitle"> 创建时间 </span>
                            <span class="btips" />
                            <div class="baction">
                              <span>{{ projectDetail.createTime }}</span>
                            </div>
                          </div>
                        </el-col>
                        <el-col>
                          <div class="bitem">
                            <span class="btitle"> 所在服务器 </span>
                            <span class="btips" />
                            <div class="baction">
                              <span>{{ projectDetail.serverName }}</span>
                            </div>
                          </div>
                        </el-col>
                      </el-row>
                    </div>
                  </el-card>
                </el-col>
              </el-row>
            </el-tab-pane>
            <el-tab-pane label="通用设置" name="setting"> </el-tab-pane>
            <el-tab-pane label="项目成员" name="members"> </el-tab-pane>
            <el-tab-pane label="管理" name="admin">
              <el-row>
                <el-col xl="24" xs="24" sm="12">
                  <el-card>
                    <template #header>
                      <div class="card-header">
                        <span>管理</span>
                      </div>
                    </template>
                    <el-button type="primary" @click="deleteDialogVisible = true">删除项目</el-button>
                  </el-card>
                </el-col>
              </el-row>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
  </div>
  <el-dialog v-model="deleteDialogVisible" title="删除项目">
    <el-card>
      即将移除项目，请输入验证码
      <span style="font-weight: bold"> {{ code }} </span>确认删除
      <el-input v-model="codeForm" />
    </el-card>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="deleteDialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleDeleteProject">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { ref } from "vue"
import { getNowProject, removeNowProjectKey, removeNowProject } from "@/utils/cache/localStorage"
import { getProjectDetailApi, deleteProjectApi } from "@/api/project"
import { ElMessage } from "element-plus"
import { useRouter } from "vue-router"
import { createCode } from "@/utils/code"
export default {
  setup() {
    const router = useRouter()
    const activeName = ref("overview")
    const projectId = getNowProject() as string
    const projectDetail = ref({})
    const deleteDialogVisible = ref(false)
    const code = ref(createCode() as string)
    const codeForm = ref("")
    const handleGetProjectDetail = () => {
      getProjectDetailApi(projectId).then((res) => {
        if (res.code === 200) {
          projectDetail.value = res.data
        }
      })
    }
    const handleDeleteProject = () => {
      if (codeForm.value) {
        if (code.value === codeForm.value) {
          deleteProjectApi(projectId).then((res: any) => {
            if (res.code === 200) {
              ElMessage.success("移除项目成功")
              deleteDialogVisible.value = false
              removeNowProject()
              removeNowProjectKey()
              router.push("/")
            } else {
              ElMessage.error(res.message)
              deleteDialogVisible.value = false
            }
          })
        } else {
          ElMessage.error("验证码错误, 请重试")
        }
      } else {
        ElMessage.warning("验证码不能为空！")
      }
    }
    handleGetProjectDetail()
    return {
      activeName,
      projectDetail,
      deleteDialogVisible,
      code,
      codeForm,
      handleDeleteProject
    }
  }
}
</script>
<style scoped>
.mbody {
  display: block;
  margin: 0px 0 0 0px;
  min-width: 300px;
  min-height: calc(100vh - 50px);
  overflow-y: auto;
  -webkit-transition: all 0.5s ease;
  transition: all 0.5s ease;
}
.mbcontainer {
}
.comm-mb1 {
  padding: 20px 30px 50px 30px;
}
.comm-mb1 .mb-header {
  position: relative;
  padding: 0 0 20px 0;
}
.comm-mb1 .mb-header .htitle {
  margin: 0;
  padding: 0;
  font-size: 28px;
  line-height: 40px;
  height: 40px;
  font-weight: 400;
  color: #1f2f3d;
}
.comm-mb1 .mb-ddetail {
  margin-top: 20px;
}
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 20px;
}
.bitem {
  padding: 0 0 20px 0;
}
.bitem .btitle {
  display: block;
  font-size: 14px;
  line-height: 18px;
  color: #606266;
  font-weight: 600;
}
.bitem .btips {
  display: block;
  margin: 3px 0 0 0;
  font-size: 13px;
  line-height: 18px;
  color: #606266;
}
.bitem .baction {
  margin: 7px 0 0 0;
  font-size: 15px;
  line-height: 20px;
  color: #002822;
}
.bitem .btitle {
  display: block;
  font-size: 14px;
  line-height: 18px;
  color: #606266;
  font-weight: 600;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
