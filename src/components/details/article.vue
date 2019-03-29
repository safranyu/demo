<template>
  <div v-html="body" class="box"></div>
</template>

<script>
export default {
  data() {
    return{
      id: this.$route.params.id,
      body: ''
    }
  },
  created(){
    this.getArticleInfo()
  },
  methods: {
    async getArticleInfo() {
      try {
        let params = {
          id: this.id
        }
        let res = await this.$api.matches.getArticleInfo(params)
        this.body = res
        console.log(res)
      } catch(err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang='less' scoped >
body{
  background-color: #ffffff;
}
.box{
  height: 100%;
  width: 100%;
  overflow-y: scroll; //必须有这个，否则ios无法滚动。
  -webkit-overflow-scrolling:touch; // ios滚动卡顿的问题。
}
</style>