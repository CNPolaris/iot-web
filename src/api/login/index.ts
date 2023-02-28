import { request } from "@/utils/service"
import type * as Login from "./types/login"

export function loginApi(data: Login.ILoginData) {
  return request({
    url: "/iot/login",
    method: "post",
    data
  })
}
