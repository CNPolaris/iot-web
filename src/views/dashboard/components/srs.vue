<template>
  <el-row gutter="20">
    <el-col :span="8" :xs="24">
      <el-card shadow="never">
        <el-descriptions border title="SRS" column="1">
          <el-descriptions-item label="运行" label-class-name="my_label">
            {{ convertTime(srsSelf.srs_uptime) }}
          </el-descriptions-item>
          <el-descriptions-item label="CPU" label-class-name="my_label">
            {{ srsSelf.cpu_percent }} / {{ srsSystem.cpus_online }}
          </el-descriptions-item>
          <el-descriptions-item label="内存" label-class-name="my_label">
            {{ convertMemorize(srsMem.realInUse) }} /
            {{ convertMemorize(srsMem.memTotal) }}
          </el-descriptions-item>
          <el-descriptions-item label="网络" label-class-name="my_label"> 30 </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </el-col>
    <el-col :span="8" :xs="24">
      <el-card shadow="never">
        <el-descriptions border title="OS信息" column="1">
          <el-descriptions-item label="运行" label-class-name="my_label"> {{}} </el-descriptions-item>
          <el-descriptions-item label="CPU" label-class-name="my_label"> 30 </el-descriptions-item>
          <el-descriptions-item label="内存" label-class-name="my_label"> 30 </el-descriptions-item>
          <el-descriptions-item label="负载" label-class-name="my_label"> 30 </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </el-col>
    <el-col :span="8" :xs="24">
      <el-card shadow="never">
        <el-descriptions border title="负载信息" column="1">
          <el-descriptions-item label="外网" label-class-name="my_label"> 30 </el-descriptions-item>
          <el-descriptions-item label="内网" label-class-name="my_label"> 30 </el-descriptions-item>
          <el-descriptions-item label="连接" label-class-name="my_label"> 30 </el-descriptions-item>
          <el-descriptions-item label="磁盘" label-class-name="my_label"> 30 </el-descriptions-item>
        </el-descriptions>
      </el-card>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { getSrsServeSummariesV1Api, getSrsServeMeminfosV1Api } from "@/api/serve"
import { ISrsSelfData, ISrsSystem, IMeminfoData } from "@/api/serve/types/srs"
import { reactive } from "vue"
import { convertTime } from "@/utils/date"
import { convertMemorize } from "@/utils/code"
export default {
  setup() {
    let srsSelf: ISrsSelfData = reactive({
      version: "",
      pid: 0,
      ppid: 0,
      argv: "",
      cwd: "",
      mem_kbyte: 0,
      mem_percent: 0,
      cpu_percent: 0,
      srs_uptime: 0
    })
    let srsSystem: ISrsSystem = reactive({
      cpu_percent: 0,
      disk_read_KBps: 0,
      disk_write_KBps: 0,
      disk_busy_percent: 0,
      mem_ram_kbyte: 0,
      mem_ram_percent: 0,
      mem_swap_kbyte: 0,
      mem_swap_percent: 0,
      cpus: 0,
      cpus_online: 0,
      uptime: 0,
      ilde_time: 0,
      load_1m: 0,
      load_5m: 0,
      load_15m: 0,
      net_sample_time: 0,
      net_recv_bytes: 0,
      net_send_bytes: 0,
      net_recvi_bytes: 0,
      net_sendi_bytes: 0,
      srs_sample_time: 0,
      srs_recv_bytes: 0,
      srs_send_bytes: 0,
      conn_sys: 0,
      conn_sys_et: 0,
      conn_sys_tw: 0,
      conn_sys_udp: 0,
      conn_srs: 0
    })
    let srsMem: IMeminfoData = reactive({
      buffers: 0,
      cached: 0,
      memActive: 0,
      memFree: 0,
      memTotal: 0,
      notInUse: 0,
      ok: true,
      percent_ram: 0,
      percent_swap: 0,
      realInUse: 0,
      sample_time: 0,
      swapFree: 0,
      swapTotal: 0
    })
    const handleGetSrsInfo = () => {
      getSrsServeSummariesV1Api().then((res) => {
        if (res.code === 200) {
          srsSelf = Object.assign(srsSelf, res.data.self)
          srsSystem = Object.assign(srsSystem, res.data.system)
        }
      })
      getSrsServeMeminfosV1Api().then((res) => {
        if (res.code == 200) {
          srsMem = Object.assign(srsMem, res.data)
        }
      })
    }
    handleGetSrsInfo()
    return {
      srsSelf,
      srsSystem,
      srsMem,
      convertTime,
      convertMemorize
    }
  }
}
</script>
<style>
.my_label {
  width: 70px;
}
</style>
