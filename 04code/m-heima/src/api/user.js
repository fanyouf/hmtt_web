
import request from '@/utils/request.js'

export const login = async (mobile, code) => {
  return await request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data: { mobile, code }
  })
}

// 前端要开始工作了，你需要
// 1. 接口文档
// 2. 设计稿，原型
//
