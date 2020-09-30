<template>
  <div class="more-action">
    <van-cell-group v-show="!isReport">
      <!-- 子组件直接 “告状”： 通知父组件 有人点击了不兴趣 -->
      <van-cell @click="$emit('dis-like')" title="不感兴趣"/>
      <van-cell title="反馈垃圾内容" @click="isReport=true" is-link />
      <van-cell title="拉黑作者"/>
    </van-cell-group>

    <van-cell-group v-show="isReport">
      <van-cell icon="arrow-left" title="返回" @click="isReport=false"/>
      <!-- 子组件直接 “告状”： 通知父组件 有人点击举报，传出举报类型编号 -->
      <van-cell v-for="item in reportsArr" :key="item.value"
      @click="$emit('report', item.value)">
        {{item.label}}
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import reportsArr from '@/constants/report.js'
// console.log(reportsArr)
export default {
  name: 'moreAction',
  data () {
    return {
      reportsArr,
      isReport: false
    }
  },
  methods: {
    f1 () {

    }
  }
}
</script>

<style lang='less' scoped>
.more-action {
  border-radius: 4px;
}
</style>
