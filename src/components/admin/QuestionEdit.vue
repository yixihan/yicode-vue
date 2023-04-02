<template>
  <div class="question-edit">
    <h2>测试用例</h2>
    <!-- 表头  -->
    <div class="info">
      <div class="code">
        id
      </div>
      <div class="state">
        状态
      </div>
      <div class="add">
        <el-button type="primary"
                   icon="el-icon-plus"
                   style=""
                   @click="isShowAdd = true">添加
        </el-button>
      </div>
    </div>
    <!-- 列表  -->
    <div class="info" v-for="(item, index) in caseData.records" :key="index">
      <div class="code">
        {{ item.id }}
      </div>
      <div class="state">
        <el-switch
            v-model="item.enable"
            @change="change($event, index)"
            active-color="#13ce66"
            inactive-color="#ff4949">
        </el-switch>
      </div>
      <div class="see">
        <span @click="seeUseCase(item)">查看  </span>
        <span @click="delQuestionCase(item.id)" style="color: red">删除</span>
      </div>
    </div>
    <!-- 分页组件  -->
    <el-pagination
        layout="prev, pager, next"
        @current-change="handleCurrentChange"
        :current-page="caseData.current"
        :page-size="caseData.size"
        :total="caseData.total">
    </el-pagination>
    <!-- 用例详情  -->
    <el-dialog :title="'用例详情:' + useCasesInfo.id"
               :visible.sync="isShowUseCase"
               :width="'500px'"
               center>
      <el-form :model="useCasesInfo">
        <el-form-item label="输入用例" :label-width="'120px'">
          <el-input v-model="useCasesInfo.caseParams" autocomplete="off" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="输入用例" :label-width="'120px'">
          <el-input v-model="useCasesInfo.caseAnswer" autocomplete="off" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowUseCase = false">取 消</el-button>
        <el-button type="primary" @click="modifyQuestionCase(useCasesInfo)">更新</el-button>
      </div>
    </el-dialog>
    <!-- 新增用例 -->
    <el-dialog title="新增用例"
               :visible.sync="isShowAdd"
               :width="'500px'"
               center>
      <el-form :model="addUseCase">
        <el-form-item label="输入用例" :label-width="'120px'">
          <el-input v-model="addUseCase.caseParams" autocomplete="off" type="textarea"></el-input>
        </el-form-item>
        <el-form-item label="输入用例" :label-width="'120px'">
          <el-input v-model="addUseCase.caseAnswer" autocomplete="off" type="textarea"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowAdd = false">取 消</el-button>
        <el-button type="primary" @click="createQuestionCase">更新</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {successMsg, errorMsg} from "@/util/elementMsgUtil";

export default {
  name: "QuestionEdit",
  props: {
    questionId: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      // 测试用例数据
      caseData: {
        current: 1,
        total: 0,
        size: 10,
        pages: 0,
        records: [
          {
            id: '',
            questionId: '',
            caseParams: '',
            caseAnswer: '',
            enable: '',
          }
        ]
      },
      // 新增用例
      isShowAdd: false,
      addUseCase: {
        questionId: this.questionId,
        caseParams: '',
        caseAnswer: '',
      },
      // 查看用例
      isShowUseCase: false,
      useCasesInfo: {
        id: '',
        questionId: '',
        caseParams: '',
        caseAnswer: '',
        enable: '',
      },
    }
  },
  mounted() {
    this.getQuestionCase()
  },
  methods: {
    // 查看测试用例
    seeUseCase(val) {
      this.isShowUseCase = true
      this.useCasesInfo = val
    },
    // 获取题目测试用例
    getQuestionCase() {
      this.asyncGetQuestionCase().then(({data}) => {
        this.caseData = data.data
      })
    },
    // 添加测试用例
    createQuestionCase() {
      if (this.addUseCase.caseParams === '' ||
          this.addUseCase.caseAnswer === '') {
        errorMsg("请正确输入")
        return
      }

      this.asyncCreateQuestionCase().then(() => {
        successMsg("添加测试用例成功")
        this.isShowAdd = false
        this.addUseCase = {}
        this.getQuestionCase()
      })
    },
    // 修改测试用例
    modifyQuestionCase(item) {
      this.asyncModifyQuestionCase(item).then(() => {
        successMsg("修改测试用例成功")
        this.getQuestionCase()
        this.isShowUseCase = false
      })
    },
    // 修改测试用例启用状态
    change(val, index) {
      let item = this.caseData.records[index]
      item.enable = val;
      this.modifyQuestionCase(item)
    },
    // 删除测试用例
    delQuestionCase(id) {
      this.asyncDelQuestionCase(id).then(() => {
        successMsg("删除测试用例成功")
        this.getQuestionCase()
      })
    },
    // 分页插件 => 切换页数
    handleCurrentChange(val) {
      this.caseData.current = val;
      this.getQuestionCase()
    },
    // 异步方法 => 获取题目测试用例
    async asyncGetQuestionCase() {
      return await this.$axios({
        url: "/yicode-question-openapi/open/question/case/detail",
        method: "post",
        data: {
          "page": this.caseData.current,
          "pageSize": this.caseData.size,
          "questionId": this.questionId
        }
      });
    },
    // 异步方法 => 创建题目测试用例
    async asyncCreateQuestionCase() {
      return await this.$axios({
        url: "/yicode-question-openapi/open/question/case/add",
        method: "post",
        data: this.addUseCase
      });
    },
    // 异步方法 => 修改题目测试用例
    async asyncModifyQuestionCase(item) {
      return await this.$axios({
        url: "/yicode-question-openapi/open/question/case/modify",
        method: "post",
        data: item
      });
    },
    // 异步方法 => 删除题目测试用例
    async asyncDelQuestionCase(id) {
      return await this.$axios({
        url: "/yicode-question-openapi/open/question/case/del?id=" + id,
        method: "delete",
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.question-edit {
  flex: 1;
  width: 100%;

  .info {
    width: 100%;
    height: 48px;
    line-height: 48px;
    display: flex;
    transition: all .2s;
    font-size: 14px;
    border-bottom: 1px solid #eeeeee;

    &:hover {
      background: #eeeeee;
    }

    & > div {
      flex: 1;
    }

    .see {
      cursor: pointer;

      &:hover {
        color: #42b983;
      }
    }
  }
}
</style>