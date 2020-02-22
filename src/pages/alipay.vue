<template>
  <div class="ali-pay">
    <order-header title="订单支付">
      <template v-slot:tip>
          请谨防钓鱼链接或诈骗电话，了解更多
      </template>
    </order-header>
    <loading v-if="loading"></loading>
    <!-- content里面返回的是支付宝返回的页面内容，是一个表单信息 -->
    <div class="content" v-html="content"></div>
  </div>
</template>

<script>
import OrderHeader from './../components/OrderHeader'
import Loading from './../components/Loading'
export default {
  // 取任何名字都行
  name: 'ali-pay',
  data () {
    return {
      orderId: this.$route.query.orderId,
      // 支付宝返回的页面内容
      content: '',
      loading: true
    }
  },
  components: {
    OrderHeader,
    Loading
  },
  mounted () {
    this.paySubmit()
  },
  methods: {
    paySubmit () {
      this.axios.post('/pay', {
        orderId: this.orderId,
        orderName: 'Vue高仿小米商城2020年2月20日支付宝功能',
        amount: 0.3, // 元
        payType: 1
      }).then((res) => {
        this.content = res.content
        setTimeout(() => {
          document.getElementById('bestPayForm').submit()
        }, 100)
      })
    }
  }
}

</script>

<style lang="scss">

</style>
