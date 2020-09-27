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
