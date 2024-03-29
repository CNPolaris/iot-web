import CacheKey from "@/constants/cacheKey"

export const setNowProject = (projectId: string) => {
  localStorage.setItem(CacheKey.PROJECT, projectId)
}

export const getNowProject = () => {
  return localStorage.getItem(CacheKey.PROJECT)
}

export const removeNowProject = () => {
  return localStorage.removeItem(CacheKey.PROJECT)
}

export const setNowProjectKey = (projectKey: string) => {
  localStorage.setItem(CacheKey.PROJECT_KEY, projectKey)
}

export const getNowProjectKey = () => {
  return localStorage.getItem(CacheKey.PROJECT_KEY)
}

export const removeNowProjectKey = () => {
  return localStorage.removeItem(CacheKey.PROJECT_KEY)
}
