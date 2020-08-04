// 封装与频道相关的操作
import ajax from '@/utils/request'

/**
 * 获取用户频道
 */
export const getChannels = () => {
  return ajax({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}

// export const getChannels = () => {
//   return ajax({
//     method: ,
//     url,
//     参数.....
//   })
// }
