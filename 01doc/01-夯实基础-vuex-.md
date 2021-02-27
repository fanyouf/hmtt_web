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



## 用mapState来使用公共数据

用mapState把公共数据（vuex.store） 映射 到本组件内部的**计算属性**中

```
<template>
  <div>
    A组件
    {{$store.state.books}} --{{c1}}
    <hr>
    {{books}}
    <com-b/>
    <com-c></com-c>
  </div>
</template>
<script>
// 引入组件
import ComB from './ComB.vue'
import ComC from './ComC.vue'
// 用mapState把公共数据（vuex.store） 映射 到本组件内部的计算属性中

// 步骤
// 1. 导入辅助函数mapState，它是在vuex中定义的一个工具函数。
//  es6 按需导入 import { mapState } from 'vuex' 
import { mapState } from 'vuex'

// 2. mapState(['books'])
// const res = mapState(['books'])
// res的结果是一个对象： { books: function() {}}
// console.log('mapState', res)

export default {
  components: {
    ComB, ComC
  },
  computed: {
    c1 () {
      return 'c1'
    },
    // books: function() {}
    // ..res： 把res这个对象合并到computed对象中
    // ...res
    ...mapState(['books'])
  },
  created () {
    console.log(this.$store.state.books)
  }
}
</script>
<style scoped>
div {
  padding:5px;
  border:1px solid #ccc;
  margin:3px;
}
</style>
```

## 在mapState映射时，取别名

```
{
  computed: {
      ...mapState({'新名字'： vuex.store.state中的名字})
  }
}
```



```
{{新名字}}
```

> 取别名的时候是要把[]改成{}
>
> mapState（）中的参数支持两种写法： [] ， ｛｝



## 在组件内部通过mutations来修改公共数据

步骤：

1. 在vuex中定义mutations
2. 在组件内部通过this.$store.commit来调用mutations



```
// state: 用来保存所有的公共数据
  state: {
    num: 100,
    books: ['js技术内幕','js手册']
  },
mutations: {
    // 每一项都是一个函数
    // 参数：你可以定义两个参数：
      // 第一个参数是必须的，表示当前的state，
      // 第二个参数是可选的，表示载荷(在执行函数时要传入的数据)
    addBook (state, bookName) {
      console.log(state, bookName)
      state.books.push(bookName)
    },
    add10 (state) {
      state.num +=10
    }
  },
```



在组件内使用

```
// 在组件内部要去调用mutations
      // 格式是： this.$store.commit('mutations的名字',要传递的数据)
      // this.$store.commit: 提交
      // this.$store.commit('addBook', '一本新书') 我们通知vuex，我这里提交了一个 变化
      //                   变化的名字是addBook，同时要附加 "一本新书" 这个数据
      this.$store.commit('addBook', '一本新书')
```

如果commit时的mutations名字与定义时不一样，则会报错：

```
[vuex] unknown mutation type: addBook123
```



## $store.commit的格式

两种格式：

```javascript
1. 简单格式
this.$store.commit('mutations的名字', 要传的数据)
- (1) 无传递的数据
- (2) 传递的数据比较简单
2. 复杂格式
this.$store.commit({
  type: 'mutations的名字',
  属性名1：值1
  属性名2：值2
  ....
})
```



示例：

定义mutations

```
addBook (state, {name, price}) {
      // console.log(state, bookObj)
      state.books.push({name, price})
      // state.books.push(bookObj)
    }
```

调用：

```
this.$store.commit({
       type: 'addBook',
       name: '精通js',
       price: 80
})
```



## mutations映射成methods来使用

思路：通过mapMutations这个函数把Vuex中的mutations映射（转化成）本组件内的methods

步骤：

- 导入辅助函数 import { mapMutations } from 'vuex'

- 映射

  ```
  methods: {
      ...mapMutations(['addN']),
      hAdd10 (){
        this.$store.commit('add10')
      }
    },
  ```

  上面的代码中，其实相当于methods中有了两个函数：hAdd10, addN

- 使用：

  直接用: this. addN()



## mutations映射时，取别名

