import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutations'
import actions from './action'

Vue.use(Vuex)

const state = {
  // 登入的用户名
  username: '',
  // 购物车商品数量
  cartCount: 0
}
export default new Vuex.Store({
  state,
  // 相当于mutations:mutations,下面只是简写
  mutations,
  actions
})
