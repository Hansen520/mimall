<template>
  <div>
    <!-- <order-header
      :title="title"
    >
      <template v-slot:tip>
        {{tip}}
      </template>
    </order-header> -->
    <router-view></router-view>
    <service-bar></service-bar>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
// import OrderHeader from './../components/OrderHeader'
import ServiceBar from './../components/ServiceBar'
import NavFooter from './../components/NavFooter'

export default {
  name: 'cart',
  data () {
    return {
      title: '',
      tip: ''
    }
  },
  components: {
    // OrderHeader,
    ServiceBar,
    NavFooter
  }
  // 会出现一个bug，订单页面跳转后tip不会跳转的问题
  // mounted () {
  //   const path = this.$route.path
  //   if (path === '/order/comfirm') {
  //     this.title = '订单确认'
  //     this.tip = '请认真填写收货地址'
  //   } else if (path === '/order/list') {
  //     this.title = '订单列表'
  //     this.tip = '请谨防钓鱼链接或诈骗电话，了解更多'
  //   } else if (path === '/order/pay') {
  //     this.title = '订单支付'
  //     this.tip = '请谨防钓鱼链接或诈骗电话，了解更多'
  //   } else {
  //     this.title = '订单支付'
  //     this.tip = '请谨防钓鱼链接或诈骗电话，了解更多'
  //   }
  // }
}

</script>

<style>

</style>
