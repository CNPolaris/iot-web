import { request } from "@/utils/service"
import type * as Monitor from "./types/monitor"

export function createMonitorApi(data: Monitor.CreateMonitorRequestData) {
  return request<IApiResponseData<{}>>({
    url: "/iot/api/monitor",
    method: "post",
    data
  })
}

export function deleteMonitorApi(id: string) {
  return request({
    url: "/iot/api/monitor/" + id,
    method: "delete"
  })
}

export function getMonitorDetailApi(id: string) {
  return request({
    url: "/iot/api/monitor/" + id,
    method: "get"
  })
}

export function getMonitorListApi(data: Monitor.getMonitorListRequestData) {
  return request<Monitor.MonitorListResponseData>({
    url: "/iot/api/monitor/list",
    method: "post",
    data
  })
}
