export function createCode() {
  const len = 10
  const codeList = []
  const chars = "ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz0123456789"
  const charsLen = chars.length
  for (let i = 0; i < len; i++) {
    codeList.push({
      code: chars.charAt(Math.floor(Math.random() * charsLen))
    })
  }
  const code = codeList.map((item) => item.code).join("")
  return code
}

export const convertMemorize = (limit: any) => {
  let size = ""
  if (limit < 1024) {
    size = limit.toFixed(2) + "KB"
  } else if (limit < 1024 * 1024) {
    size = (limit / 1024).toFixed(2) + "MB"
  } else {
    size = (limit / (1024 * 1024)).toFixed(2) + "GB"
  }
  const sizeStr = size + ""
  const index = sizeStr.indexOf(".")
  const dou = sizeStr.substring(index + 1, 2)
  if (dou == "00") {
    return sizeStr.substring(0, index) + sizeStr.substring(index + 3, 2)
  }
  return size
}
