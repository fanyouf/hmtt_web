// 搜索相关的操作全封装在这里

import ajax from '@/utils/request'

/**
 * 根据搜索关键字获取搜索建议
 * @param {*} keyword 关键字
 */
export const getSuggestion = keyword => {
  return ajax({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q: keyword
    }
  })
}

/**
 * 根据查询关键字和页码，获取搜索结果
 * @param {*} q 搜索关键字
 * @param {*} page 页码
 */
export const getSearch = (q, page = 1) => {
  return ajax({
    method: 'GET',
    url: '/app/v1_0/search',
    params: {
      q,
      page
    }
  })
}
