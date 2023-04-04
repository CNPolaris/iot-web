import dayjs from "dayjs"

/** 格式化时间 */
export const formatDateTime = (time: string | number | Date) => {
  if (!time) {
    return "N/A"
  }
  const date = new Date(time)
  return dayjs(date).format("YYYY-MM-DD HH:mm:ss")
}

export const convertTime = (time: string | number) => {
  if (!time) {
    return "N/A"
  }
  let h = parseInt((time / 60 / 60) % 24)
  h = h < 10 ? "0" + h : h
  let m = parseInt((time / 60) % 60)
  m = m < 10 ? "0" + m : m
  let s = parseInt(time % 60)
  return h + ":" + m + ":" + s
}
