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
  //注册图形验证码
  getSigninImg: baseUrl + '/BwwdMoblie.php/index/getVerifyInfoNew.html'
}