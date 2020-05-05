import request from './https'
// 联系人接口

// 产品搜索及动态排序List
const getProductionList = (params) => {
  return request('get', '/products', params)
}
// 产品detail
const getProductionDetail = (productId, params) => {
  return request('get', `/products/${productId}`, params)
}

export {
  getProductionList,
  getProductionDetail
}
