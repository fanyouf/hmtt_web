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
