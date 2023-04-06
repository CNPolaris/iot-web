import CacheKey from "@/constants/cacheKey"
/** 统一处理 Cookies */
import Cookies from "js-cookie"

export const getToken = () => {
  return Cookies.get(CacheKey.TOKEN)
}

export const setToken = (token: string) => {
  Cookies.set(CacheKey.TOKEN, token)
}

export const removeToKen = () => {
  Cookies.remove(CacheKey.TOKEN)
}

export const setEmail = (email: string) => {
  Cookies.set(CacheKey.EMAIL, email)
}

export const getEmail = () => {
  return Cookies.get(CacheKey.EMAIL)
}

export const removeEmail = () => {
  Cookies.remove(CacheKey.EMAIL)
}

export const setRole = (role: string) => {
  Cookies.set(CacheKey.ROLE, role)
}

export const getRole = () => {
  return Cookies.get(CacheKey.ROLE)
}

export const removeRole = () => {
  Cookies.remove(CacheKey.ROLE)
}

export const setCurRegion = (region: string) => {
  Cookies.set(CacheKey.CUR_REGION, region)
}

export const getCurRegion = () => {
  return Cookies.get(CacheKey.CUR_REGION)
}

export const removeCurRegion = () => {
  Cookies.remove(CacheKey.CUR_REGION)
}
