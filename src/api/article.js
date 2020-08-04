// 封装与文章相关的操作

import ajax from '@/utils/request'

/*
Query
channel_id 是  频道ID
timestamp 是 时间戳整数 单位毫秒 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
with_top 是 0或1 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
*/
/*
 * 用来获取指定频道下边的文章列表
 * @param {*} channelId 频道id
 * @param {*} timestamp 时间戳整数 单位毫秒 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
 */
export const getArticles = (channelId, timestamp) => {
  return ajax({
    method: 'GET',
    url: '/app/v1_1/articles',
    params: {
      channel_id: channelId,
      timestamp: timestamp,
      with_top: 1
    }
  })
}

// 对axios来说，
// 如果要通过body去传参，就要写data      ---  post
// 如果要通过query去传参，就要写params   ---  get
