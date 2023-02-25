<template>
  <div id="app">
    <router-view v-if="isRouterAlive"></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
    };
  },
  created() {
    // this.init();
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
    // async getUserInfo() {
    //   const data = await this.axios({
    //     url: "/user/getUserInfo",
    //     method: "post",
    //     data: {
    //       userId: this.$store.getters.getUserId,
    //     },
    //     headers: {
    //       "Jwt-Token": this.$store.getters.getToken,
    //     },
    //   });
    //
    //   return data;
    // },
    // init() {
    //   if (
    //       this.$store.getters.getUserId != null &&
    //       this.$store.getters.getUserId != ""
    //   ) {
    //     this.getUserInfo().then(({ data }) => {
    //       const userInfo = data.data;
    //       this.$store.commit("SET_USERINFO", userInfo);
    //     });
    //   }
    // },
  },
}
</script>

<style lang="scss">
@import "assets/scss/style";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
