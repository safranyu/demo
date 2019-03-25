<template>
  <transition :name="transitionName">
    <router-view></router-view>
    <!-- <router-view name="signin"></router-view> -->
  </transition>
</template>

<script>
// import Register from '@/components/login/register.vue'
// import Signin from '@/components/login/signin.vue'
export default {
  components: {
    // Register,
    // Signin
  },
  data() {
    return {
      transitionName: null,
    }
  },
  watch: {
    $route(to, from) {
      if (to.meta.index > 0) {
        if (to.meta.index < from.meta.index) {
          this.transitionName = "slide-right"
        } else {
          this.transitionName = "slide-left"
        }
      } else if (to.meta.index === 0 && from.meta.index > 0) {
        this.transitionName = "slide-right";
      }
    }
  },
  beforeCreate: function() { // 单独更改页面的背景
    document.body.style.backgroundColor = 'white'
  },
  beforeDestroy: function() { // 删除添加的背景
    document.body.removeAttribute("style","backgroundColor")
  },
}
</script>

<style lang="less">
.slide-right-enter-active,
.slide-right-leave-active,
.slide-left-enter-active,
.slide-left-leave-active {
  will-change: transform;
  transition: all .3s;
  position: absolute;
  width: 100%;
  left: 0;
}
.slide-right-enter {
  transform: translateX(-100%);
}
.slide-right-leave-active {
  transform: translateX(100%);
}
.slide-left-enter {
  transform: translateX(100%);
}
.slide-left-leave-active {
  transform: translateX(-100%);
}
</style>