<template>
  <div class="header">
    <div class="nav-topbar">
      <div class="container">
        <div class="topbar-menu">
          <a href="javascript:;">小米商城</a>
          <a href="javascript:;">云服务</a>
          <a href="javascript:;">MUI</a>
          <a href="javascript:;">协议规划</a>
        </div>
        <div class="topbar-user">
          <a href="javascript:;" v-if="username">{{username}}</a>
          <a href="/#/order/list" v-if="username">订单支付</a>
          <a href="javascript:;" v-if="username" @click="logout">退出</a>
          <a href="javascript:;"  v-if="!username" @click="login">登入</a>
          <a href="javascript:;" class="my-cart" @click="goToCart"><span class="icon-cart"></span>购物车({{cartCount}})</a>
        </div>
      </div>
    </div>
    <div class="nav-header">
      <div class="container">
        <div class="header-logo">
          <a href="/#/index"></a>
        </div>
        <div class="header-menu">
          <div class="item-menu">
            <span>小米手机</span>
            <div class="children">
              <ul>
                <li class="product" v-for="item of phoneList" :key="item.id">
                  <router-link :to="{ name: 'product', params: { id: item.id }}" tag="a" target="_blank">
                    <div class="pro-img">
                      <img :src="item.mainImage" :alt="item.subtitle">
                    </div>
                    <div class="pro-name">{{item.name}}</div>
                    <div class="pro-price">{{item.price | currency}}</div>
                  </router-link>
                </li>
              </ul>
            </div>
          </div>
          <div class="item-menu">
            <span>RedMi红米</span>
            <!-- <div class="children"></div> -->
          </div>
          <div class="item-menu">
            <span>电视</span>
            <div class="children">
              <ul>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img src="/imgs/nav-img/nav-3-1.jpg" alt="">
                    </div>
                    <div class="pro-name">小米壁画电视 65英寸</div>
                    <div class="pro-price">6999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img src="/imgs/nav-img/nav-3-2.jpg" alt="">
                    </div>
                    <div class="pro-name">小米全面屏电视E55A</div>
                    <div class="pro-price">1999元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img src="/imgs/nav-img/nav-3-3.png" alt="">
                    </div>
                    <div class="pro-name">小米电视4A 32英寸</div>
                    <div class="pro-price">699元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img src="/imgs/nav-img/nav-3-4.jpg" alt="">
                    </div>
                    <div class="pro-name">小米电视4A 55英寸</div>
                    <div class="pro-price">1799元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img src="/imgs/nav-img/nav-3-5.jpg" alt="">
                    </div>
                    <div class="pro-name">小米电视4A 65英寸</div>
                    <div class="pro-price">2699元</div>
                  </a>
                </li>
                <li class="product">
                  <a href="" target="_blank">
                    <div class="pro-img">
                      <img src="/imgs/nav-img/nav-3-6.png" alt="">
                    </div>
                    <div class="pro-name">查看全部</div>
                    <div class="pro-price">查看全部</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div class="header-search">
          <div class="wrapper">
            <input type="text" name="keyword">
            <a href="javascript:;"></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'nav-header',
  data () {
    return {
      phoneList: []
    }
  },
  filters: {
    currency (val) {
      if (!val) return '0.00'
      return `￥${val.toFixed(2)}元`
    }
  },
  mounted () {
    this.getProductList()
    // 记住是$route
    const params = this.$route.params
    // console.log(params)
    // 只有在登入页面返回首页时候才重新获取购物车的数量
    if (params && params.from === 'login') {
      this.getCartCount()
    }
  },
  computed: {
    // 用计算属性返回来自vuex里的数据，防止数据加载延迟的情况
    // 而且下面不用在data定义
    username () {
      return this.$store.state.username
    },
    cartCount () {
      return this.$store.state.cartCount
    }
  },
  methods: {
    getProductList () {
      this.axios.get('/products', {
        params: {
          categoryId: '100012'
        }
      }).then(({ list }) => {
        this.phoneList = list.slice(0, 6)
      })
    },
    // 登入接口
    login () {
      this.$router.push('/login')
    },
    // 获取购物车数量接口，这个接口在这里的设置是为了在退出后再登入购物车数量为0
    getCartCount () {
      this.axios.get('/carts/products/sum').then((res = 0) => {
        this.$store.dispatch('saveCartCount', res)
      })
    },
    logout () {
      this.axios.post('/user/logout').then(() => {
        this.$message.success('退出成功')
        this.$cookie.set('userId', '', { exppires: '-1' })
        this.$store.dispatch('saveUserName', '')
        this.$store.dispatch('saveCartCount', 0)
      })
    },
    // 进入到购物车
    goToCart () {
      this.$router.push('/cart')
    }
  }
}

