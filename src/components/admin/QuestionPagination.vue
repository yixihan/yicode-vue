<template>
  <div>
    <!-- 搜索方法, 搜索选项 : 难度,标签,题目 -->
    <div>

    </div>
    <div>
      <!--　内容展示 -->
      <div>
        <el-table
            :data="data.records"
            style="width: 100%"
            :stripe="true"
            :border="true"
            :height="450"
            size="small"
            border>
          <el-table-column
              prop="questionName"
              label="问题名称"
              width="180"
              fixed>
          </el-table-column>
          <el-table-column
              prop="questionDifficulty"
              label="问题难度"
              width="100"
              sortable
              fit>
          </el-table-column>
          <el-table-column
              prop="likeCount"
              label="点赞数"
              width="90"
              sortable
              fit>
          </el-table-column>
          <el-table-column
              prop="commitCount"
              label="提交数"
              width="90"
              sortable
              fit>
          </el-table-column>
          <el-table-column
              prop="successCount"
              label="通过数"
              width="90"
              sortable
              fit>
          </el-table-column>
          <el-table-column
              prop="noteCount"
              label="题解数"
              width="90"
              sortable
              fit>
          </el-table-column>
          <el-table-column
              prop="commentCount"
              label="评论数"
              width="90"
              sortable
              fit>
          </el-table-column>
          <el-table-column
              prop="passRate"
              label="通过率"
              width="90"
              sortable
              fit>
          </el-table-column>
          <el-table-column
              prop="createTime"
              label="创建时间"
              width="140"
              fit>
          </el-table-column>
          <el-table-column
              fixed="right"
              label="操作"
              width="90">
            <template v-slot="scope">
              <el-button type="text" size="small">查看</el-button>
              <!-- 按钮变为红色 -->
              <el-button type="text" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <!-- 分页插件 -->
      <div>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :hide-on-single-page="hide"
            :current-page="data.current"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="data.size"
            :total="data.total"
            layout="total, sizes, prev, pager, next, jumper"
        >
        </el-pagination>
      </div>
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
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    }
    ,
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  }
}
</script>

<style lang="scss" scoped>

</style>