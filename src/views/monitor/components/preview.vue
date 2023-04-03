<template>
  <el-row>
    <el-col :span="24">
      <video autoplay controls width="100" :muted="true" id="myVideo" />
    </el-col>
  </el-row>
</template>

<script>
import flvjs from "flv.js/dist/flv.min.js"
import { getMonitorDetailApi } from "@/api/monitor"
import { useRoute } from "vue-router"
import { ElMessage } from "element-plus"
export default {
  name: "Monitor",
  data() {
    return {
      flvPlayer: null,
      // url: "http://106.55.191.65:8888/flv?port:1935&app=live&stream=demo"
      url: "http://106.55.191.65:8888/live/demo.flv",
      route: useRoute()
    }
  },
  mounted() {
    // this.videoFlvPlay()
  },
  beforeUnmount() {
    this.destroyVideo()
  },
  created() {
    this.getMonitorUrl()
  },
  methods: {
    getMonitorUrl() {
      // this.url = this.router.query.id
      getMonitorDetailApi(this.route.query.monitorId).then((res) => {
        if (res.code === 200) {
          this.url = "http://127.0.0.1:8081/live/" + res.data.monitorKey + ".flv" // 后期要改的
          this.videoFlvPlay()
        } else {
          ElMessage.error("监控预览失败")
          this.router.push("/monitor")
        }
      })
    },
    videoFlvPlay() {
      if (flvjs.isSupported()) {
        if (this.flvPlayer) {
          this.flvPlayer.pause()
          this.flvPlayer.unload()
          this.flvPlayer.detachMediaElement()
          this.flvPlayer.destroy()
        }
        this.flvPlayer = flvjs.createPlayer(
          {
            type: "flv",
            url: this.url
          },
          {
            cors: true, //是否跨域
            enableWorker: true, //是否多线程工作
            anableStashBuffer: false, //是否启用缓存
            stashInitialSize: 384, //缓存大小(kb) 默认384kb
            autoCleanupSourceBuffer: false //是否自动缓存
          }
        )
        this.flvPlayer.attachMediaElement(document.getElementById("myVideo"))
        this.flvPlayer.load()
        this.flvPlayer.play()
        //报错重连
        this.flvPlayer.on(flvjs.Events.ERROR, (errType, errDetail) => {
          console.log("errType:", errType)
          console.log("errorDetail:", errDetail)
          if (this.flvPlayer) {
            this.destroyVideo()
            this.videoFlvPlay()
          }
        })
      }
    },
    destroyVideo() {
      if (this.flvPlayer) {
        this.flvPlayer.pause()
        this.flvPlayer.unload()
        this.flvPlayer.detachMediaElement()
        this.flvPlayer.destroy()
        this.flvPlayer = null
      }
    },
    videoPlayer() {
      if (flvjs.isSupported()) {
        const videoElement = document.getElementById("myVideo")
        const flvPlayer = flvjs.createPlayer({
          type: "flv",
          url: "url" //你的url地址
        })
        flvPlayer.attachMediaElement(videoElement)
        flvPlayer.load()
        flvPlayer.play()
      }
    }
  }
}
</script>
<style>
video {
  width: 100%;
  height: auto;
}
</style>
