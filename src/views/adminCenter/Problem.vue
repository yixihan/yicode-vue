<template>
  <div>
    <!-- 功能区 -->
    <div class="search">
      <el-input v-model="searchQuesName" placeholder="问题名称"></el-input>
      <el-select v-model="searchDifficulty" placeholder="题目难度">
        <el-option
            v-for="item in searchDifficultyOptions"
            :key="item.value"
            :label="item.label"
            :value="item.value">
        </el-option>
      </el-select>
      <el-select v-model="searchLabel"
                 filterable
                 multiple
                 collapse-tags
                 placeholder="题目标签"
      >
        <el-option
            v-for="item in labelOptions"
            :key="item.labelId"
            :label="item.labelName"
            :value="item.labelId">
        </el-option>
      </el-select>
      <el-button type="primary" @click="getQuestionData">搜索</el-button>
      <el-button @click="isShowCreateQuestion = true">新建题目</el-button>

      <!-- 新建题目 -->
      <el-dialog title="新建题目" :visible.sync="isShowCreateQuestion" :width="'500px'">
        <el-form :model="createQuestionForm">
          <el-form-item label="题目名称" :label-width="'100px'">
            <el-input v-model="createQuestionForm.questionName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="题目难度" :label-width="'100px'">
            <el-select v-model="createQuestionForm.questionDifficulty" placeholder="题目难度">
              <el-option
                  v-for="(item, index) in createDifficultyOptions"
                  :key="index"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题目标签" :label-width="'100px'">
            <el-select v-model="createQuestionForm.questionLabel"
                       filterable
                       multiple
                       collapse-tags
                       placeholder="题目标签">
              <el-option
                  v-for="(item, index) in labelOptions"
                  :key="index"
                  :label="item.labelName"
                  :value="item.labelId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isShowCreateQuestion = false">取 消</el-button>
          <el-button type="primary" @click="createQuestion">确 定</el-button>
        </div>
      </el-dialog>
    </div>

    <!-- 数据展示 -->
    <div>
      <!--　内容展示 -->
      <div>
        <el-table
            :data="questionData.records"
            style="width: 100%"
            :cell-style="difficultyStyle"
            :stripe="true"
            :border="true"
            @sort-change="sortQuestion"
            size="small"
            border
        >
          <el-table-column
              prop="questionName"
              label="问题名称"
              width="180"
              sortable="custom"
              fixed>
          </el-table-column>
          <el-table-column
              prop="questionDifficulty"
              label="难度"
              :formatter="difficultyFormatter"
              width="70"
              sortable="custom"
              fit>
          </el-table-column>
          <el-table-column
              prop="likeCount"
              label="点赞数"
              width="90"
              fit>
          </el-table-column>
          <el-table-column
              prop="commitCount"
              label="提交数"
              width="90"
              fit>
          </el-table-column>
          <el-table-column
              prop="successCount"
              label="通过数"
              width="90"
              fit>
          </el-table-column>
          <el-table-column
              prop="noteCount"
              label="题解数"
              width="90"
              sortable="custom"
              fit>
          </el-table-column>
          <el-table-column
              prop="commentCount"
              label="评论数"
              width="90"
              fit>
          </el-table-column>
          <el-table-column
              prop="passRate"
              label="通过率"
              width="90"
              sortable="custom"
              :formatter="rateFormatter"
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
              <el-button type="text" size="small"
                         @click="toQuestionInfo(scope.row.questionId)"
              >查看
              </el-button>
              <el-button type="text" size="small"
                         style="color: red"
                         @click="delQuestion(scope.row.questionId)"
              >删除
              </el-button>
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
            :current-page="questionData.current"
            :page-sizes="[10, 20, 30, 40, 50]"
            :page-size="questionData.size"
            :total="questionData.total"
            layout="total, sizes, prev, pager, next, jumper"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import QuestionPagination from "@/components/admin/QuestionPagination.vue";
import {successMsg, errorMsg} from "@/util/elementMsgUtil";

