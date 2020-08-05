<template>
  <div class="more-action">
    <!-- 状态一 -->
    <van-cell-group v-if="!isReport">
      <!-- 直接向父组件抛出事件 -->
      <van-cell @click="$emit('dislike')">不感兴趣</van-cell>
      <van-cell is-link @click="isReport=true">反馈垃圾内容</van-cell>
      <van-cell>拉黑作者</van-cell>
    </van-cell-group>
    <!-- 状态二 反馈-->
    <van-cell-group v-else>
      <van-cell icon="arrow-left" @click="isReport=false">返回</van-cell>
      <!--
        @click="$emit('report', item.value)"
        向父组件抛出事件，传递举报的具体类型（数值）
       -->
      <van-cell
      v-for="item in reportTypeList"
      :key="item.value"
      @click="$emit('report', item.value)"
      >
        {{item.label}}
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import reportTypeList from '@/constant/report.js'
console.log(reportTypeList)
export default {
  name: 'MoreAction',
  data () {
    return {
      // reportTypeList: reportTypeList,
      reportTypeList,
      isReport: false // 是否是处于状态二：反馈
    }
  }
}
</script>

<style lang='less' scoped>
.more-action {
  border-radius: 4px;
}
</style>
