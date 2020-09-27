token 处理

目标：

- 根据接口的要求，给请求添加token
- **把token保存在vuex**
- 在axios的请求拦截器添加token
- token持久化



## 理解token

什么是 Token？一个“令牌”（一串很长的字符串，由后端生成的），用来请求需要权限的接口用的。

- 它是由后端接口提供的

- 一般在用户登陆时，由后端接口返回

  ![image-20200704143421251](asset/image-20200704143421251.png)

- 在请求某些需要权限的接口时，要把这个token带上。

<img src="asset/image-20200108170328228.png" alt="image-20200108170328228" style="zoom:50%;" />

token就是你家小区的门禁卡。

## 演示token的作用

接着上面的操作去做：当用户登陆成功之后，再去发请求，去求 **接口：获取用户个人信息**。要注意这个接口是明确约定了必须要传递token值的。

![image-20200607143539178](asset/image-20200607143539178.png)

我们可以来测试一下这个后果。

### 添加功能

在api/user.js中，根据接口文档的要求，添加一个getInfo功能，用来它去调用接口。

```javascript
/**
 * 获取用户个人资料
 */
export const getProfile = () => {
  return ajax({
    method: 'GET',
    url: '/app/v1_0/user/profile',
    headers: {
      // Authorization: 'Bearer token值' 之间有空格
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTM4NTIyMjgsInVzZXJfaWQiOjExMDI0OTA1MjI4Mjk3MTc1MDQsInJlZnJlc2giOmZhbHNlfQ.gR880MifO8GIFG6PNh9eOZGGpfcwNRkK6MpI1upN93w'
    }
  })
}
```



### 调用功能

在src/views/login/index.vue这个组件去调用getInfo功能，来取用户的信息。

```javascript
import {getProfile } from '@/api/user'

 async hLogin () {
      // 尝试去调用一下获取用户的个人资料
      getProfile()
     ....
 }
```

### 测试

此时，点击登陆之后，去请求这个接口，会报错

![image-20200108174349170](asset/image-20200108174349170.png)

### 手动加上token

由于`user/profile`这个接口必须要加上token，我们可以手动去测试一下这个效果。

> 注意下面的token中只是当前调用接口返加的token。
>
> 在你的开发，你要使用从接口中实际返回的token，不要照抄下面的内容。

1. 从登陆成功之后的返回值中复制出来token

![image-20200108174549436](asset/image-20200108174549436.png)

2. 在请求`user/profile`时加上这个token

```javascript
/**
 * 获取用户个人资料
 */
export const getProfile = () => {
  return ajax({
    method: 'GET',
    url: '/app/v1_0/user/profile',
    headers: {
      // Authorization: 'Bearer token值' 之间有空格
      Authorization: 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJleHAiOjE1OTM4NTIyMjgsInVzZXJfaWQiOjExMDI0OTA1MjI4Mjk3MTc1MDQsInJlZnJlc2giOmZhbHNlfQ.gR880MifO8GIFG6PNh9eOZGGpfcwNRkK6MpI1upN93w'
    }
  })
}
```

- authorzation, Bearer 都是由这个项目的接口要求来定的。



## 把token保存在vuex

为了在任意组件之中都可以方便地使用token值，所以我们把token保存在vuex中。

> vuex就是用来管理公共数据的
>
> 它还有响应式的效果

### 设置vuex

在 `store/index.js` 中：

```javascript
export default new Vuex.Store({
  // 公共数据
  state: {
    tokenInfo: {}
  },
  // 通过mutations对修改公共数据
  mutations: {
    mSetToken (state, tokenObj) {
      state.tokenInfo = tokenObj
    }
  }
})
```

### 调用mutaion保存token信息

登录成功以后将数据存储到容器中

在login/index.vue中，修改hLogin的代码：在登陆成功之后，把token保存到vuex中

```diff
try {
        //  2. 发请求
        // (1) 引入axios， （2）传入接口所需的参数
        const result = await login(mobile, code)

        // 3. 登陆成功，保存token到 vuex
        this.$store.commit('mSetToken', result.data.data)

}
```

### 验证

![image-20200607145213462](asset/image-20200607145213462.png)



## 通过axios请求拦截器添加token

思路：

1. 上一步已经把token保存在了vuex中，这里只要在发出请求之前检查vuex中是否有token信息，有就直接加在headers中。
2. axios工具有一个请求拦截器，所有的axios请求在发出来之前都会经过 `请求拦截器`。



结论：在请求拦截器，获取vuex的token，补充上headers中。

src\utils\request.js

