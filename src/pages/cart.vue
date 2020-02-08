<template>
  <div>
    <order-header title="我的购物车" username="Hansen">
      <template v-slot:cart>温馨提示：产品是否购买成功了呢</template>
    </order-header>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import OrderHeader from './../components/OrderHeader'
import NavFooter from './../components/NavFooter'

export default {
  name: 'cart',
  components: {
    OrderHeader,
    NavFooter
  }
}

</script>

<style>

</style>
