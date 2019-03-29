import baseUrl from '../baseUrl'
export default {
  // 首页轮播图
  getSwiperImg: baseUrl + '/BwwdMoblie.php/Recognize/index.html',
  // 获取众筹商品列表
  matches: baseUrl + '/BwwdMoblie.php/Recognize/crowdFunding.html',
  // 获取商品详情信息
  goodsDetails: baseUrl + '/BwwdMoblie.php/Recognize/periodsInfo.html',
  // 获取商品购买信息post
  getGoodsBuy: baseUrl + '/BwwdMoblie.php/Recognize/getGoodsInfo.html',
  // 获取用户登录信息
  getUserInfo: baseUrl + '/BwwdMoblie.php/Recognize/myRecognize.html',
  // 用户登录
  getUserLogin: baseUrl + '/BwwdMoblie.php/index/login.html',
  // 获取国家
  getState: baseUrl + '/BwwdMoblie.php/index/getCountry.html',
  // 发送短信
  setNote: baseUrl + '/BwwdMoblie.php/Tools/send_msg.html',
  //注册手机验证码验证
  setVerify: baseUrl + '/BwwdMoblie.php/index/checkVerificationCode.html',
  // 文章列表
  getMediaList: baseUrl + '/BwwdMoblie.php/Recognize/mediaList.html',
  // 文章详情
  getArticleInfo: baseUrl + '/BwwdMoblie.php/Recognize/article.html'
}