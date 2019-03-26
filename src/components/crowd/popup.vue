<template>
  <div class="dialog">
    <!-- 外层的遮罩 点击事件用来关闭弹窗，isShow控制弹窗显示 隐藏的props -->
    <div class="dialog-cover" @click="closeMyself"></div>
    <!-- transition 这里加些动画效果 -->
    <transition name="drop">
      <!-- style 通过props 控制内容样式 -->
      <div class="dialog-content" :style="{top:topDistance+'%',width:widNum+'%',left:leftSite+'%'}">
        <div class="dialog-head back">
          <!-- 标题 title -->
          <slot name="header">百万社群玩家众筹</slot>
        </div>
        <div class="dialog-main">
          <!-- 内容 -->
          <slot name="main"></slot>
        </div>
        <!-- 弹窗关闭按钮 -->
        <div class="foot-close" @click="closeMyself">
          <div class="close-img"><i class="el-icon-circle-close-outline"></i></div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>

export default {
  data() {
    return {
      topDistance:15,
      widNum:76.5,
      leftSite:6.5,
    }
  },
  props:['costs'],
  created(){
    console.log(this.costs)
  },
  methods: {
    closeMyself() {
      // 拿到父组件传过来的方法
      // emit 是触发 调用 发射的意思
      this.$emit('shut')
    }
  }
}
</script>

<style lang='less'>
  .dialog{
    position: relative;
    color: #2e2c2d;
    font-size: .24rem;
  }
  // 遮罩
  .dialog-cover{
    background: rgba(0, 0, 0, .4);
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
  // 内容
  .dialog-content{
    position: fixed;
    top: 15%;
    display: flex;
    flex-direction: column;
    z-index: 200;
    width: 6.48rem;
    border-radius: 0.08rem;
    padding-left: 0.52rem;
    padding-right: 0.52rem;
    padding-top: 0.66rem;
    background-color: #F2F4FF;
  }
  .foot-close{
    position: absolute;
    top: .18rem;
    right: .16rem;
  }
  .close-img{
    color: #9899A0;
    i{
      font-size: .45rem;
    }
  }
</style>