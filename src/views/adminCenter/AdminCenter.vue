<template>
  <div class="center">
    <div class="center_left">
      <!-- 左侧组件 -->
      <admin-menu/>
    </div>
    <div class="center_right">
      <!-- 右侧组件 -->
      <router-view/>
    </div>
  </div>
</template>

<script>
import AdminMenu from "@/components/admin/AdminMenu.vue";

export default {
  name: "AdminCenter",
  components: {
    AdminMenu
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/views/center.scss";
</style>
