// 提供日期相关的功能
// 1. 引入dayjs这个包
import dayjs from 'dayjs'

// 引入 dayjs的插件，来做相对时间的格式化
var rTime = require('dayjs/plugin/relativeTime')
dayjs.extend(rTime)

require('dayjs/locale/zh-cn')
// require('dayjs/locale/ca')
dayjs.locale('zh-cn') // 全局使用简体中文
// dayjs.locale('ca')
// 2. 封装功能，向外导出
export const formatTime = val => {
  return dayjs(val).format('YYYY年MM月DD日')
}

export const relativeTime = val => dayjs().to(dayjs(val))

// export const relativeTime = val => {
//   return dayjs().to(dayjs(val))
// }
