<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="18">
        <el-row :gutter="20" class="mgb20">
          <el-col :span="6">
            <el-card shadow="hover" :body-style="{ padding: '0px' }" @click="handleToAllGateway()">
              <div class="grid-content grid-con-2">
                <!-- <i class="grid-con-icon"></i> -->
                <div class="grid-cont-right">
                  <div class="grid-num">{{ gatewayCountData }}</div>
                  <div>所有网关</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-2">
                <!-- <i class="grid-con-icon"></i> -->
                <div class="grid-cont-right">
                  <div class="grid-num">0</div>
                  <div>在线监控</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-2">
                <!-- <i class="grid-con-icon"></i> -->
                <div class="grid-cont-right">
                  <div class="grid-num">0</div>
                  <div>活跃设备</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="6">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="grid-content grid-con-2">
                <!-- <i class="grid-con-icon"></i> -->
                <div class="grid-cont-right">
                  <div class="grid-num">0</div>
                  <div>警告设备</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </el-col>
      <el-col :span="6" />
    </el-row>
  </div>
</template>

<script lang="ts">
import { getGatewayCountApi } from "@/api/gateway"
import { getNowProject } from "@/utils/cache/localStorage"
import { ref } from "vue"
import { useRouter } from "vue-router"
export default {
  name: "DashBoard",
  setup() {
    const nowProjectId = getNowProject()
    const gatewayCountData = ref(0)
    const router = useRouter()

    const getGatewayCount = () => {
      if (nowProjectId !== null && nowProjectId !== undefined) {
        getGatewayCountApi(getNowProject()).then((res: any) => {
          gatewayCountData.value = res.data
        })
      }
    }

    const handleToAllGateway = () => {
      router.push("/gateway")
    }
    /**获取网关数量 */
    getGatewayCount()

    return {
      gatewayCountData,
      getGatewayCount,
      handleToAllGateway
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
.user-avator {
  width: 120px;
  height: 120px;
  border-radius: 50%;
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
</style>
