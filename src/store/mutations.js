/**
 * 商城Vuex-mutations
*/
export default {
  // 来自Actions的，将Actions传来的username传给其他的组件
  saveUsername (state, username) {
    // 我们可以变更它的状态，后面可以加很多文字等等
    state.username = username
  },
  saveCartCount (state, count) {
    state.cartCount = count
  }
}
