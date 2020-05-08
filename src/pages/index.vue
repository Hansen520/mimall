<template>
  <div class="index">
    <div class="container">
      <div class="swiper-box">
        <div class="nav-menu">
          <ul class="menu-wrap">
            <li class="menu-item">
              <a href="javascript:;">电视 盒子</a>
              <div class="children">
                <ul v-for="(item, i) in menuList" v-bind:key="i">
                  <li v-for="(sub, j) in item" v-bind:key="j">
                    <a v-bind:href="sub?'/#/product/'+sub.id:''">
                      <img v-bind:src="sub?sub.img:'/imgs/item-box-1.png'" alt="">
                      {{sub?sub.name:'小米Pro9'}}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
            <li class="menu-item">
              <a href="javascript:;">手机 电话卡</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">笔记本 平板</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">家电 插线板</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">出行 穿戴</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">智能 路由器</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">电源 配件</a>
            </li>
            <li class="menu-item">
              <a href="javascript:;">生活 箱包</a>
              <div class="children">
                <ul v-for="(item, i) in menuList" v-bind:key="i">
                  <li v-for="(sub, j) in item" v-bind:key="j">
                    <a v-bind:href="sub?'/#/product/'+sub.id:''">
                      <img v-bind:src="sub?sub.img:'/imgs/item-box-1.png'" alt="">
                      {{sub?sub.name:'小米Pro9'}}
                    </a>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
        <swiper :options="swiperOption1">
          <swiper-slide v-for="item of slideList" :key="item.id">
            <a :href="`/#/product/${item.id}`"><img v-bind:src="item.img"></a>
          </swiper-slide>
          <!-- Optional controls -->
          <div class="swiper-pagination"  slot="pagination"></div>
          <div class="swiper-button-prev swiper-button-black" slot="button-prev"></div>
          <div class="swiper-button-next swiper-button-black" slot="button-next"></div>
        </swiper>
      </div>
      <div class="ads-box">
        <a :href="`/#/product/${item.id}`" v-for="item of adsList" v-bind:key="item.id">
          <img v-lazy="item.img" alt="">
        </a>
      </div>
      <div class="banner">
        <a href="/#/product/30">
          <img v-lazy="'/imgs/banner-1.png'" alt="">
        </a>
      </div>
    </div>
    <div class="product">
      <div class="container">
        <div class="product-box">
          <h2>手机</h2>
          <div class="wrapper">
            <div class="banner-left">
              <img v-lazy="'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/574c6643ab91c6618bfb2d0e2c761d0b.jpg?thumb=1&w=293&h=768&f=webp&q=90'" alt="">
            </div>
            <div class="list-box">
              <div class="list" v-for="(arr, i) in phoneList" :key="i">
                <div class="item" v-for="(item, j) in arr"  :key="j">
                  <span v-bind:class="{'kill-pro': j}">秒杀</span>
                  <div class="item-img">
                    <img v-lazy="item.mainImage" alt="">
                  </div>
                  <div class="item-info">
                    <h3>{{item.name}}</h3>
                    <p>{{item.subtitle}}</p>
                    <p class="price" v-on:click="addCart(item.id)">{{item.price}}元起</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="banner">
          <a href="/#/product/30">
          <img v-lazy="'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/731d72805fb720532079afd58645f6b9.jpg?thumb=1&w=1533&h=150&f=webp&q=90'" alt=""></a>
        </div>
        <div class="mispee-box">
          <h2>小米闪购</h2>
          <div class="flashsale">
            <div class="countdown">
              <h3>14:00 &nbsp;场</h3>
              <img v-lazy="'data:img/jpg;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAA1CAYAAAAklDnhAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJ%0AbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdp%0Abj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6%0AeD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1%0AMTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJo%0AdHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlw%0AdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAv%0AIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RS%0AZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpD%0AcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5j%0AZUlEPSJ4bXAuaWlkOjY4Q0ZFMkY5MTJFNzExRThCMkM4OEM1RTNBNjczQUVBIiB4bXBNTTpEb2N1%0AbWVudElEPSJ4bXAuZGlkOjY4Q0ZFMkZBMTJFNzExRThCMkM4OEM1RTNBNjczQUVBIj4gPHhtcE1N%0AOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjhDRkUyRjcxMkU3MTFFOEIy%0AQzg4QzVFM0E2NzNBRUEiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjhDRkUyRjgxMkU3MTFF%0AOEIyQzg4QzVFM0E2NzNBRUEiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94Onht%0AcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5oEyacAAACoklEQVR42sSYv0tbURTHX0LqD6T4g4pE%0AcHDoUOloBxVd/QFFEcQqWtrSKlKFmmAslopohzgIbv4FwUEE0clFujiIi+BSIbRQ0ooKRReRULHf%0AS48Qgu++c3/FAx+iyU3eJzf3nnPuC/1qavQ04zVY8szjCHRGNN9cBD6DSkOJKzAGzsOaH/AW1FuY%0AjRg4EH/oiJSCTxYk1sDK7T86Iu9BraHED/Au9wlVkYdg2lAiC/rBhYnIB/DIUOQj2M9/UkWkCsQN%0AJbbA8l0vqIhMgXIDiZ/gFbgxEakBEwYSf8Eg+OM3gCsyA8oMRETy25UN4IjUgVEDiW2wGDSIIzIL%0AijUljsFLv3WhIvKYFphOXNO6OOUMDhKZA7qFcQF85Q6WXeQpeKEpcULlvY8xthp8iwR8I93qLLb7%0AKnOsSPWNfhd6Bro99yHqTi9IhyWzEXIsIXbSG7Djt1jbQHsBZkMkyZRs13wpgIRoiJKy7dsBWh1L%0AbN5Vt3JFQrQ2XMYeGKBk5yvSI7aRQ4k0eA4uZZlVPM47lDgTZxd6lKb4AcqkLuKSZiIdVGsiVFNc%0AxDV9yT1Orekjoe+MDw4pHqwmaJewit66Ql0QaX+DOTaZe4DitAFZxQaaEynKnJ6KCDeaQAtj3A7V%0AkBtXIpwT3iFV06zqquaKPKEtKIsM6Mo/StoWiQeMvSCJjO4+54hEwTCjuTk0STgckUm6QxTY3LgU%0AKc+/jyFrblyKCIkKbnPjSkT8HDGV5saVyBAtVHZz40Ik7HNTRtrcuBARF2tQbW5ciCR0mhvbIs2E%0AcnNjWySh29zYFGnIK25KzY1Nkdziptzc2BKJUu7Qbm5sicQom2o3NzZEKqiu/DZpbmyIjIAHNBMZ%0A7x4iTALjhcgVQSIl3v87w5vePcY/AQYAFYR6skFSqBUAAAAASUVORK5CYII='" alt="">
              <div class="desc">距离结束还有</div>
              <div class="countdowntime">
                <span>{{hours}}</span>
                <i>:</i>
                <span>{{minutes}}</span>
                <i>:</i>
                <span>{{seconds}}</span>
              </div>
            </div>
            <div class="flashsale-list">
              <swiper :options="swiperOption2">
                <swiper-slide v-for="(arr, i) in phoneFlash" :key="i">
                  <div class="list">
                    <div class="item" v-for="(item, j) in arr" :key="j">
                      <div class="item-img">
                        <img :src="item.img" alt="">
                      </div>
                      <div class="item-info">
                        <h3>{{item.name}}</h3>
                        <p>{{item.subtitle}}</p>
                        <p class="price" @click="addCart()">{{item.price}}元起</p>
                      </div>
                    </div>
                  </div>
                </swiper-slide>
              </swiper>
            </div>
          </div>
        </div>
      </div>
    </div>
    <suervice-bar></suervice-bar>
    <!-- 如果需要传变量就要用v-bind -->
    <!-- 如果是静态文字直接在后面写文字就好了 -->
    <!-- 像title，sureText等等都是子组件那边定义好的属性 -->
    <keep-alive>
      <modal
        title="提示"
        sureText="查看购物车"
        btnType="1"
        modalType="middle"
        :showModal="showModal"
        v-on:submit="goToCart"
        v-on:cancel="showModal=false"
      >
      <!-- 往插槽里面填写内容必须是在组件标签之间 -->
      <template v-slot:body>
        <p>添加商品成功了!</p>
      </template>
      </modal>
    </keep-alive>
  </div>
