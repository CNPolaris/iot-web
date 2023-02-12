import moment from "moment"
export function formatDate(data: any) {
  return moment(new Date(data)).format("YYYY-MM-DD HH:mm:ss")
}
