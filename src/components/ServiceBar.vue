<template>
  <!-- 加上service为了避免复用，其他组件也是一样的 -->
  <div class="service">
    <div class="container">
      <div class="service-detail">
        <div><span class="icon-setting"></span>预约维修服务</div>
        <div><span class="icon-7day"></span>7天无理由退货</div>
        <div><span class="icon-15day"></span>15天免费换货</div>
        <div><span class="icon-post"></span>满150元包邮</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'service-bar'
}

</script>

<style lang="scss">
  @import './../assets/scss/mixin.scss';
  .service{
    padding: 33px 0;
    color: #666;
    font-size: 16px;
    .service-detail{
      display: flex;
      div{
        flex: 1;
        text-align: center;
        border-right: 1px solid #e5e5e5;
        span{
          display: inline-block;
          margin-right: 4px;
          vertical-align:middle;
        }
        .icon-setting{
        @include bgImg(20px,20px,'/imgs/icon-setting.png');
        }
        .icon-7day{
          @include bgImg(20px,20px,'/imgs/icon-7day.png');
        }
        .icon-15day{
          @include bgImg(20px,20px,'/imgs/icon-15day.png');
        }
        .icon-post{
          @include bgImg(20px,20px,'/imgs/icon-post.png');
        }
      }
      div:last-child{
        border:none;
      }
    }
  }
</style>
