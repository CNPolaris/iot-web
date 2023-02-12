import { defineStore } from "pinia"

export const useProjectStore = defineStore("project", {
  state: () => {
    return {
      project_id: -1
    }
  }
})
