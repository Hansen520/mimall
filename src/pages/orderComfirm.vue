<template>
    <div class="order-comfirm">
    <order-header title="订单确认">
      <template v-slot:tip>
          请认真填写收货地址
      </template>
    </order-header>
    <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="position: absolute; width: 0px; height: 0px; overflow: hidden;">
      <defs>
        <symbol id="icon-add" viewBox="0 0 31 32">
          <title>add</title>
          <path d="M30.745 15.152h-14.382v-14.596c0-0.308-0.243-0.557-0.543-0.557s-0.543 0.249-0.543 0.557v14.596h-14.665c-0.3 0-0.543 0.249-0.543 0.557s0.243 0.557 0.543 0.557h14.665v15.177c0 0.307 0.243 0.557 0.543 0.557s0.543-0.249 0.543-0.557v-15.177h14.382c0.3 0 0.543-0.249 0.543-0.557s-0.243-0.557-0.543-0.557z" class="path1"></path>
        </symbol>
        <symbol id="icon-edit" viewBox="0 0 32 32">
          <title>edit</title>
          <path d="M28.287 8.51l-4.805-4.806 0.831-0.831c0.472-0.472 1.086-0.777 1.564-0.777 0.248 0 0.452 0.082 0.622 0.253l3.143 3.144c0.539 0.54 0.133 1.529-0.524 2.186l-0.831 0.831zM26.805 9.992l-1.138 1.138-4.805-4.806 1.138-1.138 4.805 4.806zM24.186 12.612l-14.758 14.762-4.805-4.806 14.758-14.762 4.805 4.806zM7.379 28.288l-4.892 1.224 1.223-4.894 3.669 3.67zM31.123 4.011l-3.143-3.144c-0.567-0.567-1.294-0.867-2.103-0.867-1.036 0-2.174 0.52-3.045 1.391l-20.429 20.436c-0.135 0.134-0.23 0.302-0.276 0.487l-2.095 8.385c-0.089 0.355 0.017 0.736 0.276 0.995 0.198 0.198 0.461 0.307 0.741 0.307 0.085 0 0.171-0.010 0.254-0.031l8.381-2.096c0.185-0.047 0.354-0.142 0.487-0.276l20.43-20.436c1.409-1.41 2.042-3.632 0.524-5.15v0z" class="path1"></path>
        </symbol>
        <symbol id="icon-del" viewBox="0 0 32 32">
          <title>delete</title>
          <path d="M11.355 4.129v-2.065h9.29v2.065h-9.29zM6.194 29.935v-23.742h19.613v23.742h-19.613zM30.968 4.129h-8.258v-3.097c0-0.569-0.463-1.032-1.032-1.032h-11.355c-0.569 0-1.032 0.463-1.032 1.032v3.097h-8.258c-0.569 0-1.032 0.463-1.032 1.032s0.463 1.032 1.032 1.032h3.097v24.774c0 0.569 0.463 1.032 1.032 1.032h21.677c0.569 0 1.032-0.463 1.032-1.032v-24.774h3.097c0.569 0 1.032-0.463 1.032-1.032s-0.463-1.032-1.032-1.032v0z" class="path1"></path>
          <path d="M10.323 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z" class="path2"></path>
          <path d="M16 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z" class="path3"></path>
          <path d="M21.677 9.806c-0.569 0-1.032 0.463-1.032 1.032v14.452c0 0.569 0.463 1.032 1.032 1.032s1.032-0.463 1.032-1.032v-14.452c0-0.569-0.463-1.032-1.032-1.032z" class="path4"></path>
        </symbol>
      </defs>
    </svg>
    <div class="wrapper">
      <div class="container">
        <div class="order-box">
          <div class="item-address">
            <h2 class="addr-title">收货地址</h2>
            <div class="addr-list clearbox">
              <!-- 这种默认索引的方式是最常用的 -->
              <div class="addr-info" :class="{'checked': index === checkIndex}" @click="checkIndex=index" v-for="(item, index) in list" :key="index">
                <h2>{{item.receiverName}}</h2>
                <div class="phone">{{item.receiverMobile}}</div>
                <div class="street">{{`${item.receiverProvince} ${item.receiverCity} ${item.receiverDistrict} ${item.receiverAddress}`}}</div>
                <div class="zip">邮政编码{{item.receiverZip}}</div>
                <div class="action">
                  <a href="javascript:;" class="fl" @click="delAddress(item)">
                    <svg class="icon icon-del"><use xlink:href="#icon-del"></use></svg>
                  </a>
                  <a href="javascript:;" class="fr" @click="changeAddress(item)">
                    <svg class="icon icon-edit"><use xlink:href="#icon-edit"></use></svg>
                  </a>
                </div>
              </div>
              <div class="addr-add" @click="openAddressModal">
                <div class="icon-add"></div>
                <div class="add">新添加地址</div>
              </div>
            </div>
          </div>
          <div class="item-good">
            <h2>商品</h2>
            <ul>
              <li v-for="(item, index) in cartList" :key="index">
                <div class="good-name">
                  <img v-lazy="item.productMainImage" alt="">
                  <span>{{item.productName + ' ' + item.productSubtitle}}</span>
                </div>
                <div class="good-price">{{item.productPrice}}元x{{item.quantity}}</div>
                <div class="good-total">{{item.productTotalPrice}}元</div>
              </li>
            </ul>
          </div>
          <div class="item-shipping">
            <h2>配送方式</h2>
            <span>包邮</span>
          </div>
          <div class="item-invoice">
            <h2>发票</h2>
            <a href="javascript:;">电子发票</a>
            <a href="javascrip:;">个人</a>
          </div>
          <div class="detail">
            <div class="item">
              <span class="item-name">商品件数：</span>
              <span class="item-val">{{count}}件</span>
            </div>
            <div class="item">
              <span class="item-name">商品总价：</span>
              <span class="item-val">{{cartTotalPrice}}元</span>
            </div>
            <div class="item">
              <span class="item-name">优惠活动：</span>
              <span class="item-val">0元</span>
            </div>
            <div class="item">
              <span class="item-name">运费：</span>
              <span class="item-val">0元</span>
            </div>
            <div class="item-total">
              <span class="item-name">应付总额：</span>
              <span class="item-val">{{cartTotalPrice}}元</span>
            </div>
          </div>
          <div class="btn-group">
            <a href="/#/cart" class="btn btn-default btn-large">返回购物车</a>
            <a href="javascript:;" class="btn btn-large" @click="orderSubmit">去结算</a>
          </div>
        </div>
      </div>
    </div>
    <modal
      title="删除确认"
      btnType = "1"
      :showModal = "showDelModal"
      @cancel = "showDelModal=false"
      @submit="submitAddress"
    >
      <template v-slot:body>
        您确认要删除此地址吗？
      </template>
    </modal>
    <modal
      title="新增确认"
      btnType="1"
      :showModal="showEditModal"
      @cancel="showEditModal=false"
      @submit="submitAddress"
    >
      <template v-slot:body>
        <div class="edit-wrap">
          <div class="item">
            <input type="text" class="input" placeholder="姓名" v-model="checkedItem.receiverName">
            <input type="text" class="input" placeholder="手机号" v-model="checkedItem.receiverMobile">
          </div>
          <div class="item">
            <select name="province" v-model="checkedItem.receiverProvince">
              <option value="北京">北京</option>
              <option value="天津">天津</option>
              <option value="河北">河北</option>
            </select>
            <select name="city" v-model="checkedItem.receiverCity">
              <option value="北京">北京</option>
              <option value="天津">天津</option>
              <option value="河北">石家庄</option>
            </select>
            <select name="district" v-model="checkedItem.receiverDistrict">
              <option value="北京">昌平区</option>
              <option value="天津">海淀区</option>
              <option value="河北">东城区</option>
              <option value="天津">西城区</option>
              <option value="河北">顺义区</option>
              <option value="天津">房山区</option>
            </select>
          </div>
          <div class="item">
            <textarea name="street" v-model="checkedItem.receiverAddress" style="resize:none;" cols="8" rows="15" placeholder="请输入详细街道" maxlength="50"></textarea>
          </div>
          <div class="item">
            <input type="text" v-model="checkedItem.receiverZip" class="input" placeholder="邮政编码">
          </div>
        </div>
      </template>
    </modal>
  </div>
