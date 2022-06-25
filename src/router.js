import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/home'
import Index from './pages/index'
// import Product from './pages/product'
// import Alipay from './pages/alipay'
// import Cart from './pages/cart'
// import Detail from './pages/detail'
// import Login from './pages/login'
// import Order from './pages/order'
// import OrderComfirm from './pages/orderComfirm'
// import OrderList from './pages/orderList'
// import OrderPay from './pages/orderPay'

Vue.use(Router)
// require.ensure(dependencies: string[], callback: function(require),chunkName:string)
const login = (resolve) =>
  require.ensure([], () => resolve(require('./pages/login')), 'login')
const cart = (resolve) =>
  require.ensure([], () => resolve(require('./pages/cart')), 'Imcart')
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      // 首先我们加载页面的时候会先到home，通过重定向页面首先打开的是index页面
      redirect: 'index',
      children: [
        {
          path: '/index',
          name: 'index',
          // 这个是根据需要再进行加载
          component: Index
        },
        {
          path: '/product/:id',
          name: 'product',
          component: (resolve) => require(['./pages/product.vue'], resolve)
        },
        {
          path: '/detail/:id',
          name: 'detail',
          component: (resolve) => require(['./pages/detail.vue'], resolve)
        }
      ]
    },
    {
      path: '/cart',
      name: 'cart',
      component: cart
    },
    {
      path: '/order',
      name: 'order',
      component: (resolve) => require(['./pages/order.vue'], resolve),
      children: [
        {
          // 不用加/，因为他会自动加
          path: 'comfirm',
          name: 'order-comfirm',
          component: (resolve) => require(['./pages/orderComfirm.vue'], resolve)
        },
        {
          path: 'list',
          name: 'order-list',
          component: (resolve) => require(['./pages/orderList.vue'], resolve)
        },
        {
          path: 'pay',
          name: 'order-pay',
          component: (resolve) => require(['./pages/orderPay.vue'], resolve)
        },
        {
          path: 'alipay',
          name: 'alipay',
          component: (resolve) => require(['./pages/alipay.vue'], resolve)
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      // component: resolve => require(['./pages/login.vue'], resolve)
      component: login
    },
    // 对element穿梭框的测试
    {
      path: '/transfer',
      name: 'transfer',
      component: (resolve) =>
        require(['./pages/elementTest/transfer.vue'], resolve)
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 }
  }
})
