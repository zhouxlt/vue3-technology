module.exports = {
  lintOnSave: false,
  devServer: {
    host: '10.1.2.42', 
    port: 8080,
    // 配置浏览器自动访问
    open: true,
    // proxy: 'http://10.1.2.61:8002'
    // proxy: 'http://10.1.3.26:8002' // Martingale本机服务
    // proxy: 'https://martingale.higgsasset.com'
    // proxy: 'https://h.martingale.higgsasset.com',
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/project' : '/'
}