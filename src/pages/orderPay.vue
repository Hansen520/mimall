<template>
  <div class="order-pay">
    <div class="wrapper">
      <div class="container">
        <div class="order-wrap">
          <div class="item-order">
            <div class="icon-succ"></div>
            <div class="order-info">
              <h2>订单提交成功！去支付吧！</h2>
              <p>请在<span>30分</span>内完成支付，超过后将取消订单</p>
              <p>收获信息：{{addressInfo}}</p>
            </div>
            <div class="order-total">
              <p>应付总额：<span>{{payment}}</span>元</p>
              <p>订单详情<em class="icon-down" :class="{'up':showDetail}"  @click="showDetail=!showDetail"></em></p>
            </div>
          </div>
          <div class="item-detail" v-show="showDetail">
            <div class="item">
              <div class="detail-title">订单号：</div>
              <div class="detail-info">{{orderNo}}</div>
            </div>
            <div class="item">
              <div class="detail-title">收货信息：</div>
              <div class="detail-info">{{addressInfo}}</div>
            </div>
            <div class="item">
              <div class="detail-title">商品名称</div>
              <div class="detail-info">
                <ul>
                  <li v-for="(item, index) in orderDetail" :key="index">
                    <img v-lazy="item.productImage" :alt="item.productName">{{item.productName}}
                  </li>
                </ul>
              </div>
            </div>
            <div class="item">
              <div class="detail-title">发票信息：</div>
              <div class="detail-info">电子发票 个人</div>
            </div>
          </div>
        </div>
        <div class="pay-wrap">
          <div class="item-pay">
            <h3>选择以下支付方式付款</h3>
            <div class="pay-way">
              <p>支付平台</p>
              <div class="pay pay-ali"></div>
              <div class="pay pay-wechat"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'order-pay',
  data () {
    return {
      orderNo: this.$route.query.orderNo,
      // 获取收货人地址
      addressInfo: '',
      // 订单详情，包含商品列表
      orderDetail: [],
      // 是否显示订单详情
      showDetail: false,
      // 支付的总金额
      payment: 0
    }
  },
  mounted () {
    this.getOrderDetail()
  },
  methods: {
    getOrderDetail () {
      this.axios.get(`/orders/${this.orderNo}`).then((res) => {
        const item = res.shippingVo
        this.addressInfo = `${item.receiverName} ${item.receiverMobile} ${item.receiverProvince} ${item.receiverCity} ${item.receiverDistrict} ${item.receiverAddress}`
        this.orderDetail = res.orderItemVoList
        this.payment = res.payment
      })
    }
  }
}

</script>

<style lang="scss">
  .order-pay{
    .wrapper{
      background-color:#F5F5F5;
      padding: 30px 0 61px 0;
      .order-wrap{
        padding: 62px 50px;
        background: #fff;
        .item-order{
          display: flex;
          align-items: center;
          margin-bottom: 40px;
          .icon-succ{
            width: 90px;
            height: 90px;
            border-radius: 50%;
            background:url('/imgs/icon-gou.png') #80c58a no-repeat center;
            background-size:60px;
            margin-right:40px;
          }
          .order-info{
            margin-right: 488px;
            h2{
            margin-bottom: 18px;
            }
            p{
              margin-bottom: 2px;
              color: #666;
              span{
                color: #FF6700
              }
            }
          }
          .order-total{
            p:first-child{
              margin-bottom: 30px;
            }
            span{
              font-size: 28px;
              color: #ff6700;
            }
            .icon-down{
              display:inline-block;
              width:14px;
              height:10px;
              background:url('/imgs/icon-down.png') no-repeat center;
              background-size:cover;
              margin-left:9px;
              transition:all .5s;
              cursor:pointer;
              &.up{
                transform: rotate(180deg)
              }
            }
            .icon-up{
              transform: rotate(180deg)
            }
          }
        }
        .item-detail{
          border-top: 1px solid #d7d7d7;
          padding: 47px 0 0 130px;
          font-size: 14px;
          margin-top: 45px;
          .item{
            margin-bottom: 19px;
            .detail-title{
              display: inline-block;
              width: 100px;
            }
            .detail-info{
              display: inline-block;
              img{
                width: 30px;
                vertical-align: middle;
              }
            }
          }
        }
      }
      .pay-wrap{
        background: #fff;
        margin-top: 31px;
        .item-pay{
          padding:26px 50px 72px;
          background-color:#fff;
          color: #333;
          h3{
            font-size: 20px;
            font-weight: 200px;
            color: #333;
            padding-bottom: 24px;
            border-bottom: 1px solid #d7d7d7;
            margin-bottom: 26px;
          }
          .pay-way{
            font-size:18px;
            .pay{
              display: inline-block;
              width: 188px;
              height: 64px;
              border: 1px solid #d7d7d7;
              cursor: pointer;
              &:last-child{
                margin-left: 20px;
              }
              &.checked{
                border: 1px solid #ff6700;
              }
            }
            .pay-ali{
              background:url('/imgs/pay/icon-ali.png') no-repeat center;
              background-size:130px 43px;
              margin-top:19px;
            }
            .pay-wechat{
              background:url('/imgs/pay/icon-wechat.png') no-repeat center;
              background-size:127px 45px;
            }
          }
        }
      }
    }
  }
</style>