</script>

<style lang="scss">
  @import './../assets/scss/base.scss';
  @import './../assets/scss/mixin.scss';
  @import './../assets/scss/config.scss';
  .header{
    .nav-topbar{
      height: 39px;
      line-height: 39px;
      background-color: #333;
      color: #b0b0b0;
      .container{
        @include flex();
        a{
          display: inline-block;
          color:#b0b0b0;
          margin-right: 10px;
        }
        .my-cart{
          width: 110px;
          background-color: #ff6600;
          text-align: center;
          color: #fff;
          .icon-cart{
            display: inline-block;
            @include bgImg(16px,12px,'/imgs/icon-cart-checked.png');
          }
        &:last-child{
          margin-left: 17px;
        }
        }
      }
    }
    .nav-header{
      .container{
        height: 112px;
        position: relative;
        @include flex();
        .header-menu{
          display: inline-block;
          width: 634px;
          .item-menu {
            display: inline-block;
            color: #333;
            font-weight: bold;
            font-size: 16px;
            line-height: 112px;
            margin-right: 20px;
            span {
              cursor: pointer;
            }
            &:hover{
              color: $colorA;
              .children{
                height: 220px;
                opacity: 1;
                border-top: 1px solid #e5e5e5;
              }
            }
            .children{
              position: absolute;
              top: 112px;
              left: 0;
              opacity: 0;
              background-color: #fff;
              transition: height .5s;
              width: 1226px;
              height:0;
              box-shadow: 0 7px 6px 0 rgba(0, 0, 0, 0.11);
              z-index: 10;
              overflow: hidden;
              ul{
                display: flex;
                .product{
                  position: relative;
                  flex: 1;
                  height: 220px;
                  font-size: 12px;
                  line-height: 12px;
                  text-align: center;
                  a{
                    display: inline-block;
                  }
                  img{
                    width: auto;
                    height: 111px;
                    margin-top: 26px;
                  }
                  .pro-img{
                    height: 137px;
                  }
                  .pro-name{
                    font-weight: bold;
                    margin-top: 19px;
                    margin-bottom: 8px;
                    color: $colorB;
                  }
                  .pro-price{
                    color:$colorA;
                  }
                  &:after{
                    content: " ";
                    position: absolute;
                    top: 28px;
                    right: 0;
                    border-left:1px solid $colorF;
                    height:100px;
                    width:1px;
                  }
                  &:last-child:after{
                    display: none;
                  }
                }
              }

            }
          }
        }
        .header-search{
          width: 319px;
          .wrapper{
            height: 50px;
            border:1px solid #e0e0e0;
            display: flex;
            // 垂直居中
            align-items: center;
            input{
              // 加上box-sizing: border-box;就相当于ie盒子模型了
              box-sizing: border-box;
              width: 264px;
              height: 50px;
              padding-left: 16px;
              border: 0;
              border-right: 1px solid #e0e0e0;
            }
            a{
              @include bgImg(18px,18px,'/imgs/icon-search.png');
              margin-left: 17px;
            }
          }
        }
      }
    }
  }
</style>
