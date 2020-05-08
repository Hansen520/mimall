# mimall
### 目录结构
- public // 放一些公共的资源和入口文件
- src 里面主要放一些文件然后下面放如下目录 
  * api 里面放一些接口  
  * assets 放一些公共的样式
  * components 里面放一些公共的组件  
  * pages里面放一些页面 其中home为里面写好了页面的首尾，其他页面只要往home里面种的 router-view里面写东西就行，然后重定向到主页就行了，这样子也是考虑复用
  * util 公共工具页面 
  * storage 存储页面，像自己写的cookie等等
  * store vuex的具体的目录
  * main.js为全局js文件
  * router.js 路由文件
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
      redirect: 'index',// 首先我们加载页面的时候会先到home，因为他是/，主要的，通过重定向页面首先打开的是index页面
      children: [{
        path: '/index',
        name: 'index',
        component: Index
      }, {
        path: '/product/:id',//这是动态路由的写法
        name: 'product',
        component: Product
      }]
    }]
```

像上面一样，home为主路由，而children里面为分路由。在主路由里面的vue页面上写上```<router-view>```标签，就可以将子路由的内容页面插入到里面。
记住一定要先在main.js里面注册才能用哦
异步按需加载
``` 

```javascript
component: resolve => require(['./pages/product.vue'], resolve)  
```
或
``` javascript
const login = resolve => require.ensure([], () => resolve(require('./pages/login')), 'login')
```
或import
```javascript
() => import('./my-async-component')
```
### storage
这个主要设置localsession的封装的，用于会话处理机制的。

### 接口错误拦截
主要在mian.js里面通过axios.interceptors.response.use返回拦截的方式处理一些状态码，并通过状态码做一些处理。
如下所示：

```javascript
// 返回数据时候拦截器
axios.interceptors.response.use(function (response) {
  const path = location.hash
  const res = response.data
  // 商定 状态码0是成功，10是未登入跳到登入页面
  if (res.status === 0) {
    return res.data
    // 像下面的10报错都是业务报错，如果想拦截后台报错，我们需要继续加
  } else if (res.status === 10) {
    if (path !== '#/index') {
      window.location.href = '#/login'
    }
    Message.error(res.msg)
    return Promise.reject(res.msg)
    // 必需用Promise去返回，这样子不会去做错误跳转到其他页面，这里就拦死了。
  } else {
    // 为了防止没有登入也会跳到首页
    Message.error(res.msg)
    return Promise.reject(res.msg)
  }
}, (error) => {
  // 这里是后台发来的报错，如502错误
  const res = error.response
  Message.error(res.data.message.substr(-6))
  return Promise.reject(error)
  // 如果返回的是flase，则需要在前面添加catch提示错误
})
```
具体文档：https://www.npmjs.com/package/axios
### 接口环境设置
main.js里面,
```javascript
// 第一种
// 根据前端的跨域方式做调整 并在每个接口前加上/api,最后通过代理方式删除/api，这里作为真实对接地址，是后台开发完成的
axios.defaults.baseURL = '/api'

// 第二种
// easy-mock模拟地址,是后台没有开发完成的
// axios.defaults.baseURL = ' https://www.easy-mock.com/mock/5e2832dcbc40327ccfcf507f/mall'

// 第三种
// env.js模式，适用于cor跨域和jsonp跨域
// axios.defaults.baseURL = env.baseURL

// 默认设置时间未8000，比如超出8秒一定要做设置，不然用户体验不好
axios.defaults.timeout = 8000
// 根据环境变量获取不同的请求地址，这个是cors和jsonp跨域使用的方式，
```
env.js
```javascript
// 用cors和jsonp方式采用这个文件
let baseURL
/**
 * process.env.NODE_ENV 是通过nodejs的方式寻找当前环境是开发模式开始生产模式
 * 切记这个是cors跨域模式或者是jsonp跨域模式下的，而proxy不用这玩意 */

if (process.env.NODE_ENV === 'development') {
  baseURL = 'http://mall-pre.springboot.cn/'
} else if (process.env.NODE_ENV === 'test') {
  baseURL = 'http://mall-pre.springboot.cn/'
} else if (process.env.NODE_ENV === 'production') {
  baseURL = 'http://mall-pre.springboot.cn/'
} else {
  baseURL = 'http://mall-pre.springboot.cn/'
}

export default {
  baseURL
}

```
package.json
其中development是开发环境的，production是生产环境的,这个也可以在vue.config.js去配置
```javascript
    "serve": "vue-cli-service serve --mode=development",
    "test" : "vue-cli-service serve --mode=test",
    "build": "vue-cli-service build --mode=production",
```

### mock模拟的三种方式
方式一：优先选择easy-mock，因为这个和我们请求数据xml最接近
方式二：其次选择mock集成，就是安装mock.js
方式三：最后再考虑本地json数据的方式，不过最后这种也好，通过axios.defaults.baseUrl = '/api'给每个接口前写名字，然后通过webpack中的devserve去做反向代理到本地接口的文件夹中的json就行，亲测有效。

