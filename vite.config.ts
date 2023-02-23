import { resolve } from "path"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"

// https://vitejs.dev/config/
export default defineConfig({
  base: "/clouds/",
  plugins: [vue(), vueJsx()],
  resolve: {
    alias: {
      // "@": fileURLToPath(new URL("./src", import.meta.url))
      "@": resolve(__dirname, "./src")
    }
  },
  server: {
    port: 3380,
    proxy: {
      "^/iot": {
        target: "http://127.0.0.1:8080",
        changeOrigin: true
      }
    }
  },
  build: {
    /** 消除打包大小超过 500kb 警告 */
    chunkSizeWarningLimit: 2000,
    /** Vite 2.6.x 以上需要配置 minify: "terser", terserOptions 才能生效 */
    minify: "terser",
    /** 在打包代码时移除 console.log、debugger 和 注释 */
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: true,
        pure_funcs: ["console.log"]
      },
      format: {
        /** 删除注释 */
        comments: false
      }
    },
    /** 打包后静态资源目录 */
    assetsDir: "assert"
  }
})