export default {
  name: "AdminProblem",
  components: {
    QuestionPagination
  },
  data() {
    return {
      // 搜索题目名
      searchQuesName: '',
      // 搜索题目难度
      searchDifficultyOptions: [
        {
          value: "",
          label: "全部"
        },
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
        }
      ],
      searchDifficulty: '',
      // 题目标签
      labelOptions: [
        {
          labelId: '',
          labelName: '',
        }
      ],
      searchLabel: [],
      // 题解排序
      noteSort: null,
      // 难度排序
      difficultySort: null,
      // 名字排序
      nameSort: null,
      // 通过率排序
      passSort: null,
      // 新建题目
      createQuestionForm: {
        questionName: '',
        questionDifficulty: '',
      },
      // 题目难度
      createDifficultyOptions: [
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
        }
      ],
      // 新建题目展示
      isShowCreateQuestion: false,
      hide: false,
      // 题目数据
      questionData: {
        "current": 1,
        "total": 1001,
        "size": 10,
        "pages": 101,
        "records": [
          {
            "questionId": 0,
            "questionName": "",
            "questionDifficulty": "",
            "likeCount": 0,
            "commitCount": 0,
            "successCount": 0,
            "noteCount": 0,
            "commentCount": 0,
            "passRate": 0,
            "createTime": ""
          }
        ]
      }
    }
  },
  mounted() {
    this.getQuestionData();
    this.getQuestionLabel();
  },
  methods: {
    // 获取问题列表
    getQuestionData() {
      this.asyncGetQuestion().then(({data}) => {
        this.questionData = data.data
      })
    },
    // 新建题目
    createQuestion() {
      if (this.createQuestionForm.questionName === '') {
        errorMsg("请输入题目名称")
        return
      }
      if (this.createQuestionForm.questionDifficulty === '') {
        errorMsg("请选择题目难度");
        return;
      }
      this.asyncCreateQuestion().then(({data}) => {
        successMsg("新建题目成功")
        this.toQuestionInfo(data.data.questionId)
      })
    },
    // 删除题目
    delQuestion(questionId) {
      this.asyncDelQuestion(questionId).then(() => {
        successMsg("删除题目成功");
        this.getQuestionData()
      })
    },
    // 题目详情
    toQuestionInfo(questionId) {
      this.$router.push({path: '/admin/center/detail', query: {id: questionId}})
    },
    // 排序方法
    sortQuestion(column) {
      console.log(column)
      let sort = column.order === null ? null : column.order !== 'ascending'
      if (column.prop === 'questionName') {
        this.nameSort = sort
      } else if (column.prop === 'questionDifficulty') {
        this.difficultySort = sort
      } else if (column.prop === 'noteCount') {
        this.nameSort = sort
      } else if (column.prop === 'passRate') {
        this.passSort = sort
      }

      this.getQuestionData()
    },
    // 获取问题标签
    getQuestionLabel() {
      this.asyncGetQuestionLabel().then(({data}) => {
        this.labelOptions = data.data
      })
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
      this.questionData.size = val;
      this.getQuestionData();
    },
    // 分页插件 => 切换页数
    handleCurrentChange(val) {
      this.questionData.current = val;
      this.getQuestionData();
    },
    // 异步方法 => 获取题目列表
    async asyncGetQuestion() {
      return await this.$axios({
        url: "/yicode-question-openapi/open/question/query",
        method: "post",
        data: {
          "pageSize": this.questionData.size,
          "page": this.questionData.current,
          "questionName": this.searchQuesName,
          "difficulty": this.searchDifficulty,
          "label": Array.from(this.searchLabel.values()),
          "noteSort": this.noteSort,
          "difficultySort": this.difficultySort,
          "nameSort": this.nameSort,
          "passSort": this.passSort,
          "enable": true
        }
      });
    },
    // 异步方法 => 获取所有题目标签
    async asyncGetQuestionLabel() {
      return await this.$axios({
        url: "/yicode-question-openapi/open/label/all/question?labelName=",
        method: "get",
      });
    },
    // 异步方法 => 创建题目
    async asyncCreateQuestion() {
      return await this.$axios({
        url: "/yicode-question-openapi/open/question/add",
        method: "post",
        data: {
          "questionDifficulty": this.createQuestionForm.questionDifficulty,
          "questionName": this.createQuestionForm.questionName,
        }
      });
    },
    // 异步方法 => 删除题目
    async asyncDelQuestion(questionId) {
      return await this.$axios({
        url: "/yicode-question-openapi/open/question/del",
        method: "delete",
        data: [questionId]
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.search {
  height: 40px;
  line-height: 40px;
  margin: 10px 0;
  padding: 0 10px;
  display: flex;

  & > div {
    margin-right: 15px;
  }

  .el-select:nth-child(3) {
    min-width: 150px !important;
    flex: 1;
  }
}

.el-dialog__wrapper {
  .el-input {
    width: 240px !important;
  }

  .el-select {
    width: 240px !important;
  }

  .el-textarea {
    width: 240px !important;
  }
}
</style>