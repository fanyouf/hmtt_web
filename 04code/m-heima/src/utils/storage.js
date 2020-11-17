// 消除魔术字符串
const TOKEN_STR = 'tokenInfo'

export const getToken = () => {
  return JSON.parse(localStorage.getItem(TOKEN_STR))
}

export const setToken = tokenInfo => {
  localStorage.setItem(TOKEN_STR, JSON.stringify(tokenInfo))
}

export const removeToken = () => {
  localStorage.removeItem(TOKEN_STR)
}
