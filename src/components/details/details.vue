<template>
  <div>goods{{goodsId}}</div>
</template>

<script>
import { Toast } from 'vant';
export default {
  data() {
    return{
      goodsId: this.$route.params.id
    }
  },
  methods: {
    async goodsDetails(){
      try {
        let params = {
          id : this.goodsId
        }
        let res = await this.$api.matches.goodsDetails(params)
        console.log('goods',res)
        if (res.code == 100) {
          Toast(res.msg)
        }
      } catch(e) {
        console.log('错误',e)
        Toast('提示内容',e);
      }
    }
  },
  mounted() {
    this.goodsDetails()
    console.log('000=',this.$route.params.id)
  }
}
</script>

<style lang="less">
.van-toast--text{
 padding: 20px; 
}
</style>
