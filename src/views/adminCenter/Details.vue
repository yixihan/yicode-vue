<template>
  <div class="detail">
    <div class="back">
      <i class="el-icon-arrow-left"></i>
      <span @click="goBack()">返回</span>
    </div>
    <question-detail :questionId="questionId"></question-detail>
    <question-edit :questionId="questionId"></question-edit>
  </div>
</template>

<script>
import QuestionDetail from "@/components/admin/QuestionDetail.vue"
import QuestionEdit from "@/components/admin/QuestionEdit.vue"
export default {
  name: "Details",
  components: {QuestionDetail, QuestionEdit},
  data() {
    return {
      questionId: this.$route.query.questionId
    }
  },
  methods: {
    goBack () {
      this.$router.push({path: "/admin/center/problem"})
    }
  }
}
</script>

<style lang="scss" scoped>
.detail {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  padding-top: 20px;
  .back {
    position: absolute;
    top: 0;
    display: block;
    height: 20px;
    width: 100%;
    text-align: left;
    font-size: 14px;
    cursor: pointer;
    transition: all .1s;
    padding: 0 20px;
    &:hover {
      color: #fbb957;
    }
  }
}
</style>