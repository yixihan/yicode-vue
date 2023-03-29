<template>
  <div class="question-list-detail">
    <!-- 顶部功能区 -->
    <div class="func">
      <h2>{{ questionListForm.questionListName }}</h2>
      <div class="back" @click="goBack()">
        <i class="el-icon-arrow-left"></i>
        <span>返回</span>
      </div>
      <i class="el-icon-edit" @click="isShowChange = true"></i>
      <i class="el-icon-plus" @click="isShowAddQues = true"></i>
      <i class="el-icon-delete-solid" @click="isShowDelQues = true"></i>
    </div>
    <!-- 题目数据展示 -->
    <el-table
        :data="questionData.records"
        :cell-style="difficultyStyle"
        border
        style="width: 100%">
      <el-table-column
          fixed
          prop="questionId"
          label="题目id">
      </el-table-column>
      <el-table-column
          prop="questionName"
          label="题目名称">
      </el-table-column>
      <el-table-column
          prop="questionDifficulty"
          label="难度"
      >
      </el-table-column>
      <el-table-column
          :formatter="rateFormatter"
          prop="passRate"
          label="通过率">
      </el-table-column>
      <el-table-column
          fixed="right"
          label="操作"
          width="100">
        <template slot-scope="scope">
          <el-button type="text" size="small">查看</el-button>
          <el-button type="text"
                     size="small"
                     style="color: red"
                     @click="delQuestion(scope.row.questionId)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页插件 -->
    <div class="block">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :hide-on-single-page="false"
          :current-page="questionData.current"
          :page-sizes="[10, 20, 30, 40, 50]"
          :page-size="questionData.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="questionData.total">
      </el-pagination>
    </div>
    <!-- 修改题单 -->
    <el-dialog title="修改题单信息" :visible.sync="isShowChange" :width="'500px'">
      <el-form :model="questionListForm">
        <el-form-item label="题单名称" :label-width="'120px'">
          <el-input v-model="questionListForm.questionListName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="题单背景" :label-width="'120px'">
          <el-upload
              action="https://yicode.oss-cn-chengdu.aliyuncs.com"
              :data="dataObj"
              list-type="picture"
              :multiple="false"
              :file-list="fileList"
              :show-file-list="false"
              :before-upload="beforeUpload"
              :on-success="handleUploadSuccess"
          >
            <el-button size="small" type="primary">点击上传</el-button>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowChange = false">取 消</el-button>
        <el-button type="primary" @click="modifyQuestionList">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增题目 -->
    <el-dialog title="新增题目" :visible.sync="isShowAddQues" :width="'500px'">
      <el-form :model="newQuestion">
        <el-form-item label="新增题目id" :label-width="'120px'">
          <el-input v-model="newQuestion.newQuestionId" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isShowAddQues = false">取 消</el-button>
        <el-button type="primary" @click="addQuestion">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 删除题单 -->
    <el-dialog
        title="删除题单"
        :visible.sync="isShowDelQues"
        width="30%">
      <span>确定要删除题单吗?</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isShowDelQues = false">取 消</el-button>
        <el-button type="primary" @click="delQuesList()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {errorMsg, successMsg} from "@/util/elementMsgUtil";
import {uuid} from "@/util/uuidUtil";

