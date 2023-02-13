import router from "@/router"
import { getToken } from "@/utils/cache/cookies"
import NProgress from "nprogress"
import "nprogress/nprogress.css"

NProgress.configure({ showSpinner: false })

router.beforeEach(async (to, _from, next) => {
  NProgress.start()
  // 判断该用户是否已经登录
  document.title = `元理云IOT控制台`
  if (!getToken() && to.path !== "/login") {
    next("/login")
    NProgress.done()
  } else if (to.meta.permission) {
    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    role === "admin" ? next() : next("/404")
  } else {
    next()
    NProgress.done()
  }
})

router.afterEach(() => {
  NProgress.done()
})
