
module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      // 这个对应本地的api接口
      '/api': {
        target: 'http://mall-pre.springboot.cn',
        changeOrigin: true,
        pathRewrite: {
          // 将所有有api的接口的api字符产变成空
          '/api': ''
        }
      }
    }
  },
  // 用于生产打包代码转码变化
  productionSourceMap: false,
  // 删除预加载
  chainWebpack: (config) => {
    config.plugins.delete('prefetch')
  }
}
