export interface createGatewayRequestData {
  name: string
  project_id: string
}
export interface IGatewayDetailData {
  id: string
  name: string
  projectId: string
  gatewayKey: string
  createTime: string
}

export interface IUpdateGatewayData {
  id: string
  name: string
  gatewayKey: string
  createTime: string
  projectId: string
}
