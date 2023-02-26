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
          <div class="header_btn header_btn_focus">
            重置密码
          </div>
        </div>
        <!-- 登录方式展示 -->
        <!-- 校验 -->
        <div class="login_info_inputs" v-show="activeStep===1">
          <div class="login_info_input">
            <input type="text" placeholder="邮箱/手机号" v-model="user.mobileOrEmail">
          </div>
          <div class="login_info_input verification">
            <input type="text" placeholder="验证码" v-model="user.code">
            <div class="verification_code" @click="sendCode">获取验证码</div>
          </div>
          <div class="login_info_input">
            <button @click="validateCode">下一步</button>
          </div>
        </div>
        <!-- 重置密码 -->
        <div class="login_info_inputs" v-show="activeStep===2">
          <div class="login_info_input">
            <input type="password" placeholder="密码" v-model="user.password">
          </div>
          <div class="login_info_input">
            <input type="password" placeholder="密码" v-model="user.passwordSecond">
          </div>
          <div class="login_info_input">
            <button @click="previousStep">上一步</button>
            <button @click="resetPassword">重置密码</button>
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
  name: "ResetPassword",
  data() {
    return {
      // 忘记密码展示
      activeStep: 1,
      user: {
        mobileOrEmail: "",
        code: "",
        password: "",
        passwordSecond: ""
      }
    }
  },
  methods: {
    // 重置密码
    resetPassword() {
      // 校验密码
      if (this.user.password !== this.user.passwordSecond) {
        errorMsg("两次密码不一致!")
        return
      }

      // 校验验证码
      if (!validate.validateCode(this.user.code)) {
        errorMsg("验证码不符合输入规范!")
        return;
      }

      if (validate.validateEmail(this.user.mobileOrEmail)) {
        // 如果是邮箱
        this.asyncResetPasswordByEmail().then(({data}) => {
          successMsg(data.data.message)
          this.$router.push("/login")
        })
      } else if (validate.validateMobile(this.user.mobileOrEmail)) {
        // 如果是手机号
        this.asyncResetPasswordByMobile().then(({data}) => {
          successMsg(data.data.message)
          this.$router.push("/login")
        });
      } else {
        errorMsg("输入错误!");
      }
    },
    // 发送验证码
    sendCode() {
      if (validate.validateEmail(this.user.mobileOrEmail)) {
        // 如果是邮箱
        this.asyncSendEmail().then(({data}) => {
          successMsg(data.data.message)
        })
      } else if (validate.validateMobile(this.user.mobileOrEmail)) {
        // 如果是手机号
        this.asyncSendMobile().then(({data}) => {
          successMsg(data.data.message)
        });
      } else {
        errorMsg("输入错误!");
      }
    },
    // 上一步
    previousStep() {
      this.activeStep = 1
      this.user = {}
    },
    // 校验验证码
    validateCode() {
      // 校验邮箱/手机号
      if (!validate.validateEmail(this.user.mobileOrEmail)
          && !validate.validateMobile(this.user.mobileOrEmail)) {
        errorMsg("手机号/邮箱不符合输入规范!")
      }

      // 校验验证码
      if (!validate.validateCode(this.user.code)) {
        errorMsg("验证码不符合输入规范!")
        return;
      }

      if (validate.validateEmail(this.user.mobileOrEmail)) {
        // 如果是邮箱
        this.asyncValidateEmailCode().then(({data}) => {
          successMsg(data.data.message)
          this.activeStep = 2
        })
      } else {
        // 如果是手机号
        this.asyncValidateMobileCode().then(({data}) => {
          successMsg(data.data.message)
          this.activeStep = 2
        });
      }
    },
    // 异步方法 => 通过邮箱重置密码
    async asyncResetPasswordByEmail() {
      let data = {
        "email": this.user.mobileOrEmail,
        "code": this.user.code,
        "newPassword": this.user.password,
        "type": "EMAIL"
      }

      return await this.asyncResetPassword(data)
    },
    // 异步方法 => 通过邮箱重置密码
    async asyncResetPasswordByMobile() {
      let data = {
        "mobile": this.user.mobileOrEmail,
        "code": this.user.code,
        "newPassword": this.user.password,
        "type": "SMS"
      }
      return await this.asyncResetPassword(data)
    },
    // 异步方法 => 重置密码
    async asyncResetPassword(data) {
      return await this.$axios({
        url: "/yicode-user-openapi/open/user/reset/password",
        method: "post",
        data: data
      });
    },
    // 异步方法 => 发送邮件
    async asyncSendEmail() {
      return await this.$axios({
        url: "/yicode-thirdpart-openapi/open/email/send/email/reset",
        method: "post",
        data: {
          "email": this.user.mobileOrEmail
        }
      });
    },
    // 异步方法 => 校验邮箱验证码
    async asyncValidateEmailCode() {
      return await this.$axios({
        url: "/yicode-thirdpart-openapi/open/email/validate/reset",
        method: "post",
        data: {
          "email": this.user.mobileOrEmail,
          "code": this.user.code
        }
      });
    },
    // 异步方法 => 发送短信
    async asyncSendMobile() {
      return await this.$axios({
        url: "/yicode-thirdpart-openapi/open/sms/send/mobile/reset",
        method: "post",
        data: {
          "mobile": this.user.mobileOrEmail
        }
      });
    },
    // 异步方法 => 校验短信验证码
    async asyncValidateMobileCode() {
      return await this.$axios({
        url: "/yicode-thirdpart-openapi/open/sms/validate/reset",
        method: "post",
        data: {
          "mobile": this.user.mobileOrEmail,
          "code": this.user.code
        }
      });
    },
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/scss/config.scss';
@import "@/assets/scss/views/auth.scss";

/* element-ui 样式控制 */
.el-steps {
  display: none !important;
}

.el-input {
  input {
    width: 240px !important;
  }
}

.el-form-item__content {
  .el-link {
    position: absolute;
    right: 20px;
  }
}
</style>