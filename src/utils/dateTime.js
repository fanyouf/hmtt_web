import dayjs from 'dayjs'

// 1. 引入dayjs自己的插件
var relTime = require('dayjs/plugin/relativeTime')
// 2. 注册插件。则它会给dayjs添一些独特的方法(to, from)
dayjs.extend(relTime)

// 语言包
require('dayjs/locale/zh-cn')
dayjs.locale('zh-cn') // 全局使用简体中文

// val 是一个日期，转成相对日期
// export const relativeTime = function (val) {
//   // const d = dayjs('2019-09-09T00:31:12').add(1, 'year') // 处理
//   // console.log(d)
//   // return 'ccccccc' + val
//   return dayjs().to(dayjs(val))
// }
export const relativeTime = val => dayjs().to(dayjs(val))
