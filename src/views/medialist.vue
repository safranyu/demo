<template>
  <div class="mediaList">
    <ul class="mediaList-con" v-for="(row, i) in medialist" :key="i">
      <div v-for="(item, j) in row" :key="j">
        <router-link :to="'/article/'+item.id" class="mediaList-bar" v-if="j == 0" tag="li">
          <img :src="url+item.images" alt>
          <div class="mediaList-bar-text">
            <span>{{ item.title }}</span>
          </div>
        </router-link>
        <router-link :to="'/article/'+item.id" class="mediaList-con-box" v-else tag="li">
          <a href="javascript:;" class="mui-table-view-cell">
            <div class="con-box-left">
              <div class="con-box-title">{{ item.title }}</div>
              <div class="con-box-time">
                <span>{{ item.add_time | formatDate }}</span>
              </div>
            </div>
            <div class="con-box-right">
              <img :src="url+item.images" alt>
            </div>
          </a>
        </router-link>
      </div> 
    </ul>
    <!--列表空白提示-->
    <div class="status" v-if="status" style="display: block;background-color:#D5D7E3; padding-top: 40%">
      <div class="status-img" style="width: 1.91rem; height: 2.33rem;">
        <img src="../assets/images/infoimg.png" alt>
      </div>
      <div class="status-text">暂无资讯</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      url: this.$store.state.Url,
      type: this.$route.params.id,
      page: 1,
      medialist:[],
      status: false
    }
  },
  filters: {
    formatDate: function (value) {
      let date = new Date(parseInt(value)*1000)
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? ('0' + MM) : MM;
      let d = date.getDate();
      d = d < 10 ? ('0' + d) : d;
      let h = date.getHours();
      h = h < 10 ? ('0' + h) : h;
      let m = date.getMinutes();
      m = m < 10 ? ('0' + m) : m;
      let s = date.getSeconds();
      s = s < 10 ? ('0' + s) : s;
      return y + '-' + MM + '-' + d + ' ' + h + ':' + m + ':' + s;
    }
  },
  created(){
    this.getMediaList()
  },
  methods:{
    async getMediaList() {
      console.log('====',this.type,this.page)
      try {
        let params = {
          type: this.type,
          page: this.page
        }
        let res = await this.$api.matches.getMediaList(params)
        if (res.code === 200) {
          this.listTemp(res.list)
        }
      } catch(err) {
        console.log(err)
      }
    },
    listTemp(list) {
      if (list.length <= 0) {
        this.status = true
      }
      var lists = list
      var arrTemp = []
      var index = 0
      var count = 4
      for (let i=0; i < lists.length; i++) {
        index = parseInt(i / count)
        if (arrTemp.length <= index) {
          arrTemp.push([]);
        }
        arrTemp[index].push(lists[i]);
      }
      return this.medialist = arrTemp
    }
  }
}
</script>

<style lang="less">
@import "../assets/less/mediaList.less";
//为空状态
.status{
  width: 100%;
  height: 100%;
  display: flex;
  display: none;
  flex-direction:column;
  justify-content: center;
  align-items: center;
  text-align: center;
  .status-img{
    width: 1.92rem;
    height: 2.34rem;
    margin: 0 auto;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .status-text{
    font-size: .38rem;
    color: #999999;
    margin-top: .86rem;
  }
}
</style>
