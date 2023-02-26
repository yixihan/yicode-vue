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
    },
    // 异步方法 => 发送邮件
    async asyncSendEmail() {
      return await this.$axios({
        url: "/yicode-thirdpart-openapi/open/email/send/email/login",
        method: "post",
        data: {
          "email": this.user.email
        }
      });
    },
    // 异步方法 => 校验邮箱验证码
    async asyncValidateEmailCode() {
      return await this.$axios({
        url: "/yicode-thirdpart-openapi/open/email/validate/login",
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
        url: "/yicode-thirdpart-openapi/open/sms/send/mobile/login",
        method: "post",
        data: {
          "mobile": this.user.mobile
        }
      });
    },
    // 异步方法 => 校验短信验证码
    async asyncValidateMobileCode() {
      return await this.$axios({
        url: "/yicode-thirdpart-openapi/open/sms/validate/login",
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