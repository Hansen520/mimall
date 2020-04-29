import axios from 'axios'
import service from './PagesApi'
import { Toast } from 'vant'

// 循环遍历输出
const instance = axios.create({
  // 基础地址
  baseURL: '/api',
  // 超时不请求时间
  timeout: 5000
})
// 请求方法容器
const Http = {}
// 请求格式
for (const key in service) {
  const api = service[key]
  Http[key] = async function (
    // 请求参数get:url | put(data) | post(data) | patch(data) | delete:url
    params,
    // 标识是否为form请求
    isFormData = false,
    // 配置参数
    config = {}
  ) {
    let newParams = {}
    if (params && isFormData) {
      // 通过FormData构造函数创建一个空对象
      newParams = new FormData()
      for (const i in params) {
        // 可以通过append()方法来追加数据
        newParams.append(i, params[i])
      }
    } else {
      newParams = params
    }
    // 不同请求的判断
    let response = {}// 去请求的返回值
    let url
    if (api.method === 'put' || api.method === 'post' || api.method === 'patch') {
      // 用于put的拼接
      if (newParams.id) {
        url = api.url + '/' + newParams.id
      } else {
        url = api.url
      }
      try {
        response = await instance[api.method](url, newParams, config)
      } catch (err) {
        response = err
      }
    } else if (api.method === 'get' || api.method === 'delete') {
      if (newParams.id) {
        alert(newParams.id)
        url = api.url + '/' + newParams.id
      } else {
        url = api.url
        config.params = newParams
      }
      try {
        response = await instance[api.method](url, config)
      } catch (err) {
        response = err
      }
    }
    return response
  }
}

// 请求拦截器
instance.interceptors.request.use(config => {
  // 发起请求前做什么
  Toast.loading({
    // 取消遮罩
    mask: false,
    duration: 0,
    // 动画出现时候禁止其他点击
    forbidClick: true,
    message: '加载中...'
  })
  console.log(config)
  return config
}, () => {
  // 请求错误
  Toast.clear()
  Toast('请求错误，请稍后重试')
})

// 响应拦截器
instance.interceptors.response.use(response => {
  // 请求成功，Toast就清理掉
  Toast.clear()
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
    Toast.error(res.msg)
    return Promise.reject(res.msg)
  } else {
    // 为了防止没有登入也会跳到首页
    Toast.error(res.msg)
    return Promise.reject(res.msg)
  }
}, (error) => {
  // 这里是后台发来的报错
  const res = error.response
  Toast.error(res.data.message.substr(-6))
  return Promise.reject(error)
  // 如果返回的是flase，则需要在前面添加catch提示错误
})

export default Http
