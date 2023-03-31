<template>
  <div class="question-library">
    <question-library-list @changeList="$event => id = $event"></question-library-list>
    <question-bank :type="type" :page="page" :id="id">
    </question-bank>
  </div>
</template>

<script>
import QuestionLibraryList from "@/components/QuestionLibrary/QuestionLibraryList.vue";
import QuestionBank from "@/components/index/QuestionBank.vue";

export default {
  name: "QuestionLibrary",
  components: {QuestionBank, QuestionLibraryList},
  data() {
    return {
      page: 1,
      type: 'QUESTION',
      id: 0,
      questionList: [],
      questionBankList: [],
    }
  },
  created() {
    this.getId()
  },
  watch: {
    id(newVal) {
      if (newVal !== null) {
        this.changeshowType()
      }
    }
  },
  methods: {
    getId() {
      this.id = this.$store.state.questionListId
      if (this.id) {
        this.type = "QUESTION_LIST"
      }
      console.log(this.id)
    },
    // 默认获取题库的信息
    async fetchData() {
      // 调用获取题库的接口
      // { this.questionList: res.data } = await
    },
    // 切换题目展示类型
    changeshowType() {
      this.type = 'QUESTION_LIST'
    },
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/views/questionLibrary.scss";

</style>