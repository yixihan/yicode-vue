<template>
  <div class="nav">
    <ul>
      <li class="logo" @click="toIndex"></li>
      <li class="col">题库</li>
      <li class="col">题单</li>

      <li class="col bank"></li>

      <li class="col" v-if="!isLogin" @click="toRegister">注册</li>
      <li class="col" v-if="!isLogin" @click="toLogin">登录</li>

      <li class="col bell-icon" v-if="isLogin">
        <i class="el-icon-bell"></i>
      </li>
      <li class="col" v-if="isAdmin" @click="toAdminCenter">
        <i class="el-icon-user-solid">管理中心</i>
      </li>
      <li class="col" v-if="isLogin" @click="toUserCenter">
        <i class="el-icon-user">个人中心</i>
      </li>
      <li class="col" v-if="isLogin" @click="logout">注销</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
    };
  },
  methods: {
    // 跳转到首页
    toIndex() {
      this.$router.push("/");
    },
    // 跳转到登录页面
    toLogin() {
      // this.isLogin = true
      this.$router.push("/login");
    },
    // 跳转到注册页面
    toRegister() {
      this.$router.push("/register");
    },
    // 跳转到个人中心页面
    toUserCenter() {
      this.$router.push("/userCenter/center/" + this.$store.getters.getUserId)
    },
    toAdminCenter() {
      this.$router.push("/admin/center")
    },
    // 退出登录
    logout() {
      this.$store.commit("removeInfo")
      this.$router.push("/");
    }

  },
  computed: {
    isLogin() {
      return this.$store.getters.getAccessToken !== null
          && this.$store.getters.getAccessToken !== ""
    },
    isAdmin() {
      return this.$store.getters.getUserRoleList !== null
          && this.$store.getters.getUserRoleList !== ""
          && this.$store.getters.getUserRoleList !== []
          && this.$store.getters.getUserRoleList
              .some(item => item.roleName !== "USER")
    }
  }
}
</script>

<style scoped lang="scss">
.nav {
  z-index: 9;
  position: fixed;
  top: 0;
  height: 70px;
  // padding: 10px 0;
  width: 100%;
  display: flex;
  justify-content: center;
  // color: #ffffff;
  background: #fff;

  ul {
    height: 70px;
    width: 100%;
    max-width: 1280px;
    display: flex;
    position: fixed;
    top: 0;
    margin: 0 auto;
    padding: 0;
    justify-content: center;
    align-items: center;
    line-height: 20px;
    list-style: none;

    li:not(:first-child) {
      flex-grow: 1;
      height: 100%;
      // width: 200px;
      min-width: 150px;
      line-height: 70px;
      user-select: none;
      cursor: pointer;
      transition: background 0.1s;

      &:hover {
        background: #76a2b1;
        color: #fff;
      }
    }

    .logo {
      box-sizing: border-box;
      height: 70px;
      width: 70px;
      background: url("~@/assets/img/logo.png") no-repeat;
      background-size: contain;
      cursor: pointer;
    }

    .bank {
      flex-grow: 16 !important;
      cursor: default !important;
      &:hover {
        background: #ffffff !important;
        color: #fff;
      }
    }

    .bell-icon {
      min-width: auto !important;
      width: 40px !important;
    }

    .text {
      margin-right: 5px;
    }
  }
}

button {
  position: static !important;
}
</style>