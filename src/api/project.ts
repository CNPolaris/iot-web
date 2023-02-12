import { request } from "../utils/service"

export interface IGetProjectDataApi {
  page: number
  limit: number
}

export function getMyProjectApi(data: IGetProjectDataApi) {
  return request({
    url: "/iot/api/project",
    method: "get",
    data
  })
}
