<template>
  <div>
    <el-row>
      <el-col :span="22">
        <div class="p-header" style="margin-top: 10px">
          <h3 class="p-title">监控设备</h3>
          <div class="p-actions">
            <el-button type="primary">添加设备</el-button>
          </div>
        </div>
        <el-row :gutter="20" style="margin-top: 20px">
          <el-col :span="24">
            <el-row :gutter="30" class="mgb20">
              <el-col :span="8" v-for="item in monitorList" :key="item.id" style="padding-top: 10px">
                <el-card shadow="hover" :body-style="{ padding: '0px' }" @click="previewMonitor(item.id)">
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
</template>
<script lang="ts">
import { ref } from "vue"
import { useRouter } from "vue-router"
export default {
  setup() {
    const monitorList = ref<any[]>([])
    const router = useRouter()
    const mockMonitorList = () => {
      monitorList.value.push({ id: 1, name: "监控测试" })
    }
    const previewMonitor = (id: string) => {
      router.push({ path: "/monitor/preview", query: { monitorId: id } })
    }
    mockMonitorList()
    return { monitorList, previewMonitor }
  }
}
</script>
