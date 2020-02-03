import Vue from 'vue'
import router from './router'
import axios from 'axios'
import vueAxios from 'vue-axios'
import VueLazyLoad from 'vue-lazyload'
import App from './App.vue'
// import env from './env'

// 根据前端的跨域方式做调整 并在每个接口前加上/api,最后通过代理方式删除/api，这里作为真实对接地址，是后台开发完成的
axios.defaults.baseURL = '/api'
// easy-mock模拟地址,是后台没有开发完成的
// axios.defaults.baseURL = ' https://www.easy-mock.com/mock/5e2832dcbc40327ccfcf507f/mall'
// 默认设置时间未8000，比如超出8秒一定要做设置，不然用户体验不好
axios.defaults.timeout = 8000
// 根据环境变量获取不同的请求地址，这个是cors和jsonp跨域使用的方式，
// 如果要用这种方式，就要通过改env下面的mock地址来实现
// axios.defaults.baseURL = env.baseURL
// 返回数据时候拦截器
axios.interceptors.response.use(function (response) {
  const res = response.data
  // 商定 状态码0是成功，10是未登入跳到登入页面
  if (res.status === 0) {
    return res.data
  } else if (status === 10) {
    window.location.href = '/#/login'
  } else {
    console.log(res.msg)
  }
})

// 将axios挂载到vueAxios上面
Vue.use(vueAxios, axios)
Vue.use(VueLazyLoad, {
  loading: '/imgs/loading-svg/loading-cubes.svg'
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
