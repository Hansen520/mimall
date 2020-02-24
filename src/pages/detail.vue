<template>
  <div class="detail">
    <product-param :title="product.name"></product-param>
    <div class="wrapper">
      <div class="container clearbox">
        <div class="swiper fl">
          <swiper :options="swiperOption">
              <swiper-slide><img src="/imgs/detail/phone-1.jpg" alt=""></swiper-slide>
              <swiper-slide><img src="/imgs/detail/phone-2.jpg" alt=""></swiper-slide>
              <swiper-slide><img src="/imgs/detail/phone-3.jpg" alt=""></swiper-slide>
              <swiper-slide><img src="/imgs/detail/phone-4.jpg" alt=""></swiper-slide>
              <!-- Optional controls -->
              <div class="swiper-pagination"  slot="pagination"></div>
          </swiper>
        </div>
        <div class="content fr">
          <h3>{{product.name}}</h3>
          <div class="info">{{product.subtitle}}</div>
          <div class="deliver">小米自营</div>
          <div class="item-price">{{product.price}}元<span class="del">2999元</span></div>
          <div class="line"></div>
          <div class="item-address">
            <i class="icon-log"></i>
            <div class="addr">杭州 杭州市 西湖区 清波门</div>
            <div class="stoke">有现货 {{product.stock}} 件</div>
          </div>
          <div class="version">
            <h4>选择版本</h4>
            <div class="item-version" :class="{'checked': version == 1}" @click="version = '1'">6GB+64GB 全网通 1099元</div>
            <div class="item-version" :class="{'checked': version == 2}" @click="version = '2'">6GB+64Gb 移动4G 1049元</div>
          </div>
          <div class="opcolor">
            <h4>选择颜色</h4>
            <div class="item-color checked">深黑色</div>
          </div>
          <div class="item-total">
            <div class="phone-info">
              <div class="fl">{{product.name}} {{version == 1 ? '6GB+64GB 全网通 1099元' :  '6GB+64Gb 移动4G 1049元'}}</div>
              <div class="fr">{{product.price}}元<div class="underline">1699元</div></div>
            </div>
            <div class="phone-total">总计:{{product.price}}元</div>
          </div>
          <div class="btn-group" @click="addCart">
            <a href="javascript:;" class="btn btn-huge">加入购物车</a>
          </div>
        </div>
      </div>
    </div>
    <div class="price-info">
      <div class="container">
        <h2>价格说明</h2>
        <div class="desc">
          <img src="/imgs/detail/item-price.jpeg" alt="">
        </div>
      </div>
    </div>
    <service-bar></service-bar>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper'
import ProductParam from './../components/ProductParam'
import ServiceBar from './../components/ServiceBar'
export default {
  name: 'detail',
  data () {
    return {
      // 版本号
      version: '1',
      // 获取id
      id: this.$route.params.id,
      product: {},
      swiperOption: {
        autoplay: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>'
          }
        }
      }
    }
  },
  components: {
    ProductParam,
    swiper,
    swiperSlide,
    ServiceBar
  },
  mounted () {
    this.getProductInfo()
  },
  methods: {
    getProductInfo () {
      this.axios.get(`/products/${this.id}`).then((res) => {
        this.product = res
      })
    },
    addCart () {
      this.axios.post('/carts', {
        productId: this.id,
        selected: true
      }).then((res = 0) => {
        this.$store.dispatch('saveCartCount', res.cartTotalQuantity)
        this.$router.push('/cart')
      })
    }
  }
}
</script>

<style lang="scss">
  @import './../assets/scss/config.scss';
  @import './../assets/scss/mixin.scss';
  .detail{
    .wrapper{
      margin-top: 100px;
      .swiper{
        width: 600px;
        height: 617px;
        padding: 20px;
      }
      .content{
        width:584px;
        height:870px;
        h3{
          font-size: 28px;
        }
        .info{
          font-size: 14px;
          color: #999;
        }
        .deliver{
          font-size: 16px;
          color: #FF6700;
          margin-top: 20px;
        }
        .item-price{
          color:#FF6700;
          font-size: 20px;
          .del{
            text-decoration: line-through;
            margin-left: 10px;
            font-size: 14px;
            color: #999;
          }
        }
        .line{
          width:100%;
          height: 1px;
          background: #999;
          margin: 20px 0;
        }
        .item-address{
          height: 108px;
          background-color: #fafafa;
          border: 1px solid #e5e5e5;
          box-sizing: border-box;
          padding-top: 31px;
          padding-left: 64px;
          font-size: 14px;
          line-height: 14px;
          position: relative;
          .icon-log{
            position: absolute;
            top: 27px;
            left: 34px;
            @include bgImg(20px,20px,'/imgs/detail/icon-loc.png');
          }
          .addr{
            color: #666;
          }
          .stoke{
            margin-top: 15px;
            color: #ff6700;
          }
        }
        .version,.opcolor{
          margin-top: 20px;
          h4{
            font-size: 18px;
            color: #333;
            margin-bottom: 13px;
          }
          .item-version,.item-color{
            width: 260px;
            height: 50px;
            border: 1px solid #999;
            display: inline-block;
            margin-left: 10px;
            text-align: center;
            line-height: 50px;
            font-size: 16px;
            cursor: pointer;
            &.checked{
              border: 1px solid #ff6600;
              color: #ff6600;
              font-weight: 500;
            }
          }
        }
        .item-total{
          height: 108px;
          background: #fafafa;
          padding: 24px 33px 29px 30px;
          font-size: 14px;
          margin: 50px 0 30px 0;
          box-sizing: border-box;
          margin
          .phone-total{
            font-size: 24px;
            color: #FF6600;
            margin-top: 18px;

          }
        }
      }
    }
    .price-info{
      background-color:#F3F3F3;
      height:340px;
      h2{
        font-size:24px;
        color:#333333;
        padding-top:38px;
        margin-bottom:30px;
      }
    }
  }
</style>
