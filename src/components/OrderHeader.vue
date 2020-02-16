<template>
  <div class="order-header">
    <div class="container clearbox">
      <div class="header-logo">
        <a href="/#/index"></a>
      </div>
      <div class="title fl">
        <h2>{{title}}<span><slot name="tip"></slot></span></h2>
      </div>
      <div class="username fr">
        <a href="javascript:;">{{username}}</a>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  name: 'order-header',
  props: {
    title: {
      type: String,
      default: '默认标题，随后可改变'
    },
    username: {
      type: String,
      default: ''
    },
    computed: {
      ...mapState(['username'])
    }
  }
}
</script>

<style lang="scss">
  .order-header{
    padding: 30px 0;
    .header-logo{
      float: left;
    }
   .title,.username{
     height: 50px;
     line-height: 50px;
   }
    .title{
      font-size: 20px;
      margin-left: 50px;
      span{
        font-size: 16px;
        color: #999;
        margin-left: 20px;
      }
    }
    .username{
      a{
        color: #333;
        font-size: 14px;
      }
    }
  }
</style>
