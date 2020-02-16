<template>
  <div class="footer">
    <div class="footer-logo">
      <img src="/imgs/logo-footer.png" alt="">
      <p>小米商城</p>
    </div>
    <div class="footer-link">
      <a href="https://www.imooc.com/u/index/allcourses" target="_blank">Hansen学习主页</a><span>|</span>
      <a href="https://git.imooc.com/coding-397/MiMall/src/12-1%E8%AE%A2%E5%8D%95%E7%88%B6%E7%BB%84%E4%BB%B6%E7%BB%93%E6%9E%84%E5%B0%81%E8%A3%85/src/pages/order.vue" target="_blank">Vue全栈</a><span>|</span>
      <a href="https://coding.imooc.com/learn/list/397.html" target="_blank">Vue全家桶</a><span>|</span>
      <a href="https://coding.imooc.com/class/343.html" target="_blank">微信支付</a>
    </div>
    <div class="copyright">Copyright ©2020 <span class="domain">mi.futurefe.com</span> All Rights Reserved.</div>
  </div>
</template>

<script>
export default {
  name: 'nav-footer'
}

</script>

<style lang="scss" scoped>
  .footer{
    height: 234px;
    border-top: 4px solid #ff6600;
    background-color: #333;
    color: #999;
    font-size: 16px;
    text-align: center;
    .footer-logo{
      margin-top: 46px;
      margin-bottom: 31px;
      img{
        width: 53px;
        height: 36px;
        margin-bottom: 13px;
      }
    }
    .footer-link{
      a{
        color:#999;
        display: inline-block;
      }
      span{
        margin: 0 10px;
      }
      margin-bottom: 13px;
    }
    .copyright{
      .domain{
        color: #f60;
      }
    }
  }
</style>
