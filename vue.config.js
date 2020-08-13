module.exports = {
  // configureWebpack 配置是vuecli中提供的一个配置项
  // 用来对webpack打包做更加精细的控制
  // 后面的函数中，config就是当前打包时采用的webpack配置
  // 我们可以在这个函数中，对config进行修改
  configureWebpack: (config) => {
    console.log(config)
    // config.mode = 'development'
  },
  // https://cli.vuejs.org/zh/config/#publicpath
  // 设置打包后访问资源方式，以是相对路径来访问
  // dist目录下的index.html就可以直接双击打开
  publicPath: './'
}
