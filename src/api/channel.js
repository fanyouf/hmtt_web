import ajax from '@/utils/request'

/**
 * 获取用户频道列表
 */
export const getChannels = () => {
  return ajax({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}

/**
 * 获取所有频道
 */
export const getAllChannels = () => {
  return ajax({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}

/**
 * 添加频道
 * @param {*} channels
 *    [{id, seq}, {id, seq}]
 */
export const addChannel = (channels) => {
  return ajax({
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
  return ajax({
    method: 'DELETE',
    url: '/app/v1_0/user/channels',
    data: {
      channels: [channelId]
    }
  })
}