export default {
  name: "QuestionListDetail",
  data() {
    return {
      isShow: false,
      // 题单 id
      id: this.$route.params.id,
      // 修改题单
      isShowChange: false,
      // 新增题目
      isShowAddQues: false,
      // 删除题目
      isShowDelQues: false,
      // 题目信息
      questionData: {
        current: 1,
        pages: 0,
        records: [
          {
            questionId: 0,
            questionName: 0,
            questionDifficulty: '',
            passRate: ''
          }
        ],
        size: 10,
        total: 0
      },
      // 题单修改表单
      questionListForm: {
        questionListName: '',
        questionListBg: ''
      },
      // 题目新增表单
      newQuestion: {
        newQuestionId: '',
      },
      // 图片上传秘钥
      dataObj: {
        policy: "",
        signature: "",
        key: "",
        ossaccessKeyId: "",
        dir: "",
        host: "",
      },
    }
  },
  computed: {
    // 图片 url
    imageUrl() {
      return this.value;
    },
    // 图片名
    imageName() {
      if (this.value != null && this.value !== "") {
        return this.value.substr(this.value.lastIndexOf("/") + 1);
      } else {
        return null;
      }
    },
    // 图片列表
    fileList() {
      return [
        {
          name: this.imageName,
          url: this.imageUrl,
        },
      ];
    },
  },
  mounted() {
    this.getQuestionListDetail()
    this.getQuestionPage()
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
    // 返回
    goBack() {
      this.$router.push({path: "/admin/center/list"})
    },
    // 获取题单详情
    getQuestionListDetail() {
      this.asyncGetQuestionListDetail().then(({data}) => {
        this.questionListForm.questionListName = data.data.favoriteName
        this.questionListForm.questionListBg = data.data.favoriteBg
      })
    },
    // 获取题单题目列表
    getQuestionPage() {
      this.asyncGetQuestionPage().then(({data}) => {
        this.questionData = data.data
      })
    },
    // 修改题单
    modifyQuestionList() {
      if (this.questionListForm.questionListName === null ||
          this.questionListForm.questionListName === '') {
        errorMsg("请输入题单名称")
        return
      }
      if (this.questionListForm.questionListBg === null ||
          this.questionListForm.questionListBg === '') {
        errorMsg("请上传题单封面")
        return;
      }
      this.asyncModifyQuestionList().then(({data}) => {
        successMsg("题单修改成功")
        this.questionListName = data.data.favoriteName
        this.isShowChange = false
      })
    },
    // 删除题单
    delQuesList() {
      this.asyncDelQuestionList().then(() => {
        successMsg("题单删除成功")
        this.goBack()
      })
    },
    // 增加题单题目
    addQuestion() {
      this.asyncAddQuestion().then(() => {
        successMsg("增加题目成功")
        this.isShowAddQues = false
        this.getQuestionPage()
        this.newQuestion.newQuestionId = ''
      })
    },
    // 删除题单题目
    delQuestion(questionId) {
      this.asyncDelQuestion(questionId).then(() => {
        successMsg("删除题目成功")
        this.isShowDelQues = false
        this.getQuestionPage()
      })
    },
    // 分页插件 => 切换每页展示数量
    handleSizeChange(val) {
      this.questionData.size = val;
      this.getQuestionPage()
    },
    // 分页插件 => 切换页数
    handleCurrentChange(val) {
      this.questionData.current = val;
      this.getQuestionPage()
    },
    // 上传前钩子 => 获取 oss 上传凭证
    beforeUpload() {
      return new Promise((resolve) => {
        new Promise((resolve, reject) => {
          console.log("reject : {}", reject);
          this.$axios({
            url: "/yicode-thirdpart-openapi/open/oss/upload/policy",
            method: "post",
          }).then(({data}) => {
            resolve(data);
          });
        }).then(({data}) => {
          console.log("response : ", data);
          this.dataObj.policy = data.policy;
          this.dataObj.signature = data.signature;
          this.dataObj.ossaccessKeyId = data.accessKey;
          this.dataObj.key = data.dir + uuid() + "_${filename}";
          this.dataObj.dir = data.dir;
          this.dataObj.host = data.host;
          resolve(true);
        })
      });
    },
    // 上传成功后钩子 => 获取图片 url
    handleUploadSuccess(res, file) {
      this.fileList.pop();
      this.fileList.push({
        name: file.name,
        url:
            this.dataObj.host +
            "/" +
            this.dataObj.key.replace("${filename}", file.name),
      });
      this.questionListForm.questionListBg = this.fileList[0].url;
    },
    // 异步方法 => 获取题单详情
    async asyncGetQuestionListDetail() {
      return await this.$axios({
        url: "/yicode-question-openapi/open/admin/question/list/detail?id=" + this.id,
        method: "get",
      });
    },
    // 异步方法 => 删除题单
    async asyncDelQuestionList() {
      return await this.$axios({
        url: "/yicode-question-openapi/open/admin/question/list/del?id=" + this.id,
        method: "post",
      });
    },
    // 异步方法 => 修改题单
    async asyncModifyQuestionList() {
      return await this.$axios({
        url: "/yicode-question-openapi/open/admin/question/list/modify",
        method: "post",
        data: {
          id: this.id,
          "questionListName": this.questionListForm.questionListName,
          "questionListBg": this.questionListForm.questionListBg
        }
      });
    },
    // 异步方法 => 查看题单题目
    async asyncGetQuestionPage() {
      return await this.$axios({
        url: "/yicode-question-openapi/open/admin/question/list/question/page",
        method: "post",
        data: {
          "favoriteId": this.id,
          "pageSize": this.questionData.size,
          "page": this.questionData.current,
        }
      });
    },
    // 异步方法 => 增加题单题目
    async asyncAddQuestion() {
      return await this.$axios({
        url: "/yicode-question-openapi/open/admin/question/list/question/add",
        method: "post",
        data: {
          "questionId": this.newQuestion.newQuestionId,
          "id": this.id
        }
      });
    },
    // 异步方法 => 删除题单题目
    async asyncDelQuestion(questionId) {
      return await this.$axios({
        url: "/yicode-question-openapi/open/admin/question/list/question/del",
        method: "post",
        data: {
          "questionId": questionId,
          "id": this.id
        }
      });
    },
  },
}
</script>

<style lang="scss" scoped>
.question-list-detail {
  width: 100%;

  .func {
    height: 50px;
    line-height: 50px;
    width: 100%;
    background: #99a9bf;
    position: relative;

    .back {
      position: absolute;
      left: 5px;
      top: 0;
      cursor: pointer;
    }

    & > i {
      position: absolute;
      right: 20px;
      top: 13px;
      font-size: 24px;
      font-weight: bolder;
      transition: all 0.3s;
      cursor: pointer;

      &:hover {
        color: #FFFFFF;
      }
    }


    .el-icon-edit {
      right: 100px;
    }

    .el-icon-plus {
      right: 60px;
    }
  }
}

.easy-question {
  color: #ff2d55;
}
.medium-question {
  color: #ffb800;
}
.hard-question {
  color: #ff2d55;
}
</style>