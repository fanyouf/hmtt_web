
import request from '@/utils/request.js'

export const login = (mobile, code) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data: { mobile, code }
  })
}

export const getProfile = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/profile'
    // headers: {
    //   Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MDU1OTIxMzMsInVzZXJfaWQiOjExMDI0OTA1MjI4Mjk3MTc1MDQsInJlZnJlc2giOmZhbHNlfQ.vda_FbLD6OLz88rZWs_1hXzamQcZsDmzOksZGKzpNDM'
    // }
  })
}

/**
 * 取消关注
 * @param {*} userId
 */
export const unFollowed = userId => {
  return request({
    method: 'DELETE',
    url: '/app/v1_0/user/followings/' + userId
  })
}

/**
 * 加关注
 * @param {*} userId
 */
export const followed = userId => {
  return request({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}

/**
 * 获取用户自已的信息
 */
export const getInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}

/**
 * 编辑用户信息
 * data: {
 *  name,
 *  gender,
 *  birthday: 生日，格式'2018-12-20'
 * }
 */
export const updateUserInfo = (data) => {
  return request({
    method: 'PATCH',
    url: '/app/v1_0/user/profile',
    data
  })
}

// 前端要开始工作了,跳过
// 1. 接口文档
// 2. 设计稿，原型
// 直接开始写api/xxx.js
// 利于分工合作
