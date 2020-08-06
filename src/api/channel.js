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

/**
 * 获取系统中所有的频道
 */
export const getAllChannels = () => {
  return ajax({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}

/**
 * 间接实现添加频道功能。把当前用户选中的所有的频道全部传入（不是只传入新增的, 不要把 推荐 频道也传入）
 * channels: [{ id: 频道id1, seq:1 },{ id: 频道id2, seq:2 },....,{ id: 频道idn, seq:n }]
 */
export const addChannel = (channels) => {
  return ajax({
    method: 'PUT',
    url: '/app/v1_0/user/channels',
    data: {
      channels: channels
    }
  })
}

// export const getChannels = () => {
//   return ajax({
//     method: ,
//     url,
//     参数.....
//   })
// }
