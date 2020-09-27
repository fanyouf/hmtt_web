// 对localstrage的操作的简单封装

export const setItem = (name, obj) => {
  localStorage.setItem(name, JSON.stringify(obj))
}

// export const geItem = name => JSON.parse(localStorage.getItem(name))

export const getItem = name => {
  return JSON.parse(localStorage.getItem(name))
}

export const removeItem = name => {
  localStorage.removeItem(name)
}
