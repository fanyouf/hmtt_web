// 搜索相关

import ajax from '@/utils/request'

/**
 * 根据搜索关键字，获取搜索结果
 * @param {string} keyword 搜索关键字
 */
export const getSuggestion = (keyword) => {
  return ajax({
    url: '/app/v1_0/suggestion',
    method: 'GET',
    params: {
      q: keyword
    }
  })
}
