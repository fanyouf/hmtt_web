import request from '@/utils/request.js'

/**
 * 获取用户频道列表
 */
export const getChannels = () => {
  const t = request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
  console.log('getChannels:', t)
  return t
}

/**
 * 获取系统中全部的频道
 */
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}

/**
 *
 * @param {*} channels
 * channels: [ {id: 频道的id, seq: 顺序序号 }， {id: 频道的id, seq: 顺序序号}]
 */
export const addChannel = (channels) => {
  return request({
    method: 'PUT',
    url: '/app/v1_0/user/channels',
    data: {
      channels
    }
  })
}

/**
 * 删除订阅频道
 * @param {*} channelId  要删除频道的id
 */
export const delChannel = channelId => {
  return request({
    method: 'DELETE',
    url: '/app/v1_0/user/channels',
    data: {
      channels: [channelId]
    }
  })
}
