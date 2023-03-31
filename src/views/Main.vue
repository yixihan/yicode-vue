<template>
  <div class="main">
    <Header></Header>
    <BackTop></BackTop>
    <router-view/>
  </div>
</template>

<script>
import BackTop from "@/components/BackTop.vue";
import Header from "@/components/Header.vue";

export default {
  name: "Main",
  components: {
    Header,
    BackTop
  },
  mounted() {
    if (this.$store.getters.isLogin) {
      this.asyncGetLoginUserInfo().then(({data}) => {
        this.$store.commit("setUserInfo", data.data)
      })
    }
  },
  methods: {
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
.main {
  display: flex;
  justify-content: center;
}
</style>