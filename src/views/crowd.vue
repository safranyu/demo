<template>
  <van-tabs v-model="active" @click="getActiveList" swipeable @change="getActiveList">
    <van-tab v-for="(val, index) in tabTitle" :key="index">
      <div slot="title" class="van-crowd">
        <div :class="val.kind">
          <img :src="active == index ? val.img : val.imgNo" alt="" />
        </div>
        <span>{{ val.title }}</span>
      </div>
      <div>
        <router-link
          class="crowd-card"
          v-for="item in (active == 1 ? underway : active == 2 ?  finish : preheat)"
          :key="item.id"
          :to="`/crowd/goodsinfo/${item.goods_id}`"
          tag="div">
          <div class="main-content-up">
            <div class="up-img">
              <img v-bind:src="url+item.images" alt>
              <i class="inimg">
                <img v-if="active == 0" src="../assets/images/yrimg.png" alt>
                <img v-else-if="active == 1" src="../assets/images/inimg.png" alt>
                <img v-else-if="active == 2" src="../assets/images/jsimg.png" alt>
              </i>
            </div>
            <div class="up-title">
              <span>{{item.title}}</span>
              <small>每个ID限购{{item.limit_periods}}份</small>
            </div>
            <div class="up-time">{{item.start_time | getStartTime}}</div>
          </div>
          <div class="main-content-down">
            <div class="down-msg">
              <div class="down-msg-money">
                <span>众筹规模</span>
                <span>{{item.total}}万</span>
              </div>
              <div class="down-msg-time">
                <span>{{ active == 0 ? '距离开始': '剩余时间'}}</span>
                <span class="time">
                  <count-down :start-time="item.start_time" :end-time="item.end_time"></count-down>
                </span>
              </div>
            </div>
            <div class="down-buy">
              <div class="down-buy-plan">
                <van-progress
                  :percentage="item.schedule | getPercent"
                  :pivot-text="`${item.schedule}`"
                  pivot-color="#7232dd"
                  color="linear-gradient(to right, #E8C500, #D8B800)"
                />
              </div>
              <div
                class="down-buy-btn"
                :class="active == 1 ? '':'notStarted'"
                @click.stop="getPopup(item.goods_id,item.periods)"
              >{{ active == 0 ? '未开始': active == 1 ? '立即购买': '已结束'}}</div>
            </div>
          </div>
        </router-link>
      </div>
    </van-tab>
    <popup v-if="isShow" :costs="formID" @shut="shutPopup">
      <div slot="header" class="buyFormTitle">{{formID.title}}</div>
      <div slot="main" class="buyForm">
        <section class="control">
          <label for>数 量：</label>
          <button :class="[ nums == 1 ? colorGray: '', minus ]" @click="reduce">-</button>
          <input type="number" value="1" size="1" v-model="nums">
          <button :class="[ nums == formID.limit_periods ? colorGray: '', add]" @click="addNum">+</button>
        </section>
        <section>
          <label for>单 价：</label>
          <span>{{ formID.price }}</span>
        </section>
        <section>
          <label for>产品金额合计：</label>
          <span>{{ formID.price * nums | numFilter}}</span>
        </section>
        <section>
          <label for>众筹金额合计：</label>
          <span>{{ formID.share_price * nums | numFilter}}</span>
        </section>
        <button id="submit" @click="submitCart(formID.goods_id,nums,formID.periods)">提交订单</button>
      </div>
    </popup>
  </van-tabs>
</template>

