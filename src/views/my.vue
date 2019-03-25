<template>
  <div class="my-content">
    <section id="card" :style="typebg">
      <div class="card-head">
        <img :src="user.image" v-if="user.image" alt>
        <img src="@/assets/images/head.jpg" v-else alt>
      </div>
      <div class="card-con" v-if="status">
        <div class="card-name ell">{{ user.name }}</div>
        <div class="card-id">
          ID:
          <span>{{ user.id }}</span>
        </div>
        <div class="card-rank">
          <div id="vipimgActiv"></div>
          <span>{{ user.recognize == 2 ? '超级玩家' : user.recognize == 1 ? '社群玩家' : user.recognize == 0 ? '你还不是社群玩家' : user.recognize }}</span>
        </div>
      </div>
      <div class="card-con" v-else>
        <router-link to="/" id="to-login">点击登录</router-link>
      </div>
    </section>
    <section id="myOrder">
      <div class="myOrder-head flex">
        <div class="myOrder-head-title">订单管理</div>
        <router-link to="/" class="myOrder-head-all">全部订单>></router-link>
      </div>
      <ul class="myOrderBox flex">
        <li class="myOrder-obligation">
          <router-link to="/">
            <img src="@/assets/images/dfk.png" alt>
            <span>待支付</span>
          </router-link>
          <div class="floatNumber" v-if="orderNums.pay_1 !== 0">
            <span class="ell">{{ orderNums.pay_1 }}</span>
          </div>
        </li>
        <li class="myOrder-send">
          <router-link to="/">
            <img src="@/assets/images/dfh.png" alt>
            <span>待审核</span>
          </router-link>
          <div class="floatNumber" v-if="orderNums.pay_2 !== 0">
            <span class="ell">{{ orderNums.pay_2 }}</span>
          </div>
        </li>
        <li class="myOrder-take">
          <router-link to="/">
            <img src="@/assets/images/dsh.png" alt>
            <span>已完成</span>
          </router-link>
          <div class="floatNumber" v-if="orderNums.pay_3 !== 0">
            <span class="ell">{{ orderNums.pay_3 }}</span>
          </div>
        </li>
        <li class="myOrder-done">
          <router-link to="/">
            <img src="@/assets/images/ycg.png" alt>
            <span>已取消</span>
          </router-link>
        </li>
      </ul>
    </section>
    <section id="type">
      <ul>
        <li>
          <router-link to="/my/mywallet">
            <div class="type-box">
              <img src="@/assets/images/vp_pay.png" alt>
              <span>MP钱包</span>
            </div>
            <div>
              <span class="money">{{ user.mp_purse }}元</span>
              <van-icon name="arrow" />
            </div>
          </router-link>
          <router-link to="/my/mywallet">
            <div class="type-box">
              <img src="@/assets/images/wallet.png" alt>
              <span>VP钱包</span>
            </div>
            <div>
              <span class="money">{{ user.unfreeze }}元</span>
              <van-icon name="arrow" />
            </div>
          </router-link>
           <router-link to="/my/mywallet">
            <div class="type-box">
              <img src="@/assets/images/user_money.png" alt>
              <span>云钱包</span>
            </div>
            <div>
              <span class="money">{{ user.unfreeze }}元</span>
              <van-icon name="arrow" />
            </div>
          </router-link>
           <router-link to="/my/mywallet">
            <div class="type-box">
              <img src="@/assets/images/wallet_member.png" alt>
              <span>零钱</span>
            </div>
            <div>
              <span class="money">{{ user.unfreeze }}元</span>
              <van-icon name="arrow" />
            </div>
          </router-link>
          <router-link to="myCrowd.html" class="myCrowd">
            <div class="type-box2">
              <img src="@/assets/images/myzc.png" alt>
              <span>我的众筹</span>
            </div>
          </router-link>
          <router-link to="myCrowd.html" class="myCrowd">
            <div class="type-box2">
              <img src="@/assets/images/guanli.png" alt>
              <span>钱包管理</span>
            </div>
          </router-link>
        </li>
        <li>
          <router-link to="javascript:;" class="myActivity">
            <div class="type-box3">
              <img src="@/assets/images/sqhd.png" alt>
              <span>社群活动</span>
            </div>
          </router-link>
          <router-link to="javascript:;" class="myPact">
            <div class="type-box3">
              <img src="@/assets/images/sqgy.png" alt>
              <span>社群公约</span>
            </div>
          </router-link>
          <router-link to="myCard.html" class="myCard">
            <div class="type-box2">
              <img src="@/assets/images/mycardIcon.png" alt>
              <span>我的名片</span>
            </div>
          </router-link>
          <router-link to="playerManage.html" class="myCard">
            <div class="type-box3">
              <img src="@/assets/images/playerManage.png" alt>
              <span>玩家管理</span>
            </div>
          </router-link>
          <router-link to="playerManage.html" class="myCard">
            <div class="type-box3">
              <img src="@/assets/images/siteIcon.png" alt>
              <span>收货地址</span>
            </div>
          </router-link>
        </li>
      </ul>
    </section>
    <van-button square size="large" type="default" @click="outLogin">退出登录</van-button>
  </div>
</template>

<script>
import * as types from '../store/types'
import { type } from 'os';
import { Toast } from 'vant'
export default {
  data() {
    return {
      typebg: {
        background:
          "url(" +
          require("../assets/images/typebg.png") +
          ")" +
          " center center no-repeat",
        backgroundSize: "100% 100%"
      },
      headImg: true,
      status: true,
      user: {},
      orderNums: {},
      token: null
    };
  },
  methods: {
    async getMyInfo() {
      // let userkey = new FormData()
      // 取值的时候会得到带引号的值,这时候转换一下类型就行
      try {
        let params = {}
        let header = {}
        let data = {
          key: this.token
        }
        let res = await this.$api.matches.getUserInfo(params, header, data)
        console.log('login=',res)
        if (res.code === 100) {
          Toast(res.msg)
          this.$router.push({
            path: '/login'
          })
        }
        this.user = res.data
        this.orderNums = res.orderNums
      } catch(e) {
        console.log(e)
      }
    },
    outLogin(){
      console.log('退出登录')
      this.$store.commit(types.LOGOUT)
      this.$router.push({
        path: '/'
      })
    }
  },
  mounted() {
    if (this.$store.state.token !== 'null') {
      console.log('lll=',this.$store.state.token)
      this.token = this.$store.state.token
      this.getMyInfo()
    } else {
      this.$router.push({
        path: '/login'
      })
    }
  },

};
</script>

<style lang="less">
.van-icon{
  font-size: 25Px;
}
.van-button--square{
  background-color: #E6E8F5;
  .van-button__text{
    color: #000;
    font-size: 14Px;
  }
}
.flex{
  display: flex;
}
.van-icon-arrow:before{
  vertical-align: middle;
}
@import "../assets/less/my.less";
</style>