```
methods: {
    ...mapMutations(['addN']),
    // {'新名字': '在vuex中的mutations的名字'}
    ...mapMutations({'tianjia10': 'add10'}),
    hAdd10 (){
      // this.$store.commit('add10')
      this.tianjia10()
    }
  },
```



## getters的使用

1. 作用：在state中的数据的基础上，进一步对数据进行加工得到新数据
2. 步骤：
   1. 定义
   2. 使用
      1. $store.getters.xxxxx
      2. mapGetters

```
state: {
    num: 100,
    books: [
      {name: 'js技术内幕(1)', price: 100}, 
      {name: 'js技术内幕(2)', price: 80}, 
      {name: 'js技术内幕(3)', price: 50}
    ]
  },
    // computed
  // getters的作用是：在state的基础上派生出新的数据项--类似于computed
  getters: {
    numberOfBooks (state) {
      return state.books.length
    },
    // 统计价格>60元的书的数量
    numberOf60 (state) {
      return state.books.filter(item=>item.price>60).length
    }
  },
```

---

```
<template>
  <div id="app">
    <p>一共有{{$store.state.books.length}}本书</p>
    <p>一共有{{$store.getters.numberOfBooks}}本书</p>
    <p>一共有{{$store.getters.numberOf60}}本书>60元</p>
     <p>一共有{{num}}本书</p>
    <p>一共有{{numberOf60}}本书>60元</p>
    <com-a></com-a>
    <com-d></com-d>
  </div>
</template>

<script>
import ComA from './components/ComA.vue'
import ComD from './components/ComD.vue'
import { mapGetters } from 'vuex'
export default {
  name: 'App',
  components: {
    ComA, ComD
  },
  // 把getters映射成组件的计算属性
  computed: {
    ...mapGetters(['numberOf60']),
    // 换个名字
    ...mapGetters({num: 'numberOfBooks'})
  }
}
</script>
```



## 用actions来发请求获取数据并设置到state中

actions：

作用： 做异步操作

调用格式：

- this.$store.dispatch
- mapActions成为组件的methods

格式：

```
state: {
    num: 100,
    books: [
      {name: 'js技术内幕(1)', price: 100}, 
      {name: 'js技术内幕(2)', price: 80}, 
      {name: 'js技术内幕(3)', price: 50}
    ]
  },
mutations: {
    // 每一项都是一个函数
    // 参数：你可以定义两个参数：
      // 第一个参数是必须的，表示当前的state，
      // 第二个参数是可选的，表示载荷(在执行函数时要传入的数据)
    // addBook (state, bookName) {
    //   console.log(state, bookName)
    //   state.books.push(bookName)
    // },
    addBook (state, {name, price}) {
      // console.log(state, bookObj)
      state.books.push({name, price})
      // state.books.push(bookObj)
    }
},    
actions: {
    // getBooks (context) {
    //   发ajax请求.then(res => {
    //     // 调用 mutations
    //     context.commit()
    //   })
    // }
    getBooks (context, params) {
      console.log('getbooks的查询参数是', params)
      axios({
        url: 'https://www.fastmock.site/mock/37d3b9f13a48d528a9339fbed1b81bd5/book/api/books',
        method: 'GET'
      }).then(res => {
        console.log(res)
        context.commit({
          type:'addBook',
          name: res.data.data[0].bookname,
          price: res.data.data[0].price
        })
        // console.log(context)
      })
    }
  },
```

过程：

- ajax获取回来数据  ---》 调用mutations  ---》修改数据

使用

```
import { mapGetters, mapActions } from 'vuex'
export default {
  name: 'App',
  methods: {
    // 把this.$store.dspatch('getBooks')  <====> this.getBooks()
    ...mapActions(['getBooks'])
  },
  created () {
    // this.$store.dispatch('getBooks')
    this.getBooks({name: 'js'})
  },
  // 把getters映射成组件的计算属性
  computed: {
    ...mapGetters(['numberOf60']),
    // 换个名字
    ...mapGetters({num: 'numberOfBooks'})
  }
}
```

