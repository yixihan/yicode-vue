// yyyy-MM-dd 转为 yyyy/MM/dd
const underlineReg = /(\d{4})-(\d{2})-(\d{2})/;


// yyyy-MM-dd to yyyy/MM/dd
export function dashToUnderline(date) {
  return date.replace(underlineReg,"$1/$2/$3");
}

// yyyy/MM/dd to yyyy-MM-dd
export function underlineToDash(date) {
  let arr = date.split ("/");
  let year = arr[0]
  let month = arr[1] < 10 ? '0' + arr[1] : arr[1]
  let day = arr[2] < 10 ? '0' + arr[2] : arr[2]
  return  year + "-" + month + "-" + day
}

export function formatMonth (date) {
  return date.replace(underlineReg,"$1-$2")
}