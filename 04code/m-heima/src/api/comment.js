import request from '@/utils/request.js'

/**
 * 添加文章评论
 * @param {*} articleId
 * @param {*} content
 */
export const addComment = (articleId, content) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data: {
      target: articleId,
      content
    }
  })
}

/**
 * 获取评论
 * @param {*} articleId
 * @param {*} offset
 */
export const getComment = (articleId, offset) => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params: {
      type: 'a',
      source: articleId,
      offset
    }
  })
}
