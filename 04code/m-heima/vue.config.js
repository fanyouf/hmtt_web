module.exports = {
  publicPath: './',
  configureWebpack: config => {
    // config 就是本次打包时，vuecli采用的配置
    // 你可以进行修改
    config.devtool = 'none'
    console.log(config)
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
      // 在webpack的配置对象 config的 optimization属性的minimizer数组的第一个元素的options中设置....
      // 在打包之后的js中去掉console.log
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    } else {
      // 为开发环境修改配置...
    }
  }
}
