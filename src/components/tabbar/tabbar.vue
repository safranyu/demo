<template>
  <van-tabbar v-model="active" active-color="#ae9403">
    <van-tabbar-item to="/" @click="goindex(active)">
      <span>首页</span>
      <img
        slot="icon"
        slot-scope="props"
        :src="props.active ? icons.home.active : icons.home.normal"
      >
    </van-tabbar-item>
    <van-tabbar-item to="/crowd" @click="goindex(active)">
      <span>众筹</span>
      <img
        slot="icon"
        slot-scope="props"
        :src="props.active ? icons.crowd.active : icons.crowd.normal"
      >
    </van-tabbar-item>
    <van-tabbar-item to="/my" @click="goindex(active)">
      <span>我的</span>
      <img
        slot="icon"
        slot-scope="props"
        :src="props.active ? icons.my.active : icons.my.normal">
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
import obj from "../../../public/manifest.json";
export default {
  data() {
    return {
      active: this.$route.meta.active,
      icons: obj.icons
    };
  },
  methods: {
    goindex(index){
      console.log('999=',index)
    }
  },
  created() {
    console.log("111", this.icons);
  }
};
</script>

<style lang="less">
.van-tabbar {
  height: 1.2rem !important;
  box-shadow: 0 1px 16px rgba(0, 0, 0, 0.2);
  background-color: #e6e8f5 !important;
  .van-tabbar-item {
    font-size: 15Px;
    .van-tabbar-item__icon img{
      height: 22Px;
    }
  }
}

</style>
