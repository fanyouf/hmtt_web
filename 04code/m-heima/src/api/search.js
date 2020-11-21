import request from '@/utils/request.js'

/**
 * 获取搜索建议
 * @param {*} keyword 关键字
 */
export const getSuggetion = (keyword) => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q: keyword
    }
  })
}
