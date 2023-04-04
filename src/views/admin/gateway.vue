<template>
  <el-row>
    <el-col>
      <el-table :data="tableData" border style="widows: 100%">
        <el-table-column fixed prop="id" label="ID" />
        <el-table-column fixed prop="name" label="网关名称" />
        <el-table-column prop="gatewayKey" label="密钥" />
        <el-table-column prop="createTime" label="创建时间">
          <template #default="scope">
            <span>{{ formatter(scope.row.createTime) }}</span>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-tag :type="scope.row.status === 1 ? 'success' : 'warning'" size="small">
              {{ formatterTag(scope.row.status) }}
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
        <el-table-column label="操作">
          <el-button type="primary" size="small">edit</el-button>
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
import { GetGatewayListRequestData, IGatewayDatailData } from "@/api/gateway/types/gateway"
import { getGatewayListApi, updateGatewayDataApi } from "@/api/gateway"
import { reactive, ref } from "vue"
import { usePagination } from "@/hooks/usePagination"
const { paginationData, handleCurrentChange, handleSizeChange } = usePagination()
import { getNowProject } from "@/utils/cache/localStorage"
import { formatDateTime } from "@/utils/date"
export default {
  setup() {
    const pageForm: GetGatewayListRequestData = reactive({
      page: 1,
      limit: 10,
      gatewayId: "",
      gatewayName: ""
    })
    const tableData = ref<IGatewayDatailData[]>([])
    const formatter = (value: string) => {
      return formatDateTime(value)
    }
    const formatterTag = (value: number) => {
      if (value === 1) {
        return "有效"
      } else {
        return "无效"
      }
    }
    const handleChangeSwitch = (row: any) => {
      console.log(row.id)
      updateGatewayDataApi(row.id, row).then((res: any) => {
        console.log(res.data)
      })
    }
    const handleGetList = () => {
      pageForm.page = paginationData.currentPage
      pageForm.limit = paginationData.pageSize
      getGatewayListApi(getNowProject() as string, pageForm).then((res) => {
        if (res.code === 200) {
          tableData.value = res.data.list
          paginationData.total = res.data.total
        }
      })
    }
    handleGetList()
    return {
      pageForm,
      tableData,
      paginationData,
      handleChangeSwitch,
      formatter,
      formatterTag,
      handleCurrentChange,
      handleSizeChange
    }
  }
}
</script>
