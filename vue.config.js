module.exports = {
  devServer: {
    host: 'localhost',
    port: 8080,
    proxy: {
      // 这个对应本地的api接口
      '/api': {
        target: 'https://www.imooc.com',
        changeOrigin: true,
        pathRewroter: {
          // 将所有有api的接口的api字符产变成空
          '/api': ''
        }
      }
    }
  }
}
