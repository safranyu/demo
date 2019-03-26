<template>
  <div id="formEnter">
    <div class="login">
      <div class="login-logo">
        <img src="http://wx.bwwd.cn/Public/recognize/images/logo@2x.png" alt>
      </div>
      <div class="phInput flex ac jc" style="margin-top:1rem">
        <div class="phInputBox flex ac">
          <img class="phInputIcon" src="http://wx.bwwd.cn/Public/recognize/images/Contactsred.png" alt>
          <input
            type="nuber"
            class="phone"
            placeholder="请输入会员ID/手机号"
            v-model="loginForm.mobile">
        </div>
        <!-- <span class="tip" v-text="loginForm.mobile == '' ? tip : '请输入正确手机号！'"></span> -->
      </div>
      <div class="pwdInput flex ac jc">
        <div class="pwdInputBox flex ac">
          <img class="phInputIcon" src="http://wx.bwwd.cn/Public/recognize/images/passwordIcon.png" alt="">
          <input
            type="password"
            class="pwd"
            placeholder="请输入密码"
            v-model="loginForm.password">
        </div>
      </div>
      <div class="passage flex jc">
        <div class="passageBox flex ac">
          <router-link to="/login/signin">新用户注册</router-link>
          <router-link to="/login/pwd">忘记密码</router-link>
        </div>
      </div>
      <div class="button flex jc ac">
        <button class="entry" v-on:click="getUserLogin">登录</button>
      </div>
      <div class="button flex jc ac">
        <button class="sms" @click="login">短信验证登录</button>
      </div>
    </div>
  </div>
</template>

<script>
import * as types from '../../store/types'
import { Toast } from 'vant'
export default {
  data() {
    return {
      loginForm: {
        mobile: '',
        password:''
      },
      Key: '',
      tip:'',
      token: ''
    }
  },
  methods: {
    login(){
      if (this.token) {
        this.$store.commit(types.LOGIN, this.token)
        let redirect = decodeURIComponent(this.$route.query.redirect || '/');
        this.$router.push({
          path: redirect
        })
      }
    },
    async getUserLogin(){
      console.log('你触发到我了')
      if (this.loginForm.mobile == '') {
        this.tip = '未输入手机号！'
        return false
      }
      if (this.loginForm.password == '') {
        this.tip = '密码未输入！'
        return false
      }
      try {
        let data = {
          username: this.loginForm.mobile,
          password: this.loginForm.password,
          client: 'android',
          user_mac: '21f728a8-9a9f-3766-932a-012cd5e1a623',
          language: 'zh-cn',
          deviceToken: 'Ap5UJMUtFrcG0Ijv0mSMdumJc2y8PaI84DUioKlh2hWd',
          mobile_brand: 'other'
        }
        let params ={}
        let header = {} //删了数据格式有问题
        let result = await this.$api.matches.getUserLogin(params, header,data)
        // console.log('---',result,data)

        if (result.code == 100) {
          Toast(result.error)
        } else if (result.code === 200) {
          Toast(result.datas)
          this.$store.dispatch('UserLogin', result.key)
          this.token = result.key
          // 从哪里来的回哪里去
          let redirect = decodeURIComponent(this.$route.query.redirect || '/');
          const that = this
          setTimeout(function() { // 2秒后只执行一次跳转
            that.$router.push({
              path: redirect
            })
          },2000)
        }
      } catch(err) {
        Toast(err)
      }
    }
  },
  mounted(){
    if (this.$store.state.token !== 'null') {
      let redirect = decodeURIComponent(this.$route.query.redirect || '/');
      this.$router.push({
        path: redirect
      })
    }
  }
}
</script>

<style lang='less'>
.flex{
  display: flex;
}
.ac{
  align-items: center;
}
.jc{
  justify-content: center;
}
#formEnter {
  height: 100%;
  background: white;
  .login {
    width: 100%;
    padding-top: 2.2rem;
    .login-logo {
      width: 3rem;
      position: relative;
      margin: 0 auto;
      img {
        width: 100%;
      }
    }
    .pwdInput,
    .phInput {
      width: 100%;
      height: 76px;
      margin-top: 40px;
      position: relative;
      .pwdInputBox,
      .phInputBox {
        width: 6rem;
        padding: .1rem 0;
        border-bottom: 1px solid #949494;
        .phInputIcon {
          width: 0.38rem;
          display: block;
          margin-right: 0.2rem;
        }
        .pwd,
        .phone {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          border: none;
          font-size: .3rem;
        }
        input::-webkit-input-placeholder {
          font-size: .25rem;
        }
      }
    }
    .tip{
      position: absolute;
      bottom: -28px;
      left: 50%;
      transform: translate(-50%,0);
      display: block;
      color: #E21918;
      font-size: 12px;
    }
    .passage{
      margin-bottom: .8rem;
      .passageBox{
        width: 6rem;
        height: auto;
        margin-top: 0.15rem;
        justify-content: space-between;
        a{
          color: #4b4b4b;
          font-size: 0.24rem;
        }
      }
    }
    .button{
      width: 100%;
      height: .76rem;
      margin-top: .15rem;
      .entry{
        margin: 0;
        padding: 0;
        border-radius: 1rem;
        text-align: center;
        width: 6rem;
        height: 100%;
        border: 1px solid #dbbb15;
        background: #dbbb15;
        font-size: .26rem;
        color: #fff;
      }
      .sms{
        margin: 0;
        padding: 0;
        border-radius: 1rem;
        text-align: center;
        width: 6rem;
        height: 100%;
        border: 1px solid #dbbb15;
        background: #e4d588;
        font-size: .26rem;
        color: #fff;
      }
    }
  } 
}
</style>