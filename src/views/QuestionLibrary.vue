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
      hide: false,
      page: 1,
      type: 'QUESTION',
      id: 0,
      "data": {
        "current": 1,
        "total": 1001,
        "size": 10,
        "pages": 101,
        "records": [
          {
            "questionId": 1614845407106285569,
            "questionName": "今争价气技情",
            "questionDifficulty": "HARD",
            "likeCount": 0,
            "commitCount": 0,
            "successCount": 0,
            "noteCount": 0,
            "commentCount": 0,
            "passRate": 0,
            "createTime": "2023-01-16 12:42:02"
          },
          {
            "questionId": 1614845407106285570,
            "questionName": "然切形安信县",
            "questionDifficulty": "MEDIUM",
            "likeCount": 0,
            "commitCount": 0,
            "successCount": 0,
            "noteCount": 0,
            "commentCount": 0,
            "passRate": 0,
            "createTime": "2023-01-16 12:42:02"
          },
          {
            "questionId": 1614845407106285571,
            "questionName": "三前院离并起",
            "questionDifficulty": "MEDIUM",
            "likeCount": 0,
            "commitCount": 0,
            "successCount": 0,
            "noteCount": 0,
            "commentCount": 0,
            "passRate": 0,
            "createTime": "2023-01-16 12:42:02"
          },
          {
            "questionId": 1614845408486211586,
            "questionName": "本农通例安",
            "questionDifficulty": "MEDIUM",
            "likeCount": 0,
            "commitCount": 0,
            "successCount": 0,
            "noteCount": 0,
            "commentCount": 0,
            "passRate": 0,
            "createTime": "2023-01-16 12:42:02"
          },
          {
            "questionId": 1614845409270546433,
            "questionName": "往流况手公亲",
            "questionDifficulty": "EASY",
            "likeCount": 0,
            "commitCount": 0,
            "successCount": 0,
            "noteCount": 0,
            "commentCount": 0,
            "passRate": 0,
            "createTime": "2023-01-16 12:42:03"
          },
          {
            "questionId": 1614845409333460994,
            "questionName": "非半布王切目质",
            "questionDifficulty": "HARD",
            "likeCount": 0,
            "commitCount": 0,
            "successCount": 0,
            "noteCount": 0,
            "commentCount": 0,
            "passRate": 0,
            "createTime": "2023-01-16 12:42:03"
          },
          {
            "questionId": 1614845409715142657,
            "questionName": "局酸温查",
            "questionDifficulty": "EASY",
            "likeCount": 0,
            "commitCount": 135,
            "successCount": 123,
            "noteCount": 8,
            "commentCount": 0,
            "passRate": 91.1111,
            "createTime": "2023-01-16 12:42:03"
          },
          {
            "questionId": 1614845411254452225,
            "questionName": "技对家线农",
            "questionDifficulty": "MEDIUM",
            "likeCount": 0,
            "commitCount": 0,
            "successCount": 0,
            "noteCount": 0,
            "commentCount": 0,
            "passRate": 0,
            "createTime": "2023-01-16 12:42:03"
          },
          {
            "questionId": 1614845411317366786,
            "questionName": "适分如",
            "questionDifficulty": "EASY",
            "likeCount": 0,
            "commitCount": 0,
            "successCount": 0,
            "noteCount": 0,
            "commentCount": 0,
            "passRate": 0,
            "createTime": "2023-01-16 12:42:03"
          },
          {
            "questionId": 1614845411447390210,
            "questionName": "为色求织品",
            "questionDifficulty": "EASY",
            "likeCount": 0,
            "commitCount": 0,
            "successCount": 0,
            "noteCount": 0,
            "commentCount": 0,
            "passRate": 0,
            "createTime": "2023-01-16 12:42:03"
          }
        ]
      },
    }
  }
  ,
  methods: {
    // 切换题目展示类型
    changeshowType () {
    },
  }
}
</script>

<style lang="scss" scoped>
@import "@/assets/scss/views/questionLibrary.scss";

</style>