<template>
  <div>
    <el-row style="margin-top: 10px">
      <el-col :span="16" />
      <el-col :span="8" style="text-align: right">
        <el-button @click="handleCreateTask" type="primary">创建任务</el-button>
        <el-button @click="handleFlush">刷新</el-button>
      </el-col>
    </el-row>
  </div>
  <div class="task-cards">
    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="8" style="padding-left: -5px; padding-right: -5px" v-for="item in tableData" :key="item.id">
        <div>
          <el-card class="dcitem" shadow="hover">
            <div class="dctitle">{{ item.name }}</div>
            <div class="dctext">
              {{ item.type }}
            </div>
            <div class="itaskstat">
              <el-button>运行任务</el-button>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { useRoute } from "vue-router"
import { reactive, ref } from "vue"
import { type ICreateTaskData, type IGetTaskParams } from "@/api/gateway/types/task"
import { CreateTaskApi, getAllTaskApi, pushTaskApi } from "@/api/gateway"

export default {
  name: "TaskTab",
  setup() {
    const route = useRoute()
    const gatewayId = ref(route.query.gatewayId)
    const query: IGetTaskParams = reactive({
      page: 1,
      limit: 10
    })
    const form: ICreateTaskData = reactive({
      type: 1,
      clockType: 1,
      time: 60,
      taskJson: "test task"
    })
    const tableData = ref<any[]>([])
    const handleCreateTask = () => {
      CreateTaskApi(gatewayId.value as string, form).then((res: any) => {
        console.log(res.message)
      })
    }
    const handlePushTask = (taskId: string) => {
      pushTaskApi(gatewayId.value as string, taskId).then((res: any) => {
        console.log(res)
      })
    }
    const getAllTask = () => {
      getAllTaskApi(gatewayId.value as string, query).then((res: any) => {
        tableData.value = res.data.list
      })
    }
    const handleFlush = () => {
      getAllTaskApi(gatewayId.value as string, query).then((res: any) => {
        tableData.value = res.data.list
      })
    }
    getAllTask()
    return {
      handleCreateTask,
      getAllTask,
      handlePushTask,
      handleFlush,
      tableData
    }
  }
}
</script>
<style scoped>
.task-cards {
  margin: 30px 0 0 0;
}
.itaskstat {
  margin: 15px 0 0 0;
  height: 30px;
  font-size: 13px;
  line-height: 30px;
  color: #888;
  text-align: right;
  position: relative;
}
.dctitle {
  font-size: 16px;
  line-height: 22px;
  margin: 0 30px 0 0;
  height: 22px;
  font-weight: 600;
  overflow: hidden;
}
.dctext {
  margin: 10px 0 0 0;
  font-size: 14px;
  line-height: 22px;
  height: 22px;
  color: #888;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.dcitem {
  position: relative;
  margin: 0 10px 10px 0;
  width: 100%;
  cursor: pointer;
}
</style>
