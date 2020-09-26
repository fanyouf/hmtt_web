module.exports = {
  plugins: {
    'postcss-pxtorem': {
      // rootValue: 转换px的基准值。
      // 例如
      // 一个元素宽是75px，则换成rem之后就是 2rem。
      // 一个元素宽是44px，则换成rem之后就是 44/37.5 = 1.1733333333333333rem
      rootValue: 37.5,
      // 能够把所有元素的px单位转成Rem
      propList: ['*']
    }
  }
}
