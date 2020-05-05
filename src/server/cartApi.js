import request from './https'

// 购物车列表
const getCartList = (params) => {
  return request('get', '/carts', params)
}
// 添加购物车商品
const addToCart = (data) => {
  return request('post', '/carts', data)
}
// 更新购物车数量
const updateCartNumber = (productId, data) => {
  return request('put', `/carts/${productId}`, data)
}
// 移除购物车某个产品
const removeCartProduct = (productId, data) => {
  return request('delete', `/carts/${productId}`, data)
}
// 全选
const selectAll = (data) => {
  return request('put', '/carts/selectAll', data)
}
// 全不选
const unSelectAll = (data) => {
  return request('put', '/carts/unSelectAll', data)
}
// 获取购物中所有商品数量总和
const computeAllGoodsSum = (param) => {
  return request('get', '/carts/products/sum', param)
}
export {
  getCartList,
  addToCart,
  updateCartNumber,
  removeCartProduct,
  selectAll,
  unSelectAll,
  computeAllGoodsSum
}
