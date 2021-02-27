vuex

## 基本介绍

作用： 用来管理多个组件之间（整个项目）需要共享的数据

特点：

- 它已经在vuecli中集成了安装的环节；如果选中了，就会自动写store/index.js



基本格式：

store/index.js

```
// 1. 导入vue
import Vue from 'vue'
// 2. 导入 vuex --- 学习的重点
import Vuex from 'vuex'
console.log(Vuex)
// Vue.use 框架中提供的api，用来以vue插件的方式来使用Vuex
// 类似有：Vue.use(vueRouter)
// Vue.use(对象)， 对象中会有一个install方法
Vue.use(Vuex)

// export default: es6的默认导出。
// 这个被导出的对象在main.js中使用.

// new Vuex.Store: 实例化一个对象，构造器是Vuex.Store
export default new Vuex.Store({
  state: {
    num: 100
  },
  mutations: {
    add10 (state) {
      state.num +=10
    }
  },
  actions: {
  },
  modules: {
  }
})

```

main.js

```javascript
import Vue from 'vue'
import App from './App.vue'

// 导入store/index.js中 new Vuex.Store()的对象
import store from './store' // 简写： store/index.js

// 在生产模式下，关掉提示（vue在某些代码异常时会有提示）
// 类似于上线之后，不要再用console.log()
Vue.config.productionTip = false

new Vue({
  // 把store挂载到Vue实例上。类似router
  // store 是一个非常 特殊 的配置项，用来承担vuex的功能
  store,  // 写全： store: store
  render: h => h(App)
  // render: function(h) {
  //   return h(App)
  // }
}).$mount('#app')

// (new Vue()).$mount('#app') :把vue对象挂载到一个id名为app的元素上
// 由于这个main.js中的代码最后会被webpack注入到public/index.html中，
// 所以这里的#app就是public/index.html中的div

// $mount: 是vue对象的一个方法，把vue实例的功能呈现在 id名为app的元素上 。

// render: 是一个配置项，它的作用是为用指定当前vue实例的渲染函数（说明vue对象里面有什么东西）
//         它的属性值是一个函数，这个函数返回 h(App)的结果，等价于是说
//         这个vue实例中装入了App这个组件
```



## 定义并使用公共数据-state



- 在state中设置初始数据
- 在任意组件中通过：this.$store.state.数据项名来访问

```
export default new Vuex.Store({
  // state: 用来保存所有的公共数据
  state: {
    num: 100,
    books: ['js技术内幕','js手册']
  },
  mutations: {
    add10 (state) {
      state.num +=10
    }
  },
  actions: {
  },
  modules: {
  }
})
```

$store是固定写法：表示这里上面定义的new Vuex.Store()对象

```
 {{$store.state.books}}
 created () {
    console.log(this.$store.state.books)
  }
```

