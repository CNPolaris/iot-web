import { request } from "./../utils/service"
import { IPostCommandData } from "./command"
import { request } from "../utils/service"

export interface IPushCommandData {
  name: string
  order_json: string
  gateway_id: string
}

export function pushCommandApi(data: IPostCommandData) {
  return request({
    url: "/iot/gateway/command/push",
    method: "post",
    data
  })
}
