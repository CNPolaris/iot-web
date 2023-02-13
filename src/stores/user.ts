import store from "@/stores"
import { defineStore } from "pinia"
import { removeToKen } from "@/utils/cache/cookies"
import router, { resetRouter } from "@/router"

export const useUserStore = defineStore("user", () => {
  const logout = () => {
    removeToKen()
    resetRouter()
  }
  return { logout }
})

/** 在setup外使用 */
export function useUserStoreHook() {
  return useUserStore(store)
}
