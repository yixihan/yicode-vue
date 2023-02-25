<template>
  <div class="login">
    <div class="login_main">
      <div class="login_head">
        <h3>Yicode -- EasyCode</h3>
      </div>
      <div class="login_info">
        <!-- logo -->
        <div class="login_info_logo">
          <img src="@/assets/img/logo.png" alt="">
        </div>
        <!-- 注册方式切换 -->
        <div class="login_info_header">
          <div :class="{header_btn: true, header_btn_focus: showRegister===1 }" @click="changeShow(1)">
            用户名注册
          </div>
          <div :class="{header_btn: true, header_btn_focus: showRegister===2 }" @click="changeShow(2)">
            邮箱登录
          </div>
          <div :class="{header_btn: true, header_btn_focus: showRegister===3 }" @click="changeShow(3)">
            手机号注册
          </div>
        </div>
        <!-- 注册方式展示 -->
        <!-- 用户名注册 -->
        <div class="login_info_inputs" v-show="showRegister===1">
          <div class="login_info_input">
            <input type="text" placeholder="用户名" v-model="user.username">
          </div>
          <div class="login_info_input verification">
            <input type="password" placeholder="密码" v-model="user.password">
          </div>
          <div class="login_info_input">
            <button @click="register">注册</button>
          </div>
        </div>
        <!-- 邮箱登录 -->
        <div class="login_info_inputs" v-show="showRegister===2">
          <div class="login_info_input">
            <input type="text" placeholder="邮箱" v-model="user.email">
          </div>
          <div class="login_info_input verification">
            <input type="text" placeholder="验证码" v-model="user.code">
            <div class="verification_code">获取验证码</div>
          </div>
          <div class="login_info_input">
            <button @click="register">注册</button>
          </div>
        </div>
        <!-- 手机号注册 -->
        <div class="login_info_inputs" v-show="showRegister===3">
          <div class="login_info_input">
            <input type="text" placeholder="手机号" v-model="user.mobile">
          </div>
          <div class="login_info_input verification">
            <input type="text" placeholder="验证码" v-model="user.code">
            <div class="verification_code">获取验证码</div>
          </div>
          <div class="login_info_input">
            <button @click="register">注册</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      // 展示登录方式或注册，1 验证码登录，2 密码登录，3 注册
      showRegister: 1,
      user: {
        username: "yixihan",
        password: "Theyear123.",
        mobile: "17623850426",
        email: "3113788997@qq.com",
        code: "12345"
      },
    }
  },
  methods: {
    changeShow (val) {
      // 改变登录方式
      this.showRegister = val
    },
    register() {
      console.log("user", this.user)
    }
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/config.scss';

.login {
  background: url('~@/assets/img/login_back.png') no-repeat;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
  .login_main{
    width: 700px;
    height: 500px;
    box-shadow: rgb(60 66 87 / 30%) 3px 7px 30px 8px, rgb(0 0 0 / 36%) 0 3px 6px -1px;
    border-radius: 15px;
    display: flex;
    justify-content: center;
    align-items: center;
    backdrop-filter: blur(3px);
    .login_head {
      height: 100%;
      width: 300px;
      box-sizing: border-box;
      border-right: 1px solid #ebebeb;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      color: #FFFFFF;
      h3 {
        font-weight: bolder;
      }
    }
    .login_info {
      width: 400px;
      height: 100%;
      border-radius: 0 15px 15px 0;
      text-align: center;
      background: rgba(#ffffff, 1);
      box-sizing: border-box;
      padding: 25px;
      .login_info_logo {
        width: 100%;
        margin-bottom: 16px;
        img {
          height: 100px;
          object-fit: contain;
        }
      }
      .login_info_header {
        height: 50px;
        width: 100%;
        display: flex;
        align-items: center;
        //line-height: 60px;
        .header_btn {
          flex-grow: 1;
          box-sizing: border-box;
          height: 50px;
          text-align: center;
          line-height: 50px;
          margin: 0 10px;
          cursor: pointer;
          &:hover {
            border-bottom: 3px solid $colorM;
          }
        }
        .header_btn_focus {
          border-bottom: 3px solid $colorM;
        }
      }
      .login_info_inputs {
        .login_info_input {
          width: 100%;
          box-sizing: border-box;
          margin-top: 16px;
          input {
            border: none;
            border-bottom: 1px solid #ebebeb;
            width: 100%;
            height: 45px;
            &:focus {
              outline:none;
            }
          }
          button {
            width: 100%;
            border: none;
            height: 45px;
            margin-top: 10px;
            background: #fdbba3;
            color: #ffffff;
          }
        }
        .verification {
          position: relative;
          .verification_code {
            position: absolute;
            right: 0;
            top: 12px;
            cursor: pointer;
            &:hover {
              color: $colorM;
            }
          }
          .verification_top {
            top: 63px !important;
          }
          .forget_pwd {
            position: absolute;
            right: 0;
            top: 132px;
            font-size: 14px;
            cursor: pointer;
            &:hover {
              color: $colorM;
            }
          }
        }
      }
    }
  }
}

</style>