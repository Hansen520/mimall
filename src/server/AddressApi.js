import request from './https'
// 联系人接口

// 添加地址
const addAddress = (data) => {
  return request('post', '/shippings', data)
}
// 删除地址
const deleteAddress = (shippindId, data) => {
  return request('post', `/shippings${shippindId}`, data)
}
// 登录状态更新地址
const updateAddress = (shippindId, data) => {
  return request('put', `/shippings${shippindId}`, data)
}
// 选中查看具体的地址
const getAddress = (params) => {
  return request('get', '/shippings', params)
}
export {
  addAddress,
  deleteAddress,
  updateAddress,
  getAddress
}
