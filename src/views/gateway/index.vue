<template>
  <div>
    <el-row>
      <el-col :span="22">
        <div class="p-header" style="margin-top: 10px">
          <h3 class="p-title">网关设备</h3>
          <div class="p-actions">
            <el-button type="primary" @click="dialogVisible = true">创建设备</el-button>
          </div>
        </div>
        <el-row :gutter="20" style="margin-top: 20px">
          <el-col :span="24">
            <el-row :gutter="30" class="mgb20">
              <el-col :span="8" v-for="item in tableData" :key="item.id" style="padding-top: 10px">
                <el-card shadow="hover" :body-style="{ padding: '0px' }" @click="handleChoiceGateway(item.id)">
                  <div class="grid-content grid-con-2">
                    <!-- <i class="grid-con-icon"></i> -->
                    <div class="grid-cont-right">
                      <div>{{ item.name }}</div>
                    </div>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="2" />
    </el-row>
  </div>
  <el-dialog v-model="dialogVisible" title="添加网关">
    <el-form :model="createGatewayForm" :rules="rules">
      <el-form-item prop="name" label="网关名称">
        <el-input v-model="createGatewayForm.name" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">Cancel</el-button>
        <el-button type="primary" @click="handleCreateGateway">Confirm</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script lang="ts">
import { ref, reactive } from "vue"
import { getGatewayListApi, createGatewayApi } from "@/api/gateway/index"
import { type createGatewayRequestData } from "@/api/gateway/types/gateway"
import { getNowProject } from "@/utils/cache/localStorage"
import { useRouter } from "vue-router"
import { ElMessage } from "element-plus"
export default {
  name: "Gateway",
  setup() {
    const tableData = ref<any[]>([])
    const router = useRouter()
    const dialogVisible = ref(false)
    const createGatewayForm: createGatewayRequestData = reactive({
      name: "",
      project_id: getNowProject() as string
    })
    const rules = {
      name: [{ required: true, message: "请输入网关名称", trigger: "blur" }]
    }
    const getAllGatewayList = () => {
      getGatewayListApi(getNowProject()).then((res) => {
        tableData.value = res.data
      })
    }
    const handleCreateGateway = () => {
      createGatewayApi(createGatewayForm).then((res: any) => {
        if (res.code === 200) {
          ElMessage.success("添加网关成功")
          dialogVisible.value = false
          getAllGatewayList()
        } else {
          ElMessage.error("添加网关失败")
        }
      })
    }
    /**获取当前项目下所有网关设备 */
    getAllGatewayList()
    const handleChoiceGateway = (id: string) => {
      router.push({ path: "/gateway/detail", query: { gatewayId: id } })
    }
    return {
      dialogVisible,
      tableData,
      rules,
      createGatewayForm,
      getAllGatewayList,
      handleChoiceGateway,
      handleCreateGateway
    }
  }
}
</script>
<style scoped>
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
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
