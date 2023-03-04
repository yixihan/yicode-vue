<template>

  <div>
    <div>
      <!-- 选个合适的位置摆着 -->
      <el-button>新建题目</el-button>
    </div>
    <div>
      搜索选项
    </div>
    <div>
      <question-pagination/>
    </div>
  </div>
</template>

<script>
import QuestionPagination from "@/components/admin/QuestionPagination.vue";
export default {
  name: "AdminProblem",
  components: {
    QuestionPagination
  }
}
</script>

<style lang="scss" scoped>

</style>