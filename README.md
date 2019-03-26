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

### localStorage 存储的问题待解决
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


### 在750px设计稿下，对使用vant组件导致过小解决方法

方法一：直接在`postcss.config.js`加上判断

```
const AutoPrefixer = require("autoprefixer");
const pxtorrem = require("postcss-pxtorem");

module.exports = ({ file }) => { 
  let rootValue; // 判断条件 请自行调整 我使用的是 mand-mobile ui 没有对vant引入进行测试
  if (file && file.dirname && file.dirname.indexOf('vant') > -1) {
    rootValue = 37.5;
  } else {
    rootValue = 75;
  }
  return {
    plugins: [
      pxtorrem({
        rootValue: rootValue, // 换算的基数
        unitPrecision: 3, // 最小精度，小数点位数
        selectorBlackList: ['vant-icon'], // 忽略转换正则匹配项 过滤的类名
        replace: true, //默认直接替换属性
        propList: ['*','!border*'], // ['!font*'] !不匹配属性（这里是字体相关属性不转换）
        minPixelValue: 2 // 替换的最小像素值
       }),
      AutoPrefixer({ browsers: ["last 20 versions", "android >= 4.0"] }) 
    ]
  };
}
```
方法二：采用postcss-px-to-viewport 转换vw单位
```
// postcss.config.js
const join = require('path').join
const tailwindJS = join(__dirname, 'tailwind.js')
module.exports = ({ file }) => {
  let vant // 判断条件 请自行调整 
  if (file && file.dirname && file.dirname.indexOf('vant') > -1) {
    vant = 375
  } else {
    vant = 750
  }
  return {
    plugins: [
      require('tailwindcss')(tailwindJS),
      require('postcss-px-to-viewport')({
        viewportWidth: vant,
        unitPrecision: 3,
        viewportUnit: 'vw',
        selectorBlackList: [''],
        minPixelValue: 1,
        mediaQuery: false
      })
    ]
  }
}
```

### 业务封装popup组件

代码前往>components>crowd>popup.vue

### vue 处理二进制流图片
http://www.qingpingshan.com/m/view.php?aid=59766
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
