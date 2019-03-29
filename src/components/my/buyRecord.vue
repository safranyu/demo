<template>
  <van-tabs 
    v-model="active" 
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
          num="2"
          tag="标签"
          price="2.00"
          desc="描述信息"  
          title="商品标题"
          :thumb="imageURL"
          origin-price="10.00"
        >
          <div slot="footer">
            <van-button size="mini">按钮</van-button>
            <van-button size="mini">按钮</van-button>
          </div>
        </van-card>
        <van-cell v-for="item in list" :key="item" :title="item"/>
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
      imageURL:''
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
    async getBuyRecord() {
      try {
        let params = {
          t: 0,
          p: 1
        }
        let res = await this.$api.Mock.getBuyRecord(params)
        console.log(res)
      } catch(err) {
        console.log(err)
      }
    }
  },
  mounted(){
    console.log("1",this.$router)
  },
  created() {
   this.getBuyRecord()   
  }
}
</script>
