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
      <van-cell>侵权</van-cell>
      <van-cell>色情</van-cell>
      <van-cell>暴力</van-cell>
      <van-cell>低俗</van-cell>
      <van-cell>不适</van-cell>
      <van-cell>错误</van-cell>
      <van-cell>其他</van-cell>
    </van-cell-group>
  </div>
</template>

<script>
export default {
  name: 'moreAction',
  data () {
    return {
      isReport: false
    }
  }
}
</script>

<style lang='less' scoped>
.more-action {
  border-radius: 4px;
}
</style>
