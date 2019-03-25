let baseUrl = '/api' // 本地代理

switch (process.env.NODE_ENV) {
  case 'dev':
    baseUrl = 'http://wx.bwwd.cn/' // 测试环境url
    break
  case 'pre':
    baseUrl = 'http://wx.bwwd.cn/' // 预上线环境url
    break
  case 'production':
    baseUrl = 'http://wx.bwwd.cn/' // 生产环境url
    break
}

export default baseUrl