```diff
// 对axios进行二次封装
//    axios本身是一个独立的库，是对ajax的封装。为了方便在项目中使用，我们对它再次封装
// (1) 接口基地址
// (2) 请求，响应拦截器

import axios from 'axios'

+ // 在一个普通的.js文件（不是.vue组件）中，如何去获取vuex中的数据？
+ import store from '@/store/index.js'
// console.log('store', store)

const instance1 = axios.create({
  // 后端服务器1
  baseURL: 'http://ttapi.research.itcast.cn'
  // baseURL: 'http://api-toutiao-web.itheima.net'
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

+ // 添加请求拦截器 -- 所有的请求在发出去之前，都会到这里来
+ instance1.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 向本次请求中添加headers,设置token值
  // 从vuex中去获取token。
  const token = store.state.tokenInfo.token
  console.log('所有的请求在发出去之前，都会到这里来', store.state.tokenInfo, token)
  if (token) {
    config.headers.Authorization = `Bearer ${token}` // Bearer空格token  这个格式是后端要求的
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

const instance2 = axios.create({
  // 后端服务器2
  baseURL: 'http://api-toutiao-web.itheima.net'
  // timeout: 1000,
  // headers: {'X-Custom-Header': 'foobar'}
})

// const instance3 = axios.create({
//   // 后端服务器3
//   baseURL: 'http://api-toutiao-web.itheima.com'
//   // timeout: 1000,
//   // headers: {'X-Custom-Header': 'foobar'}
// })

export { instance1, instance2 }

// 默认导出intance1
export default instance1

```

我们可以在这里自动加上token。

- 在获取token要先判断一下，是否有token
- 这里在请求拦截器中设置了token之后，在发所有的请求时，都会自动给加上token.



## token持久化

Vuex 容器中的数据只是为了方便在其他任何地方能方便的获取登录状态数据，但是页面刷新还是会丢失数据状态，所以我们还要把**数据进行持久化**中以防止页面刷新丢失状态的问题。

### 刷新丢失状态的问题

vuex在刷新页面就消失了。就好像在程序中定义的变量一样，在程序重新运行时，值会恢复。



前端持久化常见的方式就是：

- 本地存储(**localstorage**)
- Cookie

上面的两个地方存数据都有一个共同的特点：刷新页面，数据还在！

这里我们以使用本地存储持久化用户状态为例。

基本的思路是：

- 用户登陆成功之后，保存token到本地存储**localstorage**
- 在vuex容器初始化时，使用本地存储中的值

为了操作方便，这里先封装一个用于操作本地存储的存储模块。

### 封装存储模块

创建 `src/utils/storage.js`  文件，实现三个基本的方法实现对localstorage的操作。具体如下：

并写入以下内容

```javascript
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

```

### 登录成功，保存token到localstorage

在调用登录接口，登陆成功以后，服务器会返回token信息给我们，我们要做的是：

- 将 token 保存到vuex中。

- 同时持久到到本地存储。

  src\store\index.js

```diff
import Vue from 'vue'
import Vuex from 'vuex'

+ import { setItem } from '@/utils/storage.js'
Vue.use(Vuex)
export default new Vuex.Store({
  // 保存公共数据
  state: {
    // 设置tokenInfo
    tokenInfo:  {}
  },
  mutations: {
    // 设置mutations来修改tokenInfo
    mSetTokenInfo (state, tokenObj) {
      state.tokenInfo = tokenObj

      // 把token信息持久化到localstorage中
+     setItem('tokenInfo', tokenObj)
    }
  },
  actions: {
  },
  modules: {
  }
})

```



检测：

![image-20200607155109288](asset/image-20200607155109288.png)

### 容器初始化去localstorage中取值

最后，在容器中使用本地存储中的数据进行初始化

```diff
import Vue from 'vue'
import Vuex from 'vuex'

+ import { getItem, setItem } from '@/utils/storage.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 保存公共数据
    // 在tokenInfo中保存token和refresh_token

    // tokenInfo的值是先从本地存储中取，取不到就用{}
+    tokenInfo: getItem('tokenInfo') || {}
  }
```

在设置vuex中的初值时，先从本地存储中取，如果取不到，则初始为空。



### 验证

刷新页面vuex中还有值，表示成功！



![image-20200704160052413](asset/image-20200704160052413.png)

![image-20200704160103860](asset/image-20200704160103860.png)

## 小结

与项目1不一样，这里对token的保存是通过vuex来实现的。由于vuex在页面刷新之后就清空了，

所以，还是要做持久化。



问： 为什么不直接将token放在sessionStorage，或者是localStorage中？而是要放在vuex中？

答：vuex中数据除了可以在全部的组件中共享之外，还有响应式的特点！

<img src="asset/image-20200108170023234.png" alt="image-20200108170023234" style="zoom:80%;" />



在项目1，是直接把token保存在localstorage中。
在项目2：把token保存在vuex中， 相比直接保存在localstorage中，有什么区别？

保存在vuex中：

	- 所有的组件都可以使用。
	- **响应式**的。
	- 刷新就会消失。

保存在localstorage中：

 - 所有的组件都可以使用。
 - 不是响应式的。
 - **刷新不会消失**。

为了同时得到这两个好处：响应式 + 刷新不会消失  ，采是是上面的这种解决方案。