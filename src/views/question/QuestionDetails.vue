<template>
  <div class="question-details">
    <div class="question-details-left">
      <el-tabs v-model="rightShow" @tab-click="handleClick">
        <el-tab-pane label="题目描述" name="desc">
          <question-detail :questionId="questionId" :edit="false"></question-detail>
        </el-tab-pane>
        <el-tab-pane :label="'评论(' + ')'" name="comment">
          <mavon-editor
              v-model="common"
              :toolbarsFlag="false"
              :subfield="false"
              defaultOpen="edit"
          ></mavon-editor>
          <el-button type="success">发表评论</el-button>
          <div class="common-list">
            <Common>
              <div class="show-details-common">
                <span v-show="!showCommonSon" @click="showCommonSon = true">查看回复<i
                    class="el-icon-arrow-down"></i></span>
                <span v-show="showCommonSon" @click="showCommonSon = false">收起回复<i
                    class="el-icon-arrow-up"></i></span>
              </div>
              <common-son v-show="showCommonSon"></common-son>
            </Common>
            <el-pagination
                layout="prev, pager, next"
                :total="50">
            </el-pagination>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="'题解(' + ')'" name="note">
          <problem-explanation></problem-explanation>
        </el-tab-pane>
        <el-tab-pane label="提交记录" name="record">
          <submit-records></submit-records>
        </el-tab-pane>
      </el-tabs>
    </div>
    <div class="question-details-right">
      <div>
        <el-select v-model="mode" placeholder="请选择">
          <el-option
              v-for="(item, index) in modeOptions"
              :key="index"
              :label="item.name"
              :value="item.value">
          </el-option>
        </el-select>
      </div>
      <code-editor :mode="mode"></code-editor>
    </div>
  </div>
</template>

<script>
import QuestionDetail from "@/components/admin/QuestionDetail.vue";
import Common from "@/components/common/Common.vue";
import CommonSon from "@/components/common/CommonSon.vue";
import SubmitRecords from "@/components/common/SubmitRecords.vue";
import ProblemExplanation from "@/components/common/ProblemExplanation.vue";
import CodeEditor from "@/components/common/CodeEditor.vue";


export default {
  name: "QuestionDetails",
  components: {
    ProblemExplanation,
    SubmitRecords,
    CommonSon,
    Common,
    QuestionDetail,
    CodeEditor
  },
  data() {
    return {
      rightShow: 'desc',
      questionId: this.$route.params.questionId,
      common: '',
      showCommonSon: false,
      mode: 'text/x-java',
      modeOptions: [
        {
          name: "Java",
          value: "text/x-java"
        },
        {
          name: "C",
          value: "text/x-csrc"
        },
        {
          name: "C++",
          value: "text/x-c++src"
        },
        {
          name: "JavaScript",
          value: "javascript"
        },
        {
          name: "Go",
          value: "go"
        },
        {
          name: "Python",
          value: "python"
        },
      ],
    }
  },
  mounted() {
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
}
</script>

<style lang="scss" scoped>
.question-details {
  width: 100%;
  height: 99.6vh;
  padding-top: 70px;
  max-width: 1280px;
  box-sizing: border-box;
  display: flex;

  .question-details-left {
    flex: 1;
    overflow-y: scroll;

    .common-list {
      width: 100%;
      background: #FFFFFF;
      margin-top: 80px;
      padding-bottom: 80px;
      border-top: 1px solid #7a7a7a;

      .show-details-common {
        font-size: 14px;
        cursor: pointer;
      }
    }

    &::-webkit-scrollbar {
      width: 10px;
      height: 10px;
    }

    &::-webkit-scrollbar-thumb {
      border-radius: 3px;
      background: #ececec;
    }

    &::-webkit-scrollbar-track {
      background: #f8f8f8;
    }

    ::v-deep .el-tabs {
      background: #FFFFFF;

      .el-tabs__header {
        height: 70px;
        line-height: 70px;
        margin: 0;
        padding: 0 20px;
      }
    }

    ::v-deep .el-button {
      padding: 10px;
      float: right;
      margin: 20px 10px;
    }
  }

  .question-details-right {
    flex: 1;
    text-align: left !important;

    .code-sql {
      font-size: 11pt;
      font-family: Consolas, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace, serif;
      text-align: left !important;

      .CodeMirror-sizer {
        text-align: left !important;
      }
    }
  }


}
</style>