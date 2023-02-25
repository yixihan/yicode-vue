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
            <div class="verification_img" @click="getPhotoCodeImg">
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
            <div class="verification_code">获取验证码</div>
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
            <div class="verification_code">获取验证码</div>
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
    this.getPhotoCodeImg()
  },
  methods: {
    // 改变登录方式
    changeShow(val) {
      this.showLogin = val
    },
    // 登录
    login() {
      // 输入校验
      if (!this.validateInput()) {
        return
      }
      // 登录
      let promise
      if (this.showLogin === 1) {
        promise = this.asyncLoginByPhotoCode()
      } else if (this.showLogin === 2) {
        promise = this.asyncLoginByEmail()
      } else if (this.showLogin === 3) {
        promise = this.asyncLoginByMobile()
      } else {
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
      })
    },
    // 输入校验
    validateInput() {
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
    // 获取图片验证码
    getPhotoCodeImg() {
      this.asyncGetPhotoCodeImg().then(({data}) => {
        let blob = data
        let reader = new FileReader()
        // 转为 base64
        reader.readAsDataURL(blob)
        reader.onload = () => {
          this.photoCodeImg = reader.result
        }
      })
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
        "grant_type": "mail",
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
    // 异步方法 => 获取登录用户信息
    async asyncGetLoginUserInfo() {
      return await this.$axios({
        url: "/yicode-user-openapi/open/user/now",
        method: "get",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
    },
    // 异步方法 => 获取图片验证码
    async asyncGetPhotoCodeImg() {
      this.uuid = uuid();
      return await this.$axios({
        url: "/yicode-thirdpart-openapi/open/code/create?uuid=" + this.uuid,
        method: "get",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        responseType: "blob"
      })
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

  .login_main {
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
              outline: none;
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

          .verification_img {
            position: absolute;
            right: 0;
            top: -10px;
            cursor: pointer;

            &:hover {
              color: $colorM;
            }

            img {
              max-height: 50px;
              max-width: 100px;
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