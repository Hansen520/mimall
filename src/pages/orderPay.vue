<template>
  <div class="order-pay">
    <order-header title="订单支付">
      <template v-slot:tip>
          请谨防钓鱼链接或诈骗电话，了解更多
      </template>
    </order-header>
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
              <div class="pay pay-ali" :class="{'checked': paytype === 1}" @click="pay(1)"></div>
              <div class="pay pay-wechat" :class="{'checked': paytype === 2}" @click="pay(2)"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <scan-pay-code
    :img="qrCode"
    :wxpay="showWxpay"
    @close="closePayModal"
    ></scan-pay-code>
    <modal
      title="支付确认"
      btnType="3"
      :showModal="showPayModal"
      sureText="查看订单"
      cancelText="未支付"
      @cancel="showPayModal=false"
      @submit="goOrderList"
    >
    <template v-slot:body>你确定支付了吗？</template>
    </modal>
  </div>
</template>

<script>
import OrderHeader from './../components/OrderHeader'
import QRCode from 'qrcode'
import ScanPayCode from './../components/ScanPayCode'
import Modal from './../components/Modal'
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
      payment: 0,
      // 支付类型 1为支付宝，2为微信
      paytype: 1,
      // 微信支付二维码
      qrCode: '',
      // 是否显示微信二维码弹框
      showWxpay: false,
      // 是否显示modal提示弹框,第二次支付确认弹框
      showPayModal: false,
      // 定时器，用作轮询，判断微信有没有支付成功，如果没有成功一直轮询
      T: ''
    }
  },
  components: {
    OrderHeader,
    // 微信扫码跳出来组件
    ScanPayCode,
    Modal
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
    },
    // 1支付宝支付，2微信支付
    pay (paytype) {
      if (paytype === 1) {
        this.paytype = 1
        // 打开支付宝支付页面，this.orderNo通过order-comfirm的路由传参过来的
        window.open('/#/order/alipay?orderId=' + this.orderNo, '_blank')
      } else if (paytype === 2) {
        this.paytype = 2
        this.axios.post('/pay', {
          orderId: this.orderNo,
          orderName: 'Vue高仿小米商城2020年2月21日支付宝功能',
          amount: 0.01, // 元
          payType: 2
        }).then(({ content }) => {
          // 如果请求接口成功，则通过二维码插件的形式传回来
          QRCode.toDataURL(content)
            .then(url => {
              this.qrCode = url
              this.showWxpay = true
              // 轮询
              this.loopOrderState()
            })
            .catch(() => {
              this.$message.error('此支付二维码失效！')
            })
        })
      }
    },
    // 轮询当前订单支付状态
    loopOrderState () {
      // 就是说每隔1000mm去调用下接口，看看有没有完成支付，如果完成就自动跳到订单页面
      this.T = setInterval(() => {
        this.axios.get(`/orders/${this.orderNo}`).then((res) => {
          if (res.status === 20) {
            // 清除定时器，防止关闭后一直轮询
            clearInterval(this.T)
            this.goOrderList()
          }
        })
      }, 1000)
    },
    // 关闭微信弹框
    closePayModal () {
      clearInterval(this.T)
      this.showWxpay = false
      this.showPayModal = true
    },
    // 支付成功后跳转到订单查看页面
    goOrderList () {
      this.$router.push('/order/list')
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
