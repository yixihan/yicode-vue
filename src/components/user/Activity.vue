<template>
  <div class="activity">
    <div class="row">
      <div class="col">
        <span>提交通过率</span>
        <span>{{ userRate.acceptedCommitRate }}%</span>
      </div>
      <div class="col">
        <span>简单题通过率</span>
        <span>{{ userRate.acceptedEasyQuestionRate }}%</span>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <span>中等题通过率</span>
        <span>{{ userRate.acceptedHardQuestionRate }}%</span>
      </div>
      <div class="col">
        <span>困难题通过率</span>
        <span>{{ userRate.acceptedMediumQuestionRate }}%</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Activity",
  data() {
    return {
      // 用户做题进度
      userRate: {
        "acceptedCommitRate": 0,
        "acceptedEasyQuestionRate": 0,
        "acceptedHardQuestionRate": 0,
        "acceptedMediumQuestionRate": 0,
      }
    }
  },
  mounted() {
    this.getUserQuestionRate();
  },
  methods: {
    // 获取用户做题进度
    getUserQuestionRate() {
      this.asyncGetUserQuestionRate().then(({data}) => {
        this.userRate = data.data
      })
    },
    // 异步方法 => 获取用户做题进度
    async asyncGetUserQuestionRate() {
      return await this.$axios({
        url: "/yicode-question-openapi/open/question/commit/rate",
        method: "get",
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.activity {
  flex: 1;
  height: 150px;
  margin-top: 8px;
  margin-left: 26px;
  border-radius: 8px;
  display: flex;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.0392156863), 0 2px 8px rgba(0, 0, 0, 0.0784313725);
  background: url("@/assets/img/index/active-bg.jpg") no-repeat;
  background-size: cover;
  .row {
    flex: 1;
    display: flex;
    flex-direction: column;
    .col {
      flex: 1;
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 15px 0;
      span {
        flex: 1;
      }
      span:nth-child(1) {
        font-size: 20px;
        font-weight: bolder;
        color: #FFFFFF;
      }
      span:nth-child(2) {
        font-size: 18px;
        font-weight: bolder;
        color: #ff8e48;
      }
    }
  }
}
</style>