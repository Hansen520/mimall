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
