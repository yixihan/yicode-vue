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
        <!-- 登录方式切换 -->
        <div class="login_info_header">
          <div :class="{header_btn: true, header_btn_focus: showLogin===1 }" @click="changeShow(1)">
            密码登录
          </div>
          <div :class="{header_btn: true, header_btn_focus: showLogin===2 }" @click="changeShow(2)">
            邮箱登录
          </div>
          <div :class="{header_btn: true, header_btn_focus: showLogin===3 }" @click="changeShow(3)">
            手机登录
          </div>
        </div>
        <!-- 登录方式展示 -->
        <!-- 密码登录 -->
        <div class="login_info_inputs" v-show="showLogin===1">
          <div class="login_info_input">
            <input type="text" placeholder="用户名" v-model="user.username">
          </div>
          <div class="login_info_input verification">
            <input type="password" placeholder="密码" v-model="user.password">
          </div>
          <div class="login_info_input verification">
            <input type="text" placeholder="验证码" v-model="user.code">
            <div class="verification_img" @click="getPhotoCode">
              <img :src="photoCodeImg" alt="验证码正在加载中"/>
            </div>
            <div class="forget_pwd">忘记密码?</div>
          </div>
          <div class="login_info_input">
            <button @click="login">登录</button>
          </div>
        </div>
        <!-- 邮箱登录 -->
        <div class="login_info_inputs" v-show="showLogin===2">
          <div class="login_info_input">
            <input type="text" placeholder="邮箱" v-model="user.email">
          </div>
          <div class="login_info_input verification">
            <input type="text" placeholder="验证码" v-model="user.code">
            <div class="verification_code" @click="sendEmailCode">获取验证码</div>
          </div>
          <div class="login_info_input">
            <button @click="login">登录</button>
          </div>
        </div>
        <!-- 手机号 -->
        <div class="login_info_inputs" v-show="showLogin===3">
          <div class="login_info_input">
            <input type="text" placeholder="手机号" v-model="user.mobile">
          </div>
          <div class="login_info_input verification">
            <input type="text" placeholder="验证码" v-model="user.code">
            <div class="verification_code" @click="sendMobileCode">获取验证码</div>
          </div>
          <div class="login_info_input">
            <button @click="login">登录</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {uuid} from "@/util/uuidUtil";

import * as validate from "@/util/validateUtil";
import {errorMsg, successMsg} from "@/util/elementMsgUtil";

