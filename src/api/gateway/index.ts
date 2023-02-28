import { request } from "@/utils/service"
import type * as Gateway from "./types/gateway"
import type * as Command from "./types/command"
import type * as Task from "./types/task"

export function getGatewayCountApi(id: any) {
  return request({
    url: "/iot/api/gateway/count/" + id,
    method: "GET"
  })
}

export function getGatewayListApi(id: any) {
  return request({
    url: "/iot/api/gateway/list/" + id,
    method: "GET"
  })
}

export function getGatewayDetailApi(id: any) {
  return request({
    url: "/iot/api/gateway/" + id,
    method: "GET"
  })
}

export function createGatewayApi(data: Gateway.createGatewayRequestData) {
  return request({
    url: "/iot/api/gateway",
    method: "post",
    data
  })
}

export function pushCommandApi(data: Command.IPushCommandData) {
  return request({
    url: "/iot/gateway/command/push",
    method: "post",
    data
  })
}

export function CreateTaskApi(gatewayId: string, data: Task.ICreateTaskData) {
  return request({
    url: "/iot/api/gateway/task/" + gatewayId,
    method: "post",
    data
  })
}

export function getAllTaskApi(gatewayId: string, param: Task.IGetTaskParams) {
  return request({
    url: "/iot/api/gateway/task/" + gatewayId,
    method: "get",
    params: param
  })
}

export function pushTaskApi(gatewayId: string, taskId: string) {
  return request({
    url: "/iot/api/gateway/task/push/" + gatewayId + "/" + taskId,
    method: "get"
  })
}
