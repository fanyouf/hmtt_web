// 提供日期相关的功能
// 1. 引入dayjs这个包
import dayjs from 'dayjs'

// 2. 封装功能，向外导出
export const formatTime = (val) => {
  return dayjs(val).format('YYYY年MM月DD日')
}
