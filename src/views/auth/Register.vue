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
            <div class="verification_code" @click="sendEmailCode">获取验证码</div>
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
            <div class="verification_code" @click="sendMobileCode">获取验证码</div>
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
import * as validate from "@/util/validateUtil";
import {errorMsg, successMsg} from "@/util/elementMsgUtil";

export default {
  name: "Login",
  data() {
    return {
      // 展示登录方式或注册，1 验证码登录，2 密码登录，3 注册
      showRegister: 1,
      user: {
        username: "",
        password: "",
        mobile: "",
        email: "",
        code: ""
      },
    }
  },
  methods: {
    // 改变登录方式
    changeShow(val) {
      this.showRegister = val
    },
    // 注册
    register() {
      // 输入校验
      if (!this.registerValidate()) {
        return
      }
      // 登录
      let promise
      if (this.showRegister === 1) {
        promise = this.asyncRegisterByUserName()
      } else if (this.showRegister === 2) {
        // 校验邮箱验证码
        if (!this.validateEmailCode()) {
          return;
        }
        promise = this.asyncRegisterByEmail()
      } else if (this.showRegister === 3) {
        // 校验短信验证码
        if (!this.validateMobileCode()) {
          return;
        }
        promise = this.asyncRegisterByMobile()
      } else {
        errorMsg("错误的注册方式!")
        return;
      }

      promise.then(() => {
        successMsg("注册成功")
        // 跳转到登录页面
        this.$router.push("/login")
      })
    },
    // 输入校验
    registerValidate() {
      if (this.showRegister === 1) {
        // 图片验证码登录
        if (!validate.validateUserName(this.user.username)) {
          errorMsg("用户名不符合输入规范!")
          return false
        }
        if (!validate.validatePassword(this.user.password)) {
          errorMsg("密码不符合输入规范!")
          return false
        }
        return true
      } else if (this.showRegister === 2) {
        // 邮件登录
        if (!validate.validateEmail(this.user.email)) {
          errorMsg("邮箱不符合输入规范!")
          return false
        }
        if (!validate.validateCode(this.user.code)) {
          errorMsg("验证码不符合输入规范!")
          return false
        }
        return true
      } else if (this.showRegister === 3) {
        // 手机号登录
        if (!validate.validateMobile(this.user.mobile)) {
          errorMsg("手机号不符合输入规范!")
          return false
        }
        if (!validate.validateCode(this.user.code)) {
          errorMsg("验证码不符合输入规范!")
          return false
        }
        return true
      } else {
        errorMsg("错误的登录方式!")
        return false
      }
    },
    // 发送邮件验证码
    sendEmailCode() {
      // 校验输入
      if (!validate.validateEmail(this.user.email)) {
        errorMsg("邮箱不符合输入规范!")
        return
      }
      this.asyncSendEmail().then(() => {
        successMsg("邮件发送成功!")
      })
    },
    // 校验邮箱验证码
    validateEmailCode() {
      // 校验输入
      if (!validate.validateEmail(this.user.email)) {
        errorMsg("邮箱不符合输入规范!")
        return false
      }
      if (!validate.validateCode(this.user.code)) {
        errorMsg("验证码不符合输入规范!")
        return false
      }
      this.asyncValidateEmailCode()

      return true
    },
    // 发送短信验证码
    sendMobileCode() {
      // 校验输入
      if (!validate.validateMobile(this.user.mobile)) {
        errorMsg("手机号不符合输入规范!")
        return
      }
      this.asyncSendMobile().then(() => {
        successMsg("短信发送成功!")
      })
    },
    // 校验短信验证码
    validateMobileCode() {
      // 校验输入
      if (!validate.validateMobile(this.user.mobile)) {
        errorMsg("手机号不符合输入规范!")
        return false
      }
      if (!validate.validateCode(this.user.code)) {
        errorMsg("验证码不符合输入规范!")
        return false
      }
      this.asyncValidateMobileCode()

      return true
    },
    // 异步方法 => 用户名注册
    async asyncRegisterByUserName() {
      // 组装 data
      let data = {
        "userName": this.user.username,
        "password": this.user.password,
        "type": "USERNAME_PASSWORD"
      }

      return await this.asyncRegister(data)
    },
    // 异步方法 => 邮箱注册
    async asyncRegisterByEmail() {
      // 组装 data
      let data = {
        "email": this.user.email,
        "code": this.user.code,
        "type": "EMAIL_CODE"
      }

      return await this.asyncRegister(data)
    },
    // 异步方法 => 手机号注册
    async asyncRegisterByMobile() {
      // 组装 data
      let data = {
        "mobile": this.user.mobile,
        "code": this.user.code,
        "type": "MOBILE_CODE"
      }

      return await this.asyncRegister(data)
    },
    // 异步方法 => 用户注册
    async asyncRegister(data) {
      return await this.$axios({
        url: "/yicode-user-openapi/open/user/register",
        method: "post",
        data: data
      })
    },
    // 异步方法 => 发送邮件
    async asyncSendEmail() {
      return await this.$axios({
        url: "/yicode-thirdpart-openapi/open/email/send/email/register",
        method: "post",
        data: {
          "email": this.user.email
        }
      });
    },
    // 异步方法 => 校验邮箱验证码
    async asyncValidateEmailCode() {
      return await this.$axios({
        url: "/yicode-thirdpart-openapi/open/email/validate/register",
        method: "post",
        data: {
          "email": this.user.email,
          "code": this.user.code
        }
      });
    },
    // 异步方法 => 发送短信
    async asyncSendMobile() {
      return await this.$axios({
        url: "/yicode-thirdpart-openapi/open/sms/send/mobile/register",
        method: "post",
        data: {
          "mobile": this.user.mobile
        }
      });
    },
    // 异步方法 => 校验短信验证码
    async asyncValidateMobileCode() {
      return await this.$axios({
        url: "/yicode-thirdpart-openapi/open/sms/validate/register",
        method: "post",
        data: {
          "mobile": this.user.mobile,
          "code": this.user.code
        }
      });
    },
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/config.scss';
@import "@/assets/scss/views/auth.scss";

</style>