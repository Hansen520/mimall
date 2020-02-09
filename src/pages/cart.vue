<template>
  <div class="cart">
    <order-header title="我的购物车" username="Hansen">
      <template v-slot:cart>温馨提示：产品是否购买成功了呢</template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="cart-box">
          <ul class="cart-item-head">
            <li class="col-1"><span class="checkbox" :class="{'checked':allChecked}" v-on:click="toggleAllSelect"></span>全选</li>
            <li class="col-3">商品名称</li>
            <li class="col-1">单价</li>
            <li class="col-2">数量</li>
            <li class="col-1">小计</li>
            <li class="col-1">操作</li>
          </ul>
          <ul class="cart-item-list">
            <li class="cart-item" v-for="item of list" :key="item.id">
              <div class="item-check">
                <span class="checkbox" :class="{'checked': item.productSelected}"></span>
              </div>
              <div class="item-name">
                <img v-lazy="item.productMainImage" :alt="item.productName">
                <span>{{`${item.productName},${item.productSubtitle}`}}</span>
              </div>
              <div class="item-price">{{item.productPrice}}</div>
              <div class="item-num">
                <div class="num-box">
                  <a href="javascript:;">-</a>
                  <span>{{item.quantity}}</span>
                  <a href="javascript:;">+</a>
                </div>
              </div>
              <div class="item-total">{{item.productTotalPrice}}元</div>
              <div class="item-del"></div>
            </li>
          </ul>
        </div>
        <div class="order-wrap clearbox">
          <div class="cart-tip fl">
            <a href="/#/index">继续购物</a>
            共<span>{{list.length}}</span>件商品，已选择<span>{{checkNum}}</span>件
          </div>
          <div class="total fr">
            合计: <span>{{cartTotalPrice}}</span>元
            <a href="javascript:;" class="btn">去结算</a>
          </div>
        </div>
      </div>
    </div>
    <nav-footer></nav-footer>
  </div>
</template>

<script>
import OrderHeader from './../components/OrderHeader'
import NavFooter from './../components/NavFooter'

export default {
  name: 'cart',
  data () {
    return {
      // 商品列表
      list: [],
      // 是否全选
      allChecked: false,
      // 商品总金额
      cartTotalPrice: 0,
      // 选中的商品数量
      checkNum: 0
    }
  },
  components: {
    OrderHeader,
    NavFooter

  },
  mounted () {
    this.getCartList()
  },
  methods: {
    getCartList () {
      // 这个是解构写法，返回后台数据
      this.axios.get('carts').then((res) => {
        this.renderCartData(res)
      })
    },
    toggleAllSelect () {
      const url = this.allChecked ? '/carts/unSelectAll' : '/carts/selectAll'
      this.axios.put(url).then((res) => {
        this.renderCartData(res)
      })
    },
    // 公共渲染,参数采用解构赋值形式
    renderCartData ({ cartProductVoList, selectedAll, cartTotalPrice }) {
      // const { cartProductVoList, selectedAll, cartTotalPrice } = res
      [this.list, this.allChecked, this.cartTotalPrice] = [cartProductVoList, selectedAll, cartTotalPrice]
      // 过滤返回true的个数
      this.checkNum = this.list.filter(item => {
        // item就是list的数据，然后下面return的是true
        return item.productSelected
      }).length
    }
  }
}

</script>

<style lang="scss">
  .cart{
    .wrapper{
      background-color: #f5f5f5;
      padding-top: 30px;
      padding-bottom: 114px;
      .cart-box{
        background: #fff;
        font-size: 14px;
        color: #999;
        text-align: center;
        .checkbox{
          display: inline-block;
          width: 22px;
          height: 22px;
          border: 1px solid #e5e5e5;
          margin-right: 17px;
          vertical-align: middle;
          cursor: pointer;
          &.checked{
            background:url('/imgs/icon-gou.png') #FF6600 no-repeat center;
            background-size:16px 12px;
            border:none;
          }
        }
        .cart-item-head{
          display: flex;
          height: 79px;
          line-height: 79px;
          // 这不失为一个空间分配的好办法，喜欢
          .col-1{
            flex: 1;
          }
          .col-2{
            flex: 2;
          }
          .col-3{
            flex: 3;
          }
        }
        .cart-item-list{
          .cart-item{
            display: flex;
            // 垂直居中
            align-items: center;
            height: 125px;
            border-top: 1px solid #e5e5e5;
            font-size: 16px;
            .item-check{
              flex: 1;
              &:after{
                content: '';
                margin-right: 28px
              }
            }
            .item-name{
              flex: 3;
              font-size: 18px;
              color: #333;
              display: flex;
              align-items: center;
              img{
                width: 80px;
                height: 80px;
                vertical-align: middle;
              }
              span{
                margin-left: 30px;
              }
            }
            .item-price{
              flex: 1;
              color: #333;
            }
            .item-num{
              flex: 2;
              .num-box{
                display: inline-block;
                width: 150px;
                height: 40px;
                line-height: 40px;
                border: 1px solid #e5e5e5;
                font-size: 14px;
                a{
                  display: inline-block;
                  width: 50px;
                  color: #333;
                }
                span{
                  display: inline-block;
                  width: 50px;
                  color: #333;
                }
              }
            }
            .item-total{
              flex: 1;
              color: #f60;
            }
            .item-del{
              flex: 1;
              width: 14px;
              height: 12px;
              background:url('/imgs/icon-close.png') no-repeat center;
              background-size:contain;
              cursor:pointer;
            }
          }
        }
      }
      .order-wrap{
        font-size:14px;
        color: #666666;
        margin-top: 20px;
        height: 50px;
        line-height: 50px;
        .cart-tip{
          margin-left: 29px;
          a{
            color: #666666;
            margin-right:37px;
          }
          span{
            color:#FF6600;
            margin:0 5px;
          }
        }
        .total{
          font-size:14px;
          color:#FF6600;
          span{
            font-size:24px;
          }
          a{
            width:202px;
            height:50px;
            line-height:50px;
            font-size:18px;
            margin-left:37px;
          }
        }
      }
    }
  }
</style>
