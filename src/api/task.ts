import { request } from "../utils/service"

export interface ICreateTaskData {
  type: number
  clockType: number
  time: number
  taskJson: string
}

export interface IGetTaskParams {
  page: number
  limit: number
}

export function CreateTaskApi(gatewayId: string, data: ICreateTaskData) {
  return request({
    url: "/iot/api/gateway/task/" + gatewayId,
    method: "post",
    data
  })
}

export function getAllTaskApi(gatewayId: string, param: IGetTaskParams) {
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
