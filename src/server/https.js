import axios from 'axios'
import { Toast } from 'vant'// 可有可无，你也可以用elementUI

// 循环遍历输出不同的请方法
const instance = axios.create({
  // 基础地址
  baseURL: '/api',
  // 超时不请求
  timeout: 8000
  // headers: {
  //   'X-Requested-With': 'gitXMLHttpRequest'
  // }
})

// 方法，连接，数据
const http = function (method, url, data, config) {
  // 将请求方法全都变为小写
  method = method.toLocaleLowerCase()
  // post请求
  if (method === 'post') {
    return instance.post(url, data, config)
  } else if (method === 'get') {
    return instance.get(url, {
      params: data
    })
  } else if (method === 'delete') {
    return instance.delete(url, data)
  } else if (method === 'put') {
    return instance.put(url, data)
  } else if (method === 'patch') {
    return instance.patch(url, data)
  }
}

// 添加请求拦截器
instance.interceptors.request.use(config => {
  // config 为请求的一些配置 例如：请求头 请求时间 Token  可以根据自己的项目需求个性化配置
  // config.headers.token = ''
  // 发起请求前做什么
  // Toast.loading({
  //   // 取消遮罩
  //   mask: false,
  //   duration: 0,
  //   // 动画出现时候禁止其他点击
  //   forbidClick: true,
  //   message: '加载中...'
  // })
  return config
}, error => {
  return Promise.reject(error)
})
// 添加响应拦截器
instance.interceptors.response.use(response => {
  // 请求成功，Toast就清理掉
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
    Toast(res.msg)
    return Promise.reject(res.msg)
  } else {
    // 为了防止没有登入也会跳到首页
    Toast(res.msg)
    return Promise.reject(res.msg)
  }
}, (error) => {
  Toast.clear()
  const res = error.response
  Toast(res.data.message.substr(-6))
  return Promise.reject(error)
})

export default http