<script>
import axios from 'axios'
import { deflate } from 'zlib'
import CountDown from '@/components/time/countDown.vue'
import Popup from "@/components/crowd/popup.vue";
import { Toast } from 'vant'
export default {
  components: {
    CountDown,
    Popup
  },
  data() {
    return {
      active: 1,
      url: this.$store.state.Url,
      underway: null,
      finish: null,
      preheat: null,
      isShow: false,
      formID: {},
      nums: 1,
      colorGray: 'colorGray',
      add: 'add',
      minus: 'minus', 
      tabTitle: [
        {
          path: "/mycrowd/preheat",
          title: "预热中",
          imgNo: require("../assets/images/preheatNO.png"),
          img: require("../assets/images/preheat.png"),
          kind: "preheat"
        },
        {
          path: "/mycrowd/crowd",
          title: "进行中",
          imgNo: require("../assets/images/haveinsNO.png"),
          img: require("../assets/images/haveins.png"),
          kind: "havein"
        },
        {
          path: "/mycrowd/over",
          title: "已结束",
          imgNo: require("../assets/images/overNO.png"),
          img: require("../assets/images/over.png"),
          kind: "over"
        }
      ]
    }
  },
  filters: {
    // 过滤时间戳
    getStartTime: function(value) {
      let date = new Date(parseInt(value) * 1000);
      let y = date.getFullYear();
      let MM = date.getMonth() + 1;
      MM = MM < 10 ? "0" + MM : MM;
      let d = date.getDate();
      d = d < 10 ? "0" + d : d;
      let h = date.getHours();
      h = h < 10 ? "0" + h : h;
      let m = date.getMinutes();
      m = m < 10 ? "0" + m : m;
      let s = date.getSeconds();
      s = s < 10 ? "0" + s : s;
      return y + "-" + MM + "-" + d;
    },
    getPercent(val) {
      return parseInt(val.slice(0, val.length - 1));
    },
    numFilter(value) {
      return parseFloat(value).toFixed(2)
    }
  },
  methods: {
    async matches(type, page) {
      console.log('请求=',type,page)
      try {
        let data = {
          type: type,
          page: page
        }
        let params = {}
        let header = {}
        let res = await this.$api.matches.matches(params, header, data)
        console.log('res=',res)
        if (res.code === 100) {
          Toast({
            type:'fail',
            message: res.msg,
            duration: 1000
          });
          // this.$router.push({path:'/login'})
        } else if (res.code === 50) {
          Toast({
            message: res.msg,
            duration: 1000
          });
        }       
        switch(type) {
          case 1:
            this.preheat = res.data
            console.log('this.preheat=',this.preheat)
            break;
          case 2:
            this.underway = res.data
            console.log('this.underway=',this.underway)
            break;
          case 3:
            this.finish = res.data
            console.log('this.finish=',this.finish)
            break;
          default:
            console.log('type有误')
        }
      } catch (e) {
        console.log('ddddd=',e)
      }
    },
    async getPopup(id, periods) {
      console.log(id,periods)
      try {
        let params = {}
        let data = {
          goods_id: id,
          periods: periods
        }
        let res = await this.$api.matches.getGoodsBuy(params, data)
        console.log('resaaa=',res)
        if (res.code === 200) {
          this.isShow = true;
          this.formID = res.data
        }
      } catch(e) {
        console.log(e)
      }
    },
    getActiveList(index) {
      // this.asyncData(index,this.type)
      console.log("111=", index);
      this.matches(index + 1, 1)
    },
    getGoodsDetails(id) {
      console.log('777=',id)
    },
    getFun(type){
      return type == 1 ? this.underway : type == 2 ?  this.finish : this.preheat
    },
    shutPopup: function() {
      this.isShow = !this.isShow;
    },
    addNum: function() {
      let formNum = parseInt(this.formID.limit_periods)
      if (this.nums < formNum+1 && this.nums !== formNum) {
        this.nums++
      } else {
        this.nums = formNum
      }
    },
    reduce() {
      if (this.nums > 1) {
        this.nums--
      } else {
        this.nums = 1
      }
    },
  },
  mounted(){
    this.matches(2, 1); // 进入页面默认执行传参
  }
};
</script>

