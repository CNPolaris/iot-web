<template>
  <div>
    <el-row>
      <el-col :span="22">
        <div class="p-header" style="margin-top: 10px">
          <h3 class="p-title">监控设备</h3>
          <div class="p-actions">
            <el-button type="primary" @click="monitorDialogVisible = true">添加设备</el-button>
          </div>
        </div>
        <el-row :gutter="20" style="margin-top: 20px">
          <el-col :span="24">
            <el-row :gutter="30" class="mgb20">
              <el-col
                :span="8"
                :xs="24"
                :sm="12"
                :md="8"
                :lg="8"
                :xl="8"
                v-for="item in monitorList"
                :key="item.id"
                style="padding-top: 10px"
              >
                <el-card
                  shadow="hover"
                  :body-style="{ padding: '0px' }"
                  @click="previewMonitor(item.id, item.status, item.onLine)"
                >
                  <div class="grid-content grid-con-2">
                    <!-- <i class="grid-con-icon"></i> -->
                    <div class="grid-cont-right">
                      <div>
                        监控名称：{{ item.name }}
                        <el-tag :type="item.status == 1 ? 'success' : 'warning'" size="small" effect="light">{{
                          item.status === 1 ? "有效" : "无效"
                        }}</el-tag>
                        <el-tag :type="item.onLine == 1 ? 'success' : 'warning'" size="small" effect="light">{{
                          item.onLine === 1 ? "在线" : "离线"
                        }}</el-tag>
                      </div>
                      <div>创建时间：{{ formatDateTime(item.createTime) }}</div>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <div class="pager-wrapper">
          <el-pagination
            background
            :layout="paginationData.layout"
            :page-sizes="paginationData.pageSizes"
            :total="paginationData.total"
            :page-size="paginationData.pageSize"
            :currentPage="paginationData.currentPage"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-col>
      <el-col :span="2" />
    </el-row>
  </div>
  <el-dialog v-model="monitorDialogVisible" title="添加监控设备">
    <el-form :model="createForm" :rules="rules">
      <el-form-item prop="name" label="监控名称">
        <el-input v-model="createForm.name" />
      </el-form-item>
      <el-form-item prop="describes" label="监控描述">
        <el-input v-model="createForm.describes" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="monitorDialogVisible = true">Cancel</el-button>
        <el-button type="primary" @click="handleCreateMonitor">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { reactive, ref } from "vue"
import { useRouter } from "vue-router"
import { getNowProject } from "@/utils/cache/localStorage"
import { CreateMonitorRequestData, getMonitorListRequestData, MonitorItemResp } from "@/api/monitor/types/monitor"
import { createMonitorApi, getMonitorListApi } from "@/api/monitor"
import { ElMessage } from "element-plus"
import { usePagination } from "@/hooks/usePagination"
import { formatDateTime } from "@/utils/date"
export default {
  setup() {
    const monitorList = ref<MonitorItemResp[]>([])
    const router = useRouter()
    const monitorDialogVisible = ref(false)
    const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()
    const pageForm: getMonitorListRequestData = reactive({
      page: 1,
      limit: 12,
      projectId: getNowProject() as string
    })
    const createForm: CreateMonitorRequestData = reactive({
      name: "",
      describes: "",
      projectId: getNowProject() as string
    })
    const rules = {
      name: [{ required: true, message: "请输入监控名称", trigger: "blur" }]
    }
    const previewMonitor = (id: string, status: number, onLine: number) => {
      if (status === 1 && onLine === 1) {
        router.push({ path: "/monitor/preview", query: { monitorId: id } })
      } else if (status === 1 && onLine === 0) {
        ElMessage.warning("监控设备离线")
      } else {
        ElMessage.error("该监控已被禁用!")
      }
    }
    const handleCreateMonitor = () => {
      if (createForm.name) {
        createMonitorApi(createForm).then((res) => {
          if (res.code === 200) {
            ElMessage.success("添加监控设备成功")
            createForm.describes = ""
            createForm.name = ""
            monitorDialogVisible.value = false
            handleGetMonitorList()
          } else {
            ElMessage.error(res.message)
          }
        })
      } else {
        ElMessage.error("监控名称不能为空")
      }
    }
    const handleGetMonitorList = () => {
      getMonitorListApi(pageForm).then((res) => {
        if (res.code === 200) {
          monitorList.value = res.data.list
          paginationData.total = res.data.total
        }
      })
    }
    handleGetMonitorList()
    return {
      monitorList,
      monitorDialogVisible,
      createForm,
      rules,
      pageForm,
      paginationData,
      formatDateTime,
      handleGetMonitorList,
      previewMonitor,
      handleCreateMonitor,
      handleCurrentChange,
      handleSizeChange
    }
  }
}
</script>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
