<template>
  <!-- 倒计时封装：返回进行中、已结束、预热三个状态 结束改变颜色-->
  <span id="countDown">{{ clocker }}</span>
</template>

<script>
export default {
  data() {
    return {
      clocker:'', //显示时间
      timeobj: null //时间对象
    }
  },
  /**传入的日期转换为时间戳 计算返回x天x时x分
   * 1.开始时间、结束时间转换时间戳
   * 2.获取当前时间
   * 3.获得距离开始时间和距离结束时间 x天x时x分
   * https://gitee.com/hjm100/codes/0dx8teymcjlk29giq6pon91
   * https://blog.csdn.net/sinat_17775997/article/details/69803136
   */
  props: ["startTime","endTime"],
  created() {
    // 判断传过来的是日期还是时间戳
    if (this.startTime.indexOf("-") == "-" && this.endTime.indexOf("-") == "-") {
      const startTime = new Date((this.startTime).replace(/-/g, '/')).getTime()
      const endTime = new Date((this.endTime).replace(/-/g, '/')).getTime()
      const nowTime = new Date() 
      // 距离开始的时间
      let disStart = parseInt((nowTime - startTime) / 1000)
      // 距离结束的时间
      let disEnd = parseInt((endTime - nowTime) /1000)
    }

    const startTime = parseInt(this.startTime)
    const endTime = parseInt(this.endTime)
    const nowTime = new Date() 
    let disStart = parseInt(nowTime - startTime)
    let disEnd = parseInt(endTime - (nowTime /1000 ))
    
    let add0 = num => {
      return num < 10 ? '0'+ num : num
    }

    let timeFunction = () => {
      // time为两个时间戳之间相差的秒数
      let time = disEnd --
      this.timeobj = {
        seconds: time % 60,
        minutes: Math.floor(time / 60) % 60,
        hours: Math.floor(time / 60 / 60) % 24,
        days: Math.floor(time / 60 / 60 / 24),
        weeks: Math.floor(time / 60 / 60 / 24 / 7),
        months: Math.floor(time / 60 / 60 / 24 / 30),
        years: Math.floor(time / 60 / 60 / 24 / 365)
      };
      this.clocker = `${this.timeobj.days} 天 ${add0(this.timeobj.hours)} 小时 ${add0(this.timeobj.minutes)} 分 ${add0(this.timeobj.seconds)} 秒`

      // 当时间差小于等于0的时候证明倒计时已经过结束
      if (time <= 0) {
        this.clocker = "0天00小时00分00秒"
        clearInterval(go)
      }
    }
    //此处调用函数避免前一秒倒计时不显示
    if (disEnd > 0 && disStart > 0) {
      timeFunction();
    } else {
      this.clocker = "0天00小时00分00秒"
    }
    
    let go = setInterval(function(){
      timeFunction();
    },1000);
  },
  methods: {
  }
}
</script>

<style lang='css'>
</style>