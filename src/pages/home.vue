<template>
  <div>
    <nav-header></nav-header>
    <router-view></router-view>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import NavHeader from './../components/NavHeader'
import NavFooter from './../components/NavFooter'
export default {
  // 先随意定名字的
  name: 'nav-home',
  components: {
    NavHeader,
    NavFooter
  }
}

</script>

<style>

</style>
