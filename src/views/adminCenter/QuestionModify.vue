<template>
  <div class="question-modify">
    <div class="back" @click="goBack()">
      <i class="el-icon-arrow-left"></i>
      <span>返回</span>
    </div>
    <div class="modify">
      <el-form label-position="right" label-width="80px" :model="questionData">
        <el-form-item label="题目名称: ">
          <el-input v-model="questionData.questionName" :width="'120px'"></el-input>
        </el-form-item>
        <el-form-item label="难度: ">
          <el-radio-group v-model="questionData.questionDifficulty">
            <el-radio :label="'简单'">简单</el-radio>
            <el-radio :label="'中等'">中等</el-radio>
            <el-radio :label="'困难'">困难</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="标签: ">
          <el-select
              v-model="labelValues"
              multiple
              collapse-tags
              placeholder="请选择">
            <el-option
                v-for="(item, index) in labelOptions"
                :key="index"
                :label="item.labelName"
                :value="item.labelId">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="使用: ">
          <el-switch
              v-model="questionData.enable"
              style="display: table !important;line-height: 40px !important;"
          >
          </el-switch>
        </el-form-item>
      </el-form>
      <mavon-editor
          v-model="questionData.questionDesc"
      ></mavon-editor>
    </div>
    <el-button type="primary">确认修改</el-button>
  </div>
</template>

<script>
export default {
  name: "QuestionModify",
  data() {
    return {
      // 问题数据
      questionData: {
        questionId: this.$route.query.id,
        questionName: '',
        questionDifficulty: '简单',
        label: '',
        questionDesc: '',
        enable: true
      },
      // 可选标签
      labelOptions: [
        {
          labelId: '',
          labelName: '',
        }
      ],
      // 问题标签
      labelValues: []

    }
  },
  mounted() {
    this.getQuestionDetail();
    this.getQuestionLabel();
  },
  methods: {
    // 返回
    goBack() {
      this.$router.push({
        path: '/admin/center/detail',
        query: {id: this.questionData.questionId}
      })
    },
    // 获取题目详情
    getQuestionDetail() {
      this.asyncGetQuestionDetail().then(({data}) => {
        this.questionData = data.data
      })
    },
    // 获取问题标签
    getQuestionLabel() {
      this.asyncGetQuestionLabel().then(({data}) => {
        this.labelOptions = data.data
      })
    },
    // 异步方法 => 获取题目详情
    async asyncGetQuestionDetail() {
      return await this.$axios({
        url: "/yicode-question-openapi/open/question/detail?questionId=" + this.questionData.questionId,
        method: "get",
      });
    },
    // 异步方法 => 修改该问题的标签
    async asyncModifyQuestionDetail() {
      return await this.$axios({
        url: "/yicode-question-openapi/open/question/modify",
        method: "post",
        data: this.questionData
      });
    },
    // 异步方法 => 获取该问题的标签
    async asyncGetQuestionDetailLabel() {
      return await this.$axios({
        url: "/yicode-question-openapi/open/label/detail/question?questionId=" + this.questionData.questionId,
        method: "get",
      });
    },
    // 异步方法 => 修改该问题的标签
    async asyncModifyQuestionDetailLabel() {
      return await this.$axios({
        url: "/yicode-question-openapi/open/question/detail",
        method: "post",
      });
    },
    // 异步方法 => 获取所有题目标签
    async asyncGetQuestionLabel() {
      return await this.$axios({
        url: "/yicode-question-openapi/open/label/all/question?labelName=",
        method: "get",
      });
    },
  }
}
</script>

<style lang="scss" scoped>
.question-modify {
  width: 100%;
  height: auto;
  padding-bottom: 50px;
  display: flex;
  flex-direction: column;
  background: #FFFFFF;

  .back {
    cursor: pointer;
    width: 100%;
    padding: 10px;
    text-align: left;
    transition: all .1s;

    &:hover {
      color: #fbb957;
    }
  }

  .modify {
    width: 100%;
    padding: 10px 50px;

    .el-form {
      width: 350px;

      .el-select {
        width: 270px !important;
      }
    }

    .v-note-wrapper {
      width: 80%;
      z-index: 1;
    }
  }

  .el-button {
    margin: 20px auto;
    width: 120px;
  }
}
</style>