<template>
  <div>
    <!-- <router-view :imagesList="imagesList"></router-view> -->
    <carousel :imagesList="imagesList"></carousel>
    <contentbox></contentbox>
  </div>
</template>

<script>
import Carousel from '../components/home/swiper.vue'
import Contentbox from '../components/home/Contentbox.vue'
export default {
  components: {
    Carousel,
    Contentbox
  },
  data() {
    return {
      imagesList: null
    };
  },
  methods: {
    async getSwiperImg() {
      try {
        let params = {};
        let res = await this.$api.matches.getSwiperImg(params);
        this.imagesList = res.data;
        // console.log("lbt=", res.data);
      } catch (e) {
        console.log(e);
      }
    }
  },
  mounted() {
    this.getSwiperImg();
  }
};
</script>

<style lang="less">
.van-swipe {
  margin-top: 14px;
  margin-left: 20px;
  margin-right: 20px;
  height: 450px;
  border-radius: 7px;
  box-shadow: 0 6Px 16Px rgba(0, 0, 0, 0.22);
  .van-swipe-item {
    .bannerImg {
      display: block;
      height: 100%;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      background-position: center;
    }
  }
  .van-swipe__indicators {
    bottom: 30px;
  }
  .van-swipe__indicator {
    width: 12px;
    height: 12px;
    background-color: #979aa3;
  }
}

</style>
