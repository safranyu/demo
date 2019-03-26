<template>
  <div>
    <van-cell-group>
      <van-cell title="国家地区" is-link :value="defaultArer.name+defaultArer.arer" @click="optionArea"  />
      <van-field
        v-model="phone"
        label="手机号"
        placeholder="请输入手机号"
      ></van-field>
      <van-field
        v-model="sms"
        center
        clearable
        label="短信验证码"
        placeholder="请输入短信验证码"
      >
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
       <van-field
        v-model="sms"
        center
        clearable
        placeholder="请输入短信验证码"
      >
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
      <img :src="verifyImg" alt="">
    </van-cell-group>
    <van-popup v-model="show" overlay-class="sigOverlay">
      <div class="sigPopup">
        <div class="sigPopupWrap">
          <van-cell :title="item.name" :value="item.arer"  v-for="item in arerCode" :key="item.index"/>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
export default {
  data () {
    return {
      username: null,
      phone: null,
      password: null,
      sms:null,
      show: false,
      arerCode:[
        {name : "中国", arer: "+86"},
        {name : "新加坡", arer: "+65"},
        {name : "马来西亚", arer: "+60"}
      ],
      defaultArer: {name : "中国", arer: "+86"},
      verifyImg: null
    }
  },
  methods: {
    async getSigninImg() {
      try {
        let header = {'responseType': 'arraybuffer'}
        let res = await this.$api.matches.getSigninImg(header).then(function(res){
          return 'data:image/png;base64,' + btoa(
            new Uint8Array(res.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))
        })
  
        console.log(res)
        // if (res === 200) {
          // var img = 'data:image/jpg;base64,'+ btoa(new Uint8Array(src).reduce((data, byte) => data + String.fromCharCode(byte), ''));
          // var img = URL.createObjectURL(blob.src)
          // console.log(img)
        // }
      } catch (err){
        console.log(err)
      }
    },
    optionArea(){
      this.show = !this.show
    }
  },
  mounted () {
    this.getSigninImg() //验证码图片
  }
}
</script>

<style lang="less">
.sigOverlay{
  background-color: rgba(0,0,0,.3)
}
.sigPopup{
  height: 400px;
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

</style>