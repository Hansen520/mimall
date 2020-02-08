<template>
  <div>
    <order-header></order-header>
    <router-view></router-view>
  </div>
</template>

<script>
import OrderHeader from './../components/OrderHeader'

export default {
  name: 'cart',
  components: {
    OrderHeader

  }
}

</script>

<style>

</style>
