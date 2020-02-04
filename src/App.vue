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
        // console.log(res)
        // todo vuex
      }).catch((err) => {
        console.log(err)
      })
    },
    getCartCount () {
      this.axios.get('/carts/products/sum').then((res) => {
        // console.log(res)
        // todo vuex
      })
    }
  }
}
</script>

<style lang="scss">
  @import './assets/scss/reset.scss';
</style>