export default {
  name: "Login",
  data() {
    return {
      // 展示登录方式或注册，1 密码登录，2 邮箱登录，3 验证码登录
      showLogin: 1,
      photoCodeImg: "",
      uuid: "",
      user: {
        username: "yixihan",
        password: "Theyear123.",
        mobile: "17623850426",
        email: "3113788997@qq.com",
        code: ""
      },
    }
  },
  mounted() {
    this.getPhotoCode()
  },
  methods: {
    // 改变登录方式
    changeShow(val) {
      this.showLogin = val
    },
    // 登录
    login() {
      // 输入校验
      if (!this.loginValidate()) {
        return
      }
      // 登录
      let promise
      if (this.showLogin === 1) {
        // 校验邮箱验证码
        if (!this.validatePhotoCode()) {
          // 刷新图片验证码
          this.getPhotoCode()
          return;
        }
        promise = this.asyncLoginByPhotoCode()
      } else if (this.showLogin === 2) {
        // 校验邮箱验证码
        if (!this.validateEmailCode()) {
          return;
        }
        promise = this.asyncLoginByEmail()
      } else if (this.showLogin === 3) {
        // 校验短信验证码
        if (!this.validateMobileCode()) {
          return;
        }
        promise = this.asyncLoginByMobile()
      } else {
        this.getPhotoCode()
        errorMsg("错误的登录方式!")
        return;
      }

      // 登录后续操作
      promise.then(({data}) => {
        this.$store.commit("setToken", data)
        successMsg("登录成功！")
        this.asyncGetLoginUserInfo().then(({data}) => {
          this.$store.commit("setUserInfo", data.data)
        })
        // 跳转到首页
        this.$router.push("/");
      }).catch(() => {
        this.getPhotoCode()
      })
    },
    // 输入校验
    loginValidate() {
      if (this.showLogin === 1) {
        // 图片验证码登录
        if (!validate.validateUserName(this.user.username)) {
          errorMsg("用户名不符合输入规范!")
          return false
        }
        if (!validate.validatePassword(this.user.password)) {
          errorMsg("密码不符合输入规范!")
          return false
        }
        if (!validate.validateCode(this.user.code)) {
          errorMsg("验证码不符合输入规范!")
          return false
        }
        return true
      } else if (this.showLogin === 2) {
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
      } else if (this.showLogin === 3) {
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
      if (! validate.validateEmail(this.user.email)) {
        errorMsg("邮箱不符合输入规范!")
        return
      }
      this.asyncSendEmail().then(({data}) => {
        successMsg(data.data.message)
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
      if (! validate.validateMobile(this.user.mobile)) {
        errorMsg("邮箱不符合输入规范!")
        return
      }
      this.asyncSendMobile().then(({data}) => {
        successMsg(data.data.message)
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
    // 获取图片验证码
    getPhotoCode() {
      this.asyncGetPhotoCode().then(({data}) => {
        let blob = data
        let reader = new FileReader()
        // 转为 base64
        reader.readAsDataURL(blob)
        reader.onload = () => {
          this.photoCodeImg = reader.result
        }
      })
    },
    // 校验图片验证码
    validatePhotoCode() {
      // 校验输入
      if (!validate.validateCode(this.user.code)) {
        errorMsg("验证码不符合输入规范!")
        return false
      }
      this.asyncValidatePhotoCode()

      return true
    },
    // 异步方法 => 图片验证码登录
    async asyncLoginByPhotoCode() {
      // 组装 data 数据
      const data = {
        "grant_type": "verify_code",
        "username": this.user.username,
        "password": this.user.password,
        "scope": "all",
        "client_id": "yicode",
        "client_secret": "yicode",
        "uuid": this.uuid,
        "code": this.user.code
      }
      return await this.asyncLogin(data)
    },
    // 异步方法 => 手机登录
    async asyncLoginByMobile() {
      // 组装 data 数据
      const data = {
        "grant_type": "sms",
        "username": this.user.mobile,
        "code": this.user.code,
        "send-type": "LOGIN",
        "scope": "all",
        "client_id": "yicode",
        "client_secret": "yicode"
      }
      return await this.asyncLogin(data)
    },
    // 异步方法 => 邮箱登录
    async asyncLoginByEmail() {
      // 组装 data 数据
      const data = {
        "grant_type": "email",
        "username": this.user.email,
        "code": this.user.code,
        "send-type": "LOGIN",
        "scope": "all",
        "client_id": "yicode",
        "client_secret": "yicode"
      }
      return await this.asyncLogin(data)
    },
    // 异步方法 => 登录
    async asyncLogin(data) {
      return await this.$axios({
        url: "/yicode-auth/oauth/token",
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: data
      });
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
    // 异步方法 => 获取图片验证码
    async asyncGetPhotoCode() {
      this.uuid = uuid();
      return await this.$axios({
        url: "/yicode-thirdpart-openapi/open/code/create?uuid=" + this.uuid,
        method: "get",
        responseType: "blob"
      })
    },
    // 异步方法 => 获取图片验证码
    async asyncValidatePhotoCode() {
      return await this.$axios({
        url: "/yicode-thirdpart-openapi/open/code/validate",
        method: "post",
        data: {
          "uuid": this.uuid,
          "code": this.user.code
        }
      })
    },
    // 异步方法 => 获取登录用户信息
    async asyncGetLoginUserInfo() {
      return await this.$axios({
        url: "/yicode-user-openapi/open/user/now",
        method: "get",
      });
    },
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/config.scss';
@import "@/assets/scss/views/auth.scss";
</style>