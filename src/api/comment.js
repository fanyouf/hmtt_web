// 评论相关的操作全封装在这里

import ajax from '@/utils/request'

/**
 * 对文章进行评论
 * @param {*} articleId 文章编号
 * @param {*} content 评论内容
 */
export const addComment = (articleId, content) => {
  return ajax({
    method: 'POST',
    url: '/app/v1_0/comments',
    data: {
      target: articleId,
      content
    }
  })
}

/**
 * 对文章评论进行回复
 * @param {*} commentId  评论id
 * @param {*} articleId 文章id
 * @param {*} content 回复的内容
 */
export const addCommentReply = (commentId, articleId, content) => {
  return ajax({
    method: 'POST',
    url: '/app/v1_0/comments',
    data: {
      target: commentId,
      content,
      art_id: articleId
    }
  })
}

/**
 * 获取文章的评论
 * @param {*} articleId 文章编号
 * @param {*} offset （翻页）获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
 */
export const getComments = (articleId, offset) => {
  return ajax({
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
 * 获取文章评论的回复
 * @param {*} replyId 评论编号
 * @param {*} offset （翻页）获取评论数据的偏移量，值为评论id，表示从此id的数据向后取，不传表示从第一页开始读取数据
 */
export const getCommentReplys = (replyId, offset) => {
  return ajax({
    method: 'GET',
    url: '/app/v1_0/comments',
    params: {
      type: 'c',
      source: replyId,
      offset
    }
  })
}
