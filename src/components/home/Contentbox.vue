<template>
  <div class="page-nav clearfix">
    <div class="page-nav-up">
      <div class="page-nav-left">
        <router-link to="/medialist" class="nav-box" :style="bgImgs.js">
          <div>
            <img src="@/assets/images/js.png" alt class="nav-icon-js">
            <span>竞赛</span>
          </div>
        </router-link>
        <router-link to="/medialist" class="nav-box" :style="bgImgs.sxy">
          <div>
            <img src="@/assets/images/sxy.png" alt class="nav-icon-sxy">
            <span>商学院</span>
          </div>
        </router-link>
        <router-link to="/medialist" class="nav-box" :style="bgImgs.zsdh">
          <div>
            <img src="@/assets/images/zs.png" alt class="nav-icon-zsdh">
            <span>钻石大会</span>
          </div>
        </router-link>
        <router-link to="/medialist" class="nav-box" :style="bgImgs.csh">
          <div>
            <img src="@/assets/images/chishan.png" alt class="nav-icon-csh">
            <span>慈善会</span>
          </div>
        </router-link>
      </div>
      <div class="page-nav-right">
        <router-link to :style="bgImgs.sc">
          <div>
            <img src="@/assets/images/sc.png" alt>
            <span>百万商城</span>
          </div>
        </router-link>
      </div>
    </div>
    <div class="page-nav-down">
      <router-link to="/medialist" class="nav-down-left" :style="bgImgs.xbczc">
        <div>
          <img src="@/assets/images/xbczc.png" alt>
          <span class="ell">小白菜便利店众筹</span>
        </div>
      </router-link>

      <router-link to class="nav-down-right" :style="bgImgs.fjsj">
        <div>
          <img src="@/assets/images/fjsj.png" alt>
          <span class="ell">附近商家</span>
        </div>
      </router-link>
    </div>
    <div class="page-nav-up">
      <div class="page-nav-left">
        <router-link to="/medialist" class="nav-box" :style="bgImgs.gdzm">
          <div>
            <img src="@/assets/images/gdzm.png" alt class="nav-icon-gdzm">
            <span>股东招募</span>
          </div>
        </router-link>
        <router-link to="/medialist" class="nav-box" :style="bgImgs.bdxf">
          <div>
            <img src="@/assets/images/bdxf.png" alt class="nav-icon-bdxf">
            <span>保本托底消费</span>
          </div>
        </router-link>
        <router-link to="/medialist" class="nav-box" :style="bgImgs.szgl">
          <div>
            <img src="@/assets/images/szgl.png" alt class="nav-icon-szgl">
            <span>市值管理</span>
          </div>
        </router-link>
        <router-link to="/medialist" class="nav-box" :style="bgImgs.vrt">
          <div>
            <img src="@/assets/images/zhongchou.png" alt class="nav-icon-vrt">
            <span>VRT交易</span>
          </div>
        </router-link>
      </div>
      <div class="page-nav-right">
        <router-link to :style="bgImgs.cjtg">
          <div>
            <img src="@/assets/images/cjtg.png" alt style="width: 0.57rem;height: 0.57rem;">
            <span>糖果充值</span>
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return{
      url: "http://bwwd.cs",
      bgImgs:{
        js: {
          backgroundImage: "url(" + require("@/assets/images/bg/nav-js.png")+ ")"
        },
        sxy: {
          backgroundImage: "url(" + require("@/assets/images/bg/nav-sxy.png")+ ")"
        },
        sc: {
          backgroundImage: "url(" + require("@/assets/images/bg/nav-sc.png")+ ")"
        },
        zsdh: {
          backgroundImage: "url(" + require("@/assets/images/bg/nav-zsdh.png")+ ")"
        },
        csh: {
          backgroundImage: "url(" + require("@/assets/images/bg/nav-csh.png")+ ")"
        },
        xbczc: {
          backgroundImage: "url(" + require("@/assets/images/bg/nav-xbc.png")+ ")"
        },
        fjsj: {
          backgroundImage: "url(" + require("@/assets/images/bg/nav-fjsj.png")+ ")"
        },
        gdzm: {
          backgroundImage: "url(" + require("@/assets/images/bg/nav-gdzm.png")+ ")"
        },
        bdxf: {
          backgroundImage: "url(" + require("@/assets/images/bg/nav-bdxf.png")+ ")"
        },
        szgl: {
          backgroundImage: "url(" + require("@/assets/images/bg/nav-szgl.png")+ ")"
        },
        vrt: {
          backgroundImage: "url(" + require("@/assets/images/bg/nav-urt.png")+ ")"
        },
        cjtg: {
          backgroundImage: "url(" + require("@/assets/images/bg/nav-tgcz.png")+ ")"
        }
      }
    }
  }
};
</script>

