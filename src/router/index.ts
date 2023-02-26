import { createRouter, createWebHashHistory } from "vue-router"
import Home from "../layout/index.vue"
import { getToken, getRole } from "../utils/cache/cookies"

const routes = [
  {
    path: "/",
    redirect: "/project"
  },
  {
    path: "/",
    name: "Home",
    component: Home,
    children: [
      {
        path: "/dashboard",
        name: "dashboard",
        meta: {
          title: "系统首页"
        },
        component: () => import(/* webpackChunkName: "dashboard" */ "../views/dashboard/index.vue")
      },
      {
        path: "/gateway",
        name: "Gateway",
        meta: {
          title: "网关设备"
        },
        component: () => import("@/views/gateway/index.vue")
      },
      {
        path: "/gateway/detail",
        name: "GatewayDetail",
        meta: {
          title: "网关详情"
        },
        component: () => import("@/views/gateway/detail.vue")
      },
      {
        path: "/monitor",
        name: "Monitor",
        meta: {
          title: "监控设备"
        },
        component: () => import("@/views/monitor/index.vue")
      },
      {
        path: "/monitor/preview",
        name: "MonitorPreview",
        meta: {
          title: "监控预览"
        },
        component: () => import("@/views/monitor/components/preview.vue")
      }
    ]
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录"
    },
    component: () => import(/* webpackChunkName: "login" */ "../views/login/index.vue")
  },
  {
    path: "/project",
    name: "Project",
    meta: {
      title: "我的项目"
    },
    component: () => import("@/views/project/index.vue")
  },
  {
    path: "/404",
    component: () => import("@/views/error/404.vue"),
    meta: {
      hidden: true
    },
    alias: "/:pathMatch(.*)*"
  },
  {
    path: "/:pathMatch(.*)*",
    name: "/ErrorPage",
    redirect: "/404",
    meta: {
      title: "拒绝访问"
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: routes
})
export function resetRouter() {
  try {
    router.getRoutes().forEach((route) => {
      const { name, meta } = route
      if (name && meta.roles?.length) {
        router.hasRoute(name) && router.removeRoute(name)
      }
    })
  } catch (error) {
    window.location.reload()
  }
}
export default router
