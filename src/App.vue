<template>
  <div id="app">
    <router-view></router-view>
    <div></div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'app',
  components: {
  },
  data () {
    return {
      data: ''
    }
  },
  mounted () {
    const url = '/api/search/hotwords'
    axios.get(url).then((res) => {
      if (res.result === 0 && res.data) {
        console.log(res.data)
      }
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
