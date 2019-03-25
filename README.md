# bwsqjs


## axios 配置
https://mp.weixin.qq.com/s/wMflQxDsDO3aksLN0X_ZyQ

## 解决vant-tabbar 组件在刷新导致状态也被刷新
本来想通过vuex实现，但是页面刷新导致内存被释放因此也会导致状态消失，
网上的方法是数据转移到 localStorage或者其他持久化存储（例如indexDB）
这里我采用路由传参方法，现在解决当前页面刷新丢失状态，但是如果在浏览器直接输入地址也会丢失状态，可以在main里加上路由拦截来处理


### 解决post请求数据错误的问题
在请求的过程中使用的json数据提交给后台，导致一直请求不到数据，最后请求设置为fromdata请求成功。

先在文档引入`import qs from 'qs'`在axios.js配置文件里加上
```
// 添加请求拦截器
service.interceptors.request.use(
  (config) => {
    if (config.method === 'post' || config.method === 'put') {
      config.data = qs.stringify(config.data) //转换为表单模式
      config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    }
    // 请求发送前进行处理
    return config
  },
  (error) => {
    // 请求错误处理
    return Promise.reject(error)
  }
)
```

#### localStorage 存储的问题待解决
解决了存储的问题,创建store文件夹对store进行封装，为了解决刷新页面获取localStoreage数据，就直接在这里添加，用了模板字符串转换数据方便其他页面调用

```javascript
const state = {
  Url: 'http://bwwd.cs',
  user: null,
  token: `${localStorage.getItem('token')}`,
  userInfo: null
}
```
### 当在页跳转到另外页面底部的状态为改变

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Run your end-to-end tests
```
npm run test:e2e
```

### Run your unit tests
```
npm run test:unit
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
