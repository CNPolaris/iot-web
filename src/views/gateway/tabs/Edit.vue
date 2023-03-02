<template>
  <div>
    <el-form :model="editForm">
      <el-form-item label="ID">
        <el-input v-model="editForm.id" :disabled="true" />
      </el-form-item>
      <el-form-item label="网关名称">
        <el-input v-model="editForm.name" />
      </el-form-item>
      <el-form-item label="网关密钥">
        <el-input v-model="editForm.gatewayKey" />
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { reactive, toRefs } from "vue"
import { useRoute } from "vue-router"
import { getNowProject } from "@/utils/cache/localStorage"
export default {
  name: "EditTab",
  props: {
    name: String,
    createTime: String,
    gatewayKey: String
  },
  setup(props) {
    const route = useRoute()
    const { name, createTime, gatewayKey } = toRefs(props)
    const editForm = reactive({
      id: route.query.gatewayId,
      name: name,
      projectId: getNowProject() as string,
      createTime: createTime,
      gatewayKey: gatewayKey
    })
    return { editForm }
  }
}
</script>
