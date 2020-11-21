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

/**
 * 获取查询结果
 * @param {*} keyword 关键字
 * @param {*} page 页码
 */
export const getSearchResult = (keyword, page) => {
  return request({
    method: 'GET',
    url: '/app/v1_0/search',
    params: {
      q: keyword,
      page: page
    }
  })
}
