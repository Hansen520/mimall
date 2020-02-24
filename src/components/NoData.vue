<template>
  <div class="no-data">
    <img src="/imgs/icon-no-data.png" alt="">
    <p>当前暂无提交的订单记录哦~~😀</p>
  </div>
</template>

<script>
export default {
  name: 'no-data'
}

</script>

<style lang="scss">
  .no-data{
    text-align: center;
    font-size: 20px;
    color: #999;
    margin: 50px 0;
    img{
      width: 240px;
      height: 180px;
      margin-bottom: 30px;
    }
  }
</style>
