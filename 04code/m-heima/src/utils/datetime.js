import dayjs from 'dayjs'
import reTime from 'dayjs/plugin/relativeTime'
import 'dayjs/locale/zh-cn'

// var reTime = require('dayjs/plugin/relativeTime')
dayjs.extend(reTime) // 使用插件
// 语言包
// require('dayjs/locale/zh-cn')

dayjs.locale('zh-cn') // 全局使用简体中文

export const relativeTime = val => {
  return dayjs().to(dayjs(val))
}

// export const xxxx = () => {

// }
