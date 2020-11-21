// 消除魔术字符串
const HISTORY_STR = 'HistoryInfo'

export const getHistory = () => {
  return JSON.parse(localStorage.getItem(HISTORY_STR))
}

export const setHistory = HistoryInfo => {
  localStorage.setItem(HISTORY_STR, JSON.stringify(HistoryInfo))
}

export const removeHistory = () => {
  localStorage.removeItem(HISTORY_STR)
}
