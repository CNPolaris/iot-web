<template>
  <div>
    <div class="d-nav">
      <div class="el-page-header">
        <div class="el-page-header__left">
          <div class="el-page-header__title" @click="handleBackGatewayIndex">返回</div>
        </div>
        <div class="el-page-header__content">设备详情</div>
      </div>
    </div>
    <div class="d-detail">
      <div class="d-name">
        {{ gatewayData.name }}
      </div>
    </div>
    <div style="margin-top: 20px">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="概览" name="first">
          <OverviewTab />
        </el-tab-pane>
        <el-tab-pane label="连接" name="second">
          <ConnectTab :gatewayKey="gatewayData.gatewayKey" />
        </el-tab-pane>
        <el-tab-pane label="命令" name="third">
          <CommandTab />
        </el-tab-pane>
        <el-tab-pane label="任务" name="fourth">任务</el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, reactive } from "vue"
import { useRoute, useRouter } from "vue-router"
import { getGatewayDetailApi } from "@/api/gateway"
import { getNowProjectKey } from "@/utils/cache/localStorage"
import useClipboard from "vue-clipboard3"
import { ElMessage } from "element-plus"
import { OverviewTab, ConnectTab, CommandTab } from "./tabs"
export default {
  name: "GatewayDetail",
  components: {
    OverviewTab,
    ConnectTab,
    CommandTab
  },
  setup() {
    const route = useRoute()
    const router = useRouter()
    const gatewayId = ref(route.query.id)
    const activeName = ref("first")
    const gatewayData = reactive({
      id: "",
      name: "",
      gatewayKey: "",
      createTime: ""
    })
    const tcpData = reactive([
      {
        id: 0,
        name: "TCP地址",
        value: "127.0.0.1"
      },
      {
        id: 1,
        name: "TCP端口",
        value: "9960"
      }
    ])
    /**
     * 剪切板
     */
    const { toClipboard } = useClipboard()
    const handleClick = () => {
      console.log("click")
    }
    /**
     * 获取网关详情
     */
    const getGatewayDetail = () => {
      getGatewayDetailApi(gatewayId.value).then((res) => {
        console.log(res.data)
        gatewayData.name = res.data.name
        gatewayData.gatewayKey = res.data.gatewayKey
        gatewayData.createTime = res.data.createTime
      })
    }
    const copyProjectKey = async () => {
      try {
        await toClipboard(getNowProjectKey())
        ElMessage.success("复制成功")
      } catch (e) {
        ElMessage.error("复制失败")
      }
    }
    const handleCopyTcpData = async (id: number) => {
      try {
        await toClipboard(tcpData[id].value)
        ElMessage.success("已复制")
      } catch (e) {
        ElMessage.error("复制失败")
      }
    }
    const copyGatewayKey = async () => {
      try {
        await toClipboard(gatewayData.gatewayKey)
        ElMessage.success("复制成功")
      } catch (e) {
        ElMessage.error("复制失败")
      }
    }
    const handleBackGatewayIndex = () => {
      router.push("/gateway")
    }
    getGatewayDetail()
    return {
      gatewayId,
      gatewayData,
      activeName,
      tcpData,
      handleClick,
      copyProjectKey,
      copyGatewayKey,
      handleCopyTcpData,
      handleBackGatewayIndex
    }
  }
}
</script>
<style scoped>
.d-nav {
  margin: 0 0 20px 0;
}
.el-page-header {
  line-height: 24px;
}
.el-page-header .el-page-header__left {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
}
.el-page-header__title {
  font-size: 14px;
  font-weight: 500;
}
.el-page-header__content {
  font-size: 18px;
  color: #303133;
}
.d-detail {
  margin-top: 10px;
}
.d-name {
  padding: 10px 0 0 0;
  font-size: 26px;
  line-height: 34px;
  color: #002822;
  font-weight: 500;
}
.title2 {
  font-size: 22px;
  line-height: 32px;
  color: #002822;
}
.mb-title2-tips {
  margin: 8px 0 0 0;
  font-size: 15px;
  line-height: 22px;
  color: #888;
}
.dendpoint {
  margin: 10px 0 0 0;
}
.mb-space {
  height: 30px;
}
.code1 {
  padding: 10px 10px;
  font-size: 14px;
  line-height: 20px;
  color: #fff;
  background-color: #464646;
  font-weight: 500;
  font-family: Andale Mono, Consolas, monospace;
}
</style>
