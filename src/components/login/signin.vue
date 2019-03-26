<template>
  <div>
    <van-cell-group>
      <van-cell title="国家地区" is-link value="+86" @click="optionArea"  />
      <van-field
        v-model="username"
        label="用户名"
        placeholder="请输入用户名"
      ></van-field>
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
      ]
    }
  },
  methods: {
    optionArea(){
      this.show = !this.show
    }
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
.van-cell__title{
  
}
</style>