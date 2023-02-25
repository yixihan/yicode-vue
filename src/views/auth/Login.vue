<template>
  <div class="form">
    <el-form ref="form" :model="user" label-width="80px">
      <el-form-item label="用户名">
        <el-input v-model="user.username"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input v-model="user.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login">登录</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      user: {
        username: "yixihan",
        password: "Theyear123."
      },
      token: ""
    }
  },
  methods: {
    // 登录
    login() {
      this.asyncLogin().then(({data}) => {
        console.log("loginInfo", data)
        this.token = data.access_token;
        this.$store.commit("setToken", data)
        this.successMsg("登录成功！")
        this.asyncGetLoginUserInfo().then(({data}) => {
          console.log("userInfo", data)
          this.$store.commit("setUserInfo", data.data)
        })
      });
      console.log("store Info :")
      console.log(this.$store.getters.getAccessToken)
      console.log(this.$store.getters.getRefreshToken)
      console.log(this.$store.getters.getUserId)
      console.log(this.$store.getters.getUserInfo)
    },
    cancel() {
      this.user = ""
    },
    // 异步方法 : 登录
    async asyncLogin() {
      return await this.$axios({
        url: "/yicode-auth/oauth/token",
        method: "post",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: {
          "grant_type": "password",
          "username": this.user.username,
          "password": this.user.password,
          "scope": "all",
          "client_id": "yicode",
          "client_secret": "yicode",
        },
      });
    },
    // 异步方法 : 获取登录用户信息
    async asyncGetLoginUserInfo() {
      return await this.$axios({
        url: "/yicode-user-openapi/open/user/now",
        method: "get",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "Authorization": "Bearer " + this.token,
        },
      });
    },
    successMsg(message) {
      this.$message({
        message: message,
        type: 'success'
      });
    }
  }
}
</script>

<style scoped lang="scss">

.form {
  margin-top: 100px;
}

</style>