<style lang="less">
.buyFormTitle {
  font-size: 18Px;
  width: 428px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  // line-height: 18px;
  padding-left: 16px;
  margin-bottom: 36px;
}
.buyForm {
  margin-bottom: 0.2rem;
  section:nth-child(1) {
    display: flex;
    align-items: center;
    button {
      display: inline-block;
      width: 0.49rem;
      height: 0.49rem;
      padding: 0;
      background-color: #dfe2ec;
      border-radius: 0;
      border: 0px;
    }
    input[type="number"] {
      width: 0.82rem;
      height: 0.49rem;
      text-align: center;
      margin: 0 0.06rem;
      border: 1px solid #dfe2ec;
      background: #f2f4ff;
      padding: 0;
    }
    .minus {
      margin-left: 0.1rem;
    }
  }
  section {
    margin-bottom: 30px;
    label {
      display: inline-block;
      width: 200px;
      font-size: 0.25rem;
      text-align: center;
    }
    span {
      color: #3a3a3a;
      font-weight: 600;
      font-size: 0.25rem;
    }
  }
  #submit {
    width: 100%;
    background-color: #e8c500;
    color: white;
    font-size: 0.4rem;
    height: 0.8rem;
    line-height: initial;
    letter-spacing: 0.2em;
    border: 1px solid #e8c500;
  }
  .colorGray{
    color: gray;
  }
}
.van-tab{
  display: initial;
  line-height: .673rem;
}
.van-tabs--line {
  padding-top: 146px;
  .van-tabs__line {
    display: none;
  }
  .van-tabs__wrap {
    height: 120px;
    .van-tab {
      background-color: #ECEEFA;
    }
  }
  .van-tab:nth-child(3) {
    .van-crowd {
      border-left: 1px solid #bfc1ca;
      border-right: 1px solid #bfc1ca;
    }
  }
  img {
    width: 100%;
  }
}
.preheat {
  width: 43px;
  height: 50px;
  margin: 20px auto 0 auto;
}
.havein {
  width: 45px;
  height: 57px;
  margin: 12px auto 0 auto;
}
.over {
  width: 43px;
  height: 50px;
  margin: 20px auto 4px auto;
}
.crowd-card {
  margin-bottom: 13px;
  background-color: #eceefa;
  padding: 13px 15px;
  height: 334px;
  .main-content-up {
    border-bottom: 1px solid #acaeb6;
    width: 100%;
    display: flex;
    flex-wrap: nowrap;
    padding-bottom: 10px;
    .up-img {
      width: 158px;
      height: 158px;
      position: relative;
      img {
        width: 100%;
        height: 100%;
      }
      .inimg {
        width: 70px;
        height: 70px;
        position: absolute;
        top: -1px;
        left: 0;
        img {
          width: 100%;
          height: 100%;
        }
      }
    }
    .up-title {
      font-size: 24px;
      padding-left: 15px;
      flex: 1;
      overflow: hidden;
      span {
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        color: #1d1d1d;
      }
      small {
        color: #3b3a3a;
      }
    }
    .up-time {
      margin-left: 52px;
      color: #cbac00;
      font-size: 20px;
      padding-top: 38px;
    }
  }
  .main-content-down {
    .down-msg {
      display: flex;
      justify-content: space-between;
      padding-top: 10px;
      padding-bottom: 20px;
      .down-msg-money {
        padding-left: 4px;
        span:first-child {
          color: #555555;
          font-size: 20px;
          display: block;
        }
        span:last-child {
          display: block;
          font-size: 22px;
        }
      }
      .down-msg-time {
        text-align: right;
        font-size: 20px;
        span {
          display: block;
          color: #69696b;
        }
        .tiem {
          color: #cbac00;
        }
      }
    }
    .down-buy {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      .down-buy-plan {
        width: 430px;
        height: 28px;
        background-color: #c4c4c4;
        border-radius: 14px;
        position: relative;
        .van-progress {
          height: 28px;
          border-radius: 14px;
          position: relative;
          .van-progress__portion {
            border-radius: 14px;
            .van-progress__pivot {
              position: absolute;
              // height: 12px;
              width: auto;
              left: 50%;
              right: 50%;
              transform: translate(-50%, -50%);
              color: white;
              background: rgba(0, 0, 0, 0) !important;
            }
          }
        }
      }
      .down-buy-btn {
        display: block;
        line-height: 35px;
        color: #cbac00;
        padding: 0 12px;
        border: 2px solid #cbac00;
        border-radius: 8px;
        text-align: center;
        font-size: 20px;
        &.notStarted {
          border: 2px solid #c4c4c4;
          color: #c4c4c4;
        }
      }
    }
  }
}
</style>
