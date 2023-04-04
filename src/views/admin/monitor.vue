<template>
  <el-row>
    <el-col>
      <el-table :data="tableData" border style="widows: 100%">
        <el-table-column fixed="left" prop="id" label="ID" align="center" />
        <el-table-column fixed prop="name" label="监控名称" align="center" />
        <el-table-column label="推流地址">
          <template #default="scope">
            <span>{{ scope.row.monitorKey }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="describes" label="描述" align="center" />
        <el-table-column prop="createTime" label="创建时间" align="center">
          <template #default="scope">
            <span>{{ formatter(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" align="center">
          <template #default="scope">
            <el-tag :type="scope.row.onLine === 1 ? 'success' : 'warning'">
              {{ formatterTagOnline(scope.row.onLine) }}
            </el-tag>
            <el-tag :type="scope.row.status === 1 ? 'success' : 'warning'">
              {{ formatterTagStatus(scope.row.status) }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column label="禁用">
          <template #default="scope">
            <el-switch
              v-model="scope.row.status"
              :active-value="1"
              :inactive-value="0"
              style="--el-switch-on-color: #13ce66; --el-switch-off-color: #ff4949"
              @change="handleChangeSwitch(scope.row)"
            />
          </template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" align="center">
          <template #default="scope">
            <el-button type="text">edit</el-button>
            <el-button type="text" @click="handlePreview(scope.row)">preview</el-button>
          </template>
        </el-table-column>
      </el-table>
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
</template>
<script lang="ts">
import { getMonitorListRequestData, MonitorItemResp } from "@/api/monitor/types/monitor"
import { getNowProject } from "@/utils/cache/localStorage"
import { getMonitorListApi, updateMonitorApi } from "@/api/monitor"
import { onDeactivated, onMounted, reactive, ref } from "vue"
import { usePagination } from "@/hooks/usePagination"
import { formatDateTime } from "@/utils/date"
import { ElMessage } from "element-plus"
import { useRouter } from "vue-router"
export default {
  setup() {
    const timer = ref(0)
    onMounted(() => {
      timer.value = window.setInterval(() => {
        handleGetTable()
      }, 1000 * 60 * 5)
    })
    onDeactivated(() => {
      window.clearInterval(timer.value)
    })
    const router = useRouter()
    const pageForm: getMonitorListRequestData = reactive({
      page: 1,
      limit: 10,
      projectId: getNowProject() as string
    })
    const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()
    paginationData.pageSize = pageForm.limit
    const tableData = ref<MonitorItemResp[]>([])
    const formatter = (value: string) => {
      return formatDateTime(value)
    }
    const formatterTagOnline = (value: number) => {
      if (value === 1) {
        return "在线"
      } else {
        return "离线"
      }
    }
    const formatterTagStatus = (value: number) => {
      if (value === 1) {
        return "有效"
      } else {
        return "无效"
      }
    }
    const handleChangeSwitch = (row: any) => {
      updateMonitorApi(row.id, row).then((res) => {
        if (res.code !== 200) {
          ElMessage.error("切换状态失败")
        }
      })
    }
    const handlePreview = (row: any) => {
      if (row.status === 1 && row.onLine === 1) {
        router.push({ path: "/monitor/preview", query: { monitorId: row.id } })
      } else if (row.status === 1 && row.onLine === 0) {
        ElMessage.warning("监控设备离线")
      } else {
        ElMessage.error("该监控已被禁用!")
      }
    }
    const handleGetTable = () => {
      getMonitorListApi(pageForm).then((res) => {
        tableData.value = res.data.list
        paginationData.total = res.data.total
      })
    }
    handleGetTable()
    return {
      pageForm,
      paginationData,
      tableData,
      handlePreview,
      handleChangeSwitch,
      formatter,
      handleCurrentChange,
      handleSizeChange,
      formatterTagOnline,
      formatterTagStatus
    }
  }
}
</script>
