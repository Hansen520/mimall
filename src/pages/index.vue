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
        <swiper :options="swiperOption">
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
          <img :src="item.img" alt="">
        </a>
      </div>
      <div class="banner">
        <a href="/#/product/30">
          <img src="/imgs/banner-1.png" alt="">
        </a>
      </div>
      <div class="product-box">

      </div>
    </div>
    <suervice-bar></suervice-bar>
  </div>
</template>

<script>
// 因为export default是默认的，所有取什么name都没有关系
import SuerviceBar from './../components/ServiceBar'
// require styles
import 'swiper/dist/css/swiper.css'
import { swiper, swiperSlide } from 'vue-awesome-swiper'
export default {
  // name这个名字可以随意定义，与本文件名没有任何关系，其他页面的也是一样道理，但是为了好记，我们就定义成index
  name: 'index',
  components: {
    SuerviceBar,
    swiper,
    swiperSlide
  },
  data () {
    return {
      swiperOption: {
        autoplay: true,
        speed: 800,
        loop: true,
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
      ]
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
              color: #666;
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
      margin-bottom: 32px;
      a{
        width: 296px;
        height: 167px;
      }
    }
    .banner{
      margin-bottom:50px;
    }
  }
</style>