</template>

<script>
import OrderHeader from './../components/OrderHeader'
import Modal from './../components/Modal'
export default {
  name: 'order-comfirm',
  data () {
    return {
      // 是否显示编辑框
      showEditModal: false,
      // 是否出现删除地址modal
      showDelModal: false,
      // 收货地址列表
      list: [],
      // 商品总金额
      cartTotalPrice: 0,
      // 购物车需要结算的商品列表
      cartList: [],
      // 商品结算数量
      count: 0,
      // 添加用户的行为, 默认为0, 新增地址1, 编辑地址2, 删除为 3
      userActions: 0,
      // 地址的列表
      checkedItem: {},
      // 默认选中地址
      checkIndex: 0

    }
  },
  components: {
    Modal,
    OrderHeader
  },
  mounted () {
    this.getAddressList()
    this.getCartList()
  },
  methods: {
    // 获得地址列表
    async getAddressList () {
      const res = await this.$Http.getAddress()
      this.list = res.list
      // this.axios.get('/shippings').then((res) => {
      //   this.list = res.list
      // })
    },
    delAddress (item) {
      // 把数据给checkedItem
      this.checkedItem = item
      this.showDelModal = true
      this.userActions = 3
    },
    // 打开新增地址弹框
    openAddressModal () {
      this.userActions = 1
      this.checkedItem = {}
      this.showEditModal = true
    },
    // 改变地址
    changeAddress (item) {
      this.userActions = 2
      this.checkedItem = item
      this.showEditModal = true
    },
    // 地址删除、编辑、新增功能的提交,这里是值得自己学习的，减少代码冗余
    async submitAddress () {
      const { checkedItem, userActions } = this
      // let method
      // let url
      let data = {}

      // 新增或者编辑时候发生的事情,利用双向绑定来做
      if (userActions === 1 || userActions === 2) {
        const { receiverName, receiverMobile, receiverProvince, receiverCity, receiverDistrict, receiverAddress, receiverZip } = checkedItem
        let errMsg = ''
        if (!receiverName) {
          errMsg = '请输入收货人名称'
          //  || !(/^1[3456789]\d{9}$/).test(receiverMobile)
        } else if (!receiverMobile) {
          errMsg = '请输入正确格式的手机号!'
        } else if (!receiverProvince) {
          errMsg = '请选择省份'
        } else if (!receiverCity) {
          errMsg = '请选择对应的城市'
        } else if (!receiverAddress || !receiverDistrict) {
          errMsg = '请输入收货地址'
        } else if (!/\d{6}/.test(receiverZip)) {
          errMsg = '请输入六位邮编'
        }
        if (errMsg) {
          this.$message.error(errMsg)
          return
        }
        data = {
          receiverName,
          receiverMobile,
          receiverProvince,
          receiverCity,
          receiverDistrict,
          receiverAddress,
          receiverZip
        }
      }
      if (userActions === 1) {
        // post
        await this.$Http.addAddress(data)
        this.closeModal()
        this.getAddressList()
        // method = 'post'
        // url = '/shippings'
      } else if (userActions === 2) {
        // put
        await this.$Http.updateAddress({
          // 用于拼接
          id: checkedItem.id,
          ...data
        })
        this.closeModal()
        this.getAddressList()
        // method = 'put'
        // url = `/shippings/${checkedItem.id}`
      } else if (userActions === 3) {
        // delete
        await this.$Http.deleteAddress({ id: checkedItem.id })
        this.closeModal()
        this.getAddressList()
        // method = 'delete'
        // url = `/shippings/${checkedItem.id}`
      }

      // 这是一种新型的用法。类似this.axios.get/post/put/delete
      // this.axios({ method, url, data }).then(() => {
      //   this.closeModal()
      //   // 这里避免用户并行，重新拉取一次数据
      //   this.getAddressList()
      //   this.$message.success('操作成功')
      // }).catch((err) => {
      //   this.$message.error(err)
      // })
    },
    // 关闭modal后发生的事情
    closeModal () {
      this.checkedItem = {}
      this.userActions = 0
      this.showDelModal = false
      this.showEditModal = false
    },
    // 获得购物车列表
    async getCartList () {
      const res = await this.$Http.cart()
      const list = res.cartProductVoList
      this.cartTotalPrice = res.cartTotalPrice
      this.cartList = list.filter(item => item.productSelected)
      // 遍历器，把已经选择的商品数量遍历出来
      this.cartList.map((item) => {
        this.count += item.quantity
      })

      // this.axios.get('/carts').then((res) => {
      //   const list = res.cartProductVoList
      //   this.cartTotalPrice = res.cartTotalPrice
      //   this.cartList = list.filter(item => item.productSelected)
      //   // 遍历器，把已经选择的商品数量遍历出来
      //   this.cartList.map((item) => {
      //     this.count += item.quantity
      //   })
      // })
    },
    // 订单提交
    async orderSubmit () {
      // 直接判断全部列表中的索引，这是巧妙的用法
      const item = this.list[this.checkIndex]
      if (!item) {
        this.$message.error('请选择一个地址')
        return false
      }
      // post
      const res = await this.$Http.addOrder({
        shippingId: item.id
      })
      this.$router.push({
        path: '/order/pay',
        query: {
          orderNo: res.orderNo
        }
      })
      // this.axios.post('/orders', {
      //   // 传递当前选定的地址
      //   shippingId: item.id
      // }).then((res) => {
      //   this.$router.push({
      //     path: '/order/pay',
      //     query: {
      //       orderNo: res.orderNo
      //     }
      //   })
      // })
    }
  }
}

