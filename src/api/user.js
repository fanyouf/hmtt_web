import ajax from '@/utils/request'
// 对所有用户相关的操作进行封装

/**
 * 用户登陆
 * @param {string} mobile 手机号
 * @param {string} code 密码
 */
export const login = (mobile, code) => {
  // ajax() 这个函数的返回值是一个promise
  return ajax({
    url: '/app/v1_0/authorizations',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}

/**
 * 获取用户自已的信息
 */
export const getInfo = () => {
  return ajax({
    method: 'GET',
    url: '/app/v1_0/user'
  })
}

/**
 * 获取用户档案信息
 */
export const getProfile = () => {
  return ajax({
    method: 'GET',
    url: '/app/v1_0/user/profile'
    // headers: {
    //   // Authorization: 'Bearer token值' 之间有空格
    //   Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE2MDExODQ0MDIsInVzZXJfaWQiOjExMDI0OTA1MjI4Mjk3MTc1MDQsInJlZnJlc2giOmZhbHNlfQ.8A8wyLwEvRrz3cdkPe3x7juskspAF1OnDsGMWYf0oIw'
    // }
  })
}

export const logout = (mobile, code) => {
  return ajax({
    url: '/app/v1_0/authorizations/xxxxx',
    method: 'POST',
    data: {
      mobile,
      code
    }
  })
}

/**
 * 关注用户
 * @param {*} userId 用户的id
 */
export const followUser = userId => {
  return ajax({
    method: 'POST',
    url: '/app/v1_0/user/followings',
    data: {
      target: userId
    }
  })
}

/**
 * 取消关注用户
 * @param {*} userId 用户的id
 */
export const unFollowUser = userId => {
  return ajax({
    method: 'DELETE',
    url: '/app/v1_0/user/followings/' + userId
  })
}

/**
 * 修改个人的三项基本信息
 * @param {*} obj 要修改的内容
 * obj {
 *  name: 姓名,
 *  gender: 性别：男(0) ,女(1)
 *  birthday: 2010-12-20
 * }
 */
export const updateUserInfo = obj => {
  return ajax({
    method: 'PATCH',
    url: '/app/v1_0/user/profile',
    data: obj
  })
}

// const result = await ajax({
//   url: '/app/v1_0/authorizations',
//   method: 'POST',
//   data: {
//     mobile,
//     code
//   }
// })
