const PAGESAPI = {
  // 产品列表搜索及动态排序
  getProducts: {
    method: 'get',
    url: '/products'
  },
  // 产品详情页
  getProductsId: {
    method: 'get',
    url: '/products'
  },
  // 支付接口
  pay: {
    method: 'post',
    url: '/pay'
  },
  // 收货地址之添加地址
  addAddress: {
    method: 'post',
    url: '/shippings'
  },
  // 收货地址之删除地址
  deleteAddress: {
    method: 'delete',
    url: '/shippings'
  },
  // 登入状态更新
  updateAddress: {
    method: 'put',
    url: '/shippings'
  },
  // 查看具体地址
  seeAddress: {
    method: 'get',
    url: '/shippings'
  },
  getAddress: {
    method: 'get',
    url: '/shippings'
  },
  // 登入接口
  login: {
    method: 'post',
    url: '/user/login'
  },
  // 注册接口
  register: {
    method: 'post',
    url: '/user/register'
  },
  // 获取用户登入信息
  getRightUser: {
    method: 'get',
    url: '/user'
  },
  // 退出登入
  logout: {
    method: 'get',
    url: '/products'
  },
  // 创建订单
  addOrder: {
    method: 'post',
    url: '/orders'
  },
  // 订单列表
  orderList: {
    method: 'get',
    url: '/orders'
  },
  // 订单详情
  orderDetail: {
    method: 'get',
    url: '/orders'
  },
  // 取消订单
  cancelOrder: {
    method: 'put',
    url: '/orders'
  },
  // 购物车list
  cart: {
    method: 'get',
    url: '/carts'
  },
  addCart: {
    method: 'post',
    url: '/carts'
  },
  updateCart: {
    method: 'put',
    url: '/carts'
  },
  deleteCart: {
    method: 'delete',
    url: '/carts'
  },
  // 全选
  allSelect: {
    method: 'put',
    url: 'carts/selectAll'
  },
  // 全不选
  notAllSelect: {
    method: 'put',
    url: '/carts/unSelectAll'
  },
  // 获取商品数量总和
  getNum: {
    method: 'get',
    url: '/carts/products/sum'
  }
}

export default PAGESAPI
