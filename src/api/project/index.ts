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

export function getProjectDetailApi(projectId: String) {
  return request<IApiResponseData<Project.IProjectDetailData>>({
    url: "/iot/api/project/" + projectId,
    method: "get"
  })
}

export function deleteProjectApi(projectId: String) {
  return request({
    url: "/iot/api/project/" + projectId,
    method: "delete"
  })
}
