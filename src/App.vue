<template>
  <div id="app">
    <router-view />
    <tabbars v-if="$route.meta.navShow" />
  </div>
</template>

<script>
import Tabbars from './components/tabbar/tabbar.vue'
export default {
  components: {
		Tabbars
  }
}
</script>

<style lang="less">
body {
  background-color: #D5D7E3;
  padding-bottom: 100px;
}
</style>
