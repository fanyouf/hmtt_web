<template>
  <!-- 作者 -->
  <div class="author">
    <van-image round width="1rem" height="1rem" fit="fill"
    :src="author.aut_photo"/>
    <div class="text">
      <p class="name">{{author.aut_name}}</p>
      <p class="time">{{author.pubdate | relativeTime}}</p>
    </div>
    <slot>
      <!-- 默认插槽 -->
    </slot>
  </div>
  <!-- 作者 end-->
</template>

<script>
export default {
  name: 'Author',
  props: {
    author: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.author {
    padding: 10px 0;
    display: flex;
    .text {
      flex: 1;
      padding-left: 10px;
      line-height: 1.3;
      .name {
        font-size: 14px;
        margin: 0;
      }
      .time {
        margin: 0;
        font-size: 12px;
        color: #999;
      }
    }
  }
</style>
