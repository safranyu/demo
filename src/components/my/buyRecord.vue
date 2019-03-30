<template>
  <van-tabs 
    v-model="active"
    @change="getThisIndex"
    swipeable 
    sticky 
    :swipe-threshold="tabNumber" 
    color="#C9A907"
    title-inactive-color="#333"
    title-active-color="#C9A907">
    <van-tab v-for="index in tabTitle" :title="index" :key="index">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <van-card
          v-for="item in (active == 0 ? goodsList: active == 1 ? dzf : active == 2 ? dsh : active == 3 ? ywc : yqx)"
          :key="item.order_id"
          :num="item.goods_number"
          :title="item.goods_name"
          :thumb="item.images"
        >
          <div slot="footer">
            <van-button size="small" round>查看详情</van-button>
          </div>
        </van-card>
      </van-list>
    </van-tab>
  </van-tabs>
</template>

<script>
import '../../assets/js/api/mock/mock.js'
export default {
  data() {
    return {
      active: 0,
      list: [],
      loading: false,
      finished: false,
      tabTitle: ["全部", "待支付", "待审核", "已完成", "已取消"],
      tabNumber: 5,
      imageURL:'',
      goodsList:[],
      dzf:[],
      dsh:[],
      ywc:[],
      yqx:[]
      // buyId: this.$router.params.buyId
    }
  },
  methods: {
    onLoad() {
      // 异步更新数据
      setTimeout(() => {
        for (let i = 0; i < 10; i++) {
          this.list.push(this.list.length + 1);
        }
        // 加载状态结束
        this.loading = false;

        // 数据全部加载完成
        if (this.list.length >= 40) {
          this.finished = true;
        }
      }, 500);
    },
    async getBuyRecord(t) {
      try {
        let params = {
          t: t,
          p: 1
        }
        let res = await this.$api.Mock.getBuyRecord(params)
        console.log(res)
        if (res.code === 200) {
          switch(t) {
            case 0:
              this.goodsList = res.data
              break;
            case 1:
              this.dzf = res.data
              break;
            case 2:
              this.dsh = res.data
              break;
            case 3:
              this.ywc = res.data
              break;
            case 4:
              this.yqx = res.data
              break;
            default:
              console.log('type有误')
          }
        }
      } catch(err) {
        console.log(err)
      }
    },
    getThisIndex(index,title){
      this.getBuyRecord(index)
      console.log('当前点击的',index,title)
    }
  },
  mounted(){
    console.log("1",this.$route.params) //路由传过来的参数
  },
  created() {
    let idx = this.$route.params.buyId == null ? 0 : this.$route.params.buyId
    this.active = idx
    this.getBuyRecord(idx)
   
  },
  beforeCreate: function() { // 单独更改页面的背景
    document.body.style.backgroundColor = '#F5F5F5'
  },
  beforeDestroy: function() { // 删除添加的背景
    document.body.removeAttribute("style","backgroundColor")
  },
}
</script>

<style lang="less">
.van-card{
  margin-top: 20px;
  margin-left: 20px;
  margin-right: 20px;
  border-radius: 10Px;
}
.van-card{
  background-color: #fff;
}
</style>