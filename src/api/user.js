// 封装与用户相关的操作
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

/**
 * 获取用户的个人信息(包括：姓名，性别，生日......)
 */
export const getProfile = () => {
  return ajax({
    method: 'GET',
    url: '/app/v1_0/user/profile'
  })
}

/**
 * 获取用户自已的信息(系统信息：粉丝数量，点赞数量........)
 */
export const getInfo = () => {
  return ajax({
    method: 'GET',
    url: '/app/v1_0/user'
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

/**
 * 修改用户头像
 *
 * obj： 以formData格式保存参数
 */
export const updatePhoto = obj => {
  return ajax({
    method: 'PATCH',
    url: '/app/v1_0/user/photo',
    data: obj
    // data: {
    //   photo: xxxx
    // }
  })
}
