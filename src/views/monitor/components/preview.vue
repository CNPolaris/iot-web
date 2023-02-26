<template>
  <el-row>
    <el-col :span="24">
      <video autoplay controls width="100" :muted="true" id="myVideo" />
    </el-col>
  </el-row>
</template>

<script>
import flvjs from "flv.js/dist/flv.min.js"
export default {
  name: "Monitor",
  data() {
    return {
      flvPlayer: null,
      // url: "http://106.55.191.65:8888/flv?port:1935&app=live&stream=demo"
      url: "http://106.55.191.65:8888/live/demo.flv"
    }
  },
  mounted() {
    this.videoFlvPlay()
  },
  beforeUnmount() {
    this.destroyVideo()
  },
  methods: {
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
            autoCleanupSourceBuffer: true //是否自动缓存
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
        var videoElement = document.getElementById("myVideo")
        var flvPlayer = flvjs.createPlayer({
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
