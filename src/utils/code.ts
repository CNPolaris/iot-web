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
