<template>
  <div class="title2">设备证书</div>
  <div class="mb-title2-tips">
    每个设备拥有唯一的 AccessToken，设备连接云平台进行普通身份验证时使用 AccessToken，请妥善保管。
  </div>
  <div class="dendpoint">
    <el-button @click="copyProjectKey">点击复制ProjectKey</el-button>
    <el-button @click="copyGatewayKey">点击复制GatewayKey</el-button>
  </div>
  <div class="mb-space" />
  <div class="title2">TCP接入点</div>
  <div class="mb-title2-tips">
    TCP 接入方式为设备提供了最原始的 TCP/IP 传输方式，支持 ASCII、HEX、JSON
    等有效负载，适合一些自定义协议的通信场景，也适用于 TCP 透传方式。
  </div>
  <div class="dendpoint">
    <div class="code1">tcp://127.0.0.1:9960</div>
    <el-row style="margin-top: 10px">
      <el-table :data="tcpData" :show-header="false">
        <el-table-column prop="name" width="100" />
        <el-table-column prop="value">
          <template #default="scope">
            {{ scope.row.value }}
            <el-button type="text" @click="handleCopyTcpData(scope.row.id)">
              <i class="el-icon-just-fuzhi" />
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </div>
</template>

<script lang="ts">
import useClipboard from "vue-clipboard3"
import { ElMessage } from "element-plus"
import { getNowProjectKey } from "@/utils/cache/localStorage"
import { reactive, toRefs } from "vue"

export default {
  name: "ConnectTab",
  props: {
    gatewayKey: String
  },
  setup(props) {
    const { toClipboard } = useClipboard()
    const {gatewayKey} = toRefs(props)
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
        await toClipboard(gatewayKey.value)
        ElMessage.success("复制成功")
      } catch (e) {
        ElMessage.error("复制失败")
      }
    }
    return {
      tcpData,
      copyProjectKey,
      handleCopyTcpData,
      copyGatewayKey
    }
  }
}
</script>
