// 消除魔术字符串
const USERINFO_STR = 'USERINFO'

export const getUserInfo = () => {
  return JSON.parse(localStorage.getItem(USERINFO_STR))
}

export const setUserInfo = userInfo => {
  localStorage.setItem(USERINFO_STR, JSON.stringify(userInfo))
}

export const removeUserInfo = () => {
  localStorage.removeItem(USERINFO_STR)
}
