<template>
  <div class="progress">
    <div class="progress-left">
      <!-- 功能区 -->
      <div class="progress-function">
        <el-select v-model="stateValue"
                   @change="getUserQuestionCommitHistory"
                   placeholder="请选择状态">
          <el-option
              v-for="item in stateOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
        <el-select v-model="difficultyValue"
                   @change="getUserQuestionCommitHistory"
                   placeholder="请选择难度">
          <el-option
              v-for="item in difficultyOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
          </el-option>
        </el-select>
        <el-input v-model="search"
                  suffix-icon="el-icon-search"
                  placeholder="题目"></el-input>
      </div>
      <div class="progress-list">
        <!-- 数据展示 -->
        <el-table
            :data="recordData.records"
            style="width: 100%"
            :cell-style="difficultyStyle"
            :stripe="true"
            :border="true"
            @sort-change="sortQuestion"
            size="small"
            border
        >
          <el-table-column
              prop="createTime"
              label="最近提交时间"
              align="center"
              sortable>
          </el-table-column>
          <el-table-column
              prop="questionName"
              label="题目"
              align="center"
              sortable>
          </el-table-column>
          <el-table-column
              prop="questionDifficulty"
              label="难度"
              align="center"
              :formatter="difficultyFormatter">
          </el-table-column>
          <el-table-column
              fixed="right"
              align="center"
              label="操作">
            <template slot-scope="scope">
              <el-button type="text"
                         size="small"
                         @click="toQuestionInfo(scope.row.questionId)"
              >查看</el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页插件 -->
        <div class="block">
          <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :hide-on-single-page="false"
              :current-page="recordData.current"
              :page-sizes="[10, 20, 30, 40, 50]"
              :page-size="recordData.size"
              layout="total, sizes, prev, pager, next, jumper"
              :total="recordData.total">
          </el-pagination>
        </div>
      </div>
    </div>
    <div class="progress-right">
      <speed-progress></speed-progress>
      <div>
        <span>已通过题目 : {{ userRate.acceptedQuestion }}</span><br>
        <span>提交未通过题目 : {{ userRate.unAcceptedQuestion }}</span><br>
        <span>未开始题目 : {{ userRate.unDoQuestion }}</span><br>
        <span>总提交数 : {{ userRate.commitCount }}</span><br>
        <span>通过提交数 : {{ userRate.acceptedCommitCount }}</span><br>
        <span>提交通过率 : {{ userRate.acceptedCommitRate }}%</span><br>
      </div>
    </div>
  </div>
</template>

<script>
import SpeedProgress from "@/components/index/SpeedProgress.vue";

export default {
  name: "Progress",
  components: {SpeedProgress},
  data() {
    return {
      userId: this.$route.params.userId,
      // 做题进度
      userRate: {
        acceptedQuestion: 0,
        unAcceptedQuestion: 0,
        unDoQuestion: 0,
        commitCount: 0,
        acceptedCommitCount: 0,
        acceptedCommitRate: 0
      },
      // 提交记录
      recordData: {
        "current": 1,
        "total": 0,
        "size": 10,
        "pages": 0,
        "records": [
          {
            "id": 0,
            "questionId": 0,
            "questionName": "",
            "questionDifficulty": "",
            "userId": 0,
            "answerType": "",
            "answerCode": "",
            "answerFlag": "",
            "answerTimeConsume": 0,
            "answerMemoryConsume": 0,
            "answerNote": "",
            "createTime": ""
          }
        ]
      },
      // 状态可选项
      stateOptions: [
        {
          value: true,
          label: '已通过题目'
        },
        {
          value: false,
          label: '未通过题目'
        }
      ],
      // 状态选择
      stateValue: true,
      // 难度可选项
      difficultyOptions: [
        {
          value: 'EASY',
          label: '简单'
        },
        {
          value: 'MEDIUM',
          label: '中等'
        },
        {
          value: 'HARD',
          label: '困难'
        },
      ],
      // 难度选择
      difficultyValue: '',
      // 题目名称选择
      search: '',
      // 提交日期排序
      commitDateSort: null,
      // 题目名称排序
      nameSort: null,
    }
  },
  watch: {
    search() {
      this.getUserQuestionCommitHistory()
    }
  },
  mounted() {
    this.getUserQuestionCommitHistory()
    this.getUserQuestionRate()
  },
  methods: {
    // 跳转题目详情
    toQuestionInfo(questionId) {
      let url = this.$router.resolve('/question/details/' + questionId)
      window.open(url .href, '_blank')
    },
    // 获取用户提交记录
    getUserQuestionCommitHistory() {
      this.asyncGetUserQuestionCommitHistory().then(({data}) => {
        this.recordData = data.data
      })
    },
    // 获取用户做题进度
    getUserQuestionRate() {
      this.asyncGetUserQuestionRate().then(({data}) => {
        this.userRate = data.data
      })
    },
    // 排序方法
    sortQuestion(column) {
      console.log(column)
      let sort = column.order === null ? null : column.order !== 'ascending'
      if (column.prop === 'questionName') {
        this.nameSort = sort
      } else if (column.prop === 'createTime') {
        this.commitDateSort = sort
      }

      this.getUserQuestionCommitHistory()
    },
    // 样式设置 => 题目难度
    difficultyStyle({row, column}) {
      if (column.label === '难度') {
        let style;
        switch (row.questionDifficulty) {
          case 'HARD': {
            style = 'color: #ff2d55'
            break;
          }
          case 'MEDIUM': {
            style = 'color: #ffb800'
            break;
          }
          case 'EASY': {
            style = 'color: #00af9b'
            break;
          }
          default:
            style = ''
        }

        return style
      }
    },
    // 格式化 => 通过率
    rateFormatter(row) {
      return row.passRate + '%'
    },
    // 格式化 => 题目难度
    difficultyFormatter(row) {
      switch (row.questionDifficulty) {
        case 'EASY': return '简单'
        case 'MEDIUM': return '中等'
        case 'HARD': return '困难'
      }
    },
    // 分页插件 => 切换每页展示数量
    handleSizeChange(val) {
      this.recordData.size = val
      this.getUserQuestionCommitHistory()
    },
    // 分页插件 => 切换页数
    handleCurrentChange(val) {
      this.recordData.current = val
      this.getUserQuestionCommitHistory()
    },
    // 异步方法 => 获取用户提交记录
    async asyncGetUserQuestionCommitHistory() {
      return await this.$axios({
        url: "/yicode-question-openapi/open/question/commit/result/user",
        method: "post",
        data: {
          "userId": this.userId,
          "accepted": this.stateValue,
          "questionName": this.search,
          "questionDifficulty": this.difficultyValue,
          "questionNameSort": this.nameSort,
          "commitDateSort": this.commitDateSort,
          "pageSize": this.recordData.size,
          "page": this.recordData.current
        }
      });
    },
    // 异步方法 => 获取用户做题进度
    async asyncGetUserQuestionRate() {
      return await this.$axios({
        url: "/yicode-question-openapi/open/question/commit/rate?userId=" + this.userId,
        method: "get",
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.progress {
  display: flex;
  align-items: flex-start;

  .progress-left {
    flex: 1;

    .progress-function {
      display: flex;

      > div {
        margin: 0 10px;
      }

      .el-select {
        ::v-deep input {
          width: 120px !important;
        }
      }
    }

    .progress-list {

    }
  }

  .progress-right {
    width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}
</style>