</script>

<style lang='scss'>
  .order-comfirm{
    .wrapper{
      background: #f5f5f5;
      padding-top: 30px;
      padding-bottom: 40px;
      .order-box{
        background: #fff;
        padding: 40px 0 40px 0;
        .addr-title{
          font-size: 20px;
          color: #333;
          font-weight: 200;
          margin-bottom: 21px;
        }
        .item-address{
          padding-top: 30px;
          .addr-list{
            .addr-info,.addr-add{
              box-sizing: border-box;
              width: 271px;
              height: 180px;
              float: left;
              margin-left: 15px;
              margin-bottom: 10px;
              border: 1px solid #e5e5e5;
              padding: 15px 24px;
              font-size: 14px;
              color: #757575;
            }
            .addr-info{
              cursor: pointer;
              h2{
                height: 27px;
                font-size: 18px;
                font-weight: 300;
                color: #333;
                margin-bottom: 10px;
              }
              .street{
                height: 50px;
              }
              .action{
                height: 50px;
                line-height: 50px;
                .icon{
                  width: 20px;
                  height: 20px;
                  fill: #000;
                  vertical-align: middle;
                  &:hover{
                    fill: red;
                  }
                }
              }
              &.checked{
                border: 1px dashed #ff6700;
              }
            }
            .addr-add{
              text-align: center;
              color: #999;
              cursor: pointer;
              .icon-add{
                width: 30px;
                height: 30px;
                border-radius: 50%;
                background:url('/imgs/icon-add.png') #E0E0E0 no-repeat center;
                background-size: 14px;
              }
              .add{
                margin: 40px auto;
              }
            }
          }
        }
        .item-good{
          margin-top: 34px;
          border-bottom: 1px solid #e5e5e5;
          padding-bottom: 12px;
          h2{
            border-bottom: 1px solid #e5e5e5;
            padding-bottom: 5px;
          }
          li{
            display: flex;
            align-items: center;
            height: 40px;
            margin-top: 10px;
            font-size: 16px;
            color: #333;
            .good-name{
              flex: 5;
              img{
                width: 30px;
                height: 30px;
                vertical-align: middle;
              }
            }
            .good-price{
              flex: 2;
            }
            .good-total{
              padding-right: 44px;
              color: #ff6600;
            }
          }
        }
        .item-shipping,.item-invoice{
          margin-top:31px;
          line-height: 20px;
          h2{
            display: inline-block;
            margin-right: 71px;
            font-size: 20px;
            width: 80px;
          }
          span,a{
            font-size:16px;
            color:#FF6700;
            margin-right:23px;
          }
        }
        .detail{
          padding: 50px 44px 33px 0;
          border-bottom: 1px solid #f5f5f5;
          text-align: right;
          font-size: 16px;
          color: #666666;
          .item-val{
            color:#FF6700;
          }
          .item{
            line-height: 15px;
            margin-bottom: 12px;
          }
          .item-val{
            display:inline-block;
            width:100px;
          }
          .item-total{
            .item-val{
              font-size:28px;
            }
          }
        }
        .btn-group{
          margin-top: 37px;
          text-align: right;
        }
      }
    }
    .edit-wrap{
      font-size:14px;
      .item{
        margin-bottom:15px;
        .input{
          display:inline-block;
          width:283px;
          height:40px;
          line-height:40px;
          padding-left:15px;
          border:1px solid #E5E5E5;
          margin-bottom: 10px;
        }
        select{
          height:40px;
          line-height:40px;
          border:1px solid #E5E5E5;
          margin-right:15px;
        }
        textarea{
          height:62px;
          width:100%;
          padding:13px 15px;
          box-sizing:border-box;
          border:1px solid #E5E5E5;
        }
      }
    }
  }
</style>
