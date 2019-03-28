<template>
  <van-cell-group>
    <van-cell 
      title="国家地区" 
      is-link 
      :value="defaultArer.chinese_name+'+'+defaultArer.tel_code" 
      @click="optionArea" 
      value-class="bcolor"/>
    <van-field
      v-model="phone"
      label="手机号"
      maxlength="11"
      placeholder="请输入手机号"
      :error-message="tip"
    ></van-field>
    <van-field
      v-model="sms"
      center
      label="短信验证码"
      maxlength="6"
      placeholder="请输入短信验证码"
    >
      <van-button 
        slot="button" 
        size="small" 
        :disabled="disabled" 
        type="primary" 
        @click="sendcode"
        ref="button"
        :text="text"></van-button>
    </van-field>
    <div class="verifyImg">
      <van-field v-model="verify" placeholder="请输入右侧验证码" maxlength="4" />
      <img :src="verifyImg" alt="" @click="getSigninImg">
    </div>
    <div class="btnSig">
      <van-button round size="normal" @click="setVerify">下一步</van-button>
    </div>
    <van-popup v-model="show" overlay-class="sigOverlay">
      <div class="sigPopup">
        <div class="sigPopupWrap">
          <van-cell :title="item.chinese_name" :value="'+'+item.tel_code"  v-for="(item,index) in arerCode" :key="item.id" @click="selectSite(index)"/>
        </div>
      </div>
    </van-popup>
  </van-cell-group>
</template>

<script>
export default {
  data () {
    return {
      disabled: false,
      username: null,
      phone: this.phone,
      password: null,
      sms: null,
      verify: null,
      show: false,
      arerCode:null,
      defaultArer: {id: 7 , chinese_name : "中国", tel_code: "86"},
      verifyImg: null,
      tip: "",
      time: null,
      text: '发送验证码'
    }
  },
  methods: {
    sendcode(){
      var reg=11 && /^((13|14|15|17|18|19)[0-9]{1}\d{8})$/;
      //var url="/nptOfficialWebsite/apply/sendSms?mobile="+this.ruleForm.phone;
      if(this.phone =='' || this.phone == null){
        return this.tip = "请输入手机号码"
      }else if(!reg.test(this.phone)){
        return this.tip = "手机格式不正确"
      } else if (this.verify == null) {
        return this.tip = "请填写验证码!"
      }else{
        this.time=60;
        this.disabled=true;
        this.tip=""
        this.timer();
        this.setNote() 
      }
    },
    timer() {
      if (this.time > 0) {
        this.time--;
        this.text=this.time+"s后重新获取";
        setTimeout(this.timer, 1000);
      } else{
        this.time=0;
        this.text="获取验证码";
        this.disabled=false;
      }
    },
    async getState() {
      try {
        let data = {}
        let res = await this.$api.matches.getState(data)
        console.log(res)
        if (res.code === 200) {
          this.arerCode = res.datas
        }
      } catch(err) {
        console.log(err)
      }
    },
    async setNote() {
      let but = this.$refs.button
      console.log('到我了',this.phone,but)
      console.log('888')
      // let data = new FormData()
      //   data.append("smsTplno","zt_zhuce")
      //   data.append("phone", this.phone)
      //   data.append("country_code",this.defaultArer.tel_code)
      //   data.append("verify",this.verify)
      //   data.append("code", Math.ceil(Math.random() * 10))
      try {
        let data = {
          smsTplno: 'zt_zhuce',
          phone: this.phone,
          country_code: this.defaultArer.tel_code,
          verify: this.verify,
          code: Math.ceil(Math.random() * 10)
        }
        let params = {}
        let header = {"Content-Type": "application/x-www-form-urlencoded"}
        console.log('sdasdasd',data)
        let res = await this.$api.matches.setNote(params,header,data)
        if (res.status === 0) {
          this.tip = res.info
        }
        console.log('res',res)
        // if (res.code === 200) {

        // }
      } catch(err) {
        console.log(err)
      }
    },
    async setVerify() {
      try {
        let data = {
          code: this.verify,
          mobile: this.phone,
          country_code: this.defaultArer.tel_code,
          smsTplno: 'zt_zhuce',
          country: '中国',
          language: 'zh-cn'
        }
        let params ={}
        let header = {}
        let res = await this.$api.matches.setVerify(params, header, data)
        console.log('注册=',res)
      } catch(err) {
        console.log(err)
      }
    },
    getSigninImg() {
      return this.verifyImg = this.$store.state.Url+"/Login/verify.html?rand="+Math.random()
    },
    optionArea(){
      this.show = !this.show
    },
    selectSite(index){
      console.log('序列',index)
      let arrt = this.arerCode
      this.defaultArer =  arrt[index]
      this.show = !this.show
    }
  },
  mounted() {
    this.getSigninImg(), //验证码图片
    this.getState()
  }
}
</script>

<style lang="less">
.bcolor{
  span{
    color: #000;
  }
}
.sigOverlay{
  background-color: rgba(0,0,0,.3)
}
.sigPopup{
  height: 600px;
  position: relative;
  overflow: auto;
  .sigPopupWrap{
    width: 500px;
  }
}
.van-button--primary{
  background-color: #dbbb15;
  border: 1px solid #dbbb15;
}
.verifyImg{
  display: flex;
  padding-right: 30px;
}
.btnSig{
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 40px;
  .van-button{
    width: 90%;
  }
  .van-button--default{
    color: #fff;
    background-color: #dbbb15;
    border: 1px solid #dbbb15;
  }
  .van-button__text{
    font-size: 18Px;
  }
}
</style>