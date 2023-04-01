<template>
  <div class="user-index">
    <user-menu :userId="userId"></user-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import UserMenu from "@/components/user/UserMenu.vue";

export default {
  name: "UserCenterIndex",
  components: {UserMenu},
  data() {
    return {
      userId: this.$route.params.userId
    }
  }
}
</script>

<style lang="scss" scoped>
.user-index {
  display: flex;
  width: 100%;
  max-width: 1280px;
  padding-top: 70px;
  >div:nth-child(2) {
    flex: 1;
    background: #FFFFFF;
  }
}
</style>