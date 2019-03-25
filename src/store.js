import Vue from "vue";
import Vuex from "vuex";
import * as types from './store/types'
import mutations from './store/mutations'
import actions from './store/actions'
Vue.use(Vuex);

const state = {
  Url: 'http://bwwd.cs',
  user: null,
  token: `${localStorage.getItem('token')}`,
  userInfo: null
  // active: 0 // tabbar导航的默认值
}
export default new Vuex.Store({
  state,
  mutations,
  actions
});
