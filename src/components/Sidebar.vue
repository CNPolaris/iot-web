<template>
  <div class="sidebar">
    <el-menu
      class="sidebar-el-menu"
      :default-active="onRoutes"
      :collapse="sidebar.collapse"
      background-color="#324157"
      text-color="#bfcbd9"
      active-text-color="#20a0ff"
      unique-opened
      router
    >
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index" :key="item.index">
            <template #title>
              <i :class="item.icon" />
              <span>{{ item.title }}</span>
            </template>
            <template v-for="subItem in item.subs">
              <el-submenu v-if="subItem.subs" :index="subItem.index" :key="subItem.index">
                <template #title>{{ subItem.title }}</template>
                <el-menu-item v-for="(threeItem, i) in subItem.subs" :key="i" :index="threeItem.index">
                  {{ threeItem.title }}</el-menu-item
                >
              </el-submenu>
              <el-menu-item v-else :index="subItem.index" :key="subItem.index">{{ subItem.title }} </el-menu-item>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index" :key="item.index">
            <i :class="item.icon" />
            <template #title>{{ item.title }}</template>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { computed } from "vue"
import { useSidebarStore } from "@/stores/sidebar"
import { useRoute } from "vue-router"
export default {
  setup() {
    const items = [
      {
        icon: "el-icon-just-dashboard",
        index: "/dashboard",
        title: "实时数据"
      },
      {
        title: "设备",
        icon: "el-icon-just-shebei",
        subs: [
          {
            index: "/gateway",
            title: "网关"
          },
          {
            index: "/monitor",
            title: "监控"
          }
        ]
      },
      {
        title: "项目",
        icon: "el-icon-just-yingyongguanli",
        index: "/project/edit"
      },
      {
        title: "管理",
        icon: "el-icon-just-guanli",
        subs: [
          {
            index: "/admin/gateway",
            title: "网关"
          },
          {
            index: "/admin/monitor",
            title: "监控"
          }
        ]
      }
    ]

    const route = useRoute()
    const onRoutes = computed(() => {
      return route.path
    })

    const sidebar = useSidebarStore()

    return {
      items,
      onRoutes,
      sidebar
    }
  }
}
</script>

<style scoped>
.sidebar {
  display: block;
  position: absolute;
  left: 0;
  top: 70px;
  bottom: 0;
  overflow-y: scroll;
}
.sidebar::-webkit-scrollbar {
  width: 0;
}
.sidebar-el-menu:not(.el-menu--collapse) {
  width: 200px;
}
.sidebar > ul {
  height: 100%;
}
</style>
