import Mock from 'mockjs'

// export default Mock.mock('http://test.cn/buyRecord', "get", {
//   'name': '@name',
//   'age|1-10': 10
// })
let mockUserInfo = {
  "code": 200,
  "data": {
    "fullName": "@CNAME", // 随机生成中文人名
    "userId": 1000234234001,
  }
}
export default Mock.mock(RegExp('http://test.cn/buyRecord'+".*"), "get", (options) => {
   // 最佳实践，将请求和参数都打印出来，以便调试
  //   let url = options.url
  //   let regexp = new RegExp(/\?+(\w)/)
  //  console.debug(url);
   return Mock.mock(mockUserInfo);
})