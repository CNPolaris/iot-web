import { request } from "@/utils/service"
import type * as Address from "./types/serve"
import type * as Srs from "./types/srs"
export function getServeAddressList() {
  return request<Address.GetServeAddressData>({
    url: "/iot/api/serve/address",
    method: "get"
  })
}

export function getSrsServeSummariesV1Api() {
  return request<Srs.IGetSrsSummariesResponseData>({
    url: "/iot/v1/api/srs/summaries",
    method: "get"
  })
}

export function getSrsServeMeminfosV1Api() {
  return request<IApiResponseData<Srs.IMeminfoData>>({
    url: "/iot/v1/api/srs/meminfos",
    method: "get"
  })
}
