<template>
  <div class="nav">
    <ul>
      <li class="logo">

      </li>
      <li class="col">题库</li>
      <li class="col bank"></li>
      <li class="col" v-if="!isLogin" @click="login">登录</li>
      <li class="col" v-if="!isLogin">注册</li>
      <li class="col" v-if="isLogin">
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
      isLogin: true,
    };
  },
  methods: {
    login() {
      this.isLogin = true
    },
    logout() {
      this.isLogin = false
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
      background: url("~@/assets/logo.png") no-repeat;
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

    .text {
      margin-right: 5px;
    }
  }
}

button {
  position: static !important;
}
</style>