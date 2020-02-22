<template>
  <div class="scan" v-if="wxpay">
    <div class="mask"></div>
    <div class="item-scan">
      <div class="title">微信支付<em @click="close">X</em></div>
      <div class="s-img">
        <div class="_img">
          <img :src="img" alt="">
        </div>
      </div>
      <div class="tip">
        <p>请使用微信扫一扫</p>
        <p>二维码支付完成</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'scan',
  props: {
    img: {
      type: String
    },
    wxpay: {
      type: Boolean
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  }
}

</script>

<style lang="scss">
  .scan{
    .mask{
      width: 100%;
      height: 100%;
      position: fixed;
      z-index: 10;
      top: 0;
      left: 0;
      background: #000;
      opacity: 0.4;
    }
    .item-scan{
      position: absolute;
      left: 50%;
      top: 50%;
      width: 200px;
      height: 280px;
      background: #fff;
      box-shadow: 1px 1px 5px #ccc;
      transform: translate(-50%, -50%);
      z-index: 11;
      .title{
        text-align: center;
        font-size: 16px;
        margin: 5px;
        position: relative;
        em{
          display: inline-block;
          width: 10px;
          height: 10px;
          font-size: 14px;
          color: #000;
          position: absolute;
          top: 3.5px;
          right: 12px;
          cursor: pointer;
        }
      }
      p{
        text-align: center;
        margin-bottom: 3px;
        font-size: 14px;
        color: #333;
      }
    }
  }
</style>
