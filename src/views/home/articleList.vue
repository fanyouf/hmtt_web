<template>
<!-- 它的目标：显示它对应的那个频道下的文章信息 -->
  <div class="scroll-wrapper">
    {{channel.name}} 频道的 文章列表组件
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell v-for="item in list" :key="item" :title="item" />
    </van-list>
  </div>
</template>

<script>
export default {
  name: 'ArticleList',
  props: ['channel'],
  data () {
    return {
      list: [], // 数据
      loading: false, // 是否正在加载
      finished: false // 是否所有的数据全部加载完成
    };
  },
  methods: {
    // List 组件通过loading和finished两个变量控制加载状态，
    // 当组件滚动到底部时，会触发load事件并将loading设置成true。
    // 此时可以发起异步操作并更新数据，数据更新完毕后，将loading设置成false即可。
    // 若数据已全部加载完毕，则直接将finished设置成true即可。

    // 1. 如果当前的内容不够一屏 ，它会自动去调用onLoad去加载数据
    // 2. 组件滚动到底部时，它会再次去触发onLoad

    onLoad () {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }

        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成, 组件滚动到底部时，它不会再去触发onLoad
        if (this.list.length >= 100) {
          this.finished = true;
        }
      }, 1000);
    }
  }
}
</script>

<style>

</style>
