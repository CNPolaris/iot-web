import { defineStore } from "pinia"

export const useSidebarStore = defineStore("sidebar", {
  state: () => {
    return {
      /**侧边栏默认开启 */
      collapse: true
    }
  },
  getters: {},
  actions: {
    handleCollapse() {
      this.collapse = !this.collapse
    }
  }
})
