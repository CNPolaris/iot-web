import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "./App.vue"
import router from "./router"
import "@/router/permission"
import installElementPlus from "./plugins/element"

import "./assets/css/icon.css"

const app = createApp(App)
installElementPlus(app)

app.use(createPinia())
app.use(router)

app.mount("#app")
