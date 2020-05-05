import request from './https'
// 联系人接口

// 支付
const pay = (data) => {
  return request('post', '/pay', data)
}

export {
  pay
}
