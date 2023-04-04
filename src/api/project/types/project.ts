export interface ICreateProjectRequestData {
  name: string
  describes: string
  serverId: number
}

export type IProjectDetailData = {
  id: string
  name: string
  describes: string
  createTime: string
  createUser: string
  status: number
  serverName: string
}

type IProjectDetailResponseData = {
  id: string
  name: string
  createUser: string
  createTime: string
}
