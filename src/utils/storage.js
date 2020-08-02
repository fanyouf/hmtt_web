// 对localstorage的操作进行封装

// 保存到localStorage中的数据是对象
export const setItem = (name, obj) => {
  localStorage.setItem(name, JSON.stringify(obj))
}

export const getItem = name => {
  return JSON.parse(localStorage.getItem(name))
}

export const removeItem = name => {
  localStorage.removeItem(name)
}
