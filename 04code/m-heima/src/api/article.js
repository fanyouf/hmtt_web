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
