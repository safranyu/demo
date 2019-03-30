import Mock from 'mockjs'

// export default Mock.mock('http://test.cn/buyRecord', "get", {
//   'name': '@name',
//   'age|1-10': 10
// })
var Random = Mock.Random
let mockUserInfo = {
  "code": 200,
  "data": [{
    "order_id": "@id", // 随机生成中文人名
    "order_sn": "@id()",
    "order_status" : 1,
    "currency": "@last()",
    "add_time": "@now",
    "goods_name": "@ctitle",
    "goods_amount": '@string("number", 3)',
    "goods_number": '@string("number", 1)',
    "price": '@string("number", 2)',
    "pay_ratio": "20%",
    "images": Random.image('126x92')
  }]
}
let mockUserInfos = {
  "code": 200,
  "data": [{
    "order_id": "@id", // 随机生成中文人名
    "order_sn": "@id()",
    "order_status" : 2,
    "currency": "@las",
    "add_time": "@now",
    "goods_name": "@ctitle",
    "goods_amount": '@string("number", 3)',
    "goods_number": '@string("number", 1)',
    "price": '@string("number", 2)',
    "pay_ratio": "20%",
    "images": Random.image('200x100')
  }]
}
export default Mock.mock(RegExp('http://test.cn/buyRecord'+".*"), "get", (options) => {
   // 最佳实践，将请求和参数都打印出来，以便调试
  let url = options.url
  let objParame = parseQuery(url)
   
  if (objParame.t == 0) {
    return Mock.mock(mockUserInfo);
  } else if (objParame.t == 1) {
    return Mock.mock(mockUserInfos)
  }
   
})

function parseQuery(url) {
  let queryObj={};
  let reg=/[?&]([^=&#]+)=([^&#]*)/g;
  let querys=url.match(reg);
  if(querys){
    for(var i in querys){
      let query=querys[i].split('=');
      let key=query[0].substr(1),
      value=query[1];
      queryObj[key]?queryObj[key]=[].concat(queryObj[key],value):queryObj[key]=value;
    }
  }
  return queryObj;
}