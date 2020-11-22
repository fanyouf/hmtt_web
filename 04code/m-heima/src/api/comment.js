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

/**
 * 获取评论的回复
 * @param {*} commentId
 * @param {*} offset
 */
export const getCommentReply = (commentId, offset) => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params: {
      type: 'c',
      source: commentId,
      offset
    }
  })
}

/**
* 添加文章评论回复
* @param {*} commentId  评论id
* @param {*} articleId  文章id
* @param {*} content 回复的内容
*/
export const addCommentReply = (commentId, articleId, content) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data: {
      target: commentId,
      art_id: articleId,
      content
    }
  })
}
