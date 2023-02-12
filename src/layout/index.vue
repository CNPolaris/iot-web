<template>
  <div class="about">
    <v-header />
    <v-sidebar />
    <div class="content-box" :class="{ 'content-collapse': sidebar.collapse }">
      <div class="content">
        <router-view v-slot="{ Component }" :key="$route.fullPath">
          <transition name="fade-transform" mode="out-in">
            <!-- <keep-alive :include="tags.nameList"> -->
            <component :is="Component" :key="key" />
            <!-- </keep-alive> -->
          </transition>
        </router-view>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { useSidebarStore } from "@/stores/sidebar"
import vHeader from "../components/Header.vue"
import vSidebar from "../components/Sidebar.vue"
import { computed } from "vue"
import { useRoute } from "vue-router"
export default {
  components: {
    vHeader,
    vSidebar
  },
  setup() {
    const sidebar = useSidebarStore()
    const route = useRoute()
    const key = computed(() => {
      return route.path
    })
    return {
      sidebar,
      key
    }
  }
}
</script>
