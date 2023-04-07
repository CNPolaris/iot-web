export interface createGatewayRequestData {
  name: string
  project_id: string
  imei: string
  describes: string
}
export type IGatewayDetailData = {
  id: string
  name: string
  projectId: string
  gatewayKey: string
  createTime: string
  address: string
  describes: string
  status: number
}

export interface IUpdateGatewayData {
  id: string
  name: string
  gatewayKey: string
  createTime: string
  projectId: string
  status: number
}

export type GetGatewayDetailResponseData = IApiResponseData<IGatewayDetailData>

export type GetGatewayListRequestData = {
  page: number
  limit: number
  gatewayName: string
  gatewayId: string
}

export type GetGatewayListResponseData = IApiResponseData<{
  total: number
  size: number
  list: IGatewayDetailData[]
}>
