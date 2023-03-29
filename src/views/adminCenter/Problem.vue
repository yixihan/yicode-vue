<template>

  <div>
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
      <el-select v-model="searchType" filterable multiple collapse-tags  placeholder="题目标签">
        <el-option
            v-for="item in searchOptionsType"
            :key="item.labelId"
            :label="item.labelName"
            :value="item.labelId">
        </el-option>
      </el-select>
      <el-button type="primary">搜索</el-button>
      <el-button @click="CreateQuestion">新建题目</el-button>
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
            <el-select v-model="createQuestion.questionLabel" filterable  multiple collapse-tags  placeholder="题目标签">
              <el-option
                  v-for="item in searchOptionsType"
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
  },
  data () {
    return {
      // 搜索题目名
      searchQuesName: '',
      // 题目难度
      searchOptionsDifficulty: [{
        value: '选项1',
        label: '简单'
      }, {
        value: '选项2',
        label: '中等'
      }, {
        value: '选项3',
        label: '困难'
      }],
      searchDifficulty: '',
      // 题目标签
      searchOptionsType: [{
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
      }],
      searchType: '',
      // 新建题目
      createQuestion: {
        questionName:  '',
        questionDesc: '',
        questionDifficulty: '',
        questionLabel: [
          {
            "labelId": 1614644409867751425,
            "labelName": "常则利把效"
          }
        ]
      },
      // 新建题目展示
      isShowCreateQuestion: false,
    }
  },
  methods: {
    // 新建题目
    CreateQuestion () {
      this.isShowCreateQuestion = !this.isShowCreateQuestion
    }
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
  &>div {
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