</template>

<script>
// 因为export default是默认的，所有取什么name都没有关系
import SuerviceBar from './../components/ServiceBar'
// require styles
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import Modal from './../components/Modal'
// 接口获取
import { getProductionList } from './../server/ProductionApi'
import { addToCart } from './../server/cartApi'
export default {
  // name这个名字可以随意定义，与本文件名没有任何关系，其他页面的也是一样道理，但是为了好记，我们就定义成index
  name: 'index',
  components: {
    SuerviceBar,
    swiper,
    swiperSlide,
    Modal
  },
  data () {
    return {
      // 时间
      hours: 0,
      minutes: 1,
      seconds: 1,
      // banner轮播图
      swiperOption1: {
        autoplay: true,
        speed: 800,
        // 是否图片连接播放，如果不连接则直接跳到第一张
        loop: true,
        // slidesPerView: 3,//三个并排显示
        touchAngle: 10,
        keyboard: true,
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }

      },
      // 闪购轮播图
      swiperOption2: {
        autoplay: true,
        speed: 800,
        slidesPerView: 4,
        // 是否图片连接播放，如果不连接则直接跳到第一张
        loop: true,
        // slidesPerView: 3,//三个并排显示
        touchAngle: 10,
        keyboard: true

      },
      slideList: [
        {
          id: '42',
          img: '/imgs/slider/slide-1.jpg'
        },
        {
          id: '45',
          img: '/imgs/slider/slide-2.jpg'
        },
        {
          id: '46',
          img: '/imgs/slider/slide-3.jpg'
        },
        {
          id: '47',
          img: '/imgs/slider/slide-4.jpg'
        },
        {
          id: '48',
          img: '/imgs/slider/slide-1.jpg'
        }
      ],
      menuList: [
        [
          {
            id: 30,
            img: '/imgs/item-box-1.png',
            name: '小米CC9'
          }, {
            id: 31,
            img: '/imgs/item-box-2.png',
            name: '小米8青春版'
          }, {
            id: 32,
            img: '/imgs/item-box-3.jpg',
            name: 'Redmi K20 Pro'
          }, {
            id: 33,
            img: '/imgs/item-box-4.jpg',
            name: '移动4G专区'
          }
        ],
        [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]
      ],
      adsList: [
        {
          id: 33,
          img: '/imgs/ads/ads-1.png'
        }, {
          id: 48,
          img: '/imgs/ads/ads-2.jpg'
        }, {
          id: 45,
          img: '/imgs/ads/ads-3.png'
        }, {
          id: 47,
          img: '/imgs/ads/ads-4.jpg'
        }
      ],
      phoneList: [],
      phoneFlash: [
        [{
          id: '01',
          img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/02642411cee83d90c46c9503c3003a3e.jpg',
          name: '王牌手机',
          subtitle: '你的品质选择',
          price: '1200.00'
        }], [{
          id: '02',
          img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e7ec801fd82c2e2f2728cdc1dd5098ee.jpg',
          name: '小米手机',
          subtitle: '你的品质选择',
          price: '2200.00'
        }], [{
          id: '03',
          img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/02642411cee83d90c46c9503c3003a3e.jpg',
          name: 'vivo手机',
          subtitle: '你的品质选择',
          price: '1340.00'
        }], [{
          id: '04',
          img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e7ec801fd82c2e2f2728cdc1dd5098ee.jpg',
          name: '傻瓜手机',
          subtitle: '你的品质选择',
          price: '1500.50'
        }], [{
          id: '05',
          img: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/5ef62eeb7a0709f80170973680994267.png',
          name: '苹果手机',
          subtitle: '你的品质选择',
          price: '1900.00'
        }], [{
          id: '06',
          img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e7ec801fd82c2e2f2728cdc1dd5098ee.jpg',
          name: '华为手机',
          subtitle: '你的品质选择',
          price: '2200.00'
        }], [{
          id: '07',
          img: 'https://cdn.cnbj0.fds.api.mi-img.com/b2c-mimall-media/5ef62eeb7a0709f80170973680994267.png',
          name: '摩托罗拉手机',
          subtitle: '你的品质选择',
          price: '1100.00'
        }], [{
          id: '08',
          img: 'https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/e7ec801fd82c2e2f2728cdc1dd5098ee.jpg',
          name: '魅族手机',
          subtitle: '你的品质选择',
          price: '1000.00'
        }]
      ],
      showModal: false
    }
  },
  mounted () {
    this.init()
    this.computetime()
  },
  methods: {
    async init () {
      const { list } = await getProductionList({
        categoryId: 100012
        // pageSize: 8
      })
      this.phoneList = [list.slice(0, 4), list.slice(4, 8)]
    },
    async addCart (id) {
      const res = await addToCart(
        {
          productId: id,
          selected: true
        }
      )
      this.$store.dispatch('saveCartCount', res.cartTotalQuantity)
      this.showModal = true
      // this.axios.post('/carts', {
      //   // 这里的id勇敢参数传递，也就是detail里面的this.$router.params.id
      //   productId: id,
      //   selected: true
      // }).then((res = 0) => {
      //   this.$store.dispatch('saveCartCount', res.cartTotalQuantity)
      //   this.showModal = true
      // })
    },
    goToCart () {
      this.$router.push('/cart')
    },
    // 时间倒计时
    computetime () {
      const time = setInterval(() => {
        this.seconds--
        if (this.seconds < 0) {
          this.minutes--
          this.seconds = 60
        }
        if (this.minutes < 0) {
          this.hours--
          this.minutes = 60
        }
        if (this.hours < 0) {
          clearInterval(time)
          this.hours = 0
          this.minutes = 0
          this.seconds = 0
          alert('抢购开始')
        }
      }, 1000)
    }
  }
}

