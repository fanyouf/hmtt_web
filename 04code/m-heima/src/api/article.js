import request from '@/utils/request.js'

/**
 * 根据频道id和时间戳获取文章列表
 * @param {*} channelId 频道编号
 * @param {*} timestamp 时间戳
 */
export const getArticles = (channelId, timestamp) => {
  const t = request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params: {
      channel_id: channelId,
      timestamp: timestamp,

      // 时间戳，
      // 1)下拉： 请求新的推荐数据:传当前的时间戳
      // 2)上拉：分页，请求历史推荐传指定的时间戳
      with_top: 1
    }
  })
  console.log('getChannels:', t)
  return t
}

/**
 * 对文章不感兴趣
 * @param {*} articleId 编号
 */
export const dislike = articleId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/dislikes',
    data: {
      target: articleId
    }
  })
}

/**
 * 举报文章
 * @param {*} articleId  文章编号
 * @param {*} reportType 举报类型
 */
export const report = (articleId, reportType) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/reports',
    data: {
      target: articleId,
      type: reportType
    }
  })
}
