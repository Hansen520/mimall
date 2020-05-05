<template>
  <div class="order-list">
    <order-header title="订单列表">
      <template v-slot:tip>
          请谨防钓鱼链接或诈骗电话，了解更多
      </template>
    </order-header>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <loading v-if="loading"></loading>
          <no-data v-if="!loading && list.length === 0"></no-data>
          <div class="order" v-for="(order, index) in list" :key="index">
            <div class="order-title">
              <div class="item-info fl">
                {{order.createTime}}
                <span>|</span>
                {{order.receiverName}}
                <span>|</span>
                订单号：{{order.orderNo}}
                <span>|</span>
                {{order.paymentTypeDesc}}
              </div>
              <div class="item-money fr">
                <span>应付金额:</span>
                <span class="money">{{order.payment}}</span>
                <span>元</span>
              </div>
            </div>
            <div class="order-content clearbox">
              <div class="good-box fl">
                <div class="good-list" v-for="(item, i) in order.orderItemVoList" :key="i">
                  <div class="good-img">
                     <img v-lazy="item.productImage" alt="">
                  </div>
                  <div class="good-name">
                    <div class="p-name">{{item.productName}}</div>
                    <div class="p-money">{{item.totalPrice}} x {{item.quantity}}元</div>
                  </div>
                </div>
              </div>
              <div class="good-state fr" v-if="order.status === 20">
                <a href="javascript:;" :class="{checked: order.status === 20}">{{order.statusDesc}}</a>
              </div>
              <div class="good-state fr" v-else>
                <a href="javascript:;" @click="goPay(order.orderNo)">{{order.statusDesc}}-></a>
              </div>
            </div>
          </div>
          <div class="scroll-more"
            v-infinite-scroll="scrollMore"
            infinite-scroll-disabled="busy"
            infinite-scroll-distance="210"
          >
            <img src="/imgs/loading-svg/loading-spinning-bubbles.svg" alt="" v-show="loading">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import OrderHeader from './../components/OrderHeader'
import Loading from './../components/Loading'
import NoData from './../components/NoData'
import infiniteScroll from 'vue-infinite-scroll'
import { getOrderList } from './../server/OrderApi'
export default {
  name: 'order-list',
  data () {
    return {
      // 订单列表
      list: [],
      // 是否加载loading
      loading: false,
      // 每页显示条数
      pageSize: 5,
      // 总数
      total: 0,
      // 当前页码
      pageNum: 1,
      // 判断是否显示加载更多，当显示最后一页时，加载更多消失
      showNextPage: true,
      // 滚动判断 false为要自动加载，true为不加载
      busy: false
    }
  },
  components: {
    OrderHeader,
    Loading,
    NoData
  },
  directives: {
    // 滚动加载器的局部注册
    infiniteScroll
  },
  mounted () {
    // this.getOrderList()
  },
  methods: {
    // 第三种滚动加载，通过npm插件实现
    scrollMore () {
      this.loading = true
      this.busy = true
      setTimeout(() => {
        this.getOrderList()
        this.pageNum++
      }, 1000)
    },
    async getOrderList () {
      // get
      const res = await getOrderList({
        // 把每页的展示的大小给后台
        pageSize: this.pageSize,
        // 把当前页数给后台
        pageNum: this.pageNum
      })
      this.loading = false
      this.list = this.list.concat(res.list)
      if (res.hasNextPage) {
        this.busy = false
      } else {
        this.busy = true
      }
      // this.axios.get('/orders', {
      //   params: {
      //     // 把每页的展示的大小给后台
      //     pageSize: this.pageSize,
      //     // 把当前页数给后台
      //     pageNum: this.pageNum
      //   }
      // }).then((res) => {
      //   this.loading = false
      //   // 为了让list进行拼接出现
      //   this.list = this.list.concat(res.list)
      //   // 判断有没有下一页，后台传入，是通过距离底下410px距离时才开始判断，infinite-scroll-distance="410"
      //   if (res.hasNextPage) {
      //     this.busy = false
      //   } else {
      //     this.busy = true
      //   }
      // })
    },
    goPay (orderNo) {
      this.$router.push({
        path: '/order/pay',
        query: {
          orderNo
        }
      })
    }
  }
}

</script>

<style lang="scss">
  @import './../assets/scss/config.scss';
  @import './../assets/scss/mixin.scss';
  .order-list{
    .wrapper{
      background-color: $colorJ;
      padding-top: 33px;
      padding-bottom: 110px;
      .order-box{
        .order{
          border: 1px solid #ccc;
          background-color: $colorG;
          margin-bottom: 31px;
          &:last-child{
            margin-bottom: 0;
          }
          .order-title{
            height: 74px;
            line-height: 74px;
            background: $colorK;
            padding: 0 43px;
            font-size: 16px;
            color: $colorC;
            .item-info{
              span{
                margin: 0 9px;
              }
            }
            .money{
              font-size: 26px;
              color: $colorB;
            }
          }
          .order-content{
            padding: 0 43px;
            .good-box{
              width: 88%;
              .good-list{
                display: flex;
                align-items: center;
                height: 145px;
                .good-img{
                  width: 112px;
                  img{
                    width: 100%;
                  }
                }
                .good-name{
                  font-size: 20px;
                  color: $colorB;
                }
              }
            }
            .good-state{
              height: 145px;
              line-height: 145px;
              font-size: 20px;
              color: $colorA;
              a{
                color: $colorA;
                &.checked{
                  color:$colorE;
                }
              }
            }
          }
        }
        .pagination{
          text-align: right;
        }
        .el-pagination.is-background .el-pager li:not(.disabled).active{
          background: #f60;
        }
        .el-button--primary{
          background-color: #FF6600;
          border-color: #FF6600;
        }
        .load-more,.scroll-more{
          text-align:center;
        }
      }
    }
  }
</style>
