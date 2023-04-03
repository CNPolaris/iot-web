import { request } from "@/utils/service"
import type * as Address from "./types/serve"

export function getServeAddressList() {
  return request<Address.GetServeAddressData>({
    url: "/iot/api/serve/address",
    method: "get"
  })
}
