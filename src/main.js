import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./registerServiceWorker";

import "amfe-flexible/index.js";
import "./vant";
// import api from "./assets/js/plugins/http.js"; //http ajax axios封装方法
// import api from "./assets/js/plugins/axios.js"
// Vue.prototype.$http = api; //全局绑定axios方法
import api from './assets/js/api/install'
Vue.use(api)
Vue.config.productionTip = false;


router.beforeEach((to, form, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) { // 添加页面title
    document.title = to.meta.title
  }
  // 验证 token，存在才跳转
  let token = localStorage.getItem('token')
  if (to.meta.requireAuth) {
    if (token) {
      next()
    } else {
      next({
        path: '/login',
        query: { redirect: to.fullPath } // 将跳转的路由path作为参数，登录成功后跳转到该路由
      })
    }
  } else {
    next()
  }
  next();
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
