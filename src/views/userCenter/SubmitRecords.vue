<template>
  <div class="submit-records">
    <header>
      <span @click="toRecords">所有提交记录</span>
      <i class="el-icon-arrow-right"></i>
    </header>
    <div class="list">
      <div class="list-item"
           v-for="(item, index) in recordData"
           :key="index"
      >
        <div class="question">{{ item.questionName }}</div>
        <div class="time">{{ item.createTime }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SubmitRecords",
  data() {
    return {
      userId: this.$route.params.userId,
      recordData: [
        {
          id: 0,
          questionId: 0,
          questionName: "",
          questionDifficulty: "",
          userId: 1,
          answerType: "",
          answerCode: "",
          answerFlag: "",
          answerTimeConsume: 0,
          answerMemoryConsume: 0,
          answerNote: "",
          createTime: ""
        }
      ]
    }
  },
  mounted() {
    this.getUserQuestionCommitHistory()
  },
  methods: {
    toRecords() {

    },
    // 获取用户提交记录
    getUserQuestionCommitHistory() {
      this.asyncGetUserQuestionCommitHistory().then(({data}) => {
        this.recordData = data.data.records
      })
    },
    // 异步方法 => 获取用户提交记录
    async asyncGetUserQuestionCommitHistory() {
      return await this.$axios({
        url: "/yicode-question-openapi/open/question/commit/result/user",
        method: "post",
        data: {
          "userId": this.userId,
          "commitDateSort": true,
          "pageSize": 10,
          "page": 1
        }
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.submit-records {
  width: 100%;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.0392156863), 0 2px 8px rgba(0, 0, 0, 0.0784313725);
  box-sizing: border-box;
  padding: 20px;

  header {
    height: 40px;
    line-height: 40px;
    font-size: 14px;
    text-align: right;

    span, i {
      cursor: pointer;
    }
  }

  .list {
    .list-item {
      height: 56px;
      line-height: 56px;
      display: flex;
      font-size: 14px;
      padding: 0 15px;
      border-radius: 8px;
      cursor: pointer;

      &:nth-child(odd) {
        background: #f7f7f8;
      }

      .question {
        flex: 1;
        text-align: left;
      }

      .date {
        flex: 1;
        text-align: right;
      }
    }
  }
}
</style>