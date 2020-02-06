<template>
  <div class="nav-bar" :class="{ 'fixed': isFixed }">
    <div class="container">
      <div class="pro-title">
        小米9
      </div>
      <div class="pro-param">
        <a href="javascript:;">概述</a><span>|</span>
        <a href="javascript:;">参数</a><span>|</span>
        <a href="javascript:;">用户评价</a>
        <slot name="buy"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nav-bar',
  data () {
    return {
      // 用于判断是否出现class样式
      isFixed: false
    }
  },
  mounted () {
    window.addEventListener('scroll', this.initScroll)
  },
  methods: {
    initScroll () {
      // 卷起高度
      const sightScroll = document.body.scrollTop || document.documentElement.scrollTop
      console.log(sightScroll)
      if (sightScroll > 152) {
        this.isFixed = true
      } else {
        this.isFixed = false
      }
    }
  },
  // 为了组件其他部分出现吸顶情况，故而销毁
  destroyed () {
    // false为向上冒泡，true为向下捕获
    window.removeEventListener('scroll', this.initScroll, false)
  }
}

</script>

<style lang="scss">
  @import './../assets/scss/config.scss';
  @import './../assets/scss/mixin.scss';
  .nav-bar{
    height: 70px;
    line-height: 70px;
    border-top: 1px solid $colorH;
    &.fixed{
      position: fixed;
      width: 100%;
      top: 0;
      box-shadow: 0 0 3px 3px #e6e6e6;
    }
    .container{
      @include flex();
      .pro-title{
        font-size: $fontH;
        color: $colorB;
        font-weight: bold;
      }
      .pro-param{
        font-size: $fontJ;
        span{
          margin:0 10px;
        }
        a{
          color: $colorC;
        }
      }
    }
  }
</style>
