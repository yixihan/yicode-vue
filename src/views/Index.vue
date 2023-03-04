<template>
  <div class="index">
    <div class="index_left">
    <!--      左侧组件-->
      <Carousel></Carousel>
      <question-bank></question-bank>
    </div>
    <div class="index_right">
    <!--      右侧组件-->
      <speed-progress></speed-progress>
      <calendar></calendar>
    </div>
  </div>
</template>

<script>
import Carousel from "@/components/index/Carousel.vue";
import QuestionBank from "@/components/index/QuestionBank.vue";
import SpeedProgress from "@/components/index/SpeedProgress.vue";
import Calendar from "@/components/index/Calendar.vue";

export default {
  name: "index",
  components: {Calendar, SpeedProgress, QuestionBank, Carousel}
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/views/index.scss";

</style>