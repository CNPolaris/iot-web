import { request } from "@/utils/service"
import type * as Gateway from "./types/gateway"

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
