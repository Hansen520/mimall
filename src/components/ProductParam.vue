<template>
  <transition name="srollslide">
    <div class="nav-bar" :class="{ 'fixed': isFixed }" ref="outHeight">
      <div class="container">
        <div class="pro-title">
          {{title}}
        </div>
        <div class="pro-param">
          <a href="javascript:;">概述</a><span>|</span>
          <a href="javascript:;">参数</a><span>|</span>
          <a href="javascript:;">用户评价</a>
          <slot name="buy"></slot>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'nav-bar',
  props: {
    title: {
      type: String
    }
  },
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
    width: 100%;
    border: 1px solid $colorH;
    box-shadow: 0 5px 5px rgba(0,0,0,.07);
    transition: all 1.5s;
    background-color: #fff;
    z-index: 10;
    &.fixed{
      position: fixed;
      top: 0;
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