### 组件1：modal组件 
这是一个弹框组件，把弹框的内容覆盖在遮罩层上，点击父组件后提示信息。


### 组件2： vue-awesome-swiper组件
这是一个轮播图的组件，覆盖了市场上绝大轮播图的功能非常好用
[文档链接](https://www.swiper.com.cn/)
```
轮播图配置下面就够
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
[文档链接](https://www.npmjs.com/package/vue-lazyload)

### 组件4： vue-cookies
这个是通过设置cookies传给后台，作为你的登入的唯一标题
[文档链接](https://www.npmjs.com/package/vue-cookies)

### emit与props
emit是子组件传递给父组件，方式this.emit('配发事件名称',传递的参数)
props是父组件传给子组件的的数据

## 产品模块出现的组件
### 组件吸顶的实现
这个主要通过监听模式，然后配合sroll事件和几个高度配合使用而成的，而且单独分离出来写的组件，而且逻辑样式也是写在这个组件里面。

```html
<div class="nav-bar" :class="{ 'fixed': isFixed }" ref="outHeight">
</div>
```

```css
  .nav-bar{
    height: 70px;
    line-height: 70px;
    width: 100%;
    border: 1px solid $colorH;
    box-shadow: 0 5px 5px rgba(0,0,0,.07);
    transition: all 1.5s;
    background-color: #fff;
    z-index: 10;
    &.fixed{
      position: fixed;
      top: 0;
    }
```


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
就是没右登入时候，用户名为underfind，所以我们在函数定义时候给res一个默认值就行,就是res = res || '默认值' 

### slide 动画的实现
就是视频点击时候出现有一个滑动的效果，
方法一通过过度动画实现
方法二是可以根据自定义动画实现  
这里说明：对于简单动画，我们用过度动画就可以实现了，对于复杂动画可以用自定义动画去实现

### 购物车渲染这部分
这个部分是个精细的活
里面包过购物车的全选和非全选，包括商品增删查改，需要后台完美的配合，是个需要好好学习深入的对象。

### ElementUI
这是一个UI的渲染框架，主要用作后端，是个需要好好学习的玩意。
[文档链接](https://element.eleme.cn/2.0/#/zh-CN/component/installation)

### 订单确认页面
1.svg的插入  
2.通过判断，用默认为0, 新增地址1, 编辑地址2, 删除为 3 通过三个接口实现一个模块的三个功能绑定，然后用this.axios({ method, url, data })的方法把三个接口放在一起，类似this.axios.get/post/put/delete的方式。 

```javascript
      // 这是一种新型的用法。类似this.axios.get/post/put/delete
      this.axios({ method, url, data }).then(() => {
        this.closeModal()
        // 这里避免用户并行，重新拉取一次数据
        this.getAddressList()
        this.$message.success('操作成功')
      }).catch((err) => {
        this.$message.error(err)
      })
```

 
3.还有:class="{'checked': index === checkIndex}" @click="checkIndex=index"，其中index为选中的数组下标 选择切换按键的方式切换； 具体看orderComfirm.vue代码吗
const { checkedItem, userActions } = this 一种解构赋值，ES6常用。


### 支付宝支付页面和微信支付页面
这部分需要细细的哦品味
```javascript
    // 1支付宝支付，2微信支付
    pay (paytype) {
      if (paytype === 1) {
        this.paytype = 1
        // 打开支付宝支付页面，this.orderNo通过order-comfirm的路由传参过来的
        window.open('/#/order/alipay?orderId=' + this.orderNo, '_blank')
      } else if (paytype === 2) {
        this.paytype = 2
        this.axios.post('/pay', {
          orderId: this.orderNo,
          orderName: 'Vue高仿小米商城2020年2月21日支付宝功能',
          amount: 0.01, // 元
          payType: 2
        }).then(({ content }) => {
          // 如果请求接口成功，则通过二维码插件的形式传回来
          QRCode.toDataURL(content)
            .then(url => {
              this.qrCode = url
              this.showWxpay = true
              // 轮询
              this.loopOrderState()
            })
            .catch(() => {
              this.$message.error('此支付二维码失效！')
            })
        })
      }
    },
    // 轮询当前订单支付状态
    loopOrderState () {
      // 就是说每隔1000mm去调用下接口，看看有没有完成支付，如果完成就自动跳到订单页面
      this.T = setInterval(() => {
        this.axios.get(`/orders/${this.orderNo}`).then((res) => {
          if (res.status === 20) {
            // 清除定时器，防止关闭后一直轮询
            clearInterval(this.T)
            this.goOrderList()
          }
        })
      }, 1000)
    },
    // 关闭微信弹框
    closePayModal () {
      clearInterval(this.T)
      this.showWxpay = false
      this.showPayModal = true
    },
    // 支付成功后跳转到订单查看页面
    goOrderList () {
      this.$router.push('/order/list')
    }
  }
```

