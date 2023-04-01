export type GetMonitorResponseData = IApiResponseData<{
  list: {
    id: string
    name: string
  }[]
}>
export type CreateMonitorRequestData = {
  name: string
  describes: string
  projectId: string
}

export type getMonitorListRequestData = {
  page: number
  limit: number
  projectId: string
}

export type MonitorItemResp = {
  id: string
  name: string
  createTime: string
  status: number
}

export type MonitorListResponseData = IApiResponseData<{
  total: number
  size: number
  list: MonitorItemResp[]
}>
