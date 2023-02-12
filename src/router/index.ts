import { createRouter, createWebHashHistory } from "vue-router"
import Home from "../layout/index.vue"
import { getToken, getRole } from "../utils/cache/cookies"

const routes = [
  {
    path: "/",
    redirect: "/dashboard"
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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  // document.title = `${to.meta.title} | 元理云`;
  document.title = `IOT控制台`
  const role = getRole()
  if (!role && to.path !== "/login") {
    next("/login")
  } else if (to.meta.permission) {
    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    role === "admin" ? next() : next("/403")
  } else {
    next()
  }
})

export default router
