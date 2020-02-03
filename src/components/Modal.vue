<template>
<!-- 如果要使用过度动画，直接在要用动画的地方加上transition即可，然后可以直接写样式部分了 -->
  <transition name="slide">
    <div class="modal" v-show="showModal">
      <!-- 遮罩层 -->
      <div class="mask"></div>
      <!-- 弹框 -->
      <div class="modal-dialog">
        <div class="modal-header">
          <!-- 弹框标题 -->
          <span>{{title}}</span>
          <!-- 关闭弹框x按钮 -->
          <a href="javascript:;" class="icon-close" @click="$emit('cancel')"></a>
        </div>
        <div class="modal-body">
          <!-- 采用插槽方式,让输入的文本更加灵活 -->
          <slot name="body"></slot>
        </div>
        <div class="modal-footer">
          <!-- $emit('submit') 就是往前面发射指令 -->
          <a href="javascipt:;" class="btn" v-if="btnType==='1'" @click="$emit('submit')">{{sureText}}</a>
          <a href="javascipt:;" class="btn" v-if="btnType==='2'" @click="$emit('cancel')">{{cancelText}}</a>
          <div class="btn-group" v-if="btnType==='3'">
            <a href="javascript:;" class="btn" @click="$emit('submit')">{{sureText}}</a>
            <a href="javascript:;" class="btn btn-default" @click="$emit('cancel')">{{cancelText}}</a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'modal',
  // 这个主要是在这里定义好属性，然后前面给这里的属性传值
  props: {
    // 弹框类型： 小small、中middle、大large、表单form
    modalType: {
      type: String,
      default: 'form'
    },
    // 弹框标题
    title: String,
    // 按钮类型: 1:确定按钮 2：取消按钮 3：确定取消
    btnType: String,
    // 确定按钮的文本内容
    sureText: {
      type: String,
      default: '确定'
    },
    // 取消按钮的文本内容
    cancelText: {
      type: String,
      default: '取消'
    },
    // 是否出现弹框，根据前方的布尔值判断true出现
    showModal: Boolean,
    goTocart () {
      this.$router.push('/cart')
    }
  }
}

</script>

<style lang="scss">
  @import './../assets/scss/config.scss';
  @import './../assets/scss/mixin.scss';
  @import './../assets/scss/button.scss';
  .modal{
    @include position(fixed);
    z-index: 10;
    transition: all 0.5s;
    .mask{
      @include position(fixed);
      background: $colorI;
      opacity: 0.5;
    }
    // 给modal绑定动画,同一个class
    &.slide-enter-active{
        left: 0;
      }
    &.slide-leave-active{
        left: -100%;
      }
    &.slide-enter{
        left: -100%;
      }
    .modal-dialog{
      @include position(absolute, 40%, null, null, 50%, 400px, auto);
      background: $colorG;
      // 让模块居中，-50%，是相当于盒子宽高度来说的
      transform: translate(-50%, -50%);
      .modal-header{
        height: 60%;
        background: $colorJ;
        padding: 0 20px;
        line-height: 60px;
        font-size: $fontI;
        .icon-close{
          @include positionImg(absolute, 23px, 25px, null, null, 14px, 14px, '/imgs/icon-close.png');
          transition: transform .3s;
          transform-origin: right bottom;
          &:hover{

            transform: scale(1.2);
          }
        }
      }
    }
    .modal-body{
      padding: 40px 40px 54px;
      font-size: 14px;
    }
    .modal-footer{
      height: 60px;
      line-height: 60px;
      text-align: center;
      background: $colorJ;
    }
  }

</style>
