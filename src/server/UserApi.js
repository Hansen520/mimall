import request from './https'

// 登入
const login = (data) => {
  return request('post', '/user/login', data)
}
// 注册
const register = (data) => {
  return request('post', '/user/register', data)
}
// 获取登录用户信息
const getUserInfo = (params) => {
  return request('get', '/user', params)
}
// 退出登入
const logout = (data) => {
  return request('post', '/user/logout', data)
}
export {
  login,
  register,
  getUserInfo,
  logout
}
