export interface createGatewayRequestData {
  name: string
  project_id: string
}
export type IGatewayDetailData = {
  id: string
  name: string
  projectId: string
  gatewayKey: string
  createTime: string
  address: string
}

export interface IUpdateGatewayData {
  id: string
  name: string
  gatewayKey: string
  createTime: string
  projectId: string
}

export type GetGatewayDetailResponseData = IApiResponseData<IGatewayDetailData>
