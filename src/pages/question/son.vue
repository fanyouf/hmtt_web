<template>
  <div>
    <h1>子组件</h1>
    <p>msg:{{msg}}</p> <button @click="hClickMsg">修改属性msg</button>
    <div>arr: {{arr}}</div> <button @click="hClickArr">修改属性arr</button>
  </div>
</template>

<script>
export default {
  name: 'son',
  props: ['msg', 'arr'],
  methods: {
    hClickMsg () {
      // 会报错：不能修改父组件传入的prop
      this.msg = 'new msg'
    },
    hClickArr () {
      // 向数组中添加----- 间接修改了prop。操作是成功的，同时也修改了父组件中的数据
      this.arr.push('abc')

      // 直接赋值，这样也不对！
      // this.arr = [1, 2, 3, 'arr']
    }
    // 结论：如果从父组件中传入的props是引用数据类型(数组，对象),则在子组件中可以通过数组提供的api(push,slice......)
    // 来间接修改props
  }
}
</script>
