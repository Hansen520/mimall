import Vue from 'vue'
import Router from 'vue-router'
import Home from './pages/home'
import Index from './pages/index'
import Product from './pages/product'
import Alipay from './pages/alipay'
import Cart from './pages/cart'
import Detail from './pages/detail'
import Login from './pages/login'
import Order from './pages/order'
import OrderComfirm from './pages/orderComfirm'
import OrderList from './pages/orderList'
import OrderPay from './pages/orderPay'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      // 首先我们加载页面的时候会先到home，通过重定向页面首先打开的是index页面
      redirect: 'index',
      children: [{
        path: '/index',
        name: 'index',
        component: Index
      }, {
        path: '/product/:id',
        name: 'product',
        component: Product
      }, {
        path: '/detail/:id',
        name: 'detail',
        component: Detail
      }
      ]
    }, {
      path: '/cart',
      name: 'cart',
      component: Cart
    }, {
      path: '/order',
      name: 'order',
      component: Order,
      children: [
        {
          // 不用加/，因为他会自动加
          path: 'comfirm',
          name: 'order-comfirm',
          component: OrderComfirm
        }, {
          path: 'list',
          name: 'order-list',
          component: OrderList
        }, {
          path: 'pay',
          name: 'order-pay',
          component: OrderPay
        }, {
          path: 'alipay',
          name: 'alipay',
          component: Alipay
        }
      ]
    }, {
      path: '/login',
      name: 'login',
      component: Login
    }

  ]
})
