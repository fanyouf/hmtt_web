module.exports = {
  configureWebpack: function (config) {
    // 覆盖webpack的配置
    // config.mode = 'production'
    // 如果当前是生产模式
    if (process.env.NODE_ENV === 'production') {
      // 在webpack的配置对象 config的 optimization属性的minimizer数组的第一个元素的options中设置....
      // 在打包之后的js中去掉console.log
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  },
  // https://cli.vuejs.org/zh/config/#publicpath
  // 设置打包后访问资源方式，以是相对路径来访问
  // dist目录下的index.html就可以直接双击打开
  publicPath: './'
}
