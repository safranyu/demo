import api from '../index'
import urls from './urls'

const header = {}
// const data = {}
export default {
  matches(params) {
    // return出去了一个promise
    return api.get(urls.matches, params, header)
  },
  goodsDetails(params) {
    return api.get(urls.goodsDetails, params, header)
  },
  getGoodsBuy(params, data) {
    return api.post(urls.getGoodsBuy, params, header, data)
  },
  getSwiperImg(params){
    return api.get(urls.getSwiperImg, params, header)
  },
  getUserLogin(params, header, data) {
    return api.post(urls.getUserLogin, params, header, data)
  },
  getUserInfo(params, header, data) {
    return api.post(urls.getUserInfo, params, header, data)
  }
}