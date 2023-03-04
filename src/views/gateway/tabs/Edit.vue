<template>
  <div>
    <el-form v-model="editForm">
      <el-form-item label="ID">
        <el-input v-model="editForm.id" :disabled="true" />
      </el-form-item>
      <el-form-item prop="name" label="网关名称">
        <el-input v-model="editForm.name" />
      </el-form-item>
      <el-form-item prop="gatewayKey" label="网关密钥">
        <el-input v-model="editForm.gatewayKey" :disabled="true" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="updateDialogVisible = true">更新</el-button>
        <el-button type="warning" @click="deleteDialogVisible = true">删除</el-button>
      </el-form-item>
    </el-form>
    <el-dialog v-model="updateDialogVisible" title="修改网关数据">
      <el-descriptions title="更新后内容">
        <el-descriptions-item label="网关名称">{{ editForm.name }}</el-descriptions-item>
        <el-descriptions-item label="网关密钥">{{ editForm.gatewayKey }}</el-descriptions-item>
      </el-descriptions>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="updateDialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="handleUpdateGateway">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="deleteDialogVisible" title="删除网关信息">
      <template #footer>
        <el-button @click="deleteDialogVisible = false">Cancel</el-button>
        <el-button type="warning" @click="handleDeleteGateway">Confirm</el-button>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs, ref } from "vue"
import { useRoute } from "vue-router"
import { getNowProject } from "@/utils/cache/localStorage"
import { updateGatewayDataApi, deleteGatewayApi } from "@/api/gateway/index"
import { type IUpdateGatewayData } from "@/api/gateway/types/gateway"
import { ElMessage } from "element-plus"
export default {
  name: "EditTab",
  props: {
    gatewayName: String,
    createTime: String,
    gatewayKey: String
  },
  setup(props) {
    const route = useRoute()
    const { gatewayName, createTime, gatewayKey } = toRefs(props)
    const editForm = reactive({
      id: route.query.gatewayId as string,
      name: gatewayName.value as string,
      projectId: getNowProject() as string,
      createTime: createTime,
      gatewayKey: gatewayKey.value as string
    })
    const updateDialogVisible = ref(false)
    const deleteDialogVisible = ref(false)
    const handleShowUpdateDialog = () => {
      updateDialogVisible.value = true
    }
    const handleUpdateGateway = () => {
      updateDialogVisible.value = false
      updateGatewayDataApi(editForm.id, editForm as IUpdateGatewayData).then((res: any) => {
        if (res.code === 200) {
          ElMessage.success("更新成功")
        } else {
          ElMessage.error("更新失败")
        }
      })
    }
    const handleDeleteGateway = () => {
      deleteDialogVisible.value = false
      deleteGatewayApi(route.query.id).then((res: any) => {
        if (res.code === 200) {
          ElMessage.success("删除成功")
        } else {
          ElMessage.error("删除失败")
        }
      })
    }
    return {
      editForm,
      updateDialogVisible,
      deleteDialogVisible,
      handleShowUpdateDialog,
      handleUpdateGateway,
      handleDeleteGateway
    }
  }
}
</script>
