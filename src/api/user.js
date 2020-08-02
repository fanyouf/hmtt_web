// 封装与用户相差的操作
import ajax from '@/utils/request'

/**
 * 登陆
 * @param {*} mobile 手机号
 * @param {*} code 密码
 */
export const login = (mobile, code) => {
  return ajax({
    method: 'POST', // 接口请求的方式
    url: '/app/v1_0/authorizations', // 接口的地址
    data: { // 如果接口约定是 Body传参-- 请求体， 要通过data去写数据
      mobile: mobile,
      code: code
    }
  })
}

export const getProfile = () => {
  return ajax({
    method: 'GET',
    url: '/app/v1_0/user/profile',
    headers: {
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTYzNTgyMDYsInVzZXJfaWQiOjExMDI0OTA1MjI4Mjk3MTc1MDQsInJlZnJlc2giOmZhbHNlfQ.vQ4JPJHR0f4nEctYLwEW3Fah-9J76QQnIzrVtdY6sWY'
    }
  })
}
