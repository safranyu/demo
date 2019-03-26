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
