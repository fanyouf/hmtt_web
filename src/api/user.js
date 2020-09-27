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

export const getProfile = (mobile, code) => {
  ajax({
    url: '/app/v1_0/authorizations/xxxxx',
    method: 'POST',
    data: {
      mobile,
      code
    }
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

// const result = await ajax({
//   url: '/app/v1_0/authorizations',
//   method: 'POST',
//   data: {
//     mobile,
//     code
//   }
// })
