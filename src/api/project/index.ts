import { request } from "@/utils/service"
import type * as Project from "./types/project"
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

export function createProjectApi(data: Project.ICreateProjectRequestData) {
  return request({
    url: "/iot/api/project",
    method: "post",
    data
  })
}
