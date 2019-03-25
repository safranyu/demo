<template>
  <van-swipe :autoplay="3000" indicator-color="#e8c716">
    <van-swipe-item v-for="(time, index) in imagesList" :key="index">
      <a
        :href="time.link"
        class="bannerImg"
        v-bind:style="{ backgroundImage: 'url('+url+time.images+')'}"
      ></a>
    </van-swipe-item>
  </van-swipe>
</template>

<script>
export default {
  data() {
    return {
      url: this.$store.state.Url
    }
  },
  props:['imagesList']
};
</script>