</script>

<style lang="scss">
  @import './../assets/scss/config.scss';
  @import './../assets/scss/mixin.scss';
  .index{
    .swiper-box{
      .nav-menu{
        position: absolute;
        width:264px;
        height:460px;
        z-index: 9;
        background-color: #55585a7a;
        padding: 26px 0;
        box-sizing: border-box;
        .menu-wrap{
          .menu-item{
            height: 50px;
            line-height: 50px;
            a{
              font-size:16px;
              color: #ddd;
              padding-left: 30px;
              display: block;
              position: relative;
              &:after{
                content: ' ';
                @include bgImg(10px, 15px, '/imgs/icon-arrow.png');
                position: absolute;
                right: 16px;
                top: 18px;
              }
            }
            &:hover{
              background-color:$colorA;
              .children{
                display: block;
              }
            }
            .children{
              width: 962px;
              height: 451px;
              background-color: $colorG;
              position: absolute;
              top: 0;
              left: 264px;
              border: 1px solid $colorH;
              display: none;
              ul{
                display: flex;
                justify-content: space-between;
                height: 75px;
                li{
                  height: 75px;
                  line-height: 75px;
                  flex: 1;
                  padding-left: 23px;
                }
                a{
                  color: $colorB;
                  font-size: 14px;
                }
                img{
                  width: 42px;
                  height: 35px;
                  vertical-align: middle;
                  margin-right: 15px;
                }
              }
            }
          }
        }
      }
      .swiper-container{
        .swiper-button-prev{
          left:274px;
        }
      }
      img{
        width: 100%;
        height: 100%;
      }
    }
    .ads-box{
      @include flex();
      margin-top: 14px;
      a{
        width: 296px;
        height: 167px;
      }
    }
    .product{
      background-color: $colorJ;
      padding: 30px 0 70px;
      margin-bottom: 50px;
      box-sizing: border-box;
      .product-box{
        h2{
          font-size: $fontF;
          height: 21px;
          line-height: 21px;
          color: $colorB;
          margin-bottom: 20px;
        }
        .wrapper{
          display: flex;
          .banner-left{
            margin-right: 16px;
            img{
              width: 224px;
              height: 619px;
            }
          }
          .list-box{
            .list{
              @include flex();
              width: 986px;
              margin-bottom: 14px;
              &:last-child{
                margin-bottom: 0;
              }
              .item{
                width: 236px;
                height: 302px;
                background-color: $colorG;
                text-align: center;
                span{
                  // 是否为新品
                  display: inline-block;
                  width: 67px;
                  height: 24px;
                  font-size: 14px;
                  line-height: 24px;
                  color: $colorG;
                  &.new-pro{
                    background-color: #7ecf68;
                  }
                  &.kill-pro{
                    background-color: #e82626;
                  }
                }
                .item-img{
                  img{
                    height: 195px;
                    width: 100%;
                  }
                }
                .item-info{
                  h3{
                    font-size: $fontJ;
                    color: $colorB;
                    line-height: $fontJ;
                    font-weight: bold;
                  }
                  p{
                    color: $colorD;
                    line-height: 13px;
                    margin: 6px auto 13px;
                  }
                  .price{
                    color: #f20a0a;
                    font-size: $fontJ;
                    font-weight: bold;
                    cursor: pointer;
                    &:after{
                      @include bgImg(22px,22px,'/imgs/icon-cart-hover.png');
                      content:' ';
                      margin-left:5px;
                      vertical-align: middle;
                    }
                  }
                }
              }
            }
          }
        }
      }
      .mispee-box{
        margin-bottom: 50px;
        h2{
          font-size: $fontF;
          height: 21px;
          line-height: 21px;
          color: $colorB;
          margin-bottom: 20px;
        }
        .flashsale{
          display: flex;
          .countdown{
            width: 234px;
            height: 300px;
            box-sizing: border-box;
            background-color: #f1eded;
            margin-right: 16px;
            h3{
              font-size:26px;
              font-weight: 300;
              color:#e82626;
              text-align: center;
              padding-top: 30px;
            }
            img{
              margin: 20px auto;
              vertical-align: middle;
              margin-left: -17px;
              position: relative;
              left: 50%;
              width: 35px;
              height: 53px;
            }
            .desc{
              text-align: center;
              font-size: 16px;
              color: #999;
              margin-top: 10px;
            }
            .countdowntime{
              text-align: center;
              margin-top: 40px;
              span{
                display: inline-block;
                width: 45px;
                height: 45px;
                color: #fff;
                font-size: 28px;
                line-height: 45px;
                background-color: rgb(68, 59, 59);
              }
              i{
                display: inline-block;
                color: #000;
                margin:0 5px;
                font-size: 28px;
                font-style: normal;
              }
            }
          }
          .flashsale-list{
            width: 986px;
            .list{
              @include flex();
              .item{
                width: 236px;
                height: 300px;
                background-color: #fff;
                margin-left: 10px;
                overflow: hidden;
                .item-img{
                  margin-top: 20px;
                  text-align: center;
                  img{
                    width: 120px;
                  }
                }
                .item-info{
                  h3{
                    text-align: center;
                    margin-top: 40px;
                  }
                  p{
                    text-align: center;
                    color:#999;
                    font-size: 12px;
                    &:last-child{
                      color:#f20a0a;
                      font-size: 16px;
                      margin: 20px auto 20px;
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