<style lang="less">
.page-nav{
  box-sizing: border-box;
  margin-top: 32px;
  width: 100%;
  height: auto;
  display: block;
  padding-left: 18px;
  padding-right: 18px;

  .page-nav-up{
    width: 100%;
    height: auto;
    display: flex;
    justify-content: space-between;
    margin-bottom: 2px;
  }
  .page-nav-left{
    // width: 484px;
    height: auto;
    display: flex;
    flex-wrap: wrap;

    .nav-box {
      display: block;
      width: 239px;
      height: 159px;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items:center;
      &:nth-child(1){
        margin-bottom: 6px;
        margin-right: 6px;
      }
      &:nth-child(2){
        margin-bottom: 6px;
      }
      &:nth-child(3){
        margin-right: 6px;
      }
      div{
        width: auto;
        height: auto;
        text-align: center;
        span {
          width: 100%;
          display: block;
          font-size: .20rem;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
          color: #2f2f37;
        }
        img{
          width: 100%;
          height: 100%;
        }
        .nav-icon-js{
          width: 60px;
          height: 54px;
        }
        .nav-icon-sxy{
          width: 67px;
          height: 51px;
        }
        .nav-icon-zsdh{
          width: 51px;
          height: 42px;
        }
        .nav-icon-csh{
          width: 54px;
          height: 42px;
        }
        .nav-icon-bdxf{
          width: 42px;
          height: 51px;
        }
        .nav-icon-szgl{
          width: 52px;
          height: 52px;
        }
        .nav-icon-vrt{
          width: 61px;
          height: 48px;
        }
        .nav-icon-gdzm{
          width: 70px;
          height: 48px;
        }
      }
    }
  }
  .page-nav-right{
    width: 224px;
    height: 323px;
    //margin-left: .06rem;
    a{
      display: block;
      // width: 100%;
      width: 224px;
      height: 100%;
      background-repeat: no-repeat;
      background-size: 100% 100%;
      display: flex;
      justify-content: center;
      align-items:center;
      div{
        width: 120px;
        height: auto;
        text-align: center;
      }
      img{
        width: 67px;
        height: 53px;
      }
      span {
        display: block;
        color: #2f2f37;
        font-size: 12px;
      }
    }
  }
  .page-nav-down{
    width: 100%;
    display: flex;
    justify-content: space-between;
    height: 159px;
    margin-top: 6px;
    margin-bottom: 6px;
    a{
      width: 100%;
      height: auto;
      display: flex;
      justify-content: center;
      align-items: center;
      div{
        text-align: center;
        img{
          width: 57px;
          height: 53px;
        }
        span {
          display: block;
          color: #2f2f37;
          font-size: 12px;
        }
      }
    }
    .nav-down-left{
      width: 484px;
      margin-left: 2px;
      background: url("~/assets/images/bg/nav-szgl.png") center center no-repeat;
      background-size: 100% 100%;
      margin-right: 2px;
    }
    .nav-down-right{
      margin-left: 6px;
      width: 224px;
      background: url("~/assets/images/bg/nav-zsdh.png") center center no-repeat;
      background-size: 100% 100%;
    }
  }

}
</style>
