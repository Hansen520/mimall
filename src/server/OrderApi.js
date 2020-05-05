import request from './https'

// 创建订单
const addOrder = (data) => {
  return request('post', '/orders', data)
}
// 订单列表
const getOrderList = (params) => {
  return request('get', '/orders', params)
}
// 订单详情
const orderDetail = (orderNo, params) => {
  return request('get', `/orders/${orderNo}`, params)
}
// 取消订单
const cancelOrder = (orderNo, data) => {
  return request('put', `/orders/${orderNo}`, data)
}
export {
  addOrder,
  getOrderList,
  orderDetail,
  cancelOrder
}
