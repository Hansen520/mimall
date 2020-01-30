<template>
  <div>
    <suervice-bar></suervice-bar>
  </div>
</template>

<script>
// 因为export default是默认的，所有取什么name都没有关系
import SuerviceBar from './../components/ServiceBar'
export default {
  // name这个名字可以随意定义，与本文件名没有任何关系，其他页面的也是一样道理，但是为了好记，我们就定义成index
  name: 'index',
  components: {
    SuerviceBar
  }
}

</script>

<style>

</style>
