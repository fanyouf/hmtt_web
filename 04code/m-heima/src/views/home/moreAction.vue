<template>
  <div class="more-action">
    <!-- 状态一 -->
    <van-cell-group v-if="!isReport">
      <van-cell @click="$emit('uninterested')">不感兴趣</van-cell>
      <van-cell is-link @click="isReport=true">反馈垃圾内容</van-cell>
      <van-cell>拉黑作者</van-cell>
    </van-cell-group>

    <!-- 状态二 反馈-->
    <van-cell-group v-else>
      <van-cell icon="arrow-left" @click="isReport=false">返回</van-cell>
      <van-cell
      v-for="item in reportTypeList"
      :key="item.value"
      @click="$emit('report', item.value)"
      >{{item.label}}</van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import reportTypeList from '@/constant/reports.js'
export default {
  name: 'MoreAction',
  data () {
    return {
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
