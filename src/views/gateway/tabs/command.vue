<template>
  <div>
    <el-row style="margin-top: 10px">
      <el-col :span="16">
        <el-button @click="handlePushCommand">
          <i class="el-icon-just-xiafa" />
          下发命令
        </el-button>
      </el-col>
      <el-col :span="8">
        <el-button>
          <i class="el-icon-just-shuaxin" />
          刷新
        </el-button>
      </el-col>
    </el-row>
    <el-row style="margin-top: 10px">
      <el-table :data="tableData">
        <el-table-column label="命令标识符" />
        <el-table-column label="命令下发时间" />
        <el-table-column label="命令回复时间" />
        <el-table-column label="查看命令" />
      </el-table>
    </el-row>
  </div>
</template>
<script lang="ts">
import { ref, reactive } from "vue"
import { type IPushCommandData } from "@/api/command"
import { pushCommandApi } from "@/api/command"
import { useRoute } from "vue-router"

export default {
  name: "CommandIndex",
  setup() {
    const route = useRoute()
    const tableData = ref<any[]>([])
    const gatewayId = ref(route.query.id)
    const commandForm: IPushCommandData = reactive({
      name: "testPush",
      order_json: "command 1",
      gateway_id: gatewayId.value
    })
    const handlePushCommand = () => {
      pushCommandApi(commandForm).then((res: any) => {
        console.log("回复", res.data)
      })
    }
    return {
      tableData,
      handlePushCommand
    }
  }
}
</script>
