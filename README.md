# mimall

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
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
像上面一样，home为主路由，而children里面为分路由。在主路由里面的vue页面上写上<router-view>标签，就可以将子路由的内容页面插入到里面。