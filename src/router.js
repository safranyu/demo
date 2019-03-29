import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      meta: {
        active: 0,
        navShow: true,
        title: '百万社群'
      },
      component: Home
    },
    {
      path: '/crowd',
      name: 'crowd',
      meta: {
        active: 1,
        navShow: true,
        title: '众筹',
      },
      component: () => import( "./views/crowd.vue")
    },
    {
      path: '/my',
      name: 'my',
      meta: {
        title: '我的',
        active: 2,
        navShow: true,
        requireAuth: true // 当前路由需要校验，不需要就不用写
      },
      component: () => import("./views/my.vue")
    },
    {
      path: '/my/buyRecord',
      name: 'buyRecord',
      meta: {
        title: '购买详情',
        active: 2,
        requireAuth: true // 当前路由需要校验，不需要就不用写
      },
      component: () => import("./components/my/buyRecord.vue")
    },
    {
      path: '/crowd/goodsinfo/:id',
      name: 'goodsinfo',
      meta: {
        title: '商品详情',
        requireAuth: false // 当前路由需要校验，不需要就不用写
      },
      component: () => import("./components/details/details.vue")
    },
    {
      path: '/medialist/:id',
      name: 'medialist',
      meta: {
        title: '文章列表',
        navShow: false
      },
      component: () => import("./views/medialist.vue")
    },
    {
      path: '/article/:id',
      name: 'article',
      meta: {
        title: '文章详情',
        navShow: false
      },
      component: () => import("./components/details/article.vue")
    },
    {
      path: '/login',
      name: 'login', 
      meta: {
        navShow: false,
        requireAuth:true // 当前路由需要校验，不需要就不用写
      },
      component: () => import("./views/login.vue"),
      redirect: '/login/register',
      children: [
        {
          path: 'register',
          name: 'register',
          meta: {
            title: '登录',
            index: 1
          },
          component: () => import("./components/login/register.vue")
       },
        {
          path: 'signin',
          name: 'signin',
          meta: {
            title: '注册',
            index: 2
          },
          component: () => import("./components/login/signin.vue")
        },
        {
          path: 'pwd',
          name: 'pwd',
          meta: {
            title: '找回密码',
            index: 3
          },
          component: () => import("./components/login/pwd.vue")
        }
      ],
      // components: {
      //   default: () => import("./views/login.vue"),
      //   signin: () => import("./components/login/signin.vue")
      // }
    }
  ]
});
