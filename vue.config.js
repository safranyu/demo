module.exports = {
  /** 区分打包环境与开发环境
   * process.env.NODE_ENV==='production'  (打包环境)
   * process.env.NODE_ENV==='development' (开发环境)
   * baseUrl: process.env.NODE_ENV==='production'?"https://cdn.didabisai.com/front/":'front/',
   */
  // 基本路径
  // publicPath: '/',
  publicPath: process.env.NODE_ENV === 'production'? 'http://api.vmccc.cn/': '/',
  // 输出文件目录
  outputDir: 'dist',
  // eslint-loader 是否在保存的时候检查
  lintOnSave: true,
  // use the full build with in-browser compiler?
  // https://vuejs.org/v2/guide/installation.html#Runtime-Compiler-vs-Runtime-only
  // compiler: false,
  // webpack配置
  // see https://github.com/vuejs/vue-cli/blob/dev/docs/webpack.md
  chainWebpack: () => { },
  // vux 相关配置,使用vux-ui
  configureWebpack: () => {},
  //如果想要引入babel-polyfill可以这样写
  // configureWebpack: (config) => {
  //   config.entry = ["babel-polyfill", "./src/main.js"]
  // },
  // vue-loader 配置项
  // https://vue-loader.vuejs.org/en/options.html
  // vueLoader: {},
  // 生产环境是否生成 sourceMap 文件 一般情况不建议打开
  productionSourceMap: false,
  // css相关配置
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps? 一般不建议开启
    sourceMap: false,
    // css预设器配置项
    loaderOptions: {
      //分离到postcss.config.js
      // postcss: {
      //   plugins: [
      //     require('postcss-pxtorem')({
      //       rootValue: 75.0, // 换算的基数
      //       unitPrecision: 3, // 最小精度，小数点位数
      //       selectorBlackList: ['vant-icon'], // 忽略转换正则匹配项 过滤的类名
      //       replace: true, //默认直接替换属性
      //       propList: ['*','!border*'], // ['!font*'] !不匹配属性（这里是字体相关属性不转换）
      //       minPixelValue: 6 // 替换的最小像素值
      //     })
      //   ]
      // }
    },
    // 启用 CSS modules for all css / pre-processor files.
    modules: false
  },
  // use thread-loader for babel & TS in production build
  // enabled by default if the machine has more than 1 cores
  parallel: require('os').cpus().length > 1,
  // 是否启用dll
  // See https://github.com/vuejs/vue-cli/blob/dev/docs/cli-service.md#dll-mode
  // dll: false,
  // PWA 插件相关配置
  // see https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-pwa
  pwa: {},
  // webpack-dev-server 相关配置
  devServer: {
    open: process.platform === 'darwin',
    host: 'localhost',
    port: 3003,
    https: false,
    hotOnly: true, // 热更新
    // proxy: 'http://localhost:8000', // 配置跨域处理,只有一个代理
    proxy: {
      "/api": {
        target: "http://bwwd.cs", // api主机
        changeOrigin: true,
        ws: true,
        pathRewrite: { '^/api' : '' }
      }
    },
    before: app => { }
  },
  // 第三方插件配置
  pluginOptions: {
    // ...
  }
}