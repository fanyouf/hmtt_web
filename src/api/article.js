import ajax from '@/utils/request.js'

/**
 * 获取指定频道下的数据
 * @param {*} channelID 频道id
 * @param {*} timestamp 时间戳
 *
 * 参数名称    是否必须 示例 备注
channel_id  是      频道ID
timestamp   是      时间戳整数 单位毫秒 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
                    分页。
with_top    是      0或1 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含

 */
export const getArticles = (channelID, timestamp) => {
  return ajax({
    method: 'GET',
    url: '/app/v1_1/articles',
    params: {
      channel_id: channelID,
      timestamp,
      with_top: 1
    }
  })
}

// 总结
// 1. 按模块（article, user, channel....）。有利于协作。
// 2. 填空题
//     (1) method, url, params/data
//     (2) 函数名
//     (3) 参数
