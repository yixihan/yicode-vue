<template>
  <div>
    <!-- 功能区 -->
    <div class="search">
      <el-input v-model="searchQuesName" placeholder="问题名称"></el-input>
      <el-select v-model="searchDifficulty" placeholder="题目难度">
        <el-option
            v-for="item in searchOptionsDifficulty"
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
            v-for="item in searchLabelOptions"
            :key="item.labelId"
            :label="item.labelName"
            :value="item.labelId">
        </el-option>
      </el-select>
      <el-button type="primary">搜索</el-button>
      <el-button @click="CreateQuestion">新建题目</el-button>

      <!-- 新建题目 -->
      <el-dialog title="新建题目" :visible.sync="isShowCreateQuestion" :width="'500px'">
        <el-form :model="createQuestion">
          <el-form-item label="题目名称" :label-width="'100px'">
            <el-input v-model="createQuestion.questionName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="题目难度" :label-width="'100px'">
            <el-select v-model="createQuestion.questionDifficulty" placeholder="题目难度">
              <el-option
                  v-for="item in searchOptionsDifficulty"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="题目标签" :label-width="'100px'">
            <el-select v-model="createQuestion.questionLabel" filterable multiple collapse-tags placeholder="题目标签">
              <el-option
                  v-for="item in searchLabelOptions"
                  :key="item.labelId"
                  :label="item.labelName"
                  :value="item.labelId">
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="isShowCreateQuestion = false">取 消</el-button>
          <el-button type="primary" @click="isShowCreateQuestion = false">确 定</el-button>
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
                         @click="toQuestionInfo(scope.$index)"
              >查看</el-button>
              <el-button type="text" size="small"
                         style="color: red"
              >删除</el-button>
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

export default {
  name: "AdminProblem",
  components: {
    QuestionPagination
  },
  data () {
    return {
      // 搜索题目名
      searchQuesName: '',
      // 题目难度
      searchOptionsDifficulty: [
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
      searchLabelOptions: [
        {
          labelId: '1614644409867751425',
          labelName: '数组'
        }, {
          labelId: '选项2',
          labelName: '字符串'
        }, {
          labelId: '选项3',
          labelName: '排序'
        }, {
          labelId: '选项4',
          labelName: '树'
        }
      ],
      searchLabel: '',
      // 题解排序
      noteSort: null,
      // 难度排序
      difficultySort: null,
      // 名字排序
      nameSort : null,
      // 通过率排序
      passSort: null,
      // 新建题目
      createQuestion: {
        questionName: '',
        questionDesc: '',
        questionDifficulty: '',
        questionLabel: [
          {
            "labelId": 0,
            "labelName": ""
          }
        ]
      },
      // 新建题目展示
      isShowCreateQuestion: false,
      hide: false,
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
    this.getQuestionData()
  },
  methods: {
    // 设置题目难度颜色
    difficultyStyle({row, column}) {
      if (column.label === '难度') {
        let style;
        switch (row.questionDifficulty) {
          case '困难': {
            style = 'color: #ff2d55'
            break;
          }
          case '中等': {
            style = 'color: #ffb800'
            break;
          }
          case '简单': {
            style = 'color: #00af9b'
            break;
          }
          default:
            style = ''
        }

        return style
      }
    },
    // 通过率增加 %
    rateFormatter(row) {
      return row.passRate + '%'
    },
    // 新建题目
    CreateQuestion() {
      this.isShowCreateQuestion = !this.isShowCreateQuestion
    },
    getQuestionData() {
      this.asyncGetQuestion().then(({data}) => {
        this.questionData = data.data
      })
    },
    // 获取问题标签
    getQuestionLabel() {
      this.asyncGetQuestionLabel(this.labelName).then(({data}) => {
        this.labelOptions = data.data
        this.labelOptions.forEach((item) => {
          item.flag = false
        })
      })
    },
    // 题目详情
    toQuestionInfo(index) {
      console.log(index)
      this.$router.push({path: '/admin/center/detail', query: {id: this.questionData.records[index].questionId}})
    },
    // 分页插件 => 切换每页展示数量
    handleSizeChange(val) {
      this.questionData.size = val;
      this.
      console.log(`每页 ${val} 条`);
    },
    // 分页插件 => 切换页数
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    // 异步方法 => 获取题目列表
    async asyncGetQuestion() {
      return await this.$axios({
        url: "/yicode-question-openapi/open/question/query",
        method: "post",
        questionData: {
          "pageSize": this.questionData.size,
          "page": this.questionData.current,
          "questionName": this.searchQuesName,
          "difficulty": this.searchDifficulty,
          "label": Array.from(this.labelValue.values()),
          "noteSort": this.noteSort,
          "difficultySort": this.difficultySort,
          "nameSort" : this.nameSort,
          "passSort": this.passSort
        }
      });
    },
    // 异步方法 => 获取所有题目标签
    async asyncGetQuestionLabel(labelName) {
      return await this.$axios({
        url: "/yicode-question-openapi/open/label/all/question?labelName=" + labelName,
        method: "get",
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