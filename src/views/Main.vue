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
  }
}
</script>

<style scoped lang="scss">
.main {
  display: flex;
  justify-content: center;
}
</style>