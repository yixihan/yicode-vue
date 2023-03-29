<template>
  <div>
    <div>

    </div>
  </div>
</template>

<script>

export default {
  name: "Pagination",
  data() {
    return {
      hide: false,
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
    // 分页插件 => 切换每页展示数量
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    // 分页插件 => 切换页数
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 题目详情
    toQuestionInfo (index) {
      console.log(index)
      this.$router.push({path: '/admin/center/detail', query: {id: this.data.records[index].questionId}})
    }
  }
}
</script>

<style lang="scss" scoped>

</style>