<template>
  <div class="user-home">
    <Title :title="'概览'"></Title>
    <div class="top">
      <speed-progress :userId="userId"></speed-progress>
      <activity></activity>
    </div>
    <Title :title="'语言/技能'"></Title>
    <language-and-skill></language-and-skill>
    <Title :title="'做题进度'"></Title>
    <progress-view></progress-view>
    <Title :title="'最近提交记录'"></Title>
    <submit-records></submit-records>
  </div>
</template>

<script>
import SpeedProgress from "@/components/index/SpeedProgress.vue";
import Activity from "@/components/user/Activity.vue";
import Title from "@/components/user/Title.vue";
import LanguageAndSkill from "@/components/user/LanguageAndSkill.vue";
import ProgressView from "@/components/user/ProgressView.vue";
import SubmitRecords from "@/views/userCenter/SubmitRecords.vue";

export default {
  name: "Home",
  components: {SubmitRecords, ProgressView, LanguageAndSkill, Title, Activity, SpeedProgress},
  data() {
    return {
      userId: this.$route.params.userId,
    }
  }
}
</script>

<style lang="scss" scoped>
.user-home {
  display: flex;
  flex-direction: column;
  padding: 0 50px 50px 50px;
  .top {
    display: flex;
    justify-content: space-between;
  }
}
</style>