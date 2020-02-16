<template>
  <div class="login">
    <div class="container">
      <a href="/#/index"><img src="imgs/mi-logo.png"></a>
      <div class="content">
        <h3>小米商城</h3>
        <span>让每个人都能享受科技的乐趣</span>
      </div>
    </div>
    <div class="wraper">
      <div class="container">
        <div class="login-form">
          <h3>
            <span class="checked">账号登入</span><span class="sep-line">|</span><span>扫码登入</span>
          </h3>
          <p class="err">{{err}}</p>
          <div class="input">
            <!-- v-model为数据双向绑定，这边输入了 -->
            <input type="text" placeholder="请输入账号" v-model="username" @keydown.enter="login">
          </div>
          <div class="input">
            <input type="text" placeholder="请输入密码" v-model="password" @keydown.enter="login">
          </div>
          <div class="btn btn-huge" @click="login" >
            <a href="javascript:;" class="btn">登入</a>
          </div>
          <div class="tips">
            <div class="sms" @click="register">手机短信登入/注册</div>
            <div class="reg">立即注册<span>|</span>忘记密码？</div>
          </div>
          <p>*这个页面又有注册，又有登入</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'login',
  data () {
    return {
      username: '',
      password: '',
      // 这个是登入时的唯一id，但是这边先用cookies代替
      userId: '',
      // 报错信息
      err: ''
    }
  },
  methods: {
    login () {
      // 解构解析，this相当于上面data里面所有的数据
      const { username, password } = this
      if (!this.username) {
        this.err = '*用户名不能为空'
        return
      } else if (!this.password) {
        this.err = '*密码不能为空'
        return
      }
      this.axios.post('/user/login', {
        username,
        password
      }).then((res) => {
        // 往userId里面传入res.id,然后cookies的有效期为1个月，也可以设置为Session关闭浏览器后
        this.$cookie.set('userId', res.id, { expires: 'Session' })
        // 向Actions派发数据，参数一名字自定义，参数二为派发的数据
        this.$store.dispatch('saveUserName', res.username)
        // this.$router.push('/index')
        // 下面的意思是说跳转到index页面还配上参数，index/from=login，但是这个from=login，地址栏是隐藏的，也是为了重新登入后的数据消失
        this.$router.push({
          name: 'index',
          params: {
            from: 'login'
          }
        })
      }).catch((err) => {
        this.err = '*' + err
      })
    },
    // 注册也写在一个页面里面，毕竟自己写的页面无所谓
    register () {
      const { username, password } = this
      this.axios.post('/user/register', {
        username,
        password,
        email: 'pptppt@163.com'
      }).then(() => {
        alert('注册成功')
      })
    }
  }
}

</script>

<style lang="scss">
  @import './../assets/scss/config.scss';
  @import './../assets/scss/mixin.scss';
  @import './../assets/scss/button.scss';
  .login{
    a{
      width: 52px;
      height:52px;
      display:inline-block;
      background:$colorA;
    }
    .content{
      display:inline-block;
      position: absolute;
      top: 10px;
      left: 70px;
    }
  }
  .wraper{
    background: url('/imgs/login-bg.jpg') no-repeat center;
    .container{
      height: 576px;
      .login-form{
        background: #fff;
        padding: 0 26px;
        box-sizing: border-box;
        @include position(absolute, 20px, 0, null, null, 320px, 410px);
        h3{
          line-height: 23px;
          font-size: 16px;
          text-align: center;
          margin: 40px auto 30px;
          .checked{
            color: #ff6600;
          }
          .sep-line{
            margin: 0 32px;
          }
        }
        .err{
          color: red;
          font-size: 16px;
          margin-bottom: 10px;
        }
        .input{
          width: 285px;
          height: 44px;
          border: 1px solid #e5e5e5;
          margin-bottom: 20px;
          box-sizing: border-box;
          input{
            width: 100%;
            height: 100%;
            border: none;
            padding: 18px;
            box-sizing: border-box;
          }
        }
        a{
          display: inline;
        }
        .tips{
          margin-top: 14px;
          display: flex;
          justify-content: space-between;
          font-size: 12px;
          cursor: pointer;
          .sms{
            color: #ff6600;
          }
          .reg{
            color: #999;
            span{
              margin: 0 7px;
            }
          }
        }
      }
    }
  }
</style>
