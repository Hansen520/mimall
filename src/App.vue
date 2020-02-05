<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
  components: {
  },
  data () {
    return {
    }
  },
  mounted () {
    this.getUser()
    this.getCartCount()
  },
  methods: {
    getUser () {
      this.axios.get('/user').then((res) => {
        // 向Actions派发数据，参数一名字自定义，参数二为派发的数据
        this.$store.dispatch('saveUserName', res.username)
      }).catch((err) => {
        console.log(err)
      })
    },
    getCartCount () {
      this.axios.get('/carts/products/sum').then((res) => {
        // todo vuex
        // this.$store.dispatch('saveCartCount', res)
      })
    }
  }
}
</script>

<style lang="scss">
  @import './assets/scss/reset.scss';
</style>
