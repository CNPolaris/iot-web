export interface ICreateProjectRequestData {
  name: string
  describes: string
}

export interface IProjectDetailData {
  id: string
  name: string
  describes: string
  createTime: string
}

type IProjectDetailResponseData = {
  id: string
  name: string
  createUser: string
  createTime: string
}
