/**
 * 商城Vuex-actions
*/
export default {
  // 接收来自组件派发的来的数据,saveUserName()就是前面派发来的，所以名字要和前面参数一定义的一样
  saveUserName (context, username) {
    // 通过context将username传送到mutations
    // 同样下commit里面参数一为自定(但是为了保持统一定义一样，参数二为前面派发来的数据)
    context.commit('saveUsername', username)
  },
  saveCartCount (context, count) {
    context.commit('saveCartCount', count)
  }
}
