import api from '../index'
import urls from './urls'

const header = {}
// const data = {}
export default {
  matches(params, header, data) {
    // return出去了一个promise
    return api.post(urls.matches, params, header, data)
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
  },
  getState(data) {
    return api.post(urls.getState, header, data)
  },
  setNote(params, header, data) {
    return api.post(urls.setNote,params, header, data)
  },
  setVerify(params, header, data) {
    return api.post(urls.setVerify, params, header, data)
  },
  getMediaList(params) {
    return api.get(urls.getMediaList, params, header)
  },
  getArticleInfo(params) {
    return api.get(urls.getArticleInfo, params, header)
  }
}