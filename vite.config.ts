import { resolve } from "path"

import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"

// https://vitejs.dev/config/
export default defineConfig({
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
  }
})
