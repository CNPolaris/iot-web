import { request } from "@/utils/service"

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
