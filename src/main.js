import Vue from 'vue'
import router from './router'
import axios from 'axios'
import vueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import VueCookie from 'vue-cookie'
import { Message } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'
import store from './store'
// import env from './env'

// 根据前端的跨域方式做调整 并在每个接口前加上/api,最后通过代理方式删除/api，这里作为真实对接地址，是后台开发完成的
axios.defaults.baseURL = '/api'
// easy-mock模拟地址,是后台没有开发完成的
// axios.defaults.baseURL = ' https://www.easy-mock.com/mock/5e2832dcbc40327ccfcf507f/mall'
// 默认设置时间未8000，比如超出8秒一定要做设置，不然用户体验不好
axios.defaults.timeout = 8000
// 根据环境变量获取不同的请求地址，这个是cors和jsonp跨域使用的方式，
// 如果要用这种方式，就要通过改env    下面的mock地址来实现
// axios.defaults.baseURL = env.baseURL
// 返回数据时候拦截器

axios.interceptors.response.use(function (response) {
  const path = location.hash
  const res = response.data
  // 商定 状态码0是成功，10是未登入跳到登入页面
  if (res.status === 0) {
    return res.data
    // 像下面的10报错都是业务报错，如果想拦截后台报错，我们需要继续加
  } else if (res.status === 10) {
    if (path !== '#/index') {
      window.location.href = '#/login'
    }
    Message.error(res.msg)
    return Promise.reject(res.msg)
  } else {
    // 为了防止没有登入也会跳到首页
    Message.error(res.msg)
    return Promise.reject(res.msg)
  }
}, (error) => {
  // 这里是后台发来的报错
  const res = error.response
  Message.error(res.data.message.substr(-6))
  return Promise.reject(error)
  // 如果返回的是flase，则需要在前面添加catch提示错误
})

// 将axios挂载到vueAxios上面
Vue.use(vueAxios, axios)
// 懒加载
Vue.use(VueLazyLoad, {
  loading: '/imgs/loading-svg/loading-cubes.svg'
})
// VueCookie
Vue.use(VueCookie)
// Vue.use(Message)
// 在Vue原型上加上$message方法,通过$message去引用
Vue.prototype.$message = Message

Vue.config.productionTip = false

new Vue({
  // 自己构造好的路由，并且在这里注册
  router,
  // 自己构建的Vuex插件，用于父子组件的数据共享
  store,
  render: h => h(App)
}).$mount('#app')
