import { request } from "./../utils/service"

export interface ILoginData {
  email: string
  password: string
}
export function loginApi(data: ILoginData) {
  return request({
    url: "/iot/login",
    method: "post",
    data
  })
}
