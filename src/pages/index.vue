<template>
  <div class="index">
    <div class="container">
      <div class="swiper">
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
      ]
    }
  }
}

</script>

<style lang="scss">
  .index{
    .swiper{
      height: 451px;
      img{
        width: 100%;
        height: 100%;
      }
    }
  }
</style>
