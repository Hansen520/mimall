# mimall
# mimall

### 目录结构
src 里面主要放一些文件然后下面放如下目录 
  api 里面放一些接口  
  components 里面放一些组件  
  pages里面放一些页面 其中home为主页面，里面写好了页面的首尾，其他页面只要往home里面种的 router-view里面写东西就行，从而能够复用，不用让每个页面重复写首尾  
  util 公共工具页面  
  storage 存储页面  

### 插件安装
 npm i vue-lazyload element-ui node-sass sass-loader vue-awesome-swiper vue-axios vue-cookie --save-dev  
 也就是说本项目采用懒加载，sass预处理器，轮播图插件，vue-axios插件(这个主要避免每个组件都导入import axios的麻烦) vue-cookie只是本项目用的因为要识别你的身份  

### vue-router的使用
比如如下代码：
```
export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      // 首先我们加载页面的时候会先到home，因为他是/，主要的，通过重定向页面首先打开的是index页面
      redirect: 'index',
      children: [{
        path: '/index',
        name: 'index',
        component: Index
      }, {
        path: '/product/:id',
        name: 'product',
        component: Product
      }]
    }]
```
像上面一样，home为主路由，而children里面为分路由。在主路由里面的vue页面上写上```<router-view>```标签，就可以将子路由的内容页面插入到里面。
记住一定要先在main.js里面注册才能用哦

### storage
这个主要设置localsession的封装的，用于会话处理机制的

### 接口错误拦截
主要在mian.js里面通过axios.interceptors.response.use返回拦截的方式处理一些状态码，并通过状态吗做一些处理

### 接口环境设置
main.js里面,
```
// 根据前端的跨域方式做调整 /a/b : /api/a/b => /a/b,因为我们在每条接口上都写上了api
axios.defaults.baseURL = '/api'
// 默认设置时间未8000，比如超出8秒一定要做设置，不然用户体验不好
axios.defaults.timeout = 8000
// 根据环境变量获取不同的请求地址
axios.defaults.baseURL = env.baseURL
```
env.js
```
let baseURL
/**
 * process.env.NODE_ENV 是通过nodejs的方式寻找当前环境是开发模式开始生产模式
 * 切记这个是cors跨域模式或者是jsonp跨域模式下的，而proxy不用这玩意 */

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://dev-mall-pre.springboot.cn/api'
} else if (process.env.NODE_ENV === 'test') {
  baseURL = 'http://test-mall-pre.springboot.cn/api'
} else if (process.env.NODE_ENV === 'production') {
  baseURL = 'http://mall-pre.springboot.cn/api'
} else {
  baseURL = 'http://mall-pre.springboot.cn/api'
}

export default {
  baseURL
}
```
package.json
其中development是开发环境的，production是生产环境的
```
    "serve": "vue-cli-service serve --mode=development",
    "test" : "vue-cli-service serve --mode=test",
    "build": "vue-cli-service build --mode=production",
```

### mock模拟的三种方式
优先选择easy-mock，因为这个和我们请求数据xml最接近
其次选择mock集成，就是安装mock.js
最后再考虑本地json数据的方式

### 组件1：modal组件 
这是一个弹框组件，把弹框的内容覆盖在遮罩层上

### 组件2： vue-awesome-swiper组件
这是一个轮播图的组件，覆盖了市场上绝大轮播图的功能非常好用
[文字链接](https://www.swiper.com.cn/)
```
      // 基本设置下面就行了
      swiperOption1: {
        autoplay: true,
        speed: 800,
        // 是否图片连接播放，如果不连接则直接跳到第一张
        // loop: false,
        // slidesPerView: 3,//三个并排显示
        touchAngle: 10,
        keyboard: true,
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        }
```

### 组件3 ： 图片懒加载vue-lazyload
现在main.js注册vue-lazyload，如下所示
```
Vue.use(VueLazyLoad, {
  loading: '/imgs/loading-svg/loading-cubes.svg'
})
```
其中loading就在在还没有加载的时候出现svg图片，这个图片都是编码而成的
然后在index.vue页面里面用v-lazy代替src就可以了。
[文字链接](https://www.npmjs.com/package/vue-lazyload)

### 组件4： vue-cookies
这个是通过设置cookies传给后台，作为你的登入的唯一标题
[文字链接](https://www.npmjs.com/package/vue-cookies)

### emit与props
emit是子组件传递给父组件，props是父组件传给子组件的

## 产品模块出现的组件
### 组件吸顶的实现
这个主要通过监听模式，然后配合sroll事件和几个高度配合使用而成的，而且单独分离出来写的组件，
而且逻辑样式也是写在这个组件里面

### 视频组件
当点击时候出现视频组件，这里主要是出现视频的两种动画
第一种 利用原生的transition， 具体看prooduct.copy  
第二种 利用自定义animate去实现动画  
这种动画单独写会出现很多问题，第二种关键代码如下
```
<div class="item-video">
  <h2>60帧超慢动作摄影<br/>慢慢回味每一瞬间的精彩</h2>
  <p>后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！<br/>更能AI 精准分析视频内容，15个场景智能匹配背景音效。</p>
  <div class="video-bg" @click="showVideo='slideDown'"></div>
  <!-- v-show == ''相当于flase相当于display=none -->
  <!-- 这里相当于动画时间结束后为''就行 ，但是不能手动去设置true和false-->
  <div class="video-box" v-show="showVideo">
    <div class="overlay"></div>
    <div class="video" :class="showVideo">
      <span class="icon-close" @click="closeVideo"></span>
      <video src="/imgs/product/video.mp4" muted autoplay controls="controls"></video>
    </div>
  </div>
</div>

buy () {
      const id = this.$route.params.id
      this.$route.push(`/detail/${id}`)
    },
    closeVideo () {
      this.showVideo = 'slideUp'
      setTimeout(() => {
        this.showVideo = ''
      }, 600)
    }
```
为什么要这么做：因为在做的时候出现当console查看时候，视频会跳出来，具体代码参照product

#### 出现的一个bug
就是没右登入时候，用户名为underfind，所以我们在函数定义时候给res一个默认值就行

### slide 动画的实现
就是视频点击时候出现有一个滑动的效果，方法一通过过度动画实现，方法二是可以根据自定义动画实现  
这里说明：对于简单动画，我们用过度动画就可以实现了，对于复杂动画可以用自定义动画去实现

### 购物车渲染这部分
这个部分是个精细的活，里面包过购物车的全选和非全选，包括商品更新删除，还有各种数组API的运用，是个需要好好学习深入的对象

### ElementUI
这是一个UI的渲染框架，主要用作后端，是个需要好好学习的玩意

### 订单确认页面
主要有svg的研究  
用默认为0, 新增地址1, 编辑地址2, 删除为 3 通过三个接口实现一个模块的三个功能，是一个了不起方案，然后用this.axios({ method, url, data })的方法把三个接口放在一起，类似this.axios.get/post/put/delete。  
还有:class="{'checked': index === checkIndex}" @click="checkIndex=index" 选择切换按键的方式切换；  
const { checkedItem, userActions } = this 一种解构赋值，ES6常用

### 支付宝支付页面和微信支付页面
主要是根据后台接口去调用的，这部分需要仔细详细研究
